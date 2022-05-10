import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import 'i18n/config'

import { DeleteColumnModal } from './DeleteColumnModal'

const mockDeleteColumnModalProps = {
  deleteColumnModalOpen: true,
  toggleDeleteColumnModal: jest.fn(),
  onDeleteColumn: jest.fn(),
}

const renderDeleteColumnModal = (props = mockDeleteColumnModalProps) => {
  return render(<DeleteColumnModal {...props} />)
}

describe('DeleteColumnModal', () => {
  test('Calls toggleDeleteColumnModal when Cancel is clicked', () => {
    renderDeleteColumnModal()

    fireEvent.click(screen.getByText('Cancel'))

    expect(mockDeleteColumnModalProps.toggleDeleteColumnModal).toHaveBeenCalled()
  })

  test('Calls onDeleteColumn when Delete button is clicked', async () => {
    renderDeleteColumnModal()

    fireEvent.click(screen.getByText('Delete'))

    expect(mockDeleteColumnModalProps.onDeleteColumn).toHaveBeenCalled()
  })
})