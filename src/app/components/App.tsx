import React, { useState } from 'react';
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

import { Board } from '../../board';
import { ColorModeContext } from '../utils/ColorModeContext';

export const App: React.FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
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
          {theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit" disableFocusRipple>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Header>
        <Board theme={theme} />
   </Box>
  ) 
}

const Header = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
})