import React, { useState, useMemo, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import { Input, IconSearch, IconClear, IconWarning } from 'vtex.styleguide'
import { positionMatchWidth } from '@reach/popover'

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxPopover,
  ComboboxList,
} from './components/Combobox'
import styles from './LocationSearch.css'
import PlaceIcon from './components/PlaceIcon'

interface Interval {
  offset: number
  size: number
}

export interface Suggestion {
  description: string
  mainText: string
  mainTextMatchInterval: Interval
  secondaryText: string
}

const renderSuggestionText = (suggestion: Suggestion) => {
  const { mainText } = suggestion
  const { offset, size } = suggestion.mainTextMatchInterval
  return (
    <div className="truncate c-muted-2">
      <span className="c-on-base">{mainText.substr(0, offset)}</span>
      <span className="c-on-base b">{mainText.substr(offset, size)}</span>
      <span className="c-on-base">{mainText.substr(size + offset)}</span>
      <span>{` ${suggestion.secondaryText}`}</span>
    </div>
  )
}

interface LocationSearchProps {
  getAddresses: (searchTerm: string) => Suggestion[]
  onSelectAddress?: (selectedAddress: string) => void
  renderEngineLogo?: () => React.ReactNode
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  getAddresses,
  onSelectAddress,
  renderEngineLogo,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const addresses = useMemo(() => getAddresses(searchTerm), [
    getAddresses,
    searchTerm,
  ])
  const inputWrapperRef = useRef<HTMLDivElement>(null)

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
        <div ref={inputWrapperRef}>
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
                  // the input can be cleared by pressing the esc key,
                  // so the clear button should not be tabbable
                  tabIndex={-1}
                  className="pointer c-muted-3 hover-gray flex justify-center items-center outline-0"
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
        </div>
        <ComboboxPopover
          position={(_targetRect, popoverRect) =>
            positionMatchWidth(
              inputWrapperRef.current?.getBoundingClientRect(),
              popoverRect
            )
          }
        >
          {addresses.length > 0 ? (
            <>
              <ComboboxList>
                {addresses.map((address, index) => (
                  <ComboboxOption value={address.description} key={index}>
                    <PlaceIcon className="flex flex-shrink-0 mr4 c-muted-1" />
                    {renderSuggestionText(address)}
                  </ComboboxOption>
                ))}
              </ComboboxList>
              {renderEngineLogo && (
                <div className="flex flex-row-reverse">
                  <div className="mt3 mb1 mh5">{renderEngineLogo()}</div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center pv3 ph5">
              <div className="flex flex-shrink-0 mr4 c-muted-3">
                <IconWarning />
              </div>
              <div className="truncate c-muted-2 fw6">
                <FormattedMessage id="place-components.label.autocompleteAddressFail" />
              </div>
            </div>
          )}
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default LocationSearch
