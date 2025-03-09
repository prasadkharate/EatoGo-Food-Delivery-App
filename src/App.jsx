import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminOrders from './pages/AdminOrders.jsx';
import OwnerDashboard from './pages/OwnerDashboard.jsx';
import BannerManagerDashboard from './pages/BannerManagerDashboard.jsx';
import DeveloperDashboard from './pages/DeveloperDashboard.jsx'; // Added

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/banner-manager" element={<BannerManagerDashboard />} />
          <Route path="/developer" element={<DeveloperDashboard />} /> {/* Added */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;