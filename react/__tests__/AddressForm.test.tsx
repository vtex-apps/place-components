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

    expect(getByText(address.street as string)).toBeInTheDocument()
    expect(getByText(address.number as string)).toBeInTheDocument()
    expect(getByText(address.neighborhood as string)).toBeInTheDocument()
    expect(getByText(address.city as string)).toBeInTheDocument()
    expect(getByText(address.state as string)).toBeInTheDocument()
    expect(getByText(address.postalCode as string)).toBeInTheDocument()

    expect(
      queryByDisplayValue(address.street as string)
    ).not.toBeInTheDocument()
    expect(
      queryByDisplayValue(address.number as string)
    ).not.toBeInTheDocument()
    expect(
      queryByDisplayValue(address.neighborhood as string)
    ).not.toBeInTheDocument()
    expect(queryByDisplayValue(address.city as string)).not.toBeInTheDocument()
    expect(queryByDisplayValue(address.state as string)).not.toBeInTheDocument()
    expect(
      queryByDisplayValue(address.postalCode as string)
    ).not.toBeInTheDocument()
  })

  it('should have an edit button', () => {
    const { getByText } = renderComponent(address)
    expect(getByText('Edit')).toBeInTheDocument()
  })

  it('should render editable elements when clicking on edit', () => {
    const { getByText, queryByDisplayValue } = renderComponent(address)
    fireEvent.click(getByText('Edit'))

    expect(getByText(address.postalCode as string)).toBeInTheDocument()
    expect(getByText('Street, Road, Avenue...')).toBeInTheDocument()
    expect(getByText('Number')).toBeInTheDocument()
    expect(getByText('Complement')).toBeInTheDocument()
    expect(getByText('Neighborhood')).toBeInTheDocument()
    expect(getByText('City')).toBeInTheDocument()
    expect(getByText('State')).toBeInTheDocument()

    expect(queryByDisplayValue(address.street as string)).toBeInTheDocument()
    expect(queryByDisplayValue(address.number as string)).toBeInTheDocument()
    expect(
      queryByDisplayValue(address.neighborhood as string)
    ).toBeInTheDocument()
    expect(queryByDisplayValue(address.city as string)).toBeInTheDocument()
    expect(queryByDisplayValue('Paraná')).toBeInTheDocument()
  })

  it('should display without number checkbox', () => {
    const { getByText } = renderComponent(address)
    fireEvent.click(getByText('Edit'))

    expect(getByText('Without number')).toBeInTheDocument()
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

    expect(getByDisplayValue('W/N')).toBeInTheDocument()
    expect(
      queryByDisplayValue(address.number as string)
    ).not.toBeInTheDocument()
  })
})
