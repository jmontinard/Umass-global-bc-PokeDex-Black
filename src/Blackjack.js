import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import './Blackjack.css'; // Import the styling file

const Blackjack = () => {
  const [cards, setCards] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/draw/?count=2'
      );

      const drawnCards = response.data.cards;
      setCards(drawnCards);

      // Calculate total score
      const score = calculateScore(drawnCards);
      setTotalScore(score);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const calculateScore = (drawnCards) => {
    let score = 0;
    drawnCards.forEach((card) => {
      if (['KING', 'QUEEN', 'JACK', '10'].includes(card.value)) {
        score += 10;
      } else if (card.value === 'ACE') {
        score += 11;
      } else {
        score += parseInt(card.value);
      }
    });
    return score;
  };

  const handleDrawCard = () => {
    fetchCards();
  };


  return (
    <div className="blackjack-container">
      <h1>Blackjack App</h1>
      <div className="cards-container">
        {cards.map((card) => (
          <img
            key={card.code}
            src={card.image}
            alt={card.code}
            className="card-image"
          />
        ))}
      </div>
      <p>Total Score: {totalScore}</p>
      {totalScore === 21 && <p>🎉🎉🎉🎉 You have Blackjack! 🎉🎉🎉🎉</p>}
      <Button variant="contained" onClick={handleDrawCard}>
        Draw Card
      </Button>
    </div>
  );
};

export default Blackjack;
