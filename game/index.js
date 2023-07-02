class GameObject {
  constructor(size, pos) {
    this.size = size;
    this.pos = pos;
  }
  move(dx, dy) {
    this.pos.x += dx;
    this.pos.y += dy;
  }
}

class Magnet extends GameObject {
  constructor(size, pos, power = 10) {
    super(size, pos);
    this.elem = new Image();
    this.elem.src = "./img/magnet.png";
    this.power = power;
  }
}

class Player extends GameObject {
  constructor(size, pos) {
    super(size, pos);
    this.elem = new Image();
    this.elem.src = "./img/magneton.png";
    this.vel = vel;
  }
  attraction(obj) {}
}

class Enemy extends GameObject {
  constructor(size, pos, vel = 1) {
    super(size, pos);
    this.elem = new Image();
    this.elem.src = "./img/poke_ball.png";
    this.vel = vel;
  }
}

class Game {
  constructor(size, canvas, ctx) {
    this.size = size;
    this.canvas = canvas;
    this.ctx = ctx;

    this.player = new Player({ x: 50, y: 50 }, { x: 225, y: 500 });
    this.enemies = [];
    this.magnets = [];
    this.space = 100;
    this.addEnemy();

    document.addEventListener("click", (e) => {
      const rect = e.target.getBoundingClientRect();

      const viewX = e.clientX - rect.left;
      const viewY = e.clientY - rect.top;

      const scaleWidth = canvas.clientWidth / canvas.width;
      const scaleHeight = canvas.clientHeight / canvas.height;

      const canvasX = Math.floor(viewX / scaleWidth);
      const canvasY = Math.floor(viewY / scaleHeight);
      this.addMagnet({ x: canvasX, y: canvasY });
    });
  }
  initScreen() {
    this.canvas.height = this.size.y;
    this.canvas.width = this.size.x;
    this.clearScreen();
  }
  clearScreen() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, 0, this.size.x, this.size.y);

    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(this.space, 0, this.size.x - this.space * 2, this.size.y);
  }
  drawObj(obj) {
    this.ctx.drawImage(obj.elem, obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
  }
  drawObjs(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.drawObj(arr[i]);
    }
  }
  addEnemy() {
    // const newEnemy = new Enemy({ x: 50, y: 50 }, { x: 50, y: 0 });
    const newEnemy = new Enemy(
      { x: 50, y: 50 },
      { x: Math.random() * (this.size.x - this.space * 2) + this.space, y: 0 }
    );
    this.enemies.push(newEnemy);
    console.log(this.space);
  }
  addMagnet(pos) {
    console.log(pos);
    if (
      pos.x < 0 ||
      (this.space < pos.x && pos.x < this.size.x - this.space) ||
      this.size.x < pos.x ||
      pos.y < 0 ||
      this.size.y < pos.y
    ) {
      return;
    }
    const newMagnet = new Magnet({ x: 50, y: 50 }, pos);
    this.magnets.push(newMagnet);
  }
  update() {
    this.initScreen();
    for (let i = 0; i < this.enemies.length; i++) {
      let enemy = this.enemies[i];
      enemy.move(0, enemy.vel);
    }
    this.drawObj(this.player);
    this.drawObjs(this.enemies);
    this.drawObjs(this.magnets);
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameSize = { x: 500, y: 600 };
const game = new Game(gameSize, canvas, ctx);

setInterval(() => {
  game.update();
  console.log("update");
}, 100);
