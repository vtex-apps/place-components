import React, { useState } from 'react'
import PlaceDetails, { LineFragment } from './PlaceDetails'
import AddressForm from './AddressForm'
import { Dropdown } from 'vtex.styleguide'
import {
  countryDescriptions,
  CountryDescription,
  sampleAddress as address,
} from './mocks/CountryDescriptions'
import { AddressContextProvider, useAddressContext } from 'vtex.address-context/AddressContext'

const Example: StorefrontFunctionComponent<{}> = () => {
  const [option, setOption] = useState<string>('')
  const [summary, setSummary] = useState<LineFragment[][]>([])
  const { countries, address } = useAddressContext()

  const onDropdownChange = (_: Event, country: string) => {
    // eslint-disable-next-line no-console
    console.log(countries)
    // eslint-disable-next-line no-console
    console.log(address)
    setOption(country)
    let description = countryDescriptions.find(
      (description: CountryDescription) => description.name == country
    )
    setSummary(description?.summary || [])
  }

  return (
    <div>
      <Dropdown
        label="Country"
        options={[
          { value: 'ARG', label: 'Argentina' },
          { value: 'BRA', label: 'Brazil' },
          { value: 'KOR', label: 'Korea' },
        ]}
        value={option}
        onChange={onDropdownChange}
        placeholder="Select a country"
      />
      <PlaceDetails address={address} summary={summary} />
      <AddressForm address={address} summary={summary} />
    </div>
  )
}

const ExampleWrapper = () => (
  <AddressContextProvider address={address} countries={["BRA", "KOR"]}>
    <Example />
  </AddressContextProvider>
)

export default ExampleWrapper
