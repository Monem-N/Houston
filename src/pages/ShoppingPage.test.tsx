import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import ShoppingPage from './ShoppingPage';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('ShoppingPage', () => {
  it('renders the page title', () => {
    renderWithProviders(<ShoppingPage />);
    expect(screen.getByText('Shopping')).toBeInTheDocument();
    expect(
      screen.getByText('Explore shopping options in Houston, from outlet malls to local stores.')
    ).toBeInTheDocument();
  });

  it('renders tabs for different shopping categories', () => {
    renderWithProviders(<ShoppingPage />);
    expect(screen.getByText('All Shopping')).toBeInTheDocument();
    expect(screen.getByText('Malls & Outlets')).toBeInTheDocument();
    expect(screen.getByText('Stores & Districts')).toBeInTheDocument();
    expect(screen.getByText('Price Comparison')).toBeInTheDocument();
  });

  it('displays shopping venues in the All Shopping tab', () => {
    renderWithProviders(<ShoppingPage />);
    // Check for some of the venues
    expect(screen.getByText('Katy Mills Mall')).toBeInTheDocument();
    expect(screen.getByText('The Galleria')).toBeInTheDocument();
    expect(screen.getByText('Target')).toBeInTheDocument();
  });

  it('switches to Malls & Outlets tab when clicked', () => {
    renderWithProviders(<ShoppingPage />);

    // Click on the Malls & Outlets tab
    fireEvent.click(screen.getByText('Malls & Outlets'));

    // Check that the tab content is displayed
    expect(
      screen.getByText('Houston is home to several large shopping malls and outlet centers.')
    ).toBeInTheDocument();

    // Check that mall venues are displayed but not stores
    expect(screen.getByText('Katy Mills Mall')).toBeInTheDocument();
    expect(screen.getByText('The Galleria')).toBeInTheDocument();
    expect(screen.queryByText('Target')).not.toBeInTheDocument(); // Target should not be in this tab
  });

  it('switches to Stores & Districts tab when clicked', () => {
    renderWithProviders(<ShoppingPage />);

    // Click on the Stores & Districts tab
    fireEvent.click(screen.getByText('Stores & Districts'));

    // Check that the tab content is displayed
    expect(
      screen.getByText(
        'In addition to malls, Houston has several individual stores and shopping districts that offer unique shopping experiences.'
      )
    ).toBeInTheDocument();

    // Check that store venues are displayed but not malls
    expect(screen.getByText('Target')).toBeInTheDocument();
    expect(screen.getByText('Walmart Supercenter')).toBeInTheDocument();
    expect(screen.queryByText('Katy Mills Mall')).not.toBeInTheDocument(); // Katy Mills should not be in this tab
  });

  it('switches to Price Comparison tab when clicked', () => {
    renderWithProviders(<ShoppingPage />);

    // Click on the Price Comparison tab
    fireEvent.click(screen.getByText('Price Comparison'));

    // Check that the tab content is displayed
    expect(
      screen.getByText(
        'This comparison helps you decide where to shop based on your needs and budget.'
      )
    ).toBeInTheDocument();

    // Check for table headers and some comparison items
    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.getByText('Katy Mills')).toBeInTheDocument();
    expect(screen.getByText('The Galleria')).toBeInTheDocument();
    expect(screen.getByText('Target/Walmart')).toBeInTheDocument();
    expect(screen.getByText('Notes')).toBeInTheDocument();

    // Check for some specific comparison items
    expect(screen.getByText('T-Shirt (Basic)')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
  });

  it('renders shopping tips in the Price Comparison tab', () => {
    renderWithProviders(<ShoppingPage />);

    // Click on the Price Comparison tab
    fireEvent.click(screen.getByText('Price Comparison'));

    // Check for shopping tips
    expect(screen.getByText('Shopping Tips:')).toBeInTheDocument();
    expect(
      screen.getByText(/Katy Mills is great for outlet shopping but is farther from downtown/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The Galleria offers high-end shopping and is closer to downtown/)
    ).toBeInTheDocument();
  });

  it('renders a link to the maps page', () => {
    renderWithProviders(<ShoppingPage />);

    // Click on the Price Comparison tab where the link is
    fireEvent.click(screen.getByText('Price Comparison'));

    // Check for the link to the maps page
    const mapLink = screen.getByText('View Shopping Locations on Map');
    expect(mapLink).toBeInTheDocument();
    expect(mapLink.closest('a')).toHaveAttribute('href', '/maps');
  });
});
