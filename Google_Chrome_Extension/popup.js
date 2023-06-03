document.getElementById("clickButton").addEventListener("click", function () {
    console.log("クリック！");
    const inputTag = document.getElementById("inputTag").value;
    const inputColor = document.getElementById("inputColor").value;
    if (inputTag === "" || inputColor === "") return;
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tab) {
        const obj = {
            type: "change",
            inputTag,
            inputColor
        }
        chrome.tabs.sendMessage(tab[0].id, obj)
    })
});


