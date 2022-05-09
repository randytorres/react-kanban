import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { CardStatus } from 'global/interfaces'
import 'i18n/config'

import { ColumnMenu, ColumnMenuProps } from './ColumnMenu'

const createAnchorEl = () => {
  const button =  document.createElement("button")
  // columnId
  button.id = '123'
  return button
}
const mockColumnMenuProps = {
  columnAnchorEl: createAnchorEl(),
  handleColumnMenuClose: jest.fn(),
  toggleEditColumnModal: jest.fn(),
  toggleDeleteColumnModal: jest.fn(),
  cards: [
    {
      id: '09308-133',
      columnId: '123',
      name: 'Cool Card',
      description: 'Doing stuff',
      createdAt: new Date(),
      status: CardStatus.Open,
      order: 0,
    },
  ],
}

const renderColumnMenu = (props: ColumnMenuProps = mockColumnMenuProps) => {
  return render(<ColumnMenu {...props} />)
}

describe('Card', () => {
  test('Delete button is disabled when cards are in column', () => {
    renderColumnMenu()

    expect(screen.getByText('Delete')).toHaveAttribute('aria-disabled')
  })

  test('Calls toggleDeleteColumnModal when delete is clicked', () => {
    renderColumnMenu({
      ...mockColumnMenuProps,
      cards: []
    })

    fireEvent.click(screen.getByText('Delete'))

    expect(mockColumnMenuProps.toggleDeleteColumnModal).toHaveBeenCalled()
  })


  test('Calls toggleEditColumnModal when edit is clicked', () => {
    renderColumnMenu()

    fireEvent.click(screen.getByText('Edit'))

    expect(mockColumnMenuProps.toggleEditColumnModal).toHaveBeenCalled()
  })

  test('Calls handleCardMenuClose when backdrop is clicked', () => {
    renderColumnMenu()
    
    fireEvent.keyDown(screen.getByRole('presentation'), {
      key: 'Escape',
      code: 'Escape'
    })
  
    expect(mockColumnMenuProps.handleColumnMenuClose).toHaveBeenCalled()
  })
})