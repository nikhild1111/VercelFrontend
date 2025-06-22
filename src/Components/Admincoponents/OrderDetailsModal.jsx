import Modal from './Modal';
import { CreditCard, Truck } from 'lucide-react';

const OrderDetailsModal = ({ showModal, selectedOrder, closeModal, formatDate, getStatusColor }) => {
  if (!selectedOrder) return null;

console.log(selectedOrder);

  return (
    <Modal isOpen={showModal} onClose={closeModal} title="Order Details">
      {/* Product Info */}
      <div className="flex items-start gap-6 mb-6">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}${selectedOrder.image}`}
          alt={selectedOrder.productTitle}
          className="w-24 h-24 object-contain rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {selectedOrder.productTitle}
          </h3>
          <p className="text-gray-600 mb-2">Order ID: {selectedOrder.id}</p>
          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Order Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-medium">{selectedOrder.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Unit Price:</span>
            <span className="font-medium">${selectedOrder.unitPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount:</span>
            <span className="font-medium text-green-600">-${selectedOrder.discount}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-lg font-bold text-blue-600">${selectedOrder.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Shipping Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <CreditCard size={18} />
            Payment Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Method:</span>
              <span className="font-medium">{selectedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-600">{selectedOrder.paymentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{formatDate(selectedOrder.orderDate)}</span>
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Truck size={18} />
            Shipping Information
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600 block mb-1">Address:</span>
              <span className="font-medium">{selectedOrder.shippingAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium">{selectedOrder.estimatedDelivery}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tracking:</span>
              <span className="font-medium">{selectedOrder.trackingNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;




    // {/* Order Details Modal */}
    //     {showModal && selectedOrder && (
    //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    //         <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    //           <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
    //             <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
    //             <button
    //               onClick={closeModal}
    //               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
    //             >
    //               <X size={20} />
    //             </button>
    //           </div>
              
    //           <div className="p-6">
    //             {/* Product Info */}
    //             <div className="flex items-start gap-6 mb-6">
    //               <img
    //                src={`${process.env.REACT_APP_BACKEND_URL}${selectedOrder.image}`}
    //                 alt={selectedOrder.productTitle}
    //                 className="w-24 h-24 object-contain rounded-lg"
    //               />
    //               <div className="flex-1">
    //                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
    //                   {selectedOrder.productTitle}
    //                 </h3>
    //                 <p className="text-gray-600 mb-2">Order ID: {selectedOrder.id}</p>
    //                 <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
    //                   {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
    //                 </span>
    //               </div>
    //             </div>

    //             {/* Order Summary */}
    //             <div className="bg-gray-50 rounded-lg p-4 mb-6">
    //               <h4 className="font-semibold text-gray-800 mb-3">Order Summary</h4>
    //               <div className="space-y-2">
    //                 <div className="flex justify-between">
    //                   <span className="text-gray-600">Quantity:</span>
    //                   <span className="font-medium">{selectedOrder.quantity}</span>
    //                 </div>
    //                 <div className="flex justify-between">
    //                   <span className="text-gray-600">Unit Price:</span>
    //                   <span className="font-medium">${selectedOrder.unitPrice}</span>
    //                 </div>
    //                 {/* {selectedOrder.discount > 0 && ( */}
    //                   <div className="flex justify-between">
    //                     <span className="text-gray-600">Discount:</span>
    //                     <span className="font-medium text-green-600">-${selectedOrder.discount}</span>
    //                   </div>
    //                 {/* )} */}
    //                 <div className="border-t border-gray-200 pt-2 mt-2">
    //                   <div className="flex justify-between">
    //                     <span className="text-lg font-bold text-gray-800">Total:</span>
    //                     <span className="text-lg font-bold text-blue-600">${selectedOrder.totalPrice}</span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>

    //             {/* Payment & Shipping Info */}
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //               <div>
    //                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
    //                   <CreditCard size={18} />
    //                   Payment Information
    //                 </h4>
    //                 <div className="space-y-2 text-sm">
    //                   <div className="flex justify-between">
    //                     <span className="text-gray-600">Method:</span>
    //                     <span className="font-medium">{selectedOrder.paymentMethod}</span>
    //                   </div>
    //                   <div className="flex justify-between">
    //                     <span className="text-gray-600">Status:</span>
    //                     <span className="font-medium text-green-600">{selectedOrder.paymentStatus}</span>
    //                   </div>
    //                   <div className="flex justify-between">
    //                     <span className="text-gray-600">Date:</span>
    //                     <span className="font-medium">{formatDate(selectedOrder.orderDate)}</span>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div>
    //                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
    //                   <Truck size={18} />
    //                   Shipping Information
    //                 </h4>
    //                 <div className="space-y-2 text-sm">
    //                   <div>
    //                     <span className="text-gray-600 block mb-1">Address:</span>
    //                     <span className="font-medium">{selectedOrder.shippingAddress}</span>
    //                   </div>
    //                   <div className="flex justify-between">
    //                     <span className="text-gray-600">Estimated Delivery:</span>
    //                     <span className="font-medium">{selectedOrder.estimatedDelivery}</span>
    //                   </div>
    //                   <div className="flex justify-between">
    //                     <span className="text-gray-600">Tracking:</span>
    //                     <span className="font-medium">{selectedOrder.trackingNumber}</span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     )}