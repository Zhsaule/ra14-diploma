import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

interface Category {
  id: number;
  title: string;
}

interface CategoriesProps {
  onCategorySelect: (categoryId: number) => void;
  selectedCategoryId: number;
}

const Categories = ({ onCategorySelect, selectedCategoryId }: CategoriesProps) => {
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
    <ul className="catalog-categories nav justify-content-center">
      {categories.map(category => (
        <li className='nav-item' key={category.id}>
          <Link to={`#${category.id}`}
               className={`nav-link ${selectedCategoryId === category.id ? 'active' : ''}`}
               style={{ padding: 10 }}
               onClick={() => onCategorySelect(category.id)}>
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
