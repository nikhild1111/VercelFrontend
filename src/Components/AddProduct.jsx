 
// import React, { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const productTypes = [
//   'men', 'women', 'kids',
//   'clothing', 'footwear', 'electronics',
//   'smartphone', 'sports', 'toys',
//   'books', 'grocery', 'accessories', 'furniture',
// ];

// const brandOptionsMap = {
//   men: ['Many Brands'],
//   women: ['Many Brands'],
//   kids: ['Many Brands'],
//   clothing: ['Zara', 'Zudio', 'H&M', 'Levi’s'],
//   footwear: ['Nike', 'Adidas', 'Puma', 'Bata'],
//   electronics: ['Samsung', 'LG', 'Sony', 'Philips'],
//   smartphone: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi'],
//   sports: ['Nivia', 'Yonex', 'Decathlon', 'Cosco'],
//   toys: ['Funskool', 'Lego', 'Mattel', 'Hot Wheels'],
//   books: ['Penguin', 'HarperCollins', 'Oxford'],
//   grocery: ['Aashirvaad', 'Tata', 'Fortune'],
//   accessories: ['Boat', 'Noise', 'Fossil'],
//   furniture: ['Godrej', 'Nilkamal', 'Ikea'],
// };

// function AddProduct() {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     quantity: '',
//     type: '',
//     brand: '',
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'type') {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//         brand: '', // reset brand when type changes
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleImageChange = (e) => {
//     setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Client-side validation for non-negative values
//     if (Number(formData.price) < 0 || Number(formData.quantity) < 0) {
//       return toast.error('❌ Price and Quantity must be non-negative numbers.');
//     }

//     const data = new FormData();
//     for (let key in formData) {
//       data.append(key, formData[key]);
//     }

//     try {
//       await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/productsadd/add`, data);
//       toast.success(' Product added successfully!');
//       setFormData({
//         title: '',
//         description: '',
//         price: '',
//         quantity: '',
//         type: '',
//         brand: '',
//         image: null,
//       });
//     } catch (err) {
//       toast.error('❌ Failed to add product');
//     }
//   };

//   const brandList = brandOptionsMap[formData.type] || [];

//   return (
//     <div className="max-w-xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
//       <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-300">
//         <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Add Product</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           <input
//             type="text"
//             name="title"
//             placeholder="Product Title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
//           />

//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             rows={4}
//             className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base resize-none"
//           />

//           <div className="flex flex-col sm:flex-row gap-4">
//             <input
//               type="number"
//               name="price"
//               placeholder="Price (₹)"
//               value={formData.price}
//               onChange={handleChange}
//               required
//               min="0"
//               className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
//             />

//             <input
//               type="number"
//               name="quantity"
//               placeholder="Quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               required
//               min="0"
//               className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
//             />
//           </div>

//           <select
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             required
//             className="p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
//           >
//             <option value="" disabled>
//               Select Product Type
//             </option>
//             {productTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
//               </option>
//             ))}
//           </select>

//           {brandList.length > 0 && (
//             <select
//               name="brand"
//               value={formData.brand}
//               onChange={handleChange}
//               required
//               className="p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
//             >
//               <option value="" disabled>
//                 Select Brand
//               </option>
//               {brandList.map((brand) => (
//                 <option key={brand} value={brand}>
//                   {brand}
//                 </option>
//               ))}
//             </select>
//           )}

//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//             className="border border-gray-300 rounded-md p-2 cursor-pointer text-gray-700"
//           />

//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold mt-3"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddProduct;




import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const productTypes = [
  'men', 'women', 'kids',
  'clothing', 'footwear', 'electronics',
  'smartphone', 'sports', 'toys',
  'books', 'grocery', 'accessories', 'furniture',
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
  furniture: ['Godrej', 'Nilkamal', 'Ikea'],
};

function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    type: '',
    brand: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        brand: '', // reset brand when type changes
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation for non-negative values
    if (Number(formData.price) < 0 || Number(formData.quantity) < 0) {
      return toast.error('❌ Price and Quantity must be non-negative numbers.');
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/productsadd/add`, data);
      toast.success(' Product added successfully!');
      setFormData({
        title: '',
        description: '',
        price: '',
        quantity: '',
        type: '',
        brand: '',
        image: null,
      });
    } catch (err) {
      toast.error('❌ Failed to add product');
    }
  };

  const brandList = brandOptionsMap[formData.type] || [];

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
            Add Product
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <input
                type="text"
                name="title"
                placeholder="Product Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
              />
            </div>

            <div>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base resize-none transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="number"
                name="price"
                placeholder="Price (₹)"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
              />
            </div>

            <div>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select Product Type
                </option>
                {productTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {brandList.length > 0 && (
              <div>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Brand
                  </option>
                  {brandList.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 cursor-pointer text-gray-700 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 sm:py-4 rounded-lg transition-all duration-200 text-base sm:text-lg font-semibold mt-6 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;