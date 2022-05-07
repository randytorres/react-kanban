import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'

import { ICard } from '../../global/interfaces'

interface EditCardModalProps {
  editCardModalOpen: boolean 
  toggleEditCardModal: () => void
  onEditCardSave: (name: string, description: string) => void
  card: ICard
}

export const EditCardModal: React.FC<EditCardModalProps> = (props) => {
  const { t } = useTranslation()
  const [name, setName] = useState<string>(props.card.name)
  const [description, setDescription] = useState<string>(props.card.description)

  const {
    editCardModalOpen,
    toggleEditCardModal,
  } = props

  const onEditCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e?.target?.value)
  }

  const onEditCardDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e?.target?.value)
  }

  const onEditCardSave = () => {
    props.onEditCardSave(name, description)
  }

  return (
    <Dialog
      open={editCardModalOpen}
      onClose={toggleEditCardModal} 
    >
      <DialogTitle>{t('card.editCard.title')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label={t('card.editCard.nameInputLabel')}
          fullWidth
          variant='standard'
          onChange={onEditCardName}
          value={name}
        />
        <TextField
          margin='dense'
          label={t('card.editCard.descriptionInputLabel')}
          fullWidth
          variant='standard'
          onChange={onEditCardDescription}
          value={description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleEditCardModal} color='error' variant='contained'>{t('actions.cancel')}</Button>
        <Button onClick={onEditCardSave} color='success' variant='contained'>{t('actions.update')}</Button>
      </DialogActions>
    </Dialog>
  )
}