import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TouristanbulPage from './TouristanbulPage';
import { BrowserRouter } from 'react-router-dom';

// Mock the common components
jest.mock('../components/common', () => ({
  PageHeader: ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div data-testid="page-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  ),
  Section: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div data-testid="section">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  ),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('TouristanbulPage', () => {
  test('renders the page header with correct title', () => {
    renderWithRouter(<TouristanbulPage />);
    const pageHeader = screen.getByTestId('page-header');
    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader).toHaveTextContent('Touristanbul');
  });

  test('renders all tabs', () => {
    renderWithRouter(<TouristanbulPage />);
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Éligibilité')).toBeInTheDocument();
    expect(screen.getByText('Circuits')).toBeInTheDocument();
    expect(screen.getByText('Inscription')).toBeInTheDocument();
    expect(screen.getByText('Conseils')).toBeInTheDocument();
    expect(screen.getByText('Galerie')).toBeInTheDocument();
  });

  test('shows Introduction tab content by default', () => {
    renderWithRouter(<TouristanbulPage />);
    const introSection = screen.getByText('Présentation du Programme');
    expect(introSection).toBeInTheDocument();
    expect(screen.getByText(/Touristanbul est un service gratuit exclusif/i)).toBeInTheDocument();
  });

  test('can switch to Eligibility tab', () => {
    renderWithRouter(<TouristanbulPage />);
    fireEvent.click(screen.getByText('Éligibilité'));
    expect(screen.getByText("Conditions d'éligibilité")).toBeInTheDocument();
    expect(screen.getByText(/Escale de 6 à 24 heures/i)).toBeInTheDocument();
  });

  test('can switch to Tours tab', () => {
    renderWithRouter(<TouristanbulPage />);
    fireEvent.click(screen.getByText('Circuits'));
    expect(screen.getByText('Circuits disponibles')).toBeInTheDocument();
    expect(screen.getByText('Sites principaux')).toBeInTheDocument();
    expect(screen.getByText('Circuit matinal')).toBeInTheDocument();
  });

  test('can switch to Registration tab', () => {
    renderWithRouter(<TouristanbulPage />);
    fireEvent.click(screen.getByText('Inscription'));
    expect(screen.getByText('Comment participer')).toBeInTheDocument();
    expect(screen.getByText("Procédure d'inscription")).toBeInTheDocument();
  });

  test('can switch to Tips tab', () => {
    renderWithRouter(<TouristanbulPage />);
    fireEvent.click(screen.getByText('Conseils'));
    expect(screen.getByText('Conseils pratiques')).toBeInTheDocument();
    expect(screen.getByText(/Pour profiter pleinement de votre expérience/i)).toBeInTheDocument();
  });

  test('can switch to Gallery tab', () => {
    renderWithRouter(<TouristanbulPage />);
    fireEvent.click(screen.getByText('Galerie'));
    expect(screen.getByText('Galerie photo')).toBeInTheDocument();
    expect(screen.getByText(/Découvrez Istanbul à travers ces images/i)).toBeInTheDocument();
    expect(screen.getByText('Site officiel Touristanbul')).toBeInTheDocument();
  });

  test('renders tour options in Tours tab', () => {
    renderWithRouter(<TouristanbulPage />);
    fireEvent.click(screen.getByText('Circuits'));

    // Check for all tour options
    expect(screen.getByText('Circuit matinal')).toBeInTheDocument();
    expect(screen.getByText('Circuit de la mi-journée')).toBeInTheDocument();
    expect(screen.getByText("Circuit de l'après-midi")).toBeInTheDocument();
    expect(screen.getByText('Circuit du soir')).toBeInTheDocument();
  });

  test('renders attractions in Tours tab', () => {
    renderWithRouter(<TouristanbulPage />);
    fireEvent.click(screen.getByText('Circuits'));

    // Check for attractions
    expect(screen.getByText('Mosquée Bleue')).toBeInTheDocument();
    expect(screen.getByText('Sainte-Sophie')).toBeInTheDocument();
    expect(screen.getByText('Citerne Basilique')).toBeInTheDocument();
    expect(screen.getByText('Grand Bazar')).toBeInTheDocument();
    expect(screen.getByText('Palais de Topkapi')).toBeInTheDocument();
    expect(screen.getByText('Bosphore')).toBeInTheDocument();
  });
});
