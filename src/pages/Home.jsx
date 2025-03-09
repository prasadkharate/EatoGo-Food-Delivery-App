import { useEffect, useState } from 'react';
import api from '../api';
import Slider from 'react-slick';

function Home() {
  const [foods, setFoods] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodRes, bannerRes] = await Promise.all([
          api.get('/food'),
          api.get('/banners')
        ]);
        setFoods(foodRes.data);
        setBanners(bannerRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
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
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    alert(`${food.name} added to cart!`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Top Banner Slideshow */}
      <div style={{ marginBottom: '30px' }}>
        <Slider {...settings}>
          {banners.map(banner => (
            <div key={banner._id}>
              <div
                style={{
                  backgroundColor: banner.bgColor,
                  padding: '20px',
                  borderRadius: '10px',
                  height: '200px', // Increased height for images
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={banner.image}
                  alt="Banner"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Food Items List */}
      <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>Order Food Online</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {foods.map(food => (
          <div key={food._id} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            width: '300px',
            padding: '15px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          }}>
            <img src={food.image} alt={food.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
            <h2 style={{ fontSize: '20px', margin: '10px 0' }}>{food.name}</h2>
            <p style={{ margin: '0', fontSize: '18px' }}>₹{food.price}</p>
            {food.offer && <p style={{ color: '#28a745', margin: '5px 0' }}>{food.offer}% Off</p>}
            <button
              onClick={() => addToCart(food)}
              style={{ width: '100%', background: '#ef4f5f', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;