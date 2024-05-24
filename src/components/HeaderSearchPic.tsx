import {
  useEffect,
  useRef,
  useState,
  FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderSearchPic = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isHidden) {
      inputRef?.current?.focus();
    }
  }, [isHidden]);

  const handleClick = () => {
    if (!isHidden && searchText.trim()) {
      navigate(`/catalog?q=${searchText.trim()}`);
      setSearchText('');
      setIsHidden(true);
    } else {
      setIsHidden(!isHidden);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText.trim() === '') {
      setIsHidden(true);
    } else { // start search
      navigate(`/catalog?q=${searchText.trim()}`);
      setSearchText('');
      setIsHidden(true);
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter' && searchText.trim()) {
              navigate(`/catalog?q=${searchText.trim()}`);
              setSearchText('');
              setIsHidden(true);
            }
          }}
        />
      </form>
    </>
  );
};

export default HeaderSearchPic;
