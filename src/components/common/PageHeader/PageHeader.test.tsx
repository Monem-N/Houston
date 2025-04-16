import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageHeader from './PageHeader';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { Button } from '@mui/material';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('PageHeader', () => {
  it('renders title correctly', () => {
    renderWithTheme(<PageHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle correctly', () => {
    renderWithTheme(<PageHeader title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders action correctly', () => {
    renderWithTheme(
      <PageHeader title="Test Title" action={<Button data-testid="action-button">Action</Button>} />
    );
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
  });

  it('renders breadcrumbs correctly', () => {
    const breadcrumbs = [
      { label: 'Home', path: '/' },
      { label: 'Category', path: '/category' },
      { label: 'Current Page' },
    ];

    renderWithTheme(<PageHeader title="Test Title" breadcrumbs={breadcrumbs} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('applies custom styles correctly', () => {
    renderWithTheme(
      <PageHeader
        title="Test Title"
        titleSx={{ color: 'red' }}
        subtitle="Test Subtitle"
        subtitleSx={{ fontStyle: 'italic' }}
      />
    );

    const title = screen.getByText('Test Title');
    const subtitle = screen.getByText('Test Subtitle');

    expect(title).toHaveStyle('color: red');
    expect(subtitle).toHaveStyle('font-style: italic');
  });
});
