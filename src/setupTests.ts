import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { getByTestId } from '@testing-library/dom'


describe('MyComponent', () => {
  it('should render an input with the data-testid attribute "my-input"', () => {
    const container = document.getElementById('app')
    expect(getByTestId(container, 'input')).toBeInTheDocument()
  });
})