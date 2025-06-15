// import React, { useEffect, useState } from 'react';
// import Spinner from '../Components/Spinner';
// import "../index.css";
// import Product from '../Components/Product';
// import { useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
// import { loginSuccess, logout} from '../redux/Slices/userSlice.js'; 
// import { setProducts } from '../redux/Slices/productSlice.js';

// const Home = (props) => {
//       const dispatch = useDispatch();
//   const { user, Cart, products } = useSelector(state => state);
//   const { posts } = products;
//   console.log(posts);
//      let isLogin=  user.isLoggedIn;
//     const [API_URL, setApiUrl] = useState(`${process.env.REACT_APP_BACKEND_URL}/api/productsadd`);
//     const [loading, setLoading] = useState(false);
 
//     const [formData, setData] = useState({ electronics:false,jewelery:false,"men's clothing":false,"women's clothing":false });

//     async function fetchProductData() {
//         setLoading(true);
//         try {
//             const res = await fetch(API_URL);
//             const data = await res.json();
//             // console.log(data);
//       dispatch(setProducts(data));
//         }
//         catch {
//        console.log("Data not found");
//       dispatch(setProducts([])); // Clear data on error
//         }
//         setLoading(false);
//     }

//     useEffect(() => {
//         fetchProductData();
// }, [API_URL]); 

//    function handlecategory() {
      
//       }
      
      
//     return (
//         <>
   
//         {/* <div className='relative top-[150px]'>//user fo the fixed position */}
//         <div className='relative'>
//             {
//            loading ? (<Spinner />) : posts.length > 0 ? (<div className='grid xs:grid-cols-1 sm:grid-cols-2  md:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5'>{posts.map((post) => (<Product key={post._id} post={post} ></Product>))}</div>) : (<div className='flex justify-center items-center'> <p> NO DATA </p></div>)}
//        </div>
//         </>
       
//     );
// };

// export default Home;


// chant gpt wala


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import Spinner from '../Components/Spinner';
// import Product from '../Components/Product';
// import { setProducts } from '../redux/Slices/productSlice';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const Home = () => {
//   const dispatch = useDispatch();
//   const { posts } = useSelector(state => state.products);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const navigate = useNavigate();
//   const query = useQuery();
//   const keyword = query.get("keyword") || "";
//   const category = query.get("category") || "";
//   const currentPage = parseInt(query.get("page")) || 1;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/search?keyword=${keyword}&category=${category}&page=${currentPage}`);
//         const data = await res.json();
//         dispatch(setProducts(data.data));
//         setPage(data.currentPage);
//         setTotalPages(data.totalPages);
//       } catch (err) {
//         dispatch(setProducts([]));
//       }
//       setLoading(false);
//     };
//     fetchProducts();
//   }, [keyword, category, currentPage, dispatch]);

//   const handlePageChange = (newPage) => {
//     navigate(`/home?keyword=${keyword}&category=${category}&page=${newPage}`);
//   };

//   return (
//     <div className='relative'>
//       {loading ? <Spinner /> : posts.length > 0 ? (
//         <>
//           <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
//             {posts.map(post => (
//               <Product key={post._id} post={post} />
//             ))}
//           </div>
//           <div className="flex justify-center mt-6 space-x-2">
//             <button
//               disabled={page === 1}
//               onClick={() => handlePageChange(page - 1)}
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//             >Previous</button>
//             <span className="px-4 py-2 bg-gray-100 border rounded">Page {page} of {totalPages}</span>
//             <button
//               disabled={page === totalPages}
//               onClick={() => handlePageChange(page + 1)}
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//             >Next</button>
//           </div>
//         </>
//       ) : (
//         <div className='flex justify-center items-center'><p>No Data</p></div>
//       )}
//     </div>
//   );
// };

// export default Home;




import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Components/Spinner';
import Product from '../Components/Product';
import { setProducts } from '../redux/Slices/productSlice';
import { fetchFilteredProducts } from "../redux/thunks/filterProductsThunk";
import { updatePage } from "../redux/Slices/filtersSlice";
import Footer from "../Components/Footer"; // adjust path as needed


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.products);
    const { page, totalPages } = useSelector(state => state.filters); // ✅ use Redux
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  

  const navigate = useNavigate();
  const query = useQuery();
    useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await dispatch(fetchFilteredProducts());
      setLoading(false);
    };
    fetchProducts();
  }, [dispatch, page]); // ✅ Trigger when page changes



  const handlePageChange = (newPage) => {
    // ADDED: Smooth scroll to top when page changes
    // window.scrollTo({ top: 0, behavior: 'smooth' });
     dispatch(updatePage(newPage)); // ✅ updates Redux
  };

  // ADDED: Function to generate pagination numbers with ellipsis logic
  const generatePaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex logic for showing pages with ellipsis
      if (page <= 3) {
        // Show first 3 pages, ellipsis, and last page
        pages.push(1, 2, 3, '...', totalPages);
      } else if (page >= totalPages - 2) {
        // Show first page, ellipsis, and last 3 pages
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show first page, ellipsis, current page with neighbors, ellipsis, last page
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className='relative mt-4'>
      {loading ? <Spinner /> : posts.length > 0 ? (
        <>
          {/* ADDED: Smooth transition wrapper for content */}
          <div className={`transition-all duration-500 ease-in-out ${loading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {posts.map(post => (
                <Product  key={post._id} post={post} />
              ))}
            </div>
          </div>





          {/* this is the pagantion original */}

          {/* UPDATED: Modern styled pagination component */}
          {/* <div className="flex justify-center items-center mt-8 mb-6">
            <nav className="flex items-center space-x-1 bg-gray-900 rounded-lg p-1"> */}
              {/* Previous Button */}
              {/* <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
                  ${page === 1 
                    ? 'text-gray-500 cursor-not-allowed opacity-50' 
                    : 'text-white hover:bg-gray-700 hover:scale-105 active:scale-95'
                  }
                `}
              >
                Previous
              </button> */}

              {/* Page Numbers */}
              {/* <div className="flex items-center space-x-1 mx-2">
                {generatePaginationNumbers().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-400 text-sm">
                      ...
                    </span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`
                        w-10 h-10 rounded-md text-sm font-semibold transition-all duration-300 ease-in-out
                        transform hover:scale-110 active:scale-95
                        ${page === pageNum
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/50 scale-105' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }
                      `}
                    >
                      {pageNum}
                    </button>
                  )
                ))}
              </div> */}

              {/* Last Page Quick Jump (if not visible) */}
              {/* {totalPages > 600 && !generatePaginationNumbers().includes(totalPages) && (
                <>
                  <span className="px-2 py-2 text-gray-400 text-sm">...</span>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="w-12 h-10 rounded-md text-sm font-semibold transition-all duration-300 ease-in-out
                             text-gray-300 hover:bg-gray-700 hover:text-white transform hover:scale-110 active:scale-95"
                  >
                    {totalPages}
                  </button>
                </>
              )} */}

              {/* Next Button */}
              {/* <button
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
                  ${page === totalPages 
                    ? 'text-gray-500 cursor-not-allowed opacity-50' 
                    : 'text-white hover:bg-gray-700 hover:scale-105 active:scale-95'
                  }
                `}
              >
                Next
              </button>
            </nav>
          </div> */}



<div className="flex justify-center items-center mt-8 mb-6">
  <nav className="flex items-center space-x-2 bg-gray-900 rounded-lg p-1.5 sm:p-2">
    
    {/* Previous Button */}
    <button
      disabled={page === 1}
      onClick={() => handlePageChange(page - 1)}
      className={`
        px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium
        transition-all duration-300 ease-in-out
        ${page === 1 
          ? 'text-gray-500 cursor-not-allowed opacity-50' 
          : 'text-white hover:bg-gray-700 hover:scale-105 active:scale-95'
        }
      `}
    >
      <span className="block sm:hidden text-lg">{'<'}</span>
      <span className="hidden sm:block">Previous</span>
    </button>

    {/* Page Numbers */}
    <div className="flex items-center space-x-1 mx-1 sm:mx-2">
      {generatePaginationNumbers().map((pageNum, index) => (
        pageNum === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 py-1 text-gray-400 text-sm sm:text-base"
          >
            ...
          </span>
        ) : (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`
              w-9 h-9 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base font-semibold
              transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
              ${page === pageNum
                ? 'bg-red-600 text-white shadow-md shadow-red-600/50 scale-105' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }
            `}
          >
            {pageNum}
          </button>
        )
      ))}
    </div>

    {/* Last Page Quick Jump */}
    {totalPages > 600 && !generatePaginationNumbers().includes(totalPages) && (
      <>
        <span className="px-2 py-1 text-gray-400 text-sm sm:text-base">...</span>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out
                   text-gray-300 hover:bg-gray-700 hover:text-white transform hover:scale-105 active:scale-95"
        >
          {totalPages}
        </button>
      </>
    )}

    {/* Next Button */}
    <button
      disabled={page === totalPages}
      onClick={() => handlePageChange(page + 1)}
      className={`
        px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-300 ease-in-out
        ${page === totalPages 
          ? 'text-gray-500 cursor-not-allowed opacity-50' 
          : 'text-white hover:bg-gray-700 hover:scale-105 active:scale-95'
        }
      `}
    >
      <span className="block sm:hidden text-lg">{'>'}</span>
      <span className="hidden sm:block">Next</span>
    </button>

  </nav>
</div>


          

          {/* ADDED: Page info indicator */}
          <div className="flex justify-center mb-8">
            <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
              Showing page {page} of {totalPages}
            </div>
          </div>

       <Footer />
        </>
      ) : (
        <div className='flex justify-center items-center min-h-[50vh]'>
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">No Products Found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;