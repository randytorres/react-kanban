import React, { useState } from 'react'
import styled from '@emotion/styled'
import MaterialCard from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export type CardProps = {
  id: string
  name: string
  description: string
  createdAt: Date
  status: string 
  order: number
}

export const Card: React.FC<CardProps> = (props) => {
  const { name, description } = props
  return (
    <CardContainer variant='outlined'>
      <CardHeader
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </CardContainer>
  )
}

const CardContainer = styled(MaterialCard)({
  marginTop: 10,
})