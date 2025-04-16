import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import { ThemeProvider } from '../../../contexts/ThemeContext';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Button', () => {
  it('renders correctly', () => {
    renderWithTheme(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies variant correctly', () => {
    renderWithTheme(<Button variant="contained">Contained Button</Button>);
    const button = screen.getByText('Contained Button');
    expect(button).toHaveClass('MuiButton-contained');
  });

  it('applies color correctly', () => {
    renderWithTheme(<Button color="secondary">Secondary Button</Button>);
    const button = screen.getByText('Secondary Button');
    expect(button).toHaveClass('MuiButton-colorSecondary');
  });
});
