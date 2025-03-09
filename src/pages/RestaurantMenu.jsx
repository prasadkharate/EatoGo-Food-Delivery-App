import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import FoodCard from '../components/FoodCard.jsx';

function RestaurantMenu() {
  const { id } = useParams(); // Restaurant ID
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
          <div key={food._id}>
            <Link to={`/item/${food._id}`} style={{ textDecoration: 'none' }}>
              <FoodCard food={food} onAddToCart={() => {}} /> {/* No add-to-cart here */}
            </Link>
            <button
              onClick={() => addToCart(food)}
              style={{ marginTop: '10px', background: '#ef4f5f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantMenu;