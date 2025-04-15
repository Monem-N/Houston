import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import SafetyLogisticsPage from './SafetyLogisticsPage';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('SafetyLogisticsPage', () => {
  it('renders the page title', () => {
    renderWithProviders(<SafetyLogisticsPage />);
    expect(screen.getByText('Safety & Logistics')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Important information to ensure a safe and smooth experience during your visit to Houston.'
      )
    ).toBeInTheDocument();
  });

  it('renders tabs for different safety and logistics categories', () => {
    renderWithProviders(<SafetyLogisticsPage />);
    expect(screen.getByText('Safety Tips')).toBeInTheDocument();
    expect(screen.getByText('Emergency Contacts')).toBeInTheDocument();
    expect(screen.getByText('Travel Checklists')).toBeInTheDocument();
    expect(screen.getByText('Logistics Info')).toBeInTheDocument();
  });

  it('displays safety tips in the Safety Tips tab', () => {
    renderWithProviders(<SafetyLogisticsPage />);
    // Safety Tips tab should be active by default
    expect(screen.getByText('Safety Tips for Houston')).toBeInTheDocument();
    expect(screen.getByText('Important Safety Notice')).toBeInTheDocument();
    expect(screen.getByText('In case of emergency, dial')).toBeInTheDocument();

    // Check for some specific safety tips
    expect(screen.getByText('Stay in groups')).toBeInTheDocument();
    expect(screen.getByText('Keep valuables secure')).toBeInTheDocument();
  });

  it('switches to Emergency Contacts tab when clicked', () => {
    renderWithProviders(<SafetyLogisticsPage />);

    // Click on the Emergency Contacts tab
    fireEvent.click(screen.getByText('Emergency Contacts'));

    // Check that the tab content is displayed
    expect(
      screen.getByText('Keep these important emergency contacts handy during your stay in Houston.')
    ).toBeInTheDocument();

    // Check for emergency contacts
    expect(screen.getByText('Emergency Number')).toBeInTheDocument();
    expect(screen.getByText('Emergency Services')).toBeInTheDocument();
    expect(screen.getByText('Houston Police (Non-Emergency)')).toBeInTheDocument();
  });

  it('switches to Travel Checklists tab when clicked', () => {
    renderWithProviders(<SafetyLogisticsPage />);

    // Click on the Travel Checklists tab
    fireEvent.click(screen.getByText('Travel Checklists'));

    // Check that the tab content is displayed
    expect(
      screen.getByText(
        'Use these checklists to prepare for your trip to Houston and the FIRST Championship.'
      )
    ).toBeInTheDocument();

    // Check for checklist categories
    expect(screen.getByText('Before Departure')).toBeInTheDocument();
    expect(screen.getByText('Packing Essentials')).toBeInTheDocument();
    expect(screen.getByText('Technology Preparation')).toBeInTheDocument();
    expect(screen.getByText('Upon Arrival')).toBeInTheDocument();
  });

  it('switches to Logistics Info tab when clicked', () => {
    renderWithProviders(<SafetyLogisticsPage />);

    // Click on the Logistics Info tab
    fireEvent.click(screen.getByText('Logistics Info'));

    // Check that the tab content is displayed
    expect(
      screen.getByText(
        'Important logistical information to help you navigate your stay in Houston.'
      )
    ).toBeInTheDocument();

    // Check for logistics information categories
    expect(screen.getByText('Electricity')).toBeInTheDocument();
    expect(screen.getByText('Internet & Connectivity')).toBeInTheDocument();
    expect(screen.getByText('Currency & Payments')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Health & Medical')).toBeInTheDocument();
  });

  it('renders transportation information in the Logistics Info tab', () => {
    renderWithProviders(<SafetyLogisticsPage />);

    // Click on the Logistics Info tab
    fireEvent.click(screen.getByText('Logistics Info'));

    // Check for transportation information
    expect(screen.getByText('Transportation Information')).toBeInTheDocument();
    expect(screen.getByText('Ride-sharing services (Uber, Lyft)')).toBeInTheDocument();
    expect(screen.getByText('Taxis')).toBeInTheDocument();
    expect(screen.getByText('Public Transportation')).toBeInTheDocument();
    expect(screen.getByText('Walking')).toBeInTheDocument();
  });

  it('renders links to detailed information pages', () => {
    renderWithProviders(<SafetyLogisticsPage />);

    // Check for link in Safety Tips tab
    expect(screen.getByText('View Detailed Emergency Contacts')).toBeInTheDocument();

    // Click on Emergency Contacts tab and check for link
    fireEvent.click(screen.getByText('Emergency Contacts'));
    expect(screen.getByText('View Detailed Emergency Information')).toBeInTheDocument();

    // Click on Logistics Info tab and check for link
    fireEvent.click(screen.getByText('Logistics Info'));
    expect(screen.getByText('View Detailed Transportation Information')).toBeInTheDocument();
  });
});
