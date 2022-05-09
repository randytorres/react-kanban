import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { CardStatus } from 'global/interfaces'
import 'i18n/config'

import { EditCardModal } from './EditCardModal'

const mockEditCardModalProps = {
  editCardModalOpen: true, 
  toggleEditCardModal: jest.fn(),
  onEditCardSave: jest.fn(),
  card: {
    id: '09308-133',
    columnId: '123',
    name: 'Cool Card',
    description: 'Doing stuff',
    createdAt: new Date(),
    status: CardStatus.Open,
    order: 0,
  }
}

const renderEditCardModal = (props = mockEditCardModalProps) => {
  return render(<EditCardModal {...props} />)
}

describe('EditCardModal', () => {
  test('Calls toggleEditCardModal when Cancel is clicked', () => {
    renderEditCardModal()

    fireEvent.click(screen.getByText('Cancel'))

    expect(mockEditCardModalProps.toggleEditCardModal).toHaveBeenCalled()
  })
  
  test('Calls onEditCardSave with new name/description when Update is clicked', async () => {
    const cardName = 'My New Card'
    const cardDescription = 'My new Description'
    renderEditCardModal()

    const nameInput = screen.getByLabelText('Card Name') as HTMLInputElement
    expect(nameInput.value).toBe(mockEditCardModalProps.card.name)

    const descriptionInput = screen.getByLabelText('Description') as HTMLInputElement
    expect(descriptionInput.value).toBe(mockEditCardModalProps.card.description)

    fireEvent.change(nameInput, { target: { value: cardName }})
    fireEvent.change(descriptionInput, { target: { value: cardDescription }})

    fireEvent.click(screen.getByText('Update'))

    expect(mockEditCardModalProps.onEditCardSave).toBeCalledWith(cardName, cardDescription)
  })
})