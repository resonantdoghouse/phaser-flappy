// @ts-nocheck
import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import PlayScene from './scenes/PlayScene';
import ScoreScene from './scenes/ScoreScene';
import MenuScene from './scenes/MenuScene';

const WIDTH = 800;
const HEIGHT = 600;
const SPACESHIP_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: SPACESHIP_POSITION,
};

const Scenes = [PreloadScene, MenuScene, PlayScene, ScoreScene];
const createScene = (Scene) => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: initScenes(),
};

export default new Phaser.Game(config);
