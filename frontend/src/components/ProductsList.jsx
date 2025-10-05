import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  console.log("products", products);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Desktop Table View - Hidden on mobile */}
      <motion.div
        className="hidden md:block bg-gray-800 shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    ₹{product.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {product.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-1 rounded-full ${
                      product.isFeatured
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-gray-600 text-gray-300"
                    } hover:bg-yellow-500 transition-colors duration-200`}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Mobile Card View - Visible only on mobile */}
      <motion.div
        className="md:hidden space-y-4 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-300">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-400 truncate">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
              <button
                onClick={() => toggleFeaturedProduct(product._id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  product.isFeatured
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-700 text-gray-300"
                } hover:bg-yellow-500 transition-colors duration-200`}
              >
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {product.isFeatured ? "Featured" : "Mark Featured"}
                </span>
              </button>

              <button
                onClick={() => deleteProduct(product._id)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-800/40 hover:text-red-300 transition-colors duration-200"
              >
                <Trash className="h-4 w-4" />
                <span className="text-sm font-medium">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductsList;
