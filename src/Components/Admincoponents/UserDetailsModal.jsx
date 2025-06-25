import React from 'react';
import Modal from './Modal'; // path to your reusable Modal
import { useEffect } from 'react';
const UserDetailsModal = ({
  isOpen,
  onClose,
  selectedUser,
  handleViewOrders,
  handleSendMessage,
}) => {



  useEffect(() => {
    if ( isOpen) {
      document.body.style.overflow = 'hidden';   // 1️⃣
    } else {
      document.body.style.overflow = 'auto';     // 2️⃣
    }
  
    return () => {
      document.body.style.overflow = 'auto';     // 3️⃣
    };
  }, [ isOpen,]); 
  if (!selectedUser) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details">
      <div className="space-y-6">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="text-base sm:text-lg font-semibold">{selectedUser.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="text-base sm:text-lg">{selectedUser.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <p className="text-base sm:text-lg">{selectedUser.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Join Date</label>
            <p className="text-base sm:text-lg">{selectedUser.joinDate}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Orders</label>
            <p className="text-base sm:text-lg font-semibold">{selectedUser.orders}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Spent</label>
            <p className="text-base sm:text-lg font-semibold">${selectedUser.totalSpent}</p>
          </div>
        </div>

        {/* Responsive Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleViewOrders}
            className="w-full sm:flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Orders
          </button>
          <button
            onClick={handleSendMessage}
            className="w-full sm:flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Send Message
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;



//  {/* User Modal */}
//    <Modal
//         isOpen={showUserModal}
//         onClose={() => setShowUserModal(false)}
//         title="User Details"
//       >
//         {selectedUser && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               {/* All User Fields */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Name</label>
//                 <p className="text-lg font-semibold">{selectedUser.name}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <p className="text-lg">{selectedUser.email}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Phone</label>
//                 <p className="text-lg">{selectedUser.phone}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Join Date</label>
//                 <p className="text-lg">{selectedUser.joinDate}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Total Orders</label>
//                 <p className="text-lg font-semibold">{selectedUser.orders}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Total Spent</label>
//                 <p className="text-lg font-semibold">${selectedUser.totalSpent}</p>
//               </div>
//             </div>
//             <div className="flex space-x-3 pt-4">
//               <button
//                 onClick={handleViewOrders}
//                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 View Orders
//               </button>
//               <button
//                 onClick={handleSendMessage}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//               >
//                 Send Message
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>