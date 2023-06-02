console.log("AAAAAAAAAAAAAAAAA===========================")
chrome.runtime.onMessage.addListener((request) => {
    console.log("AAAAA");
    if (request !== "change") return
    changeColor();
    return true;
})


function change() {
    const h1Tags = document.getElementsByTagName("h1");

    console.log("h1");
    // Change the color of each h1 tag to pink
    for (let i = 0; i < h1Tags.length; i++) {
        console.log(h1Tags[i]);
        h1Tags[i].style.color = "white";
        h1Tags[i].style.backgroundColor = "pink";
    }


    const h2Tags = document.getElementsByTagName("p");
    console.log("h2");
    // Change the color of each h1 tag to pink
    for (let i = 0; i < h2Tags.length; i++) {
        console.log(h2Tags[i]);
        h2Tags[i].style.color = "white";
        h2Tags[i].style.backgroundColor = "green";
    }   
}

document.getElementById("iframe").contentDocument.childNodes[1].childNodes[2].getElementsByTagName("h1")

document.getElementsByClassName("book")[0].childNodes[3].children[0].getElementsByTagName("h1")[0]

textCopy = document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("body")[0].innerHTML
// window.open().document.write(textCopy);

textCopy = document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("iframe")[0].contentDocument
// window.open().document.write(textCopy.head.innerHTML + textCopy.body.innerHTML);

textCopy.body.getElementsByTagName("h1")[0].style.backgroundColor = "red"

function changeColor(params) {
    const textCopy = document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("iframe")[0].contentDocument
    textCopy.body.getElementsByTagName("h1")[0].style.backgroundColor = "red"
}