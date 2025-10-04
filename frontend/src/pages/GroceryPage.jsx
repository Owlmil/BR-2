import React, { useState } from "react";
import straw1 from "../phaser/assets/strawberry/strawberry1.png";
import straw2 from "../phaser/assets/strawberry/strawberry2.png";
import straw3 from "../phaser/assets/strawberry/strawberry3.png";
import straw4 from "../phaser/assets/strawberry/strawberry4.png";

import milk1 from "../phaser/assets/milk/milk1.png";
import milk2 from "../phaser/assets/milk/milk2.png";
import milk3 from "../phaser/assets/milk/milk3.png";
import milk4 from "../phaser/assets/milk/milk4.png";

import apple1 from "../phaser/assets/apple/apple1.png";
import apple2 from "../phaser/assets/apple/apple2.jpg";
import apple3 from "../phaser/assets/apple/apple3.jpg";
import apple4 from "../phaser/assets/apple/apple4.jpg";
import bread1 from "../phaser/assets/bread/bread1.jpg";
import bread2 from "../phaser/assets/bread/bread2.jpg";
import bread3 from "../phaser/assets/bread/bread3.jpg";
import bread4 from "../phaser/assets/bread/bread4.jpg";




const GAMES = [
    {
        id: 1,
        word: "DIL¸EḰ",
        images: [straw1, straw2, straw3, straw4],
        options: ["ḴÁMQ", "DIL¸EḰ", "CELENTS", "ȾIWEK"],
    },
    {
        id: 2,
        word: "SḴEMO¸",
        images: [milk1, milk2, milk3, milk4],
        options: ["ḰO¸", "SȾEKEṈ", "SḴEMO¸", "TI"],
    },
    {
        id: 3,
        word: "ÁPELS", // Apple
        images: [apple1, apple2, apple3, apple4],
        options: ["ÁPELS", "AḴEMO¸", "AĆEȻES", "AWEN¸"],
    },
    {
        id: 4,
        word: "SEPLIL", // Bread
        images: [bread1, bread2, bread3, bread4],
        options: ["SḴEMEȻ", "SEPLIL", "SĆÁNEW̱", "QE¸UYȻ"],
    }
];

export default function OceanPage() {
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const currentGame = GAMES[currentIndex];

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        if (option === currentGame.word) {
            setScore((prev) => prev + 10);
            setFeedback("correct");
            setTimeout(() => handleNext(), 1200);
        } else {
            setFeedback("wrong");
            setTimeout(() => {
                setFeedback("");
                setSelectedOption("");
            }, 800);
        }
    };

    const handleNext = () => {
        if (currentIndex < GAMES.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setFeedback("");
            setSelectedOption("");
        } else {
            alert(`🎉 Game Over! Final Score: ${score+10}`);
        }
    };

    const handleSkip = () => handleNext();

    return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-b from-blue-100 to-indigo-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-indigo-700">Match Four Game</h1>
            <p className="text-lg font-semibold text-gray-700 mb-2">Score: {score}</p>
            <p className="text-gray-500 mb-6">
                Round {currentIndex + 1} of {GAMES.length}
            </p>

            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {currentGame.images.map((img, idx) => (
                    <div
                        key={idx}
                        className="w-36 h-36 bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden transform transition hover:scale-105"
                    >
                        <img src={img} alt={`clue ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Feedback */}
            {feedback && (
                <div
                    className={`px-6 py-3 mb-4 rounded-lg text-white font-semibold shadow-lg ${feedback === "correct" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {feedback === "correct"
                        ? `✅ Correct! The word is ${currentGame.word}`
                        : "❌ Try again!"}
                </div>
            )}

            {/* Question */}
            <p className="text-lg font-bold mb-3 text-gray-700">
                What word connects these images?
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3 w-80 mb-6">
                {currentGame.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        disabled={feedback === "correct"}
                        className={`py-3 text-lg font-semibold rounded-lg border-2 transition-all duration-200
              ${selectedOption === option
                                ? feedback === "correct"
                                    ? "bg-green-400 border-green-600 text-white"
                                    : "bg-red-400 border-red-600 text-white"
                                : "bg-white hover:bg-indigo-100 border-gray-300 text-gray-800"
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <button
                onClick={handleSkip}
                disabled={feedback === "correct"}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-semibold transition-all"
            >
                Skip
            </button>
        </div>
    );
}
