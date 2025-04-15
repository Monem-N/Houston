import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { Button } from '@mui/material';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Card', () => {
  it('renders title correctly', () => {
    renderWithTheme(<Card title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle correctly', () => {
    renderWithTheme(<Card subtitle="Test Subtitle" />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders description correctly', () => {
    renderWithTheme(<Card description="Test Description" />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    renderWithTheme(
      <Card>
        <div data-testid="child-element">Child Content</div>
      </Card>
    );
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders action correctly', () => {
    renderWithTheme(<Card action={<Button>Action Button</Button>} />);
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    renderWithTheme(<Card image="/test-image.jpg" imageAlt="Test Image" />);
    const image = screen.getByAltText('Test Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });
});
