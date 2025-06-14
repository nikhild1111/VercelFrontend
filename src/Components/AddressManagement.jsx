
// ===== FRONTEND COMPONENTS =====

// 1. File: src/components/AddressManagement.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, MapPin, Phone, Building } from 'lucide-react';

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.user);

   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'Home'
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

// when you want that token shoud be acessible from the cokkies when do withcredintial true when hit a request so browser will send the toekn fromthe applicttion cookis  

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/addresses`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setAddresses(response.data.addresses || []);
    } catch (error) {
      toast.error('No Address Found');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      addressType: 'Home'
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        // Update address
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/addresses/${editingAddress._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }
        );
        toast.success('Address updated successfully!');
      } else {
        // Add new address
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/addresses`,
          formData,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }
        );
        toast.success('Address added successfully!');
      }
      resetForm();
      fetchAddresses();
    } catch (error) {
      toast.error(editingAddress ? 'Failed to update address' : 'Failed to add address');
    }
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/addresses/${addressId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }
        );
        toast.success('Address deleted successfully!');
        fetchAddresses();
        if (selectedAddress?._id === addressId) {
          setSelectedAddress(null);
        }
      } catch (error) {
        toast.error('Failed to delete address');
      }
    }
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'Home': return '🏠';
      case 'Work': return '🏢';
      default: return '📍';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading addresses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-6 lg:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
     {/* <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6"> */}
  {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"> */}
    {/* Title and Subtitle */}
    {/* <div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
        My Addresses
      </h1>
      <p className="text-gray-600 mt-1 text-sm sm:text-base">
        Manage your delivery addresses
      </p>
    </div> */}

    {/* Add Address Button */}
    {/* <button
      onClick={() => setShowAddForm(true)}
      className="bg-black hover:bg-green-500 text-white text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded flex items-center gap-2 transition-all"
    >
      <Plus size={18} className="sm:size-5" />
      <span>Add Address</span>
    </button>
  </div>
</div> */}


<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Title and Subtitle */}
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            My Addresses
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage your delivery addresses
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 flex-wrap">
          {/* Add Address Button */}
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-black hover:bg-green-500 text-white text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded flex items-center gap-2 transition-all"
          >
            <Plus size={18} className="sm:size-5" />
            <span>Add Address</span>
          </button>

          {/* Continue Shopping Button */}
          <button
            onClick={() => navigate("/cart")}
            className="bg-black hover:bg-gray-800 text-white text-sm sm:text-base px-4 py-2 rounded transition-all"
          >
            CONTINUE ORDER
          </button>
        </div>
      </div>
    </div>




        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <textarea
                name="address"
                placeholder="Complete Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <select
                name="addressType"
                value={formData.addressType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {editingAddress ? 'Update Address' : 'Save Address'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Addresses List */}
        <div className="space-y-4">
          {addresses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No addresses found</h3>
              <p className="text-gray-500">Add your first address to get started</p>
            </div>
          ) : (
            addresses.map((address) => (
              <div
                key={address._id}
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all cursor-pointer ${
                  selectedAddress?._id === address._id
                    ? 'border-green-500 bg-green-50'
                    : 'border-transparent hover:shadow-xl'
                }`}
                onClick={() => setSelectedAddress(address)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{getAddressIcon(address.addressType)}</span>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{address.name}</h3>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                          {address.addressType}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <span>{address.phone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="mt-1" />
                        <div>
                          <p>{address.address}</p>
                          <p>{address.city}, {address.state} - {address.pincode}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(address);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(address._id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {selectedAddress?._id === address._id && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Selected for delivery</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Selected Address Summary */}
        {selectedAddress && (
          <div className="bg-green-500 text-white rounded-2xl shadow-lg p-6 mt-6">
            <h3 className="font-semibold text-lg mb-2">Selected Delivery Address</h3>
            <p className="opacity-90">
              {selectedAddress.name} - {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
            </p>
            <p className="opacity-90 mt-1">Phone: {selectedAddress.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressManagement;
