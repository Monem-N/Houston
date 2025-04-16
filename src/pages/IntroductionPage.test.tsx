import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import IntroductionPage from './IntroductionPage';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('IntroductionPage', () => {
  it('renders the page title', () => {
    renderWithProviders(<IntroductionPage />);
    expect(screen.getByText('Welcome to Houston')).toBeInTheDocument();
    expect(
      screen.getByText('Your guide to the 2025 FIRST Championship in Houston, Texas')
    ).toBeInTheDocument();
  });

  it('renders the About This Guide section', () => {
    renderWithProviders(<IntroductionPage />);
    expect(screen.getByText('About This Guide')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Welcome to your comprehensive guide for the 2025 FIRST Championship in Houston, Texas!/
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Houston is America's fourth-largest city/)).toBeInTheDocument();
  });

  it('renders the Quick Navigation section with links', () => {
    renderWithProviders(<IntroductionPage />);
    expect(screen.getByText('Quick Navigation')).toBeInTheDocument();

    // Check for quick links
    expect(screen.getByText('Attractions')).toBeInTheDocument();
    expect(screen.getByText('Dining')).toBeInTheDocument();
    expect(screen.getByText('Shopping')).toBeInTheDocument();
    expect(screen.getByText('FIRST Championship')).toBeInTheDocument();
    expect(screen.getByText('Maps')).toBeInTheDocument();
    expect(screen.getByText('Safety & Logistics')).toBeInTheDocument();
  });

  it('renders the Houston at a Glance section with facts', () => {
    renderWithProviders(<IntroductionPage />);
    expect(screen.getByText('Houston at a Glance')).toBeInTheDocument();

    // Check for Houston facts
    expect(screen.getByText('Population')).toBeInTheDocument();
    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.getByText('Time Zone')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Airports')).toBeInTheDocument();
    expect(screen.getByText('Transportation')).toBeInTheDocument();

    // Check for specific fact content
    expect(screen.getByText(/Over 2.3 million in the city/)).toBeInTheDocument();
    expect(screen.getByText(/Subtropical climate/)).toBeInTheDocument();
    expect(screen.getByText(/Central Time/)).toBeInTheDocument();
  });

  it('renders the Accommodation section', () => {
    renderWithProviders(<IntroductionPage />);
    expect(screen.getByText('Accommodation')).toBeInTheDocument();

    // Check for hotel information
    expect(screen.getByText('Crowne Plaza Houston Med-Ctr Galleria Area')).toBeInTheDocument();
    expect(
      screen.getByText(/The official hotel for the 2025 FIRST Championship/)
    ).toBeInTheDocument();

    // Check for recommended areas
    expect(screen.getByText('Downtown Houston')).toBeInTheDocument();
    expect(screen.getByText('Medical Center Area')).toBeInTheDocument();
    expect(screen.getByText('Galleria Area')).toBeInTheDocument();

    // Check for Book Now button
    expect(screen.getByText('Book Now')).toBeInTheDocument();
  });

  it('renders the Getting Around section', () => {
    renderWithProviders(<IntroductionPage />);
    expect(screen.getByText('Getting Around')).toBeInTheDocument();

    // Check for transportation options
    expect(screen.getByText('Public Transportation')).toBeInTheDocument();
    expect(screen.getByText('Rideshare & Taxis')).toBeInTheDocument();
    expect(screen.getByText(/The METRORail Red Line connects downtown/)).toBeInTheDocument();
    expect(screen.getByText(/Uber and Lyft operate throughout Houston/)).toBeInTheDocument();

    // Check for METRO Website button
    expect(screen.getByText('METRO Website')).toBeInTheDocument();

    // Check for View Detailed Transportation Maps button
    expect(screen.getByText('View Detailed Transportation Maps')).toBeInTheDocument();
  });

  it('renders the What to Pack section', () => {
    renderWithProviders(<IntroductionPage />);
    expect(screen.getByText('What to Pack')).toBeInTheDocument();

    // Check for packing recommendations
    expect(screen.getByText('Light clothing')).toBeInTheDocument();
    expect(screen.getByText('Light jacket or sweater')).toBeInTheDocument();
    expect(screen.getByText('Comfortable walking shoes')).toBeInTheDocument();
    expect(screen.getByText('Rain gear')).toBeInTheDocument();
    expect(screen.getByText('Sun protection')).toBeInTheDocument();
    expect(screen.getByText('Reusable water bottle')).toBeInTheDocument();

    // Check for View Safety & Logistics Information button
    expect(screen.getByText('View Safety & Logistics Information')).toBeInTheDocument();
  });
});
