// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { Search, Eye } from 'lucide-react';
// import UserDetailsModal from './UserDetailsModal'; // path to modal component

// const UserManagement = () => {
//   const dispatch = useDispatch();
//   const { page, totalPages } = useSelector((state) => state.orderFilters);
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showUserModal, setShowUserModal] = useState(false);

//   // Fetch users based on page and search term
//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/dashboard/users`, {
//         search: searchTerm,
//         page,
//       },
//     {
//       withCredentials: true, // ✅ correct syntax (colon, not =)
//     }  
//     );
//       setUsers(data.users);
//       // dispatch to update totalPages if backend sends total pages
//       // dispatch(setUserTotalPages(data.totalPages));
//     } catch (err) {
//       console.error('Failed to fetch users:', err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [page, searchTerm]);


//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
//         <div className="relative">
//           <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name, email, address..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {users.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button
//                       onClick={() => {
//                         setSelectedUser({
//                           name: user.name,
//                           email: user.email,
//                           phone: user.phone,
//                           joinDate: new Date(user.createdAt).toLocaleDateString(),
//                           orders: user.totalOrders,
//                           totalSpent: user.totalSpends,
//                         });
//                         setShowUserModal(true);
//                       }}
//                       className="text-sm font-medium text-blue-600 hover:text-blue-800"
//                     >
//                       {user.name}
//                     </button>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.totalOrders}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.totalSpends.toFixed(2)}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button
//                       onClick={() => {
//                         setSelectedUser({
//                           name: user.name,
//                           email: user.email,
//                           phone: user.phone,
//                           joinDate: new Date(user.createdAt).toLocaleDateString(),
//                           orders: user.totalOrders,
//                           totalSpent: user.totalSpends,
//                         });
//                         setShowUserModal(true);
//                       }}
//                       className="text-blue-600 hover:text-blue-900"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

     
//       </div>

//       <UserDetailsModal
//         isOpen={showUserModal}
//         onClose={() => setShowUserModal(false)}
//         selectedUser={selectedUser}
//         handleViewOrders={() => alert("View Orders")}
//         handleSendMessage={() => alert("Send Message")}
//       />
//     </div>
//   );
// };

// export default UserManagement;









// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { Search, Eye } from 'lucide-react';
// import UserDetailsModal from './UserDetailsModal';

// const UserManagement = () => {
//   const dispatch = useDispatch();
//   const { page, totalPages } = useSelector((state) => state.orderFilters);
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showUserModal, setShowUserModal] = useState(false);

//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/users`,
//         { search: searchTerm, page },
//         { withCredentials: true }
//       );
//       setUsers(data.users);
//       // Optional: dispatch totalPages update
//     } catch (err) {
//       console.error('Failed to fetch users:', err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [page, searchTerm]);

//   return (
//     <div className="space-y-6 p-4 sm:p-4 lg:p-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">👥 User Management</h1>

//         <div className="relative w-full sm:w-auto">
//           <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name, email, phone, address..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto w-[100vw">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50 text-gray-600 font-semibold">
//             <tr>
//               <th className="px-6 py-3 text-left whitespace-nowrap">User</th>
//               <th className="px-6 py-3 text-left whitespace-nowrap">Email</th>
//               <th className="px-6 py-3 text-left whitespace-nowrap">Orders</th>
//               <th className="px-6 py-3 text-left whitespace-nowrap">Total Spent</th>
//               <th className="px-6 py-3 text-left whitespace-nowrap">Join Date</th>
//               <th className="px-6 py-3 text-left whitespace-nowrap">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             ) : (
//               users.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 font-medium text-blue-700 truncate max-w-[150px]">
//                     <button
//                       onClick={() => {
//                         setSelectedUser({
//                           name: user.name,
//                           email: user.email,
//                           phone: user.phone,
//                           joinDate: new Date(user.createdAt).toLocaleDateString(),
//                           orders: user.totalOrders,
//                           totalSpent: user.totalSpends,
//                         });
//                         setShowUserModal(true);
//                       }}
//                       className="hover:underline"
//                     >
//                       {user.name}
//                     </button>
//                   </td>
//                   <td className="px-6 py-4 text-gray-800 truncate max-w-[200px]">{user.email}</td>
//                   <td className="px-6 py-4 text-gray-800">{user.totalOrders}</td>
//                   <td className="px-6 py-4 text-gray-800">₹{user.totalSpends.toFixed(2)}</td>
//                   <td className="px-6 py-4 text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => {
//                         setSelectedUser({
//                           name: user.name,
//                           email: user.email,
//                           phone: user.phone,
//                           joinDate: new Date(user.createdAt).toLocaleDateString(),
//                           orders: user.totalOrders,
//                           totalSpent: user.totalSpends,
//                         });
//                         setShowUserModal(true);
//                       }}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       <UserDetailsModal
//         isOpen={showUserModal}
//         onClose={() => setShowUserModal(false)}
//         selectedUser={selectedUser}
//         handleViewOrders={() => alert('View Orders')}
//         handleSendMessage={() => alert('Send Message')}
//       />
//     </div>
//   );
// };

// export default UserManagement;











import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Search, Eye, Users } from 'lucide-react';
import UserDetailsModal from './UserDetailsModal';
import Pagination from '../Pagination'


const UserManagement = () => {
  const dispatch = useDispatch();
  const [page, setpage ] = useSelector(1);
  const [totalPages, setTotalPages ] = useSelector(1);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/users`,
        { search: searchTerm, page },
        { withCredentials: true }
      );
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setpage(1);
      // Optional: dispatch totalPages update
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm]);

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-10 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">👥 User Management</h1>

        <div className="relative w-full sm:w-auto">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-100 rounded-xl shadow-sm overflow-x-auto">
        <div className="min-w-[720px]">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gray-100 text-gray-700 font-semibold sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left whitespace-nowrap">User</th>
                <th className="px-6 py-4 text-left whitespace-nowrap">Email</th>
                <th className="px-6 py-4 text-left whitespace-nowrap">Orders</th>
                <th className="px-6 py-4 text-left whitespace-nowrap">Total Spent</th>
                <th className="px-6 py-4 text-left whitespace-nowrap">Join Date</th>
                <th className="px-6 py-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-base">No users found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 font-medium text-blue-700 truncate max-w-[160px]">
                      <button
                        onClick={() => {
                          setSelectedUser({
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            joinDate: new Date(user.createdAt).toLocaleDateString(),
                            orders: user.totalOrders,
                            totalSpent: user.totalSpends,
                          });
                          setShowUserModal(true);
                        }}
                        className="hover:underline"
                      >
                        {user.name}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-gray-800 truncate max-w-[220px]">{user.email}</td>
                    <td className="px-4 sm:px-6 py-3 text-gray-800">{user.totalOrders}</td>
                    <td className="px-4 sm:px-6 py-3 text-gray-800">₹{user.totalSpends.toFixed(2)}</td>
                    <td className="px-4 sm:px-6 py-3 text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 sm:px-6 py-3">
                      <button
                        onClick={() => {
                          setSelectedUser({
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            joinDate: new Date(user.createdAt).toLocaleDateString(),
                            orders: user.totalOrders,
                            totalSpent: user.totalSpends,
                          });
                          setShowUserModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

 

 
   <Pagination
  page={page}
  totalPages={totalPages}
  onPageChange={(newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(setpage(newPage));
  }}
/>

      {/* Modal */}
      <UserDetailsModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        selectedUser={selectedUser}
        handleViewOrders={() => alert('View Orders')}
        handleSendMessage={() => alert('Send Message')}
      />
    </div>
  );
};

export default UserManagement;
