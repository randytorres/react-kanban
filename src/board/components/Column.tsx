import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton'

export type ColumnProps = {
  id: string
  name: string
  order: number
}

export const Column: React.FC<ColumnProps> = (props) => {
  const { name } = props
  console.info('Column', props)
  return (
    <ColumnContainer>
      <HeaderContainer>
        <Title>{name}</Title>
        <IconContainer>
          <IconButton onClick={() => {}} disableRipple>
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => {}} disableRipple>
            <FontAwesomeIcon icon={faEllipsis} />
          </IconButton>
        </IconContainer>
      </HeaderContainer>
      <Content>
        
      </Content>
    </ColumnContainer>
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