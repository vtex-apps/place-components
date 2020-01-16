import React, { useState } from 'react'
import PlaceDetails, { LineFragment } from './PlaceDetails'
import { Dropdown } from 'vtex.styleguide'
import {
  countryDescriptions,
  CountryDescription,
  sampleAddress as address,
} from './mocks/CountryDescriptions'
import { AddressContextProvider, useAddressContext } from 'vtex.address-context/AddressContext'

const PlaceComponents: StorefrontFunctionComponent<{}> = () => {
  const [option, setOption] = useState<string>('')
  const [summary, setSummary] = useState<LineFragment[][]>([])
  const { countries } = useAddressContext()

  const onDropdownChange = (_: Event, country: string) => {
    // eslint-disable-next-line no-console
    console.log(countries)
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
    </div>
  )
}

const PlaceComponentsWrapper = () => (
  <AddressContextProvider>
    <PlaceComponents />
  </AddressContextProvider>
)

export default PlaceComponentsWrapper
