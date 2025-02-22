import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FoodCard from '../components/FoodCard.jsx';

function RestaurantMenu() {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/food')
      .then(res => setFoods(res.data))
      .catch(() => setFoods([
        { _id: 1, name: 'Pizza', price: 299, description: 'Cheesy delight', image: 'https://via.placeholder.com/250' },
        { _id: 2, name: 'Pasta', price: 199, description: 'Creamy sauce', image: 'https://via.placeholder.com/250' },
      ]));
  }, []);

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
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Restaurant Menu</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {foods.map(food => (
          <FoodCard key={food._id} food={food} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantMenu;