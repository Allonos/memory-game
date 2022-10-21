import { useEffect, useState } from 'react';
import './App.css';

// cover image
import coverImg from './assets/pexels-jonathan-formento-4337198.jpg';

// Card images

import image_1 from './assets/pexels-faik-akmd-1025469.jpg';
import image_2 from './assets/pexels-roberto-nickson-2478248.jpg';
import image_3 from './assets/pexels-sean-patrick-1057663.jpg';
import image_4 from './assets/pexels-skinny-alien-2318554.jpg';
import image_5 from './assets/pexels-valdemaras-d-1647962.jpg';
import image_6 from './assets/pexels-trace-hudson-2529973.jpg';
import SingleCard from './components/SingleCard';

const cardImages = [
  { 'url': image_1, matched: false },
  { 'url': image_2, matched: false },
  { 'url': image_3, matched: false },
  { 'url': image_4, matched: false },
  { 'url': image_5, matched: false },
  { 'url': image_6, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  console.log('hi')


  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstChoice(null)
    setSecondChoice(null)
    setCards(shuffledCards);
    setTurns(0);
  }

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  }

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.url === secondChoice.url) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.url === firstChoice.url) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice])

  const resetTurn = () => {
    setSecondChoice(null)
    setFirstChoice(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false);
  }

  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            coverImg={coverImg}
            handleChoice={handleChoice}
            flipped={card === firstChoice || card === secondChoice || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
