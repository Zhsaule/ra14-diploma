import {
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SearchContext from '../contexts/SearchContext';

interface Category {
  id: number;
  title: string;
}

const CatalogCategories = () => {
  const { categoryId, setCategoryId } = useContext(SearchContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/categories`);
      const data: Category[] = await response.json();
      setCategories([{ id: 0, title: 'Все' }, ...data]);
    } catch (err) {
      setError('Ошибка при загрузке категорий. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleClick = (id: number) => {
    setCategoryId(id);
    navigate(`/catalog?category=${id}`);
  };

  const handleRetry = () => {
    fetchCategories(); // Повторная попытка загрузки категорий
  };

  return (
    <>
      {loading && <div>Загрузка категорий...</div>}
      {error && (
        <div className="alert alert-danger">
          {error}
          <button className='btn btn-outline-primary' onClick={handleRetry}>Повторить</button>
        </div>
      )}
      {!loading && !error && (
        <ul className='catalog-categories nav justify-content-center'>
          {categories.map((category) => (
            <li className='nav-item' key={category.id}>
              <Link
                to=""
                className={`nav-link ${categoryId === category.id ? 'active' : ''}`}
                onClick={() => handleClick(category.id)}
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CatalogCategories;
