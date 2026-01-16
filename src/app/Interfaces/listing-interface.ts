export interface Listing {
  id: string;
  title: string;
  description: string;
  carId: string;
  sellerId: string;
  price: number;
  location?: string;
  isActive: boolean;
  extras?: string[];
  groupedExtras?: any;
}

export interface ListingWithCar extends Listing {
  car?: {
    id: string;
    vin: string;
    brand: string;
    model: string;
    year: number;
    fuelType: string;
    transmission: string;
    mileage: number;
    enginePower: number;
    color: string;
    image: string;
  };
}
