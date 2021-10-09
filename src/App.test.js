//import { render, screen } from '@testing-library/react';
import { render, screen, cleanup, fireEvent } from '../src/utils/test-utils';
import App from './App';

afterEach(cleanup);

describe('App', async () => {
  it('renders loader on first mount', () => {
    render(<App />);
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument();
  });

  it('renders temperature radio buttons', async () => {
    render(<App />);
    const celcius = await screen.findByRole('radio', { name: /metric/i })
    const farenheit = await screen.findByRole('radio', { name: /imperial/i })
    expect(celcius).toBeInTheDocument();
    expect(farenheit).toBeInTheDocument();
  });

  it('renders refresh button', async () => {
    render(<App />);
    const refreshButton = await screen.findByRole('button', { name: /refresh/i })
    expect(refreshButton).toBeInTheDocument();
  });
})
