import React from 'react'
import styled from '@emotion/styled'
import { Draggable } from 'react-beautiful-dnd'
import MaterialCard from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import CardActions from '@mui/material/CardActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useTheme, Theme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

import { CardStatus, ICard } from 'global/interfaces'

export interface CardProps extends ICard {
  handleCardMenuOpen:  (event: React.MouseEvent<HTMLButtonElement>, cardId: string) => void
  handleCardStatusChange: (cardId: string, status: CardStatus) => void
}

export const Card: React.FC<CardProps> = (props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { id, order, name, description, createdAt, status, handleCardMenuOpen } = props

  const onCardSettingsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleCardMenuOpen(e, id)
  }

  const handleCardStatusChange = (e: React.MouseEvent<HTMLElement>, value: any) => {
    props.handleCardStatusChange(id, value)
  }

  return (
    <Draggable draggableId={id} index={order}>
      {(provided) => (
        <CardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          variant='outlined'
          theme={theme}
          data-testid='card'
        >
          <CardHeader
            title={name}
            action={
              <IconButton onClick={onCardSettingsClick} disableRipple data-testid='card-setting'>
                <FontAwesomeIcon icon={faEllipsis} />
              </IconButton>
            }
            subheader={(
              <CreatedAt variant='subtitle2'>Created: {t('intlDateTime', { val: new Date(createdAt) })}</CreatedAt>
            )}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <ToggleButtonContainer>
              <StatusText>{t('card.statusTitle')}:</StatusText>
              <ToggleButtonGroup
                color='primary'
                value={status}
                exclusive
                onChange={handleCardStatusChange}
              >
                <ToggleButton value={CardStatus.Open} size='small' color='success'>{t('card.statusOpen')}</ToggleButton>
                <ToggleButton value={CardStatus.Closed} size='small' color='secondary'>{t('card.statusClosed')}</ToggleButton>
              </ToggleButtonGroup>
            </ToggleButtonContainer>
          </CardActions>
        </CardContainer>
      )}
    </Draggable>

  )
}

const CardContainer = styled(MaterialCard)<any>(({ theme }: { theme: Theme }) => ({
  marginTop: 10,
  backgroundColor: theme.palette.action.selected,
}))

const ToggleButtonContainer = styled.div({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
})

const StatusText = styled.p({
  fontWeight: 'bold',
  paddingRight: 10,
  fontSize: '0.85rem',
})

const CreatedAt = styled(Typography)({
  paddingTop: 10,
})