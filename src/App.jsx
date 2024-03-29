import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/User/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import PublicLayout from "./components/PublicLayout/PublicLayout";
import Shops from "./pages/User/Shops/Shops";
import AdminLayout from './pages/Admin/components/AdminLayout/AdminLayout';
import AdminDashboard from './pages/Admin/pages/AdminDashboard/AdminDashboard';
import GameCenter from './pages/Admin/pages/GameCenter/GameCenter';
import ErrorPage from "./components/404/ErrorPage";
import QRcodePage from "./pages/User/QRcode/QRcodePage";
import GamingRoomBookings from "./pages/Admin/pages/GamingRoomBookings/GamingRoomBookings";

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

                    <Route path="/qr-scan" element={<QRcodePage />} />

                    <Route path="*" element={<ErrorPage />} />

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
                    <Route path="/" element={<Navigate to="dashboard" />} />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="game-center" element={<GameCenter />} />
                    <Route path="gaming-room-bookings" element={<GamingRoomBookings />} />
                    <Route path="*" element={<ErrorPage />} />
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
