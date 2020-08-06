import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import { AddressContextProvider } from 'vtex.address-context/AddressContext'
import { Address } from 'vtex.checkout-graphql'

import AddressForm from '../AddressForm'
import { sampleAddress } from '../__mocks__/mockDescriptions'
import { braRules } from '../__mocks__/AddressRules'

describe('Address Form', () => {
  const renderComponent = (address: Address) => {
    return render(
      <AddressContextProvider countries={[]} address={address} rules={braRules}>
        <AddressForm />
      </AddressContextProvider>
    )
  }

  it('should render already filled information as read-only', () => {
    const { queryByDisplayValue, getByText } = renderComponent(sampleAddress)

    expect(getByText(sampleAddress.street)).toBeInTheDocument()
    expect(getByText(sampleAddress.number)).toBeInTheDocument()
    expect(getByText(sampleAddress.neighborhood)).toBeInTheDocument()
    expect(getByText(sampleAddress.city)).toBeInTheDocument()
    expect(getByText(sampleAddress.state)).toBeInTheDocument()
    expect(getByText(sampleAddress.postalCode)).toBeInTheDocument()

    expect(queryByDisplayValue(sampleAddress.street)).not.toBeInTheDocument()
    expect(queryByDisplayValue(sampleAddress.number)).not.toBeInTheDocument()
    expect(
      queryByDisplayValue(sampleAddress.neighborhood)
    ).not.toBeInTheDocument()
    expect(queryByDisplayValue(sampleAddress.city)).not.toBeInTheDocument()
    expect(queryByDisplayValue(sampleAddress.state)).not.toBeInTheDocument()
    expect(
      queryByDisplayValue(sampleAddress.postalCode)
    ).not.toBeInTheDocument()
  })

  it('should have an edit button', () => {
    const { getByText } = renderComponent(sampleAddress)
    expect(getByText('Edit')).toBeInTheDocument()
  })

  it('should render editable elements when clicking on edit', () => {
    const { getByText, queryByDisplayValue } = renderComponent(sampleAddress)
    fireEvent.click(getByText('Edit'))

    expect(getByText(sampleAddress.postalCode)).toBeInTheDocument()
    expect(getByText('Street, Road, Avenue...')).toBeInTheDocument()
    expect(getByText('Number')).toBeInTheDocument()
    expect(getByText('Complement')).toBeInTheDocument()
    expect(getByText('Neighborhood')).toBeInTheDocument()
    expect(getByText('City')).toBeInTheDocument()
    expect(getByText('State')).toBeInTheDocument()

    expect(queryByDisplayValue(sampleAddress.street)).toBeInTheDocument()
    expect(queryByDisplayValue(sampleAddress.number)).toBeInTheDocument()
    expect(queryByDisplayValue(sampleAddress.neighborhood)).toBeInTheDocument()
    expect(queryByDisplayValue(sampleAddress.city)).toBeInTheDocument()
    expect(queryByDisplayValue('Paraná')).toBeInTheDocument()
  })

  it('should display without number checkbox', () => {
    const { getByText } = renderComponent(sampleAddress)
    fireEvent.click(getByText('Edit'))

    expect(getByText('Without number')).toBeInTheDocument()
  })

  it('should disable number input when clicking the without number checkbox', async () => {
    const {
      getByText,
      getByLabelText,
      getByDisplayValue,
      queryByDisplayValue,
    } = renderComponent(sampleAddress)
    fireEvent.click(getByText('Edit'))
    fireEvent.click(getByLabelText('Without number'))

    expect(getByDisplayValue('W/N')).toBeInTheDocument()
    expect(queryByDisplayValue(sampleAddress.number)).not.toBeInTheDocument()
  })
})
