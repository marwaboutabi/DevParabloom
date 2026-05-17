import React, { useState } from 'react';

const FAQSection = () => {
  // Liste de vos questions/réponses
  const faqItems = [
    {
      question: "Comment passer commande ?",
      reponse: "Vous pouvez commander directement sur notre site en ajoutant les produits à votre panier et en validant la commande. Vous pouvez aussi nous appeler au +212 607498873."
    },
    {
      question: "Quels sont les délais de livraison ?",
      reponse: "La livraison est gratuite à Casablanca sous 24-48h. Pour les autres villes, comptez 3 à 5 jours ouvrés."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      reponse: "Nous acceptons le paiement à la livraison (espèces) et le paiement en ligne sécurisé par carte bancaire via Stripe."
    },
    {
      question: "Puis-je retourner un produit ?",
      reponse: "Oui, vous disposez d'un délai de 3 jours pour retourner un produit non utilisé et dans son emballage d'origine."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h2 className="section-title">FQA</h2>
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div key={index} className="faq-item" style={{ 
            marginBottom: '10px', 
            border: '1px solid #eee', 
            borderRadius: '8px', 
            overflow: 'hidden' 
          }}>
            <button 
              onClick={() => toggleQuestion(index)}
              style={{
                width: '100%',
                padding: '15px',
                textAlign: 'left',
                background: activeIndex === index ? '#fce4e8' : '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              {item.question}
              <span>{activeIndex === index ? '-' : '+'}</span>
            </button>
            
            {activeIndex === index && (
              <div style={{ padding: '15px', background: '#fff', borderTop: '1px solid #eee' }}>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{item.reponse}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;