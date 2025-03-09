import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import FoodCard from '../components/FoodCard.jsx';

function ItemDetails() {
  const { id } = useParams(); // Food item ID
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the specific food item
        const { data: food } = await api.get(`/food/item/${id}`);
        const restaurantId = food.restaurantId;
        // Fetch restaurant details and full menu
        const [restRes, menuRes] = await Promise.all([
          api.get(`/restaurants/${restaurantId}`),
          api.get(`/food/${restaurantId}`)
        ]);
        setItem(food);
        setRestaurant(restRes.data);
        setMenu(menuRes.data);
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

  if (!item || !restaurant) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', background: '#ddd', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
        Back
      </button>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>{item.name}</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        <img src={item.image} alt={item.name} style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '10px' }} />
        <div>
          <p style={{ fontSize: '18px', margin: '0 0 10px' }}>₹{item.price}</p>
          <p style={{ color: '#666', margin: '0 0 20px' }}>{item.description}</p>
          <button
            onClick={() => addToCart(item)}
            style={{ background: '#ef4f5f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>{restaurant.name} Menu</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {menu.map(food => (
          <div key={food._id}>
            <Link to={`/item/${food._id}`} style={{ textDecoration: 'none' }}>
              <FoodCard food={food} onAddToCart={() => {}} />
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

export default ItemDetails;