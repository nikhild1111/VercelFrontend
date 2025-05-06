import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AddProduct from '../Components/AddProduct';


const Admin = () => {
  const [authorized, setAuthorized] = useState(null); // null for loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/v1/admin', {
          withCredentials: true
        });
        if (res.data.success) {
          setAuthorized(true);
        } else {
          toast.error("Admin not authorized");
          navigate('/home');
        }
      } catch (err) {
        toast.error("Admin not authorized");
        navigate('/home');
      }
    };

    checkAdmin();
  }, [navigate]);

  if (authorized === null) {
    // Optional: Show loading or spinner while checking
    return <div className="text-center mt-10 text-xl">Checking admin access...</div>;
  }

  return (
    <div>
      {authorized ? <AddProduct /> : null}
    </div>
  );
};

export default Admin;
