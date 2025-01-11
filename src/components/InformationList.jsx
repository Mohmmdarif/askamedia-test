import React from "react";

export default function InformationList({ data }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 dark:text-white">
      {data.map((item, index) => (
        <div key={index}>
          <h3 className="font-semibold text-sm md:text-lg">{item.label}</h3>
          <p className="text-sm md:text-base">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
