import BaseScene from './BaseScene';

class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);
    this.menu = [
      { scene: 'PlayScene', text: 'Play' },
      { scene: 'ScoreScene', text: 'Score' },
      { scene: null, text: 'Exit' },
    ];
  }

  create() {
    super.create();
    this.createMenu(this.menu, (menuItem) => this.setupMenuEvents(menuItem));
  }

  setupMenuEvents(menuItem) {
    const textGObj = menuItem.textGObj;
    textGObj.setInteractive();

    textGObj.on('pointerover', () => {
      textGObj.setStyle({
        fill: '#f00',
      });
    });

    textGObj.on('pointerout', () => {
      textGObj.setStyle({
        fill: '#000',
      });
    });

    textGObj.on('pointerup', () => {
      menuItem.scene && this.scene.start(menuItem.scene);
      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  }
}

export default MenuScene;
