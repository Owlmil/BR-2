import LandmarkPage from "./LandmarkPage";
import React from "react";
import { useState } from 'react';

import straw1 from '../phaser/assets/strawberry/strawberry1.png';
import straw2 from '../phaser/assets/strawberry/strawberry2.png';
import straw3 from '../phaser/assets/strawberry/strawberry3.png';
import straw4 from '../phaser/assets/strawberry/strawberry4.png';

import milk1 from '../phaser/assets/milk/milk1.png';
import milk2 from '../phaser/assets/milk/milk2.png';
import milk3 from '../phaser/assets/milk/milk3.png';
import milk4 from '../phaser/assets/milk/milk4.png';

const GAMES = [
  {
    id: 1,
    word: 'DIL¸EḰ',
    images: [straw1, straw2, straw3, straw4],
    options: ['	ḴÁMQ', 'DIL¸EḰ', 'CELENTS', '	ȾIWEK']
  },
  {
    id: 2,
    word: 'SḴEMO¸',
    images: [milk1, milk2, milk3, milk4],
    options: ['ḰO¸', 'SȾEKEṈ', 'SḴEMO¸', 'TI']
  }
];

export default function OceanPage() {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  
  const currentGame = GAMES[currentIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    
    if (option === currentGame.word) {
      setScore(score + 10);
      setFeedback('correct');
      
      setTimeout(() => {
        handleNext();
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback('');
        setSelectedOption('');
      }, 1000);
    }
  };

  const handleNext = () => {
    if (currentIndex < GAMES.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFeedback('');
      setSelectedOption('');
    } else {
      alert(`Game Over! Final Score: ${score}`);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
        Match Four Game
      </h1>
      <p style={{ marginBottom: '10px' }}>Score: {score}</p>
      <p style={{ marginBottom: '20px', color: 'gray' }}>
        Round {currentIndex + 1} of {GAMES.length}
      </p>
      
      {/* Image Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        {currentGame.images.map((img, idx) => (
          <div key={idx} style={{ width: '150px', height: '150px', border: '2px solid gray' }}>
            <img src={img} alt={`Clue ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Feedback Message */}
      {feedback && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '10px',
          backgroundColor: feedback === 'correct' ? 'lightgreen' : 'lightcoral',
          borderRadius: '4px'
        }}>
          {feedback === 'correct' ? `✓ Correct! The word is ${currentGame.word}` : '✗ Try again!'}
        </div>
      )}

      <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>What word connects these images?</p>

      {/* Multiple Choice Options */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {currentGame.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={feedback === 'correct'}
            style={{
              padding: '15px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: '2px solid black',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: selectedOption === option 
                ? (feedback === 'correct' ? 'lightgreen' : 'lightcoral')
                : 'white',
              opacity: feedback === 'correct' ? 0.7 : 1
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <button 
        onClick={handleSkip}
        disabled={feedback === 'correct'}
        style={{ 
          backgroundColor: 'gray', 
          color: 'white', 
          padding: '8px 16px', 
          cursor: 'pointer',
          opacity: feedback === 'correct' ? 0.5 : 1
        }}
      >
        Skip
      </button>
    </div>
  );
}

// export default function OceanPage() {
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [attempts, setAttempts] = useState(0);
  
//   const currentGame = GAMES[currentIndex];

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setAttempts(attempts + 1);
    
//     if (option === currentGame.word) {
//       setScore(score + 10);
//       setFeedback('correct');
      
//       setTimeout(() => {
//         handleNext();
//       }, 1500);
//     } else {
//       setFeedback('wrong');
//       setTimeout(() => {
//         setFeedback('');
//         setSelectedOption('');
//       }, 1000);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < GAMES.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//       setFeedback('');
//       setSelectedOption('');
//     } else {
//       alert(`Game Over! Final Score: ${score}`);
//     }
//   };

//   const handleSkip = () => {
//     handleNext();
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
//         Match Four Game
//       </h1>
//       <p style={{ marginBottom: '10px' }}>Score: {score}</p>
//       <p style={{ marginBottom: '20px', color: 'gray' }}>
//         Round {currentIndex + 1} of {GAMES.length} | Attempts: {attempts}
//       </p>
      
//       {/* Image Grid */}
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
//         {currentGame.images.map((img, idx) => (
//           <div key={idx} style={{ width: '150px', height: '150px', border: '2px solid gray' }}>
//             <img src={img} alt={`Clue ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//           </div>
//         ))}
//       </div>

//       {/* Feedback Message */}
//       {feedback && (
//         <div style={{ 
//           padding: '10px', 
//           marginBottom: '10px',
//           backgroundColor: feedback === 'correct' ? 'lightgreen' : 'lightcoral',
//           borderRadius: '4px'
//         }}>
//           {feedback === 'correct' ? `✓ Correct! The word is ${currentGame.word}` : '✗ Try again!'}
//         </div>
//       )}

//       <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>What word connects these images?</p>

//       {/* Multiple Choice Options */}
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
//         {currentGame.options.map((option) => (
//           <button
//             key={option}
//             onClick={() => handleOptionClick(option)}
//             disabled={feedback === 'correct'}
//             style={{
//               padding: '15px',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               border: '2px solid black',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               backgroundColor: selectedOption === option 
//                 ? (feedback === 'correct' ? 'lightgreen' : 'lightcoral')
//                 : 'white',
//               opacity: feedback === 'correct' ? 0.7 : 1
//             }}
//           >
//             {option}
//           </button>
//         ))}
//       </div>

//       <button 
//         onClick={handleSkip}
//         disabled={feedback === 'correct'}
//         style={{ 
//           backgroundColor: 'gray', 
//           color: 'white', 
//           padding: '8px 16px', 
//           cursor: 'pointer',
//           opacity: feedback === 'correct' ? 0.5 : 1
//         }}
//       >
//         Skip
//       </button>
//     </div>
//   );
// }