import React, { useState } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton'
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid'
import { useDrag } from 'react-dnd'

import { Card, CardProps } from './Card';

export type ColumnProps = {
  id: string
  name: string
  order: number
  index: number
}

export const Column: React.FC<ColumnProps> = (props) => {
  const [stuff, drag, dragPreview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
    type: 'COLUMNS',
		// The collect function utilizes a "monitor" instance (see the Overview for what this is)
		// to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: {...props, index}
  }))
  const [addCardDisplayOpen, setAddCardDisplayOpen] = useState<boolean>(false)
  const [cards, setCards] = useState<CardProps[]>([])
  const [cardName, setCardName] = useState('')
  const [description, setDescription] = useState('')
  const { id, name } = props
  console.info('stuff', stuff)

  const onOpenAddCardDisplay = () =>{
    setAddCardDisplayOpen(true)
  }

  const onCloseAddCardDisplay = () => {
    setAddCardDisplayOpen(false)
  }

  const onAddCard = () => {
    const newCard = {
      id: uuidv4(),
      name: cardName,
      description: description,
      createdAt: new Date(),
      status: '',
      order: cards.length + 1
    }
    const newCards = [
      ...cards,
      newCard,
    ]

    setCards(newCards)

    setCardName('')
    setDescription('')
    console.info('done')
  }

  return (
    <div ref={dragPreview}>
      <ColumnContainer
        id={id}
        ref={drag}
      >
        <HeaderContainer>
          <Title>{name}</Title>
          <IconContainer>
            <IconButton onClick={onOpenAddCardDisplay} disableRipple>
              <AddIcon />
            </IconButton>
            <IconButton onClick={() => {}} disableRipple>
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
        
          {cards.map(card => <Card key={card.id} {...card} />)} 
        </Content>
      </ColumnContainer>
    </div>
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