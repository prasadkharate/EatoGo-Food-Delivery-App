import { useEffect, useState } from 'react';
import api from '../api';
import OrderCard from '../components/OrderCard.jsx';

function Orders() {
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