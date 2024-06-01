import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import ClickableChart from './components/ClickableChart';
import './App.css';
import { toRomaji } from 'wanakana';

const App = () => {
  const [characterInput, setCharacterInput] = useState('');
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const resultsRef = useRef(null);

  const fetchCharacters = useCallback(async (character) => {
    try {
      const response = await axios.get(`http://localhost:5001/search_characters?character=${encodeURIComponent(character)}`);
      const dataWithRomaji = response.data.map((character) => ({
        ...character,
        romaji: toRomaji(character.jap_name),
      }));
      setCharacters(dataWithRomaji);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  }, []);

  const handleCharacterSelect = (character) => {
    setCharacterInput(character);
    setSelectedCharacter(character);
  };

  useEffect(() => {
    if (selectedCharacter) {
      fetchCharacters(selectedCharacter);
    }
  }, [selectedCharacter, fetchCharacters]);

  useEffect(() => {
    if (characters.length > 0 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Adjust the delay as needed
    }
  }, [characters]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchCharacters(characterInput);
  };

  return (
    <div className="app-container">
      <h1>Character Learner</h1>
      <form onSubmit={handleFormSubmit} className="search-form">
        <label htmlFor="character">Select or Enter Character</label>
        <input
          type="text"
          id="character"
          value={characterInput}
          onChange={(e) => setCharacterInput(e.target.value)}
          required
        />
        <button type="submit">Search Character</button>
      </form>
      <ClickableChart onCharacterSelect={handleCharacterSelect} />
      <div ref={resultsRef} id="results">
        {characters.length > 0 && <h2>{selectedCharacter} Matching Characters (pun unintended)</h2>}
        {characters.map(character => (
          <div key={character.id}>
            <h2>{character.name}</h2>
            <p>Japanese Name: {character.jap_name}</p>
            <p>Romaji Name: {character.romaji}</p>
            <img src={character.img_url} alt={character.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
