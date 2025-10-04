// import LandmarkPage from "./LandmarkPage";
// import React from "react";

// export default function OceanPage() {
//   return (
//     <LandmarkPage
//       title="Brentwood Bay"
//       emoji="🌊"
//       description="The sparkling ocean where you can kayak, explore marine life, or just relax by the shore."
//       image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
//     />
//   );
// }

// 
import { useState } from 'react';
import straw1 from '../phaser/assets/strawberry/strawberry1.png';
import straw2 from '../phaser/assets/strawberry/strawberry2.png';
import straw3 from '../phaser/assets/strawberry/strawberry3.png';
import straw4 from '../phaser/assets/strawberry/strawberry4.png';

const GAMES = [
  {
    id: 1,
    word: 'STRAWBERRY',
    images: [straw1, straw2, straw3, straw4] // Use the actual imports, not strings!
  }
];

export default function OceanPage() {
  const [guess, setGuess] = useState('');
  const currentGame = GAMES[0];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Match Four Game
      </h1>
      
      {/* Image Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        {currentGame.images.map((img, idx) => (
          <div key={idx} style={{ width: '150px', height: '150px', border: '2px solid gray' }}>
            <img src={img} alt={`Clue ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Your guess..."
        style={{ border: '2px solid black', padding: '8px', marginRight: '8px' }}
      />
      
      <button 
        onClick={() => alert(guess.toUpperCase() === currentGame.word ? 'Correct!' : 'Wrong!')}
        style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px' }}
      >
        Submit
      </button>
    </div>
  );
}