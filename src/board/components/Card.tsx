import React from 'react'
import styled from '@emotion/styled'
import MaterialCard from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Draggable } from 'react-beautiful-dnd'

import { CardStatus, ICard } from '../../global/interfaces';
import { CardActions } from '@mui/material';

export interface CardProps extends ICard {
  handleCardMenuOpen: any
  handleCardStatusChange: (cardId: string, status: CardStatus) => void
}

export const Card: React.FC<CardProps> = (props) => {
  const { id, index, name, description, handleCardMenuOpen, status } = props

  const onCardSettingsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleCardMenuOpen(e, id)
  }

  const handleCardStatusChange = (e: React.MouseEvent<HTMLElement>, value: any) => {
    props.handleCardStatusChange(id, value)
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <CardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          variant='outlined'
        >
          <CardHeader
            title={name}
            action={
              <IconButton onClick={onCardSettingsClick} disableRipple>
                <FontAwesomeIcon icon={faEllipsis} />
              </IconButton>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography> 
          </CardContent>
          <CardActions>
            <ToggleButtonContainer>
              <StatusText>Status:</StatusText>
              <ToggleButtonGroup
                color='primary'
                value={status}
                exclusive
                onChange={handleCardStatusChange}
              >
                <ToggleButton value={CardStatus.Open} size='small' color='success'>Open</ToggleButton>
                <ToggleButton value={CardStatus.Closed} size='small' color='secondary'>Closed</ToggleButton>
              </ToggleButtonGroup>
            </ToggleButtonContainer>
          </CardActions>
        </CardContainer>
      )}
    </Draggable>

  )
}

const CardContainer = styled(MaterialCard)({
  marginTop: 10,
})

const ToggleButtonContainer = styled.div({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
})

const StatusText = styled.p({
  fontWeight: 'bold',
  paddingRight: 10,
  fontSize: 14,
})