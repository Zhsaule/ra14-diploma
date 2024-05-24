import { createContext, Dispatch, SetStateAction } from 'react';

interface SearchContextType {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType>({
  searchText: '',
  setSearchText: () => {},
});

export default SearchContext;
