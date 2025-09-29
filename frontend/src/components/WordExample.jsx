import React, { useEffect, useState } from 'react'

export default function WordExample(){
  //data structure: {"id":22,"letter":"O","sen_word":"OPEN","english_meaning":"number 10"}
  const [word, setWord] = useState(null)
  useEffect(() => {
    fetch('http://localhost:5000/words/random')
      .then(r => r.json())
      .then(data => setWord(data))
      .catch(err => {
        console.error(err)
        setWord({ word: 'sənč̓o̓tən', translation: 'SENĆOŦEN' })
      })
  }, [])

  if (!word) return <div className="py-4">Loading...</div>

  return (
    <div className="py-4">
      <div className="text-2xl font-bold">{word.sen_word}</div>
      <div className="text-sm text-slate-500 mt-1">{word.english_meaning}</div>
    </div>
  )
}
