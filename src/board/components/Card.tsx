import React, { useState } from 'react'
import styled from '@emotion/styled'
import MaterialCard from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Draggable } from 'react-beautiful-dnd'

import { ICard } from '../../global/interfaces';

export interface CardProps extends ICard {

}

export const Card: React.FC<CardProps> = (props) => {
  const { id, index, name, description } = props
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