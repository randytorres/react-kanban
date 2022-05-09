import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { CardStatus } from 'global/interfaces'
import 'i18n/config'

import { Card } from './Card'

const mockCardProps = {
  id: '09308-133',
  columnId: '123',
  name: 'Cool Card',
  description: 'Doing stuff',
  createdAt: new Date(),
  status: CardStatus.Open,
  order: 0,
  handleCardMenuOpen: jest.fn(),
  handleCardStatusChange: jest.fn(),
}

const renderCard = () => {
  render(
    <DragDropContext onDragEnd={jest.fn()}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Card {...mockCardProps} />
        </div>
      )}
      </Droppable>
    </DragDropContext>
  )
}

describe('Card', () => {
  test('Renders Card Details', () => {
    renderCard()
    expect(screen.getByText(mockCardProps.name)).toBeInTheDocument()
    expect(screen.getByText(mockCardProps.description)).toBeInTheDocument()
    const createdAt = `Created: ${mockCardProps.createdAt.toLocaleDateString()}`
    expect(screen.getByText(createdAt)).toBeInTheDocument()
  })

  test('Calls handleCardStatusChange when status is changed', () => {
    renderCard()
    const openStatusButton = screen.getByRole('button', { pressed: true })
    expect(openStatusButton.innerHTML).toContain('Open')

    fireEvent.click(screen.getByText(/Close/i))
    expect(mockCardProps.handleCardStatusChange).toHaveBeenCalledWith(mockCardProps.id, CardStatus.Closed)
  })

  test('Calls handleCardMenuOpen on settings click', () => {
    renderCard()

    fireEvent.click(screen.getByTestId('card-setting'))
    expect(mockCardProps.handleCardMenuOpen).toHaveBeenCalledWith(
      expect.objectContaining({ '_reactName': 'onClick' }),
      mockCardProps.id,
    )
  })
})