import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/contexts/UserContext";

export default function ProfileMenu() {
  const { userData } = useContext(UserContext);

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const defaultProfilePic = "https://via.placeholder.com/150";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userData");
      localStorage.removeItem("recipeData");

      localStorage.setItem(
        "logoutMessage",
        JSON.stringify({
          status: "Success!",
          message: "You have successfully logged out!",
        })
      );

      navigate("/login");
    } catch (error) {
      console.error("Error while logging out: ", error);
    }
  };

  return (
    <div ref={menuRef}>
      <button
        className="flex items-center space-x-3 outline outline-1 outline-orange-500 p-2 rounded-lg"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <img
          src={userData.profile_picture || defaultProfilePic}
          alt="profile pic"
          className="w-10 h-10 rounded-full border-2 border-orange-100"
        />
        <span className="font-semibold hidden md:block text-sm md:text-base">
          {userData.fullname}
        </span>
        <AiOutlineCaretDown className="text-orange-500" />
      </button>
      {showMenu && (
        <div className="dark:text-black">
          <ul className="absolute top-20 right-10 md:right-[105px] bg-white shadow-md rounded-md py-2 w-32 md:w-48 text-sm md:text-base font-normal">
            <li className="hover:bg-gray-100 flex items-center gap-2">
              <button
                className="w-full flex items-center gap-2 px-3 py-1.5"
                onClick={() => navigate("/profile")}
              >
                <IoMdPerson size={20} />
                Profile
              </button>
            </li>
            <li className="hover:bg-gray-100">
              <button
                className="w-full flex items-center gap-2 px-3 py-1.5"
                onClick={handleLogout}
              >
                <BiLogOut color="red" size={20} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
