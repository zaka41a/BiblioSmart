import {
  FiTrendingUp,
  FiDollarSign,
  FiShoppingCart,
  FiBarChart2,
  FiPieChart,
  FiAward
} from "react-icons/fi";
import { useBooks } from "../context/BookContext";
import { usePurchases } from "../context/PurchaseContext";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useMemo } from "react";

export const Analytics = () => {
  const { books } = useBooks();
  const { purchases } = usePurchases();

  // Calculate metrics
  const totalRevenue = useMemo(() => {
    return purchases.reduce((sum, p) => sum + (p.price || 0), 0);
  }, [purchases]);

  const totalSales = purchases.length;
  const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

  // Revenue growth data (last 7 days)
  const revenueData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const dayPurchases = purchases.filter(p => {
        const purchaseDate = new Date(p.purchaseDate).toISOString().split('T')[0];
        return purchaseDate === date;
      });
      const revenue = dayPurchases.reduce((sum, p) => sum + (p.price || 0), 0);

      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: revenue,
        sales: dayPurchases.length
      };
    });
  }, [purchases]);

  // Category distribution
  const categoryData = useMemo(() => {
    const categories: { [key: string]: number } = {};
    books.forEach(book => {
      categories[book.category] = (categories[book.category] || 0) + 1;
    });

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
  }, [books]);

  // Top selling books
  const topBooks = useMemo(() => {
    const bookSales: { [key: string]: number } = {};
    purchases.forEach(p => {
      bookSales[p.bookId] = (bookSales[p.bookId] || 0) + 1;
    });

    return Object.entries(bookSales)
      .map(([bookId, sales]) => {
        const book = books.find(b => b.id === bookId);
        return {
          title: book?.title || 'Unknown',
          sales,
          revenue: sales * (book?.price || 0)
        };
      })
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  }, [purchases, books]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                <FiBarChart2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            </div>
            <p className="text-blue-100">
              Track your library's performance and sales metrics
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Total Revenue */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-lg bg-green-100 p-3">
              <FiDollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Revenue
            </span>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">${totalRevenue.toFixed(2)}</p>
            <p className="text-sm font-medium text-slate-600 mt-1">Total Revenue</p>
          </div>
        </div>

        {/* Total Sales */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-lg bg-blue-100 p-3">
              <FiShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Sales
            </span>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">{totalSales}</p>
            <p className="text-sm font-medium text-slate-600 mt-1">Total Sales</p>
          </div>
        </div>

        {/* Average Order */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-lg bg-purple-100 p-3">
              <FiTrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
              Average
            </span>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">${averageOrderValue.toFixed(2)}</p>
            <p className="text-sm font-medium text-slate-600 mt-1">Average Order Value</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Revenue Trend</h2>
              <p className="text-sm text-slate-600">Last 7 days</p>
            </div>
            <div className="rounded-lg bg-green-100 p-2">
              <FiTrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
              />
              <YAxis
                stroke="#64748b"
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Activity */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sales Activity</h2>
              <p className="text-sm text-slate-600">Daily sales count</p>
            </div>
            <div className="rounded-lg bg-blue-100 p-2">
              <FiShoppingCart className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
              />
              <YAxis
                stroke="#64748b"
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar
                dataKey="sales"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                name="Sales"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category Distribution */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Category Distribution</h2>
              <p className="text-sm text-slate-600">Books by category</p>
            </div>
            <div className="rounded-lg bg-purple-100 p-2">
              <FiPieChart className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Books */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Top Selling Books</h2>
              <p className="text-sm text-slate-600">Best performers</p>
            </div>
            <div className="rounded-lg bg-amber-100 p-2">
              <FiAward className="h-5 w-5 text-amber-600" />
            </div>
          </div>

          <div className="space-y-3">
            {topBooks.length > 0 ? (
              topBooks.slice(0, 5).map((book, index) => (
                <div
                  key={book.title}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:bg-slate-100"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">{book.title}</p>
                      <p className="text-xs text-slate-600">{book.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <p className="font-bold text-green-600 text-sm">${book.revenue.toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400">
                <FiShoppingCart className="mx-auto mb-2 h-10 w-10" />
                <p className="text-sm font-medium">No sales data yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
