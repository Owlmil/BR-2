import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import GameScene from '../phaser/GameScene';

export default function PhaserGame({ width = 800, height = 600 }){
  const mountRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: mountRef.current,
      width,
      height,
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 } }
      },
      scene: [GameScene]
    };

    const game = new Phaser.Game(config);

    return () => {
      try {
        game.destroy(true);
      } catch (e) {
        console.warn('Error destroying phaser game', e);
      }
    };
  }, [width, height]);

  return <div ref={mountRef} />;
}
