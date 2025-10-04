import React, { useState, useEffect } from "react";
import forestImg from "../phaser/assets/forest.png";

const GRID_SIZE = 9;

const WORD_MEANINGS = {
    BISEJ: "pinecone",
    "DIL¸EḰ": "strawberry",
    IST: "deer",
    JESḴEN: "raven",
    KAKU: "bear",
    "QESḴEḴ": "robin",
    TENEḴSEN: "hummingbird",
    "X̱I¸LEM": "rope (forest vines/uses)",
};

// Utility to generate the grid
function generateGrid(words, size) {
    let grid = Array.from({ length: size }, () => Array(size).fill(null));
    const directions = [
        { dr: 0, dc: 1 },
        { dr: 1, dc: 0 },
        { dr: 1, dc: 1 },
        { dr: 1, dc: -1 },
    ];

    for (const word of words) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 100) {
            attempts++;
            const dir = directions[Math.floor(Math.random() * directions.length)];
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);

            let canPlace = true;
            const path = [];
            for (let i = 0; i < word.length; i++) {
                const r = row + i * dir.dr;
                const c = col + i * dir.dc;
                if (r < 0 || r >= size || c < 0 || c >= size) {
                    canPlace = false;
                    break;
                }
                if (grid[r][c] !== null && grid[r][c] !== word[i]) {
                    canPlace = false;
                    break;
                }
                path.push({ r, c, char: word[i] });
            }

            if (canPlace) {
                path.forEach((p) => (grid[p.r][p.c] = p.char));
                placed = true;
            }
        }
    }

    // Fill remaining with random letters
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c] === null) {
                grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }
    return grid;
}

export default function WordSearch() {
    const [WORDS, setWORDS] = useState([]);
    const [WORD_MEANINGS_STATE, setWORD_MEANINGS_STATE] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [foundPaths, setFoundPaths] = useState([]);
    const [grid, setGrid] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [startCell, setStartCell] = useState(null);
    const [currentSelection, setCurrentSelection] = useState([]);
    const [lastFoundWord, setLastFoundWord] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    // Fetch Forest words from backend
    const fetchWords = async () => {
        try {
            const res = await fetch("http://localhost:5000/words");
            if (!res.ok) throw new Error("Failed to fetch Forest words");

            const data = await res.json();
            if (!data || data.length === 0) throw new Error("No forest words found");

            const forestwords = data.filter(word => word.category?.includes("Forest"));
            if (forestwords.length === 0) throw new Error("No Forest words available");

            // Pick 5 random words
            const shuffled = forestwords.sort(() => Math.random() - 0.5);
            const randomFive = shuffled.slice(0, 5);
            const words = randomFive.map(w => w.sen_word);
            const wordMeanings = randomFive.map(w => w.english_meaning || "Unknown");

            setWORDS(words);
            setWORD_MEANINGS_STATE(wordMeanings);
            setFoundWords([]);
            setFoundPaths([]);
            setLastFoundWord(null);
            setGameOver(false);
            setGrid(generateGrid(words, GRID_SIZE));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchWords();
    }, []);

    const getSelectedCells = (start, end) => {
        if (!start || !end) return [];
        const cells = [];
        const dr = Math.sign(end.row - start.row);
        const dc = Math.sign(end.col - start.col);
        if (
            start.row !== end.row &&
            start.col !== end.col &&
            Math.abs(end.row - start.row) !== Math.abs(end.col - start.col)
        )
            return [];
        let r = start.row, c = start.col;
        while (true) {
            cells.push(`${r},${c}`);
            if (r === end.row && c === end.col) break;
            r += dr;
            c += dc;
        }
        return cells;
    };

    const handleMouseDown = (row, col) => {
        setIsDragging(true);
        setStartCell({ row, col });
        setCurrentSelection([`${row},${col}`]);
    };

    const handleMouseEnter = (row, col) => {
        if (isDragging && startCell) {
            setCurrentSelection(getSelectedCells(startCell, { row, col }));
        }
    };

    const handleMouseUp = () => {
        if (!isDragging || currentSelection.length < 2) {
            setIsDragging(false);
            setStartCell(null);
            setCurrentSelection([]);
            return;
        }

        const selectedWord = currentSelection
            .map(key => {
                const [r, c] = key.split(",").map(Number);
                return grid[r][c];
            })
            .join("");
        const reversed = selectedWord.split("").reverse().join("");
        const matched =
            WORDS.includes(selectedWord) || WORDS.includes(reversed)
                ? selectedWord
                : null;

        if (matched && !foundWords.includes(matched)) {
            const updatedFound = [...foundWords, matched];
            setFoundWords(updatedFound);
            setFoundPaths([...foundPaths, ...currentSelection]);
            setLastFoundWord(matched);

            if (updatedFound.length === WORDS.length) {
                setGameOver(true);
            }
        }

        setIsDragging(false);
        setStartCell(null);
        setCurrentSelection([]);
    };

    if (!WORDS.length)
        return (
            <div className="w-screen h-screen flex items-center justify-center text-xl font-medium">
                Loading Forest words...
            </div>
        );

    return (
        <div
            className="w-screen h-screen bg-cover bg-center flex items-center justify-center relative overflow-hidden"
            style={{ backgroundImage: `url(${forestImg})` }}
        >
            {/* Main Game Container */}
            <div className="bg-white/95 rounded-3xl shadow-2xl w-[85vw] h-[85vh] flex flex-col items-center p-6 relative overflow-hidden border-0">
                <h1 className="text-4xl font-extrabold mb-2 text-gray-800 text-center">
                    Word Search
                </h1>
                <p className="text-gray-600 text-center text-lg mb-4">
                    Escape from the forest by finding all the hidden words!
                </p>

                <div className="flex justify-center items-center gap-6 w-full mt-2">
                    {/* Left Word List */}
                    <div className="grid gap-4 w-28">
                        {WORDS.slice(0, Math.ceil(WORDS.length / 2)).map(word => (
                            <div
                                key={word}
                                className={`text-center font-semibold text-sm py-2 px-3 rounded-md border border-gray-200 shadow-sm transition-all ${
                                    foundWords.includes(word)
                                        ? "text-gray-400 line-through bg-gray-50"
                                        : "text-gray-800 bg-white"
                                }`}
                            >
                                {word}
                            </div>
                        ))}
                    </div>

                    {/* Grid */}
                    <div
                        className="grid bg-[#83aea9] rounded-xl shadow-md p-3 select-none"
                        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 2.5rem)` }}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {grid.map((rowArr, rowIdx) =>
                            rowArr.map((letter, colIdx) => {
                                const key = `${rowIdx},${colIdx}`;
                                const isFound = foundPaths.includes(key);
                                const isSelected = currentSelection.includes(key);

                                return (
                                    <div
                                        key={key}
                                        onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                                        onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                                        className={`w-10 h-10 flex items-center justify-center font-bold rounded-md border text-lg cursor-pointer transition-all
                                            ${isFound
                                                ? "bg-[#2c3e50] text-white border-[#2c3e50]"
                                                : isSelected
                                                    ? "bg-[#65c489] text-white border-[#65c489] shadow-md"
                                                    : "bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-100"
                                            }`}
                                    >
                                        {letter}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Right Word List */}
                    <div className="grid gap-4 w-28">
                        {WORDS.slice(Math.ceil(WORDS.length / 2)).map(word => (
                            <div
                                key={word}
                                className={`text-center font-semibold text-sm py-2 px-3 rounded-md border border-gray-200 shadow-sm transition-all ${
                                    foundWords.includes(word)
                                        ? "text-gray-400 line-through bg-gray-50"
                                        : "text-gray-800 bg-white"
                                }`}
                            >
                                {word}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Found Word Popup */}
            {lastFoundWord && !gameOver && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            You found it!
                        </h2>
                        <p className="text-2xl font-semibold text-[#2c3e50] mb-2">
                            {lastFoundWord}
                        </p>
                        <p className="text-lg text-gray-600 mb-6">
                            Meaning: "{WORD_MEANINGS_STATE[WORDS.indexOf(lastFoundWord)] || "Unknown"}"
                        </p>
                        <button
                            onClick={() => setLastFoundWord(null)}
                            className="bg-[#2c3e50] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1e2b37] transition"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Game Over Screen */}
            {gameOver && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center border border-gray-100">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            🎉 You found all the words!
                        </h2>
                        <button
                            onClick={fetchWords}
                            className="bg-[#2c3e50] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e2b37] transition"
                        >
                            Replay
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
