import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

interface Order {
  id: string;
  sn: number;
  userId: string;
  userName: string;
  orderId: string;
  paidAmount: string;
  currency: string;
  gateway: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  payment: 'Paid' | 'Pending' | 'Failed';
}

interface ManageOrdersProps {
  defaultTab?: 'history' | 'pending';
}

const ManageOrders = ({ defaultTab = 'history' }: ManageOrdersProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'history' | 'pending'>(defaultTab);

  useEffect(() => {
    // Determine active tab from URL
    if (location.pathname.includes('/pending')) {
      setActiveTab('pending');
    } else {
      setActiveTab('history');
    }
  }, [location.pathname]);

  const [filters, setFilters] = useState({
    search: '',
    orderStatus: '',
    paymentStatus: '',
    orderBy: '',
    perPage: '10',
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      sn: 1,
      userId: '1',
      userName: 'Jason Thorne',
      orderId: '#JzN5lSt2yW',
      paidAmount: '155',
      currency: 'USD',
      gateway: 'Flutterwave',
      status: 'Completed',
      payment: 'Paid',
    },
    {
      id: '2',
      sn: 2,
      userId: '2',
      userName: 'Jhon Doe',
      orderId: '#B9X20FQ0H6',
      paidAmount: '181',
      currency: 'USD',
      gateway: 'Flutterwave',
      status: 'Completed',
      payment: 'Paid',
    },
    {
      id: '3',
      sn: 3,
      userId: '2',
      userName: 'Jhon Doe',
      orderId: '#F99j0kwFgv',
      paidAmount: '5375.52',
      currency: 'INR',
      gateway: 'Instamojo',
      status: 'Completed',
      payment: 'Paid',
    },
    {
      id: '4',
      sn: 4,
      userId: '2',
      userName: 'Jhon Doe',
      orderId: '#lt4LhLaVUT',
      paidAmount: '72201.55',
      currency: 'NGN',
      gateway: 'Paystack',
      status: 'Completed',
      payment: 'Paid',
    },
    {
      id: '5',
      sn: 5,
      userId: '2',
      userName: 'Jhon Doe',
      orderId: '#CqWcTVARJ3',
      paidAmount: '6271.44',
      currency: 'INR',
      gateway: 'Instamojo',
      status: 'Completed',
      payment: 'Paid',
    },
    {
      id: '6',
      sn: 6,
      userId: '2',
      userName: 'Jhon Doe',
      orderId: '#NF5DxoYH4J',
      paidAmount: '72',
      currency: 'USD',
      gateway: 'Mollie',
      status: 'Completed',
      payment: 'Paid',
    },
    {
      id: '7',
      sn: 7,
      userId: '3',
      userName: 'Jane Smith',
      orderId: '#ABC123XYZ',
      paidAmount: '99',
      currency: 'USD',
      gateway: 'Stripe',
      status: 'Pending',
      payment: 'Pending',
    },
    {
      id: '8',
      sn: 8,
      userId: '4',
      userName: 'Mike Johnson',
      orderId: '#XYZ789ABC',
      paidAmount: '150',
      currency: 'USD',
      gateway: 'PayPal',
      status: 'Pending',
      payment: 'Pending',
    },
  ]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  const handleViewOrder = (id: string) => {
    // Handle view order - navigate to detail page or show modal
    console.log('View order:', id);
  };

  // Filter orders based on active tab and filters
  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'history' && order.status !== 'Completed') return false;
    if (activeTab === 'pending' && order.status !== 'Pending') return false;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (
        !order.userName.toLowerCase().includes(searchLower) &&
        !order.orderId.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    if (filters.orderStatus && order.status !== filters.orderStatus) return false;
    if (filters.paymentStatus && order.payment !== filters.paymentStatus) return false;

    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case 'Paid':
        return 'bg-green-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Failed':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-4 sm:space-x-8">
          <button
            onClick={() => {
              setActiveTab('history');
              navigate('/admin/orders/history');
            }}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => {
              setActiveTab('pending');
              navigate('/admin/orders/pending');
            }}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Orders
          </button>
        </nav>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Search by user name or order ID..."
            />
          </div>

          {/* Order Status */}
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Order status</label>
            <select
              value={filters.orderStatus}
              onChange={(e) => handleFilterChange('orderStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Payment Status */}
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              value={filters.paymentStatus}
              onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Payment</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Order By */}
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Order By</label>
            <select
              value={filters.orderBy}
              onChange={(e) => handleFilterChange('orderBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Order</option>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Per Page */}
          <div className="md:w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">Per Page</label>
            <select
              value={filters.perPage}
              onChange={(e) => handleFilterChange('perPage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gateway
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`/admin/users/${order.userId}`}
                        className="text-primary hover:underline"
                      >
                        {order.userName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="text-primary hover:underline"
                      >
                        {order.orderId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.paidAmount} {order.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.gateway}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getPaymentColor(
                          order.payment
                        )}`}
                      >
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewOrder(order.id)}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          title="View Order"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          title="Delete Order"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;

