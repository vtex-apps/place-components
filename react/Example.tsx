import React from 'react'
import AddressForm from './AddressForm'
import LocationSelect from './LocationSelect'
import LocationCountry from './LocationCountry'
import DeviceCoordinates from './DeviceCoordinates'
import {
  sampleAddress1 as address1,
  sampleAddress2 as address2,
} from './mocks/CountryDescriptions'
import { AddressContextProvider } from 'vtex.address-context/AddressContext'
import { LocaleSwitcher } from 'vtex.locale-switcher'
import PlaceDetails from './PlaceDetails'

const countryList = ['BRA', 'KOR', 'ARG', 'BOL']

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

const Example3: StorefrontFunctionComponent<{}> = () => {
  return (
    <div>
      <h2>LocationCountry</h2>
      <LocationCountry />
    </div>
  )
}

const Example4: StorefrontFunctionComponent<{}> = () => {
  return (
    <div>
      <h2>DeviceCoordinates</h2>
      <AddressForm />
      <DeviceCoordinates />
    </div>
  )
}

const ExampleWrapper = () => (
  <div>
    <AddressContextProvider address={address1} countries={countryList}>
      <LocaleSwitcher />
      <Example1 />
    </AddressContextProvider>
    <AddressContextProvider address={address2} countries={countryList}>
      <LocaleSwitcher />
      <Example2 />
    </AddressContextProvider>
    <AddressContextProvider address={address2} countries={countryList}>
      <LocaleSwitcher />
      <Example3 />
    </AddressContextProvider>
    <AddressContextProvider address={address1} countries={countryList}>
      <LocaleSwitcher />
      <Example4 />
    </AddressContextProvider>
  </div>
)

export default ExampleWrapper
