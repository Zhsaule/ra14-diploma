import {
  useEffect,
  useRef,
  useContext,
  useState,
  FormEvent,
  KeyboardEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';

import SearchContext from '../contexts/SearchContext';

const HeaderSearchPic = () => {
  const { setSearchText } = useContext(SearchContext);
  const [inputText, setInputText] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isHidden) {
      inputRef?.current?.focus();
    }
  }, [isHidden]);

  const performSearch = () => {
    if (inputText.trim()) {
      setSearchText(inputText);
      navigate('/catalog');
      setInputText('');
      setIsHidden(true);
    } else {
      setIsHidden(true); // Скрыть поле ввода, если текст пуст
    }
  };

  const handleSearch = (event?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
    if (event) {
      event.preventDefault();
    }
    performSearch();
  };

  const handleClick = () => {
    if (!isHidden) {
      performSearch();
    } else {
      setIsHidden(false);
    }
  };

  return (
    <>
      <div
        id="search-expander"
        className="header-controls-pic header-controls-search"
        onClick={handleClick}
      />
      <form
        id="search-form"
        className={`header-controls-search-form form-inline ${isHidden ? 'invisible' : ''}`}
        onSubmit={handleSearch}
      >
        <input
          className="form-control"
          placeholder="Поиск"
          ref={inputRef}
          name="search"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch(event);
            }
          }}
        />
      </form>
    </>
  );
};

export default HeaderSearchPic;
