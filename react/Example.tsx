import React, { useState } from 'react'
import PlaceDetails from './PlaceDetails'
import { Dropdown } from 'vtex.styleguide'
import { sampleAddress as address } from './mocks/CountryDescriptions'
import { AddressContextProvider } from 'vtex.address-context/AddressContext'
import { Display } from './typings/countryRulesTypes.d'

const Example: StorefrontFunctionComponent<{}> = () => {
  const [display, setDisplay] = useState<keyof Display>('extended')

  const onDisplayDropdownChange = (_: Event, newDisplay: keyof Display) => {
    setDisplay(newDisplay)
  }

  return (
    <div>
      <h1 className="tc">Place Components</h1>
      <h1>Place Details:</h1>
      <Dropdown
        label="Display"
        options={[
          { value: 'minimal', label: 'minimal' },
          { value: 'compact', label: 'compact' },
          { value: 'extended', label: 'extended' },
        ]}
        value={display}
        onChange={onDisplayDropdownChange}
        className="w4"
      />
      <PlaceDetails display={display} />
    </div>
  )
}

const ExampleWrapper = () => (
  <AddressContextProvider address={address} countries={['BRA', 'KOR']}>
    <Example />
  </AddressContextProvider>
)

export default ExampleWrapper
