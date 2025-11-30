export interface CarDto {
  id: string | null;      // UUID string or null when creating
  vin: string;
  brand: string;
  model: string;
  year: number;
  fuelType: string;       // use enum string values matching backend FuelType
  transmission: string;   // use enum string values matching backend TransmissionType
  mileage: number;
  enginePower: number;
  color: string;
}
