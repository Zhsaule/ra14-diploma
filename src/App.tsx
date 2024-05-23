import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import Banner from './components/Banner'
import CatalogPage from './pages/CatalogPage'
import AboutPage from './pages/AboutPage'
import ContactsPage from './pages/ContactsPage'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <main className='container'>
        <div className="row">
          <div className="col">
            <Banner />
            <Routes>
              <Route path="/" element={<MainPage/>} />
              <Route path="/catalog" element={ <CatalogPage /> } />
              <Route path="/about" element={ <AboutPage /> } />
              <Route path="/contacts" element={ <ContactsPage /> } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          </div>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
