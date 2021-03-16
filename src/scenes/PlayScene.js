// @ts-nocheck
import Phaser from 'phaser';
const PIPES_TO_RENDER = 4;

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');
    this.config = config;
    this.flapVelocity = 300;
    this.spaceship = null;
    this.pipes = null;
    this.initialSpaceshipPosition = {
      x: 80,
      y: 300,
    };
    this.pipeVerticalDistanceRange = [150, 250];
    this.pipeHorizontalDistanceRange = [500, 550];
  }

  preload() {
    this.load.image('mountains', './assets/img/mountains01_1920x1080_full.png');
    this.load.image('spaceship', './assets/img/thing.png');
    this.load.image('pipe', './assets/img/pipe.png');
  }

  create() {
    this.createBG();
    this.createSpaceship();
    this.createPipes();
    this.createColliders();
    this.handleInputs();
  }

  createBG() {
    this.add.image(0, -300, 'mountains').setOrigin(0);
  }

  createSpaceship() {
    this.spaceship = this.physics.add
      .sprite(
        this.config.startPosition.x,
        this.config.startPosition.y,
        'spaceship'
      )
      .setOrigin(0);
    this.spaceship.body.gravity.y = 400;
    this.spaceship.setCollideWorldBounds(true);
  }

  createPipes() {
    this.pipes = this.physics.add.group();
    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const uPipe = this.pipes
        .create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 1);
      const lPipe = this.pipes
        .create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 0);
      this.placePipe(uPipe, lPipe);
    }
    this.pipes.setVelocityX(-200);
  }

  createColliders() {
    this.physics.add.collider(
      this.spaceship,
      this.pipes,
      this.gameOver,
      null,
      this
    );
  }

  handleInputs() {
    this.input.on('pointerdown', this.flap, this);
    this.input.keyboard.on('keydown_SPACE', this.flap, this);
  }

  flap() {
    this.spaceship.body.velocity.y = -this.flapVelocity;
  }

  getRightMostPipe() {
    let rightMostX = 0;
    this.pipes.getChildren().forEach((pipe) => {
      rightMostX = Math.max(pipe.x, rightMostX);
    });
    return rightMostX;
  }

  recyclePipes = () => {
    const tempPipes = [];
    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
        }
      }
    });
  };

  gameOver() {
    // this.spaceship.x = this.initialSpaceshipPosition.x;
    // this.spaceship.y = this.initialSpaceshipPosition.y;
    // this.spaceship.body.velocity.y = 0;
    this.physics.pause();
    this.spaceship.setTint(0xee4824);
  }

  placePipe(uPipe, lPipe) {
    const rightMostX = this.getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(
      ...this.pipeVerticalDistanceRange
    );
    const pipeVerticalPosition = Phaser.Math.Between(
      0 + 20,
      this.config.height - 20 - pipeVerticalDistance
    );
    const pipeHorizontalDistance = Phaser.Math.Between(
      ...this.pipeHorizontalDistanceRange
    );
    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;
    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;
  }

  checkGameStatus() {
    if (
      this.spaceship.getBounds().bottom >= this.config.height ||
      this.spaceship.y <= 0
    ) {
      this.gameOver();
    }
  }

  // update method, runs roughly 60 times per second
  update() {
    this.checkGameStatus();
    this.recyclePipes();
  }
}

export default PlayScene;
