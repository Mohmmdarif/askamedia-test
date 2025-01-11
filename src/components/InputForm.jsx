import React from "react";

export default function InputForm({
  type,
  name,
  placeholder,
  value,
  onChange,
  className,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 border border-gray-300 rounded dark:text-black ${className}`}
    />
  );
}
