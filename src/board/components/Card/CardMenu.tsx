import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { PopoverProps } from '@mui/material/Popover'
import { useTranslation } from 'react-i18next'

export interface CardMenuProps {
  cardAnchorEl: PopoverProps['anchorEl']
  handleCardMenuClose: () => void
  toggleEditCardModal: () => void
  onArchiveCard: () => void
}

export const CardMenu: React.FC<CardMenuProps> = (props) => {
  const { t } = useTranslation()
  const { cardAnchorEl, handleCardMenuClose, toggleEditCardModal, onArchiveCard } = props
  const cardMenuOpen = Boolean(cardAnchorEl)

  return (
    <Menu
      id='card-menu'
      anchorEl={cardAnchorEl}
      open={cardMenuOpen}
      onClose={handleCardMenuClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={toggleEditCardModal}>{t('actions.edit')}</MenuItem>
      <MenuItem onClick={onArchiveCard}>{t('actions.archive')}</MenuItem>
    </Menu>
  )
}