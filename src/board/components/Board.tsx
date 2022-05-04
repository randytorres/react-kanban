import React, { useEffect, useRef, useState } from 'react'
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
import { DragDropContext, Droppable, resetServerContext } from 'react-beautiful-dnd'


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

  const onDragEnd = (result: any) => {
    console.info('result', result)
    const { destination, source, draggableId, type } = result;
    //If there is no destination
    if (!destination) { return }

    //If source and destination is the same
    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    // //If you're dragging columns
    // if (type === 'column') {
    //   const newColumnOrder = Array.from(data.columnOrder);
    //   newColumnOrder.splice(source.index, 1);
    //   newColumnOrder.splice(destination.index, 0, draggableId);
    //   const newState = {
    //     ...data,
    //     columnOrder: newColumnOrder
    //   }
    //   setData(newState)
    //   return;
    // }

    // //Anything below this happens if you're dragging tasks
    // const start = data.columns[source.droppableId];
    // const finish = data.columns[destination.droppableId];

    // //If dropped inside the same column
    // if (start === finish) {
    //   const newTaskIds = Array.from(start.taskIds);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);
    //   const newColumn = {
    //     ...start,
    //     taskIds: newTaskIds
    //   }
    //   const newState = {
    //     ...data,
    //     columns: {
    //       ...data.columns,
    //       [newColumn.id]: newColumn
    //     }
    //   }
    //   setData(newState)
    //   return;
    // }

    // //If dropped in a different column
    // const startTaskIds = Array.from(start.taskIds);
    // startTaskIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   taskIds: startTaskIds
    // }

    // const finishTaskIds = Array.from(finish.taskIds);
    // finishTaskIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   taskIds: finishTaskIds
    // }

    // const newState = {
    //   ...data,
    //   columns: {
    //     ...data.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish
    //   }
    // }

    // setData(newState)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='test' direction='horizontal' type='column'>
        {(provided) => (
          <BoardContainer {...provided.droppableProps} ref={provided.innerRef}>
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
        )}
      </Droppable>
    </DragDropContext>
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