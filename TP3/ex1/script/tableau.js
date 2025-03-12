let data;

const fetchData = async () => {
    const response = await fetch("https://webdev.iut-orsay.fr/~kricha2/R410/TP3/ex1/notes_v1.php");
    if(response.ok){
        data = await response.json();

        let sums = [];

        for (let i = 0; i < data['students'][0]['grades'].length; i++) {
            sums.push(0);
        }
        
        data['students'].forEach((s) => {
            s['grades'].forEach((g, j) => {
                sums[j] += g;
            });
        });

        data['means'] = sums.map(s => (s / data['students'].length).toFixed(2));
        
        console.log(data);
    }else{
        console.error("Erreur lors de la récupération des données");
    }
}

document.addEventListener("DOMContentLoaded", (event) => {

    /* Partie concernant le tri des lignes du tableau */

    const ascs = document.querySelectorAll('.asc');
    const descs = document.querySelectorAll('.desc');

    ascs.forEach((asc) => {
        asc.addEventListener('click', trier);
    });

    descs.forEach((desc) => {
        desc.addEventListener('click', trier);
    });
    
})

function mobile(){
    const table = document.getElementById('table');
    table.classList.toggle('mobile');

    /* Vide le tableau */
    while(table.firstChild){
        table.removeChild(table.firstChild);
    }
    
    /* Construit le thead */
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    
    const th1 = document.createElement('th');
    th1.textContent = "Discipline";
    
    const th2 = document.createElement('th');
    th2.textContent = "Note";
    
    tr.appendChild(th1);
    tr.appendChild(th2);
    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    /* Construit le contenu */
    data['students'].forEach((s, j) => {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', 2);
        td.textContent = s['name'];
        tr.appendChild(td);
        tbody.appendChild(tr);
        s['grades'].forEach((grade, i) => {
            const tr = document.createElement('tr');
            if ((j+1) % 2 === 0) {
                tr.style.filter = "invert(0.1)"; // Exemple de style
            }
            const th = document.createElement('th');
            th.textContent = data['libelles'][i];
            tr.appendChild(th);
            const td = document.createElement('td');
            td.textContent = grade;
            if(grade < 10){
                td.style.border = '2px solid red';
            }
            tr.appendChild(td);
            tbody.appendChild(tr);
        })
    })
}

function desktop(){
    const table = document.getElementById('table');
    table.classList.toggle('mobile');

    /* Vide le tableau */
    while(table.firstChild){
        table.removeChild(table.firstChild);
    }

    /* Construit le thead */
    const thead = document.createElement('thead');
    const trhead = document.createElement('tr');
    trhead.appendChild(document.createElement('td'));
    data['libelles'].forEach(libelle => {
        const th = document.createElement('th');
        th.textContent = libelle;
        trhead.appendChild(th);
    })
    thead.appendChild(trhead);
    const trhead2 = document.createElement('tr');
    trhead2.classList.add('filter');
    trhead2.appendChild(document.createElement('td'));
    for(let i = 0; i < data['libelles'].length; i++){
        const th2 = document.createElement('th');
        const div = document.createElement('div');
        const asc = document.createElement('img');
        asc.src = "../../images/arrow.png";
        asc.alt = "asc";
        asc.classList.add('asc');
        div.appendChild(asc);
        const desc = document.createElement('img');
        desc.src = "../../images/arrow.png";
        desc.alt = "desc"
        desc.classList.add('desc');
        div.appendChild(desc);
        th2.appendChild(div);  
        trhead2.appendChild(th2);
        asc.addEventListener('click', trier);
        desc.addEventListener('click', trier);
    }
    thead.appendChild(trhead2);
    table.appendChild(thead);

    /* Construit le body */
    const tbody = document.createElement('tbody');
    data['students'].forEach(s => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = s['name'];
        tr.appendChild(th);
        s['grades'].forEach(grade => {
            const td = document.createElement('td');
            td.textContent = grade;
            if(grade < 10){
                td.style.border = '2px solid red';
            }
            tr.appendChild(td);
        })
        tbody.appendChild(tr);
    })
    table.appendChild(tbody);

    /*Construction des moyennes et agrégations */
    const tfoot = document.createElement('tfoot');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = "Moyenne";
    tr.appendChild(th);
    data['means'].forEach(mean => {
        const td = document.createElement('td');
        td.textContent = mean;
        tr.appendChild(td);
    });
    tfoot.appendChild(tr);
    table.appendChild(tfoot);
}

function trier(event){

    const lines = document.querySelectorAll('tbody > tr');
    const lines_data = [...lines].map((l) => [...l.children].map((c) => c.textContent));

    const parent = event.target.parentNode.parentNode.parentNode;
    let index = -1;
    for(let i = 0; i < parent.children.length; i++){
        if(parent.children[i] == event.target.parentNode.parentNode){
            index = i;
        }
    }

    const acs = event.target.classList.contains('asc');
    let ordered_lines = []
    if(acs){
        ordered_lines = lines_data.sort((a, b) => {
            if(Number.parseInt(a[index]) < Number.parseInt(b[index])){
                return -1;
            }
            if(Number.parseInt(a[index]) > Number.parseInt(b[index])){
                return 1;
            }
            return 0;
        });
    }else{
        ordered_lines = lines_data.sort((a, b) => {
            if(Number.parseInt(a[index]) < Number.parseInt(b[index])){
                return 1;
            }
            if(Number.parseInt(a[index]) > Number.parseInt(b[index])){
                return -1;
            }
            return 0;
        });
    }

    const tbody = document.querySelector('tbody');

    /* Vide le tableau */
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }

    /* Rempli le tableau */
    lines_data.forEach(g => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = g[0];
        tr.appendChild(th);
        for(let i = 1; i < g.length; i++){
            const td = document.createElement('td');
            td.textContent = g[i];
            if(g[i] < 10){
                td.style.border = '2px solid red';
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    })

}
fetchData();