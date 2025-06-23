import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters, resetFilters } from '../redux/Slices/filtersSlice';
import { fetchFilteredProducts } from "../redux/thunks/filterProductsThunk";
import { Search, X } from 'lucide-react';

const FilterSidebar = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minDiscount, setMinDiscount] = useState("");

  const categories = [
    { name: 'All', value: '' },
    { name: 'Smartphones', value: 'smartphones' },
    { name: 'Electronics', value: 'electronics' },
    { name: 'Jewelry', value: 'jewelery' },
    { name: "Men's Clothing", value: 'men-clothing' },
    { name: "Women's Clothing", value: 'women-clothing' },
    { name: 'Food', value: 'food' },
    { name: 'Beauty', value: 'beauty' },
    { name: "Kids' Clothing", value: 'kids-clothing' },
    { name: 'Footwear', value: 'footwear' },
    { name: 'Kids', value: 'kids' }
  ];

  const applyFilters = () => {
    dispatch(setFilters({
      keyword: searchTerm || null,
      priceRange,
      type: selectedCategory || null,
      minDiscount: minDiscount ? parseInt(minDiscount) : null,
      page: 1
    }));

    dispatch(fetchFilteredProducts());
  };

  const handleReset = () => {
    setSearchTerm("");
    setPriceRange(100);
    setSelectedCategory("");
    setMinDiscount("");
    dispatch(resetFilters());
    dispatch(fetchFilteredProducts());
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filter Products</h3>
        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-gray-700 lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Search Term */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price: ₹{priceRange}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            step="5"
            value={priceRange}
            onChange={(e) => setPriceRange(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Min Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Discount (%)</label>
          <input
            type="number"
            placeholder="e.g., 10"
            min="0"
            max="100"
            value={minDiscount}
            onChange={(e) => setMinDiscount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={applyFilters}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
