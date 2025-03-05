function change_color(event) {
    const color = event.target.getAttribute('data-color');
    const paragrahes = document.querySelectorAll("aside > p");
    paragrahes.forEach((p) => p.style.color = color);
}

document.addEventListener("DOMContentLoaded", (event) => { 
    const colors = document.getElementById('color');
    colors.addEventListener('click', change_color);
    const paragrahes = document.querySelectorAll('main p');
    paragrahes.forEach((p) => p.setAttribute('data-original', p.innerText));
})

function ajouter_une_couleur(){
    const color1 = document.getElementById('color-1').value;
    const color = document.createElement("span");
    color.style.background = color1;
    color.classList.add("colorbox");
    color.setAttribute('data-color', color1);
    const colors = document.getElementById('color');
    colors.appendChild(color);
}

function cherche_dans_paragraphes_de_main(event){
    const search = document.getElementById("search");
    const paragrahes = document.querySelectorAll("main p");
    let find = false;
    paragrahes.forEach((p) => {
        if(p.innerText.includes(search.value) && search.value !== ''){
            p.classList.add("highlight");
            find = true;
        }else{
            p.classList.remove("highlight");
        }
    })
    if(!find){
        search.setCustomValidity("Inexistant");
    }else{
        search.setCustomValidity("");
    }
    search.reportValidity();
}  


function cherche_dans_paragraphes_de_main_v2(event){
    const search = document.getElementById("search");
    const paragrahes = document.querySelectorAll("main p");
    let find = false;
    paragrahes.forEach((p) => {
        if(p.innerText.includes(search.value) && search.value !== ''){
            let s = '<span class="highlight">'+search.value+'</span>';
            p.innerHTML = p.getAttribute('data-original').replaceAll(search.value, s);
            find = true;
        }else{
            p.innerHTML = p.getAttribute('data-original');
        }
    })
    if(!find && search.value !== ''){
        search.setCustomValidity("Inexistant");
    }else{
        search.setCustomValidity("");
    }
    search.reportValidity();
}  
