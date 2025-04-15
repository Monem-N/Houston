import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import Navigation from './Navigation';

// Mock useMediaQuery to control the viewport size in tests
jest.mock('@mui/material', () => {
  const originalModule = jest.requireActual('@mui/material');
  return {
    ...originalModule,
    useMediaQuery: jest.fn(),
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('Navigation', () => {
  beforeEach(() => {
    // Reset mocks
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReset();
  });

  it('renders the navigation bar with logo', () => {
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReturnValue(false); // Desktop view

    renderWithProviders(<Navigation />);

    expect(screen.getByText('Houston Guide')).toBeInTheDocument();
  });

  it('renders desktop navigation on large screens', () => {
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReturnValue(false); // Desktop view

    renderWithProviders(<Navigation />);

    // Check for main navigation items
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Attractions')).toBeInTheDocument();
    expect(screen.getByText('Dining')).toBeInTheDocument();
    expect(screen.getByText('Maps')).toBeInTheDocument();
    expect(screen.getByText('FIRST Championship')).toBeInTheDocument();
  });

  it('renders hamburger menu on mobile screens', () => {
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReturnValue(true); // Mobile view

    renderWithProviders(<Navigation />);

    // Check for hamburger menu
    const menuButton = screen.getByLabelText('menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('opens drawer when hamburger menu is clicked on mobile', () => {
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReturnValue(true); // Mobile view

    renderWithProviders(<Navigation />);

    // Click hamburger menu
    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    // Check if drawer is open
    expect(screen.getAllByText('Houston Guide')).toHaveLength(2); // One in AppBar, one in Drawer
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('expands submenu when clicked in drawer', () => {
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReturnValue(true); // Mobile view

    renderWithProviders(<Navigation />);

    // Open drawer
    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    // Click on a submenu
    const annexesItem = screen.getByText('Annexes');
    fireEvent.click(annexesItem);

    // Check if submenu items are visible
    expect(screen.getByText('Transport Maps')).toBeInTheDocument();
    expect(screen.getByText('Emergency Contacts')).toBeInTheDocument();
  });
});
