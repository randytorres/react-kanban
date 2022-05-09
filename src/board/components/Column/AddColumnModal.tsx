import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'

interface AddColumnModalProps {
  addColumnModalOpen: boolean
  toggleAddColumnModal: () => void
  onAddColumn: (columnName: string) => void
}

export const AddColumnModal: React.FC<AddColumnModalProps> = (props) => {
  const { t } = useTranslation()
  const [newColumnName, setNewColumnName] = useState<string>('')
  const [errorText, setErrorText] = useState<string>('')

  const {
    addColumnModalOpen,
    toggleAddColumnModal,
  } = props

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(e?.target?.value)
    if (errorText) {
      setErrorText('')
    }
  }

  const onAddColumn = () => {
    if (!newColumnName) {
      setErrorText('Name is required')
      return
    }
    props.onAddColumn(newColumnName)
  }

  return (
    <Dialog
      open={addColumnModalOpen}
      onClose={toggleAddColumnModal}
    >
      <DialogTitle>{t('column.addColumn.title')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          error={!!errorText}
          helperText={errorText}
          margin='dense'
          label={t('column.addColumn.nameInputLabel')}
          fullWidth
          variant='standard'
          onChange={onChangeText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleAddColumnModal} color='error' variant='contained'>{t('actions.cancel')}</Button>
        <Button onClick={onAddColumn} color='success' variant='contained'>{t('actions.add')}</Button>
      </DialogActions>
    </Dialog>

  )
}