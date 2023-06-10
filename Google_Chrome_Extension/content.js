chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "log") {
        console.log(request.log);
        return;
    }
    if (request.type === "clear") {
        chrome.storage.sync.clear();
        console.log("=====data clear=====");
    }
    let storageData = null;
    const { inputTag, inputStyleAtt, inputStyleVal } = request
    chrome.storage.sync.get(["changeColorExtension"]).then((result) => {
        console.log("resultBefore", result);
        storageData = result["changeColorExtension"] === undefined ? {} : result["changeColorExtension"];
        console.log("storageData", storageData);

        if (request.type === "change") {
            console.log("=====change=====")
            console.log("Data: ", storageData);
            changeColor(storageData);
        }
        if (request.type === "add") {
            console.log("=====add=====");
            console.log("Data: ", storageData);
            const tagObj = storageData[inputTag] === undefined ? {} : storageData[inputTag];
            tagObj[inputStyleAtt] = inputStyleVal;
            storageData[inputTag] = tagObj;

            chrome.storage.sync.set({
                changeColorExtension: storageData
            });
            changeColor(storageData);
        }
    });
    return true;
});

function changeColor(data) {
    console.log("data", data);
    const tags = Object.keys(data);
    console.log("keys", tags);
    let textCopy = document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("iframe")[0];
    if (textCopy === undefined) {
        textCopy = document.getElementsByTagName("iframe")[1].contentDocument.getElementsByTagName("iframe")[0];
    }
    textCopy = textCopy.contentDocument;
    const body = textCopy.body;
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        console.log(tag);
        const tagElements = body.getElementsByTagName(tag);
        const tagData = data[tag];
        for (let j = 0; j < tagElements.length; j++) {
            const tagElement = tagElements[j];
            for (att in tagData) {
                changeElemStyle(tagElement, att, tagData[att]);
            }
        }
    }
}

function changeElemColor(elem, color) {
    elem.style.color = color;
}

function changeElemBackColor(elem, color) {
    elem.style.backgroundColor = color;
}

function changeElemStyle(elem, attribute, value) {
    elem.style[attribute] = value;
}