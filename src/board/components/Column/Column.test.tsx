import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { CardStatus } from 'global/interfaces'
import 'i18n/config'

import { Column } from './Column'

const mockColumnProps = {
  id: '123',
  name: 'Cool Column',
  order: 0,
  onAddCard: jest.fn(),
  handleColumnMenuOpen: jest.fn(),
  handleCardMenuOpen: jest.fn(),
  handleCardStatusChange: jest.fn(),
  cards: [
    {
      id: '09308-133',
      columnId: '123',
      name: 'Cool Card',
      description: 'Doing stuff',
      createdAt: new Date(),
      status: CardStatus.Open,
      order: 0
    },
    {
      id: '17304-1093',
      columnId: '031847',
      name: 'Another Cool Card',
      description: 'Doing more stuff',
      createdAt: new Date(),
      status: CardStatus.Open,
      order: 0
    },
  ],
}

const renderColumn = () => {
  render(
    <DragDropContext onDragEnd={jest.fn()}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Column {...mockColumnProps} />
        </div>
      )}
      </Droppable>
    </DragDropContext>
  )
}

describe('Column', () => {
  test('Renders title', () => {
    renderColumn()
    expect(screen.getByText(mockColumnProps.name)).toBeInTheDocument()
  })

  test('Renders add card display on click', () => {
    renderColumn()
    expect(screen.getByTestId('add-card')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('add-card'))
    expect(screen.getByLabelText("Enter a name")).toBeInTheDocument()
    expect(screen.getByLabelText("Description")).toBeInTheDocument()
    expect(screen.getByText("Add")).toBeInTheDocument()
    expect(screen.getByText("Cancel")).toBeInTheDocument()
  })

  test('Calls onAddCard when a new card is created', async () => {
    const cardName = "My New Card"
    const cardDescription = "Build something cool"
    renderColumn()
    fireEvent.click(screen.getByTestId('add-card'))

    const nameInput = screen.getByLabelText("Enter a name") as HTMLInputElement
    const descriptionInput = screen.getByLabelText("Description") as HTMLInputElement
    expect(nameInput.value).toBe('')
    expect(descriptionInput.value).toBe('')

    fireEvent.change(nameInput, { target: { value: cardName }})
    fireEvent.change(descriptionInput, { target: { value: cardDescription }})

    expect(nameInput.value).toBe(cardName);
    expect(descriptionInput.value).toBe(cardDescription);
    fireEvent.click(screen.getByText('Add'))

    expect(mockColumnProps.onAddCard).toBeCalledWith(cardName, cardDescription, mockColumnProps.id)
  })

  test('Only renders card with same columnId', () => {
    renderColumn()
    expect(screen.getAllByTestId('card')).toHaveLength(1)

    const cardInColumn = mockColumnProps.cards.find(card => card.columnId === mockColumnProps.id)
    const cardName = cardInColumn?.name as string
    expect(screen.getByText(cardName)).toBeInTheDocument()
  })

  test('Calls handleCardMenuOpen on settings click', () => {
    renderColumn()

    fireEvent.click(screen.getByTestId('settings'))
    expect(mockColumnProps.handleColumnMenuOpen).toHaveBeenCalledWith(
      expect.objectContaining({ '_reactName': 'onClick' }),
      mockColumnProps.id,
    )
  })
})