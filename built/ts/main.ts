import items from "./files/motorists.json" assert { type: "json" };
import { OneDataElement } from "./interfaces/oneDataElement.js";
import { SmallDataElement } from "./interfaces/smallDataElement.js";
import { DetailElement } from "./interfaces/detailElement.js";
import { Details, DetailsParams } from "./models/details.js";

let indexRow: number = -1;
let detailsSection: Details;

window.onload = function () {
  const table: HTMLTableElement = <HTMLTableElement>(
    document.getElementById("table")
  );
  const tbody: HTMLTableSectionElement = document.createElement("tbody");

  const detailsParam: DetailsParams = {
    personName: <HTMLElement>document.getElementById("person_name"),
    carManuf: <HTMLElement>document.getElementById("car_manuf"),
    carModel: <HTMLElement>document.getElementById("car_model"),
    carType: <HTMLElement>document.getElementById("car_type"),
    carVin: <HTMLElement>document.getElementById("car_vin"),
    carYear: <HTMLElement>document.getElementById("car_year"),
    carColor: <HTMLElement>document.getElementById("car_color"),
    carCabr: <HTMLInputElement>document.getElementById("car_cabr"),
    section: <HTMLElement>document.getElementById("details_section"),
  };

  detailsSection = new Details(detailsParam);
  detailsSection.clear();

  items.forEach((element: OneDataElement) => {
    const row = document.createElement("tr");

    const oneRow: SmallDataElement = {
      name: `${element.person.firstname} ${element.person.lastname}`,
      manufacturer: element.car.manufacturer,
      model: element.car.model,
      year: element.car.year,
    };

    Object.values(oneRow).forEach((cellText: string | number) => {
      const cell = document.createElement("td");
      cell.appendChild(document.createTextNode(cellText.toString()));
      row.appendChild(cell);
    });

    row.onclick = clickRow;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
};

window.onclick = function (event: MouseEvent) {
  if (event.target) {
    const target: Element = <Element>event.target;
    if (target.nodeName !== "TD") {
      updateRows();
      updateDetails();
    }
  }
};

function clickRow(event: MouseEvent) {
  let index: number = -1;

  if (event.target) {
    const target = <Element>event.target;
    if (target.parentElement) {
      index = (<HTMLTableRowElement>target.parentElement).rowIndex;
    }
  }

  const table: HTMLTableElement = <HTMLTableElement>(
    document.getElementById("table")
  );

  updateRows();
  table.rows[index].classList.add("active-row");
  indexRow = index;

  updateDetails();
}

function updateRows() {
  const temp = document.getElementsByClassName("active-row");
  
  Array.from(temp).forEach((element: Element) => {
    element.classList.remove("active-row")
  });

  indexRow = -1;
}

function updateDetails() {
  if (indexRow === -1) {
    detailsSection.clear();
    return;
  }
  const item = items[indexRow - 1];
  const name = `${item.person.firstname} ${item.person.lastname}`;
  const car = item.car;

  const detailElement: DetailElement = {
    personName: name,
    carManuf: car.manufacturer,
    carModel: car.model,
    carType: car.type,
    carVin: car.vin,
    carYear: car.year.toString(),
    carColor: car.color,
    carCabr: car.isConvertible,
  };

  detailsSection.parse(detailElement);
}
