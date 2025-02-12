document.addEventListener("DOMContentLoaded", (event) => { 
    const c1 = document.getElementById('cadre-1');
    c1.addEventListener('mousemove', move_img);
    c1.style.top = '1px';
    c1.style.left = '1px';
    const c2 = document.getElementById('cadre-2');
    c2.style.top = '1px';
    c2.style.left = '1px';
    c2.addEventListener('mousemove', move_img);
    const c3 = document.getElementById('cadre-3');
    c3.style.top = '1px';
    c3.style.left = '1px';
    c3.addEventListener('mousemove', move_img);
    const f1 = document.getElementById('filtre-1');
    f1.addEventListener('mousemove', move_img);
    f1.style.top = '1px';
    f1.style.left = '1px';

    const pictures = document.querySelectorAll('.album > img');
    pictures.forEach((p) => p.addEventListener('click', echange_images));
    
    const echange = document.getElementById('echange');
    echange.addEventListener('change', () => {
        if(!echange.checked && firstpic){
            firstpic.style.border = '';
            firstpic = undefined;
        }
    })
})


function move_img(event){
    if(event.buttons === 1){
        const element = event.target;
        element.style.left = (Number.parseInt(element.style.left) + event.movementX) + "px";
        element.style.top = (Number.parseInt(element.style.top) + event.movementY) + "px";
    }
}

let firstpic = undefined;
let secondpic = undefined;

function echange_images(event){
    const echange = document.getElementById('echange');
    if(echange.checked){
        if(!firstpic){
            firstpic = event.target;
            firstpic.style.border = '2px solid red';
        }else{
            secondpic = event.target;
            
            let parent = secondpic.parentNode;

            for (let c of parent.childNodes) {
                if(c == firstpic){
                    let sibling = c.nextElementSibling;
                    let sibling2 = secondpic.nextElementSibling;
                    parent.insertBefore(firstpic, sibling2);
                    parent.insertBefore(secondpic, sibling);
                    break
                }
            }

            firstpic.style.border = '';
            firstpic = undefined;
            echange.checked = false;
        }
    }
}