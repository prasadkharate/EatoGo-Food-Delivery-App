import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const navigate = useNavigate();

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    try {
      await api.post('/orders', {
        items: cart.map(item => ({ foodId: item._id, quantity: item.quantity })),
        total,
      });
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/orders');
    } catch (err) {
      alert('Order placement failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Your Cart</h1>
      {cart.length === 0 ? (
        <p style={{ color: '#666' }}>Your cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item._id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px' }} />
              <div style={{ flex: 1, marginLeft: '15px' }}>
                <h3 style={{ margin: '0' }}>{item.name}</h3>
                <p>₹{item.price} x <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, +e.target.value)}
                  min="1"
                  style={{ width: '50px', padding: '5px' }}
                /></p>
              </div>
              <button
                onClick={() => removeItem(item._id)}
                style={{ background: '#ef4f5f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </p>
            <button
              onClick={placeOrder}
              style={{ background: '#ef4f5f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;