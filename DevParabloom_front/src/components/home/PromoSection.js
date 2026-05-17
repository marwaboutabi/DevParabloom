import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const PromoSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const promoProducts = [
    {
      id: 31,
      name: "La roche-posay cicaplast baume cicatrisant b5+ 40 ml",
      price: 90.00,
      oldPrice: 110.00,
      image: "images/promo/promoo1.png"
    },
    {
      id: 69,
      name: "Kérastase Gloss Absolu Fondant Insta Glaze 250ml ",
      price: 170.00,
      oldPrice: 200.00,
      image: "images/promo/promoo2.png"
    },
    {
      id: 66,
      name: "Vichy Dercos Shampooing Anti-pelliculaire 200ml ",
      price: 132.00,
      oldPrice: 160.00,
      image: "images/promo/promoo3.png"
    },
    {
      id: 67,
      name: "Uriage Xémose Huile Lavante Apaisante 500ml",
      price: 129.00,
      oldPrice: 209.00,
      image: "images/promo/promoo4.png"
    },
    {
      id: 68,
      name: "VICHY MINERAL 89 SERUM FORTIFIANT 50 ML",
      price: 210.00,
      oldPrice: 218.00,
      image: "images/visage/serum/serum6.png"
    }


    
  ];

  return (
    <div className="promo-section">
      <div className="promo-header">
         Promotion du Moment
        <span className="promo-badge">-15%</span>
      </div>
      <div className="product-grid" style={{ marginBottom: 0 }}>
        {promoProducts.map(product => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img className="product-img" src={product.image} alt={product.name} />
            <div className="product-name">{product.name}</div>
            <div className="product-price" style={{ textDecoration: 'line-through', color: '#ccc', fontSize: '12px' }}>
              {product.oldPrice.toFixed(2)} dh
            </div>
            <div className="product-price">{product.price.toFixed(2)} dh</div>
            <button 
              className="add-to-cart"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Ajouter au Panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoSection;