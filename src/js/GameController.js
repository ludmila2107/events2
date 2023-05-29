import GamePlay from "./GamePlay";

export default class GameController {
  constructor() {
    this.gamePlay = new GamePlay();
  }

  init() {
    this.gamePlay.drawUi();
  }

  static getRandomIndex(cells, boardSize) {
    const oldIndex = cells.findIndex((el) => el.children.length);
    let randomIndex = Math.floor(Math.random() * (boardSize ** 2 - 1));
    return randomIndex !== oldIndex
      ? randomIndex
      : this.getRandomIndex(cells, boardSize);
  }
}
