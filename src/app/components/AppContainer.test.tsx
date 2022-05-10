import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import 'i18n/config'

import { AppContainer } from './AppContainer'

const renderApp = () => {
  return render(
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  )
}

describe('AppContainer', () => {
  test('Defaults to Dark Mode', () => {
    renderApp()
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
  })

  test('Changes to light mode on toggle', () => {
    renderApp()

    fireEvent.click(screen.getByTestId('color-mode-toggle'))

    expect(screen.getByText('Light Mode')).toBeInTheDocument()
  })
})