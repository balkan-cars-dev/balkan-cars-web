export enum TransmissionType {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
  SEMI_AUTOMATIC = 'SEMI_AUTOMATIC'
}

export const TransmissionTypeLabels: Record<TransmissionType, string> = {
  [TransmissionType.MANUAL]: 'Ръчна',
  [TransmissionType.AUTOMATIC]: 'Автоматична',
  [TransmissionType.SEMI_AUTOMATIC]: 'Полуавтоматична'
};