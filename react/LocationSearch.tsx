import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Input, IconSearch, IconClear } from 'vtex.styleguide'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxPopover,
  ComboboxList,
} from '@reach/combobox'
import '@reach/combobox/styles.css'

import { addresses as mockedAddresses } from './addresses'
import styles from './LocationSearch.css'

const MAX_DROPDOWN_ADDRESSES = 6

interface LocationSearchProps {
  onSelectAddress?: (selectedAddress: string) => void
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onSelectAddress }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

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

  // This function will be replaced in the future, after integrating the
  // component with GraphQL queries.
  const getAddresses = () => {
    return mockedAddresses
      .filter((address: string) =>
        address.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
      .slice(0, MAX_DROPDOWN_ADDRESSES)
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
          {getAddresses().length > 0 ? (
            <ComboboxList>
              {getAddresses().map((address, index) => (
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
