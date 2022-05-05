import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

interface ColumnMenuProps {
  anchorEl: any 
  handleEditColumnMenuClose: () => void
  handleEditColumnModalOpen: () => void
  toggleDeleteColumnModal: (modalOpen?: boolean) => void
}

export const ColumnMenu: React.FC<ColumnMenuProps> = (props) => {
  const { anchorEl, handleEditColumnMenuClose, handleEditColumnModalOpen, toggleDeleteColumnModal } = props
  const editColumnMenuOpen = Boolean(anchorEl);

  // TODO: add `canDeleteColumn` to props
  return (
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={editColumnMenuOpen}
      onClose={handleEditColumnMenuClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleEditColumnModalOpen}>Edit</MenuItem>
      <MenuItem onClick={() => toggleDeleteColumnModal(true)}>Delete</MenuItem>
    </Menu>
  )
}