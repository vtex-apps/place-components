import React from 'react'
import AddressForm from './AddressForm'
import LocationSelect from './LocationSelect'
import {
  sampleAddress1 as address1,
  sampleAddress2 as address2,
} from './mocks/CountryDescriptions'
import { AddressContextProvider } from 'vtex.address-context/AddressContext'
import { LocaleSwitcher } from 'vtex.locale-switcher'

const Example1: StorefrontFunctionComponent<{}> = () => {
  return (
    <div>
      <h2>AddressForm:</h2>
      <AddressForm />
    </div>
  )
}

const Example2: StorefrontFunctionComponent<{}> = () => {
  return (
    <div>
      <h2>LocationSelect</h2>
      <LocationSelect />
    </div>
  )
}

const ExampleWrapper = () => (
  <div>
    <AddressContextProvider
      address={address1}
      countries={['BRA', 'KOR', 'ARG']}
    >
      <LocaleSwitcher />
      <Example1 />
    </AddressContextProvider>
    <AddressContextProvider
      address={address2}
      countries={['BRA', 'KOR', 'ARG']}
    >
      <LocaleSwitcher />
      <Example2 />
    </AddressContextProvider>
  </div>
)

export default ExampleWrapper
