import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decoded = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const { role, name } = decoded; // Added name from token
  const [cartCount, setCartCount] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#ef4f5f',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    }}>
      <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: 'white' }}>
        EatGo Food Delivery
      </Link>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Home</Link>
        <Link to="/cart" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
          Cart ({cartCount})
        </Link>
        {role === 'admin' && (
          <>
            <Link to="/admin" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Admin</Link>
            <Link to="/admin/orders" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Admin Orders</Link>
          </>
        )}
        {role === 'owner' && (
          <Link to="/owner" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Owner Dashboard</Link>
        )}
        {role === 'banner-manager' && (
          <Link to="/banner-manager" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Banner Manager</Link>
        )}
        {role === 'developer' && (
          <Link to="/developer" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Developer Dashboard</Link>
        )}
        {token ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{ background: 'none', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}
            >
              {name || 'Profile'} ▼
            </button>
            {isProfileOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                background: 'white',
                color: '#333',
                borderRadius: '5px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                minWidth: '150px',
              }}>
                <Link to="/profile" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#333' }}>
                  View Profile
                </Link>
                <Link to="/profile/edit" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#333' }}>
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  style={{ display: 'block', width: '100%', padding: '10px', background: '#ef4f5f', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;