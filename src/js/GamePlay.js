import imgGoblin from "../img/goblin.png";

import GameController from "./GameController";

export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.cells = [];
    this.interval = undefined;
    this.hits = 0;
    this.missed = 0;
    this.isEnd = false;

    this.wrapper = null;
    this.img = null;
  }

  drawUi() {
    this.wrapper = document.querySelector(".wrapper");
    if (!this.wrapper) {
      return;
    }

    for (let i = 0; i < this.boardSize ** 2; i++) {
      const cell = document.createElement("div");
      this.wrapper.appendChild(cell);
    }

    this.cells = [...document.querySelectorAll(".wrapper div")];

    this.img = document.createElement("img");
    this.img.src = imgGoblin;

    this.wrapper.addEventListener("click", (event) => {
      if (event.target.tagName === "IMG") {
        this.isEnd = false;
        this.hits++;
        this.redrawStatistics();
        event.target.remove();
      }
    });

    this.redrawStatistics();
    this.startInterval();
  }

  startInterval() {
    this.interval = setInterval(() => {
      if (this.isEnd) {
        this.missed++;
        this.redrawStatistics();
      }

      if (this.missed > 4) {
        clearInterval(this.interval);
        alert(`Вы проиграли! Ваш рекорд: ${this.hits} убитых гоблинов`);
        return;
      }

      const index = GameController.getRandomIndex(this.cells, this.boardSize);
      this.cells[index].appendChild(this.img);
      this.isEnd = true;
    }, 1000);
  }

  redrawStatistics() {
    const statictics = document.querySelector(".statistics");
    statictics.innerHTML = `Попаданий: ${this.hits}</br>Промахов: ${this.missed}`;
  }
}
