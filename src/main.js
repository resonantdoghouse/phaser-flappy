// @ts-nocheck
import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';

const WIDTH = 800;
const HEIGHT = 600;
const SPACESHIP_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: SPACESHIP_POSITION,
};

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      // gravity: { y: 300 },
    },
  },
  scene: [new PlayScene(SHARED_CONFIG)],
};

export default new Phaser.Game(config);
