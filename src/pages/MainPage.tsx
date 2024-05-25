import { useContext, useEffect } from 'react';
import Catalog from '../components/Catalog';
import Categories from '../components/CatalogCategories';
import SearchContext from '../contexts/SearchContext';

const MainPage = () => {
  const { setCategoryId } = useContext(SearchContext);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setCategoryId(0); // Сбросить выбранную категорию при загрузке главной страницы
  }, [setCategoryId]);

  return (
    <section>
      <h2 className='text-center'>Хиты продаж!</h2>
      <Catalog url={`${baseUrl}/top-sales`} />
      <h2 className='text-center'>Каталог</h2>
      <Categories />
      <Catalog/>
    </section>
  );
};

export default MainPage;
