console.log("AAAAAAAAAAAAAAAAA===========================")
chrome.runtime.onMessage.addListener((request) => {
    console.log("A");
    console.log(request);
    console.log(request.type !== "change");
    if (request.type !== "change") return;
    changeColor(request);
    return true;
})

let tf = true;

function changeColor({ inputTag, inputColor }) {
    console.log(inputColor, inputTag);
    const textCopy = document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("iframe")[0].contentDocument
    const body = textCopy.body;
    const tagElement = body.getElementsByTagName(inputTag);
    console.log(tagElement);
    for (let i = 0; i < tagElement.length; i++) {
        console.log(i);
        changeElemBackColor(tagElement[i], inputColor);
    }
}

function changeElemColor(elem, color) {
    elem.style.color = color;
}

function changeElemBackColor(elem, color) {
    elem.style.backgroundColor = color;
}