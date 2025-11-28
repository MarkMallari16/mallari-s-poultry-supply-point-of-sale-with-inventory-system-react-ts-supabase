import { useEffect, useRef, useState } from "react"
import type { Product, ProductWithUrl } from "../../types/product";
import { Box, RefreshCcw } from "lucide-react";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../../services/api/products";
import { supabase } from "../../services/supabaseClient";

const Products = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const deleteModalRef = useRef<HTMLDialogElement>(null);
    const [mode, setMode] = useState<"add" | "update">("add");
    const [formData, setFormData] = useState<Partial<Product>>({ id: 0, name: "", brand: "", price: 0, stock: 0, unit: "", image_url: "" })
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductWithUrl[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductWithUrl | null>(null);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        refreshProducts();
    }, [])

    const refreshProducts = async () => {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Convert number fields appropriately
        const numericFields = ["price", "stock", "id"] as const;
        if (numericFields.includes(name as any)) {
            setFormData({ ...formData, [name]: Number(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            // If a new image file is selected, upload to storage and get image path
            let imagePath = formData.image_url ?? "";
            if (selectedFile) {
                const fileExt = selectedFile.name.split(".").pop()?.toLowerCase() || "png";
                const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
                const fullPath = `products/${fileName}`; // folder inside bucket
                const { error: uploadError } = await supabase.storage
                    .from("product-images")
                    .upload(fullPath, selectedFile, { upsert: true, contentType: selectedFile.type });
                if (uploadError) {
                    console.error("Image upload failed:", uploadError.message);
                } else {
                    imagePath = fullPath;
                }
            }
            if (mode === "add") {
                const payload = {
                    name: formData.name ?? "",
                    brand: formData.brand ?? "",
                    price: formData.price ?? 0,
                    stock: formData.stock ?? 0,
                    unit: formData.unit ?? "",
                    image_url: imagePath,
                    created_at: new Date().toISOString(),
                } as Omit<ProductWithUrl, "id" | "publicUrl">;
                const added = await addProduct(payload);
                if (added) {
                    await refreshProducts();
                    modalRef.current?.close();
                    setSelectedFile(null);
                } else {
                    alert("Failed to add product. Please check inputs.");
                }
            } else if (mode === "update" && selectedProduct) {
                const updates: Partial<Omit<ProductWithUrl, "id" | "publicUrl">> = {
                    name: formData.name,
                    brand: formData.brand,
                    price: formData.price,
                    stock: formData.stock,
                    unit: formData.unit,
                    image_url: imagePath,
                };
                const updated = await updateProduct(selectedProduct.id, updates);
                if (updated) {
                    await refreshProducts();
                    modalRef.current?.close();
                    setSelectedFile(null);
                } else {
                    alert("Failed to update product. Please try again.");
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const openModal = (selectedMode: "add" | "update", data?: any) => {
        setMode(selectedMode)

        if (selectedMode === "update" && data) {
            setSelectedProduct(data);
            setFormData({
                id: data.id,
                name: data.name,
                brand: data.brand,
                price: data.price,
                stock: data.stock,
                unit: data.unit,
                image_url: data.image_url,
            });
            setSelectedFile(null);
        } else {
            setSelectedProduct(null);
            setFormData({ id: 0, name: "", brand: "", price: 0, stock: 0, unit: "", image_url: "" });
            setSelectedFile(null);
        }

        modalRef.current?.showModal();
    }

    //open delete modal
    const openDeleteModal = (product: ProductWithUrl) => {
        setSelectedProduct(product);
        if (deleteModalRef?.current) deleteModalRef.current.showModal();
    }

    const confirmDelete = async () => {
        if (!selectedProduct) return;
        try {
            setDeleteLoading(true);
            await deleteProduct(selectedProduct.id, selectedProduct.image_url);
            await refreshProducts();
            deleteModalRef.current?.close();
        } finally {
            setDeleteLoading(false);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="label">Name</label>
                            <input type="text" name="name" className="input input-bordered w-full" value={formData.name ?? ""} onChange={handleInputChange} disabled={loading} />
                        </div>
                        <div>
                            <label className="label">Brand</label>
                            <input type="text" name="brand" className="input input-bordered w-full" value={formData.brand ?? ""} onChange={handleInputChange} disabled={loading} />
                        </div>
                        <div>
                            <label className="label">Price</label>
                            <input type="number" name="price" className="input input-bordered w-full" value={formData.price ?? 0} onChange={handleInputChange} disabled={loading} />
                        </div>
                        <div>
                            <label className="label">Stock</label>
                            <input type="number" name="stock" className="input input-bordered w-full" value={formData.stock ?? 0} onChange={handleInputChange} disabled={loading} />
                        </div>
                        <div>
                            <label className="label">Unit</label>
                            <input type="text" name="unit" className="input input-bordered w-full" value={formData.unit ?? ""} onChange={handleInputChange} disabled={loading} />
                        </div>
                        <div>
                            <label className="label">Image</label>
                            <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)} disabled={loading} />
                            <p className="text-xs text-gray-500 mt-1">Optional. If provided, will upload to storage.</p>
                            <label className="label mt-3">Image Path (advanced)</label>
                            <input type="text" name="image_url" className="input input-bordered w-full" value={formData.image_url ?? ""} onChange={handleInputChange} disabled={loading} placeholder="e.g. products/filename.png" />
                        </div>
                    </div>
                    <div className="modal-action">
                        <div className="flex gap-2">
                            <button className="btn" onClick={() => modalRef.current?.close()}>Close</button>
                            <button className="btn btn-info" onClick={handleSubmit} disabled={loading}>{mode == "add" ? "Add" : "Update"}</button>
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
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Unit</th>
                            <th>Stock</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map(product => (
                            <tr key={product.id}>
                                <th>{product.id}</th>
                                <td className="flex items-center gap-2">
                                    {product.publicUrl ? (
                                        <img src={product.publicUrl} alt={product.name} className="w-8 h-8 object-cover rounded" />
                                    ) : null}
                                    {product.name}
                                </td>
                                <td>{product.brand}</td>
                                <td>{product.price}</td>
                                <td>{product.unit}</td>
                                <td>{product.stock}</td>
                                <td>{new Date(product.created_at).toLocaleDateString("en-PH")}</td>
                                <td>
                                    <div className="inline-flex gap-1 font-medium">
                                        <button onClick={() => openModal("update", product)} className="btn btn-info rounded-sm px-4 py-2 cursor-pointer">
                                            <Box className="size-5" />
                                        </button>
                                        <button onClick={() => openDeleteModal(product)} className="btn btn-error rounded-sm px-4 py-2 cursor-pointer">
                                            <RefreshCcw className="size-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <dialog ref={deleteModalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Product</h3>
                    <p className="py-3">Are you sure you want to delete <span className="font-semibold">{selectedProduct?.name}</span>?</p>
                    <div className="modal-action">
                        <button className="btn" onClick={() => deleteModalRef.current?.close()}>Cancel</button>
                        <button className="btn btn-error" onClick={confirmDelete} disabled={deleteLoading}>Delete</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Products