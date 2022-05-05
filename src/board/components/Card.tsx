import React from 'react'
import styled from '@emotion/styled'
import MaterialCard from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Draggable } from 'react-beautiful-dnd'

import { ICard } from '../../global/interfaces';

export interface CardProps extends ICard {
  handleCardMenuOpen: any
}

export const Card: React.FC<CardProps> = (props) => {
  const { id, index, name, description, handleCardMenuOpen } = props

  const onCardSettingsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleCardMenuOpen(e, id)
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
        </CardContainer>
      )}
    </Draggable>

  )
}

const CardContainer = styled(MaterialCard)({
  marginTop: 10,
})