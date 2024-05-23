import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Catalog from "../components/Catalog";
import Categories from "../components/CatalogCategories";
import CatalogSearch from '../components/CatalogSearch';

const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const baseUrl = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchQuery(q);
  }, [searchParams]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const catalogUrl = `${baseUrl}/items${selectedCategory ? `?categoryId=${selectedCategory}` : ''}${searchQuery ? `${selectedCategory ? '&' : '?'}q=${searchQuery}` : ''}`;

  return (
    <section>
      <h2 className="text-center">Каталог</h2>
      <CatalogSearch onSearch={handleSearch} initialQuery={searchQuery} />
      <Categories onCategorySelect={handleCategorySelect} selectedCategoryId={selectedCategory} />
      <Catalog url={catalogUrl} />
    </section>
  );
}

export default CatalogPage;
