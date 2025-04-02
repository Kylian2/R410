"use strict";

let data = []
let taskCount = 0;

const addNewTask = () => {

    const taskContainer = document.getElementById("card-container");

    const title = document.getElementById("title");
    const date = document.getElementById("date");
    const description = document.getElementById("description");

    if(title.value == "" || date.value == "" || description.value == ""){

        const error = document.getElementById("error");
        error.classList.remove("none");
        setTimeout(() => {
            error.classList.add("none");
            console.log("5 secondes se sont écoulées !");
          }, 5000); 

        return;
    }


    let task = {
        "id": taskCount,
        "title": title.value,
        "date": date.value,
        "description": description.value,
        "pending": true
    }

    taskCount++;

    const card = document.createElement("div");
    card.classList.add('card');

    const infosContainer = document.createElement("div");
    const infos = document.createElement("div");
    const titleElement = document.createElement("h2");
    const dateElement = document.createElement("p");
    const descriptionElement = document.createElement("p");
    titleElement.textContent = task["title"];
    dateElement.textContent = task["date"];
    descriptionElement.textContent = task["description"];
    infos.appendChild(titleElement);
    infos.appendChild(dateElement);
    infosContainer.appendChild(infos);
    infosContainer.appendChild(descriptionElement);
    card.appendChild(infosContainer)
    
    card.setAttribute("data-id", task["id"]);

    const buttonContainer = document.createElement("div");
    const button = document.createElement("button");
    buttonContainer.appendChild(button);
    button.textContent = "Terminer";
    button.addEventListener('click', remove); //ne pas mettre ()
    card.appendChild(buttonContainer);

    title.value = "";
    date.value = "";
    description.value = "";

    taskContainer.appendChild(card);
    data.push(task);
}


const remove = (event) => {
    const card = event.target.parentNode.parentNode;
    card.remove();
    //Supprimer du tableau
    //data = data.filter(objet => objet.id != card.getAttribute("data-id"));
    //Passer en pending
    const task = data.find(objet => objet.id == card.getAttribute("data-id"));
    task['pending'] = false;
}

const displayTask = (pending) => {
    const container = document.getElementById("card-container");

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    for (const task of data){
        if(task["pending"] === pending){
            console.log(task)
            const card = document.createElement("div");
            card.classList.add('card');
    
            const infosContainer = document.createElement("div");
            const infos = document.createElement("div");
            const titleElement = document.createElement("h2");
            const dateElement = document.createElement("p");
            const descriptionElement = document.createElement("p");
            titleElement.textContent = task["title"];
            dateElement.textContent = task["date"];
            descriptionElement.textContent = task["description"];
            infos.appendChild(titleElement);
            infos.appendChild(dateElement);
            infosContainer.appendChild(infos);
            infosContainer.appendChild(descriptionElement);
            card.appendChild(infosContainer)
    
            if(pending){
                const buttonContainer = document.createElement("div");
                const button = document.createElement("button");
                buttonContainer.appendChild(button);
                button.textContent = "Terminer";
                button.addEventListener('click', remove);
            }
            container.appendChild(card);
        }
        
    }
}