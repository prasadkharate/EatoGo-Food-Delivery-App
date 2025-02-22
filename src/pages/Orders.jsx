import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard.jsx';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios.get('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Your Orders</h1>
      {orders.length === 0 ? (
        <p style={{ color: '#666' }}>No orders yet</p>
      ) : (
        orders.map(order => <OrderCard key={order._id} order={order} isAdmin={false} />)
      )}
    </div>
  );
}

export default Orders;