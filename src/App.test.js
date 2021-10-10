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
})
