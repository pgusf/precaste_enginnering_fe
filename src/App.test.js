import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('renders PEG branding and the primary navigation', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /peg precast engineering group home/i })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /request a quote/i })).toHaveAttribute(
    'href',
    expect.stringContaining('mailto:ask@precastengineering.org'),
  );
});

test('opens the products mega menu with PEG product categories', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /products & solutions/i }));
  expect(screen.getByRole('region', { name: /products & solutions menu/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /box culverts/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /ada products/i })).toBeInTheDocument();
});

test('opens the mobile navigation and expands a section', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /open navigation menu/i }));
  const mobileNavigation = screen.getByRole('navigation', { name: /mobile navigation/i });
  fireEvent.click(within(mobileNavigation).getByRole('button', { name: /engineering & cad/i }));
  expect(within(mobileNavigation).getByRole('link', { name: /shop drawings & cad/i })).toBeInTheDocument();
});
