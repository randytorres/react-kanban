import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface AddColumnModalProps {
  addColumnModalOpen: boolean 
  toggleAddColumnModal: () => void
  onAddColumn: (columnName: string) => void 
}

export const AddColumnModal: React.FC<AddColumnModalProps> = (props) => {
  const [newColumnName, setNewColumnName] = useState<string>('')

  const {
    addColumnModalOpen,
    toggleAddColumnModal,
  } = props

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(e.target.value)
  }

  const onAddColumn = () => {
    props.onAddColumn(newColumnName)
  }

  return (
    <Dialog
      open={addColumnModalOpen}
      onClose={toggleAddColumnModal} 
    >
      <DialogTitle>Add a Column</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Column Name'
          fullWidth
          variant='standard'
          onChange={onChangeText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleAddColumnModal} color='error' variant='contained'>Cancel</Button>
        <Button onClick={onAddColumn} color='success' variant='contained'>Create</Button>
      </DialogActions>
    </Dialog>

  )
}