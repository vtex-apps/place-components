import React from 'react'
import AddressForm from './AddressForm'
import LocationSelect from './LocationSelect'
import { sampleAddress as address } from './mocks/CountryDescriptions'
import { AddressContextProvider } from 'vtex.address-context/AddressContext'
import { LocaleSwitcher } from 'vtex.locale-switcher'

const Example: StorefrontFunctionComponent<{}> = () => {
  return (
    <div>
      <h2>AddressForm:</h2>
      <AddressForm />
      <LocationSelect />
    </div>
  )
}

const ExampleWrapper = () => (
  <AddressContextProvider address={address} countries={['BRA', 'KOR']}>
    <LocaleSwitcher />
    <Example />
  </AddressContextProvider>
)

export default ExampleWrapper
