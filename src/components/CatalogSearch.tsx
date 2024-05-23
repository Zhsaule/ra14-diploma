import { useState, useEffect } from 'react';

interface CatalogSearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const CatalogSearch = ({ onSearch, initialQuery = '' }: CatalogSearchProps) => {
  const [searchText, setSearchText] = useState(initialQuery);

  useEffect(() => {
    setSearchText(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchText);
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
