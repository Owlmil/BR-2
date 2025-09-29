import Phaser from 'phaser';
import fish from './assets/fish.jpg';
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // simple asset - use a colored rectangle generated in runtime or add asset files
    // You can replace with cultural art / sprites in production.
    this.load.image('fish', fish); // placeholder remote sprite (okay during hack)
  }

  create() {
    this.add.text(10, 10, 'Bridging Roots - Phaser Demo', { fontSize: '20px', color: '#ffffff' });
    // create a simple moving fish sprite
    const fish = this.physics.add.sprite(100, 300, 'fish').setScale(0.15);
    fish.setVelocityX(100);
    fish.setCollideWorldBounds(true);
    fish.setBounce(1, 0);

    // clickable
    fish.setInteractive();
    fish.on('pointerdown', () => {
      this.add.text(10, 40, 'You clicked the fish!', { fontSize: '16px', color: '#00ff00' });
    });

    // simple instruction text
    this.add.text(10, 520, 'Click the fish to catch it.', { fontSize: '14px', color: '#ffffff' });
  }

  update() {
    // game loop
  }
}
