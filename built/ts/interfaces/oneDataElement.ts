export interface OneDataElement {
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