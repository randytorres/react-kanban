import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
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
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  );
}