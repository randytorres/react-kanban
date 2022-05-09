import React from 'react'
import { Link as RouterLink} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'

export const NotFound = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <h1>{t('notFound.title')}</h1>
      <RouterLink to="/">
        <Link>
          {t('notFound.homeLink')}
        </Link>
      </RouterLink>
    </Container>
  )
}

const Container = styled.div({
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
})

const Link = styled.p({
  fontSize: '1.25rem',
})
