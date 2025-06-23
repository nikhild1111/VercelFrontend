// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFilteredProducts } from "../../redux/thunks/filterProductsThunk";
// import { setFilters, resetFilters } from "../../redux/Slices/filtersSlice";
// import { Eye, Edit, Trash2, Plus } from "lucide-react";
// import Modal from "./Modal";
// import AddProduct from "../../Components/AddProduct";
// import toast from "react-hot-toast";
// import axios from "axios";

// const AdminProductPanel = () => {
//   const dispatch = useDispatch();
//   const { keyword, type, priceRange, brands, page, totalPages, sortBy, sortOrder, minRating, inStock, minDiscount } = useSelector(state => state.filters);
//   const [showProductModal, setShowProductModal] = useState(false);
//   const [showAddProductModal, setShowAddProductModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     dispatch(fetchFilteredProducts()).then(res => setProducts(res.payload));
//   }, [keyword, type, priceRange, brands, page, sortBy, sortOrder, minRating, inStock, minDiscount]);

//   const handleFilter = () => {
//     dispatch(fetchFilteredProducts());
//     toast.success("Your data has been filtered");
//   };

//   const handleClearFilters = () => {
//     dispatch(resetFilters());
//     dispatch(fetchFilteredProducts());
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`/api/products/delete/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       toast.success("Product deleted");
//       dispatch(fetchFilteredProducts());
//     } catch (error) {
//       toast.error("Delete failed");
//     }
//   };

//   const renderFilters = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-white rounded-xl shadow">
//       <input value={keyword} onChange={e => dispatch(setFilters({ keyword: e.target.value }))} placeholder="Search..." className="border p-2 rounded" />
//       <input value={type} onChange={e => dispatch(setFilters({ type: e.target.value }))} placeholder="Category" className="border p-2 rounded" />
//       <input type="number" value={priceRange} onChange={e => dispatch(setFilters({ priceRange: e.target.value }))} placeholder="Max Price" className="border p-2 rounded" />
//       <input value={brands} onChange={e => dispatch(setFilters({ brands: [e.target.value] }))} placeholder="Brand" className="border p-2 rounded" />
//       <input type="number" value={minRating || ''} onChange={e => dispatch(setFilters({ minRating: e.target.value }))} placeholder="Min Rating" className="border p-2 rounded" />
//       <input type="number" value={minDiscount || ''} onChange={e => dispatch(setFilters({ minDiscount: e.target.value }))} placeholder="Min Discount" className="border p-2 rounded" />
//       <button onClick={handleFilter} className="bg-blue-600 text-white py-2 rounded">Apply</button>
//       <button onClick={handleClearFilters} className="bg-gray-400 text-white py-2 rounded">Clear</button>
//     </div>
//   );

//   const renderProducts = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
//         <button
//           onClick={() => setShowAddProductModal(true)}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Product
//         </button>
//       </div>

//       {renderFilters()}

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {products.map((product) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt={product.title} />
//                     <div className="ml-4">
//                       <button
//                         onClick={() => {
//                           setSelectedProduct(product);
//                           setShowProductModal(true);
//                         }}
//                         className="text-sm font-medium text-blue-600 hover:text-blue-800 truncate max-w-[150px]"
//                       >
//                         {product.title}
//                       </button>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.type}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                   <button
//                     onClick={() => {
//                       setSelectedProduct(product);
//                       setShowProductModal(true);
//                     }}
//                     className="text-blue-600 hover:text-blue-900"
//                   >
//                     <Eye className="w-4 h-4" />
//                   </button>
//                   <button className="text-green-600 hover:text-green-900">
//                     <Edit className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => deleteProduct(product._id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

 
//       {showAddProductModal && <AddProduct onSuccess={() => {
//           dispatch(fetchFilteredProducts());
//           setShowAddProductModal(false);
//         }} />
//       }
    

//       <Modal isOpen={showProductModal} onClose={() => setShowProductModal(false)} title="Product Details">
//         {selectedProduct && (
//           <div className="space-y-4">
//             <div className="flex items-center space-x-4">
//               <img src={selectedProduct.image} alt={selectedProduct.title} className="w-20 h-20 rounded-lg object-cover" />
//               <div>
//                 <h3 className="text-lg font-semibold">{selectedProduct.title}</h3>
//                 <p className="text-gray-600">{selectedProduct.type}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Price</label>
//                 <p className="text-lg font-semibold">${selectedProduct.price}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Stock</label>
//                 <p className="text-lg font-semibold">{selectedProduct.inStock ? 'Available' : 'Out of Stock'}</p>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Description</label>
//               <p className="text-gray-900">{selectedProduct.description}</p>
//             </div>
//             <div className="flex space-x-3 pt-4">
//               <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                 Edit Product
//               </button>
//               <button
//                 onClick={() => deleteProduct(selectedProduct._id)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );

//   return renderProducts();
// };

// export default AdminProductPanel;










import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts } from "../../redux/thunks/filterProductsThunk";
import { setFilters, resetFilters } from "../../redux/Slices/filtersSlice";
import { Eye, Edit, Trash2, Plus, Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "./Modal";
import EditProduct from "./EditProduct";
import PaymentStatusModal from "../StatusModalLoading";
import AddProduct from "../AddProduct";
import toast from "react-hot-toast";
import axios from "axios";
 import Pagination from '../Pagination'; 
import ConfirmModal from "../ConfirmModal";
import { updatePage } from "../../redux/Slices/filtersSlice";
import FilterSidebar from "../FilterSidebar"; // Adjust the path as per your project


const AdminProductPanel = () => {
  const dispatch = useDispatch();
  const { posts: products } = useSelector(state => state.products);



  const { 
    keyword, 
    type, 
    priceRange, 
    brands, 
    page, 
    totalPages, 
    sortBy, 
    sortOrder, 
    minRating, 
    inStock, 
    minDiscount 
  } = useSelector(state => state.filters);

  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
const [isDeleting, setIsDeleting] = useState(false);

 
  const [showconfirmModal, setShowconfirmModal] = useState(false);

  // Local filter states
  const [localFilters, setLocalFilters] = useState({
    keyword: '',
    type: '',
    priceRange: 1000,
    brands: [],
    sortBy: 'createdAt',
    sortOrder: 'desc',
    minRating: '',
    inStock: '',
    minDiscount: ''
  });

  const productTypes = [
    'men', 'women', 'kids',
    'clothing', 'footwear', 'electronics',
    'smartphone', 'sports', 'toys',
    'books', 'grocery', 'accessories', 'furniture'
  ];

  const brandOptionsMap = {
    men: ['Many Brands'],
    women: ['Many Brands'],
    kids: ['Many Brands'],
    clothing: ['Zara', 'Zudio', 'H&M', 'Levi'],
    footwear: ['Nike', 'Adidas', 'Puma', 'Bata'],
    electronics: ['Samsung', 'LG', 'Sony', 'Philips'],
    smartphone: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi'],
    sports: ['Nivia', 'Yonex', 'Decathlon', 'Cosco'],
    toys: ['Funskool', 'Lego', 'Mattel', 'Hot Wheels'],
    books: ['Penguin', 'HarperCollins', 'Oxford'],
    grocery: ['Aashirvaad', 'Tata', 'Fortune'],
    accessories: ['Boat', 'Noise', 'Fossil'],
    furniture: ['Godrej', 'Nilkamal', 'Ikea']
  };

  // Initialize products on component mount
  useEffect(() => {
    dispatch(fetchFilteredProducts());
  }, [dispatch]);

  // Handle filter changes
  useEffect(() => {
      dispatch(fetchFilteredProducts());
  }, [dispatch, keyword, type, priceRange, totalPages, brands, page, sortBy, sortOrder, minRating, inStock, minDiscount]);

  const handleFilter = () => {
    dispatch(setFilters({
      keyword: localFilters.keyword,
      type: localFilters.type,
      priceRange: localFilters.priceRange,
      brands: localFilters.brands,
      sortBy: localFilters.sortBy,
      sortOrder: localFilters.sortOrder,
      minRating: localFilters.minRating || null,
      inStock: localFilters.inStock === '' ? null : localFilters.inStock === 'true',
      minDiscount: localFilters.minDiscount || null,
      page: 1
    }));
    toast.success("Filters applied successfully!");
     dispatch(fetchFilteredProducts());
       dispatch(resetFilters());
    setShowFilters(false);
  };


  console.log(products);
  const handleResetFilters = () => {
    const resetState = {
      keyword: '',
      type: '',
      priceRange: 1000,
      brands: [],
      sortBy: 'createdAt',
      sortOrder: 'desc',
      minRating: '',
      inStock: '',
      minDiscount: ''
    };
    setLocalFilters(resetState);
    dispatch(resetFilters());
    toast.success("Filters reset successfully!");
  };

  const deleteProduct = async (id) => {

      try {

         setIsDeleting(true); // 🟡 Show loading modal

        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/delete/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        toast.success("Product deleted successfully!");
        dispatch(resetFilters());
        dispatch(fetchFilteredProducts());
      } catch (error) {
        toast.error("Failed to delete product");
        console.error('Delete error:', error);
      }
      finally {
    setIsDeleting(false); // 🔴 Hide modal no matter what
  }
    };
  

 
  const handleBrandChange = (brand) => {
    const updatedBrands = localFilters.brands.includes(brand)
      ? localFilters.brands.filter(b => b !== brand)
      : [...localFilters.brands, brand];
    setLocalFilters({ ...localFilters, brands: updatedBrands });
  };

  const truncateText = (text, maxLength = 25) => {
    return text && text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };


  const renderFilters = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">Filter Products</h3>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="text-gray-500 hover:text-gray-700 lg:hidden"
      >
        <X className="w-5 h-5" />
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* 🔍 Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={localFilters.keyword}
            onChange={(e) => setLocalFilters({ ...localFilters, keyword: e.target.value })}
            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 📂 Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={localFilters.type}
          onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value, brands: [] })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {productTypes.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* 💰 Max Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Max Price: ₹{localFilters.priceRange}
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          step="100"
          value={localFilters.priceRange}
          onChange={(e) => setLocalFilters({ ...localFilters, priceRange: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* 🏷️ Min Discount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Min Discount (%)</label>
        <input
          type="number"
          placeholder="e.g., 10"
          min="0"
          max="100"
          value={localFilters.minDiscount}
          onChange={(e) => setLocalFilters({ ...localFilters, minDiscount: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    {/* ✅ Only show brands if category is selected */}
    {localFilters.type && brandOptionsMap[localFilters.type] && (
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Brands</label>
        <div className="flex flex-wrap gap-2">
          {brandOptionsMap[localFilters.type].map(brand => (
            <label key={brand} className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
              <input
                type="checkbox"
                checked={localFilters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="mr-2"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    )}

    {/* ✅ Filter Actions */}
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={handleFilter}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Apply Filters
      </button>
      <button
        onClick={handleResetFilters}
        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
      >
        Reset Filters
      </button>
    </div>
  </div>
);


  // const renderFilters = () => (
  //   <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
  //     <div className="flex items-center justify-between mb-4">
  //       <h3 className="text-lg font-semibold">Filter Products</h3>
  //       <button
  //         onClick={() => setShowFilters(!showFilters)}
  //         className="text-gray-500 hover:text-gray-700 lg:hidden"
  //       >
  //         <X className="w-5 h-5" />
  //       </button>
  //     </div>
      
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  //       {/* Search */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
  //         <div className="relative">
  //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
  //           <input
  //             type="text"
  //             placeholder="Search products..."
  //             value={localFilters.keyword}
  //             onChange={(e) => setLocalFilters({ ...localFilters, keyword: e.target.value })}
  //             className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //           />
  //         </div>
  //       </div>

  //       {/* Category */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
  //         <select
  //           value={localFilters.type}
  //           onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value, brands: [] })}
  //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //         >
  //           <option value="">All Categories</option>
  //           {productTypes.map(category => (
  //             <option key={category} value={category}>{category}</option>
  //           ))}
  //         </select>
  //       </div>

  //       {/* Price Range */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">
  //           Max Price: ₹{localFilters.priceRange}
  //         </label>
  //         <input
  //           type="range"
  //           min="0"
  //           max="100000"
  //           step="1000"
  //           value={localFilters.priceRange}
  //           onChange={(e) => setLocalFilters({ ...localFilters, priceRange: parseInt(e.target.value) })}
  //           className="w-full"
  //         />
  //       </div>

  //       {/* Sort By */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
  //         <select
  //           value={localFilters.sortBy}
  //           onChange={(e) => setLocalFilters({ ...localFilters, sortBy: e.target.value })}
  //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //         >
  //           <option value="createdAt">Date Created</option>
  //           <option value="price">Price</option>
  //           <option value="title">Name</option>
  //           <option value="rating">Rating</option>
  //         </select>
  //       </div>

  //       {/* Sort Order */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
  //         <select
  //           value={localFilters.sortOrder}
  //           onChange={(e) => setLocalFilters({ ...localFilters, sortOrder: e.target.value })}
  //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //         >
  //           <option value="desc">Descending</option>
  //           <option value="asc">Ascending</option>
  //         </select>
  //       </div>

  //       {/* Stock Status */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
  //         <select
  //           value={localFilters.inStock}
  //           onChange={(e) => setLocalFilters({ ...localFilters, inStock: e.target.value })}
  //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //         >
  //           <option value="">All Products</option>
  //           <option value="true">In Stock</option>
  //           <option value="false">Out of Stock</option>
  //         </select>
  //       </div>

  //       {/* Min Rating */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
  //         <select
  //           value={localFilters.minRating}
  //           onChange={(e) => setLocalFilters({ ...localFilters, minRating: e.target.value })}
  //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //         >
  //           <option value="">Any Rating</option>
  //           <option value="1">1+ Stars</option>
  //           <option value="2">2+ Stars</option>
  //           <option value="3">3+ Stars</option>
  //           <option value="4">4+ Stars</option>
  //           <option value="5">5 Stars</option>
  //         </select>
  //       </div>

  //       {/* Min Discount */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Min Discount (%)</label>
  //         <input
  //           type="number"
  //           placeholder="e.g., 10"
  //           min="0"
  //           max="100"
  //           value={localFilters.minDiscount}
  //           onChange={(e) => setLocalFilters({ ...localFilters, minDiscount: e.target.value })}
  //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //         />
  //       </div>
  //     </div>

  //     {/* Brands */}
  //     {localFilters.type && brandOptionsMap[localFilters.type] && (
  //       <div className="mt-4">
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Brands</label>
  //         <div className="flex flex-wrap gap-2">
  //           {brandOptionsMap[localFilters.type].map(brand => (
  //             <label key={brand} className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
  //               <input
  //                 type="checkbox"
  //                 checked={localFilters.brands.includes(brand)}
  //                 onChange={() => handleBrandChange(brand)}
  //                 className="mr-2"
  //               />
  //               <span className="text-sm">{brand}</span>
  //             </label>
  //           ))}
  //         </div>
  //       </div>
  //     )}

  //     {/* Filter Actions */}
  //     <div className="flex flex-wrap gap-3 mt-6">
  //       <button
  //         onClick={handleFilter}
  //         className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  //       >
  //         Apply Filters
  //       </button>
  //       <button
  //         onClick={handleResetFilters}
  //         className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
  //       >
  //         Reset Filters
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 lg:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button
            onClick={() => setShowAddProductModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters - Always visible on large screens, toggleable on mobile
      <div className="hidden lg:block">
        {renderFilters()}
      </div>
      {showFilters && (
        <div className="lg:hidden">
          {renderFilters()}
        </div>
      )} */}

        {/* Filters - Always visible on large screens */}
    <div className="hidden lg:block">
      <FilterSidebar />
    </div>

    {/* Toggle Filters on mobile */}
    {showFilters && (
      <div className="lg:hidden">
        <FilterSidebar />
      </div>
    )}

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Product</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Category</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Price</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Stock</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        className="h-12 w-12 rounded-lg object-cover cursor-pointer" 
                        src={`${process.env.REACT_APP_BACKEND_URL}${product.image}` || '/placeholder-image.jpg'} 
                        alt={product.title}
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowProductModal(true);
                        }}
                      />
                      <div className="ml-4 min-w-0 flex-1">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowProductModal(true);
                          }}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 text-left block"
                          title={product.title}
                        >
                          {truncateText(product.title)}
                        </button>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.type}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{product.price}
                    {product.discount && (
                      <span className="ml-2 text-xs text-green-600">
                        {product.discount}% off
                      </span>
                    )}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.quantity 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.quantity ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowProductModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>{
                          setShowEditProductModal(true);
 setSelectedProduct(product);

                        }
                        }
                        className="text-green-600 hover:text-green-900"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          
                          {
                            setShowconfirmModal(true);
                           setSelectedProduct(product)

                        }}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        <Pagination
  page={page}
  totalPages={totalPages}
  onPageChange={(newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(updatePage(newPage));
  }}
/>

        {(!products || products.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>


      {/* Add Product Modal */}
      {showAddProductModal && (
        <AddProduct  showProductModal={showAddProductModal}  setShowAddProductModal={setShowAddProductModal}
        />
      )}

      {/* Edit Product Modal */}
      {showEditProductModal && (
            <EditProduct  setShowEditProductModal={setShowEditProductModal}  selectedProduct={selectedProduct}
          />
      )}

      <ConfirmModal
  isOpen={showconfirmModal}
  title="Delete Product"
  message={`Are you sure you want to delete "${selectedProduct?.title}"?`}
  onConfirm={() => {
    deleteProduct(selectedProduct._id);
    setShowconfirmModal(false);
  }}
  onCancel={() => setShowconfirmModal(false)}
/>


      {/* Product Details Modal */}
      {/* {showProductModal && selectedProduct && (
        <Modal
          isOpen={showProductModal}
          onClose={() => setShowProductModal(false)}
          title="Product Details"
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <img
               
               
              src={`${process.env.REACT_APP_BACKEND_URL}${selectedProduct.image}` }
                alt={selectedProduct.title}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{selectedProduct.title}</h3>
                <p className="text-gray-600 mb-2">{selectedProduct.type}</p>
                <p className="text-gray-600">{selectedProduct.brand}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <p className="text-lg font-semibold">₹{selectedProduct.price}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <p className="text-lg font-semibold">{selectedProduct.quantity}</p>
           </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <p className="text-lg font-semibold">{selectedProduct.rating || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount</label>
                <p className="text-lg font-semibold">{selectedProduct.discount || 0}%</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <p className="text-gray-900">{selectedProduct.description || 'No description available'}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
              <button 
                onClick={() => {
                  setShowProductModal(false);
                  setShowEditProductModal(true);
                  setSelectedProduct(selectedProduct);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Product
              </button>
              <button 
            

                       onClick={() =>   
                          {
                             setShowProductModal(false);
                            setShowconfirmModal(true);  
 setSelectedProduct(selectedProduct)
                        }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </Modal>
      )} */}




{showProductModal && selectedProduct && (
  <Modal
    isOpen={showProductModal}
    onClose={() => setShowProductModal(false)}
    title={<h2 className="text-2xl font-bold text-blue-700">Product Details</h2>}
  >
    <div className="space-y-6">
      {/* Image + Product Info */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6 space-y-4 sm:space-y-0 items-center sm:items-center">
        {/* Product Image */}
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}${selectedProduct.image}`}
          alt={selectedProduct.title}
          className="w-44 h-44 object-cover rounded-xl border shadow"
        />

        {/* Title, Category, Brand */}
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-gray-700">
            <span className="font-semibold">Title:</span>{" "}
            <span className="font-medium capitalize">{selectedProduct.title}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Category:</span>{" "}
            <span className="font-medium">{selectedProduct.type}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Brand:</span>{" "}
            <span className="font-medium">{selectedProduct.brand}</span>
          </p>
        </div>
      </div>

      {/* Grid Info */}
      <div className="grid grid-cols-2 text-center gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Price</label>
          <p className="text-base font-medium text-green-700">₹{selectedProduct.price}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Discount</label>
          <p className="text-base font-medium text-red-600">{selectedProduct.discount || 0}%</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Rating</label>
          <p className="text-base font-medium">{selectedProduct.rating || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Stock</label>
          <p className="text-base font-medium">{selectedProduct.quantity}</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <p className="text-gray-900 text-sm font-medium">
          {selectedProduct.description || 'No description available'}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
        <button
          onClick={() => {
            setShowProductModal(false);
            setShowEditProductModal(true);
            setSelectedProduct(selectedProduct);
          }}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ✏️ Edit Product
        </button>
        <button
          onClick={() => {
            setShowProductModal(false);
            setShowconfirmModal(true);
            setSelectedProduct(selectedProduct);
          }}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          🗑️ Delete Product
        </button>
      </div>
    </div>
  </Modal>
)}
<PaymentStatusModal
  isOpen={isDeleting}
  message="Deleting product, please wait..."
/>

      
    </div>
  );
};

export default AdminProductPanel;