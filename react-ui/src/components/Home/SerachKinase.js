import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchKinase = () => {
  const kinaseName = useRef();
  const navigate = useNavigate();

  const handleSearch = () => {
    const kinase = kinaseName.current.value;
    if (kinase) {
      navigate(`/kinase/${kinase}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold my-5">Welcome to Human KinomeDB</h1>

      <input
        type="text"
        placeholder="Enter kinase name"
        className="w-[400px] p-2 mb-4 border border-gray-300 rounded-sm"
        ref={kinaseName}
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-sm"
      >
        Search
      </button>
    </div>
  );
};

export default SearchKinase;
