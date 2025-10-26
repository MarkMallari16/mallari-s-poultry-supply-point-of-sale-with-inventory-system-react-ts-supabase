import { Plus } from "lucide-react"
import { useRef } from "react"

const Inventory = () => {
  const addModal = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (addModal.current) {
      addModal.current?.showModal();
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Inventory Management</h1>
          <span className="text-gray-500">Manage your product catalog</span>
        </div>
        <button onClick={openModal} className="btn btn-success">
          <Plus className="size-4" />
          Add new product
        </button>
        <dialog ref={addModal} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
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
                <div className="inline-flex gap-2 ">
                  <button className="bg-error rounded-sm px-4 py-1 cursor-pointer">Edit</button>
                  <button className="bg-blue-500 rounded-sm px-4 py-1 cursor-pointer">Delete</button>
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