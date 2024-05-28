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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHidden) {
      inputRef?.current?.focus();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsHidden(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isHidden]);

  const performSearch = () => {
    if (inputText.trim()) {
      setSearchText(inputText);
      navigate('/catalog');
      setInputText('');
    }
    setIsHidden(true);
  };

  const handleSearch = (event?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
    if (event) {
      event.preventDefault();
    }
    performSearch();
  };

  const handleClick = () => {
    if (!isHidden && inputText.trim()) {
      performSearch();
    } else {
      setIsHidden((prevIsHidden) => !prevIsHidden);
    }
  };

  return (
    <div ref={containerRef}>
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
    </div>
  );
};

export default HeaderSearchPic;
