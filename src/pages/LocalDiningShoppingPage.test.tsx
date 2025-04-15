import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { getTheme } from '../theme';
import LocalDiningShoppingPage from './LocalDiningShoppingPage';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={getTheme('light')}>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('LocalDiningShoppingPage', () => {
  test('renders the page title', () => {
    renderWithProviders(<LocalDiningShoppingPage />);
    expect(screen.getByText('Local Dining & Shopping Guide')).toBeInTheDocument();
  });

  test('renders all tabs', () => {
    renderWithProviders(<LocalDiningShoppingPage />);
    expect(screen.getByText('Dining Districts')).toBeInTheDocument();
    expect(screen.getByText('Culinary Specialties')).toBeInTheDocument();
    expect(screen.getByText('Local Shopping')).toBeInTheDocument();
    expect(screen.getByText('Shopping Centers')).toBeInTheDocument();
    expect(screen.getByText('Family Shopping')).toBeInTheDocument();
    expect(screen.getByText('Specialty Foods')).toBeInTheDocument();
    expect(screen.getByText('Shopping Tips')).toBeInTheDocument();
  });

  test('switches between tabs when clicked', () => {
    renderWithProviders(<LocalDiningShoppingPage />);

    // Initially, the Dining Districts tab should be active
    expect(screen.getByText("Houston's Gastronomic Neighborhoods")).toBeInTheDocument();

    // Click on the Culinary Specialties tab
    fireEvent.click(screen.getByText('Culinary Specialties'));
    expect(screen.getByText("Houston's Culinary Specialties")).toBeInTheDocument();

    // Click on the Local Shopping tab
    fireEvent.click(screen.getByText('Local Shopping'));
    expect(screen.getByText('Local Shopping')).toBeInTheDocument();
  });

  test('renders restaurant information in Dining Districts tab', () => {
    renderWithProviders(<LocalDiningShoppingPage />);

    // Check for specific restaurant names
    expect(screen.getByText('Xochi')).toBeInTheDocument();
    expect(screen.getByText('Potente')).toBeInTheDocument();
    expect(screen.getByText('Pappas Bros. Steakhouse')).toBeInTheDocument();
  });

  test('renders culinary specialties information when tab is clicked', () => {
    renderWithProviders(<LocalDiningShoppingPage />);

    // Click on the Culinary Specialties tab
    fireEvent.click(screen.getByText('Culinary Specialties'));

    // Check for specific cuisine types
    expect(screen.getByText('Tex-Mex')).toBeInTheDocument();
    expect(screen.getByText('Texas BBQ')).toBeInTheDocument();
  });
});
