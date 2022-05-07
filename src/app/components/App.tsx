import React, { useState } from 'react'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

import { ColorModeContext } from '../utils/ColorModeContext'
import { Router } from './Router'

export const App: React.FC = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const colorMode = React.useContext(ColorModeContext)
  const isDark = theme.palette.mode === 'dark'
  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3,
        flexDirection: 'column',
        overflowY: 'hidden',
        height: '100%',
      }}
    >
        <Header>
          {isDark ? t('darkMode') : t('lightMode')}
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit" disableFocusRipple>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Header>
        <Router />
   </Box>
  ) 
}

const Header = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
})