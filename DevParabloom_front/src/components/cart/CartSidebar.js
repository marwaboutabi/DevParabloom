/* src/components/cart/CartSidebar.jsx */
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { cart, showCart, setShowCart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (!showCart) return null;

  return (
    <>
      <div className="cart-sidebar-overlay" onClick={() => setShowCart(false)} />
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3>Mon Panier ({cart.length})</h3>
          <button className="cart-close" onClick={() => setShowCart(false)}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', fontSize: '14px', marginTop: '40px' }}>
              Votre panier est vide
            </p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img
  src={item.image_url || item.image || 'https://placehold.co/60x60/f9f9f9/ccc?text=P'}
  alt={item.name}
  onError={(e) => {
    e.target.src = 'https://placehold.co/60x60/f9f9f9/ccc?text=P';
  }}
/>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ width: '24px', height: '24px', border: '1px solid #ddd', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}
                    >-</button>
                    <span style={{ fontSize: '13px', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ width: '24px', height: '24px', border: '1px solid #ddd', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}
                    >+</button>
                  </div>
                  <div className="cart-item-price">{(item.price * item.quantity).toFixed(2)} dh</div>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>{total.toFixed(2)} dh</span>
            </div>
            <button
              className="cart-checkout-btn"
              onClick={() => {
                setShowCart(false);
                navigate('/checkout');
              }}
            >
              Passer au Paiement
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;