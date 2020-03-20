import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import { AddressContextProvider } from 'vtex.address-context/AddressContext'
import { Address } from 'vtex.checkout-graphql'

import LocationCountry from '../LocationCountry'
import { sampleAddress } from '../__mocks__/mockDescriptions'

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

  it('should render with options and country already selected if available', () => {
    const { queryAllByText } = renderComponent(
      sampleAddress,
      countryListWithBrazil
    )

    expect(queryAllByText('Argentina')).toHaveLength(1)
    expect(queryAllByText('Brazil')).toHaveLength(2)
    expect(queryAllByText('Korea')).toHaveLength(1)
  })

  it('should throw error if country is not in countryList', () => {
    const oldConsoleError = console.error
    console.error = () => {}

    expect(() =>
      renderComponent(sampleAddress, countryListWithoutBrazil)
    ).toThrow()

    console.error = oldConsoleError
  })

  it('should change country when clicking on another option', () => {
    const { getByLabelText, queryAllByText } = renderComponent(
      sampleAddress,
      countryListWithBrazil
    )

    fireEvent.change(getByLabelText(/Country/i), { target: { value: 'ARG' } })

    expect(queryAllByText('Argentina')).toHaveLength(2)
    expect(queryAllByText('Brazil')).toHaveLength(1)
    expect(queryAllByText('Korea')).toHaveLength(1)
  })
})
