import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

const isOutOfStock = product.in_stock === false ||
  (product.stock !== undefined && product.stock !== null && product.stock === 0);
  const imageUrl      = product.image_url || product.image;
  const basePrice     = parseFloat(product.price);
  const promoPrice    = product.promo_price ? parseFloat(product.promo_price) : null;

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <img
        className="product-img"
        src={imageUrl}
        alt={product.name}
        onError={(e) => { e.target.src = '/images/placeholder.png'; }}
      />

      <div className="product-name">{product.name}</div>

      <div className="product-price">
        {promoPrice ? (
          <>
            <span style={{ textDecoration: 'line-through', color: '#bbb', marginRight: '6px', fontSize: '12px' }}>
              {basePrice.toFixed(2)} dh
            </span>
            <span style={{ color: '#e53935', fontWeight: 'bold' }}>
              {promoPrice.toFixed(2)} dh
            </span>
          </>
        ) : (
          <span>{basePrice.toFixed(2)} dh</span>
        )}
      </div>

      <button
        className={`add-to-cart${isOutOfStock ? ' out-of-stock' : ''}`}
        disabled={isOutOfStock}
        onClick={(e) => {
          e.stopPropagation();
          if (!isOutOfStock) addToCart(product);
        }}
      >
        {isOutOfStock ? 'Rupture de stock' : 'Ajouter au Panier'}
      </button>
    </div>
  );
};

export default ProductCard;