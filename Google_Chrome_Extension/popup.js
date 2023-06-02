document.getElementById("clickButton").addEventListener("click", function () {
    console.log("クリック！");
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tab) {
        chrome.tabs.sendMessage(tab[0].id, 'change')
    })
});


