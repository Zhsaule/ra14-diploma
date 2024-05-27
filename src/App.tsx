import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import { SearchProvider } from './contexts/SearchContext';
import { CartProvider } from './contexts/CartContext';

import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import Banner from './components/Banner';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <main className='container'>
            <div className="row">
              <div className="col">
                <Banner />
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contacts" element={<ContactsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
            </div>
          </main>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  );
}

export default App;
