import React from "react";

export default function ({ status, message }) {
  const textColor = status === "Success!" ? "text-green-600" : "text-red-600";

  return (
    <div className="absolute top-0 right-0 rounded-md shadow-md transition-opacity duration-500 ease-in-out opacity-100 animate-fadeIn">
      <div className="bg-[#FDFEFD] rounded-md text-gray-900 p-3">
        <h3
          className={`font-bold text-sm md:text-base text-green-600 ${textColor}`}
        >
          {status}
        </h3>
        <p className="font-normal text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
}
