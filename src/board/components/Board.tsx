import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import { Theme, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

import { Column } from './Column'
import { DeleteColumnModal } from './DeleteColumnModal'
import { EditColumnModal } from './EditColumnModal'
import { AddColumnModal } from './AddColumnModal'
import { ColumnMenu } from './ColumnMenu'
import { CardMenu } from './CardMenu'
import { EditCardModal } from './EditCardModal'
import { CardStatus, ICard, IColumn } from '../../global/interfaces'
import { findItemById, getCardsInColumn, updateOrder } from '../utils/boardUtils'

// TODO:
  // Unit Tests
  // Add Comments
  // Styling issues
  // Update readme
  // Deploy


export const Board: React.FC = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  // Items (columns, card, archivedCards)
  const [columns, setColumns] = useState<IColumn[]>([])
  const [cards, setCards] = useState<ICard[]>([])
  const [archivedCards, setArchivedCards] = useState<ICard[]>([])
  // Modals
  const [addColumnModalOpen, setAddColumnModalOpen] = useState<boolean>(false)
  const [editColumnModalOpen, setEditColumnModalOpen] = useState<boolean>(false)
  const [deleteColumnModalOpen, setDeleteColumnModalOpen] = useState<boolean>(false)
  const [editCardModalOpen, setEditCardModalOpen] = useState<boolean>(false)
  // Cards/Columns to edit 
  const [columnToEdit, setColumnToEdit] = React.useState<IColumn>()
  const [cardToEdit, setCardToEdit] = React.useState<ICard>()
  // Menu anchor elements
  const [columnAnchorEl, setColumnAnchorEl] = React.useState<Element | null>(null)
  const [cardAnchorEl, setCardAnchorEl] = React.useState<Element | null>(null)

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

  /**
   * Columns
   */
  const toggleAddColumnModal = () => {
    setAddColumnModalOpen(!addColumnModalOpen)
  }

  const toggleEditColumnModal = () => {
    setEditColumnModalOpen(!editColumnModalOpen)
  }

  const handleColumnMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, columnId: string) => {
    setColumnAnchorEl(event.currentTarget)

    const columnToEdit = findItemById(columns, columnId)
    setColumnToEdit(columnToEdit)
  }

  const handleColumnMenuClose = () => {
    setColumnAnchorEl(null)
  }

  const onAddColumn = (newColumnName: string) => {
    const newIndex = columns.length
    const newColumn = {
      id: uuidv4(),
      name: newColumnName,
      order: newIndex,
    }

    const newColumns = [
      ...columns,
      newColumn,
    ]
    saveColumns(newColumns)

    toggleAddColumnModal()
  }

  const onEditColumnSave = (editColumnText: string) => {
    if (!columnToEdit) return

    const editedColumns = Array.from(columns)
    const columnToEditIndex = columns.findIndex(col => col.id === columnToEdit?.id)
    editedColumns[columnToEditIndex] = {
      ...columnToEdit,
      name: editColumnText
    }

    saveColumns(editedColumns)

    toggleEditColumnModal()
    handleColumnMenuClose()
  }

  const onDeleteColumn = () => {
    const newColumns = Array.from(columns)

    const columnToDeleteIndex = newColumns.findIndex(col => col.id === columnToEdit?.id)

    if (columnToDeleteIndex >= 0) {
      newColumns.splice(columnToDeleteIndex, 1)
      saveColumns(updateOrder(newColumns))
      toggleDeleteColumnModal()
    }
  }

  const toggleDeleteColumnModal = () => {
    const newColumnState = !deleteColumnModalOpen
    setDeleteColumnModalOpen(newColumnState)

    // Automatically close column menu
    if (newColumnState === false) {
      handleColumnMenuClose()
    }
  }

  /**
   * Cards
   */
  const handleCardMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, cardId: string) => {
    setCardAnchorEl(event.currentTarget)


    const cardToModify = findItemById(cards, cardId)
    setCardToEdit(cardToModify)
  }

  const handleCardMenuClose = () => {
    setCardAnchorEl(null)
  }

  const toggleEditCardModal = () => {
    setEditCardModalOpen(!editCardModalOpen)
  }

  const onAddCard = (cardName: string, description: string, columnId: string) => {
    const cardsInColumn = getCardsInColumn(cards, columnId)
    const newIndex = cardsInColumn.length
    const newCard = {
      id: uuidv4(),
      columnId,
      name: cardName,
      description: description,
      createdAt: new Date(),
      status: CardStatus.Open,
      order: newIndex,
    }
    const newCards = [
      ...cards,
      newCard,
    ]

    saveCards(newCards)
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
      saveCards(updateOrder(newCards))
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
   * Drag and Drop - Called when columns and cards are moved.
   */
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result
    if (!destination) { return }

    if (destination.droppableId === source?.droppableId && destination.index === source?.index) { return }

    /**
     * Handle Column Moved
     */
    if (type === 'column') {
      const columnToMove = findItemById(columns, draggableId)
      if (!columnToMove) return

      let reOrderedColumns = Array.from(columns)
      reOrderedColumns.splice(source.index, 1)
      reOrderedColumns.splice(destination.index, 0, columnToMove)
      reOrderedColumns = updateOrder(reOrderedColumns)
      saveColumns(reOrderedColumns)
      return
    }

    /**
     * Handle Card Moved
     * **/
    const startColumn = findItemById(columns, source.droppableId)
    const finishColumn = findItemById(columns, destination.droppableId)
    const cardToMove = findItemById(cards, draggableId)

    if (!cardToMove || !finishColumn) return

    // Card dropped inside same column
    if (startColumn?.id === finishColumn.id) {
      let cardsInDroppedColumn = getCardsInColumn(cards, startColumn.id) 
      cardsInDroppedColumn.splice(source.index, 1)
      cardsInDroppedColumn.splice(destination.index, 0, cardToMove)

      cardsInDroppedColumn = updateOrder(cardsInDroppedColumn)
      const cardsNotInDroppedColumn = cards.filter(card => card.columnId !== startColumn.id)
      saveCards([
        ...cardsNotInDroppedColumn,
        ...cardsInDroppedColumn
      ])
      return
    }

    // Card dropped in different column
    const cardsInStartColumn = getCardsInColumn(cards, source.droppableId)
    cardsInStartColumn.splice(source.index, 1)

    const cardsInFinishColumn = getCardsInColumn(cards, destination.droppableId)
    const newCard = {
      ...cardToMove,
      columnId: finishColumn?.id,
    }
    cardsInFinishColumn.splice(destination.index, 0, newCard)

    const updatedCardsInStartColumn = updateOrder(cardsInStartColumn)
    const updatedCardsInFinishColumn = updateOrder(cardsInFinishColumn)
    const cardsNotInStartOrFinishColumn = cards.filter(card => card.columnId !== startColumn?.id && card.columnId !== destination.droppableId)
    saveCards([
      ...cardsNotInStartOrFinishColumn,
      ...updatedCardsInStartColumn,
      ...updatedCardsInFinishColumn,
    ])
  }

  /**
   * Restores data from localStorage
   * */ 
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

  console.info('cardToEdit', cardToEdit)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: '100%', paddingBottom: 35 }}>
            <BoardContainer>
              {columns.map((col) => (
                <Column
                  {...col}
                  key={col.id}
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
                <AddColumnText theme={theme}>{t('board.addColumn')}</AddColumnText>
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
        columnAnchorEl={columnAnchorEl}
        handleColumnMenuClose={handleColumnMenuClose}
        toggleEditColumnModal={toggleEditColumnModal}
        toggleDeleteColumnModal={toggleDeleteColumnModal}
        cards={cards}
      />
      {columnToEdit && (
        <>
          <EditColumnModal
            editColumnModalOpen={editColumnModalOpen}
            toggleEditColumnModal={toggleEditColumnModal}
            onEditColumnSave={onEditColumnSave}
            column={columnToEdit}
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
  overflowY: 'hidden',
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