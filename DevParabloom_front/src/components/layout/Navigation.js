/* src/components/layout/Navigation.jsx */
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/mockData';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      {categories.map(cat => (
        <button
          key={cat.key}
          className="nav-link"
          onClick={() => navigate(`/search?category=${cat.key}`)}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;