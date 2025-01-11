import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import staticCredential from "../mocks/credentials.json";
import { validateCredential } from "../utils/validations/loginValidation";
import Spinner from "../components/spinner";
import AuthRedirect from "../components/auth/AuthRedirect";
import Notification from "../components/Notification";
import recipeData from "../mocks/recipe.json";

export default function Login() {
  AuthRedirect();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    status: "",
    message: "",
    visible: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedMessage = localStorage.getItem("logoutMessage");

    if (storedMessage) {
      const { status, message } = JSON.parse(storedMessage);
      setNotification({
        status,
        message,
        visible: true,
      });

      localStorage.removeItem("logoutMessage");

      setTimeout(() => {
        setNotification({
          status: "",
          message: "",
          visible: false,
        });
      }, 3000);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const credential = validateCredential(email, password);
      if (credential.isValid) {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email: staticCredential.email,
            fullname: staticCredential.fullname,
            phone: staticCredential.phone,
            address: staticCredential.address,
            profile_picture: staticCredential.profile_picture,
          })
        );
        localStorage.setItem(
          "loginMessage",
          JSON.stringify({
            status: "Success!",
            message: "You have successfully logged in!",
          })
        );

        localStorage.setItem("recipeData", JSON.stringify(recipeData));

        navigate("/recipe");
      } else {
        setError(credential.error);
      }
    } catch (error) {
      console.error("Error while validating credentials: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-900">
      {notification.visible && (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      )}
      <div className="w-full max-w-sm md:max-w-md bg-white dark:bg-gray-900 dark:shadow-orange-600 dark:text-white shadow-md rounded-xl p-5 md:p-10 mx-5 space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-base mt-3">
            Sign in to your account to get full access.
          </p>
        </div>
        <form className="space-y-2" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex flex-col space-y-2">
            <label className="text-base">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="outline outline-1 -outline-offset-1 outline-gray-300 px-3 py-1.5 rounded-md focus:outline-orange-500 dark:text-black focus:outline-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-base">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="outline outline-1 -outline-offset-1 outline-gray-300 px-3 py-1.5 rounded-md focus:outline-orange-500 focus:outline-2 dark:text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 bg-orange-500 px-3 py-1.5 rounded-md text-white font-semibold text-base mt-5 hover:bg-orange-400"
            >
              Login {isLoading && <Spinner style="border-white" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
