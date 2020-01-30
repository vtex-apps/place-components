import React from 'react'
import { render } from '@vtex/test-tools/react'
import { AddressContextProvider } from 'vtex.address-context/AddressContext'
import { Address } from 'vtex.checkout-graphql'
import AddressForm from '../AddressForm'
import { sampleAddress as address } from '../__mocks__/mockDescriptions'

describe('Address Form', () => {
  const renderComponent = (address: Address) => {
    return render(
      <AddressContextProvider address={address}>
        <AddressForm />
      </AddressContextProvider>
    )
  }

  it('should render already filled information as read-only', () => {
    const { queryByDisplayValue, queryByText } = renderComponent(address)

    expect(queryByText(address.street as string)).toBeTruthy()
    expect(queryByText(address.number as string)).toBeTruthy()
    expect(queryByText(address.neighborhood as string)).toBeTruthy()
    expect(queryByText(address.city as string)).toBeTruthy()
    expect(queryByText(address.state as string)).toBeTruthy()
    expect(queryByText(address.postalCode as string)).toBeTruthy()

    expect(queryByDisplayValue(address.street as string)).toBeFalsy()
    expect(queryByDisplayValue(address.number as string)).toBeFalsy()
    expect(queryByDisplayValue(address.neighborhood as string)).toBeFalsy()
    expect(queryByDisplayValue(address.city as string)).toBeFalsy()
    expect(queryByDisplayValue(address.state as string)).toBeFalsy()
    expect(queryByDisplayValue(address.postalCode as string)).toBeFalsy()
  })

  it('should have an edit button', () => {
    const { queryByText } = renderComponent(address)

    expect(queryByText('Edit')).toBeTruthy()
  })
})
