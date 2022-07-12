import items from "./files/motorists.json" assert {type: "json"};

let indexRow: number = -1;
let detailsSection: Detals;

window.onload = function () {
  const table: HTMLTableElement = document.getElementById(
    "table"
  ) as HTMLTableElement;
  const tbody: HTMLTableSectionElement = document.createElement("tbody");

  detailsSection = new Detals(
    document.getElementById("person_name") as HTMLElement,
    document.getElementById("car_manuf") as HTMLElement,
    document.getElementById("car_model") as HTMLElement,
    document.getElementById("car_type") as HTMLElement,
    document.getElementById("car_vin") as HTMLElement,
    document.getElementById("car_year") as HTMLElement,
    document.getElementById("car_color") as HTMLElement,
    document.getElementById("car_cabr") as HTMLInputElement,
    document.getElementById("details_section") as HTMLElement
  );
  detailsSection.clear();

  items.forEach((element: OneDataElement) => {
    const row = document.createElement("tr");

    const oneRow : SmallDataElement = {
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
  if (event.target !== null) {
    const target: Element = <Element>event.target;
    if (target.nodeName != "TD") {
      updateRows();
      updateDetals();
    }
  }
};

function clickRow(event: MouseEvent) {
  let index: number = -1;

  if (event.target !== null) {
    const target = <Element>event.target;
    if (target.parentElement !== null) {
      index = (<HTMLTableRowElement>target.parentElement).rowIndex;
    }
  }

  const table: HTMLTableElement = document.getElementById(
    "table"
  ) as HTMLTableElement;

  updateRows();
  table.rows[index].classList.add("active-row");
  indexRow = index;

  updateDetals();
}

function updateRows() {
  const temp = document.getElementsByClassName("active-row");

  for (let i = 0; i < temp.length; i++) {
    temp[i].classList.remove("active-row");
  }

  indexRow = -1;
}

function updateDetals() {
  if (indexRow === -1) {
    detailsSection.clear();
    return;
  }
  const item = items[indexRow - 1];
  const name = `${item.person.firstname} ${item.person.lastname}`;
  const car = item.car;

  const detalElement: DetalElement = {
    personName: name,
    carManuf: car.manufacturer,
    carModel: car.model,
    carType: car.type,
    carVin: car.vin,
    carYear: car.year.toString(),
    carColor: car.color,
    carCabr: car.isConvertible,
  };

  detailsSection.parse(detalElement);
}

class Detals {
    private personName: HTMLElement;
    private carManuf: HTMLElement;
    private carModel: HTMLElement;
    private carType: HTMLElement;
    private carVin: HTMLElement;
    private carYear: HTMLElement;
    private carColor: HTMLElement;
    private carCabr: HTMLInputElement;
    private base: HTMLElement;
  
    constructor(
      name: HTMLElement,
      carManuf: HTMLElement,
      carModel: HTMLElement,
      carType: HTMLElement,
      carVin: HTMLElement,
      carYear: HTMLElement,
      carColor: HTMLElement,
      carCabr: HTMLInputElement,
      section: HTMLElement
    ) {
      this.personName = name;
      this.carManuf = carManuf;
      this.carModel = carModel;
      this.carType = carType;
      this.carVin = carVin;
      this.carYear = carYear;
      this.carColor = carColor;
      this.carCabr = carCabr;
      this.base = section;
    }
  
    parse = (el: DetalElement) => {
      this.personName.textContent = el.personName;
      this.carManuf.textContent = el.carManuf;
      this.carType.textContent = el.carType;
      this.carVin.textContent = el.carVin;
      this.carColor.textContent = el.carColor;
      this.carColor.style.color = el.carColor;
      this.carCabr.checked = el.carCabr;
      this.base.style.display = "block";
    };
  
    clear = () => {
      this.personName.textContent = "None";
      this.carManuf.textContent = "None";
      this.carType.textContent = "None";
      this.carVin.textContent = "None";
      this.carColor.textContent = "None";
      this.carColor.style.color = "";
      this.carCabr.checked = false;
      this.base.style.display = "none";
    };
  }
  
  interface DetalElement {
    personName: string;
    carManuf: string;
    carModel: string;
    carType: string;
    carVin: string;
    carYear: string;
    carColor: string;
    carCabr: boolean;
  }

  interface OneDataElement {
    id: string;
    person: {
        firstname: string;
        lastname: string;
    };
    car: {
        manufacturer: string;
        model: string;
        type: string;
        vin: string;
        year: number;
        color: string;
        isConvertible: boolean;
    };
  }
  interface SmallDataElement {
    name: string;
    manufacturer: string;
    model: string;
    year: number;
  }


