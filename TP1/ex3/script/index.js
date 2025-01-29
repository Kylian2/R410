function change_color(event) {
    const color = event.target.innerText;
    const paragrahes = document.querySelectorAll("aside > p");
    paragrahes.forEach((p) => p.style.color = color);
}

document.addEventListener("DOMContentLoaded", (event) => { 
    const table = document.querySelector('table');

    table.addEventListener('click', change_color);
})

