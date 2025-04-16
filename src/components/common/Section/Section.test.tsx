import React from 'react';
import { render, screen } from '@testing-library/react';
import Section from './Section';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { InfoOutlined } from '@mui/icons-material';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Section', () => {
  it('renders title correctly', () => {
    renderWithTheme(<Section title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle correctly', () => {
    renderWithTheme(<Section subtitle="Test Subtitle" />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    renderWithTheme(
      <Section>
        <div data-testid="child-element">Child Content</div>
      </Section>
    );
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders title icon when provided', () => {
    renderWithTheme(
      <Section title="Test Title" titleIcon={<InfoOutlined data-testid="title-icon" />} />
    );
    expect(screen.getByTestId('title-icon')).toBeInTheDocument();
  });

  it('renders divider when divider prop is true', () => {
    const { container } = renderWithTheme(<Section title="Test Title" divider />);
    // Check for the presence of a divider element
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('does not render divider when divider prop is false', () => {
    const { container } = renderWithTheme(<Section title="Test Title" divider={false} />);
    // Check that there is no divider element
    expect(container.querySelector('hr')).not.toBeInTheDocument();
  });
});
