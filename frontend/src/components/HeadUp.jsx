import React, { useEffect, useState, useRef } from 'react'
import SchoolBg from '../phaser/assets/School.png'

// HeadsUp game page for School theme
export default function HeadUp() {
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [wordsList, setWordsList] = useState([]) // array of {id, letter, sen_word, english_meaning}
  const [loading, setLoading] = useState(true)
  const timerRef = useRef(null)

  // fallback sample words (school-relevant English meanings)
  const fallback = [
    { id: 1, sen_word: 'AXEN_', english_meaning: 'to say' },
    { id: 2, sen_word: 'KELEN', english_meaning: 'ear' },
    { id: 3, sen_word: 'LOX̱ENE', english_meaning: 'canadian goose' },
    { id: 4, sen_word: 'SŌL', english_meaning: 'door' },
    { id: 5, sen_word: 'TENEḴSEN', english_meaning: 'hummingbird' },
    { id: 6, sen_word: 'WEXES', english_meaning: 'frog' },
    { id: 7, sen_word: 'XŦEM', english_meaning: 'chest' },
    { id: 8, sen_word: 'YEYOSEṈ', english_meaning: 'play' },
  ]

  useEffect(() => {
    let mounted = true
    async function fetchWords() {
      try {
        const base = process.env.REACT_APP_API_BASE || 'http://localhost:5000'
        const res = await fetch(`${base}/words`)
        if (!res.ok) throw new Error('Network error')
        const data = await res.json()
        if (mounted && Array.isArray(data) && data.length) {
          // shuffle to make games varied
          const shuffled = data.sort(() => Math.random() - 0.5)
          setWordsList(shuffled)
        } else if (mounted) {
          setWordsList(fallback)
        }
      } catch (err) {
        // fallback to local list if backend not available
        if (mounted) setWordsList(fallback)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchWords()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    // start timer once words load
    if (!loading && wordsList.length) {
      timerRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            clearInterval(timerRef.current)
            return 0
          }
          return s - 1
        })
      }, 1000)
    }

    return () => clearInterval(timerRef.current)
  }, [loading, wordsList])

  function pickNextIndex(skip = false) {
    if (!wordsList.length) return 0
    // choose next random index (avoid repeating current)
    let next = currentIndex
    if (wordsList.length === 1) return 0
    while (next === currentIndex) {
      next = Math.floor(Math.random() * wordsList.length)
    }
    return next
  }

  function onSkip() {
    const next = pickNextIndex(true)
    setCurrentIndex(next)
    setScore(s => Math.max(0, s - 1))
  }

  function onCorrect() {
    const next = pickNextIndex(false)
    setCurrentIndex(next)
    setScore(s => s + 1)
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const current = wordsList[currentIndex] || { english_meaning: 'Loading…', sen_word: '' }

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${SchoolBg})` }}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-sm">
        <div className="text-white text-2xl sm:text-3xl font-semibold">{formatTime(secondsLeft)}</div>
        <div className="text-white text-2xl sm:text-3xl font-semibold">Score: {score}</div>
      </header>

      {/* Center word area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-3xl w-full text-center px-4 py-8 bg-white/80 rounded-3xl shadow-xl">
          <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">
            {current.english_meaning}
          </div>
          <div className="mt-4 text-xl sm:text-2xl text-gray-700">{current.sen_word ? `(${current.sen_word})` : ''}</div>
          <p className="mt-6 text-base sm:text-lg text-gray-700">Hold the device so your teammate can see the word.</p>
        </div>
      </main>

      {/* Bottom controls */}
      <footer className="p-4 bg-black/30">
        <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4">
          <button
            onClick={onSkip}
            className="w-full py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white text-2xl font-bold shadow-md"
            aria-label="Skip"
            disabled={loading}
          >
            ❌ Skip
          </button>
          <button
            onClick={onCorrect}
            className="w-full py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white text-2xl font-bold shadow-md"
            aria-label="Correct"
            disabled={loading}
          >
            ✅ Correct
          </button>
        </div>
      </footer>
    </div>
  )
}
