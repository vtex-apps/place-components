import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
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
    const { queryByDisplayValue, getByText } = renderComponent(address)

    expect(getByText(address.street as string)).toBeTruthy()
    expect(getByText(address.number as string)).toBeTruthy()
    expect(getByText(address.neighborhood as string)).toBeTruthy()
    expect(getByText(address.city as string)).toBeTruthy()
    expect(getByText(address.state as string)).toBeTruthy()
    expect(getByText(address.postalCode as string)).toBeTruthy()

    expect(queryByDisplayValue(address.street as string)).toBeFalsy()
    expect(queryByDisplayValue(address.number as string)).toBeFalsy()
    expect(queryByDisplayValue(address.neighborhood as string)).toBeFalsy()
    expect(queryByDisplayValue(address.city as string)).toBeFalsy()
    expect(queryByDisplayValue(address.state as string)).toBeFalsy()
    expect(queryByDisplayValue(address.postalCode as string)).toBeFalsy()
  })

  it('should have an edit button', () => {
    const { getByText } = renderComponent(address)
    expect(getByText('Edit')).toBeTruthy()
  })

  it('should render editable elements when clicking on edit', () => {
    const { getByText, queryByDisplayValue } = renderComponent(address)
    fireEvent.click(getByText('Edit'))

    expect(getByText(address.postalCode as string)).toBeTruthy()
    expect(getByText('Street, Road, Avenue...')).toBeTruthy()
    expect(getByText('Number')).toBeTruthy()
    expect(getByText('Complement')).toBeTruthy()
    expect(getByText('Neighborhood')).toBeTruthy()
    expect(getByText('City')).toBeTruthy()
    expect(getByText('State')).toBeTruthy()

    expect(queryByDisplayValue(address.street as string)).toBeTruthy()
    expect(queryByDisplayValue(address.number as string)).toBeTruthy()
    expect(queryByDisplayValue(address.neighborhood as string)).toBeTruthy()
    expect(queryByDisplayValue(address.city as string)).toBeTruthy()
    expect(queryByDisplayValue('Paraná')).toBeTruthy()
  })

  it('should display without number checkbox', () => {
    const { getByText } = renderComponent(address)
    fireEvent.click(getByText('Edit'))

    expect(getByText('Without number')).toBeTruthy()
  })

  it('should disable number input when clicking the without number checkbox', async () => {
    const {
      getByText,
      getByLabelText,
      getByDisplayValue,
      queryByDisplayValue,
    } = renderComponent(address)
    fireEvent.click(getByText('Edit'))
    fireEvent.click(getByLabelText('Without number'))

    expect(getByDisplayValue('W/N')).toBeTruthy()
    expect(queryByDisplayValue(address.number as string)).toBeFalsy()
  })
})
