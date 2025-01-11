import React, { useContext, useEffect, useState } from "react";
import ModalUser from "../components/ModalUser";
import { UserContext } from "../utils/contexts/UserContext";

export default function Profile() {
  const { userData } = useContext(UserContext);
  const [edited, setEdited] = useState(false);

  const detailUser = [
    { label: "Fullname", value: userData.fullname },
    { label: "Email", value: userData.email },
    { label: "Phone", value: userData.phone },
    { label: "Address", value: userData.address },
  ];

  const handleShowModal = () => {
    setEdited(!edited);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full md:w-96 mx-4 p-4 bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:shadow-orange-600">
        <h1 className="text-lg md:text-2xl font-bold text-center dark:text-white">
          User Profile
        </h1>
        <div className="space-y-2 mt-4">
          <img
            src={userData.profile_picture}
            alt="profile"
            className="w-2/5 mx-auto border-2 border-orange-100 p-1.5 mb-8 rounded-full"
          />
          {detailUser.map((detail, index) => (
            <div key={index} className="flex justify-between items-center">
              <label className="text-gray-600 font-bold text-sm md:text-base dark:text-white">
                {detail.label}
              </label>
              <p className="text-gray-800 text-sm md:text-base dark:text-white">
                {detail.value}
              </p>
            </div>
          ))}
          <div className="w-full">
            <button
              className="w-full bg-orange-500 p-2 rounded-md text-white font-semibold mt-5 text-sm md:text-base"
              onClick={() => setEdited(!edited)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {edited && <ModalUser onClose={handleShowModal} />}
    </div>
  );
}
