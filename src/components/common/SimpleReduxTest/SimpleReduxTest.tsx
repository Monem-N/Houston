import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Box } from '@mui/material';
import { selectTheme, toggleTheme } from '../../../store/simpleStore';

const SimpleReduxTest: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6">
        Current Theme: {theme}
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

export default SimpleReduxTest;
