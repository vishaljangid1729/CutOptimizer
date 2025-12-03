import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renders home page by default', () => {
    render(<App />)
    expect(screen.getByText(/Enter manually/i)).toBeInTheDocument()
    expect(screen.getByText(/Use CSV/i)).toBeInTheDocument()
  })
})
