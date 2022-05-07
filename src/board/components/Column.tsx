import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useTheme, Theme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

import { Card } from './Card'
import { CardStatus, ICard, IColumn } from '../../global/interfaces'

export interface ColumnProps extends IColumn {
  cards: ICard[]
  onAddCard: (cardName: string, description: string, columnId: string) => void
  handleColumnMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, columnId: string) => void
  handleCardMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, cardId: string) => void
  handleCardStatusChange: (cardId: string, status: CardStatus) => void
}

export const Column: React.FC<ColumnProps> = (props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [addCardDisplayOpen, setAddCardDisplayOpen] = useState<boolean>(false)
  const [cardName, setCardName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [nameErrorText, setNameErrorText] = useState<string>('')
  const [descriptionErrorText, setDescriptionErrorText] = useState<string>('')

  const { id, order, name, cards, handleColumnMenuOpen, handleCardMenuOpen, handleCardStatusChange } = props

  const onOpenAddCardDisplay = () =>{
    setAddCardDisplayOpen(true)
  }

  const onCloseAddCardDisplay = () => {
    setAddCardDisplayOpen(false)
  }

  const onNameChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value)
    if (nameErrorText) {
      setNameErrorText('')
    }
  }

  const onDescriptionChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
    if (descriptionErrorText) {
      setDescriptionErrorText('')
    }
  }

  const onAddCard = () => {
    if (!cardName) {
      setNameErrorText('Name is required')
      return
    }
    if (!description) {
      setDescriptionErrorText('Description is required')
      return
    }
    
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
    <Draggable draggableId={id} index={order} key={id}>
      {(provided) => (
        <ColumnContainer
          theme={theme}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <HeaderContainer theme={theme}>
            <Title>{name}</Title>
            <IconContainer>
              <IconButton onClick={onOpenAddCardDisplay} disableRipple>
                <AddIcon />
              </IconButton>
              <IconButton onClick={onColumnSettingsClick} disableRipple id={id}>
                <FontAwesomeIcon icon={faEllipsis} />
              </IconButton>
            </IconContainer>
          </HeaderContainer>
          <Content>
            {addCardDisplayOpen && (
              <AddCardContainer>
                <TextField
                  autoFocus
                  error={!!nameErrorText}
                  helperText={nameErrorText}
                  margin='dense'
                  label={t('card.addCard.name')}
                  fullWidth
                  variant='standard'
                  onChange={onNameChangeText}
                  value={cardName}
                />
                <TextField
                  error={!!descriptionErrorText}
                  helperText={descriptionErrorText}
                  multiline
                  margin='dense'
                  label={t('card.addCard.description')}
                  fullWidth
                  variant='standard'
                  onChange={onDescriptionChangeText}
                  value={description}
                />
                <ActionContainer>
                  <AddButton
                    onClick={onAddCard}
                    color='success'
                    variant='contained'
                  >
                    {t('actions.add')}
                  </AddButton>
                  <CancelButton
                    onClick={onCloseAddCardDisplay}
                    color='error'
                    variant='contained'
                  >
                    {t('actions.cancel')}
                  </CancelButton>
                </ActionContainer>
              </AddCardContainer>
            )}
          
            <Droppable droppableId={id} type='card'>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ height: '100%' }}
                >
                  {cardsWithColumnData.length > 0
                    ? cardsWithColumnData
                    : addCardDisplayOpen
                      ? null
                      : <HelperText>{t('card.addCard.helperText1')} <AddIcon style={{ margin: '0 5px' }} /> {t('card.addCard.helperText2')}</HelperText>
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Content>
        </ColumnContainer>
      )}
    </Draggable>
  )
}

const ColumnContainer = styled.div(({ theme }: { theme: Theme }) => ({
  width: 315,
  padding: '10px 0',
  border: `1px solid ${theme.palette.action.disabled}`,
  borderRadius: 5,
  marginRight: 16,
  overflow: 'scroll',
}))

const HeaderContainer = styled.div(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.action.disabled}`,
  padding: '0 10px 10px',
}))

const IconContainer = styled.div({
  display: 'flex',
  alignItems: 'center', 
})

const Title = styled.h3({
  margin: 0,
})

const Content = styled.div({
  padding: 10,
  height: '100%',
})

const HelperText = styled.p({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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