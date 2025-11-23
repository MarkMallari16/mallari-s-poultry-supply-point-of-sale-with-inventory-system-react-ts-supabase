import { useRef, useState } from "react"
import type { Product } from "../../types/product";
import { Box, RefreshCcw } from "lucide-react";

const Products = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const deleteModalRef = useRef<HTMLDialogElement>(null);
    const [mode, setMode] = useState<"add" | "update">("add");
    const [formData, setFormData] = useState({ id: "" })
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: [e.target.value] });
    }

    const handleUpdate = () => {

    }

    const openModal = (selectedMode: "add" | "update", data?: any) => {
        setMode(selectedMode)

        if (selectedMode === "update" && data) {
            setFormData(data);
        } else {
            setFormData({ id: "" });
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
                    <h1 className="text-2xl font-bold">Products</h1>
                    <span className="text-gray-500">Overview of all products.</span>
                </div>

                <button className="btn bg-emerald-500" onClick={() => openModal("add")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new product
                </button>
            </div>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-2">{mode == "add" ? "Add Product" : "Update Stock"}</h3>
                    <label htmlFor="productName">Product Quantity:</label>
                    {/* <input type="text"
                        className="mt-1 block input w-full"
                        name="stock"
                        value={formData.id} onChange={handleInputChange}
                        placeholder="Update stock amount (e.g. 75)"
                        disabled={loading} /> */}
                    <div className="modal-action">
                        <div className="flex gap-2">
                            <button className="btn" onClick={() => modalRef.current?.close()}>Close</button>
                            <button className="btn btn-info" onClick={handleUpdate}>{mode == "add" ? "Add" : "Update"}</button>
                        </div>
                    </div>
                </div>
            </dialog>
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
                                <td>{new Date(product.created_at).toLocaleDateString("en-PH")}</td>
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

export default Products