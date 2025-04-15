import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import AttractionsPage from './AttractionsPage';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('AttractionsPage', () => {
  it('renders the page title', () => {
    renderWithProviders(<AttractionsPage />);
    expect(screen.getByText('Attractions')).toBeInTheDocument();
    expect(
      screen.getByText('Discover the best attractions and things to do in Houston during your visit.'
      )
    ).toBeInTheDocument();
  });

  it('renders tabs for different attraction areas', () => {
    renderWithProviders(<AttractionsPage />);
    expect(screen.getByText('All Attractions')).toBeInTheDocument();
    expect(screen.getByText('Space Center & Kemah')).toBeInTheDocument();
    expect(screen.getByText('Museum District')).toBeInTheDocument();
    expect(screen.getByText('Hermann Park & Zoo')).toBeInTheDocument();
  });

  it('displays all attractions in the All Attractions tab', () => {
    renderWithProviders(<AttractionsPage />);
    // All Attractions tab should be active by default
    expect(screen.getByText('Popular Attractions')).toBeInTheDocument();

    // Check for some attractions from different areas
    expect(screen.getByText('Space Center Houston')).toBeInTheDocument();
    expect(screen.getByText('Houston Museum of Natural Science')).toBeInTheDocument();
    expect(screen.getByText('Houston Zoo')).toBeInTheDocument();
  });

  it('switches to Space Center & Kemah tab when clicked', () => {
    renderWithProviders(<AttractionsPage />);

    // Click on the Space Center & Kemah tab
    fireEvent.click(screen.getByText('Space Center & Kemah'));

    // Check that the tab content is displayed
    expect(screen.getByText('About Space Center & Kemah')).toBeInTheDocument();

    // Check for area information
    expect(
      screen.getByText(/Explore NASA's Johnson Space Center and the nearby Kemah Boardwalk/)
    ).toBeInTheDocument();

    // Check for attractions specific to this area
    expect(screen.getByText('Space Center Houston')).toBeInTheDocument();
    expect(screen.getByText('Kemah Boardwalk')).toBeInTheDocument();

    // Check that attractions from other areas are not displayed
    expect(screen.queryByText('Houston Zoo')).not.toBeInTheDocument();
  });

  it('switches to Museum District tab when clicked', () => {
    renderWithProviders(<AttractionsPage />);

    // Click on the Museum District tab
    fireEvent.click(screen.getByText('Museum District'));

    // Check that the tab content is displayed
    expect(screen.getByText('About Museum District')).toBeInTheDocument();

    // Check for area information
    expect(
      screen.getByText(/Houston's Museum District features 19 museums within a 1.5-mile radius/)
    ).toBeInTheDocument();

    // Check for attractions specific to this area
    expect(screen.getByText('Houston Museum of Natural Science')).toBeInTheDocument();
    expect(screen.getByText('Museum of Fine Arts, Houston')).toBeInTheDocument();
    expect(screen.getByText("Children's Museum Houston")).toBeInTheDocument();

    // Check that attractions from other areas are not displayed
    expect(screen.queryByText('Space Center Houston')).not.toBeInTheDocument();
  });

  it('switches to Hermann Park & Zoo tab when clicked', () => {
    renderWithProviders(<AttractionsPage />);

    // Click on the Hermann Park & Zoo tab
    fireEvent.click(screen.getByText('Hermann Park & Zoo'));

    // Check that the tab content is displayed
    expect(screen.getByText('About Hermann Park & Zoo')).toBeInTheDocument();

    // Check for area information
    expect(
      screen.getByText(/Hermann Park is a 445-acre urban park that includes the Houston Zoo/)
    ).toBeInTheDocument();

    // Check for attractions specific to this area
    expect(screen.getByText('Houston Zoo')).toBeInTheDocument();
    expect(screen.getByText('Hermann Park')).toBeInTheDocument();
    expect(screen.getByText('Miller Outdoor Theatre')).toBeInTheDocument();

    // Check that attractions from other areas are not displayed
    expect(screen.queryByText('Space Center Houston')).not.toBeInTheDocument();
  });

  it('displays attraction details including ratings', () => {
    renderWithProviders(<AttractionsPage />);

    // Check for attraction details
    expect(screen.getByText('Museum')).toBeInTheDocument(); // Category
    expect(screen.getByText('$29.95 adults, $24.95 children')).toBeInTheDocument(); // Price
    expect(screen.getByText('10:00 AM - 5:00 PM')).toBeInTheDocument(); // Hours

    // Check for ratings (this is a bit tricky with Material-UI Rating component)
    // We can check for the review count which is displayed next to the rating
    expect(screen.getByText('(1245)')).toBeInTheDocument();
  });

  it('displays Buy Tickets buttons for attractions with ticket links', () => {
    renderWithProviders(<AttractionsPage />);

    // Check for Buy Tickets buttons
    const buyTicketsButtons = screen.getAllByText('Buy Tickets');
    expect(buyTicketsButtons.length).toBeGreaterThan(0);

    // Check that the Space Center Houston ticket link is correct
    const spaceTicketButton = buyTicketsButtons.find(button =>
      button.closest('a')?.href.includes('spacecenter.org')
    );
    expect(spaceTicketButton).toBeInTheDocument();
  });

  it('displays area highlights and tips', () => {
    renderWithProviders(<AttractionsPage />);

    // Click on the Space Center & Kemah tab
    fireEvent.click(screen.getByText('Space Center & Kemah'));

    // Check for highlights and tips sections
    expect(screen.getByText('Highlights:')).toBeInTheDocument();
    expect(screen.getByText('Tips:')).toBeInTheDocument();

    // Check for specific highlights and tips
    expect(
      screen.getByText(/Tour NASA's Johnson Space Center and see real spacecraft/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Plan at least 4-5 hours for Space Center Houston/)
    ).toBeInTheDocument();
  });
});
