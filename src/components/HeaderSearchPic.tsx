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
      setIsHidden(true);
    }
  };

  const handleClick = () => {
    if (!isHidden) {
      performSearch();
    } else {
      setIsHidden(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // предотвращаем отправку формы по Enter
      performSearch();
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
        onSubmit={handleSubmit}
      >
        <input
          className="form-control"
          placeholder="Поиск"
          ref={inputRef}
          name="search"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </>
  );
};

export default HeaderSearchPic;
