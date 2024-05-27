import { createContext, useState } from 'react';
import { ProviderProps, SearchContextType } from '../types';

const SearchContext = createContext<SearchContextType>({
  searchText: '',
  setSearchText: () => {},
  categoryId: 0,
  setCategoryId: () => {},
});

export const SearchProvider = ({ children }: ProviderProps) => {
  const [searchText, setSearchText] = useState('');
  const [categoryId, setCategoryId] = useState(0);

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
        categoryId,
        setCategoryId,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
