import React, { useContext, useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import { FaAdjust, FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../utils/contexts/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar h-20 bg-white dark:bg-gray-900 dark:text-white shadow-md flex items-center justify-between px-5 md:px-10">
      <div>
        <Link
          to="/recipe"
          className="font-bold text-lg md:text-2xl text-orange-500"
        >
          Recipe App
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <ProfileMenu />
        <div className="inline-block">
          <button
            onClick={toggleTheme}
            className="p-4 bg-white dark:bg-gray-900 outline outline-1 outline-orange-500 text-white rounded-lg flex items-center space-x-2"
          >
            {theme === "dark" ? (
              <FaMoon className="text-orange-500 dark:text-white" size={20} />
            ) : theme === "light" ? (
              <FaSun className="text-orange-500 dark:text-white" size={20} />
            ) : (
              <FaAdjust className="text-orange-500 dark:text-white" size={20} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
