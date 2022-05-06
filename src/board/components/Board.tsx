import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add';

import { Column } from './Column'
import { DeleteColumnModal } from './DeleteColumnModal';
import { EditColumnModal } from './EditColumnModal';
import { AddColumnModal } from './AddColumnModal';
import { ColumnMenu } from './ColumnMenu';
import { CardStatus, ICard, IColumn } from '../../global/interfaces';
import { CardMenu } from './CardMenu';
import { EditCardModal } from './EditCardModal';
import { Theme } from '@mui/material/styles';

interface BoardProps {
  theme: Theme
}

export const Board: React.FC<BoardProps> = (props) => {
  const [columns, setColumns] = useState<IColumn[]>([])
  const [cards, setCards] = useState<ICard[]>([])
  const [archivedCards, setArchivedCards] = useState<ICard[]>([])
  const [addColumnModalOpen, setAddColumnModalOpen] = useState<boolean>(false)
  const [editColumnModalOpen, setEditColumnModalOpen] = useState<boolean>(false)
  const [editColumn, setEditColumn] = React.useState<IColumn>();
  const [deleteColumnModalOpen, setDeleteColumnModalOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [cardAnchorEl, setCardAnchorEl] = React.useState<any>(null);
  const [cardToEdit, setCardToEdit] = React.useState<ICard>();
  const [editCardModalOpen, setEditCardModalOpen] = useState<boolean>(false)

  const { theme } = props

  const saveColumns = (columns: IColumn[]) => {
    window.localStorage.setItem('columns', JSON.stringify(columns))
    setColumns(columns)
  }

  const saveCards = (cards: ICard[]) => {
    window.localStorage.setItem('cards', JSON.stringify(cards))
    setCards(cards)
  }

  const saveArchivedCards = (cards: ICard[]) => {
    window.localStorage.setItem('archived_cards', JSON.stringify(cards))
    setArchivedCards(cards)
  }

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

    if (columnToDeleteIndex >= 0) {
      newColumns.splice(columnToDeleteIndex, 1)
      saveColumns(newColumns.map((col, index) => ({ ...col, index, order: index })))
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
    saveColumns(newColumns)

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
      status: CardStatus.Open,
      order: newIndex,
      index: newIndex,
    }
    const newCards = [
      ...cards,
      newCard,
    ]

    saveCards(newCards)
  }

  const onEditColumnSave = (editColumnText: string) => {
    if (!editColumn) return

    const editedColumns = Array.from(columns)
    const columnToEditIndex = columns.findIndex(col => col.id === editColumn?.id)
    editedColumns[columnToEditIndex] = {
      ...editColumn,
      name: editColumnText
    }

    saveColumns(editedColumns)

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

    saveCards(editedCards)

    toggleEditCardModal()
    handleCardMenuClose()
  }

  const onArchiveCard = () => {
    const newCards = Array.from(cards)

    if (!cardToEdit) return

    const cardToArchiveIndex = newCards.findIndex(card => card.id === cardToEdit?.id)

    if (cardToArchiveIndex >= 0) {
      newCards.splice(cardToArchiveIndex, 1)
      saveCards(newCards.map((card, index) => ({ ...card, index, order: index })))
      saveArchivedCards([
        ...archivedCards,
        cardToEdit,
      ])
    }

    handleCardMenuClose()
  }

  const handleCardStatusChange = (cardId: string, status: CardStatus) => {
    const newCards = Array.from(cards)

    const cardToEditIndex = newCards.findIndex(card => card.id === cardId)

    if (cardToEditIndex >= 0) {
      newCards[cardToEditIndex] = {
        ...newCards[cardToEditIndex],
        status,
      }
      saveCards(newCards)
    }
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
      saveColumns(reOrderedColumns)
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
      saveCards([
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
    saveCards([
      ...cards.filter(card => card.columnId !== startColumn?.id && card.columnId !== destination.droppableId),
      ...updatedCardInStartColumn,
      ...updatedCardInFinishColumn,
    ])
  }

  useEffect(() => {
    const savedColumns = window.localStorage.getItem('columns')
    const savedCards = window.localStorage.getItem('cards')
    const savedArchivedCards = window.localStorage.getItem('archived_cards')
    
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns))
    }
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
    if (savedArchivedCards) {
      setArchivedCards(JSON.parse(savedArchivedCards))
    }
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: '100%' }}>
            <BoardContainer>
              {columns.map((col, index) => (
                <Column
                  {...col}
                  key={col.id}
                  index={index}
                  onAddCard={onAddCard}
                  cards={cards}
                  handleColumnMenuOpen={handleColumnMenuOpen}
                  handleCardMenuOpen={handleCardMenuOpen}
                  handleCardStatusChange={handleCardStatusChange}
                />
              ))}
              {provided.placeholder}
              <AddColumn onClick={toggleAddColumnModal}>
                <AddIcon style={{ color: theme.palette.text.primary }} />
                <AddColumnText theme={theme}>Add Column</AddColumnText>
              </AddColumn>
              <AddColumnModal
                addColumnModalOpen={addColumnModalOpen}
                toggleAddColumnModal={toggleAddColumnModal}
                onAddColumn={onAddColumn}
              /> 
            </BoardContainer>
          
          </div>
        )}
      </Droppable>
      

      {/* Column Actions */}
      <ColumnMenu
        anchorEl={anchorEl}
        handleColumnMenuClose={handleColumnMenuClose}
        toggleEditColumnModal={toggleEditColumnModal}
        toggleDeleteColumnModal={toggleDeleteColumnModal}
        canDeleteColumn={cards.length === 0}
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
        onArchiveCard={onArchiveCard}
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
  height: '100%',
  paddingTop: 10,
  flexDirection: 'row',
  display: 'flex',
  width: 'fit-content',
})

const AddColumn = styled.button({
  cursor: 'pointer',
  width: 315,
  height: 115,
  padding: '40px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderStyle: 'dotted',
  borderRadius: 5,
  backgroundColor: 'transparent',
})

const AddColumnText = styled.p(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.primary,
  margin: 0,
  paddingLeft: 5,
}))