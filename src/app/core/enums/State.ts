export enum State {
  NEW = 'NEW',
  USED = 'USED'
}

export const StateLabels: Record<State, string> = {
  [State.NEW]: 'Нов',
  [State.USED]: 'Употребяван'
};

export const PartStateLabels: { [key: string]: string } = {
  'NEW': 'Нов',
  'USED': 'Употребяван'
};