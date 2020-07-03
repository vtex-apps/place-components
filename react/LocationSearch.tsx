import React, { useState } from 'react'
import { Input, IconSearch, IconClear } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

const LocationSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')

  const onClear = () => setInputValue('')

  return (
    <div className="w-100">
      <Input
        label={
          <FormattedMessage id="place-components.label.autocompleteAddress" />
        }
        prefix={<IconSearch color="#134CD8" />}
        suffix={
          inputValue.length && (
            <span
              role="button"
              tabIndex={0}
              className="pointer"
              onClick={onClear}
              onKeyPress={onClear}
            >
              <IconClear color="#CACBCC" />
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
