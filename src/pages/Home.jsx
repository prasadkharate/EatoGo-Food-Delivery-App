import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FoodCard from '../components/FoodCard.jsx';

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Mock data or fetch from API
    setRestaurants([
      { id: 1, name: 'Tasty Bites', image: 'https://via.placeholder.com/300x200', cuisine: 'Italian' },
      { id: 2, name: 'Spice Haven', image: 'https://via.placeholder.com/300x200', cuisine: 'Indian' },
    ]);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>Order Food Online</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {restaurants.map(restaurant => (
          <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} style={{ textDecoration: 'none' }}>
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              width: '300px',
              overflow: 'hidden',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}>
              <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <h2 style={{ fontSize: '20px', margin: '0' }}>{restaurant.name}</h2>
                <p style={{ color: '#666' }}>{restaurant.cuisine}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;