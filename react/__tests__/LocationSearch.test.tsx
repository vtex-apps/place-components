import React from 'react'
import { render, screen, fireEvent } from '@vtex/test-tools/react'
import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { Address } from 'vtex.checkout-graphql'
import { AddressRules } from 'vtex.address-context/types'

import LocationSearch from '../LocationSearch'
import { AddressContextProvider } from '../__mocks__/vtex.address-context/AddressContext'
import { googleLogo } from '../__fixtures__/graphql/providerLogo.fixture'
import {
  noSuggestions,
  simpleSuggestions,
  simpleSuggestionWithoutToken,
} from '../__fixtures__/graphql/addressSuggestions.fixture'
import { simpleSuggestedAddress } from '../__fixtures__/graphql/address.fixture'
import { defaultSessionToken } from '../__fixtures__/graphql/sessionToken.fixture'

const UNTABABBLE = -1
const LABEL_MATCHER = /Address \(street, number, square\.\.\.\)/i

interface RenderComponentProps {
  address?: Address | null
  countries?: string[]
  rules?: AddressRules
  graphqlMocks?: MockedResponse[]
}

const defaultGraphqlMocks = [
  googleLogo,
  defaultSessionToken,
  // This duplication is intentional: the first one will be used during the
  // first query and the second one is used during the refetch. Currently,
  // Apollo provides not many good alternatives to do that. You can read
  // more about it on this issue:
  //  https://github.com/apollographql/apollo-client/issues/7286
  defaultSessionToken,
]

describe('Location Search', () => {
  const renderComponent = ({
    address = null,
    countries = [],
    rules = {},
    graphqlMocks = [],
  }: RenderComponentProps) => {
    return render(
      <MockedProvider
        addTypename={false}
        mocks={[...defaultGraphqlMocks, ...graphqlMocks]}
      >
        <AddressContextProvider
          address={address}
          countries={countries}
          rules={rules}
        >
          <LocationSearch />
        </AddressContextProvider>
      </MockedProvider>
    )
  }

  it('should be able to select a suggested address when a search term is found', async () => {
    renderComponent({
      graphqlMocks: [
        simpleSuggestions,
        simpleSuggestedAddress,
        simpleSuggestionWithoutToken,
      ],
    })

    const input = screen.getByLabelText(LABEL_MATCHER)
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
    // same as waiting loading to finish
    expect(await screen.findByRole('button')).toBeInTheDocument()
    fireEvent.blur(input)
  })

  // TODO: fix act warning
  it('should be able to clear the input with clear button when something is typed', () => {
    renderComponent({ graphqlMocks: [simpleSuggestions] })

    expect(screen.queryByRole('button')).not.toBeInTheDocument()

    const input = screen.getByLabelText(LABEL_MATCHER)
    fireEvent.change(input, { target: { value: 'Praia de Botafogo' } })
    const button = screen.getByRole('button')
    expect(button.tabIndex).toBe(UNTABABBLE)

    fireEvent.click(button)

    expect(input).toHaveValue('')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  // TODO: fix act warning
  it('should be able to clear the input with ESC key when something is typed', () => {
    renderComponent({ graphqlMocks: [simpleSuggestions] })

    expect(screen.queryByRole('button')).not.toBeInTheDocument()

    const input = screen.getByLabelText(LABEL_MATCHER)

    fireEvent.change(input, { target: { value: 'Praia de Botafogo' } })
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' })

    expect(input).toHaveValue('')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should display failure message when the search term is not found', async () => {
    renderComponent({ graphqlMocks: [noSuggestions] })

    const input = screen.getByLabelText(LABEL_MATCHER)
    fireEvent.change(input, { target: { value: 'asdfasdfasdf' } })

    expect(await screen.findByText('No results found')).toBeInTheDocument()
    fireEvent.blur(input)
  })

  it('should render provider logo', async () => {
    renderComponent({ graphqlMocks: [simpleSuggestions] })

    const input = screen.getByLabelText(LABEL_MATCHER)
    fireEvent.change(input, { target: { value: 'Praia de Botafogo' } })

    expect(await screen.findByAltText('Google logo')).toBeInTheDocument()
    fireEvent.blur(input)
  })
})
