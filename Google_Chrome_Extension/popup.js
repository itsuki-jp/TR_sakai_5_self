// "Todo: https://*.nnn.ed.nico/courses/*" 以外のサイトの場合，alertを表示する
document.getElementById("changeBtn").addEventListener("click", function () {
    sendLog("clicked:changeBtn");
    const obj = {
        type: "change",
    }
    sendContent(obj);
});

document.getElementById("addBtn").addEventListener("click", function () {
    sendLog("clicked:addBtn");
    const inputTag = document.getElementById("inputTag").value;
    const inputColor = document.getElementById("inputColor").value;
    if (inputTag === "" || inputColor === "") return;

    const obj = {
        type: "add",
        inputTag,
        inputColor
    };
    sendContent(obj);
});

document.getElementById("listVisibility").addEventListener("click", () => {
    const optionList = document.getElementById("optionList");
    optionList.hidden = !optionList.hidden;
})

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