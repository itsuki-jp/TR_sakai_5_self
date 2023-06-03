console.log("AAAAAAAAAAAAAAAAA===========================")
chrome.runtime.onMessage.addListener((request) => {
    console.log("AAAAA");
    if (request !== "change") return
    changeColor();
    return true;
})

let tf = true;

function changeColor() {
    const textCopy = document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("iframe")[0].contentDocument
    const body = textCopy.body;
    body.getElementsByTagName("h1")[0].style.backgroundColor = "red";

    tf = !tf;

    const h1 = body.getElementsByTagName("h1");
    for (let i = 0; i < h1.length; i++) {
        changeElemBackColor(h1[i], tf ? "red" : "pink");
    }

    const h2 = body.getElementsByTagName("h2");
    for (let i = 0; i < h2.length; i++) {
        changeElemBackColor(h2[i], tf ? "pink" : "red");
        changeElemColor(h2[i], tf ? "red" : "pink");
    }
}

function changeElemColor(elem, color) {
    elem.style.color = color;
}

function changeElemBackColor(elem, color) {
    elem.style.backgroundColor = color;
}