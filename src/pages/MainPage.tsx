import { useContext, useEffect } from 'react';

import Catalog from '../components/Catalog';
import CatalogCategories from '../components/CatalogCategories';

import SearchContext from '../contexts/SearchContext';

const MainPage = () => {
  const { setSearchText, setCategoryId } = useContext(SearchContext);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setCategoryId(0); // Сбросить выбранную категорию при загрузке главной страницы
    setSearchText(''); // Сбросить текст поиска при загрузке главной страницы
  }, [setCategoryId, setSearchText]);

  return (
    <section>
      <h2 className='text-center'>Хиты продаж!</h2>
      <Catalog url={`${baseUrl}/top-sales`} />
      <h2 className='text-center'>Каталог</h2>
      <CatalogCategories />
      <Catalog/>
    </section>
  );
};

export default MainPage;
