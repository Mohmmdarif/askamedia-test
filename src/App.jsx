import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RecipeDetail from "./pages/RecipeDetail";
import Profile from "./pages/Profile";
import { UserProvider } from "./utils/contexts/UserContext";
import { ThemeProvider } from "./utils/contexts/ThemeContext";

function App() {
  const pathLocation = useLocation();

  const hideNavbarRoutes = ["/login"];

  const hideNavbar = hideNavbarRoutes.includes(pathLocation.pathname);

  return (
    <ThemeProvider>
      <UserProvider>
        {!hideNavbar && <Navbar />}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/recipe" replace />} />
            <Route
              path="/recipe"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipe/:id"
              element={
                <ProtectedRoute>
                  <RecipeDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
