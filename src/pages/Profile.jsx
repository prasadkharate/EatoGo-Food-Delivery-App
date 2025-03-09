import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/auth/profile');
        setUser(data);
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {user.role === 'owner' && <p><strong>Restaurant ID:</strong> {user.restaurantId}</p>}
      <button
        onClick={() => navigate('/profile/edit')}
        style={{ width: '100%', background: '#ef4f5f', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
      >
        Edit Profile
      </button>
    </div>
  );
}

export default Profile;