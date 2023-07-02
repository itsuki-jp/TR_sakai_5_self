class GameObject {
  constructor(size, pos, elem) {
    this.size = size;
    this.pos = pos;
    this.elem = elem;
  }
  move(dx, dy) {
    this.pos.x += dx;
    this.pos.y += dy;
  }
}

class Magnet extends GameObject {
  constructor(size, pos, elem) {
    super(size, pos, elem);
  }
}

class Player extends GameObject {
  constructor(size, pos, elem) {
    super(size, pos, elem);
  }
}

class Enemy extends GameObject {
  constructor(size, pos, elem) {
    super(size, pos, elem);
  }
}

class Game {
  constructor(size, canvas, ctx, imgSrc) {
    this.size = size;
    this.canvas = canvas;
    this.ctx = ctx;
    this.imgSrc = imgSrc;

    this.player = new Player(
      { x: 50, y: 50 },
      { x: 50, y: 50 },
      imgSrc.playerImg
    );
    this.enemies = [];
    this.magnets = [];
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
    this.ctx.fillRect(100, 0, this.size.x - 200, this.size.y);
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
    const newEnemy = new Enemy(
      { x: 50, y: 50 },
      { x: 50, y: 0 },
      this.imgSrc.enemyImg
    );
    this.enemies.push(newEnemy);
  }
  addMagnet(pos) {
    const newMagnet = new Magnet({ x: 50, y: 50 }, pos, this.imgSrc.magnetImg);
    this.magnets.push(newMagnet);
    console.log(this.magnets);
  }
  update() {
    this.initScreen();
    // enemiesを下に移動する
    for (let i = 0; i < this.enemies.length; i++) {
      let enemy = this.enemies[i];
      enemy.move(0, 1);
    }
    this.drawObj(this.player);
    this.drawObjs(this.enemies);
    this.drawObjs(this.magnets);
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const magnetImg = new Image();
magnetImg.src = "./img/magnet.png";
const enemyImg = new Image();
enemyImg.src = "./img/poke_ball.png";
const playerImg = new Image();
playerImg.src = "./img/magneton.png";

const gameSize = { x: 500, y: 600 };
const game = new Game(gameSize, canvas, ctx, {
  magnetImg,
  enemyImg,
  playerImg,
});

setInterval(() => {
  game.update();
  console.log("update");
}, 100);
