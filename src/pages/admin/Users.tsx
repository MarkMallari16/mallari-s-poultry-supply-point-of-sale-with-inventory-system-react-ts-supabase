import type { User } from "../../types/user";
import { useEffect, useRef, useState } from "react"
import { deleteUserById, getAllUsers, updateUserById } from "../../services/api/users";

const Users = () => {
    const [users, setUsers] = useState<User[]>();
    //for add and update modal
    const modalRef = useRef<HTMLDialogElement>(null)
    //for delete modal
    const deleteModalRef = useRef<HTMLDialogElement>(null);
    //mode
    const [mode, setMode] = useState<"add" | "update">("add");
    //loading
    const [loading, setLoading] = useState<boolean>(true);
    //data
    const [formData, setFormData] = useState({
        id: "",
        fullName: "",
        email: "",
        role: "",
        createdAt: "",
        isActive: false
    })

    const [userId, setUserId] = useState<string>("");


    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const data = await getAllUsers();
            setUsers(data);
            setLoading(false);
        }
        fetchUsers();
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleAddModal = () => { }

    const handleUpdateModal = async () => {
        try {
            setLoading(true);
            const updated = await updateUserById(formData.id, {
                full_name: formData.fullName,
                email: formData.email,
                role: formData.role as any,
                is_active: formData.isActive as any
            });
            if (updated) {
                modalRef.current?.close();
                const data = await getAllUsers();
                setUsers(data);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteModal = async () => {
        const success = await deleteUserById(userId);
        if (success) {
            deleteModalRef.current?.close();
            const data = await getAllUsers();
            setUsers(data);
        }
    }
    const openModal = (selectedMode: "add" | "update", data?: any) => {
        setMode(selectedMode);

        if (selectedMode == "add") {
            setFormData({
                id: "",
                fullName: "",
                email: "",
                role: "",
                createdAt: "",
                isActive: false
            });
        } else if (selectedMode == "update") {
            setFormData({
                id: data.id,
                fullName: data.full_name,
                email: data.email,
                role: data.role,
                createdAt: data.created_at,
                isActive: data.is_active
            });
        }

        modalRef.current?.showModal();
    }
    const openDeleteModal = (id: string) => {
        if (deleteModalRef?.current) {
            setUserId(id);
            console.log(id)
            deleteModalRef.current.showModal();
        }
    }


    return (
        <>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">{mode === "add" ? "Add staff" : "Update staff"}</h3>
                    <div className="">
                        <label htmlFor="productName">Full Name</label>
                        <input type="text"
                            className="mt-1 block input w-full"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-1">
                        <label htmlFor="productName">Email</label>
                        <input type="email"
                            className="mt-1 block input w-full"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-1">
                        <label htmlFor="productName">Role</label>
                        <select name="role" value={formData.role} onChange={handleInputChange} className="select block w-full">
                            <option disabled={true} value="">Select Role</option>
                            <option value="cashier">Cashier</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <input type="checkbox" id="is_active" className="toggle" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                        <label htmlFor="is_active">Active</label>
                    </div>
                    <div className="modal-action">
                        <div className="flex gap-2">
                            <button className="btn" onClick={() => modalRef.current?.close()}>Close</button>
                            {mode === "add" ? (
                                <button className="btn bg-emerald-500" onClick={handleAddModal}>Add</button>
                            ) : (
                                <button className="btn btn-info" onClick={handleUpdateModal} disabled={loading}>Update</button>
                            )}
                        </div>
                    </div>
                </div>
            </dialog>
            <dialog ref={deleteModalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg ">Confirm User Deletion</h3>
                    <p className="py-4 ">
                        Are you sure you want to delete this user?
                        This action is permanent and cannot be undone.
                    </p>

                    <div className="modal-action ">
                        <button className="btn" onClick={() => deleteModalRef.current?.close()}>Cancel</button>
                        <button className="btn btn-error" onClick={handleDeleteModal}>
                            Delete User
                        </button>
                    </div>
                </div>
            </dialog>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Staff</h1>
                    <span className="text-gray-500">Manage your staff members.</span>
                </div>

                <button className="btn bg-emerald-500" onClick={() => openModal("add")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    Add staff
                </button>
            </div>

            <div>
                <div className="mt-3 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Active</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map(user => (
                                    <tr key={user.id}>
                                        <th>{user.id}</th>
                                        <td>{user.full_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td className="font-medium">{user.is_active ? "Active" : "Inactive"}</td>
                                        <td>
                                            <div className="flex gap-1">
                                                <button className="btn btn-info px-4 py-2" onClick={() => openModal("update", user)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>

                                                </button>
                                                <button className="btn btn-error px-4 py-2" onClick={() => openDeleteModal(user.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Users