import { createContext, Dispatch, SetStateAction } from 'react';

interface SearchContextType {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number>>;
  cartQuantity: number;
  setCartQuantity: Dispatch<SetStateAction<number>>;

}

const SearchContext = createContext<SearchContextType>({
  searchText: '',
  setSearchText: () => {},
  categoryId: 0,
  setCategoryId: () => {},
  cartQuantity: 0,
  setCartQuantity: () => {},
});

export default SearchContext;
