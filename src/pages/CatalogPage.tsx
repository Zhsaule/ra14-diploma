import { useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import Catalog from '../components/Catalog';
import Categories from '../components/CatalogCategories';
import CatalogSearch from '../components/CatalogSearch';
import SearchContext from '../contexts/SearchContext';

const CatalogPage = () => {
  const { setSearchText, setCategoryId } = useContext(SearchContext);
  const [searchParams] = useSearchParams();
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchText(q);
    setCategoryId(0);
  }, [searchParams, setSearchText, setCategoryId]);

  return (
    <section>
      <h2 className="text-center">Каталог</h2>
      <CatalogSearch />
      <Categories />
      <Catalog url={`${baseUrl}/items`} />
    </section>
  );
};

export default CatalogPage;
