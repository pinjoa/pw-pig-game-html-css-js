/**
 * Lesson 8 - Game Challenge - Pig Game
 * implementação em código do flowchart fornecido como enunciado "pig-game-flowchart.png"
 *
 * @author: (#20808) João Carlos Pinto (a20808@alunos.ipca.pt)
 * @date 31-mar-2022
 * @filename "script.js"
 * @version 1.0
 */

"use strict";

/**
 * o objeto "pigGame" contém toda a lógica do jogo
 */
const pigGame = {
  currentPlayer: 0,
  gameActive: false,
  game: [
    {
      currentScore: 0,
      totalScore: 0,
      currentScoreInfo: document.getElementById("current--0"),
      totalScoreInfo: document.getElementById("score--0"),
      zone: document.querySelector(".player--0"),
    },
    {
      currentScore: 0,
      totalScore: 0,
      currentScoreInfo: document.getElementById("current--1"),
      totalScoreInfo: document.getElementById("score--1"),
      zone: document.querySelector(".player--1"),
    },
  ],
  elements: {
    btnNew: document.querySelector(".btn--new"),
    btnRoll: document.querySelector(".btn--roll"),
    btnHold: document.querySelector(".btn--hold"),
    dice: document.querySelector(".dice"),
  },
  enablePlayer: function (player) {
    //console.log(`enablePlayer(${player})`);
    this.game[player].zone.classList.add("player--active");
  },
  disablePlayer: function (player) {
    //console.log(`disablePlayer(${player})`);
    this.game[player].zone.classList.remove("player--active");
  },
  enableWinner: function (player) {
    //console.log(`enableWinner(${player})`);
    this.game[player].zone.classList.add("player--winner");
  },
  disableWinner: function (player) {
    this.game[player].zone.classList.remove("player--winner");
  },
  showInfo: function (player) {
    this.game[player].currentScoreInfo.textContent =
      this.game[player].currentScore;
    this.game[player].totalScoreInfo.textContent = this.game[player].totalScore;
  },
  resetPlayer: function (player) {
    this.game[player].currentScore = 0;
    this.game[player].totalScore = 0;
    this.showInfo(player);
    this.disablePlayer(player);
    this.disableWinner(player);
  },
  new: function () {
    this.currentPlayer = 0;
    this.resetPlayer(0);
    this.resetPlayer(1);
    this.enablePlayer(this.currentPlayer);
    this.gameActive = true;
  },
  updateScore: function () {
    this.game[this.currentPlayer].currentScore = 0;
    this.showInfo(this.currentPlayer);
  },
  hold: function (updateTotalScore = true) {
    if (this.gameActive) {
      if (updateTotalScore) {
        this.game[this.currentPlayer].totalScore +=
          this.game[this.currentPlayer].currentScore;
      }
      this.updateScore();
      if (this.game[this.currentPlayer].totalScore >= 100) {
        this.updateScore(true);
        this.enableWinner(this.currentPlayer);
        this.gameActive = false;
      } else {
        this.disablePlayer(this.currentPlayer);
        this.currentPlayer++;
        if (this.currentPlayer > 1) this.currentPlayer = 0;
        this.enablePlayer(this.currentPlayer);
      }
    }
  },
  roll: function () {
    if (this.gameActive) {
      const r = Math.round(Math.random() * 5) + 1;
      const imagem = `res/images/dice-${r}.png`;
      this.elements.dice.src = imagem;
      if (r != 1) this.game[this.currentPlayer].currentScore += r;
      this.showInfo(this.currentPlayer);
      if (r == 1) this.hold(false);
    }
  },
  config: function () {
    this.elements.btnNew.addEventListener("click", () => {
      pigGame.new();
    });
    this.elements.btnRoll.addEventListener("click", () => {
      pigGame.roll();
    });
    this.elements.btnHold.addEventListener("click", () => {
      pigGame.hold();
    });
  },
  startApp: function () {
    this.new();
    this.config();
  },
};

/**
 * inicializar/iniciar o jogo apenas quando a página completa estiver carregada
 */
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    pigGame.startApp();
  }
};
//
// método alternativo
//window.onload = pigGame.startApp();
