import React from 'react'
import { Link as RouterLink} from 'react-router-dom'

import styled from '@emotion/styled'

export const NotFound = () => (
  <Container>
    <h1>404 - Not Found!</h1>
    <RouterLink to="/">
      <Link>
        Go Home
      </Link>
    </RouterLink>
  </Container>
)

const Container = styled.div({
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
})

const Link = styled.p({
  fontSize: 24,
})
