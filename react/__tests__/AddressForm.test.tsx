import React from 'react'
import { render } from '@vtex/test-tools/react'
import { completeAddress, incompleteAddress } from '../__mocks__/mockSummaries'
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

    expect(queryByText(completeAddress.street as string)).toBeTruthy()
    expect(queryByText(completeAddress.number as string)).toBeTruthy()
    expect(queryByText(completeAddress.complement as string)).toBeTruthy()
    expect(queryByText(completeAddress.postalCode as string)).toBeTruthy()
    expect(queryByText(completeAddress.city as string)).toBeTruthy()
  })

  it('should render only fields specified in compact format', () => {
    const { queryByText } = renderComponent(completeAddress, 'compact')

    expect(queryByText(completeAddress.street as string)).toBeTruthy()
    expect(queryByText(completeAddress.number as string)).toBeTruthy()
    expect(queryByText(completeAddress.postalCode as string)).toBeTruthy()
    expect(queryByText(completeAddress.city as string)).toBeTruthy()

    expect(queryByText(completeAddress.complement as string)).toBeFalsy()
  })

  it('should render only fields specified in minimal format', () => {
    const { queryByText } = renderComponent(completeAddress, 'minimal')

    expect(queryByText(completeAddress.postalCode as string)).toBeTruthy()

    expect(queryByText(completeAddress.street as string)).toBeFalsy()
    expect(queryByText(completeAddress.number as string)).toBeFalsy()
    expect(queryByText(completeAddress.city as string)).toBeFalsy()
    expect(queryByText(completeAddress.complement as string)).toBeFalsy()
  })

  it('should not render elements not present in the address', () => {
    const { queryByText } = renderComponent(incompleteAddress, 'extended')

    expect(queryByText(completeAddress.street as string)).toBeTruthy()
    expect(queryByText(completeAddress.number as string)).toBeTruthy()
    expect(queryByText(completeAddress.postalCode as string)).toBeTruthy()
    expect(queryByText(completeAddress.city as string)).toBeTruthy()

    expect(queryByText(completeAddress.complement as string)).toBeFalsy()
  })
})
