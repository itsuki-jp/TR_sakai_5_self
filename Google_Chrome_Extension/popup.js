// "Todo: https://*.nnn.ed.nico/courses/*" 以外のサイトの場合，alertを表示する
document.getElementById("changeBtn").addEventListener("click", function () {
    sendLog("clicked:changeBtn");
    const obj = {
        type: "change",
    }
    sendContent(obj);
});

document.getElementById("clearBtn").addEventListener("click", () => { 
    sendLog("clicked:clearBtn");
    const obj = {
        type: "clear",
    }
    sendContent(obj);
});

document.getElementById("addBtn").addEventListener("click", function () {
    sendLog("clicked:addBtn");
    const inputTag = document.getElementById("inputTag").value;
    const inputStyleAtt = document.getElementById("inputStyleAttribute").value;
    const inputStyleVal = document.getElementById("inputStyleValue").value;
    if (inputTag === "" || inputStyleAtt === "") return;

    const obj = {
        type: "add",
        inputTag,
        inputStyleVal,
        inputStyleAtt
    };
    sendContent(obj);
});

document.getElementById("listVisibility").addEventListener("click", () => {
    const optionList = document.getElementById("optionList");
    optionList.hidden = !optionList.hidden;
    if (optionList.hidden === false) {
        updateOptionList()
    }
});

function updateOptionList() {
    chrome.storage.sync.get(["changeColorExtension"]).then((result) => {
        const storageData = result["changeColorExtension"] === undefined ? {} : result["changeColorExtension"];
        const tags = Object.keys(storageData);
        tags.sort();
        const optionListElem = document.getElementById("optionList");
        optionListElem.innerHTML = "";
        for (let tagIdx = 0; tagIdx < tags.length; tagIdx++) {
            const liTag = document.createElement("li");
            liTag.innerText = tags[tagIdx];
            optionListElem.appendChild(liTag);
            const ulAtt = document.createElement("ul");
            optionListElem.appendChild(ulAtt);
            const att = Object.keys(storageData[tags[tagIdx]]);
            att.sort();
            for (let i = 0; i < att.length; i++){
                const liAtt = document.createElement("li");
                liAtt.innerText = `${att[i]}:${storageData[tags[tagIdx]][att[i]]}`;
                ulAtt.appendChild(liAtt);
            }
        }
    });
}

function sendContent(content) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tab) {
        chrome.tabs.sendMessage(tab[0].id, content)
    })
}

function sendLog(content) {
    sendContent({ type: "log", log: content })
}