import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'; // Import Bounce if you want to use it

function TestNotification() {
  const showNotification = () => {
    console.log("Notification function called");  
    toast('🦄 Wow so easy!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce, 
    });
  };

  return (
    <div>
      <button onClick={showNotification}>Show Notification</button>
      <ToastContainer />
    </div>
  );
}

export default TestNotification;
