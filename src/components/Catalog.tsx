import {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';

import SearchContext from '../contexts/SearchContext';

interface Item {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

const Catalog = () => {
  const { searchText } = useContext(SearchContext);
  const { categoryId } = useContext(SearchContext);
  const [items, setItems] = useState<Item[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchData = useCallback(async (newOffset = 0) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        offset: newOffset.toString(),
        q: searchText,
      });
      if (categoryId) {
        params.append('categoryId', categoryId.toString());
      }

      const response = await fetch(`${baseUrl}/items?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Item[] = await response.json();
      if (data.length < 6) {
        setHasMore(false);
      }
      setItems((prevItems) => {
        if (newOffset === 0) {
          return data;
        }
        return [...prevItems, ...data];
      });
      setOffset(newOffset);
    } catch (error) {
      console.error('There was a problem with fetch operation:', error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, searchText, categoryId]);

  useEffect(() => {
    setItems([]);
    setOffset(0);
    setHasMore(true);
    fetchData(0);
  }, [baseUrl, searchText, categoryId, fetchData]);

  const handleLoadMore = () => {
    fetchData(offset + 6);
  };

  return (
    <>
      <div className='row'>
        {items.map((item) => (
          <div className='col-4' key={item.id}>
            <div className='card catalog-item-card'>
              <img className='card-img-top img-fluid' src={item.images[0]} alt={item.title} />
              <div className='card-body'>
                <p className='card-text'>{item.title}</p>
                <p className='card-text'>{item.price}₽</p>
                <a href="/catalog" className='btn btn-outline-primary'>Заказать</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {hasMore && !loading && (
        <div className='text-center'>
          <button className='btn btn-outline-primary' onClick={handleLoadMore}>Загрузить еще</button>
        </div>
      )}
    </>
  );
};

export default Catalog;
