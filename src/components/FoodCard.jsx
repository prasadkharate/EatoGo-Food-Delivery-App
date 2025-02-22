function FoodCard({ food, onAddToCart }) {
    return (
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        width: '250px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        margin: '10px',
      }}>
        <img src={food.image} alt={food.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }} />
        <h3 style={{ margin: '10px 0', fontSize: '18px' }}>{food.name}</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>{food.description}</p>
        <p style={{ fontWeight: 'bold', color: '#ef4f5f' }}>₹{food.price}</p>
        <button
          onClick={() => onAddToCart(food)}
          style={{
            background: '#ef4f5f',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Add to Cart
        </button>
      </div>
    );
  }
  
  export default FoodCard;