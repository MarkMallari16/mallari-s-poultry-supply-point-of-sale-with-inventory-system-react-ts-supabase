
const Users = () => {
    return (
        <>
            <div>
                <h1 className="text-xl font-bold">Cashiers</h1>
                <span className="text-gray-500">Manage your cashiers</span>
            </div>
            <div>
                <div className="mt-6 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Mark Mallari</td>
                                <td>admin@gmail.com</td>
                                <td>Admin</td>
                                <td>Active</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>2</th>
                                <td>Jobert</td>
                                <td>cashier@gmail.com</td>
                                <td>Cashier</td>
                                <td>Active</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Users