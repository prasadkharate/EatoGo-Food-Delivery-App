function OrderCard({ order, isAdmin, onStatusChange }) {
    return (
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        margin: '10px 0',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}>
        <p style={{ fontWeight: 'bold' }}>Order ID: {order._id}</p>
        {isAdmin && <p>User: {order.userId.name}</p>}
        <p>Total: ₹{order.total}</p>
        <p>Status: {order.status}</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {order.items.map(item => (
            <li key={item._id} style={{ margin: '5px 0' }}>
              {item.foodId.name} x {item.quantity}
            </li>
          ))}
        </ul>
        {isAdmin && (
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order._id, e.target.value)}
            style={{ padding: '5px', borderRadius: '5px' }}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
          </select>
        )}
      </div>
    );
  }
  
  export default OrderCard;