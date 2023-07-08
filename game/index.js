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
  constructor(m, x, y) {
    this.mass = m;
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
  }
  applyForce(force) {
    var f = Vector2.mul(force, 1 / this.mass);
    this.acceleration.add(f);
  }
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mul(0);
  }
  display() {
    // stroke(0);
    // strokeWeight(2);
    // fill(255, 255, 255, 127);
    // ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  }
  calculateAttraction(m) {
    // Calculate direction of force
    let force = Vector2.sub(this.position, m.position);
    // Distance between objects
    let distance = force.magnitude;
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = Math.min(Math.max(distance, 5.0), 25.0);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction                            
    force = force.normalized;
    // Calculate gravitional force magnitude
    var strength = (G * this.mass * m.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mul(strength);
    return force;
  }
}

class Magnet extends GameObject {
  constructor(size, pos, m = 10) {
    super(m, pos.x, pos.y);
    this.elem = new Image();
    this.elem.src = "./img/magnet.png";
    this.size = size;
  }
}

class Player extends GameObject {
  constructor(size, pos, vel = { x: 0, y: 0 }) {
    super(size, pos);
    this.elem = new Image();
    this.elem.src = "./img/magneton.png";
    this.vel = vel;
  }
  attractionCalc(obj) {
    const distance = this.distance(obj);
    return { x: obj.m / distance.x, y: obj.m / distance.y };
  }
  moveVel(vel) {
    this.vel.x += vel.x;
    this.vel.y += vel.y;
  }
  movePos() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
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
    for (let i = 0; i < this.magnets.length; i++) {
      let magnet = this.magnets[i];
      const vel = this.player.attractionCalc(magnet);
      this.player.moveVel(vel);
    }
    this.player.movePos();
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
}, 100);
