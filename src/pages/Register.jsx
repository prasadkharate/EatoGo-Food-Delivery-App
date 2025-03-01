import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [restaurantImage, setRestaurantImage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const payload = { name, email, password, role };
      if (role === 'owner') {
        if (!restaurantName || !restaurantImage) {
          return alert('Restaurant name and image are required');
        }
        payload.restaurantName = restaurantName;
        payload.restaurantDescription = restaurantDescription;
        payload.restaurantImage = restaurantImage;
      }
      await api.post('/auth/register', payload);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>Register</h1>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Full Name"
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
      />
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
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
      >
        <option value="customer">Customer</option>
        <option value="owner">Restaurant Owner</option>
      </select>
      {role === 'owner' && (
        <>
          <input
            type="text"
            value={restaurantName}
            onChange={e => setRestaurantName(e.target.value)}
            placeholder="Restaurant Name"
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            value={restaurantDescription}
            onChange={e => setRestaurantDescription(e.target.value)}
            placeholder="Restaurant Description (optional)"
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            value={restaurantImage}
            onChange={e => setRestaurantImage(e.target.value)}
            placeholder="Restaurant Image URL"
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </>
      )}
      <button
        onClick={handleRegister}
        style={{ width: '100%', background: '#ef4f5f', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
        disabled={role === 'owner' && (!restaurantName || !restaurantImage)}
      >
        Register
      </button>
    </div>
  );
}

export default Register;