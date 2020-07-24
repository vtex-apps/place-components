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
import { locations, Location } from './addresses'
import styles from './LocationSearch.css'
import PlaceIcon from './components/PlaceIcon'

const MAX_DROPDOWN_ADDRESSES = 6

interface Interval {
  offset: number
  size: number
}

interface Suggestion {
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
      <em className="c-on-base fs-normal b">{mainText.substr(offset, size)}</em>
      <span className="c-on-base">{mainText.substr(size + offset)}</span>
      <span> {suggestion.secondaryText}</span>
    </div>
  )
}

// This function will be replaced in the future, after integrating the
// component with GraphQL queries.
const getAddresses = (searchTerm: string) => {
  return locations
    .filter(
      (location: Location) =>
        ~location.street.toLowerCase().indexOf(searchTerm.toLowerCase())
    )
    .map((location: Location) => {
      const mainText = location.street
      // never will be -1
      const offset = mainText.toLowerCase().indexOf(searchTerm.toLowerCase())
      return {
        description: `${location.street}, ${location.city}, ${location.state}`,
        mainText,
        secondaryText: `${location.city}, ${location.state}`,
        mainTextMatchInterval: { offset, size: searchTerm.length },
      } as Suggestion
    })
    .slice(0, MAX_DROPDOWN_ADDRESSES)
}

interface LocationSearchProps {
  onSelectAddress?: (selectedAddress: string) => void
  renderEngineLogo?: () => React.ReactNode
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onSelectAddress,
  renderEngineLogo,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const addresses = useMemo(() => getAddresses(searchTerm), [searchTerm])
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
                    <PlaceIcon className="flex flex-shrink-0 mr4" />
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
            <div className="flex items-center pv3 ph5 c-muted-2">
              <div className="flex flex-shrink-0 mr4">
                <IconWarning />
              </div>
              <div className="truncate">
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
