import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BuyPopup from './BuyPopup';

describe('<BuyPopup />', () => {
  test('it should mount', () => {
    render(<BuyPopup />);
    
    const buyPopup = screen.getByTestId('BuyPopup');

    expect(buyPopup).toBeInTheDocument();
  });
});