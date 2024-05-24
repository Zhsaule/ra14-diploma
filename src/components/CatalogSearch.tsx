import { useContext, FormEvent } from 'react';
import SearchContext from '../contexts/SearchContext';

const CatalogSearch = () => {
  const { searchText, setSearchText } = useContext(SearchContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You might need to call some search function here if necessary
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
      <input
        className="form-control"
        placeholder="Поиск"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default CatalogSearch;
