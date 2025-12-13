import { Truck, Plus, Filter, Edit, Trash2, Search, X, Phone, Mail, MapPin, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAllSuppliers, addSupplier, updateSupplier, deleteSupplier } from "../../services/api/suppliers";
import type { Supplier, CreateSupplierInput } from "../../types/supplier";

const Suppliers = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const deleteModalRef = useRef<HTMLDialogElement>(null);

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [mode, setMode] = useState<"add" | "edit">("add");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    const [formData, setFormData] = useState<CreateSupplierInput>({
        name: "",
        contact_person: "",
        email: "",
        phone: "",
        address: "",
        notes: ""
    });

    const fetchSuppliers = async () => {
        setFetchingData(true);
        const data = await getAllSuppliers();
        setSuppliers(data);
        setFetchingData(false);
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({
            name: "",
            contact_person: "",
            email: "",
            phone: "",
            address: "",
            notes: ""
        });
        setSelectedSupplier(null);
    };

    const openModal = (selectedMode: "add" | "edit", supplier?: Supplier) => {
        setMode(selectedMode);

        if (selectedMode === "edit" && supplier) {
            setSelectedSupplier(supplier);
            setFormData({
                name: supplier.name,
                contact_person: supplier.contact_person || "",
                email: supplier.email || "",
                phone: supplier.phone || "",
                address: supplier.address || "",
                notes: supplier.notes || ""
            });
        } else {
            resetForm();
        }

        modalRef.current?.showModal();
    };

    const openDeleteModal = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        deleteModalRef.current?.showModal();
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            alert("Supplier name is required.");
            return;
        }

        setLoading(true);

        if (mode === "add") {
            const result = await addSupplier(formData);
            if (result) {
                alert("Supplier added successfully!");
                modalRef.current?.close();
                resetForm();
                await fetchSuppliers();
            } else {
                alert("Failed to add supplier.");
            }
        } else if (mode === "edit" && selectedSupplier) {
            const result = await updateSupplier(selectedSupplier.id, formData);
            if (result) {
                alert("Supplier updated successfully!");
                modalRef.current?.close();
                resetForm();
                await fetchSuppliers();
            } else {
                alert("Failed to update supplier.");
            }
        }

        setLoading(false);
    };

    const handleDelete = async () => {
        if (!selectedSupplier) return;

        setLoading(true);

        const success = await deleteSupplier(selectedSupplier.id);

        if (success) {
            alert("Supplier deleted successfully!");
            deleteModalRef.current?.close();
            setSelectedSupplier(null);
            await fetchSuppliers();
        } else {
            alert("Failed to delete supplier.");
        }

        setLoading(false);
    };

    const filteredSuppliers = suppliers.filter(
        (supplier) =>
            supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Truck className="text-emerald-500" />
                        Supplier Management
                    </h1>
                    <p className="text-gray-500">Manage your product suppliers and contacts.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search suppliers..."
                            className="input input-bordered pl-10 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setSearchTerm("")}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    <button className="btn btn-ghost border border-gray-200">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button
                        className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-none flex items-center gap-2"
                        onClick={() => openModal("add")}
                    >
                        <Plus size={18} />
                        Add Supplier
                    </button>
                </div>
            </div>

            {/* Suppliers Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {fetchingData ? (
                    <div className="p-12 text-center">
                        <span className="loading loading-spinner loading-lg text-emerald-500"></span>
                        <p className="mt-4 text-gray-500">Loading suppliers...</p>
                    </div>
                ) : filteredSuppliers.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 py-12">
                        <Truck size={48} className="mx-auto mb-4 opacity-20" />
                        <h3 className="text-lg font-medium text-gray-900">
                            {searchTerm ? "No Suppliers Found" : "No Suppliers Yet"}
                        </h3>
                        <p>
                            {searchTerm
                                ? "Try adjusting your search criteria."
                                : "Get started by adding your first supplier."}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>ID</th>
                                    <th>Supplier Name</th>
                                    <th>Contact Person</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSuppliers.map((supplier) => (
                                    <tr key={supplier.id} className="hover:bg-gray-50">
                                        <td className="font-mono text-gray-500">#{supplier.id}</td>
                                        <td className="font-semibold">{supplier.name}</td>
                                        <td>
                                            {supplier.contact_person ? (
                                                <span className="flex items-center gap-1">
                                                    <User size={14} className="text-gray-400" />
                                                    {supplier.contact_person}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td>
                                            {supplier.email ? (
                                                <span className="flex items-center gap-1">
                                                    <Mail size={14} className="text-gray-400" />
                                                    {supplier.email}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td>
                                            {supplier.phone ? (
                                                <span className="flex items-center gap-1">
                                                    <Phone size={14} className="text-gray-400" />
                                                    {supplier.phone}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="text-gray-500">
                                            {new Date(supplier.created_at).toLocaleDateString("en-PH")}
                                        </td>
                                        <td>
                                            <div className="flex gap-1">
                                                <button
                                                    className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50"
                                                    onClick={() => openModal("edit", supplier)}
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
                                                    onClick={() => openDeleteModal(supplier)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Truck className="text-emerald-500" size={20} />
                        {mode === "add" ? "Add New Supplier" : "Edit Supplier"}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Supplier Name <span className="text-red-500">*</span>
                                </span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g., Pet Food Co."
                                className="input input-bordered w-full"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-medium flex items-center gap-1">
                                    <User size={14} />
                                    Contact Person
                                </span>
                            </label>
                            <input
                                type="text"
                                name="contact_person"
                                placeholder="e.g., John Dela Cruz"
                                className="input input-bordered w-full"
                                value={formData.contact_person || ""}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-1">
                                        <Mail size={14} />
                                        Email
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="supplier@email.com"
                                    className="input input-bordered w-full"
                                    value={formData.email || ""}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-1">
                                        <Phone size={14} />
                                        Phone
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="+63 912 345 6789"
                                    className="input input-bordered w-full"
                                    value={formData.phone || ""}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-medium flex items-center gap-1">
                                    <MapPin size={14} />
                                    Address
                                </span>
                            </label>
                            <textarea
                                name="address"
                                placeholder="Full business address"
                                className="textarea textarea-bordered w-full"
                                rows={2}
                                value={formData.address || ""}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Notes</span>
                            </label>
                            <textarea
                                name="notes"
                                placeholder="Additional notes about this supplier"
                                className="textarea textarea-bordered w-full"
                                rows={2}
                                value={formData.notes || ""}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={() => {
                                modalRef.current?.close();
                                resetForm();
                            }}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-none"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    {mode === "add" ? "Adding..." : "Saving..."}
                                </>
                            ) : mode === "add" ? (
                                "Add Supplier"
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Delete Confirmation Modal */}
            <dialog ref={deleteModalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-600 flex items-center gap-2">
                        <Trash2 size={20} />
                        Confirm Deletion
                    </h3>
                    <p className="py-4">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold">{selectedSupplier?.name}</span>? This action
                        cannot be undone.
                    </p>
                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={() => {
                                deleteModalRef.current?.close();
                                setSelectedSupplier(null);
                            }}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-error text-white"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Deleting...
                                </>
                            ) : (
                                "Delete Supplier"
                            )}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Suppliers;
