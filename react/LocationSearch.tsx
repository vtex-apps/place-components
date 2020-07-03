import React, { useState } from 'react'
import { Input, IconSearch } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

const LocationSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <div className="w-100">
      <Input
        label={
          <FormattedMessage id="place-components.label.autocompleteAddress" />
        }
        prefix={<IconSearch color="#134CD8" />}
        value={inputValue}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setInputValue(e.target.value)
        }
      />
    </div>
  )
}

export default LocationSearch
