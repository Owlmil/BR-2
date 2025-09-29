import React from 'react'
import WordExample from './components/WordExample'
import GamePage from './pages/GamePage'

export default function App(){
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">🌱 Bridging Roots - Demo</h1>
        <p className="text-sm text-slate-600">A starter scaffold for 2D game prototypes (Phaser integrated).</p>
      </header>

      <main className="max-w-3xl mx-auto mt-6 space-y-6">
        <section className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Random SENĆOŦEN word</h2>
          <WordExample />
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Phaser Demo</h2>
          <GamePage />
        </section>
      </main>
    </div>
  )
}
