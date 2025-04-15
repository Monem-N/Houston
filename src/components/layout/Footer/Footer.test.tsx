import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import Footer from './Footer';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('Footer', () => {
  it('renders the footer with logo and description', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Houston Guide')).toBeInTheDocument();
    expect(
      screen.getByText(/Your comprehensive guide for the FIRST Championship 2025/i)
    ).toBeInTheDocument();
  });

  it('renders social media icons', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByLabelText('facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('github')).toBeInTheDocument();
  });

  it('renders navigation sections with links', () => {
    renderWithProviders(<Footer />);

    // Check section titles
    expect(screen.getByText('Main Pages')).toBeInTheDocument();
    expect(screen.getByText('Annexes')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();

    // Check some links from each section
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Attractions')).toBeInTheDocument();
    expect(screen.getByText('Transport Maps')).toBeInTheDocument();
    expect(screen.getByText('Emergency Contacts')).toBeInTheDocument();
    expect(screen.getByText('Thematic Index')).toBeInTheDocument();
    expect(screen.getByText('Itineraries')).toBeInTheDocument();
  });

  it('renders feedback section', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Feedback')).toBeInTheDocument();
    expect(screen.getByText('Send Feedback')).toBeInTheDocument();
  });

  it('renders copyright and legal links', () => {
    renderWithProviders(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Houston Guide. All rights reserved.`)
    ).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  });
});
