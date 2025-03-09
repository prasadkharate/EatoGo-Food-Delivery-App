import { useEffect, useState } from 'react';
import api from '../api';

function DeveloperDashboard() {
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState({ image: '', bgColor: '#ef4f5f' });

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await api.get('/banners');
        setBanners(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBanners();
  }, []);

  const addBanner = async () => {
    try {
      const { data } = await api.post('/banners', newBanner);
      setBanners([...banners, data]);
      setNewBanner({ image: '', bgColor: '#ef4f5f' });
      alert('Banner added!');
    } catch (err) {
      alert('Failed to add banner');
    }
  };

  const removeBanner = async (id) => {
    try {
      await api.delete(`/banners/${id}`);
      setBanners(banners.filter(banner => banner._id !== id));
      alert('Banner removed!');
    } catch (err) {
      alert('Failed to remove banner');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Developer Dashboard</h1>
      <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
        <h2>Add New Banner</h2>
        <input
          placeholder="Banner Image URL"
          value={newBanner.image}
          onChange={e => setNewBanner({ ...newBanner, image: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <input
          type="color"
          value={newBanner.bgColor}
          onChange={e => setNewBanner({ ...newBanner, bgColor: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button
          onClick={addBanner}
          style={{ width: '100%', background: '#ef4f5f', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Add Banner
        </button>
      </div>
      <h2 style={{ marginBottom: '20px' }}>Current Banners</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {banners.map(banner => (
          <div key={banner._id} style={{ position: 'relative', border: '1px solid #ddd', borderRadius: '10px', padding: '15px', width: '300px' }}>
            <img
              src={banner.image}
              alt="Banner"
              style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '5px', backgroundColor: banner.bgColor }}
            />
            <button
              onClick={() => removeBanner(banner._id)}
              style={{ position: 'absolute', top: '10px', right: '10px', background: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeveloperDashboard;