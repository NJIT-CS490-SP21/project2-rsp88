import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Login Flow', () => {
  const result = render(<App />);
  const loginSpace = screen.getByPlaceholderText('username')
  fireEvent.click(loginSpace, {target: {value: 'Raj'}});
  const join = screen.getByText('Login');
  expect(join).toBeInTheDocument();
  fireEvent.click(join);
});

test('Reset Function', () => {
  const result = render(<App />);
  const loginSpace = screen.getByPlaceholderText('username')
  fireEvent.click(loginSpace, {target: {value: 'Raj'}});
  const join = screen.getByText('Login');
  expect(join).toBeInTheDocument();
  fireEvent.click(join);
  const reset = screen.getByText('Reset');
  expect(reset).toBeInTheDocument();
  fireEvent.click(reset)
});

test('Scoreboard', () => {
  const result = render(<App />);
  const loginSpace = screen.getByPlaceholderText('username')
  fireEvent.click(loginSpace, {target: {value: 'Raj'}});
  const join = screen.getByText('Login');
  expect(join).toBeInTheDocument();
  fireEvent.click(join);
  const board = screen.getByText('Reset');
  expect(board).toBeInTheDocument();
  fireEvent.click(board)
});



