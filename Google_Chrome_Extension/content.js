const h1Tags = document.getElementsByTagName("h1");

console.log("h1");
// Change the color of each h1 tag to pink
for (let i = 0; i < h1Tags.length; i++) {
    console.log(h1Tags[i]);
    h1Tags[i].style.color = "white";
    h1Tags[i].style.backgroundColor = "pink";
}


const h2Tags = document.getElementsByTagName("h2");
console.log("h2");
// Change the color of each h1 tag to pink
for (let i = 0; i < h2Tags.length; i++) {
    h2Tags[i].style.color = "white";
    h2Tags[i].style.backgroundColor = "green";
}