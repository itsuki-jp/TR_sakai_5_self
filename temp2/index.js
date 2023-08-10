document.getElementById("text").addEventListener("click", () => {
    const temp = document.getElementById("list").style.display;
    if (temp == "" || temp === "none") {
        document.getElementById("list").style.display = "block";
    } else {
        document.getElementById("list").style.display = "none";
    }
})