import React, { useState, useRef, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Input,
  IconSearch,
  IconClear,
  IconWarning,
  Spinner,
} from 'vtex.styleguide'
import { positionMatchWidth } from '@reach/popover'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { useLazyQuery } from 'react-apollo'
import { Address, AddressSuggestion } from 'vtex.places-graphql'

import SUGGEST_ADDRESSES from './graphql/suggestAddresses.graphql'
import GET_ADDRESS_BY_EXTERNAL_ID from './graphql/getAddressByExternalId.graphql'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxPopover,
  ComboboxList,
} from './components/Combobox'
import PlaceIcon from './components/PlaceIcon'

const DEBOUNCE_DELAY_IN_MS = 500

const useDebouncedValue = (value: string, delayInMs: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delayInMs)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delayInMs])

  return debouncedValue
}

const renderSuggestionText = (suggestion: AddressSuggestion) => {
  const { mainText } = suggestion
  const { offset, length } = suggestion.mainTextMatchInterval
  return (
    <div className="truncate c-muted-2">
      <span className="c-on-base">
        {mainText.substr(0, offset)}
        <span className="b">{mainText.substr(offset, length)}</span>
        {mainText.substr(length + offset)}
      </span>{' '}
      <span>{suggestion.secondaryText}</span>
    </div>
  )
}

interface LocationSearchProps {
  onSelectAddress?: (address: Address) => void
  renderEngineLogo?: () => React.ReactNode
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onSelectAddress,
  renderEngineLogo,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const inputWrapperRef = useRef<HTMLDivElement>(null)
  const { setAddress } = useAddressContext()
  const debouncedSearchTerm = useDebouncedValue(
    searchTerm,
    DEBOUNCE_DELAY_IN_MS
  )
  const [
    executeSuggestAddresses,
    {
      data: suggestAddressesData,
      error: suggestAddressesError,
      loading: suggestAddressesLoading,
    },
  ] = useLazyQuery(SUGGEST_ADDRESSES)
  const [
    executeGetAddressByExternalId,
    { data: getAddressByExternalIdData, error: getAddressByExternalIdError },
  ] = useLazyQuery(GET_ADDRESS_BY_EXTERNAL_ID)

  useEffect(() => {
    if (debouncedSearchTerm.trim().length) {
      executeSuggestAddresses({
        variables: { searchTerm: debouncedSearchTerm },
      })
    } else {
      setSuggestions([])
    }
  }, [debouncedSearchTerm, executeSuggestAddresses])

  useEffect(() => {
    if (suggestAddressesData) {
      setSuggestions(suggestAddressesData.suggestAddresses)
    }
    if (suggestAddressesError) {
      console.warn(suggestAddressesError.message)
    }
  }, [suggestAddressesData, suggestAddressesError, setSuggestions])

  useEffect(() => {
    if (getAddressByExternalIdData) {
      setAddress(getAddressByExternalIdData.getAddressByExternalId)
      onSelectAddress?.(getAddressByExternalIdData.getAddressByExternalId)
    }
    if (getAddressByExternalIdError) {
      console.warn(getAddressByExternalIdError.message)
    }
  }, [
    getAddressByExternalIdData,
    getAddressByExternalIdError,
    onSelectAddress,
    setAddress,
  ])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Escape') {
      return
    }
    setSearchTerm('')
  }

  const handleAddressSelection = (selectedAddress: string) => {
    setSearchTerm(selectedAddress)
    const id = suggestions.find(
      address => address.description === selectedAddress
    )?.externalId
    executeGetAddressByExternalId({ variables: { id } })
  }

  return (
    <div className="w-100">
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
              searchTerm.trim().length ? (
                <span
                  data-testid="location-search-clear"
                  role="button"
                  // the input can be cleared by pressing the esc key,
                  // so the clear button should not be tabbable
                  tabIndex={-1}
                  className="flex pa3 na3 pointer outline-0 c-muted-3 hover-gray"
                  onClick={() => setSearchTerm('')}
                  onKeyPress={() => {}}
                >
                  <IconClear />
                </span>
              ) : null
            }
            value={searchTerm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
            onKeyDown={handleKeyDown}
          />
        </div>
        {searchTerm.trim().length ? (
          <ComboboxPopover
            position={(_targetRect, popoverRect) =>
              positionMatchWidth(
                inputWrapperRef.current?.getBoundingClientRect(),
                popoverRect
              )
            }
          >
            {suggestions.length > 0 ? (
              <ComboboxList>
                {suggestions.map((address, index) => (
                  <ComboboxOption value={address.description} key={index}>
                    <PlaceIcon className="flex flex-shrink-0 mr4 c-muted-1" />
                    {renderSuggestionText(address)}
                  </ComboboxOption>
                ))}
              </ComboboxList>
            ) : null}
            {suggestAddressesLoading ? (
              <div className="flex flex-row justify-center items-center pa3">
                <Spinner size={20} />
              </div>
            ) : null}
            {suggestions.length > 0 && renderEngineLogo ? (
              <div className="flex flex-row-reverse">
                <div className="mt3 mb1 mh5">{renderEngineLogo()}</div>
              </div>
            ) : null}
            {!suggestAddressesLoading && suggestions.length === 0 ? (
              <div className="flex items-center pv3 ph5">
                <div className="flex flex-shrink-0 mr4 c-muted-3">
                  <IconWarning />
                </div>
                <div className="truncate c-muted-2 fw6">
                  <FormattedMessage id="place-components.label.autocompleteAddressFail" />
                </div>
              </div>
            ) : null}
          </ComboboxPopover>
        ) : null}
      </Combobox>
    </div>
  )
}

export default LocationSearch
