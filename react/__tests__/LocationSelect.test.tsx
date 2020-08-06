import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import { AddressContextProvider } from 'vtex.address-context/AddressContext'
import { Address } from 'vtex.checkout-graphql'

import LocationSelect from '../LocationSelect'
import {
  sampleAddress as addressWithoutLocationSelect,
  incompleteAddress,
} from '../__mocks__/mockDescriptions'
import { braRules } from '../__mocks__/AddressRules'

describe('Location Select', () => {
  const renderComponent = (address: Address) => {
    return render(
      <AddressContextProvider address={address} countries={[]} rules={braRules}>
        <LocationSelect />
      </AddressContextProvider>
    )
  }

  it('should fail to render if the country does have a specification for location select', () => {
    const oldConsoleError = console.error
    console.error = () => {}

    expect(() => renderComponent(addressWithoutLocationSelect)).toThrow()

    console.error = oldConsoleError
  })

  it('should render with proper fantasy names according to the address', () => {
    const { queryByText } = renderComponent(incompleteAddress)

    expect(queryByText('Province')).toBeInTheDocument()
    expect(queryByText('City')).toBeInTheDocument()

    expect(queryByText('State')).not.toBeInTheDocument()
  })

  it('should correctly select first option', () => {
    const { getByLabelText, getAllByText } = renderComponent(incompleteAddress)

    fireEvent.change(getByLabelText(/Province/i), {
      target: { value: 'Santa Fé' },
    })

    expect(getAllByText('Santa Fé')).toHaveLength(2)
  })

  it('should correctly select second option, after the first one was selected', () => {
    const { getByLabelText, queryAllByText } = renderComponent(
      incompleteAddress
    )

    fireEvent.change(getByLabelText(/Province/i), {
      target: { value: 'Santa Fé' },
    })

    fireEvent.change(getByLabelText(/City/i), {
      target: { value: 'Murphy' },
    })

    expect(queryAllByText('Murphy')).toHaveLength(2)
  })

  it('should unselect second option if the first option changed', () => {
    const { getByLabelText, queryAllByText } = renderComponent(
      incompleteAddress
    )

    fireEvent.change(getByLabelText(/Province/i), {
      target: { value: 'Santa Fé' },
    })

    fireEvent.change(getByLabelText(/City/i), {
      target: { value: 'Murphy' },
    })

    fireEvent.change(getByLabelText(/Province/i), {
      target: { value: 'Chaco' },
    })

    expect(queryAllByText('Murphy')).toHaveLength(0)
  })
})
