export enum SubCategory {
  ENGINE = 'ENGINE',
  TRANSMISSION = 'TRANSMISSION',
  SUSPENSION = 'SUSPENSION',
  BRAKES = 'BRAKES',
  INTERIOR = 'INTERIOR',
  EXTERIOR = 'EXTERIOR',
  ELECTRICAL = 'ELECTRICAL',
  OTHER = 'OTHER'
}

export const SubCategoryLabels: Record<SubCategory, string> = {
  [SubCategory.ENGINE]: 'Двигател',
  [SubCategory.TRANSMISSION]: 'Трансмисия',
  [SubCategory.SUSPENSION]: 'Окачване',
  [SubCategory.BRAKES]: 'Спирачки',
  [SubCategory.INTERIOR]: 'Интериор',
  [SubCategory.EXTERIOR]: 'Екстериор',
  [SubCategory.ELECTRICAL]: 'Електрика',
  [SubCategory.OTHER]: 'Друго'
};
