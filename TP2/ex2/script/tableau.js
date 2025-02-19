document.addEventListener("DOMContentLoaded", (event) => {
    
    table = [];

    const lines = document.querySelectorAll("tbody > tr");
    lines.forEach(line => {
        l = [];
        for (const grade of line.children) {
            if(Number.parseInt(grade.textContent)){
                l.push(Number.parseInt(grade.textContent));
                if(grade.textContent < 10){
                    grade.style.border = '2px solid red';
                }
            }
        }
        table.push(l);
    });

    const means = [];
    for(i = 0; i < table[0].length; i++){
        sum = 0;
        for(j= 0; j < table.length; j++){
            sum += table[j][i];
        }
        means.push((sum/table.length).toFixed(2));
    }

    var i = 0;
    const meanContainer = document.querySelectorAll('.mean > td');
    meanContainer.forEach((g) => {
        g.textContent = means[i];
        i++;
    })

    i = 0;
    const agregationContainer = document.querySelectorAll('.agregation > td');
    agregationContainer.forEach((g) => {
        let x = 0;
        let n = Number.parseInt(g.getAttribute("colspan")) || 1;
        for (let j = 0; j < n; j++){
            x += parseFloat(means[i + j]);
        }
        g.textContent = (x/n).toFixed(2);
        i += n;
    })
})