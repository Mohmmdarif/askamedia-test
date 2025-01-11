import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  userData: null,
  setUserData: null,
  updateUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    fullname: "",
    phone: "",
    address: "",
    profile_picture: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setUserData(user);
    }
  }, []);

  const updateUser = (updatedData) => {
    setUserData(updatedData);
    localStorage.setItem("userData", JSON.stringify(updatedData));
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
