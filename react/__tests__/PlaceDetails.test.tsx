import React from 'react'
import { render } from '@vtex/test-tools/react'
import {
  completeAddress,
  incompleteAddress,
} from '../__mocks__/mockDescriptions'
import PlaceDetails from '../PlaceDetails'
import { AddressContextProvider } from 'vtex.address-context/AddressContext'
import { Address } from 'vtex.checkout-graphql'
import { Display } from '../typings/countryRulesTypes.d'

describe('Place Details', () => {
  const renderComponent = (address: Address, display: keyof Display) => {
    return render(
      <AddressContextProvider address={address}>
        <PlaceDetails display={display} />
      </AddressContextProvider>
    )
  }

  it('should render only fields specified in extended format', () => {
    const { queryByText } = renderComponent(completeAddress, 'extended')

    expect(queryByText(completeAddress.street as string)).toBeInTheDocument()
    expect(queryByText(completeAddress.number as string)).toBeInTheDocument()
    expect(
      queryByText(completeAddress.complement as string)
    ).toBeInTheDocument()
    expect(
      queryByText(completeAddress.postalCode as string)
    ).toBeInTheDocument()
    expect(queryByText(completeAddress.city as string)).toBeInTheDocument()
  })

  it('should render only fields specified in compact format', () => {
    const { queryByText } = renderComponent(completeAddress, 'compact')

    expect(queryByText(completeAddress.street as string)).toBeInTheDocument()
    expect(queryByText(completeAddress.number as string)).toBeInTheDocument()
    expect(
      queryByText(completeAddress.postalCode as string)
    ).toBeInTheDocument()
    expect(queryByText(completeAddress.city as string)).toBeInTheDocument()

    expect(
      queryByText(completeAddress.complement as string)
    ).not.toBeInTheDocument()
  })

  it('should render only fields specified in minimal format', () => {
    const { queryByText } = renderComponent(completeAddress, 'minimal')

    expect(
      queryByText(completeAddress.postalCode as string)
    ).toBeInTheDocument()

    expect(
      queryByText(completeAddress.street as string)
    ).not.toBeInTheDocument()
    expect(
      queryByText(completeAddress.number as string)
    ).not.toBeInTheDocument()
    expect(queryByText(completeAddress.city as string)).not.toBeInTheDocument()
    expect(
      queryByText(completeAddress.complement as string)
    ).not.toBeInTheDocument()
  })

  it('should not render elements not present in the address', () => {
    const { queryByText } = renderComponent(incompleteAddress, 'extended')

    expect(queryByText(completeAddress.street as string)).toBeInTheDocument()
    expect(queryByText(completeAddress.number as string)).toBeInTheDocument()
    expect(
      queryByText(completeAddress.postalCode as string)
    ).toBeInTheDocument()

    expect(
      queryByText(completeAddress.complement as string)
    ).not.toBeInTheDocument()
  })
})
