import { useState } from "react";
import { Eye, Search, Download, ChevronLeft, ChevronRight, DollarSign, ShoppingBag, CreditCard } from "lucide-react";
import type { Sale } from "../../types/sales";

// Mock Data Generation
const generateMockSales = (count: number): Sale[] => {
  const sales: Sale[] = [];
  const statuses: Sale['status'][] = ['Completed', 'Completed', 'Completed', 'Refunded', 'Cancelled'];
  const methods: Sale['paymentMethod'][] = ['Cash', 'Card', 'E-Wallet'];

  for (let i = 1; i <= count; i++) {
    sales.push({
      id: i.toString(),
      transactionId: `TRX-${10000 + i}`,
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      totalAmount: Math.floor(Math.random() * 5000) + 100,
      paymentMethod: methods[Math.floor(Math.random() * methods.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      cashierName: `Cashier ${Math.floor(Math.random() * 5) + 1}`,
      items: [
        { productId: 1, productName: "Product A", quantity: 2, price: 150 },
        { productId: 2, productName: "Product B", quantity: 1, price: 300 },
      ]
    });
  }
  return sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const MOCK_SALES = generateMockSales(50);

const SalesHistory = () => {
  const [sales] = useState<Sale[]>(MOCK_SALES);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const itemsPerPage = 10;

  // Filter Logic
  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sale.cashierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || sale.status === statusFilter;
    const matchesDate = !dateFilter || sale.date.startsWith(dateFilter);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats Calculation
  const totalRevenue = filteredSales.reduce((sum, sale) => sale.status === 'Completed' ? sum + sale.totalAmount : sum, 0);
  const totalTransactions = filteredSales.length;
  const averageOrderValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale);
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
          <div className="stat-value text-primary">${totalRevenue.toLocaleString()}</div>
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
          <div className="stat-value text-accent">${averageOrderValue.toFixed(2)}</div>
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
            {paginatedSales.length > 0 ? (
              paginatedSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-base-300">
                  <td className="font-mono font-bold">{sale.transactionId}</td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold">{new Date(sale.date).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-500">{new Date(sale.date).toLocaleTimeString()}</span>
                    </div>
                  </td>
                  <td>{sale.cashierName}</td>
                  <td>
                    <div className="badge badge-ghost gap-2">
                      {sale.paymentMethod}
                    </div>
                  </td>
                  <td className="font-bold">${sale.totalAmount.toFixed(2)}</td>
                  <td>
                    <div className={`badge ${
                      sale.status === 'Completed' ? 'badge-success' : 
                      sale.status === 'Refunded' ? 'badge-warning' : 'badge-error'
                    } gap-2`}>
                      {sale.status}
                    </div>
                  </td>
                  <td>
                    <button 
                      className="btn btn-ghost btn-sm btn-square"
                      onClick={() => handleViewDetails(sale)}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No sales records found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-base-200 p-4 rounded-box">
        <span className="text-sm text-gray-500">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredSales.length)} of {filteredSales.length} entries
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
          {selectedSale && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-base-200 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Transaction ID</p>
                  <p className="font-bold">{selectedSale.transactionId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-bold">{new Date(selectedSale.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Cashier</p>
                  <p className="font-bold">{selectedSale.cashierName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`badge ${
                      selectedSale.status === 'Completed' ? 'badge-success' : 
                      selectedSale.status === 'Refunded' ? 'badge-warning' : 'badge-error'
                    }`}>
                    {selectedSale.status}
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
                    {selectedSale.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.productName}</td>
                        <td className="text-right">${item.price.toFixed(2)}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="text-right font-bold">Total Amount:</td>
                      <td className="text-right font-bold text-lg">${selectedSale.totalAmount.toFixed(2)}</td>
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