import React, { useState } from 'react'
import PlaceDetails from './PlaceDetails'
import AddressForm from './AddressForm'
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
      <h2>Place Details:</h2>
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
      <h2>AddressForm:</h2>
      <AddressForm
        summary={[
          [{ name: 'neighborhood' }, { delimiter: ' ', name: 'state' }],
          [{ name: 'street' }, { delimiter: ' - ', name: 'number' }],
        ]}
      />
    </div>
  )
}

const ExampleWrapper = () => (
  <AddressContextProvider address={address} countries={['BRA', 'KOR']}>
    <Example />
  </AddressContextProvider>
)

export default ExampleWrapper
