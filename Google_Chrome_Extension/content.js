// chrome.storage.sync.clear();
// console.log("Data Clear!!!");

chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "log") {
        console.log(request.log);
        return;
    }
    let storageData = null;
    chrome.storage.sync.get(["changeColorExtension"]).then((result) => {
        console.log("resultBefore", result);
        storageData = result["changeColorExtension"] === undefined ? {} : result["changeColorExtension"];
        console.log("storageData", storageData);

        if (request.type === "change") {
            console.log("Data: ", storageData);
            console.log("=====change=====")
            changeColor(storageData);
        }
        if (request.type === "add") {
            console.log("=====add=====");
            console.log("Data: ", storageData);
            storageData[request.inputTag] = request.inputColor;

            chrome.storage.sync.set({
                changeColorExtension: storageData
            });

            chrome.storage.sync.get(["changeColorExtension"]).then((result) => {
                console.log("resultAfter", result);
            });
            changeColor(storageData);
        }
    });
    return true;
})

let tf = true;

function changeColor(data) {
    console.log("data", data);
    const keys = Object.keys(data);
    console.log("keys", keys);
    let textCopy = document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("iframe")[0];
    if (textCopy === undefined) {
        textCopy = document.getElementsByTagName("iframe")[1].contentDocument.getElementsByTagName("iframe")[0].contentDocument;
    } else {
        textCopy = textCopy.contentDocument;
    }
    const body = textCopy.body;
    for (let i = 0; i < keys.length; i++){
        const inputTag = keys[i];
        console.log(inputTag);
        const tagElement = body.getElementsByTagName(inputTag);
        console.log("tagElement", tagElement);
        for (let j = 0; j < tagElement.length; j++) {
            console.log(tagElement[j]);
            changeElemBackColor(tagElement[j], data[inputTag]);
        }
    }
}

function changeElemColor(elem, color) {
    elem.style.color = color;
}

function changeElemBackColor(elem, color) {
    elem.style.backgroundColor = color;
}