import {
  useState,
  useEffect,
  useCallback,
  useContext,
  SyntheticEvent,
} from 'react';
import { Link } from 'react-router-dom';

import SearchContext from '../contexts/SearchContext';
import { Item, UrlProps } from '../types';

import err404 from '../img/404.png';

const Catalog = ({ url }: UrlProps) => {
  const { searchText, categoryId } = useContext(SearchContext);
  const [items, setItems] = useState<Item[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchData = useCallback(async (newOffset = 0) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        offset: newOffset.toString(),
        q: searchText,
      });
      if (categoryId) {
        params.append('categoryId', categoryId.toString());
      }

      const fetchUrl = url ? `${url}?${params.toString()}` : `${baseUrl}/items?${params.toString()}`;

      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Item[] = await response.json();
      if (data.length < 6) {
        setHasMore(false);
      }
      setItems((prevItems) => (newOffset === 0 ? data : [...prevItems, ...data]));
      setOffset(newOffset);
    } catch (err) {
      // setError('Ошибка при загрузке данных. Попробуйте еще раз.');
      setError(`${err}. Ошибка при загрузке данных о товаре. Попробуйте еще раз.`);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, searchText, categoryId, url]);

  useEffect(() => {
    setItems([]);
    setOffset(0);
    setHasMore(true);
    fetchData(0);
  }, [baseUrl, searchText, categoryId, fetchData]);

  const handleLoadMore = () => {
    fetchData(offset + 6);
  };

  const handleRetry = () => {
    fetchData(offset); // Повторная попытка с текущим смещением
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.currentTarget;
    target.src = err404;
  };

  return (
    <>
      <div className='row'>
        {items.length === 0 && !loading && !error && (
          <div className='col-12'>
            <p className='text-center'>Товары не найдены</p>
          </div>
        )}
        {items.map((item) => (
          <div className='col-4' key={item.id}>
            <div className='card catalog-item-card'>
              <img
                className='card-img-top img-fluid'
                src={item.images[0]}
                alt={item.title}
                onError={handleImageError}
              />
              <div className='card-body'>
                <p className='card-text'>{item.title}</p>
                <p className='card-text'>{item.price}₽</p>
                <Link to={`/product/${item.id}`} className='btn btn-outline-primary'>Заказать</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <div>Загрузка каталога...</div>}
      {error && (
        <div className="alert alert-danger">
          {error}
          <button className='btn btn-outline-primary' onClick={handleRetry}>Повторить</button>
        </div>
      )}
      {hasMore && !loading && items.length > 0 && (
        <div className='text-center'>
          <button className='btn btn-outline-primary' onClick={handleLoadMore}>Загрузить еще</button>
        </div>
      )}
    </>
  );
};

export default Catalog;
