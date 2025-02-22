import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard.jsx';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    const { data } = await axios.put(`http://localhost:5000/api/orders/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(orders.map(order => (order._id === id ? data : order)));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Admin Orders</h1>
      {orders.map(order => (
        <OrderCard key={order._id} order={order} isAdmin={true} onStatusChange={updateStatus} />
      ))}
    </div>
  );
}

export default AdminOrders;