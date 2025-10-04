import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import canoe from "../phaser/assets/canoe.png";
import finish from "../phaser/assets/finish.png";
import river from "../phaser/assets/river.png";

export default function CanoeRaceGame() {
  const gameRef = useRef(null);
  const gameInstanceRef = useRef(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [teamTurn, setTeamTurn] = useState("A");
  const [scores, setScores] = useState({ A: 0, B: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Phaser sprite refs
  const teamACanoeRef = useRef(null);
  const teamBCanoeRef = useRef(null);

  // Fetch question and generate options
  const fetchQuestion = async () => {
  try {
    const res = await fetch("http://localhost:5000/words");
    const allWords = await res.json();
    if (!allWords.length) return;

    // Filter words that have the 'ocean' tag
    const oceanWords = allWords.filter(word => word.category?.includes("Ocean"));
    if (!oceanWords.length) return;

    // Pick a random ocean-related word
    const questionWord = oceanWords[Math.floor(Math.random() * oceanWords.length)];

    // Pick 3 random SENĆOŦEN words as distractors (exclude the correct one)
    let distractors = [];
    const filtered = allWords.filter(w => w.sen_word !== questionWord.sen_word);
    while (distractors.length < 3 && filtered.length > 0) {
      const idx = Math.floor(Math.random() * filtered.length);
      distractors.push(filtered[idx].sen_word);
      filtered.splice(idx, 1);
    }

    const options = [questionWord.sen_word, ...distractors].sort(() => Math.random() - 0.5);
    setCurrentQ({ ...questionWord, options });
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    fetchQuestion();
  }, []);

  // Initialize Phaser
  useEffect(() => {
    if (!gameRef.current || gameInstanceRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = {
      preload: function () {
        this.load.image("river", river);
        this.load.image("canoeA", canoe);
        this.load.image("canoeB", canoe);
        this.load.image("finish", finish);
      },
      create: function () {
        this.add.image(width / 2, height / 2, "river").setDisplaySize(width, height);
        teamACanoeRef.current = this.add.sprite(width * 0.05, height * 0.3, "canoeA").setScale(0.15);
        teamBCanoeRef.current = this.add.sprite(width * 0.05, height * 0.6, "canoeB").setScale(0.15);
        this.add.image(width * 0.9, height / 2, "finish").setScale(0.25);
      },
    };

    const config = {
      type: Phaser.AUTO,
      width,
      height,
      parent: gameRef.current,
      physics: { default: "arcade", arcade: { gravity: { y: 0 } } },
      scene,
    };

    gameInstanceRef.current = new Phaser.Game(config);

    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
  }, [gameRef.current]);

  // Move canoe with animation
  const moveCanoe = (team) => {
    const step = window.innerWidth * 0.15;
    const finishX = window.innerWidth * 0.9;
    const target = team === "A" ? teamACanoeRef.current : teamBCanoeRef.current;

    if (!target) return;

    const startX = target.x;
    const endX = Math.min(target.x + step, finishX);
    const duration = 500;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      target.x = startX + (endX - startX) * progress;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (endX >= finishX) {
        setWinner(team);
        setGameOver(true);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleAnswer = async (team, isCorrect) => {
    if (gameOver) return;
    if (isCorrect) {
      moveCanoe(team);
      setScores(prev => ({ ...prev, [team]: prev[team] + 1 }));
    }
    setTeamTurn(team === "A" ? "B" : "A");
    await fetchQuestion();
  };

  const restartGame = () => {
    setScores({ A: 0, B: 0 });
    setTeamTurn("A");
    setGameOver(false);
    setWinner(null);
    // Reset canoes to start
    if (teamACanoeRef.current) teamACanoeRef.current.x = window.innerWidth * 0.05;
    if (teamBCanoeRef.current) teamBCanoeRef.current.x = window.innerWidth * 0.05;
  };

  if (!currentQ) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div ref={gameRef} className="w-full h-full" />

      {/* Question Panel */}
      {!gameOver && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-blue-100/70 rounded max-w-3xl w-[90%]">
          <h2 className="font-bold text-lg mb-2 text-center">Question for Team {teamTurn} 📝</h2>
          <p className="mb-2 text-center">
            What is the SENĆOŦEN word for <strong>{currentQ.english_meaning}</strong>?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(teamTurn, opt === currentQ.sen_word)}
                className="px-3 py-2 bg-green-400 text-white rounded hover:bg-green-500"
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="mt-2 text-center">Scores - Team A: {scores.A} | Team B: {scores.B}</p>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-4">🎉 Team {winner} Wins! 🎉</h1>
          <p className="text-xl mb-6">Final Scores - Team A: {scores.A} | Team B: {scores.B}</p>
          <button
            onClick={restartGame}
            className="px-6 py-3 bg-green-500 rounded hover:bg-green-600 text-lg font-bold"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}
