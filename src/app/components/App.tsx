import React from 'react';
import styled from '@emotion/styled'
import { Typography } from '@mui/material';

import { Board } from '../../board';

export const App: React.FC = () => {
  return (
    <>
      {/* <Header
        align='center'
        variant='h2'
      >
        React Kanban Board
      </Header> */}
      <Board />
    </>
  );
}

const Header = styled(Typography)({
  marginTop: 20,
  marginBottom: 20,
})