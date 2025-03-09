import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function EditProfile() {
  const [user, setUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/auth/profile');
        setUser({ name: data.name, email: data.email });
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    try {
      await api.put('/auth/profile', user); // Requires new backend endpoint
      alert('Profile updated!');
      navigate('/profile');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Edit Profile</h1>
      <input
        type="text"
        value={user.name}
        onChange={e => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      <input
        type="email"
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      <button
        onClick={handleSave}
        style={{ width: '100%', background: '#ef4f5f', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Save Changes
      </button>
    </div>
  );
}

export default EditProfile;