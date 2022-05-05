import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

interface ColumnMenuProps {
  anchorEl: any 
  handleColumnMenuClose: () => void
  toggleEditColumnModal: () => void
  toggleDeleteColumnModal: () => void
}

export const ColumnMenu: React.FC<ColumnMenuProps> = (props) => {
  const { anchorEl, handleColumnMenuClose, toggleEditColumnModal, toggleDeleteColumnModal } = props
  const columnMenuOpen = Boolean(anchorEl);

  // TODO: add `canDeleteColumn` to props
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
      <MenuItem onClick={toggleDeleteColumnModal}>Delete</MenuItem>
    </Menu>
  )
}