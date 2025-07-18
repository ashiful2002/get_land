import React from "react";
import Lottie from "lottie-react";
import notFoundAnimation from "../../../public/404.json"; // Adjust the path if needed
import { Link, useLocation } from "react-router";

const NotFound = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="w-full max-w-md">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold mt-6">Oops! Page Not Found</h1>
      <p className="text-lg mt-2 text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
