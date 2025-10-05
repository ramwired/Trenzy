import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4">
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Overview of your business performance
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="from-blue-500 to-cyan-600"
          delay={0.1}
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color="from-purple-500 to-pink-600"
          delay={0.2}
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color="from-green-500 to-emerald-600"
          delay={0.3}
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-orange-500 to-red-600"
          delay={0.4}
        />
      </div>

      {/* Chart Section */}
      <motion.div
        className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-2xl border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Sales & Revenue Trend
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Daily performance overview
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              <span className="text-gray-300 text-sm">Sales</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-300 text-sm">Revenue</span>
            </div>
          </div>
        </div>

        <div className="h-64 sm:h-80 lg:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis
                dataKey="name"
                stroke="#9CA3AF"
                fontSize={12}
                tickMargin={8}
              />
              <YAxis
                yAxisId="left"
                stroke="#9CA3AF"
                fontSize={12}
                tickMargin={8}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#9CA3AF"
                fontSize={12}
                tickMargin={8}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#10B981"
                strokeWidth={2}
                activeDot={{ r: 6, fill: "#10B981" }}
                name="Sales"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                activeDot={{ r: 6, fill: "#3B82F6" }}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color, delay = 0 }) => (
  <motion.div
    className={`relative bg-gradient-to-br ${color} rounded-2xl p-4 sm:p-6 shadow-xl overflow-hidden group hover:scale-105 transition-transform duration-300`}
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -2 }}
  >
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="absolute -inset-10 opacity-10">
      <div className="w-20 h-20 bg-white rounded-full blur-xl absolute -top-4 -right-4"></div>
    </div>

    <div className="relative z-10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
            {title}
          </p>
          <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold truncate">
            {value}
          </h3>
        </div>
        <div className="p-2 sm:p-3 bg-white/10 rounded-xl backdrop-blur-sm">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-3 sm:mt-4 flex items-center">
        <div className="w-full bg-black/20 rounded-full h-1.5">
          <div
            className="bg-white/40 h-1.5 rounded-full transition-all duration-1000"
            style={{
              width: "100%",
              animation: "pulse 2s infinite",
            }}
          ></div>
        </div>
      </div>
    </div>
  </motion.div>
);
