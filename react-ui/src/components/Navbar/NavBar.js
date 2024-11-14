// import React from "react";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
const kinaseNameRef = useRef(); // Changed variable name for clarity
const navigate = useNavigate();

  const handleSearch = () => {
    const kinase = kinaseNameRef.current.value.trim(); // Trim whitespace
    if (kinase) {
      navigate(`/kinase/${kinase}`); // Navigate to the kinase route
    }
  };

// const NavBar = (props) => {
  return (
    <React.Fragment>
      <nav className="flex items-center justify-center p-4">
        {/* KinomeDB (Logo) */}
        <div className="text-2xl font-bold">
          <a href="/" className="text-black no-underline">
            KinomeDB
          </a>
        </div>

        {/* Search Bar */}
        <div className="mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] p-2 border border-gray-300 rounded"
            ref={kinaseNameRef}
          />
         
           <button
           onClick={handleSearch} 
           className="p-2 text-white rounded-r" style={{ backgroundColor: "#7192b4" }}>
            Search
          </button>
        </div>

        {/* FAQs */}
        <div className="ml-4">
          <a href="/faqs" className="text-black no-underline">
            FAQs
          </a>
        </div>

        {/* Contact Us */}
        <div className="ml-4">
          <a href="/contactus" className="text-black no-underline">
            Contact Us
          </a>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
