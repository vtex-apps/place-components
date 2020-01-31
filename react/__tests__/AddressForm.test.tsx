import React from 'react'
import {
  render,
  fireEvent,
  queryByLabelText,
  queryByDisplayValue,
} from '@vtex/test-tools/react'
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

  it('should render editable elements when clicking on edit', () => {
    const { queryByText, queryByDisplayValue } = renderComponent(address)
    fireEvent.click(queryByText('Edit'))

    expect(queryByText(address.postalCode as string)).toBeTruthy()
    expect(queryByText('Street, Road, Avenue...')).toBeTruthy()
    expect(queryByText('Number')).toBeTruthy()
    expect(queryByText('Complement')).toBeTruthy()
    expect(queryByText('Neighborhood')).toBeTruthy()
    expect(queryByText('City')).toBeTruthy()
    expect(queryByText('State')).toBeTruthy()

    expect(queryByDisplayValue(address.street as string)).toBeTruthy()
    expect(queryByDisplayValue(address.number as string)).toBeTruthy()
    expect(queryByDisplayValue(address.neighborhood as string)).toBeTruthy()
    expect(queryByDisplayValue(address.city as string)).toBeTruthy()
    expect(queryByDisplayValue('Paraná')).toBeTruthy()
  })

  it('should display without number checkbox', () => {
    const { queryByText } = renderComponent(address)
    fireEvent.click(queryByText('Edit'))

    expect(queryByText('Without number'))
  })

  it('should disable number input when clicking the without number checkbox', () => {
    const {
      queryByText,
      queryByLabelText,
      queryByDisplayValue,
      debug,
    } = renderComponent(address)
    fireEvent.click(queryByText('Edit'))
    fireEvent.click(queryByLabelText('Without number'))
    console.log(queryByLabelText('Without number'))
    console.log(queryByLabelText('Without number').click())

    debug()

    expect(queryByDisplayValue('W/N')).toBeTruthy()
    expect(queryByText(address.number as string)).toBeFalsy()
  })
})
