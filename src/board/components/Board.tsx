import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

import { Column } from './Column'
import { ICard, IColumn } from '../../global/interfaces';
import { EditColumnModal } from './EditColumnModal';
import { AddColumnModal } from './AddColumnModal';
import { ColumnMenu } from './ColumnMenu';

// TODO: fix eslint error
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add';import { DeleteColumnModal } from './DeleteColumnModal';
import { CardMenu } from './CardMenu';
import { EditCardModal } from './EditCardModal';
;

// TODO
// User can identify / switch status of card
// User can archive card
// ----
// DONE
// User can modify card details
// User can delete empty column
// User can modify column name
// User can add card to column with name and description
// User can add column with name
// User can move columns by drag & drop
// User can move / order card by drag & drop

export const Board: React.FC = () => {
  const [columns, setColumns] = useState<IColumn[]>([])
  const [cards, setCards] = useState<ICard[]>([])
  const [addColumnModalOpen, setAddColumnModalOpen] = useState<boolean>(false)
  const [editColumnModalOpen, setEditColumnModalOpen] = useState<boolean>(false)
  const [editColumn, setEditColumn] = React.useState<IColumn>();
  const [deleteColumnModalOpen, setDeleteColumnModalOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [cardAnchorEl, setCardAnchorEl] = React.useState<any>(null);
  const [cardToEdit, setCardToEdit] = React.useState<ICard>();
  const [editCardModalOpen, setEditCardModalOpen] = useState<boolean>(false)


  const toggleAddColumnModal = () => {
    setAddColumnModalOpen(!addColumnModalOpen)
  }

  const toggleEditColumnModal = () => {
    setEditColumnModalOpen(!editColumnModalOpen)
  }

  const handleColumnMenuClose = () => {
    setAnchorEl(null)
  }

  const handleColumnMenuOpen = (event: React.ChangeEvent<HTMLButtonElement>, columnId: string) => {
    setAnchorEl(event.currentTarget);

    const columnToEdit = columns.find(col => col.id === columnId)
    setEditColumn(columnToEdit)
  };

  const handleCardMenuClose = () => {
    setCardAnchorEl(null)
  }

  const handleCardMenuOpen = (event: React.ChangeEvent<HTMLButtonElement>, cardId: string) => {
    setCardAnchorEl(event.currentTarget);

    const cardToModify = cards.find(card => card.id === cardId)
    if (cardToModify) {
      setCardToEdit(cardToModify)
    }
  };

  const toggleEditCardModal = () => {
    setEditCardModalOpen(!editCardModalOpen)
  }

  const toggleDeleteColumnModal = () => {
    const newColumnState = !deleteColumnModalOpen
    setDeleteColumnModalOpen(newColumnState)

    // Automatically close column menu
    if (newColumnState === false) {
      handleColumnMenuClose()
    }
  } 

  const onDeleteColumn = () => {
    const newColumns = Array.from(columns)

    const columnToDeleteIndex = newColumns.findIndex(col => col.id === editColumn?.id)

    if (columnToDeleteIndex) {
      newColumns.splice(columnToDeleteIndex, 1)
      setColumns(newColumns.map((col, index) => ({ ...col, index, order: index })))
      toggleDeleteColumnModal()
    }
  }

  const onAddColumn = (newColumnName: string) => {
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

    toggleAddColumnModal()
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

  const onEditColumnSave = (editColumnText: string) => {
    if (!editColumn) return

    const editedColumns = Array.from(columns)
    const columnToEditIndex = columns.findIndex(col => col.id === editColumn?.id)
    editedColumns[columnToEditIndex] = {
      ...editColumn,
      name: editColumnText
    }

    setColumns(editedColumns)

    toggleEditColumnModal()
    handleColumnMenuClose()
  }

  const onEditCardSave = (name: string, description: string) => {
    if (!cardToEdit) return

    const editedCards = Array.from(cards)
    const cardToEditIndex = cards.findIndex(card => card.id === cardToEdit?.id)
    editedCards[cardToEditIndex] = {
      ...cardToEdit,
      name,
      description,
    }

    setCards(editedCards)

    toggleEditCardModal()
    handleCardMenuClose()
  }

  /**
   * Is called with columns and cards are moved.
   */
  const onDragEnd = (result: DropResult) => {
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
                handleColumnMenuOpen={handleColumnMenuOpen}
                handleCardMenuOpen={handleCardMenuOpen}
              />
            ))}
            <AddColumn onClick={toggleAddColumnModal}>
              <AddIcon />
              Add Column
            </AddColumn>
            <AddColumnModal
              addColumnModalOpen={addColumnModalOpen}
              toggleAddColumnModal={toggleAddColumnModal}
              onAddColumn={onAddColumn}
            /> 
          </BoardContainer>
        )}
      </Droppable>
      <ColumnMenu
        anchorEl={anchorEl}
        handleColumnMenuClose={handleColumnMenuClose}
        toggleEditColumnModal={toggleEditColumnModal}
        toggleDeleteColumnModal={toggleDeleteColumnModal}
      />
      {editColumn && (
        <>
          <EditColumnModal
            editColumnModalOpen={editColumnModalOpen}
            toggleEditColumnModal={toggleEditColumnModal}
            onEditColumnSave={onEditColumnSave}
            column={editColumn}
          />
          <DeleteColumnModal
            deleteColumnModalOpen={deleteColumnModalOpen}
            toggleDeleteColumnModal={toggleDeleteColumnModal}
            onDeleteColumn={onDeleteColumn}
          />
        </>
      )}

      {/* Card Actions */}
      <CardMenu
        cardAnchorEl={cardAnchorEl}
        handleCardMenuClose={handleCardMenuClose}
        toggleEditCardModal={toggleEditCardModal}
      />
      {cardToEdit && (
        <EditCardModal
          editCardModalOpen={editCardModalOpen}
          toggleEditCardModal={toggleEditCardModal}
          card={cardToEdit}
          onEditCardSave={onEditCardSave}
        />
      )}
      
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