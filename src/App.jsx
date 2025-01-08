import { Route, Routes, useLocation } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const pathLocation = useLocation();

  const hideNavbarRoutes = ["/login"];

  const hideNavbar = hideNavbarRoutes.includes(pathLocation.pathname);

  return (
    <>
      {!hideNavbar &&
        <Navbar />
      }
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default App
