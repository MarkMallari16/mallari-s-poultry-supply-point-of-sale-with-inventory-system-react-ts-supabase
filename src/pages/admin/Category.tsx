
import { useEffect, useRef, useState } from "react";
import type { Category as CategoryType } from "../../types/categories";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "../../services/api/categories";
import { Edit, Trash2 } from "lucide-react";

const Category = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"add" | "update">("add");
  const [formData, setFormData] = useState<{ id?: number; name: string; species: string }>({ name: "", species: "" });
  const [selected, setSelected] = useState<CategoryType | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  const refresh = async () => {
    setLoading(true);
    const data = await getAllCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const openModal = (m: "add" | "update", item?: CategoryType) => {
    setMode(m);
    if (m === "update" && item) {
      setSelected(item);
      setFormData({ id: item.id, name: item.name, species: item.species ?? "" });
    } else {
      setSelected(null);
      setFormData({ name: "", species: "" });
    }
    modalRef.current?.showModal();
  };

  const openDelete = (item: CategoryType) => {
    setSelected(item);
    deleteModalRef.current?.showModal();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (mode === "add") {
        const created = await addCategory({ name: formData.name, species: formData.species });
        if (created) {
          await refresh();
          modalRef.current?.close();
        }
      } else if (mode === "update" && selected?.id) {
        const updated = await updateCategory(selected.id, { name: formData.name, species: formData.species });
        if (updated) {
          await refresh();
          modalRef.current?.close();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!selected) return;

    setLoading(true);
    const ok = await deleteCategory(selected.id);

    if (ok) {
      await refresh();
      deleteModalRef.current?.close();
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h3 className="text-2xl font-bold">Categories</h3>
          <p className="text-gray-500">Manage all product categories.</p>
        </div>

        <button className="btn bg-emerald-500 w-full sm:w-auto" onClick={() => openModal("add")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Category
        </button>
      </div>
      <div className="mt-4 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Species</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.species}</td>
                <td>{new Date(c.created_at).toLocaleDateString("en-PH")}</td>
                <td>
                  <div className="inline-flex gap-1">
                    <button className="btn btn-info" onClick={() => openModal("update", c)}> <Edit className="size-5" /></button>
                    <button className="btn btn-error" onClick={() => openDelete(c)}><Trash2 className="size-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">{mode === "add" ? "Add Category" : "Update Category"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.name}
                placeholder="Enter category name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label className="label">Species</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.species}
                placeholder="Enter species name"
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => modalRef.current?.close()}>Close</button>
            <button className="btn btn-info" onClick={handleSubmit} disabled={loading}>
              {mode === "add" ? "Add" : "Update"}
            </button>
          </div>
        </div>
      </dialog>
      <dialog ref={deleteModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Category</h3>
          <p className="py-3">Are you sure you want to delete <span className="font-semibold">{selected?.name}</span>?</p>
          <div className="modal-action">
            <button className="btn" onClick={() => deleteModalRef.current?.close()}>Cancel</button>
            <button className="btn btn-error" onClick={confirmDelete} disabled={loading}>Delete</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Category;