export interface CarListing {
  id: string;
  brand: string;
  model: string;
  details: string;
  price: number;
  mileage: number;
  region: string;
  date: string;
  imageUrl: string;
  year: string;
  state: string;
  fuel: string;
  transmission: string;
  badge?: 'BEST' | 'TOP' | string;
}
