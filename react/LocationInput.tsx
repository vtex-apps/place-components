import React, { useState, useEffect } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { IconSearch, Input, ButtonPlain, Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useLazyQuery } from 'react-apollo'
import { Address } from 'vtex.places-graphql'

import GET_ADDRESS_FROM_POSTAL_CODE from './graphql/getAddressFromPostalCode.graphql'
import styles from './LocationInput.css'

interface Props {
  onSuccess?: (address: Address) => void
  onNoPostalCode?: () => void
}

const LocationInput: React.FC<Props> = ({ onSuccess, onNoPostalCode }) => {
  const { address, setAddress } = useAddressContext()
  const [inputValue, setInputValue] = useState('')
  const [
    executeGetAddressFromPostalCode,
    { error, data, loading },
  ] = useLazyQuery(GET_ADDRESS_FROM_POSTAL_CODE)

  useEffect(() => {
    if (data) {
      setAddress(data.getAddressFromPostalCode)
      onSuccess?.(data.getAddressFromPostalCode)
    }

    if (error) {
      console.warn(error.message)
    }
  }, [data, error, onSuccess, setAddress])

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = evt => {
    evt.preventDefault()

    executeGetAddressFromPostalCode({
      variables: {
        postalCode: inputValue,
        countryCode: address.country,
      },
    })
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    setInputValue(evt.target.value)
  }

  return (
    <div className="w-100">
      <div className={`${styles.locationInput} mb4`}>
        <Input
          label={<FormattedMessage id="place-components.label.postalCode" />}
          suffix={
            <Button onClick={handleButtonClick} isLoading={loading}>
              <IconSearch />
            </Button>
          }
          size="large"
          value={inputValue}
          onChange={handleInputChange}
          inputMode="numeric"
        />
      </div>
      <ButtonPlain size="small" onClick={onNoPostalCode}>
        <FormattedMessage id="place-components.label.dontKnowPostalCode" />
      </ButtonPlain>
    </div>
  )
}

export default LocationInput
