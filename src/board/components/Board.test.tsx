import React from 'react'
import { render } from '@testing-library/react'

import 'i18n/config'
import { Board } from './Board'

describe('Board', () => {
  test('Renders a button to Add Column', () => {
    const { getByText } = render(<Board />)
    expect(getByText('Add Column'))
  })
})