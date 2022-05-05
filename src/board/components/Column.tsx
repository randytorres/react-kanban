import React, { useState } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton'
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { Card } from './Card';
import { CardStatus, ICard, IColumn } from '../../global/interfaces';

export interface ColumnProps extends IColumn {
  cards: ICard[]
  onAddCard: (cardName: string, description: string, columnId: string) => void
  handleColumnMenuOpen: any
  handleCardMenuOpen: any
  handleCardStatusChange: (cardId: string, status: CardStatus) => void
}

export const Column: React.FC<ColumnProps> = (props) => {
  const [addCardDisplayOpen, setAddCardDisplayOpen] = useState<boolean>(false)
  const [cardName, setCardName] = useState('')
  const [description, setDescription] = useState('')
  const { id, index, name, cards, handleColumnMenuOpen, handleCardMenuOpen, handleCardStatusChange } = props

  const onOpenAddCardDisplay = () =>{
    setAddCardDisplayOpen(true)
  }

  const onCloseAddCardDisplay = () => {
    setAddCardDisplayOpen(false)
  }

  const onAddCard = () => {
    props.onAddCard(cardName, description, id)

    setCardName('')
    setDescription('')
  }

  const onColumnSettingsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleColumnMenuOpen(e, id)
  }

  const cardsWithColumnData = cards
    .filter(card => card.columnId === id)
    .map(card => <Card key={card.id} {...card} handleCardMenuOpen={handleCardMenuOpen} handleCardStatusChange={handleCardStatusChange}  />)

  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided) => (
        <ColumnContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <HeaderContainer>
            <Title>{name}</Title>
            <IconContainer>
              <IconButton onClick={onOpenAddCardDisplay} disableRipple>
                <AddIcon />
              </IconButton>
              <IconButton onClick={onColumnSettingsClick} disableRipple>
                <FontAwesomeIcon icon={faEllipsis} />
              </IconButton>
            </IconContainer>
          </HeaderContainer>
          <Content>
            {addCardDisplayOpen && (
              <AddCardContainer>
                <TextField
                  multiline
                  autoFocus
                  margin='dense'
                  label='Enter a name'
                  fullWidth
                  variant='standard'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value)}
                  value={cardName}
                />
                <TextField
                  autoFocus
                  margin='dense'
                  label='Description'
                  fullWidth
                  variant='standard'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                  multiline
                  value={description}
                />
                <ActionContainer>
                  <AddButton
                    onClick={onAddCard}
                    color='success'
                    variant='contained'
                  >
                    Add
                  </AddButton>
                  <CancelButton
                    onClick={onCloseAddCardDisplay}
                    color='error'
                    variant='contained'
                  >
                    Cancel
                  </CancelButton>
                </ActionContainer>
              </AddCardContainer>
            )}
          
            <Droppable droppableId={id} type='task'>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {cardsWithColumnData}
                </div>
              )}
            </Droppable>
          </Content>
        </ColumnContainer>
      )}
    </Draggable>
  )
}

const ColumnContainer = styled.div({
  width: 315,
  padding: '10px 0',
  border: '1px solid #000',
  borderRadius: 5,
  marginRight: 16,
})

const HeaderContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #000',
  padding: '0 10px 10px',
})

const IconContainer = styled.div({
  display: 'flex',
  alignItems: 'center', 
})

const Title = styled.h3({
  margin: 0,
})

const Content = styled.div({
  padding: 10,
})

const AddButton = styled(Button)({
  width: '48%',
})

const CancelButton = styled(Button)({
  width: '48%',
})

const AddCardContainer = styled.div({
})

const ActionContainer = styled.div({
  paddingTop: 10,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
})