# Frontend (React + Tailwind + Vite + Phaser)

## Quick start

1. Install dependencies:
```
cd frontend
npm install
```

2. Run dev server:
```
npm start
```

This project uses Vite. Add your game canvas/page under `src/pages/` or a component inside `src/components/`.
A simple Phaser scene and mounting wrapper are provided at `src/phaser/GameScene.js` and `src/components/PhaserGame.jsx`.
Note: The demo loads a placeholder sprite from a remote URL; for an offline/hackathon setup, replace with local assets in `public/assets/` and update the preload path.
