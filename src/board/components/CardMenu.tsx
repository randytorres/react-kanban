import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

interface CardMenuProps {
  cardAnchorEl: any 
  handleCardMenuClose: () => void
  toggleEditCardModal: () => void
}

export const CardMenu: React.FC<CardMenuProps> = (props) => {
  const { cardAnchorEl, handleCardMenuClose, toggleEditCardModal } = props
  const cardMenuOpen = Boolean(cardAnchorEl);

  return (
    <Menu
      id='basic-menu'
      anchorEl={cardAnchorEl}
      open={cardMenuOpen}
      onClose={handleCardMenuClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={toggleEditCardModal}>Edit</MenuItem>
      <MenuItem onClick={() => {}}>Archive</MenuItem>
    </Menu>
  )
}