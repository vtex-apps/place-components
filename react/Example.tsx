import React, { useState } from 'react'
import PlaceDetails from './PlaceDetails'
import AddressForm from './AddressForm'
import { Dropdown } from 'vtex.styleguide'
import {
  countryDescriptions,
  CountryDescription,
  sampleAddress as address,
} from './mocks/CountryDescriptions'
import { AddressContextProvider, useAddressContext } from 'vtex.address-context/AddressContext'
import { LineFragment } from './typings/placeComponentsTypes'

const Example: StorefrontFunctionComponent<{}> = () => {
  const [option, setOption] = useState<string>('')
  const [summary, setSummary] = useState<LineFragment[][]>([])
  const { address } = useAddressContext()

  const onDropdownChange = (_: Event, country: string) => {
    setOption(country)
    let description = countryDescriptions.find(
      (description: CountryDescription) => description.name == country
    )
    setSummary(description?.summary || [])
  }

  return (
    <div>
      <h1 className="tc">Place Components</h1>
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
      <h1>Place Details:</h1>
      <PlaceDetails address={address} summary={summary}/>
      <h1>Address Form:</h1>
      <AddressForm address={address} summary={summary}/>
    </div>
  )
}

const ExampleWrapper = () => (
  <AddressContextProvider address={address} countries={["BRA", "KOR"]}>
    <Example />
  </AddressContextProvider>
)

export default ExampleWrapper
