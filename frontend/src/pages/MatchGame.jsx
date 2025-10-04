import { useState, useEffect } from 'react';
import { Check, X, SkipForward, Trophy } from 'lucide-react';

// Mock data - replace with API calls
const MOCK_GAMES = [
  {
    id: 1,
    word: 'OCEAN',
    images: [
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      'https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=400',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400'
    ]
  },
  {
    id: 2,
    word: 'MUSIC',
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400',
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
    ]
  },
  {
    id: 3,
    word: 'COFFEE',
    images: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'
    ]
  }
];

export default function MatchFourGame() {
  const [games, setGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Replace with actual API call: fetch('/api/games')
    setGames(MOCK_GAMES);
  }, []);

  const currentGame = games[currentIndex];

  const handleSubmit = () => {
    if (!guess.trim()) return;

    setAttempts(attempts + 1);
    const isCorrect = guess.toUpperCase() === currentGame.word;

    if (isCorrect) {
      setScore(score + 10);
      setFeedback('correct');
      setTimeout(() => {
        handleNext();
      }, 1500);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 1000);
    }

    setGuess('');
  };

  const handleNext = () => {
    if (currentIndex < games.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFeedback(null);
      setGuess('');
    } else {
      setGameOver(true);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setAttempts(0);
    setFeedback(null);
    setGameOver(false);
    setGuess('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!currentGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Complete!</h2>
          <div className="space-y-2 mb-6">
            <p className="text-xl text-gray-700">Final Score: <span className="font-bold text-purple-600">{score}</span></p>
            <p className="text-lg text-gray-600">Total Attempts: {attempts}</p>
            <p className="text-lg text-gray-600">Accuracy: {attempts > 0 ? ((score / (attempts * 10)) * 100).toFixed(1) : 0}%</p>
          </div>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Match Four</h1>
              <p className="text-gray-600">Guess the word from the images</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Score</div>
              <div className="text-3xl font-bold text-purple-600">{score}</div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Round {currentIndex + 1} of {games.length}
            </div>
            <div className="text-sm text-gray-600">
              Attempts: {attempts}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            {currentGame.images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                <img
                  src={img}
                  alt={`Clue ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What word connects these images?
              </label>
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg uppercase"
                placeholder="Enter your guess..."
                disabled={feedback === 'correct'}
              />
            </div>

            {feedback && (
              <div className={`flex items-center justify-center gap-2 p-4 rounded-lg ${
                feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {feedback === 'correct' ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span className="font-semibold">Correct! The word is {currentGame.word}</span>
                  </>
                ) : (
                  <>
                    <X className="w-6 h-6" />
                    <span className="font-semibold">Try again!</span>
                  </>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={feedback === 'correct'}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Guess
              </button>
              <button
                onClick={handleSkip}
                disabled={feedback === 'correct'}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <SkipForward className="w-5 h-5" />
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}