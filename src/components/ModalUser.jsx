import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import InputForm from "./InputForm";
import { UserContext } from "../utils/contexts/UserContext";

export default function ModalUser({ onClose }) {
  const { userData, updateUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormData({
      fullname: userData.fullname,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    });
  }, [userData]);

  const handleEditedProfile = (e) => {
    e.preventDefault();
    const updatedData = {
      ...userData,
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    };
    updateUser(updatedData);
    onClose();
  };
  return (
    <div className="fixed inset-0 py-3 bg-gray-900 bg-opacity-50 flex items-center justify-center overflow-hidden z-10 dark:text-black">
      <div className="bg-white p-5 mx-4 md:mx-0 w-full md:w-96 max-h-full md:h-fit rounded-lg overflow-hidden">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <button
            className="mb-4 hover:bg-gray-100 hover:rounded-full p-2"
            onClick={onClose}
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="overflow-auto max-h-[80vh]">
          <form
            onSubmit={handleEditedProfile}
            className="mx-auto rounded-lg px-1"
          >
            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-2 text-sm md:text-base">
              <label htmlFor="name" id="name">
                Full Name
              </label>
              <InputForm
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleInputChange}
              />
              <label htmlFor="email" id="email">
                Email
              </label>
              <InputForm
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="phone" id="phone">
                Phone
              </label>
              <InputForm
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <label htmlFor="address" id="address">
                Address
              </label>
              <InputForm
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 mt-5 rounded-md hover:bg-orange-400 font-semibold"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
