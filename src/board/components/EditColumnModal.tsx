import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'

import { IColumn } from '../../global/interfaces'

interface EditColumnModalProps {
  editColumnModalOpen: boolean 
  toggleEditColumnModal: () => void
  onEditColumnSave: any
  column: IColumn
}

export const EditColumnModal: React.FC<EditColumnModalProps> = (props) => {
  const { t } = useTranslation()
  const [editColumnText, setEditColumnText] = useState<string>(props.column.name)

  const {
    editColumnModalOpen,
    toggleEditColumnModal,
  } = props

  const onEditColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditColumnText(e.target.value)
  }

  const onEditColumnSave = () => {
    props.onEditColumnSave(editColumnText)
  }

  return (
    <Dialog
      open={editColumnModalOpen}
      onClose={toggleEditColumnModal} 
    >
      <DialogTitle>{t('column.editColumn.title')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label={t('column.editColumn.nameInputLabel')}
          fullWidth
          variant='standard'
          onChange={onEditColumnName}
          value={editColumnText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleEditColumnModal} color='error' variant='contained'>{t('actions.cancel')}</Button>
        <Button onClick={onEditColumnSave} color='success' variant='contained'>{t('actions.update')}</Button>
      </DialogActions>
    </Dialog>
  )
}