import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Products from './pages/Shops/Shops';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="pt-20 min-h-[65vh]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/events" element={<HomePage />} />
            <Route path="/annual" element={<HomePage />} />
            <Route path="/team" element={<HomePage />} />
            <Route path="/blogs" element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
