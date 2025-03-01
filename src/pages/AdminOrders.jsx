import { useEffect, useState } from 'react';
import api from '../api';
import OrderCard from '../components/OrderCard.jsx';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/orders/${id}`, { status });
      setOrders(orders.map(order => (order._id === id ? data : order)));
    } catch (err) {
      alert('Failed to update status');
    }
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