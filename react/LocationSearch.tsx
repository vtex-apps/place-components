import React, { useState, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { Input, IconSearch, IconClear } from 'vtex.styleguide'

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxPopover,
  ComboboxList,
} from './components/Combobox'
import { addresses as mockedAddresses } from './addresses'
import styles from './LocationSearch.css'

const MAX_DROPDOWN_ADDRESSES = 6

// This function will be replaced in the future, after integrating the
// component with GraphQL queries.
const getAddresses = (searchTerm: string) => {
  return mockedAddresses
    .filter((address: string) =>
      address.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
    .slice(0, MAX_DROPDOWN_ADDRESSES)
}

interface LocationSearchProps {
  onSelectAddress?: (selectedAddress: string) => void
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onSelectAddress }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const addresses = useMemo(() => getAddresses(searchTerm), [searchTerm])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Escape') {
      return
    }
    setSearchTerm('')
  }

  const handleAddressSelection = (selectedAddress: string) => {
    setSearchTerm(selectedAddress)
    onSelectAddress?.(selectedAddress)
  }

  return (
    <div className={`${styles.locationSearch} w-100`}>
      <Combobox onSelect={handleAddressSelection}>
        <ComboboxInput
          as={Input}
          testId="location-search-input"
          label={
            <FormattedMessage id="place-components.label.autocompleteAddress" />
          }
          prefix={
            <div className="c-action-primary flex justify-center items-center">
              <IconSearch />
            </div>
          }
          suffix={
            searchTerm.trim().length && (
              <span
                data-testid="location-search-clear"
                role="button"
                tabIndex={-1}
                className="pointer c-muted-3 flex justify-center items-center outline-0"
                onClick={() => setSearchTerm('')}
                onKeyPress={() => {}}
              >
                <IconClear />
              </span>
            )
          }
          value={searchTerm}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(event.target.value)
          }
          onKeyDown={handleKeyDown}
        />
        <ComboboxPopover>
          {addresses.length > 0 ? (
            <ComboboxList>
              {addresses.map((address, index) => (
                <ComboboxOption value={address} key={index} />
              ))}
            </ComboboxList>
          ) : (
            <FormattedMessage id="place-components.label.autocompleteAddressFail" />
          )}
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default LocationSearch
