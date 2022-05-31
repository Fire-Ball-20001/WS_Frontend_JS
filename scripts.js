import items from './files/motorists.json' assert {type:"json"};

let indexRow = -1;


window.onload = function() {
    const table = document.getElementById("table");
    const tbody = document.createElement("tbody");

    items.forEach(element => {
        let cell = document.createElement("td");
        const row = document.createElement("tr");

        cell.appendChild(document.createTextNode(`${element.person.firstname} ${element.person.lastname}`));
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.appendChild(document.createTextNode(element.car.manufacturer));
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.appendChild(document.createTextNode(element.car.model));
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.appendChild(document.createTextNode(element.car.year));
        row.appendChild(cell);

        row.onclick=clickRow;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
}


window.onclick = function(event) {
    if(event.target.nodeName != "TD") {
        updateRows();
        updateDetals();
    }
}


function clickRow(event) {
    const index = event.target.parentElement.rowIndex;
    const table = document.getElementById("table");

    updateRows();
    table.rows[index].classList.add("active-row");
    indexRow = index;
    updateDetals();
}

function updateRows() {
    const temp = document.getElementsByClassName("active-row");

    for(let i = 0;i<temp.length;i++) {
        temp[i].classList.remove("active-row");
    }

    indexRow = -1;
}

function updateDetals() {
    if(indexRow !== -1) {
        const item = items[indexRow-1];
        const name = `${item.person.firstname} ${item.person.lastname}`;
        const car = item.car;
        

        document.getElementById("person_name").textContent = name;
        document.getElementById("car_manuf").textContent=car.manufacturer;
        document.getElementById("car_model").textContent=car.model;
        document.getElementById("car_type").textContent=car.type;
        document.getElementById("car_vin").textContent=car.vin;
        document.getElementById("car_year").textContent=car.year;
        document.getElementById("car_color").textContent=car.color;
        document.getElementById("car_color").style.color=car.color;
        document.getElementById("car_cabr").checked=car.isConvertible;
        document.getElementById("details_section").style.display = "block";
    } else {
        document.getElementById("person_name").textContent = "None";
        document.getElementById("car_manuf").textContent="None";
        document.getElementById("car_model").textContent="None";
        document.getElementById("car_type").textContent="None";
        document.getElementById("car_vin").textContent="None";
        document.getElementById("car_year").textContent="None";
        document.getElementById("car_color").textContent="None";
        document.getElementById("car_color").style.color="None";
        document.getElementById("car_cabr").checked=false;
        document.getElementById("details_section").style.display = "none";
    }
}
