import { createContext, Dispatch, SetStateAction } from 'react';

interface SearchContextType {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number>>;
}

const SearchContext = createContext<SearchContextType>({
  searchText: '',
  setSearchText: () => {},
  categoryId: 0,
  setCategoryId: () => {},
});

export default SearchContext;
