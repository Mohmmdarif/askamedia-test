import React from "react";

export default function TitleHeader({ title, children }) {
  return (
    <div className="flex">
      <h2 className="font-bold text-lg md:text-3xl mb-4">{title}</h2>
      {children}
    </div>
  );
}
