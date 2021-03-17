import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor(config) {
    super('PreloadScene');
    this.config = config;
  }

  preload() {
    this.load.image('mountains', './assets/img/mountains01_1920x1080_full.png');
    this.load.image('spaceship', './assets/img/thing.png');
    this.load.image('pipe', './assets/img/pipe.png');
    this.load.image('pause', './assets/img/pause.png');
    this.load.image('back', './assets/img/back.png');
  }

  create() {
    this.scene.start('MenuScene');
  }
}

export default PreloadScene;
