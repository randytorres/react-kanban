import React, { useRef, useState } from 'react'
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
import { useDrop } from 'react-dnd'


import { Column, ColumnProps} from './Column'

export const Board: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [collectedProps, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'COLUMNS',
    drop: (item, monitor) => {
      console.info('ITEM', item)
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  }))
  const [columns, setColumns] = useState<ColumnProps[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [newColumnName, setNewColumnName] = useState('')

  console.info('Droping', collectedProps)
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

  // const onDragStart = (e: any) => {
  //   e.dataTransfer.setData('column_id', e.target.id);
  //   console.log('Dragstart on div: ', e.target.id);
  // }

  // const onDrop = (e: any) => {
  //   e.preventDefault()

  //   const columnId = e.dataTransfer.getData('column_id');

  //   console.info('Board - Drop', columnId)

  //   // const droppedColumn = columns.find(col => col.id === columnId)

  //   // const newColumns = [
  //   //   ...columns.filter(col => col.id !== columnId),
  //   // ]
  // }

  // const onDragOver = (e: any) => {
  //     e.preventDefault();
  //     console.info('Column - Drag Over')
  // }

  drop(ref)
  return (
    <BoardContainer ref={ref}>
      {columns.map((col, index) => <Column key={col.id} index={index} {...col} />)}
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