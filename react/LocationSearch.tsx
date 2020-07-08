import React, { useState } from 'react'
import { Input, IconSearch, IconClear } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import styles from './LocationSearch.css'

const LocationSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')

  const onClear = () => setInputValue('')

  return (
    <div className={`${styles.locationSearch} w-100`}>
      <Input
        testId="location-search-input"
        label={
          <FormattedMessage id="place-components.label.autocompleteAddress" />
        }
        prefix={
          <div className="c-action-primary flex justify-center-s items-center-m">
            <IconSearch />
          </div>
        }
        suffix={
          inputValue.length && (
            <span
              role="button"
              tabIndex={-1}
              className="pointer c-muted-3 flex justify-center-s items-center-m outline-0-m"
              onClick={onClear}
              onKeyPress={onClear}
            >
              <IconClear />
            </span>
          )
        }
        value={inputValue}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setInputValue(e.target.value)
        }
      />
    </div>
  )
}

export default LocationSearch
