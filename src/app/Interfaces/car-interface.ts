export interface CarListing {
  id: number;
  make: string;
  model: string;
  details: string;
  priceEur: number;
  priceBgn: number;
  mileage: number;
  region: string;
  date: string;
  imageUrl: string;
  badge?: 'BEST' | 'TOP' | string;
}
