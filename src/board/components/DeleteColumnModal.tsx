import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'

import { DialogContentText } from '@mui/material'

interface DeleteColumnModalProps {
  deleteColumnModalOpen: boolean 
  toggleDeleteColumnModal: () => void
  onDeleteColumn: () => void
}

export const DeleteColumnModal: React.FC<DeleteColumnModalProps> = (props) => {
  const { t } = useTranslation()
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
      <DialogTitle>{t('column.deleteColumn.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('column.deleteColumn.description')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDeleteColumn} color='error' variant='contained'>{t('actions.delete')}</Button>
        <Button onClick={onCloseModal} variant='contained'>{t('actions.cancel')}</Button>
      </DialogActions>
    </Dialog>
  )
}