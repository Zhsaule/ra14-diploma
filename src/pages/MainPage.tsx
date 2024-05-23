import { useState } from "react";

import Catalog from "../components/Catalog";
import Categories from "../components/CatalogCategories";

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);  // Инициализация с "Все" как выбранной категорией
  const baseUrl = import.meta.env.VITE_API_URL;

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };
  
  return (
    <section>
      <h2 className="text-center">Хиты продаж!</h2>
      <Catalog url={baseUrl + '/top-sales'} />
      <h2 className="text-center">Каталог</h2>
      <Categories onCategorySelect={handleCategorySelect} selectedCategoryId={selectedCategory} />
      <Catalog url={`${baseUrl}/items${selectedCategory ? `?categoryId=${selectedCategory}` : ''}`} />
    </section>
  );
}

export default MainPage;
