import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { ICard, IColumn } from '../../global/interfaces';

interface EditCardModalProps {
  editCardModalOpen: boolean 
  toggleEditCardModal: () => void
  onEditCardSave: any
  card: ICard
}

export const EditCardModal: React.FC<EditCardModalProps> = (props) => {
  const [name, setName] = useState<string>(props.card.name);
  const [description, setDescription] = useState<string>(props.card.description);

  const {
    editCardModalOpen,
    toggleEditCardModal,
  } = props

  const onEditCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onEditCardDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const onEditCardSave = () => {
    props.onEditCardSave(name, description)
  }

  return (
    <Dialog
      open={editCardModalOpen}
      onClose={toggleEditCardModal} 
    >
      <DialogTitle>Edit Card</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Card Name'
          fullWidth
          variant='standard'
          onChange={onEditCardName}
          value={name}
        />
        <TextField
          margin='dense'
          label='Description'
          fullWidth
          variant='standard'
          onChange={onEditCardDescription}
          value={description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleEditCardModal} color='error' variant='contained'>Cancel</Button>
        <Button onClick={onEditCardSave} color='success' variant='contained'>Update Card</Button>
      </DialogActions>
    </Dialog>
  )
}