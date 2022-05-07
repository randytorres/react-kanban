export interface IColumn {
  id: string
  name: string
  order: number
}

export interface ICard {
  id: string
  columnId: string
  name: string
  description: string
  createdAt: Date
  status: CardStatus
  order: number
}

export enum CardStatus {
  'Open' = 'OPEN',
  'Closed' = 'CLOSED'
}