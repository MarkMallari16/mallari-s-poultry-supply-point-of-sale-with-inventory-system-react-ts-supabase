import { Box, Plus, RefreshCcw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { getAllProducts, updateStocks } from "../../services/api/products"
import type { Product } from "../../types/product"

const Inventory = () => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const deleteModalRef = useRef<HTMLDialogElement>(null)
  const [mode, setMode] = useState<"add" | "update">("add");
  const [formData, setFormData] = useState({ id: "", stock: "" })
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>();

  const fetchProducts = async () => {
    const results = await getAllProducts();
    setProducts(results);
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  //this will handle update
  const handleUpdate = async () => {
    if (!formData.stock) return alert("Please enter stock quantity");

    setLoading(true);

    const updated = await updateStocks(Number(formData.id), Number(formData.stock));


    if (updated) {
      alert("Stock updated successfully!")
      modalRef.current?.close();
      setFormData({ id: "", stock: "" });
      await fetchProducts();
    } else {
      alert("Failed to update stock.");
    }
    setLoading(false);
  }
  
  //open modal
  const openModal = (selectedMode: "add" | "update", data?: any) => {
    setMode(selectedMode)

    if (selectedMode === "update" && data) {
      setFormData(data);
    } else {
      setFormData({ id: "", stock: "" });
    }

    modalRef.current?.showModal();
  }

  //open delete modal
  const openDeleteModal = () => {
    if (deleteModalRef?.current) {
      deleteModalRef.current.showModal();
    }
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <span className="text-gray-500">Manage your product catalog</span>
        </div>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">{mode == "add" ? "Add Product" : "Update Stock"}</h3>
            <label htmlFor="productName">Product Quantity:</label>
            <input type="text"
              className="mt-1 block input w-full"
              name="stock"
              value={formData.stock} onChange={handleInputChange}
              placeholder="Update stock amount (e.g. 75)"
              disabled={loading} />
            <div className="modal-action">
              <div className="flex gap-2">
                <button className="btn" onClick={() => modalRef.current?.close()}>Close</button>
                <button className="btn btn-info" onClick={handleUpdate}>{loading ? "Updating..." : "Update"}</button>
              </div>
            </div>
          </div>
        </dialog>
        <dialog ref={deleteModalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg ">Confirm Reset</h3>
            <p className="py-4 ">
              Are you sure you want to reset all stock values?
              This action cannot be undone.
            </p>

            <div className="modal-action ">
              <form method="dialog">
                <button className="btn">Cancel</button>
              </form>
              <button className="btn btn-error">
                Reset
              </button>
            </div>
          </div>
        </dialog>
      </div>
      <div className="mt-6 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map(product => (
              <tr key={product.id}>
                <th>{product.id}</th>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.stock}</td>
                <td>{product.created_at}</td>
                <td>
                  <div className="inline-flex gap-1 font-medium">
                    <button onClick={() => openModal("update", product)} className="btn btn-info rounded-sm px-4 py-2 cursor-pointer">
                      <Box className="size-5" />
                    </button>
                    <button onClick={openDeleteModal} className="btn btn-error rounded-sm px-4 py-2 cursor-pointer">
                      <RefreshCcw className="size-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Inventory