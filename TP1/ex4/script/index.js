function change_color(event) {
    const color = event.target.getAttribute('data-color');
    const paragrahes = document.querySelectorAll("aside > p");
    paragrahes.forEach((p) => p.style.color = color);
}

document.addEventListener("DOMContentLoaded", (event) => { 
    const colors = document.getElementById('color');
    colors.addEventListener('click', change_color);
})

function ajouter_deux_couleurs(){
    const color1 = document.getElementById('color-1').value;
    const color = document.createElement("span");
    color.style.background = color1;
    color.classList.add("colorbox");
    color.setAttribute('data-color', color1);
    const colors = document.getElementById('color');
    colors.appendChild(color);
}