const rajoute_un_click = () => {
    const btn = document.getElementById("hello-btn");
    if(btn.innerText === "Hello !"){
        alert("welcome !");
        btn.innerText = "Re Hello";
    }else{
        alert("on s'est déjà vu non ?");
    }
}

const rajoute_un_click_alt = (that) => {
    if(that.innerText === "Hello !"){
        alert("welcome !");
        that.innerText = "Re Hello";
    }else{
        alert("on s'est déjà vu non ?");
    }
}