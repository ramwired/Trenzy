import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [isMobile, setIsMobile] = useState(false);
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 container mx-auto px-3 sm:px-6 py-4 sm:py-8 lg:py-12">
        {/* Header - Mobile Optimized */}
        <motion.div
          className="text-center mb-6 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-xs sm:text-base">
            Manage your store
          </p>
        </motion.div>

        {/* Desktop Tabs */}
        {!isMobile && (
          <motion.div
            className="flex justify-center mb-8 lg:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50 shadow-2xl">
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/25"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    <tab.icon className="mr-3 h-5 w-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content - Mobile Optimized */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-800/40 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700/30 shadow-xl sm:shadow-2xl mb-16 sm:mb-0"
        >
          <div className="p-3 sm:p-6 lg:p-8 min-h-[60vh]">
            {activeTab === "create" && <CreateProductForm />}
            {activeTab === "products" && <ProductsList />}
            {activeTab === "analytics" && <AnalyticsTab />}
          </div>
        </motion.div>

        {/* Mobile Bottom Navigation - Fixed & Perfect */}
        {isMobile && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {/* Safe area spacer for iOS */}
            <div className="pb-safe">
              <div className="bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/60 shadow-2xl">
                <div className="flex justify-between items-center px-2 py-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center flex-1 p-2 rounded-lg transition-all duration-300 mx-1 min-h-[60px] justify-center ${
                        activeTab === tab.id
                          ? "bg-gradient-to-b from-emerald-600 to-emerald-700 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <tab.icon
                        className={`h-5 w-5 mb-1 ${
                          activeTab === tab.id ? "scale-110" : ""
                        }`}
                      />
                      <span className="text-[10px] font-medium truncate w-full text-center">
                        {tab.label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
