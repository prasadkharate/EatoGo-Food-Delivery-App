import { useEffect, useState } from 'react';
import api from '../api';
import FoodCard from '../components/FoodCard.jsx';
import OrderCard from '../components/OrderCard.jsx';

function OwnerDashboard() {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newFood, setNewFood] = useState({ name: '', price: '', description: '', image: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodRes, orderRes] = await Promise.all([
          api.get('/owner/menu'),
          api.get('/owner/orders'),
        ]);
        setFoods(foodRes.data);
        setOrders(orderRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const addFood = async () => {
    try {
      const { data } = await api.post('/owner/menu', newFood);
      setFoods([...foods, data]);
      setNewFood({ name: '', price: '', description: '', image: '' });
    } catch (err) {
      alert('Failed to add food');
    }
  };

  const removeFood = async (id) => {
    try {
      await api.delete(`/owner/menu/${id}`);
      setFoods(foods.filter(food => food._id !== id));
    } catch (err) {
      alert('Failed to remove food');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Owner Dashboard</h1>
      <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h2>Add Dish</h2>
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
          Add Dish
        </button>
      </div>
      <h2 style={{ marginBottom: '20px' }}>Your Menu</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
        {foods.map(food => (
          <div key={food._id} style={{ position: 'relative' }}>
            <FoodCard food={food} onAddToCart={() => {}} />
            <button
              onClick={() => removeFood(food._id)}
              style={{ position: 'absolute', top: '10px', right: '10px', background: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <h2 style={{ marginBottom: '20px' }}>Orders</h2>
      {orders.map(order => (
        <OrderCard key={order._id} order={order} isAdmin={false} />
      ))}
    </div>
  );
}

export default OwnerDashboard;