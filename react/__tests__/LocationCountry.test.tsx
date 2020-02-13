import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import { AddressContextProvider } from 'vtex.address-context/AddressContext'
import { Address } from 'vtex.checkout-graphql'
import LocationCountry from '../LocationCountry'
import { sampleAddress as address } from '../__mocks__/mockDescriptions'

const countryListWithBrazil = ['ARG', 'BRA', 'KOR']
const countryListWithoutBrazil = ['ARG', 'BOL', 'KOR']

describe('Location Country', () => {
  const renderComponent = (address: Address, countryList: string[]) => {
    return render(
      <AddressContextProvider address={address} countries={countryList}>
        <LocationCountry />
      </AddressContextProvider>
    )
  }

  it('should render with country already selected if available', () => {
    const { queryByDisplayValue } = renderComponent(
      address,
      countryListWithBrazil
    )

    expect(queryByDisplayValue(address.country as string)).toBeInTheDocument()
  })
})
