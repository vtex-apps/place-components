import React from 'react'
import { render, screen, fireEvent } from '@vtex/test-tools/react'

import LocationSearch from '../LocationSearch'
import { getFewAddresses } from '../__fixtures__/fixtures'

const UNTABABBLE = -1

describe('Location Search', () => {
  it('should be able to select a suggested address when a search term is found', async () => {
    render(<LocationSearch getAddresses={getFewAddresses} />)

    const input = screen.getByLabelText(
      /Address and house number/i
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Praia de Botafogo' } })

    expect(
      await screen.findByText('Praia de Botafogo, 200')
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Praia de Botafogo, 300')
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText('Praia de Botafogo, 200'))
    expect(input).toHaveValue(
      'Praia de Botafogo, 200, Botafogo, Rio de Janeiro, RJ'
    )
  })

  it('should be able to clear the input when something is typed', () => {
    render(<LocationSearch getAddresses={getFewAddresses} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()

    const input = screen.getByLabelText(
      /Address and house number/i
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Praia de Botafogo' } })
    const button = screen.getByRole('button')
    expect(button.tabIndex).toBe(UNTABABBLE)

    fireEvent.click(button)

    expect(input).toHaveValue('')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'Praia de Botafogo' } })
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' })

    expect(input).toHaveValue('')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should display failure message when the search term is not found', () => {
    render(<LocationSearch getAddresses={() => []} />)

    const input = screen.getByLabelText(
      /Address and house number/i
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Praia de Botafogo' } })
    expect(screen.getByText('No results found')).toBeInTheDocument()
  })
})
