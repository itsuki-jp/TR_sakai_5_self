const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class GameObject {
    constructor(size, pos) {
        this.size = size;
        this.pos = pos;
    }
}

class Magnet extends GameObject {
    constructor(size, pos) {
        super(size, pos);
    }
}

class Player extends GameObject {
    constructor(size, pos) {
        super(size, pos);
    }
}

class Enemy extends GameObject {
    constructor(size, pos) {
        super(size, pos);
    }
}

class Game {
    constructor(size, canvas, ctx) {
        this.size = size;
        this.canvas = canvas;
        this.ctx = ctx;
        this.initScreen();
    }
    initScreen() {
        this.canvas.height = this.size.y;
        this.canvas.width = this.size.x;
        this.clearScreen();
    }
    clearScreen() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, this.size.x, this.size.y);
    }
}

const gameSize = { x: 300, y: 600 };
const game = new Game(gameSize, canvas, ctx);
const magnets = [];
const player = new Player({ x: 30, y: 30 }, { x: 0, y: 0 });
const enemies = [];