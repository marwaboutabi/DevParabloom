import { useState, useEffect } from 'react';
import api from '../services/api';
import { products as mockProducts, uriageProducts } from '../data/mockData';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        const apiProducts = res.data.data || res.data;
        if (Array.isArray(apiProducts) && apiProducts.length > 0) {
          setProducts(apiProducts);
        } else {
          // Fallback mockData si API vide
          setProducts([...mockProducts, ...uriageProducts]);
        }
      })
      .catch(() => {
        // Fallback mockData si API down
        setProducts([...mockProducts, ...uriageProducts]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};

export default useProducts;