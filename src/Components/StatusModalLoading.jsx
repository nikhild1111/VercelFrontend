// components/PaymentStatusModal.jsx
import React from "react";
import { Loader2 } from "lucide-react"; // or use any spinner icon

const PaymentStatusModal = ({ message, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg px-8 py-6 w-full max-w-sm text-center">
        <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={32} />
        <h3 className="text-lg font-semibold text-gray-800">{message}</h3>
        <p className="text-sm text-gray-500 mt-2">Please do not refresh or close this window.</p>
      </div>
    </div>
  );
};

export default PaymentStatusModal;
