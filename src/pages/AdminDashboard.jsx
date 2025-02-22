import { useEffect, useState } from 'react';
import axios from 'axios';
import FoodCard from '../components/FoodCard.jsx';

function AdminDashboard() {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({ name: '', price: '', description: '', image: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/food', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setFoods(res.data));
  }, []);

  const addFood = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.post('http://localhost:5000/api/food', newFood, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFoods([...foods, data]);
    setNewFood({ name: '', price: '', description: '', image: '' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Admin Dashboard</h1>
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}>
        <input
          placeholder="Name"
          value={newFood.name}
          onChange={e => setNewFood({ ...newFood, name: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <input
          placeholder="Price"
          value={newFood.price}
          onChange={e => setNewFood({ ...newFood, price: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <input
          placeholder="Description"
          value={newFood.description}
          onChange={e => setNewFood({ ...newFood, description: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <input
          placeholder="Image URL"
          value={newFood.image}
          onChange={e => setNewFood({ ...newFood, image: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button
          onClick={addFood}
          style={{ width: '100%', background: '#ef4f5f', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Add Food
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {foods.map(food => (
          <FoodCard key={food._id} food={food} onAddToCart={() => {}} />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;