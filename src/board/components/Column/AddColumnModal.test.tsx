import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import 'i18n/config'

import { AddColumnModal } from './AddColumnModal'

const mockAddColumnModalProps = {
  addColumnModalOpen: true,
  toggleAddColumnModal: jest.fn(),
  onAddColumn: jest.fn(),
}

const renderAddColumnModal = (props = mockAddColumnModalProps) => {
  return render(<AddColumnModal {...props} />)
}

describe('AddColumnModal', () => {
  test('Calls toggleAddColumnModal when Cancel is clicked', () => {
    renderAddColumnModal()

    fireEvent.click(screen.getByText('Cancel'))

    expect(mockAddColumnModalProps.toggleAddColumnModal).toHaveBeenCalled()
  })
  
  test('Calls onAddColumn when a new column is created', async () => {
    const columnName = "My New Column"
    renderAddColumnModal()

    const nameInput = screen.getByLabelText("Column Name") as HTMLInputElement
    expect(nameInput.value).toBe('')

    fireEvent.change(nameInput, { target: { value: columnName }})

    expect(nameInput.value).toBe(columnName);
    fireEvent.click(screen.getByText('Add'))

    expect(mockAddColumnModalProps.onAddColumn).toBeCalledWith(columnName)
  })

  test('Displays error text when trying to create column with empty name input', async () => {
    renderAddColumnModal()

    fireEvent.click(screen.getByText('Add'))

    expect(screen.getByText("Name is required")).toBeInTheDocument()
  })
})