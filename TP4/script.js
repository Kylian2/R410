let word = [];
let errors = 0;
let body_element = [];
let found_letters = [];

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
    word = await fetch_word();
    if(!word){
        return
    }

    const init = document.getElementById("init");
    init.classList.add("none");

    const game = document.getElementById("game");
    game.classList.remove("none");

    found_letters = [];
    errors = 0;

    const guess_zone = document.getElementById("guess-zone");

    while(guess_zone.firstChild){
        guess_zone.removeChild(guess_zone.firstChild);
    }

    for(let i = 0; i < word.length; i++){
        const span = document.createElement("span");
        span.classList.add("to-be-guessed");
        guess_zone.appendChild(span);
        found_letters.push(false);
    }

    document.addEventListener("keydown", checkkey);

    body_element.push(document.getElementById("head"));
    body_element.push(document.getElementById("body"));
    body_element.push(document.getElementById("left-arm"));
    body_element.push(document.getElementById("right-arm"));
    body_element.push(document.getElementById("left-leg"));
    body_element.push(document.getElementById("right-leg"));
}

const checkkey = (event)=>{
    const key = (event.key).toUpperCase();
    const guess_zone = document.getElementById('guess-zone');
    const to_be_guessed = guess_zone.children;
    let letter_is_found = false;
    for(let i = 0; i < to_be_guessed.length; i++){
        if(word[i] === key){
            to_be_guessed[i].textContent = word[i];
            to_be_guessed[i].classList.remove('to-be-guessed');
            to_be_guessed[i].classList.add('found');
            found_letters[i] = true;
            letter_is_found = true;
        }
    }

    let regex = /^[A-Z]$/;
    if(!letter_is_found && regex.test(key)){
        updateError();
    }else{
        if(found_letters.reduce((a, v) => a = a && v)){
            victory();
        }
    }
}

const updateError = () => {
    body_element[errors].style.display = 'block';
    errors ++;
    if(errors >= 6){
        const game_over = document.getElementById("game-over");
        const defeat = document.getElementById("game-defeat");
        game_over.classList.remove('none');
        defeat.classList.remove('none');
        const reveal = document.querySelectorAll(".reveal");
        reveal.forEach(r => {
            r.textContent = word;
        });
    }
}

const victory = () => {
    const game_over = document.getElementById("game-over");
    const victory = document.getElementById("game-victory");
    game_over.classList.remove('none');
    victory.classList.remove('none');
    const reveal = document.querySelectorAll(".reveal");
    reveal.forEach(r => {
        r.textContent = word;
    });
    const errors_container = document.getElementById('errors');
    errors_container.textContent = errors;
}

const playAgain = () => {
    const game_over = document.getElementById("game-over");
    const victory = document.getElementById("game-victory");
    const game = document.getElementById("game");
    const init = document.getElementById("init");
    game_over.classList.add("none");
    victory.classList.add("none");
    game.classList.add("none");
    init.classList.remove("none");
}