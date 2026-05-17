const HeroBanner = ({ style }) => {
  return (
    <div className="hero-banner" style={style}>
      <img 
        src="images/promo/produit1.png" 
        alt="Banner"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center"
        }}
      />
    </div>
  );
};

export default HeroBanner;