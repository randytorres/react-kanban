import { ICard } from "../../global/interfaces"

export const updateOrder = (array: any[]) => array.map((item: any, index: number) => ({ ...item, order: index }))

export const getCardsInColumn = (cards: ICard[], columnId: string): ICard[] => cards.filter(card => card.columnId === columnId) 

export const findItemById = (array: any[], id: string) => array.find(item => item.id === id)