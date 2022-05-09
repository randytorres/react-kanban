import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import 'i18n/config'

import { CardMenu, CardMenuProps } from './CardMenu'

const mockCardMenuProps = {
  cardAnchorEl: document.createElement("button"),
  handleCardMenuClose: jest.fn(),
  toggleEditCardModal: jest.fn(),
  onArchiveCard: jest.fn(),
}

const renderCardMenu = (props: CardMenuProps = mockCardMenuProps) => {
  return render(<CardMenu {...props} />)
}

describe('Card', () => {
  test('Calls toggleEditCardModal when Edit is clicked', () => {
    renderCardMenu()

    fireEvent.click(screen.getByText('Edit'))

    expect(mockCardMenuProps.toggleEditCardModal).toHaveBeenCalled()
  })


  test('Calls onArchiveCard when edit is clicked', () => {
    renderCardMenu()

    fireEvent.click(screen.getByText('Archive'))

    expect(mockCardMenuProps.onArchiveCard).toHaveBeenCalled()
  })

  test('Calls handleCardMenuClose when backdrop is clicked', () => {
    renderCardMenu()
    
    fireEvent.keyDown(screen.getByRole('presentation'), {
      key: 'Escape',
      code: 'Escape'
    })
  
    expect(mockCardMenuProps.handleCardMenuClose).toHaveBeenCalled()
  })
})