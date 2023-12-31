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

class Container {
  constructor() {
    this.elem = [];
  }
  push(elem) {
    this.elem.push(elem);
  }
  get length() {
    return this.elem.length;
  }
  getElem(i) {
    return this.elem[i];
  }
  update(size = null) {
    const newElem = [];
    for (let i = 0; i < this.elem.length; i++) {
      let res = null;
      if (size == null) {
        res = this.elem[i].update();
      } else {
        res = this.elem[i].update(size);
      }
      if (res) {
        newElem.push(this.elem[i]);
      }
    }
    this.elem = newElem;
  }
  isCollided(obj) {
    for (let i = 0; i < this.elem.length; i++) {
      const res = this.elem[i].isCollided(obj);
      if (res) {
        return true;
      }
    }
    return false;
  }
}

class GameObject {
  constructor(x, y, size) {
    this.pos = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
    this.elem = null;
    this.size = size;
  }
  update() { }
  display(ctx) {
    const { x: posX, y: posY } = this.pos;
    const { x: sizeX, y: sizeY } = this.size;
    ctx.drawImage(this.elem, posX - sizeX / 2, posY - sizeY / 2, sizeX, sizeY);
  }
  constrain(value, min, max) {
    if (value < min) {
      value = min;
    }
    if (max < value) {
      value = max;
    }
    return value;
  }
  min(value, min_v) {
    return value < min_v ? value : min_v;
  }
  max(value, max_v) {
    return value < max_v ? max_v : value;
  }
  isCollided(obj) {
    const x1 = this.pos.x;
    const y1 = this.pos.y;
    const width1 = this.size.x;
    const height1 = this.size.y;
    const x2 = obj.pos.x;
    const y2 = obj.pos.y;
    const width2 = obj.size.x;
    const height2 = obj.size.y;

    if (Math.abs(x1 - x2) * 2 < (width1 + width2) && Math.abs(y1 - y2) * 2 < (height1 + height2)) {
      return true;
    }
    return false;
  }
}
class Mover extends GameObject {
  constructor(x, y, m, size) {
    super(x, y, size);
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
    super(x, y, m, size);
    this.elem = new Image();
    this.elem.src = "./img/magnet.png";
    this.minSize = 10;
  }
  update() {
    this.size.x -= 0.1;
    this.size.y -= 0.1;

    if (this.size.x <= this.minSize) {
      return false;
    }
    return true;
  }
}

class Player extends Mover {
  constructor(x, y, m, size) {
    super(x, y, m, size);
    this.elem = new Image();
    this.elem.src = "./img/space_uchusen_bokan.png";
  }
  adjust(size, space) {
    const { x: sizeX, y: sizeY } = size;
    const { x: spaceX, y: spaceY } = space;

    if (this.pos.x < spaceX || sizeX - spaceX < this.pos.x) {
      this.velocity.x *= 0.01;
    }
    this.pos.x = this.constrain(this.pos.x, spaceX, sizeX - spaceX);
    this.pos.y = this.constrain(this.pos.y, 0, sizeY);
  }

}

class Enemy extends Mover {
  constructor(x, y, m, size, vel) {
    super(x, y, m, size);
    this.velocity = new Vector2(0, vel);
    this.elem = new Image();
    this.elem.src = "./img/onepiece11_arlong2.png";
  }
  update(size) {
    const { x: sizeX, y: sizeY } = size; // キャンバスのサイズ
    if (this.pos.x < -this.size.x || sizeX + this.size.x < this.pos.x || this.pos.y < -this.size.y || sizeY + this.size.x < this.pos.y) {
      return false;
    }
    this.pos.add(this.velocity);
    return true;
  }
}

class Game {
  constructor(size, canvas, ctx, data) {
    this.size = size;
    this.canvas = canvas;
    this.ctx = ctx;
    this.data = data;

    this.DARK_BLUE = "rgb(0, 128, 255)";
    this.LIGHT_BLUE = "rgb(139, 195, 252)";

    this.initGame();
    this.showOpening();
  }
  showOpening() {
    this.ctx.fillStyle = this.LIGHT_BLUE;
    this.ctx.fillRect(0, 0, this.size.x, this.size.y);

    this.ctx.font = "50px serif";
    this.ctx.fillStyle = this.DARK_BLUE;
    this.ctx.fillText("Magnet Manipulator", 25, 250);

    const btn = {};
    btn.pos = { x: 150, y: 300 };
    btn.size = { x: 200, y: 50 };
    this.ctx.fillStyle = this.DARK_BLUE;
    this.ctx.fillRect(btn.pos.x, btn.pos.y, btn.size.x, btn.size.y);

    this.ctx.font = "35px serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("PLAY", 205, 340);

    const handleClick = (e) => {
      const rect = e.target.getBoundingClientRect();

      const viewX = e.clientX - rect.left;
      const viewY = e.clientY - rect.top;

      const scaleWidth = canvas.clientWidth / canvas.width;
      const scaleHeight = canvas.clientHeight / canvas.height;

      const x = Math.floor(viewX / scaleWidth);
      const y = Math.floor(viewY / scaleHeight);
      if (btn.pos.x <= x && x <= btn.pos.x + btn.size.x && btn.pos.y <= y && y <= btn.pos.y + btn.size.y) {
        this.startInterval(handleClick);
      }
    }

    document.addEventListener("click", handleClick);
  }
  showEnding() {
    this.ctx.fillStyle = this.DARK_BLUE;
    this.ctx.fillRect(0, 0, this.size.x, this.size.y);

    this.ctx.font = "50px serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("GameOver...", 120, 300);
  }
  startInterval(temp) {
    document.removeEventListener("click", temp);
    document.addEventListener("click", (e) => {
      const rect = e.target.getBoundingClientRect();

      const viewX = e.clientX - rect.left;
      const viewY = e.clientY - rect.top;

      const scaleWidth = canvas.clientWidth / canvas.width;
      const scaleHeight = canvas.clientHeight / canvas.height;

      const canvasX = Math.floor(viewX / scaleWidth);
      const canvasY = Math.floor(viewY / scaleHeight);
      this.addMagnet({ x: canvasX, y: canvasY }, { x: 50, y: 50 });
    });
    this.interval = setInterval(() => {
      this.update();
    }, 20);
  }
  initGame() {
    this.player = new Player(225, 500, 30, { x: 100, y: 60 })
    this.enemies = new Container();
    this.magnets = new Container();
    this.space = { x: 100, y: 0 };
    this.cycle = 0;
  }
  clearScreen() {
    this.ctx.fillStyle = this.DARK_BLUE;
    this.ctx.fillRect(0, 0, this.size.x, this.size.y);

    this.ctx.fillStyle = this.LIGHT_BLUE;
    this.ctx.fillRect(this.space.x, 0, this.size.x - this.space.x * 2, this.size.y);
  }
  drawObj(obj) {
    obj.display(this.ctx);
  }
  drawObjs(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.drawObj(arr.getElem(i));
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
    if (!this.shouldAddEnemy()) return;
    const [idx, ...data] = this.data.pop();
    const newEnemy = new Enemy(...data);
    this.enemies.push(newEnemy);
  }
  addMagnet(pos, size) {
    if (
      pos.x < 0 ||
      (this.space.x < pos.x && pos.x < this.size.x - this.space.x) ||
      this.size.x < pos.x ||
      pos.y < 0 ||
      this.size.y < pos.y
    ) {
      return;
    }
    const newMagnet = new Magnet(pos.x, pos.y, 20, size);
    this.magnets.push(newMagnet);
  }
  shouldAddEnemy() {
    if (this.data.length === 0) { return false; }
    const data = this.data;
    const temp = data[data.length - 1][0];
    if (data[data.length - 1][0] < this.cycle) { return true; }
    return false;
  }
  update() {
    console.log(this.enemies.length)
    this.clearScreen();
    this.addEnemy()
    for (let i = 0; i < this.magnets.length; i++) {
      let force = this.magnets.getElem(i).calculateAttraction(this.player);
      this.player.applyForce(force);
    }

    this.updateObj(this.player);
    this.player.adjust(this.size, this.space);
    this.enemies.update(this.size);
    this.magnets.update();


    this.drawObj(this.player);
    this.drawObjs(this.enemies);
    this.drawObjs(this.magnets);

    this.cycle += 1;

    if (this.enemies.isCollided(this.player)) {
      console.log("collided!!!!!!!!!!!!!!!");
      clearInterval(this.interval);
      this.showEnding();
    }
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameSize = { x: 500, y: 600 };
canvas.height = gameSize.y;
canvas.width = gameSize.x;
space = { x: 100, y: 0 };

// time, x, y, m, size, vel
// [0, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, { x: 50, y: 50 }, 2]
const enemySize = { x: 64, y: 120 };
const enemyData = [
  [1000, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 2],
  // [950, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 4],
  [900, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 2],
  // [850, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 4],
  [800, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 4],
  // [750, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 2],
  [700, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 2],
  // [600, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 2],
  [500, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 2],
  // [400, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 2],
  [300, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 2],
  // [200, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 2],
  [100, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 2],
  [0, Math.random() * (gameSize.x - space.x * 2) + space.x, 0, 10, enemySize, 2]
]



const game = new Game(gameSize, canvas, ctx, enemyData);

const DARK_BLUE = "rgb(0, 128, 255)";
const LIGHT_BLUE = "rgb(139, 195, 252)";