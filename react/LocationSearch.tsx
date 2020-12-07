import React, { useState, useRef, useEffect, ReactNode } from 'react'
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
import { useLazyQuery, useQuery } from 'react-apollo'
import {
  Address,
  AddressSuggestion,
  Image,
  Query,
  QueryGetAddressByExternalIdArgs,
  QuerySuggestAddressesArgs,
} from 'vtex.geolocation-graphql-interface'

import PROVIDER_LOGO from './graphql/providerLogo.graphql'
import SESSION_TOKEN from './graphql/sessionToken.graphql'
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

const useProviderLogo = (): Image | undefined => {
  const { data, error } = useQuery<Query, {}>(PROVIDER_LOGO)
  if (error) {
    console.error(error.message)
  }
  return data?.providerLogo
}

const useDebouncedValue = (value: string, delayInMs: number): string => {
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

const useSuggestions = (
  searchTerm: string,
  sessionToken: string | null
): [AddressSuggestion[], boolean] => {
  const [executeSuggestAddresses, { data, error, loading }] = useLazyQuery<
    Query,
    QuerySuggestAddressesArgs
  >(SUGGEST_ADDRESSES)

  useEffect(() => {
    if (searchTerm.trim().length) {
      executeSuggestAddresses({ variables: { searchTerm, sessionToken } })
    }
  }, [searchTerm, sessionToken, executeSuggestAddresses])

  useEffect(() => {
    if (error) {
      console.error(error.message)
    }
  }, [error])

  return [data?.suggestAddresses ?? [], loading]
}

const renderSuggestionText = ({
  mainText,
  mainTextMatchInterval: { offset, length },
  secondaryText,
}: AddressSuggestion) => {
  return (
    <div className="truncate c-muted-2">
      <span className="c-on-base">
        {mainText.substr(0, offset)}
        <span className="b">{mainText.substr(offset, length)}</span>
        {mainText.substr(offset + length)}
      </span>{' '}
      <span>{secondaryText}</span>
    </div>
  )
}

interface LocationSearchProps {
  label?: ReactNode | string
  onSelectAddress?: (address: Address) => void
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  label = <FormattedMessage id="place-components.label.autocompleteAddress" />,
  onSelectAddress,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const inputWrapperRef = useRef<HTMLDivElement>(null)
  const { setAddress } = useAddressContext()
  const providerLogo = useProviderLogo()
  const debouncedSearchTerm = useDebouncedValue(
    searchTerm,
    DEBOUNCE_DELAY_IN_MS
  )
  const {
    data: sessionTokenData,
    loading: loadingSessionToken,
    refetch: refetchSessionToken,
  } = useQuery<Query, {}>(SESSION_TOKEN, { notifyOnNetworkStatusChange: true })
  const sessionToken = loadingSessionToken
    ? null
    : sessionTokenData?.sessionToken ?? null
  const [suggestions, loadingSuggestions] = useSuggestions(
    debouncedSearchTerm,
    sessionToken
  )

  const [executeGetAddress, { data, error, loading }] = useLazyQuery<
    Query,
    QueryGetAddressByExternalIdArgs
  >(GET_ADDRESS_BY_EXTERNAL_ID)

  useEffect(() => {
    if (data) {
      setAddress(prevAddress => ({
        ...prevAddress,
        ...data.getAddressByExternalId,
      }))
      onSelectAddress?.(data.getAddressByExternalId)
    }
    if (error) {
      console.error(error.message)
    }
  }, [data, error, onSelectAddress, setAddress])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Escape') {
      return
    }
    setSearchTerm('')
  }

  const handleAddressSelection = (selectedAddress: string) => {
    const id = suggestions.find(
      address => address.description === selectedAddress
    )?.externalId

    if (id == null) {
      console.error(`${selectedAddress} was not found`)
      return
    }

    setSearchTerm(selectedAddress)
    executeGetAddress({ variables: { id, sessionToken } })
    refetchSessionToken()
  }

  return (
    <div className="w-100">
      <Combobox onSelect={handleAddressSelection}>
        <div ref={inputWrapperRef}>
          <ComboboxInput
            as={Input}
            size="large"
            testId="location-search-input"
            label={label}
            prefix={
              <div className="c-action-primary flex justify-center items-center">
                <IconSearch />
              </div>
            }
            suffix={
              loading ? (
                <Spinner size={20} />
              ) : searchTerm.trim().length ? (
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
            disabled={loading}
            value={searchTerm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
            onKeyDown={handleKeyDown}
          />
        </div>
        {debouncedSearchTerm.trim().length ? (
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
            {loadingSuggestions ? (
              <div className="flex flex-row justify-center items-center pa3">
                <Spinner size={20} />
              </div>
            ) : null}
            {suggestions.length > 0 && providerLogo ? (
              <div className="flex flex-row-reverse">
                <div className="mt3 mb1 mh5">
                  <img
                    className="h1"
                    src={providerLogo.src}
                    alt={providerLogo.alt}
                  />
                </div>
              </div>
            ) : null}
            {!loadingSuggestions && suggestions.length === 0 ? (
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
