import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="pt-24 text-center text-3xl line">
      <img src="https://i.pinimg.com/originals/b9/ec/b3/b9ecb3b2749f6e88931cb524be182843.gif" className="mx-auto w-[50%]" alt="" />
      <h1 className="pt-8">403 - Unauthorized</h1>
      <p className="text-xl mb-5">You do not have permission to access this page.</p>
      <Link to="/" className="my-8 py-2 px-5 bg-blue-500 mb-40 text-white rounded-3xl">Go to Home</Link>
      <h1 className="mb-2">...</h1>
    </div>
  );
};

export default Unauthorized;
