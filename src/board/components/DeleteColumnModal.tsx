import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button';

import { DialogContentText } from '@mui/material';

interface DeleteColumnModalProps {
  deleteColumnModalOpen: boolean 
  toggleDeleteColumnModal: () => void
  onDeleteColumn: any
}

export const DeleteColumnModal: React.FC<DeleteColumnModalProps> = (props) => {
  const {
    deleteColumnModalOpen,
    toggleDeleteColumnModal,
    onDeleteColumn 
  } = props

  const onCloseModal = () => {
    toggleDeleteColumnModal()
  }

  return (
    <Dialog
      open={deleteColumnModalOpen}
      onClose={onCloseModal} 
    >
      <DialogTitle>Delete Column</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action will delete the column.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDeleteColumn} color='error' variant='contained'>Delete Column</Button>
        <Button onClick={onCloseModal} variant='contained'>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}