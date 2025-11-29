export enum State {
  NEW = 'NEW',
  USED = 'USED'
}

export const StateLabels: Record<State, string> = {
  [State.NEW]: 'Нов',
  [State.USED]: 'Употребяван'
};