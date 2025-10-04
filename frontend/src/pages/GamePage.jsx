import React from 'react';
import PhaserGame from '../components/PhaserGame';
import MatchFourGame from './MatchGame';

export default function GamePage(){
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-800 p-4">
      <div className="w-full max-w-4xl bg-slate-900 p-4 rounded shadow">
        <h2 className="text-white text-2xl mb-2">Phaser 2D Game Demo</h2>
        <div className="bg-black p-2 rounded">
          <PhaserGame width={800} height={560} />
          <MatchFourGame />
        </div>
      </div>
    </div>
  )
}
