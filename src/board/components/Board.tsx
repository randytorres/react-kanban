import React, { useState } from 'react'
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid'

import { Column, ColumnProps} from './Column'

export const Board: React.FC = () => {
  const [columns, setColumns] = useState<ColumnProps[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [newColumnName, setNewColumnName] = useState('')

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(e.target.value)
  }

  const onAddColumn = () => {
    const newColumn = {
      id: uuidv4(),
      name: newColumnName,
      order: columns.length + 1
    }

    const newColumns = [
      ...columns,
      newColumn,
    ]
    setColumns(newColumns)

    handleModalClose()
  }


  return (
    <BoardContainer>
      {columns.map(col => <Column key={col.id} {...col} />)}
      <AddColumn onClick={handleModalOpen}>
        <AddIcon />
        Add Column
      </AddColumn>
      <Dialog
        open={modalOpen}
        onClose={handleModalClose} 
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
          <Button onClick={handleModalClose} color='error' variant='contained'>Cancel</Button>
          <Button onClick={onAddColumn} color='success' variant='contained'>Create</Button>
        </DialogActions>
      </Dialog>
    </BoardContainer>
  )
}

const BoardContainer = styled.div({
  padding: 20,
  flexDirection: 'row',
  display: 'flex',
})

const AddColumn = styled.button({
  cursor: 'pointer',
  width: 315,
  padding: '40px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderStyle: 'dotted'
})