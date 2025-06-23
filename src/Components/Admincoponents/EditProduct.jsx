import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Upload, Trash2 } from 'lucide-react';
import toast  from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { fetchFilteredProducts } from "../../redux/thunks/filterProductsThunk";
import { setFilters, resetFilters } from "../../redux/Slices/filtersSlice";

const productTypes = [
  'men', 'women', 'kids',
  'clothing', 'footwear', 'electronics',
  'smartphone', 'sports', 'toys',
  'books', 'grocery', 'accessories', 'furniture',
];

const brandOptions = [
  'Zara', 'Zudio', 'H&M', 'Levi', 'Nike', 'Adidas', 'Puma', 'Bata',
  'Samsung', 'LG', 'Sony', 'Philips', 'Apple', 'OnePlus', 'Xiaomi',
  'Nivia', 'Yonex', 'Decathlon', 'Cosco', 'Funskool', 'Lego', 'Mattel',
  'Hot Wheels', 'Penguin', 'HarperCollins', 'Oxford', 'Aashirvaad',
  'Tata', 'Fortune', 'Boat', 'Noise', 'Fossil', 'Godrej', 'Nilkamal', 'Ikea'
];

const EditProduct = ({ setShowEditProductModal, selectedProduct }) => {

 const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discount: '',
    quantity: '',
    type: '',
    brand: '',
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  // Populate form with existing product data
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title || '',
        description: selectedProduct.description || '',
        price: selectedProduct.price || '',
        discount: selectedProduct.discount || '',
        quantity: selectedProduct.quantity || '',
        type: selectedProduct.type || '',
        brand: selectedProduct.brand || '',
        image: null, // File input always starts null
      });
      setCurrentImageUrl(selectedProduct.image || '');
    }
  }, [selectedProduct]);

  const toggleModal = () => {
    setShowEditProductModal(false);
  };
 useEffect(() => {
    dispatch(resetFilters());
    dispatch(fetchFilteredProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      // Create preview URL for new image
      const previewUrl = URL.createObjectURL(file);
      setCurrentImageUrl(previewUrl);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setCurrentImageUrl('');
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (Number(formData.price) < 0 || Number(formData.quantity) < 0) {
      alert('Price and Quantity must be non-negative');
      return;
    }
    if (formData.discount && (Number(formData.discount) < 0 || Number(formData.discount) > 100)) {
      alert('Discount must be between 0-100%');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('quantity', formData.quantity);
    data.append('type', formData.type);
    data.append('brand', formData.brand);
    
    // Add discount only if it has a value
    if (formData.discount) {
      data.append('discount', formData.discount);
    }
    
    // Add image only if a new one is selected
    if (formData.image) {
      data.append('image', formData.image);
    }

    setIsLoading(true);

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/update/${selectedProduct._id}`, 
        data, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product updated sucessfuly");
     
       dispatch(resetFilters());
    dispatch(fetchFilteredProducts());
      toggleModal();
      // You can add a callback here to refresh the product list if needed
      // onProductUpdated && onProductUpdated();
    } catch (err) {
      toast.error('Error updating product:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 px-6 py-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <button 
            onClick={toggleModal}
            className="p-1 hover:bg-green-700 rounded"
            disabled={isLoading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Container */}
        <div className="max-h-[calc(90vh-100px)] overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={isLoading}
                placeholder="Enter product name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Category & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select category</option>
                  {productTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand <span className="text-red-500">*</span>
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select brand</option>
                  {brandOptions.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price, Quantity & Discount */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  required
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  max="100"
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Current Image Preview */}
            {currentImageUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Image
                </label>
                <div className="relative inline-block">
                  <img 
                    src={currentImageUrl.startsWith('blob:') ? currentImageUrl : `${process.env.REACT_APP_BACKEND_URL}${currentImageUrl}`}
                    alt="Product preview" 
                    className="w-32 h-32 object-cover border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    disabled={isLoading}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentImageUrl ? 'Change Product Image' : 'Product Image'}
              </label>
              <div className="relative">
                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      {formData.image ? formData.image.name : 'Click to upload new image'}
                    </p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    disabled={isLoading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                disabled={isLoading}
                placeholder="Enter product description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={toggleModal}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </span>
                ) : (
                  'Update Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;