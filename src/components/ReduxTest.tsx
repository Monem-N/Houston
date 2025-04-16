import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectTheme, toggleTheme } from '../redux/store';

const ReduxTest: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Box sx={{ p: 2, textAlign: 'center', bgcolor: theme === 'dark' ? '#333' : '#f5f5f5', color: theme === 'dark' ? '#fff' : '#000' }}>
      <Typography variant="h6">
        Redux Test - Current Theme: {theme}
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleToggleTheme}
        sx={{ mt: 2 }}
      >
        Toggle Theme
      </Button>
    </Box>
  );
};

export default ReduxTest;
