import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import FoodCard from '../components/FoodCard.jsx';

function RestaurantMenu() {
  const { id } = useParams(); // Restaurant ID from URL
  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodRes, restRes] = await Promise.all([
          api.get(`/food/${id}`),
          api.get(`/restaurants/${id}`)
        ]);
        setFoods(foodRes.data);
        setRestaurant(restRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const addToCart = (food) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item._id === food._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${food.name} added to cart!`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>{restaurant?.name || 'Restaurant Menu'}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {foods.map(food => (
          <FoodCard key={food._id} food={food} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantMenu;