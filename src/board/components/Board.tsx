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
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { Column } from './Column'
import { ICard, IColumn } from '../../global/interfaces';

export const Board: React.FC = () => {
  const [columns, setColumns] = useState<IColumn[]>([])
  const [cards, setCards] = useState<ICard[]>([])
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
    const newIndex = columns.length
    const newColumn = {
      id: uuidv4(),
      name: newColumnName,
      order: newIndex,
      index: newIndex
    }

    const newColumns = [
      ...columns,
      newColumn,
    ]
    setColumns(newColumns)

    handleModalClose()
  }

  const onAddCard = (cardName: string, description: string, columnId: string) => {
    const cardsInColumn = cards.filter(card => card.columnId === columnId)
    const newIndex = cardsInColumn.length
    const newCard = {
      id: uuidv4(),
      columnId,
      name: cardName,
      description: description,
      createdAt: new Date(),
      status: '',
      order: newIndex,
      index: newIndex,
    }
    const newCards = [
      ...cards,
      newCard,
    ]

    setCards(newCards)
  }

  /**
   * Is called with columns and cards are moved.
   */
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) { return }

    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    /**
     * Handle Column Moved
     */
    if (type === 'column') {
      const columnToMove = columns.find(col => col.id === draggableId)
      if (!columnToMove) return

      let reOrderedColumns = columns
      reOrderedColumns.splice(source.index, 1);
      reOrderedColumns.splice(destination.index, 0, columnToMove);
      // TODO: Do we need columns prop?
      reOrderedColumns = reOrderedColumns.map((col, index) => ({ ...col, order: index, index: index }))
      setColumns(reOrderedColumns)
      return;
    }

    /**
     * Handle Card Moved
     * **/
    const startColumn = columns.find(col => col.id === source.droppableId)
    const finishColumn = columns.find(col => col.id === destination.droppableId)
    const cardToMove = cards.find(card => card.id === draggableId)

    if (!cardToMove || !finishColumn) return

    // Card dropped inside same column
    if (startColumn && finishColumn && startColumn.id === finishColumn.id) {
      let cardsInDroppedColumn = cards.filter(card => card.columnId === startColumn.id) 
      cardsInDroppedColumn.splice(source.index, 1);
      cardsInDroppedColumn.splice(destination.index, 0, cardToMove);

      cardsInDroppedColumn = cardsInDroppedColumn.map((card, index) => ({ ...card, order: index, index: index }))
      setCards([
        ...cards.filter(card => card.columnId !== startColumn.id),
        ...cardsInDroppedColumn
      ])
      return;
    }

    // Card dropped in different column
    const cardsInStartColumn = cards.filter(card => card.columnId === source.droppableId)
    cardsInStartColumn.splice(source.index, 1)

    const cardsInFinishColumn = cards.filter(card => card.columnId === destination.droppableId)
    const newCard = {
      ...cardToMove,
      columnId: finishColumn?.id,
    }
    cardsInFinishColumn.splice(destination.index, 0, newCard)

    const updatedCardInStartColumn = cardsInStartColumn.map((card, index) => ({ ...card, index, order: index }))
    const updatedCardInFinishColumn = cardsInFinishColumn.map((card, index) => ({ ...card, index, order: index }))
    setCards([
      ...cards.filter(card => card.columnId !== startColumn?.id && card.columnId !== destination.droppableId),
      ...updatedCardInStartColumn,
      ...updatedCardInFinishColumn,
    ])
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => (
          <BoardContainer {...provided.droppableProps} ref={provided.innerRef}>
            {columns.map((col, index) => (
              <Column
                {...col}
                key={col.id}
                index={index}
                onAddCard={onAddCard}
                cards={cards}
              />
            ))}
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