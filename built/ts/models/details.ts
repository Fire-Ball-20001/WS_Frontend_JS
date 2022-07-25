import { DetailElement } from "../interfaces/detailElement.js";

export interface DetailsParams {
  personName: HTMLElement;
  carManuf: HTMLElement;
  carModel: HTMLElement;
  carType: HTMLElement;
  carVin: HTMLElement;
  carYear: HTMLElement;
  carColor: HTMLElement;
  carCabr: HTMLInputElement;
  section: HTMLElement;
}

export class Details {
    private personName: HTMLElement;
    private carManuf: HTMLElement;
    private carModel: HTMLElement;
    private carType: HTMLElement;
    private carVin: HTMLElement;
    private carYear: HTMLElement;
    private carColor: HTMLElement;
    private carCabr: HTMLInputElement;
    private base: HTMLElement;
  
    constructor(params: DetailsParams) {
      this.personName = params.personName;
      this.carManuf = params.carManuf;
      this.carModel = params.carModel;
      this.carType = params.carType;
      this.carVin = params.carVin;
      this.carYear = params.carYear;
      this.carColor = params.carColor;
      this.carCabr = params.carCabr;
      this.base = params.section;
    }
  
    parse = (el: DetailElement) => {
      this.personName.textContent = el.personName;
      this.carManuf.textContent = el.carManuf;
      this.carType.textContent = el.carType;
      this.carVin.textContent = el.carVin;
      this.carColor.textContent = el.carColor;
      this.carColor.style.color = el.carColor;
      this.carCabr.checked = el.carCabr;
      this.carModel.textContent = el.carModel;
      this.carYear.textContent = el.carYear.toString();
      this.base.style.display = 'block';
    };
  
    clear = () => {
      this.personName.textContent = 'None';
      this.carManuf.textContent = 'None';
      this.carType.textContent = 'None';
      this.carVin.textContent = 'None';
      this.carColor.textContent = 'None';
      this.carColor.style.color = '';
      this.carCabr.checked = false;
      this.carModel.textContent = 'None';
      this.carYear.textContent = 'None';
      this.base.style.display = 'none';
    };
  }