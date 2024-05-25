import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchContext from '../contexts/SearchContext';

interface Category {
  id: number;
  title: string;
}

const Categories = () => {
  const { categoryId, setCategoryId } = useContext(SearchContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseUrl}/categories`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Category[] = await response.json();
        setCategories([{ id: 0, title: 'Все' }, ...data]);
      } catch (error) {
        console.error('There was a problem with fetch operation:', error);
      }
    };

    fetchCategories();
  }, [baseUrl]);

  return (
    <ul className='catalog-categories nav justify-content-center'>
      {categories.map((category) => (
        <li className='nav-item' key={category.id}>
          <Link
            to={''}
            className={`nav-link ${categoryId === category.id ? 'active' : ''}`}
            onClick={() => setCategoryId(category.id)}
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
