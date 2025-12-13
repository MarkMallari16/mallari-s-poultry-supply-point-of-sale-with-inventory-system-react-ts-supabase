import { useState, useEffect } from "react";
import { Eye, Search, Download, ChevronLeft, ChevronRight, DollarSign, ShoppingBag, CreditCard, Loader2 } from "lucide-react";
import type { Order } from "../../types/orders";
import { getAllOrders } from "../../services/api/orders";

const SalesHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const itemsPerPage = 10;

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  // Filter Logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.cashier_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesDate = !dateFilter || (order.created_at && order.created_at.startsWith(dateFilter));

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats Calculation
  const totalRevenue = filteredOrders.reduce((sum, order) => order.status === 'Completed' ? sum + order.total_amount : sum, 0);
  const totalTransactions = filteredOrders.length;
  const averageOrderValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    (document.getElementById('sale_details_modal') as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="min-h-screen p-4 space-y-6 bg-base-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sales History</h1>
          <p className="text-gray-500">View and manage your past sales records.</p>
        </div>
        <button className="btn btn-primary gap-2">
          <Download size={20} />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-box shadow-sm">
          <div className="stat-figure text-primary">
            <DollarSign size={32} />
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-primary">₱{totalRevenue.toLocaleString()}</div>
          <div className="stat-desc">Based on current filters</div>
        </div>

        <div className="stat bg-base-200 rounded-box shadow-sm">
          <div className="stat-figure text-secondary">
            <ShoppingBag size={32} />
          </div>
          <div className="stat-title">Total Transactions</div>
          <div className="stat-value text-secondary">{totalTransactions}</div>
          <div className="stat-desc">Processed orders</div>
        </div>

        <div className="stat bg-base-200 rounded-box shadow-sm">
          <div className="stat-figure text-accent">
            <CreditCard size={32} />
          </div>
          <div className="stat-title">Avg. Order Value</div>
          <div className="stat-value text-accent">₱{averageOrderValue.toFixed(2)}</div>
          <div className="stat-desc">Revenue / Transactions</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-base-200 p-4 rounded-box">
        <div className="form-control flex-1">
          <div className="input-group flex items-center bg-base-100 rounded-lg px-3 border border-base-300">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search Transaction ID or Cashier..."
              className="input input-ghost w-full focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <select
          className="select select-bordered w-full md:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Refunded">Refunded</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          className="input input-bordered w-full md:w-auto"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-200 rounded-box shadow-sm">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date & Time</th>
              <th>Cashier</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-8">
                  <Loader2 className="animate-spin inline-block" size={24} />
                  <span className="ml-2">Loading orders...</span>
                </td>
              </tr>
            ) : paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-base-300">
                  <td className="font-mono font-bold">{order.transaction_id}</td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold">{order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</span>
                      <span className="text-xs text-gray-500">{order.created_at ? new Date(order.created_at).toLocaleTimeString() : '-'}</span>
                    </div>
                  </td>
                  <td>{order.cashier_name}</td>
                  <td>
                    <div className="badge badge-ghost gap-2">
                      {order.payment_method}
                    </div>
                  </td>
                  <td className="font-bold">₱{order.total_amount.toFixed(2)}</td>
                  <td>
                    <div className={`badge ${order.status === 'Completed' ? 'badge-success' :
                      order.status === 'Refunded' ? 'badge-warning' : 'badge-error'
                      } gap-2`}>
                      {order.status}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost btn-sm btn-square"
                      onClick={() => handleViewDetails(order)}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No orders found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-base-200 p-4 rounded-box">
        <span className="text-sm text-gray-500">
          Showing {filteredOrders.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
        </span>
        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <button className="join-item btn btn-sm">Page {currentPage}</button>
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Details Modal */}
      <dialog id="sale_details_modal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg mb-4">Transaction Details</h3>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-base-200 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Transaction ID</p>
                  <p className="font-bold">{selectedOrder.transaction_id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-bold">{selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleDateString() : '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Cashier</p>
                  <p className="font-bold">{selectedOrder.cashier_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`badge ${selectedOrder.status === 'Completed' ? 'badge-success' :
                    selectedOrder.status === 'Refunded' ? 'badge-warning' : 'badge-error'
                    }`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="text-right">Price</th>
                      <th className="text-center">Qty</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.product_name}</td>
                        <td className="text-right">₱{item.unit_price.toFixed(2)}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-right">₱{item.subtotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="text-right font-bold">Total Amount:</td>
                      <td className="text-right font-bold text-lg">₱{selectedOrder.total_amount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SalesHistory