class Vector2 {

  // コンストラクタではxとyを初期化するだけ
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // xとyをセットする
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  // ベクトルの複製
  clone() {
    return new Vector2(this.x, this.y);
  }

  // 足し算：渡されたベクトルのxとyを自分のxとyに足す
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  // 引き算：渡されたベクトルのxとyを自分のxとyから引く
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  // 実数倍：渡された数値を自分のxとyにかける
  mul(num) {
    this.x *= num;
    this.y *= num;
    return this;
  }

  // 逆ベクトル
  get inverse() {
    // 自分を-1倍すれば逆ベクトルになる
    // 複製を作る事で自分自身の中身は変えずに済む
    return this.clone().mul(-1);
  }

  // ベクトルの大きさ
  get magnitude() {
    const { x, y } = this;
    // ベクトルの大きさはx成分の二乗とy成分の二乗のルート
    return Math.sqrt(x ** 2 + y ** 2);
  }

  // 正規化されたベクトル
  get normalized() {
    const { x, y, magnitude } = this;
    // ベクトルの正規化はxとyを大きさ(magnitude)で割る
    return new Vector2(x / magnitude, y / magnitude);
  }

  // 足し算：static バージョン
  static add(v1, v2) {
    return v1.clone().add(v2);
  }

  // 引き算：static バージョン
  static sub(v1, v2) {
    return v1.clone().sub(v2);
  }

  // 実数倍：static バージョン
  static mul(v1, num) {
    return v1.clone().mul(num);
  }

  // 内積
  static dot(v1, v2) {
    // 内積は２つのベクトルのx同士、y同士をかけて足したモノ
    return (v1.x * v2.x + v1.y * v2.y);
  }

  // 外積
  static cross(v1, v2) {
    // 外積は２つのベクトルのxyをそれぞれかけて引いたモノ
    return (v1.x * v2.y - v1.y * v2.x);
  }

  // ２点間の距離
  static distance(v1, v2) {
    // ２つのベクトルの間の距離は
    // 引き算した結果のベクトルの大きさ
    return Vector2.sub(v1, v2).magnitude;
  }

  // ２つのベクトルが平行かどうか
  static isParallel(v1, v2) {
    // 外積の結果が0だったら平行
    return (Vector2.cross(v1, v2) === 0);
  }

  // ２つのベクトルが垂直かどうか
  static isVertical(v1, v2) {
    // 内積の結果が0だったら垂直
    return (Vector2.dot(v1, v2) === 0);
  }

  // ゼロベクトル
  static get zero() {
    return new Vector2(0, 0);
  }

  // xとyが1のベクトル
  static get one() {
    return new Vector2(1, 1);
  }

  // 右向きのベクトル
  static get right() {
    return new Vector2(1, 0);
  }

  // 左向きのベクトル
  static get left() {
    return new Vector2(-1, 0);
  }

  // 上向きのベクトル
  static get up() {
    return new Vector2(0, 1);
  }

  // 下向きのベクトル
  static get down() {
    return new Vector2(0, -1);
  }
}

class GameObject {
  constructor(x, y) {
    this.pos = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
    this.elem = null;
    this.size = null;
  }
  update() { }
  display(ctx) {
    ctx.drawImage(this.elem, this.pos.x, this.pos.y, this.size.x, this.size.y);
  }
}
class Mover extends GameObject {
  constructor(x, y, m) {
    super(x, y);
    this.mass = m;
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
  }
  applyForce(force) {
    let f = Vector2.mul(force, 1 / this.mass);
    this.acceleration.add(f);
  }
  update() {
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.acceleration.mul(0);
  }
  calculateAttraction(m) {
    let force = Vector2.sub(this.pos, m.pos);
    let distance = force.magnitude;
    distance = Math.min(Math.max(distance, 5.0), 25.0);
    force = force.normalized;
    let strength = (this.mass * m.mass) / (distance * distance);
    force.mul(strength);
    return force;
  }
}

class Magnet extends Mover {
  constructor(x, y, m, size) {
    super(x, y, m);
    this.elem = new Image();
    this.elem.src = "./img/magnet.png";
    this.size = size;
  }
  update() {
    this.size.x -= 0.1;
    this.size.y -= 0.1;
    this.mass -= 0.001
  }
}

class Player extends Mover {
  constructor(x, y, m, size) {
    super(x, y, m);
    this.size = size;
    this.elem = new Image();
    this.elem.src = "./img/magneton.png";
  }

}

class Enemy extends Mover {
  constructor(x, y, m, size, vel) {
    super(x, y, m);
    this.size = size;
    this.velocity = new Vector2(0, vel);
    this.elem = new Image();
    this.elem.src = "./img/poke_ball.png";
  }
  update() {
    this.pos.add(this.velocity);
  }
}

class Game {
  constructor(size, canvas, ctx) {
    this.size = size;
    this.canvas = canvas;
    this.ctx = ctx;

    this.player = new Player(225, 500, 30, { x: 50, y: 50 })
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
    obj.display(this.ctx);
  }
  drawObjs(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.drawObj(arr[i]);
    }
  }
  updateObj(obj) {
    obj.update();
  }
  updateObjs(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.updateObj(arr[i]);
    }
  }
  addEnemy() {
    const newEnemy = new Enemy(Math.random() * (this.size.x - this.space * 2) + this.space, 0, 10, { x: 50, y: 50 }, 2)
    this.enemies.push(newEnemy);
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
    const newMagnet = new Magnet(pos.x, pos.y, 20, { x: 50, y: 50 });
    this.magnets.push(newMagnet);
  }
  update() {
    this.initScreen();
    for (let i = 0; i < this.magnets.length; i++) {
      let force = this.magnets[i].calculateAttraction(this.player);
      this.player.applyForce(force);
    }

    this.updateObj(this.player);
    this.drawObj(this.player);

    this.updateObjs(this.enemies);
    this.drawObjs(this.enemies);

    this.updateObjs(this.magnets);
    this.drawObjs(this.magnets);

  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameSize = { x: 500, y: 600 };
canvas.height = gameSize.y;
canvas.width = gameSize.x;
const game = new Game(gameSize, canvas, ctx);

setInterval(() => {
  game.update();
}, 60);

let movers = [];
for (let i = 0; i < 2; i++) {
  movers[i] = new Mover(Math.random() * 400, Math.random() * 300, 10);
}

draw = function () {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, gameSize.x, gameSize.y);

  for (let i = 0; i < movers.length; i++) {
    for (let j = 0; j < movers.length; j++) {
      if (i !== j) {
        let force = movers[j].calculateAttraction(movers[i]);
        movers[i].applyForce(force);
      }
    }
  }

  for (let i = 0; i < 1; i++) {
    movers[i].update();
    ctx.fillStyle = "grey";
    ctx.fillRect(movers[i].pos.x, movers[i].pos.y, 50, 50);
    // console.log(movers[i].x, movers[i].y)
  }
  ctx.fillRect(movers[1].pos.x, movers[1].pos.y, 50, 50);
};

// setInterval(() => {
//   draw()
// }, 10);