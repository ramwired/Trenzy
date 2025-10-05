import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, X } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
  "mobile phones",
  "laptops",
  "smart watches",
  "skincare",
  "books",
  "cameras",
  "Gaming consoles",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch {
      console.log("error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file); // base64
    }
  };

  const removeImage = () => {
    setNewProduct({ ...newProduct, image: "" });
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 mb-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-emerald-300 text-center sm:text-left">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows="3"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base resize-none"
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Price and Category Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              step="0.01"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base"
              placeholder="0.00"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base"
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Image
          </label>
          {!newProduct.image ? (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors duration-200">
              <input
                type="file"
                id="image"
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image"
                className="cursor-pointer flex flex-col items-center justify-center w-full"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-400">
                  Click to upload image
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PNG, JPG, JPEG up to 5MB
                </span>
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={newProduct.image}
                alt="Product preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-600"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors duration-200"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;