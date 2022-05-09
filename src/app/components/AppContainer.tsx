import * as React from 'react'
import { PaletteMode } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import 'i18n/config'

import { App } from './App'
import { ColorModeContext } from '../utils/ColorModeContext'

export function AppContainer() {
  const [mode, setMode] = React.useState<PaletteMode>('dark')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}