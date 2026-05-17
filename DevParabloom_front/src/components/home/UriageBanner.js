/* src/components/home/UriageBanner.jsx */
import ProductCard from '../common/ProductCard';
import { products, uriageProducts } from '../../data/mockData';

const UriageBanner = () => {
  // Filtrer TOUS les produits Uriage automatiquement
  const allUriageProducts = [
    ...products.filter(p => p.name.toLowerCase().includes('uriage')),
    ...uriageProducts
  ];

  return (
    <>
      {/* Bannière avec grande image */}
      <section className="uriage-banner">
        <div className="main-banner-image">
          <img
            src="images/uriage/grandeImage2.jpeg"
            alt="Uriage Eau Thermale"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </div>
      </section>

      {/* Section complète des produits Uriage - AFFICHAGE AUTOMATIQUE */}
      <div className="uriage-products">
        {allUriageProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default UriageBanner;