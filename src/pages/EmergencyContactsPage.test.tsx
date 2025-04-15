import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EmergencyContactsPage from './EmergencyContactsPage';

describe('EmergencyContactsPage', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  test('renders page title and subtitle', () => {
    renderWithRouter(<EmergencyContactsPage />);

    expect(screen.getByText('Emergency Contacts')).toBeInTheDocument();
    expect(
      screen.getByText('Important contacts and safety information for your visit to Houston')
    ).toBeInTheDocument();
  });

  test('renders all tabs', () => {
    renderWithRouter(<EmergencyContactsPage />);

    expect(screen.getByText('Emergency Contacts')).toBeInTheDocument();
    expect(screen.getByText('Safety Tips')).toBeInTheDocument();
    expect(screen.getByText('Emergency Phrases')).toBeInTheDocument();
  });

  test('renders emergency contacts in the first tab', () => {
    renderWithRouter(<EmergencyContactsPage />);

    expect(screen.getByText('In case of emergency')).toBeInTheDocument();
    expect(screen.getByText('911')).toBeInTheDocument();
    expect(screen.getByText('Emergency Services (Police, Fire, Ambulance)')).toBeInTheDocument();
  });

  test('search functionality filters contacts', () => {
    renderWithRouter(<EmergencyContactsPage />);

    // All contacts should be visible initially
    expect(screen.getByText('Houston Police Department (Non-Emergency)')).toBeInTheDocument();
    expect(screen.getByText('Houston Methodist Hospital')).toBeInTheDocument();

    // Search for police
    const searchInput = screen.getByPlaceholderText('Search contacts...');
    fireEvent.change(searchInput, { target: { value: 'police' } });

    // Only police-related contacts should be visible
    expect(screen.getByText('Houston Police Department (Non-Emergency)')).toBeInTheDocument();
    expect(screen.queryByText('Houston Methodist Hospital')).not.toBeInTheDocument();

    // Clear search
    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);

    // All contacts should be visible again
    expect(screen.getByText('Houston Police Department (Non-Emergency)')).toBeInTheDocument();
    expect(screen.getByText('Houston Methodist Hospital')).toBeInTheDocument();
  });

  test('renders safety tips in the second tab', () => {
    renderWithRouter(<EmergencyContactsPage />);

    // Click on the Safety Tips tab
    const safetyTipsTab = screen.getByRole('tab', { name: /safety tips/i });
    fireEvent.click(safetyTipsTab);

    // Safety tips content should be visible
    expect(screen.getByText('General Safety')).toBeInTheDocument();
    expect(screen.getByText('Transportation Safety')).toBeInTheDocument();
    expect(screen.getByText('Health Safety')).toBeInTheDocument();
    expect(screen.getByText('Event Safety')).toBeInTheDocument();
  });

  test('renders emergency phrases in the third tab', () => {
    renderWithRouter(<EmergencyContactsPage />);

    // Click on the Emergency Phrases tab
    const emergencyPhrasesTab = screen.getByRole('tab', { name: /emergency phrases/i });
    fireEvent.click(emergencyPhrasesTab);

    // Emergency phrases content should be visible
    expect(screen.getByText('Select Language:')).toBeInTheDocument();
    expect(screen.getByText('English Emergency Phrases')).toBeInTheDocument();

    // Language buttons should be visible
    expect(screen.getByRole('button', { name: /english/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /spanish/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /french/i })).toBeInTheDocument();

    // Phrases should be visible
    expect(screen.getByText('Help!')).toBeInTheDocument();
    expect(screen.getByText('I need a doctor.')).toBeInTheDocument();
  });

  test('language selection changes phrases displayed', () => {
    renderWithRouter(<EmergencyContactsPage />);

    // Click on the Emergency Phrases tab
    const emergencyPhrasesTab = screen.getByRole('tab', { name: /emergency phrases/i });
    fireEvent.click(emergencyPhrasesTab);

    // Initially English phrases should be visible
    expect(screen.getByText('English Emergency Phrases')).toBeInTheDocument();

    // Click on Spanish button
    const spanishButton = screen.getByRole('button', { name: /spanish/i });
    fireEvent.click(spanishButton);

    // Spanish phrases should be visible
    expect(screen.getByText('Spanish Emergency Phrases')).toBeInTheDocument();
    expect(screen.getByText('¡Ayuda!')).toBeInTheDocument();

    // Click on French button
    const frenchButton = screen.getByRole('button', { name: /french/i });
    fireEvent.click(frenchButton);

    // French phrases should be visible
    expect(screen.getByText('French Emergency Phrases')).toBeInTheDocument();
    expect(screen.getByText('Au secours !')).toBeInTheDocument();
  });
});
