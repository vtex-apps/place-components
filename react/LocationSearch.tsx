import React, { useState } from 'react'
import { Input, IconSearch, IconClear } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { Combobox, ComboboxInput } from '@reach/combobox'

import styles from './LocationSearch.css'
import { addresses as mockedAddresses } from './addresses'

const LocationSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Escape') {
      return
    }
    setInputValue('')
  }

  return (
    <div className={`${styles.locationSearch} w-100`}>
      <Combobox>
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
            inputValue.length && (
              <span
                data-testid="location-search-clear"
                role="button"
                tabIndex={-1}
                className="pointer c-muted-3 flex justify-center items-center outline-0"
                onClick={() => setInputValue('')}
                onKeyPress={() => {}}
              >
                <IconClear />
              </span>
            )
          }
          value={inputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(event.target.value)
          }
          onKeyDown={handleKeyDown}
        />
      </Combobox>
    </div>
  )
}

export default LocationSearch
