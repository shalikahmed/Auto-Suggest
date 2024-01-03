import React, { useEffect, useState } from 'react';
import './SuggestStyles.css';

function AutoSuggest() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [isPlaceholderFocused, setIsPlaceholderFocused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setAllSuggestions(data);
      } catch (error) {
        console.log('Error,', error);
      }
    };

    fetchData();
  }, []);

  const handleInput = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filterSuggestions = allSuggestions.filter((suggestion) =>
      suggestion.title.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filterSuggestions);
  };

  const handlePlaceholderFocus = () => {
    setIsPlaceholderFocused(true);
  };

  const handlePlaceholderBlur = () => {
    setIsPlaceholderFocused(false);
  };

  return (
    <div className='container'>
      <input
        type="text"
        value={inputValue}
        onChange={handleInput}
        placeholder='Search for Products, Brands and more'
        onFocus={handlePlaceholderFocus}
        onBlur={handlePlaceholderBlur}
        className={`search-box ${isPlaceholderFocused ? 'focused' : ''}`}
      />
      <div className='suggestions-box'>
      {isPlaceholderFocused && (
        <ul className='suggestions-ul'>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion.title}</li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

export default AutoSuggest;
