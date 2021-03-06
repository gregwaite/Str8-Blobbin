/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/attack.js":
/*!***********************!*\
  !*** ./src/attack.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nclass Attack extends MovingObject{\n  constructor(props) {\n    super(props);\n    this.color = \"white\";\n    this.up = true;\n    this.startPos = props.startPos;\n  }\n\n  draw() {\n    this.ctx.fillStyle = this.color;\n    this.ctx.beginPath();\n\n    this.ctx.arc(\n      this.pos[0],\n      this.pos[1],\n      this.radius,\n      0,\n      2 * Math.PI,\n      false\n    );\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n\n  handleCollision(fleetObj, iA, iF) {\n    if (fleetObj.pos[1] > 50){\n      delete this.game.attack[iA];\n      delete this.game.fleet[iF];\n      fleetObj.enemyDamageAnimation();\n    }\n  }\n  \n\n\n\n}\n\nmodule.exports = Attack;\n\n//# sourceURL=webpack:///./src/attack.js?");

/***/ }),

/***/ "./src/circle.js":
/*!***********************!*\
  !*** ./src/circle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Hurt = __webpack_require__(/*! ./hurt.js */ \"./src/hurt.js\");\nconst Attack = __webpack_require__(/*! ./attack.js */ \"./src/attack.js\");\n\nclass Circle extends MovingObject {\n  constructor(props) {\n    super(props);\n    this.attacking = false;\n  }\n\n  draw() {\n    this.ctx.fillStyle = this.color;\n    this.ctx.beginPath();\n      this.ctx.arc(\n        this.pos[0],\n        this.pos[1],\n        this.radius,\n        0,\n        2 * Math.PI,\n        false\n      );\n      this.ctx.fill();\n    this.ctx.closePath();\n  }\n\n  stopMovement(key){\n    if (key.code === \"ArrowLeft\" || key.code === \"KeyA\") {\n      this.left = false;\n      this.vel[0] = 0;\n    } else if (key.code === \"ArrowRight\" || key.code === \"KeyD\") {\n      this.right = false;\n      this.vel[0] = 0;\n    } else if (key.code === \"ArrowUp\" || key.code === \"KeyW\") {\n      this.up = false;\n      this.vel[1] = 0;\n    } else if (key.code === \"ArrowDown\" || key.code === \"KeyS\") {\n      this.down = false;\n      this.vel[1] = 0;\n    } else if (key.code === \"Space\") {\n      this.attacking = false;\n    }\n  }\n\n  handleKeypress(key) {\n    if (key.code === \"ArrowLeft\" || key.code === \"KeyA\") {\n      this.left = true;\n    } else if (key.code === \"ArrowRight\" || key.code === \"KeyD\") {\n      this.right = true;\n    } else if (key.code === \"ArrowUp\" || key.code === \"KeyW\") {\n      if (!this.game.started) {\n        this.game.started = true;\n        this.game.start();\n      }\n      this.up = true;\n    } else if (key.code === \"ArrowDown\" || key.code === \"KeyS\") {\n      this.down = true;\n    } else if (key.code === \"Enter\" && this.game.started) {\n      this.game.restart();\n    } else if (key.code === \"Space\"){\n      if (!this.game.started) {\n        this.game.started = true;\n        this.game.start();\n      }\n      this.attacking = true;\n    } else if (key.code === \"Enter\") {\n      this.game.started = true;\n      this.game.start();\n    }\n  }\n\n  handleCollision(fleetObj, i) {\n    if (this.gameOver()){\n      this.game.gameOver = true;\n    } else if (fleetObj.constructor.name === \"Enemy\") {\n      this.radius -= 1;\n      if (this.gameOver()) {\n        this.game.gameOver = true;\n      }\n      this.damageAnimation();\n    } else if (fleetObj.constructor.name === \"Health\") {\n      delete this.game.health[0];\n      this.game.healthCount += 1;\n      this.radius += 4;\n    }\n  }\n\n  damageAnimation() {\n   let hurt = [];\n    let diff;\n    if (Math.floor(Math.random() * 2) === 0) {\n      diff = 1;\n    } else {\n      diff = 5;\n    }\n    const hurtPos = [\n      [this.pos[0] + diff, this.pos[1]],\n      [this.pos[0] + diff, this.pos[1] + diff],\n      [this.pos[0], this.pos[1] + diff],\n      [this.pos[0] - diff, this.pos[1] + diff],\n      [this.pos[0] - diff, this.pos[1]],\n      [this.pos[0] - diff, this.pos[1] - diff],\n      [this.pos[0], this.pos[1] - diff],\n      [this.pos[0] + diff, this.pos[1] - diff],\n    ];\n    const directions = [\n      \"right\",\n      [\"down\", \"right\"],\n      \"down\",\n      [\"down\", \"left\"],\n      \"left\",\n      [\"up\", \"left\"],\n      \"up\",\n      [\"up\", \"right\"],\n\n    ]\n      for (let i = 0; i < 8; i++) {\n        hurt.push(new Hurt({\n          pos: hurtPos[i],\n          vel: [0, 0],\n          radius: 6,\n          color: 'red',\n          game: this.game,\n          shape: 'circle',\n        }));\n      }\n    hurt.forEach( (circ, i) => {\n      circ.draw();\n      if (directions[i] instanceof Array) {\n        circ[directions[i][0]] = true;\n        circ[directions[i][1]] = true;\n      } else {\n        circ[directions[i]] = true;\n      }\n      this.game.hurtCircs.push(circ);\n    });\n  }\n\n  attack(){\n    let attack = [];\n    // let diff;\n    // if (Math.floor(Math.random() * 2) === 0) {\n    //   diff = 1;\n    // } else {\n    //   diff = 5;\n    // }\n    for (let i = 0; i < 1; i++) {\n      if (this.game.attack.every(att => att.startPos - att.pos[1] > 120)){\n          attack.push(new Attack({\n          pos: [this.pos[0], this.pos[1] - this.radius],\n          vel: [0, 0],\n          radius: 7,\n          color: 'white',\n          game: this.game,\n          startPos: this.pos[1],\n        }));\n      }\n    }\n\n    attack.forEach((circ) => {\n      this.game.attack.push(circ);\n    });\n  }\n\n  \n\n  gameOver(){\n    if (this.radius < 5) {\n      return true;\n    }\n    return false;\n  }\n\n}\n\nmodule.exports = Circle;\n\n//# sourceURL=webpack:///./src/circle.js?");

/***/ }),

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Hurt = __webpack_require__(/*! ./hurt.js */ \"./src/hurt.js\");\n\nclass Enemy extends MovingObject {\n  constructor(props) {\n    super(props);\n    this.down = true;\n  }\n  \n  draw() {\n    if (this.shape === \"rect\") {\n      this.color = 'blue';\n      this.drawRect();\n    } else if (this.shape === \"tri\") {\n      this.color = 'yellow';\n      this.drawTri();\n    } else if (this.shape === \"pent\") {\n      this.color = '#25fd03';\n      this.drawPent();\n    }\n  }\n  drawTri(){\n    this.ctx.fillStyle = this.color;\n    this.ctx.beginPath();\n      this.ctx.moveTo(this.pos[0], this.pos[1]);\n      this.ctx.lineTo((this.pos[0] + this.radius/2), (this.pos[1] + this.radius));\n      this.ctx.lineTo((this.pos[0] - this.radius/2), (this.pos[1] + this.radius));\n      this.ctx.fill();\n    this.ctx.closePath();\n  }\n  drawRect() {\n    this.ctx.fillStyle = this.color;\n    this.ctx.beginPath();\n    this.ctx.fillRect(this.pos[0], this.pos[1], this.radius, this.radius);\n    this.ctx.closePath();\n  }\n  pentagon(x, y, radius, rotation) {\n    for (var i = 0; i < 5; i++) {\n      const ang = (i / 5) * Math.PI * 2 + rotation;\n      this.ctx.lineTo(\n        Math.cos(ang) * radius + x,\n        Math.sin(ang) * radius + y\n      );\n    }\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n  drawPent() {\n    this.ctx.fillStyle = this.color;\n    this.ctx.beginPath();\n    this.pentagon(this.pos[0], this.pos[1], 20, -Math.PI / 2);\n    this.ctx.stroke();\n  }\n\n  enemyDamageAnimation() {\n    let hurt = [];\n    let diff;\n    if (Math.floor(Math.random() * 2) === 0) {\n      diff = 1;\n    } else {\n      diff = 5;\n    }\n    const hurtPos = [\n      [this.pos[0] + diff, this.pos[1]],\n      [this.pos[0] + diff, this.pos[1] + diff],\n      [this.pos[0], this.pos[1] + diff],\n      [this.pos[0] - diff, this.pos[1] + diff],\n      [this.pos[0] - diff, this.pos[1]],\n      [this.pos[0] - diff, this.pos[1] - diff],\n      [this.pos[0], this.pos[1] - diff],\n      [this.pos[0] + diff, this.pos[1] - diff],\n    ];\n    const directions = [\n      \"right\",\n      [\"down\", \"right\"],\n      \"down\",\n      [\"down\", \"left\"],\n      \"left\",\n      [\"up\", \"left\"],\n      \"up\",\n      [\"up\", \"right\"],\n\n    ]\n    for (let i = 0; i < 8; i++) {\n      hurt.push(new Hurt({\n        pos: hurtPos[i],\n        vel: [0, 0],\n        radius: 10,\n        color: 'red',\n        game: this.game,\n        shape: this.shape\n      }));\n    }\n    hurt.forEach((circ, i) => {\n      circ.draw();\n      if (directions[i] instanceof Array) {\n        circ[directions[i][0]] = true;\n        circ[directions[i][1]] = true;\n      } else {\n        circ[directions[i]] = true;\n      }\n      this.game.hurtCircs.push(circ);\n    });\n  }\n\n}\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Circle = __webpack_require__(/*! ./circle.js */ \"./src/circle.js\");\nconst Enemy = __webpack_require__(/*! ./enemy.js */ \"./src/enemy.js\");\nconst Health = __webpack_require__(/*! ./health.js */ \"./src/health.js\");\n// const Attack = require(\"./attack.js\");\n\nclass Game {\n  constructor() {\n    this.fleet = [];\n    this.circle = null;\n    this.canvas = document.getElementById('game-canvas');\n    this.ctx = this.canvas.getContext('2d');\n    this.draw = this.draw.bind(this);\n    this.waveNum = 1;\n    this.waveCount = 1;\n    this.health = null;\n    this.healthCount = 0;\n    this.gameOver = false;\n    this.finalWave = null;\n    this.neverOver = true;\n    this.factoryNum = 6;\n    this.hurtCircs = [];\n    this.firstGame = true;\n    this.started = false;\n    this.animateReq = null;\n    this.attack = [];\n  }\n\n  startScreen() {\n    this.player();\n    this.circle.ctx.font = \"30px Helvetica\";\n    this.circle.ctx.strokeStyle = 'white';\n    this.circle.ctx.strokeText(\"Press UP or W to start (SPACEBAR to attack)\", (this.canvas.width / 2) - 250, this.canvas.height / 2);\n  }\n\n  start(){\n    this.enemyFactory(this.factoryNum);\n    this.health = [new Health({\n      pos: [400, 50],\n      vel: [0, 0],\n      radius: 5,\n      game: this,\n    })];\n    this.animateReq = requestAnimationFrame(this.draw);\n  }\n\n  restart(){\n    this.waveNum = 1;\n    this.waveCount = 1;\n    this.healthCount = 0;\n    this.gameOver = false;\n    this.finalWave = null;\n    this.neverOver = true;\n    this.factoryNum = 6;\n    this.hurtCircs = [];\n    this.firstGame = false;\n    this.player();\n    cancelAnimationFrame(this.animateReq);\n    this.start();\n  }\n\n  draw(){\n    this.ctx.clearRect(0, 0, 800, 600);\n    this.messages();\n    this.circle.draw();\n    this.circle.move();\n    this.moveHurtCircs();\n    this.moveAttack();\n    this.hurtCircs = this.hurtCircs.filter(hurt =>{\n      return hurt !== undefined;\n    });\n    this.attack = this.attack.filter(attack =>{\n      return attack !== undefined;\n    });\n    this.fleet = this.fleet.filter(enemy =>{\n      return enemy !== undefined;\n    });\n    if (this.healthCount < 3) {\n      this.moveHealthDown();\n      if (this.health[0]){\n        this.health[0].draw();\n      }\n    } else {\n      this.checkWaves();\n    }\n    this.collisionDetection();\n    this.animateReq = requestAnimationFrame(this.draw);\n  }\n\n  messages(){\n    if (this.gameOver) {\n      this.handleMessage('game over');\n    } else if (this.healthCount < 3 && this.waveNum === 1) {\n      this.handleMessage('norm', \"This is your family. Eat them to gain their courage\"); \n    } else if (this.healthCount === 3 && this.waveNum === 1) {\n      this.handleMessage('attackback', \"Oh no! The triangles are attacking cause you're a cannibal! Use SPACEBAR to attack back!\");\n    } else if (this.healthCount === 3 && this.waveNum === 2) {\n      this.handleMessage('norm', \"Oh no! The rectangles don't like cannibalism either!\");\n    } else if (this.healthCount === 3 && this.waveNum === 3) {\n      this.handleMessage('norm', \"Ahh! They're working together!\");\n    } else if (this.healthCount === 3 && this.waveNum === 4) {\n      this.handleMessage('norm', \"Looks like they're breeding!\");\n    } else if (this.healthCount === 3 && this.waveNum === 5) {\n      this.handleMessage('norm', \"Oh no, the whole family!\");\n    } else if (this.waveNum > 10) {\n      this.handleMessage('norm', \"Well, we're boned\");\n    }\n  }\n\n  handleMessage(type, text) {\n    if (type === 'norm') {\n      this.circle.ctx.font = \"17px Courier, monospace\";\n      this.circle.ctx.fillStyle = 'white';\n      this.circle.ctx.fillText(text, this.canvas.width / 20, this.canvas.height / 2);\n    } else if (type === 'attackback') {\n      this.circle.ctx.font = \"14px Courier, monospace\";\n      this.circle.ctx.fillStyle = 'white';\n      this.circle.ctx.fillText(text, this.canvas.width / 20, this.canvas.height / 2);\n    } else if (type === 'game over') {\n      if (this.neverOver) {\n        this.neverOver = false;\n        this.finalWave = this.waveNum;\n      }\n      this.waveNum = this.finalWave;\n      this.circle.ctx.font = \"50px Helvetica\";\n      this.circle.ctx.strokeStyle = 'whtie';\n      this.circle.ctx.strokeText(\"Game Over\", (this.canvas.width / 2) + 40, this.canvas.height / 2);\n      this.circle.ctx.font = \"24px Helvetica\";\n      this.circle.ctx.strokeStyle = 'white';\n      this.circle.ctx.strokeText(\"Time is a flat circle\", (this.canvas.width / 2) + 50, this.canvas.height / 2 + 50);\n      this.circle.ctx.font = \"30px Helvetica\";\n      this.circle.ctx.strokeStyle = 'white';\n      this.circle.ctx.strokeText(\"-\", 690, this.canvas.height / 2 + 50);\n      this.circle.ctx.font = \"30px Helvetica\";\n      this.circle.ctx.strokeStyle = 'white';\n      this.circle.ctx.strokeText(\"-\", 710, this.canvas.height / 2 + 50);\n      this.circle.ctx.font = \"30px Helvetica\";\n      this.circle.ctx.strokeStyle = 'white';\n      this.circle.ctx.strokeText(\"-\", 730, this.canvas.height / 2 + 50);\n      this.circle.ctx.font = \"30px Helvetica\";\n      this.circle.ctx.strokeStyle = 'white';\n      this.circle.ctx.strokeText(\"-\", 750, this.canvas.height / 2 + 50);\n      this.circle.ctx.font = \"30px Helvetica\";\n      this.circle.ctx.strokeStyle = 'white';\n      this.circle.ctx.strokeText(\">\", 770, this.canvas.height / 2 + 49);\n      this.circle.ctx.font = \"17px Courier, monospace\";\n      this.circle.ctx.fillStyle = 'white';\n      this.circle.ctx.fillText(`You made it to wave ${this.finalWave}. Good job?`, this.canvas.width / 2 - 100, 200);\n      this.circle.damageAnimation();\n    }\n  }\n\n  checkWaves(){\n    if (this.waveNum < 4 && this.waveCount > 3) {\n      this.handleWaveCheck();\n    } else if (this.waveNum >= 4 && this.waveNum < 10 && this.waveCount > 6) {\n      this.handleWaveCheck();\n    } else if (this.waveNum >= 10 && this.waveCount > 20) {\n      this.factoryNum = 10;\n      this.handleWaveCheck();\n    } else {\n      this.fleet.forEach(enemy => {\n        enemy.draw();\n      });\n      this.moveFleetDown();\n    } \n  }\n\n  handleWaveCheck(){\n    if (!this.gameOver) {\n      this.waveNum += 1;\n      this.healthCount = 0;\n    }\n    this.waveCount = 1;\n    this.enemyFactory(this.factoryNum);\n  }\n\n  player(){\n    this.circle = new Circle({ \n      pos: [400, 570], \n      vel: [0,0], \n      radius: 15, \n      color: 'red', \n      game: this,\n    });\n    if (this.firstGame){\n      document.addEventListener(\"keydown\", (key) => {\n        this.circle.handleKeypress(key);\n      });\n      document.addEventListener(\"keyup\", (key) => {\n        this.circle.stopMovement(key);\n      });\n    }\n  }\n\n  enemyFactory(fleetCount) {\n    let fleetObjPos = Math.floor(400 / fleetCount);\n    let localFleet = [];\n    for (let i = 0; i < fleetCount; i++) {\n      let localShape;\n      if (this.waveNum === 1) {\n        localShape = 'tri';\n      } else if (this.waveNum === 2){\n        localShape = 'rect';\n      } else if (this.waveNum === 3) {\n        localShape = shapeNames[i%2];\n      } else if (this.waveNum === 4) {\n        localShape = \"pent\";\n      } else if (this.waveNum > 4) {\n        localShape = shapeNames[i%3];\n      }\n      localFleet.push(new Enemy({ pos: [fleetObjPos, 40], vel: [0, 0], radius: 30, color: 'blue', game: this, shape: localShape}));\n      fleetObjPos = fleetObjPos + Math.floor(800 / fleetCount);\n    }\n    this.fleet = localFleet;\n  }\n\n\n  moveFleetDown() {\n    if (this.fleet[0].pos[1] < 595) {\n      this.fleet.forEach(enemy => {\n        if (Math.floor(Math.random() * 2) === 0) {\n          enemy.right = true;\n          enemy.left = false;\n        } else {\n          enemy.left = true;\n          enemy.right = false;\n        }\n        enemy.move();\n      });\n    } else {\n      this.waveCount += 1;\n      this.enemyFactory(this.factoryNum);\n    }\n  }\n\n  moveHealthDown() {\n    if (this.health[0] && this.health[0].pos[1] < 595) {\n      this.health[0].move();\n    } else if (!this.health[0]) {\n      this.health = [new Health({\n        pos: [400, 50],\n        vel: [0, 0],\n        radius: 10,\n        color: 'orange',\n        game: this,\n      })];\n    } else {\n      delete this.health[0];\n      this.healthCount += 1;\n    }\n  }\n  moveHurtCircs() {\n    if (this.hurtCircs.length > 1) {\n      this.hurtCircs.forEach(hurtCirc => {\n        hurtCirc.move();\n        hurtCirc.draw();\n      });\n    }\n  }\n  moveAttack() {\n    this.attack.forEach(attackCirc => {\n      attackCirc.move();\n      attackCirc.draw();\n    });\n  }\n\n  collisionDetection(){\n    this.fleet.forEach((fleetObj, i) => {\n      let dx = this.circle.pos[0] - fleetObj.pos[0];\n      let dy = this.circle.pos[1] - fleetObj.pos[1];\n      let distance = Math.sqrt(dx * dx + dy * dy);\n      \n      if (distance < this.circle.radius + fleetObj.radius - 4) {\n        this.circle.handleCollision(fleetObj, i);\n      }\n    });\n    this.health.forEach((healthObj, i) => {\n      let dx = this.circle.pos[0] - healthObj.pos[0];\n      let dy = this.circle.pos[1] - healthObj.pos[1];\n      let distance = Math.sqrt(dx * dx + dy * dy);\n\n      if (distance < this.circle.radius + healthObj.radius) {\n        this.circle.handleCollision(healthObj, i);\n      }\n    });\n    this.attack.forEach((attackObj, iA) => {\n      this.fleet.forEach((fleetObj, iF) => {\n        let dx = fleetObj.pos[0] - attackObj.pos[0];\n        let dy = fleetObj.pos[1] - attackObj.pos[1];\n        let distance = Math.sqrt(dx * dx + dy * dy);\n  \n        if (distance < fleetObj.radius + attackObj.radius) {\n          attackObj.handleCollision(fleetObj, iA, iF);\n        }\n      });\n    });\n  }\n}\n\nconst shapeNames = [\n  'tri', \n  'rect',\n  'pent', \n];\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/health.js":
/*!***********************!*\
  !*** ./src/health.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nclass Health extends MovingObject {\n  constructor(props) {\n    super(props);\n    this.radius = 10;\n    this.color = \"red\";\n    this.down = true;\n  }\n\n  draw() {\n    this.ctx.fillStyle = this.color;\n    this.ctx.beginPath();\n\n    this.ctx.arc(\n      this.pos[0],\n      this.pos[1],\n      this.radius,\n      0,\n      2 * Math.PI,\n      false\n    );\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n\n}\n\nmodule.exports = Health;\n\n//# sourceURL=webpack:///./src/health.js?");

/***/ }),

/***/ "./src/hurt.js":
/*!*********************!*\
  !*** ./src/hurt.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\n\nclass Hurt extends MovingObject {\n  constructor(props) {\n    super(props);\n  }\n\n  \n  draw() {\n    if (this.shape === \"circle\"){\n      this.color = 'red';\n      this.drawCircle();\n    }else if (this.shape === \"rect\") {\n      this.color = 'blue';\n      this.drawRect();\n    } else if (this.shape === \"tri\") {\n      this.color = 'yellow';\n      this.drawTri();\n    } else if (this.shape === \"pent\") {\n      this.color = '#25fd03';\n      this.drawPent();\n    }\n  }\n  drawCircle() {\n    this.ctx.fillStyle = this.color;\n    this.ctx.beginPath();\n    this.ctx.arc(\n      this.pos[0],\n      this.pos[1],\n      this.radius,\n      0,\n      2 * Math.PI,\n      false\n    );\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n  drawTri() {\n    this.ctx.fillStyle = this.color;\n    this.ctx.beginPath();\n    this.ctx.moveTo(this.pos[0], this.pos[1]);\n    this.ctx.lineTo((this.pos[0] + this.radius / 2), (this.pos[1] + this.radius));\n    this.ctx.lineTo((this.pos[0] - this.radius / 2), (this.pos[1] + this.radius));\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n  drawRect() {\n    this.ctx.fillStyle = this.color;\n    this.ctx.beginPath();\n    this.ctx.fillRect(this.pos[0], this.pos[1], this.radius, this.radius);\n    this.ctx.closePath();\n  }\n  pentagon(x, y, radius, rotation) {\n    for (var i = 0; i < 5; i++) {\n      const ang = (i / 5) * Math.PI * 2 + rotation;\n      this.ctx.lineTo(\n        Math.cos(ang) * radius + x,\n        Math.sin(ang) * radius + y\n      );\n    }\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n  drawPent() {\n    this.ctx.fillStyle = this.color;\n    this.ctx.beginPath();\n    this.pentagon(this.pos[0], this.pos[1], this.radius/2, -Math.PI / 2);\n    this.ctx.stroke();\n  }\n\n}\n\nmodule.exports = Hurt;\n\n//# sourceURL=webpack:///./src/hurt.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const game = new Game();\n  game.startScreen();\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class MovingObject {\n\tconstructor(props) {\n\t\tthis.pos = props.pos;\n\t\tthis.vel = props.vel;\n\t\tthis.radius = props.radius;\n\t\tthis.color = props.color;\n\t\tthis.game = props.game;\n\t\tthis.shape = props.shape;\n\t\tthis.canvas = document.getElementById('game-canvas');\n\t\tthis.ctx = this.canvas.getContext('2d');\n\t\tthis.up = false;\n\t\tthis.down = false;\n\t\tthis.right = false;\n\t\tthis.left = false;\n\t\tthis.draw = this.draw.bind(this);\n\t}\n\n\tmove() {\n\t\tlet velocity;\n\t\tthis.checkIfInBounds();\n\t\tif (this.constructor.name === \"Enemy\" || this.constructor.name === \"Health\") {\n\t\t\tvelocity = [this.game.waveNum, this.game.waveNum];\n\t\t} else {\n\t\t\tvelocity = this.vel;\n\t\t}\n\t\tif (this.left) {\n\t\t\tthis.vel[0] += 0.5;\n\t\t\tthis.pos[0] -= velocity[0] + 2;\n\t\t} \n\t\tif (this.right) {\n\t\t\tthis.vel[0] += 0.5;\n\t\t\tthis.pos[0] += velocity[0] + 2;\n\t\t} \n\t\tif (this.down) {\n\t\t\tthis.vel[1] += 0.5;\n\t\t\tthis.pos[1] += velocity[1] + 3;\n\t\t} \n\t\tif (this.up) {\n\t\t\tthis.vel[1] += 0.3;\n\t\t\tthis.pos[1] -= velocity[1] + 2;\n\t\t}\n\t\tif (this.attacking) {\n\t\t\tthis.attack();\n\t\t}\n\t}\n\n\tcheckIfInBounds(){\n\t\tif (!this.inBoundsLeft()) {\n\t\t\tthis.left = false;\n\t\t} \n\t\tif (!this.inBoundsRight()) {\n\t\t\tthis.right = false;\n\t\t} \n\t\tif (!this.inBoundsDown()) {\n\t\t\tthis.down = false;\n\t\t} \n\t\tif (!this.inBoundsUp()) {\n\t\t\tthis.up = false;\n\t\t}\n\t}\n\n\tinBoundsRight(){\n\t\tif (this.constructor.name === \"Hurt\") {\n\t\t\tif (this.pos[0] > this.canvas.width) {\n\t\t\t\tdelete this.game.hurtCircs[this.game.hurtCircs.indexOf(this)];\n\t\t\t\treturn false;\n\t\t\t}\n\t\t} else if (this.pos[0] > this.canvas.width - 30) {\n\t\t\treturn false;\n\t\t}\n\t\treturn true;\n\t}\n\tinBoundsLeft() {\n\t\tif (this.constructor.name === \"Hurt\" ) {\n\t\t\tif (this.pos[0] < 0) {\n\t\t\t\tdelete this.game.hurtCircs[this.game.hurtCircs.indexOf(this)];\n\t\t\t\treturn false;\n\t\t\t}\n\t\t} else if (this.pos[0] < 20) {\n\t\t\treturn false;\n\t\t}\n\t\treturn true;\n\t}\n\tinBoundsUp() {\n\t\tif (this.constructor.name === \"Circle\" && this.pos[1] < 100) {\n\t\t\treturn false;\n\t\t} else if (this.constructor.name === \"Hurt\") {\n\t\t\tif (this.pos[1] < 0) {\n\t\t\t\tdelete this.game.hurtCircs[this.game.hurtCircs.indexOf(this)];\n\t\t\t\treturn false;\n\t\t\t}\n\t\t} else if (this.constructor.name === \"Attack\"){\n\t\t\tif (this.pos[1] < 0){\n\t\t\t\tdelete this.game.attack[this.game.attack.indexOf(this)];\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}else if (this.pos[1] < 20) {\n\t\t\treturn false;\n\t\t}\n\t\treturn true;\n\t}\n\tinBoundsDown() {\n\t\tif (this.constructor.name === \"Circle\" && this.pos[1] > this.canvas.height - 30) {\n\t\t\treturn false;\n\t\t} else if (this.constructor.name === \"Hurt\") {\n\t\t\tif (this.pos[1] > this.canvas.height) {\n\t\t\t\tdelete this.game.hurtCircs[this.game.hurtCircs.indexOf(this)];\n\t\t\t\treturn false;\n\t\t\t}\n\t\t} else if (this.pos[1] > this.canvas.height - 5) {\n\t\t\treturn false;\n\t\t}\n\t\treturn true;\n\t}\n}\n\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ })

/******/ });