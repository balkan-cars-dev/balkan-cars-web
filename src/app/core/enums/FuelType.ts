export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  HYBRID = 'HYBRID',
  ELECTRIC = 'ELECTRIC',
  PETROL_LPG = 'PETROL_LPG',
  OTHER = 'OTHER'
}

export const FuelTypeLabels: Record<FuelType, string> = {
  [FuelType.PETROL]: 'Бензин',
  [FuelType.DIESEL]: 'Дизел',
  [FuelType.HYBRID]: 'Хибрид',
  [FuelType.ELECTRIC]: 'Електрически',
  [FuelType.PETROL_LPG]: 'Бензин/ГАЗ',
  [FuelType.OTHER]: 'Друго'
};