import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import Layout from './Layout';

// Mock the Navigation and Footer components
jest.mock('../Navigation', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="navigation">Navigation Component</div>,
  };
});

jest.mock('../Footer', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="footer">Footer Component</div>,
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('Layout', () => {
  it('renders navigation, main content, and footer', () => {
    renderWithProviders(
      <Layout>
        <div data-testid="content">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    renderWithProviders(
      <Layout>
        <div>Child 1</div>
        <div>Child 2</div>
      </Layout>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
