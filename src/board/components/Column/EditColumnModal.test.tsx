import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import 'i18n/config'

import { EditColumnModal } from './EditColumnModal'

const mockEditColumnModalProps = {
  editColumnModalOpen: true,
  toggleEditColumnModal: jest.fn(),
  onEditColumnSave: jest.fn(),
  column: {
    id: '09308-133',
    name: 'Cool Column',
    order: 0,
  }
}

const renderEditColumnModal = (props = mockEditColumnModalProps) => {
  return render(<EditColumnModal {...props} />)
}

describe('EditColumnModal', () => {
  test('Calls toggleEditColumnModal when Cancel is clicked', () => {
    renderEditColumnModal()

    fireEvent.click(screen.getByText('Cancel'))

    expect(mockEditColumnModalProps.toggleEditColumnModal).toHaveBeenCalled()
  })

  test('Calls onEditColumnSave with new name when Update is clicked', async () => {
    const columnName = 'My New Column'
    renderEditColumnModal()

    const nameInput = screen.getByLabelText('Column Name') as HTMLInputElement
    expect(nameInput.value).toBe(mockEditColumnModalProps.column.name)

    fireEvent.change(nameInput, { target: { value: columnName }})

    fireEvent.click(screen.getByText('Update'))

    expect(mockEditColumnModalProps.onEditColumnSave).toBeCalledWith(columnName)
  })
})