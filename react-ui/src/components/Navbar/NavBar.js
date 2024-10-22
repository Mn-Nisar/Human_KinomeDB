import React from "react";

const Navbar = (props) => {
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
          />
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

export default Navbar;
