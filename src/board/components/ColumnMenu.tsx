import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

interface ColumnMenuProps {
  anchorEl: any 
  handleColumnMenuClose: () => void
  toggleEditColumnModal: () => void
  toggleDeleteColumnModal: () => void
  canDeleteColumn: boolean
}

export const ColumnMenu: React.FC<ColumnMenuProps> = (props) => {
  const { anchorEl, canDeleteColumn, handleColumnMenuClose, toggleEditColumnModal, toggleDeleteColumnModal } = props
  const columnMenuOpen = Boolean(anchorEl);

  return (
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={columnMenuOpen}
      onClose={handleColumnMenuClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={toggleEditColumnModal}>Edit</MenuItem>
      <MenuItem onClick={toggleDeleteColumnModal} disabled={!canDeleteColumn}>Delete</MenuItem>
    </Menu>
  )
}