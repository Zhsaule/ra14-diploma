import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface CartContextType {
  cartQuantity: number;
  setCartQuantity: Dispatch<SetStateAction<number>>;
}

export interface SearchContextType {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number>>;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface CartItem {
  id: number;
  title: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Item {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

export interface ItemData {
  id: number;
  title: string;
  description: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  season: string;
  reason: string;
  sizes: { size: string; available: boolean }[];
  price: number;
}

export interface UrlProps {
  url?: string;
}
