const fetch_word = async () => {
    try{
        const min_input = document.getElementById("min_char");
        const max_input = document.getElementById("max_char");
        const error_label = document.getElementById("error");
        if(Number.parseInt(max_input.value) < Number.parseInt(min_input.value)){
            error_label.classList.remove("hidden");
            return false;
        }else{
            error_label.classList.add("hidden");
        }

        const response = await fetch("https://webdev.iut-orsay.fr/~kricha2/R410/TP4/proposition.php?min_char="+min_input.value+"&max_char="+max_input.value);
        
        if(response.ok){
            const data = await response.text();
            return data;
        }
    }catch(error){
        console.error("Erreur lors de la récupération des données");
        console.error(error);
    }
}   

const start_game = async () =>{
    const word = await fetch_word();
    if(word){
        console.log(word);
    }else{
        return;
    }

    const init = document.getElementById("init");
    init.classList.add("none");

    const game = document.getElementById("game");
    game.classList.remove("none");

    const guess_zone = document.getElementById("guess-zone");
    for(let i = 0; i < word.length; i++){
        const span = document.createElement("span");
        span.classList.add("to-be-guessed");
        guess_zone.appendChild(span);
    }
}