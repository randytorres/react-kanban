import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'

import { ICard } from '../../global/interfaces'
import { getCardsInColumn } from '../utils/boardUtils'

interface ColumnMenuProps {
  columnAnchorEl: Element | null
  handleColumnMenuClose: () => void
  toggleEditColumnModal: () => void
  toggleDeleteColumnModal: () => void
  cards: ICard[]
}

export const ColumnMenu: React.FC<ColumnMenuProps> = (props) => {
  const { t } = useTranslation()
  const { cards, columnAnchorEl, handleColumnMenuClose, toggleEditColumnModal, toggleDeleteColumnModal } = props
  const columnMenuOpen = Boolean(columnAnchorEl)
  let deleteDisabled

  const columnId = columnAnchorEl?.id
  if (columnId) {
    const cardsInColumn = getCardsInColumn(cards, columnId)
    deleteDisabled = cardsInColumn.length > 0
  }

  return (
    <Menu
      id='basic-menu'
      anchorEl={columnAnchorEl}
      open={columnMenuOpen}
      onClose={handleColumnMenuClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={toggleEditColumnModal}>{t('actions.edit')}</MenuItem>
      <MenuItem onClick={toggleDeleteColumnModal} disabled={deleteDisabled}>{t('actions.delete')}</MenuItem>
    </Menu>
  )
}