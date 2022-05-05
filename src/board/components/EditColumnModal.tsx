import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { IColumn } from '../../global/interfaces';

interface EditColumnModalProps {
  editColumnModalOpen: boolean 
  handleEditColumnModalClose: () => void
  onEditColumnSave: any
  column: IColumn
}

export const EditColumnModal: React.FC<EditColumnModalProps> = (props) => {
  const [editColumnText, setEditColumnText] = useState<string>(props.column.name);

  const {
    editColumnModalOpen,
    handleEditColumnModalClose,
    onEditColumnSave 
  } = props

  const onEditColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditColumnText(e.target.value)
  }

  return (
    <Dialog
      open={editColumnModalOpen}
      onClose={handleEditColumnModalClose} 
    >
      <DialogTitle>Edit Column</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Column Name'
          fullWidth
          variant='standard'
          onChange={onEditColumnName}
          value={editColumnText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditColumnModalClose} color='error' variant='contained'>Cancel</Button>
        <Button onClick={onEditColumnSave} color='success' variant='contained'>Update Column</Button>
      </DialogActions>
    </Dialog>
  )
}