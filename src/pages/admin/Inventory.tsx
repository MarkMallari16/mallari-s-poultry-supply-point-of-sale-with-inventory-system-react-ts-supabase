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
                {/* if there is a button in form, it will close the modal */}
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
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Inventory