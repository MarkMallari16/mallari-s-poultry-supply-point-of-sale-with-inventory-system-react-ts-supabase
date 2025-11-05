import { Box, Plus, RefreshCcw } from "lucide-react"
import { useRef, useState } from "react"

const Inventory = () => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const deleteModalRef = useRef<HTMLDialogElement>(null)
  const [mode, setMode] = useState<"add" | "update">("add");
  const [formData, setFormData] = useState({ name: "", price: "", stock: "" })


  const openModal = (selectedMode: "add" | "update", data?: any) => {
    setMode(selectedMode)

    if (selectedMode === "update" && data) {
      setFormData(data);
    } else {
      setFormData({ name: "", price: "", stock: "" });
    }

    modalRef.current?.showModal();
  }


  const openDeleteModal = () => {
    if (deleteModalRef?.current) {
      deleteModalRef.current.showModal();
    }
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Inventory Management</h1>
          <span className="text-gray-500">Manage your product catalog</span>
        </div>
        <button onClick={() => openModal("add")} className="btn btn-success">
          <Plus className="size-4" />
          Add new product
        </button>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">{mode == "add" ? "Add Product" : "Update Stock"}</h3>
            <label htmlFor="productName">Product Quantity:</label>
            <input type="text" className="mt-1 block input w-full" />

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
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
      {/*Table*/}
      <div className="mt-6 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Whisker Delight Cat Food</td>
              <td>Cat Food</td>
              <td>120</td>
              <td>Bags</td>
              <td>2025-10-10</td>
              <td>
                <div className="inline-flex gap-1 font-medium">
                  <button onClick={() => openModal("update")} className="bg-blue-400 rounded-sm px-4 py-2 cursor-pointer">
                    <Box className="size-5" />
                  </button>
                  <button onClick={openDeleteModal} className="bg-error rounded-sm px-4 py-2 cursor-pointer">
                    <RefreshCcw className="size-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Inventory