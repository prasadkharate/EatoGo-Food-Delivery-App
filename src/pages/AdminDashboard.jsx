import { useEffect, useState } from 'react';
import api from '../api';
import FoodCard from '../components/FoodCard.jsx';

function AdminDashboard() {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [newFood, setNewFood] = useState({ name: '', price: '', description: '', image: '', restaurantId: '' });
  const [newRestaurant, setNewRestaurant] = useState({ name: '', description: '', image: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodRes, restRes] = await Promise.all([
          api.get('/food'),
          api.get('/restaurants')
        ]);
        setFoods(foodRes.data);
        setRestaurants(restRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const addRestaurant = async () => {
    try {
      const { data } = await api.post('/restaurants', newRestaurant);
      setRestaurants([...restaurants, data]);
      setNewRestaurant({ name: '', description: '', image: '' });
    } catch (err) {
      alert('Failed to add restaurant');
    }
  };

  const addFood = async () => {
    try {
      const { data } = await api.post('/food', newFood);
      setFoods([...foods, data]);
      setNewFood({ name: '', price: '', description: '', image: '', restaurantId: '' });
    } catch (err) {
      alert('Failed to add food');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Admin Dashboard</h1>

      {/* Add Restaurant */}
      <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h2>Add Restaurant</h2>
        <input
          placeholder="Name"
          value={newRestaurant.name}
          onChange={e => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <input
          placeholder="Description"
          value={newRestaurant.description}
          onChange={e => setNewRestaurant({ ...newRestaurant, description: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <input
          placeholder="Image URL"
          value={newRestaurant.image}
          onChange={e => setNewRestaurant({ ...newRestaurant, image: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button
          onClick={addRestaurant}
          style={{ width: '100%', background: '#ef4f5f', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Add Restaurant
        </button>
      </div>

      {/* Add Food */}
      <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h2>Add Food</h2>
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
        <select
          value={newFood.restaurantId}
          onChange={e => setNewFood({ ...newFood, restaurantId: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        >
          <option value="">Select Restaurant</option>
          {restaurants.map(rest => (
            <option key={rest._id} value={rest._id}>{rest.name}</option>
          ))}
        </select>
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