

// this one keep best one 

// import React, { useState } from 'react';
// import axios from 'axios';
// import { X, Upload, Trash2, ShoppingBag, Tag, DollarSign, Package, Percent, FileText, Camera } from 'lucide-react';

// const productTypes = [
//   'men', 'women', 'kids',
//   'clothing', 'footwear', 'electronics',
//   'smartphone', 'sports', 'toys',
//   'books', 'grocery', 'accessories', 'furniture',
// ];

// const brandOptions = [
//   'Zara', 'Zudio', 'H&M', 'Levi', 'Nike', 'Adidas', 'Puma', 'Bata',
//   'Samsung', 'LG', 'Sony', 'Philips', 'Apple', 'OnePlus', 'Xiaomi',
//   'Nivia', 'Yonex', 'Decathlon', 'Cosco', 'Funskool', 'Lego', 'Mattel',
//   'Hot Wheels', 'Penguin', 'HarperCollins', 'Oxford', 'Aashirvaad',
//   'Tata', 'Fortune', 'Boat', 'Noise', 'Fossil', 'Godrej', 'Nilkamal', 'Ikea'
// ];

// const AddProductModal = ({ showAddProductModal, setShowAddProductModal }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     discount: '',
//     quantity: '',
//     type: '',
//     brand: '',
//     image: null,
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const toggleModal = () => setShowAddProductModal(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setFormData(prev => ({ ...prev, image: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (Number(formData.price) < 0 || Number(formData.quantity) < 0) {
//       alert('Price and Quantity must be non-negative');
//       return;
//     }
//     if (formData.discount && (Number(formData.discount) < 0 || Number(formData.discount) > 100)) {
//       alert('Discount must be between 0-100%');
//       return;
//     }

//     const data = new FormData();
//     for (let key in formData) {
//       if (formData[key] !== null && formData[key] !== '') {
//         data.append(key, formData[key]);
//       }
//     }

//     setIsLoading(true);




//     const token = localStorage.getItem("token");

//     try {
//       await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/add`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//       alert('Product added successfully!');
//       setFormData({
//         title: '', description: '', price: '', discount: '',
//         quantity: '', type: '', brand: '', image: null,
//       });
//       toggleModal();
//     } catch (err) {
//       console.error('Error adding product:', err);
//       alert('Failed to add product. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // if (!showAddProductModal) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//       <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
//                 <ShoppingBag className="h-6 w-6" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold">Add New Product</h2>
//                 <p className="text-blue-100 text-sm">Fill in the details to add a new product</p>
//               </div>
//             </div>
//             <button 
//               onClick={toggleModal}
//               className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//               disabled={isLoading}
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//         </div>

//         {/* Form Container */}
//         <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
//           <div className="p-6">
//             {/* Mobile & Tablet Layout */}
//             <div className="lg:hidden space-y-6">
//               {/* Product Name */}
//               <div className="space-y-2">
//                 <label className="flex items-center text-sm font-semibold text-gray-700">
//                   <Tag className="h-4 w-4 mr-2 text-blue-600" />
//                   Product Name*
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   required
//                   disabled={isLoading}
//                   placeholder="Enter product name"
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                 />
//               </div>

//               {/* Category & Brand */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700">
//                     <Package className="h-4 w-4 mr-2 text-blue-600" />
//                     Category*
//                   </label>
//                   <select
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                   >
//                     <option value="">Select category</option>
//                     {productTypes.map(type => (
//                       <option key={type} value={type}>
//                         {type.charAt(0).toUpperCase() + type.slice(1)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700">
//                     <Tag className="h-4 w-4 mr-2 text-purple-600" />
//                     Brand*
//                   </label>
//                   <select
//                     name="brand"
//                     value={formData.brand}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                   >
//                     <option value="">Select brand</option>
//                     {brandOptions.map(brand => (
//                       <option key={brand} value={brand}>{brand}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Price & Quantity */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700">
//                     <DollarSign className="h-4 w-4 mr-2 text-green-600" />
//                     Price (₹)*
//                   </label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     placeholder="0.00"
//                     min="0"
//                     step="0.01"
//                     required
//                     disabled={isLoading}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700">
//                     <Package className="h-4 w-4 mr-2 text-orange-600" />
//                     Stock Quantity*
//                   </label>
//                   <input
//                     type="number"
//                     name="quantity"
//                     value={formData.quantity}
//                     onChange={handleChange}
//                     placeholder="0"
//                     min="0"
//                     required
//                     disabled={isLoading}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                   />
//                 </div>
//               </div>

//               {/* Discount */}
//               <div className="space-y-2">
//                 <label className="flex items-center text-sm font-semibold text-gray-700">
//                   <Percent className="h-4 w-4 mr-2 text-red-600" />
//                   Discount (%)
//                 </label>
//                 <input
//                   type="number"
//                   name="discount"
//                   value={formData.discount}
//                   onChange={handleChange}
//                   placeholder="0"
//                   min="0"
//                   max="100"
//                   disabled={isLoading}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                 />
//               </div>

//               {/* Image Upload */}
//               <div className="space-y-2">
//                 <label className="flex items-center text-sm font-semibold text-gray-700">
//                   <Camera className="h-4 w-4 mr-2 text-purple-600" />
//                   Product Image*
//                 </label>
//                 <div className="relative">
//                   <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <Upload className="h-8 w-8 mb-2 text-gray-400" />
//                       <p className="text-sm text-gray-500">
//                         {formData.image ? formData.image.name : 'Click to upload image'}
//                       </p>
//                     </div>
//                     <input
//                       type="file"
//                       name="image"
//                       onChange={handleImageChange}
//                       accept="image/*"
//                       required
//                       disabled={isLoading}
//                       className="hidden"
//                     />
//                   </label>
//                   {formData.image && (
//                     <button
//                       type="button"
//                       onClick={() => setFormData(prev => ({ ...prev, image: null }))}
//                       disabled={isLoading}
//                       className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="space-y-2">
//                 <label className="flex items-center text-sm font-semibold text-gray-700">
//                   <FileText className="h-4 w-4 mr-2 text-indigo-600" />
//                   Description*
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="4"
//                   required
//                   disabled={isLoading}
//                   placeholder="Enter product description"
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                 />
//               </div>
//             </div>

//             {/* Desktop Layout */}
//             <div className="hidden lg:grid grid-cols-2 gap-8">
//               {/* Left Column */}
//               <div className="space-y-6">
//                 {/* Product Name */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700">
//                     <Tag className="h-4 w-4 mr-2 text-blue-600" />
//                     Product Name*
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     placeholder="Enter product name"
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                   />
//                 </div>

//                 {/* Category & Brand */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="flex items-center text-sm font-semibold text-gray-700">
//                       <Package className="h-4 w-4 mr-2 text-blue-600" />
//                       Category*
//                     </label>
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleChange}
//                       required
//                       disabled={isLoading}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                     >
//                       <option value="">Select category</option>
//                       {productTypes.map(type => (
//                         <option key={type} value={type}>
//                           {type.charAt(0).toUpperCase() + type.slice(1)}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="flex items-center text-sm font-semibold text-gray-700">
//                       <Tag className="h-4 w-4 mr-2 text-purple-600" />
//                       Brand*
//                     </label>
//                     <select
//                       name="brand"
//                       value={formData.brand}
//                       onChange={handleChange}
//                       required
//                       disabled={isLoading}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                     >
//                       <option value="">Select brand</option>
//                       {brandOptions.map(brand => (
//                         <option key={brand} value={brand}>{brand}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Price & Quantity */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="flex items-center text-sm font-semibold text-gray-700">
//                       <DollarSign className="h-4 w-4 mr-2 text-green-600" />
//                       Price (₹)*
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       placeholder="0.00"
//                       min="0"
//                       step="0.01"
//                       required
//                       disabled={isLoading}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="flex items-center text-sm font-semibold text-gray-700">
//                       <Package className="h-4 w-4 mr-2 text-orange-600" />
//                       Stock Quantity*
//                     </label>
//                     <input
//                       type="number"
//                       name="quantity"
//                       value={formData.quantity}
//                       onChange={handleChange}
//                       placeholder="0"
//                       min="0"
//                       required
//                       disabled={isLoading}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                     />
//                   </div>
//                 </div>

//                 {/* Discount */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700">
//                     <Percent className="h-4 w-4 mr-2 text-red-600" />
//                     Discount (%)
//                   </label>
//                   <input
//                     type="number"
//                     name="discount"
//                     value={formData.discount}
//                     onChange={handleChange}
//                     placeholder="0"
//                     min="0"
//                     max="100"
//                     disabled={isLoading}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                   />
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-6">
//                 {/* Image Upload */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700">
//                     <Camera className="h-4 w-4 mr-2 text-purple-600" />
//                     Product Image*
//                   </label>
//                   <div className="relative">
//                     <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <Upload className="h-12 w-12 mb-4 text-gray-400" />
//                         <p className="mb-2 text-sm text-gray-500">
//                           {formData.image ? formData.image.name : 'Click to upload image'}
//                         </p>
//                         <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
//                       </div>
//                       <input
//                         type="file"
//                         name="image"
//                         onChange={handleImageChange}
//                         accept="image/*"
//                         required
//                         disabled={isLoading}
//                         className="hidden"
//                       />
//                     </label>
//                     {formData.image && (
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, image: null }))}
//                         disabled={isLoading}
//                         className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-semibold text-gray-700">
//                     <FileText className="h-4 w-4 mr-2 text-indigo-600" />
//                     Description*
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows="8"
//                     required
//                     disabled={isLoading}
//                     placeholder="Enter detailed product description"
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white disabled:opacity-50"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200 mt-8">
//               <button
//                 type="button"
//                 onClick={toggleModal}
//                 disabled={isLoading}
//                 className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Adding Product...
//                   </>
//                 ) : (
//                   'Add Product'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductModal;










import React, { useState } from 'react';
import axios from 'axios';
import { X, Upload, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

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

const AddProductModal = ({ showAddProductModal, setShowAddProductModal }) => {
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

  const toggleModal = () => setShowAddProductModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
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
    for (let key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    }

    setIsLoading(true);

    const token = localStorage.getItem("token");

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Product added successfully!');
      setFormData({
        title: '', description: '', price: '', discount: '',
        quantity: '', type: '', brand: '', image: null,
      });
      toggleModal();
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <button 
            onClick={toggleModal}
            className="p-1 hover:bg-blue-700 rounded"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      {formData.image ? formData.image.name : 'Click to upload image'}
                    </p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                    disabled={isLoading}
                    className="hidden"
                  />
                </label>
                {formData.image && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                    disabled={isLoading}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </span>
                ) : (
                  'Add Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;