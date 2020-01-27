import React from 'react'
import { render } from '@vtex/test-tools/react'
import { completeAddress, incompleteAddress } from '../__mocks__/mockSummaries'
import PlaceDetails from '../PlaceDetails'
import { AddressContextProvider } from 'vtex.address-context/AddressContext'

describe('Place Details', () => {
  it('should render only fields specified in extended format', () => {
    const { queryByText } = render(
      <AddressContextProvider address={completeAddress}>
        <PlaceDetails display="extended" />
      </AddressContextProvider>
    )
    expect(queryByText(completeAddress.street as string)).toBeTruthy()
    expect(queryByText(completeAddress.number as string)).toBeTruthy()
    expect(queryByText(completeAddress.complement as string)).toBeTruthy()
    expect(queryByText(completeAddress.postalCode as string)).toBeTruthy()
    expect(queryByText(completeAddress.city as string)).toBeTruthy()
  })

  it('should render only fields specified in compact format', () => {
    const { queryByText } = render(
      <AddressContextProvider address={completeAddress}>
        <PlaceDetails display="compact" />
      </AddressContextProvider>
    )
    expect(queryByText(completeAddress.street as string)).toBeTruthy()
    expect(queryByText(completeAddress.number as string)).toBeTruthy()
    expect(queryByText(completeAddress.postalCode as string)).toBeTruthy()
    expect(queryByText(completeAddress.city as string)).toBeTruthy()

    expect(queryByText(completeAddress.complement as string)).toBeFalsy()
  })

  it('should render only fields specified in minimal format', () => {
    const { queryByText } = render(
      <AddressContextProvider address={completeAddress}>
        <PlaceDetails display="minimal" />
      </AddressContextProvider>
    )
    expect(queryByText(completeAddress.postalCode as string)).toBeTruthy()

    expect(queryByText(completeAddress.street as string)).toBeFalsy()
    expect(queryByText(completeAddress.number as string)).toBeFalsy()
    expect(queryByText(completeAddress.city as string)).toBeFalsy()
    expect(queryByText(completeAddress.complement as string)).toBeFalsy()
  })

  it('should not render elements not present in the address', () => {
    const { queryByText } = render(
      <AddressContextProvider address={incompleteAddress}>
        <PlaceDetails display="extended" />
      </AddressContextProvider>
    )
    expect(queryByText(completeAddress.street as string)).toBeTruthy()
    expect(queryByText(completeAddress.number as string)).toBeTruthy()
    expect(queryByText(completeAddress.postalCode as string)).toBeTruthy()
    expect(queryByText(completeAddress.city as string)).toBeTruthy()

    expect(queryByText(completeAddress.complement as string)).toBeFalsy()
  })
})
