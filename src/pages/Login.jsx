import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Logging in with:', { email, password });
      const { data } = await api.post('/auth/login', { email, password });
      console.log('Login response:', data);
      localStorage.setItem('token', data.token);
      if (data.role === 'admin') navigate('/admin');
      else if (data.role === 'owner') navigate('/owner');
      else if (data.role === 'banner-manager') navigate('/banner-manager');
      else if (data.role === 'developer') navigate('/developer'); // Added
      else navigate('/');
    } catch (err) {
      console.log('Login error:', err.response?.data || err);
      alert('Login failed');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>Login</h1>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      <button
        onClick={handleLogin}
        style={{ width: '100%', background: '#ef4f5f', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;