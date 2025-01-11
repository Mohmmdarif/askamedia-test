import React from "react";

export default function Spinner({ style }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${style}`}
      ></div>
    </div>
  );
}
