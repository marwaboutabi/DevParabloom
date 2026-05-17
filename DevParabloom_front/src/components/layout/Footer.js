/* src/components/layout/Footer.jsx */
const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-col">
        <h4>Pour Commander</h4>
        <ul>
          <li>La méthode la plus simple pour passer commande est directement via notre site web.</li>
          <li>Sinon, vous pouvez passer votre commande par :</li>
          <li>📞 +212 607498873</li>
          <li>✉️ MAR: contact@parabloom.ma</li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Conditions de vente</h4>
        <ul>
          <li>Conditions générales de vente</li>
          <li>Politique de retour</li>
          <li>Livraison</li>
        </ul>
      </div>
      
      <div className="footer-col">
        <h4>Profil</h4>
        <ul>
          
          <li>Mes commandes</li>
          
          <li>FAQ</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      Copyright © 2026 ParaBloom — Commerce électronique propulsé par Shopify
    </div>
  </footer>
);

export default Footer;