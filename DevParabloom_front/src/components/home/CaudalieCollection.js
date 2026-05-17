/* src/components/home/CaudalieCollection.js */
import React from 'react';
import ProductCard from '../common/ProductCard';
import { products } from '../../data/mockData';
// ❌ PAS BESOIN d'importer le CSS - il est déjà dans App.css

const CaudalieCollection = () => {
  const caudalieProducts = products
    .filter(product => product.brand === 'Caudalie')
    .slice(0, 5);

  return React.createElement('div',
    { className: 'caudalie-section' },
    React.createElement('div',
      { className: 'caudalie-container' },
      
      React.createElement('h2',
        { className: 'caudalie-title' },
        'La Gamme Caudalie Resveratrol-Lift'
      ),
      
      React.createElement('div',
        { className: 'caudalie-grid' },
        ...caudalieProducts.map(product =>
          React.createElement(ProductCard, {
            key: product.id,
            product: product
          })
        )
      )
    )
  );
};

export default CaudalieCollection;