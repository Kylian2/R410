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
})


function move_img(event){
    if(event.buttons === 1){
        const element = event.target;
        element.style.left = (Number.parseInt(element.style.left) + event.movementX) + "px";
        element.style.top = (Number.parseInt(element.style.top) + event.movementY) + "px";
    }
}
