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
    if(indexRow != -1) {
        const name = `${items[indexRow-1].person.firstname} ${items[indexRow-1].person.lastname}`;
        document.getElementById("person_name").textContent = name;
        document.getElementById("car_manuf").textContent=items[indexRow-1].car.manufacturer;
        document.getElementById("car_model").textContent=items[indexRow-1].car.model;
        document.getElementById("car_type").textContent=items[indexRow-1].car.type;
        document.getElementById("car_vin").textContent=items[indexRow-1].car.vin;
        document.getElementById("car_year").textContent=items[indexRow-1].car.year;
        document.getElementById("car_color").textContent=items[indexRow-1].car.color;
        document.getElementById("car_color").style.color=items[indexRow-1].car.color;
        document.getElementById("car_cabr").checked=items[indexRow-1].car.isConvertible;
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
