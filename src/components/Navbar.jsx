import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decoded = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const { role } = decoded;

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
        Zomato Clone
      </Link>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Home</Link>
        <Link to="/cart" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Cart</Link>
        <Link to="/orders" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Orders</Link>
        {role === 'admin' && (
          <>
            <Link to="/admin" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Admin</Link>
            <Link to="/admin/orders" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Admin Orders</Link>
          </>
        )}
        {role === 'owner' && (
          <Link to="/owner" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Owner Dashboard</Link>
        )}
        {token ? (
          <button onClick={handleLogout} style={{ background: 'white', color: '#ef4f5f', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
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