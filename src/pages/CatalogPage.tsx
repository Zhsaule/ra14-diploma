import { useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import Catalog from '../components/Catalog';
import CatalogCategories from '../components/CatalogCategories';
import CatalogSearch from '../components/CatalogSearch';

import SearchContext from '../contexts/SearchContext';

const CatalogPage = () => {
  const { setSearchText, setCategoryId } = useContext(SearchContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    if (q !== null) {
      setSearchText(q);
    }
    if (category !== null) {
      setCategoryId(Number(category));
    }
  }, [searchParams, setSearchText, setCategoryId]);

  return (
    <section>
      <h2 className="text-center">Каталог</h2>
      <CatalogSearch />
      <CatalogCategories />
      <Catalog />
    </section>
  );
};

export default CatalogPage;
