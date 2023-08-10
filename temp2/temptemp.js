var textarea = document.querySelector('textarea')
var q = textarea.value;
if (q === "重力") {
    //fallKitty(15 ,0, 0);
    fallKitties();
}

if (q === "ハローキティ") {
    //fallKitty(15 ,0, 0);
    fallKitties();
}

if (q === "HELLO KITTY") {
    //fallKitty(15 ,0, 0);
    fallKitties();
}

if (q === "hello kitty") {
    //fallKitty(15 ,0, 0);
    fallKitties();
}

if (q === "Hello Kitty") {
    //fallKitty(15 ,0, 0);
    fallKitties();
}

if (q === "キティちゃん") {
    //fallKitty(15 ,0, 0);
    fallKitties();
}

function fallKitty(speed, x, y, src) {
    var img = document.createElement('img');
    img.src = src
    console.log(img);
    img.className = "k";

    img.style.left = x + 'px';
    img.style.top = y + 'px';
    window.setInterval(function () {
        var top = img.style.top.replace('px', '')
        img.style.top = Number(top) + speed + 'px';
    }, 300)

    document.body.appendChild(img);

}

function fallKitties() {
    for (var i = 0; i < 30; i++) {
        if (i % 3 == 0) {
            fallKitty(Math.random() * 9 + 7, i * 50, Math.random() * 9 + 10, "https://github.com/rion-ribbon/CUTE/blob/main/apple.png?raw=true");
        } else if (i % 3 == 1) {
            fallKitty(Math.random() * 9 + 7, i * 50, Math.random() * 9 + 10, "https://github.com/rion-ribbon/CUTE/blob/main/milk.png?raw=true");
        }
        else if (i % 3 == 2) {
            fallKitty(Math.random() * 9 + 7, i * 50, Math.random() * 9 + 10, "https://github.com/rion-ribbon/b/blob/main/k.png?raw=true");
        }
    }
}

//生成した乱数を変数「random」に代入する
var random = Math.random() * 9 + 1;
console.log(random);


var textarea = document.querySelector('textarea')
var r = textarea.value;

if (r === "サンリオ") {
    //fallcharacter(15 ,0, 0);
    fallCharacteres();
}


function fallCharacter(speed, x, y, src) {
    var img = document.createElement('img');
    img.src = src
    console.log(img);
    img.className = "c";

    img.style.left = x + 'px';
    img.style.top = y + 'px';
    window.setInterval(function () {
        var top = img.style.top.replace('px', '')
        img.style.top = Number(top) + speed + 'px';
    }, 300)

    document.body.appendChild(img);

}

function fallCharacteres() {
    for (var i = 0; i < 30; i++) {
        if (i % 3 == 0) {
            fallCharacter(Math.random() * 9 + 7, i * 50, Math.random() * 9 + 10, "https://github.com/rion-ribbon/CUTE/blob/main/mymelody.png?raw=true");
        }
        else if (i % 3 == 1) {
            fallCharacter(Math.random() * 9 + 7, i * 50, Math.random() * 9 + 10, "https://github.com/rion-ribbon/CUTE/blob/main/piano.png?raw=true");
        }
        else if (i % 3 == 2) {
            fallCharacter(Math.random() * 9 + 7, i * 50, Math.random() * 9 + 10, "https://github.com/rion-ribbon/CUTE/blob/main/pochacco.png?raw=true");
        }

    }
}

//生成した乱数を変数「random」に代入する
var random = Math.random() * 9 + 1;
console.log(random);