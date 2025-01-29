function change_color(event) {
    const color = event.target.innerText;
    const paragrahes = document.querySelectorAll("aside > p");
    paragrahes.forEach((p) => p.style.color = color);
}

document.addEventListener("DOMContentLoaded", (event) => { 
    const table = document.querySelector('table');

    table.addEventListener('click', change_color);
})

function ajouter_deux_couleurs(){
    const color1 = document.getElementById('color-1').value;
    const color2 = document.getElementById('color-2').value;
    const td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(color1));
    td1.style.background = color1;
    const td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(color2));
    td2.style.background = color2;
    const tr = document.createElement('tr');
    tr.appendChild(td1);
    tr.appendChild(td2);

    const table = document.querySelector('table');
    table.appendChild(tr);
}