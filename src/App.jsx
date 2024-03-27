import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/User/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AdminLayout from "./pages/Admin/components/Layout/AdminLayout";
import PublicLayout from "./components/PublicLayout/PublicLayout";
import Shops from "./pages/User/Shops/Shops";

function App() {
  return (
    <>
      <Router>
        <div className="">
          <Routes>
            {/* Public routes */}
            <Route
              path="/*"
              element={
                <PublicLayout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shops" element={<Shops />} />

                    {/* Auth routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
                </PublicLayout>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin/*"
              element={
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="users" element={<Shops />} />
                  </Routes>
                </AdminLayout>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
