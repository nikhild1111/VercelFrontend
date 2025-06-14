
// this was the finl one

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
// Mock functions for demo - replace with actual imports in your project
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setFilters, resetFilters } from "../redux/Slices/filtersSlice";
import { fetchFilteredProducts } from "../redux/thunks/filterProductsThunk";
import Footer from "../Components/Footer";

const Landingpage = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // Banner data
  const banners = [
    {
      id: 1,
      title: "We Picked Every Item With Care",
      subtitle: "You Must Try Atleast Once.",
      buttonText: "Go To Collection",
      bgColor: "bg-gradient-to-r from-gray-100 to-gray-200",
      textColor: "text-gray-800",
      image: `${process.env.REACT_APP_BACKEND_URL}/uploads/banners/banner-1.webp`,
      categoryValue: "" // Empty category value for banner clicks
    },
    {
      id: 2,
      title: "Girl's Fashion",
      subtitle: "Discover the latest trends and express your unique style with our Women's Fashion collection.",
      discount: "UP TO 20% DISCOUNT ON",
      buttonText: "EXPLORE NOW",
      bgColor: "bg-gradient-to-r from-pink-100 to-pink-200",
      textColor: "text-gray-800",
      image: `${process.env.REACT_APP_BACKEND_URL}/uploads/banners/banner-2.webp`,
      categoryValue: "" // Empty category value for banner clicks
    },
    {
      id: 3,
      title: "Summer Collection 2024",
      subtitle: "Beat the heat with our trendy summer essentials",
      buttonText: "Shop Now",
      bgColor: "bg-gradient-to-r from-blue-100 to-cyan-100",
      textColor: "text-gray-800",
      image: `${process.env.REACT_APP_BACKEND_URL}/uploads/banners/banner-3.webp`,
      categoryValue: "" // Empty category value for banner clicks
    }
  ];

  // Product categories with discounts
  const categories = [
    {
      name: "Men",
      value: "men-clothing",
      image: `${process.env.REACT_APP_BACKEND_URL}/uploads/categories/men.jpg`,
      bgColor: "bg-blue-50",
      discount: "30% OFF"
    },
    {
      name: "Women",
      value: "women-clothing",
      image: `${process.env.REACT_APP_BACKEND_URL}/uploads/categories/women.jpg`,
      bgColor: "bg-pink-50",
      discount: "25% OFF"
    },
    {
      name: "Kids",
      value: "kids",
      image: `${process.env.REACT_APP_BACKEND_URL}/uploads/categories/kids.jpg`,
      bgColor: "bg-yellow-50",
      discount: "40% OFF"
    },
    {
      name: "Sports",
      value: "footwear",
      image: `${process.env.REACT_APP_BACKEND_URL}/uploads/categories/sports.png`,
      bgColor: "bg-green-50",
      discount: "20% OFF"
    },
    {
      name: "Food",
      value: "food",
      image: `${process.env.REACT_APP_BACKEND_URL}/uploads/categories/food.png`,
      bgColor: "bg-orange-50",
      discount: "15% OFF"
    }
  ];

  // Auto-scroll banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Handle category click
  const handleCategoryClick = (categoryValue) => {
    dispatch(resetFilters());
    dispatch(setFilters({ type: categoryValue, page: 1 }));
    dispatch(fetchFilteredProducts());
    toast.success("Your Data");
    navigate('/home');
  };

  // Handle banner click
  const handleBannerClick = (banner) => {
    handleCategoryClick(banner.categoryValue);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <section className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`min-w-full h-full flex items-center ${banner.bgColor} cursor-pointer`}
              onClick={() => handleBannerClick(banner)}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
                  <div className={`${banner.textColor} space-y-3 sm:space-y-4 lg:space-y-6`}>
                    {banner.discount && (
                      <p className="text-red-500 font-semibold text-xs sm:text-sm tracking-wide uppercase">
                        {banner.discount}
                      </p>
                    )}
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-tight">
                      {banner.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-80 max-w-lg">
                      {banner.subtitle}
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBannerClick(banner);
                      }}
                      className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base"
                    >
                      {banner.buttonText}
                    </button>
                  </div>
                  <div className="flex justify-center lg:justify-end">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="max-w-full h-auto rounded-lg shadow-lg max-h-[150px] sm:max-h-[200px] md:max-h-[300px] lg:max-h-none object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevBanner}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 sm:p-2 rounded-full shadow-lg transition-all duration-200 z-10"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 sm:p-2 rounded-full shadow-lg transition-all duration-200 z-10"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentBanner ? 'bg-white scale-110' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              Trending Products
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Shop by Category
            </p>
          </div>

          {/* Horizontal Scroll Container for Small Screens */}
          <div className="block sm:hidden">
            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {categories.map((category) => (
                <div
                  key={category.value}
                  onClick={() => handleCategoryClick(category.value)}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex-shrink-0 w-48"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-40 object-contain bg-gray-50 hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {category.discount}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">
                      {category.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">(4.5)</span>
                    </div>

                    {/* Go to Collection Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(category.value);
                      }}
                      className="w-full bg-indigo-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Go to Collection
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Layout for Larger Screens */}
          <div className="hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {categories.map((category) => (
              <div
                key={category.value}
                onClick={() => handleCategoryClick(category.value)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 lg:h-52 object-contain bg-gray-50 hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {category.discount}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3">
                    {category.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">(4.5)</span>
                  </div>

                  {/* Go to Collection Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category.value);
                    }}
                    className="w-full bg-indigo-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Go to Collection
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Landingpage;