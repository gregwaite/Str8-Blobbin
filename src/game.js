const Circle = require("./circle.js");
const Enemy = require("./enemy.js");
const Health = require("./health.js");
// const Attack = require("./attack.js");

class Game {
  constructor() {
    this.fleet = [];
    this.circle = null;
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.draw = this.draw.bind(this);
    this.waveNum = 1;
    this.waveCount = 1;
    this.health = null;
    this.healthCount = 0;
    this.gameOver = false;
    this.finalWave = null;
    this.neverOver = true;
    this.factoryNum = 6;
    this.hurtCircs = [];
    this.firstGame = true;
    this.started = false;
    this.animateReq = null;
    this.attack = [];
  }

  startScreen() {
    this.player();
    this.circle.ctx.font = "30px Helvetica";
    this.circle.ctx.strokeStyle = 'white';
    this.circle.ctx.strokeText("Press UP or W to start (SPACEBAR to attack)", (this.canvas.width / 2) - 250, this.canvas.height / 2);
  }

  start(){
    this.enemyFactory(this.factoryNum);
    this.health = [new Health({
      pos: [400, 50],
      vel: [0, 0],
      radius: 5,
      game: this,
    })];
    this.animateReq = requestAnimationFrame(this.draw);
  }

  restart(){
    this.waveNum = 1;
    this.waveCount = 1;
    this.healthCount = 0;
    this.gameOver = false;
    this.finalWave = null;
    this.neverOver = true;
    this.factoryNum = 6;
    this.hurtCircs = [];
    this.firstGame = false;
    this.player();
    cancelAnimationFrame(this.animateReq);
    this.start();
  }

  draw(){
    this.ctx.clearRect(0, 0, 800, 600);
    this.messages();
    this.circle.draw();
    this.circle.move();
    this.moveHurtCircs();
    this.moveAttack();
    this.hurtCircs = this.hurtCircs.filter(hurt =>{
      return hurt !== undefined;
    });
    this.attack = this.attack.filter(attack =>{
      return attack !== undefined;
    });
    this.fleet = this.fleet.filter(enemy =>{
      return enemy !== undefined;
    });
    if (this.healthCount < 3) {
      this.moveHealthDown();
      if (this.health[0]){
        this.health[0].draw();
      }
    } else {
      this.checkWaves();
    }
    this.collisionDetection();
    this.animateReq = requestAnimationFrame(this.draw);
  }

  messages(){
    if (this.gameOver) {
      this.handleMessage('game over');
    } else if (this.healthCount < 3 && this.waveNum === 1) {
      this.handleMessage('norm', "This is your family. Eat them to gain their courage"); 
    } else if (this.healthCount === 3 && this.waveNum === 1) {
      this.handleMessage('attackback', "Oh no! The triangles are attacking cause you're a cannibal! Use SPACEBAR to attack back!");
    } else if (this.healthCount === 3 && this.waveNum === 2) {
      this.handleMessage('norm', "Oh no! The rectangles don't like cannibalism either!");
    } else if (this.healthCount === 3 && this.waveNum === 3) {
      this.handleMessage('norm', "Ahh! They're working together!");
    } else if (this.healthCount === 3 && this.waveNum === 4) {
      this.handleMessage('norm', "Looks like they're breeding!");
    } else if (this.healthCount === 3 && this.waveNum === 5) {
      this.handleMessage('norm', "Oh no, the whole family!");
    } else if (this.waveNum > 10) {
      this.handleMessage('norm', "Well, we're boned");
    }
  }

  handleMessage(type, text) {
    if (type === 'norm') {
      this.circle.ctx.font = "17px Courier, monospace";
      this.circle.ctx.fillStyle = 'white';
      this.circle.ctx.fillText(text, this.canvas.width / 20, this.canvas.height / 2);
    } else if (type === 'attackback') {
      this.circle.ctx.font = "14px Courier, monospace";
      this.circle.ctx.fillStyle = 'white';
      this.circle.ctx.fillText(text, this.canvas.width / 20, this.canvas.height / 2);
    } else if (type === 'game over') {
      if (this.neverOver) {
        this.neverOver = false;
        this.finalWave = this.waveNum;
      }
      this.waveNum = this.finalWave;
      this.circle.ctx.font = "50px Helvetica";
      this.circle.ctx.strokeStyle = 'whtie';
      this.circle.ctx.strokeText("Game Over", (this.canvas.width / 2) + 40, this.canvas.height / 2);
      this.circle.ctx.font = "24px Helvetica";
      this.circle.ctx.strokeStyle = 'white';
      this.circle.ctx.strokeText("Time is a flat circle", (this.canvas.width / 2) + 50, this.canvas.height / 2 + 50);
      this.circle.ctx.font = "30px Helvetica";
      this.circle.ctx.strokeStyle = 'white';
      this.circle.ctx.strokeText("-", 690, this.canvas.height / 2 + 50);
      this.circle.ctx.font = "30px Helvetica";
      this.circle.ctx.strokeStyle = 'white';
      this.circle.ctx.strokeText("-", 710, this.canvas.height / 2 + 50);
      this.circle.ctx.font = "30px Helvetica";
      this.circle.ctx.strokeStyle = 'white';
      this.circle.ctx.strokeText("-", 730, this.canvas.height / 2 + 50);
      this.circle.ctx.font = "30px Helvetica";
      this.circle.ctx.strokeStyle = 'white';
      this.circle.ctx.strokeText("-", 750, this.canvas.height / 2 + 50);
      this.circle.ctx.font = "30px Helvetica";
      this.circle.ctx.strokeStyle = 'white';
      this.circle.ctx.strokeText(">", 770, this.canvas.height / 2 + 49);
      this.circle.ctx.font = "17px Courier, monospace";
      this.circle.ctx.fillStyle = 'white';
      this.circle.ctx.fillText(`You made it to wave ${this.finalWave}. Good job?`, this.canvas.width / 2 - 100, 200);
      this.circle.damageAnimation();
    }
  }

  checkWaves(){
    if (this.waveNum < 4 && this.waveCount > 3) {
      this.handleWaveCheck();
    } else if (this.waveNum >= 4 && this.waveNum < 10 && this.waveCount > 6) {
      this.handleWaveCheck();
    } else if (this.waveNum >= 10 && this.waveCount > 20) {
      this.factoryNum = 10;
      this.handleWaveCheck();
    } else {
      this.fleet.forEach(enemy => {
        enemy.draw();
      });
      this.moveFleetDown();
    } 
  }

  handleWaveCheck(){
    if (!this.gameOver) {
      this.waveNum += 1;
      this.healthCount = 0;
    }
    this.waveCount = 1;
    this.enemyFactory(this.factoryNum);
  }

  player(){
    this.circle = new Circle({ 
      pos: [400, 570], 
      vel: [0,0], 
      radius: 15, 
      color: 'red', 
      game: this,
    });
    if (this.firstGame){
      document.addEventListener("keydown", (key) => {
        this.circle.handleKeypress(key);
      });
      document.addEventListener("keyup", (key) => {
        this.circle.stopMovement(key);
      });
    }
  }

  enemyFactory(fleetCount) {
    let fleetObjPos = Math.floor(400 / fleetCount);
    let localFleet = [];
    for (let i = 0; i < fleetCount; i++) {
      let localShape;
      if (this.waveNum === 1) {
        localShape = 'tri';
      } else if (this.waveNum === 2){
        localShape = 'rect';
      } else if (this.waveNum === 3) {
        localShape = shapeNames[i%2];
      } else if (this.waveNum === 4) {
        localShape = "pent";
      } else if (this.waveNum > 4) {
        localShape = shapeNames[i%3];
      }
      localFleet.push(new Enemy({ pos: [fleetObjPos, 40], vel: [0, 0], radius: 30, color: 'blue', game: this, shape: localShape}));
      fleetObjPos = fleetObjPos + Math.floor(800 / fleetCount);
    }
    this.fleet = localFleet;
  }


  moveFleetDown() {
    if (this.fleet[0].pos[1] < 595) {
      this.fleet.forEach(enemy => {
        if (Math.floor(Math.random() * 2) === 0) {
          enemy.right = true;
          enemy.left = false;
        } else {
          enemy.left = true;
          enemy.right = false;
        }
        enemy.move();
      });
    } else {
      this.waveCount += 1;
      this.enemyFactory(this.factoryNum);
    }
  }

  moveHealthDown() {
    if (this.health[0] && this.health[0].pos[1] < 595) {
      this.health[0].move();
    } else if (!this.health[0]) {
      this.health = [new Health({
        pos: [400, 50],
        vel: [0, 0],
        radius: 10,
        color: 'orange',
        game: this,
      })];
    } else {
      delete this.health[0];
      this.healthCount += 1;
    }
  }
  moveHurtCircs() {
    if (this.hurtCircs.length > 1) {
      this.hurtCircs.forEach(hurtCirc => {
        hurtCirc.move();
        hurtCirc.draw();
      });
    }
  }
  moveAttack() {
    this.attack.forEach(attackCirc => {
      attackCirc.move();
      attackCirc.draw();
    });
  }

  collisionDetection(){
    this.fleet.forEach((fleetObj, i) => {
      let dx = this.circle.pos[0] - fleetObj.pos[0];
      let dy = this.circle.pos[1] - fleetObj.pos[1];
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.circle.radius + fleetObj.radius - 4) {
        this.circle.handleCollision(fleetObj, i);
      }
    });
    this.health.forEach((healthObj, i) => {
      let dx = this.circle.pos[0] - healthObj.pos[0];
      let dy = this.circle.pos[1] - healthObj.pos[1];
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.circle.radius + healthObj.radius) {
        this.circle.handleCollision(healthObj, i);
      }
    });
    this.attack.forEach((attackObj, iA) => {
      this.fleet.forEach((fleetObj, iF) => {
        let dx = fleetObj.pos[0] - attackObj.pos[0];
        let dy = fleetObj.pos[1] - attackObj.pos[1];
        let distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < fleetObj.radius + attackObj.radius) {
          attackObj.handleCollision(fleetObj, iA, iF);
        }
      });
    });
  }
}

const shapeNames = [
  'tri', 
  'rect',
  'pent', 
];

module.exports = Game;