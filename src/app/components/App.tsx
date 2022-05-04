import React from 'react';
import { Typography } from '@mui/material';

import { Board } from '../../board';


export const App: React.FC = () => {
  return (
    <div>
      <Typography
        align='center'
        variant='h2'
      >
        React Kanban Board
      </Typography>
      <Board />
    </div>
  );
}