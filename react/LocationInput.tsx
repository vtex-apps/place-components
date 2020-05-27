import React, { useState, useEffect } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { IconSearch, Input, Button, ButtonPlain } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useLazyQuery } from 'react-apollo'
import { Address } from 'vtex.places-graphql'

import rules from './countries/rules'
import GET_ADDRESS_FROM_POSTAL_CODE from './graphql/getAddressFromPostalCode.graphql'
import styles from './LocationInput.css'

interface Props {
  onSuccess?: (address: Address) => void
  variation?: 'primary' | 'secondary'
}

const LocationInput: React.FC<Props> = ({
  variation = 'secondary',
  onSuccess,
}) => {
  const { address, setAddress } = useAddressContext()
  const [inputValue, setInputValue] = useState('')
  const [
    executeGetAddressFromPostalCode,
    { error, data, loading },
  ] = useLazyQuery(GET_ADDRESS_FROM_POSTAL_CODE)

  const countryRules = rules[address.country!]

  useEffect(() => {
    if (data) {
      setAddress(data.getAddressFromPostalCode)
      onSuccess?.(data.getAddressFromPostalCode)
    }

    if (error) {
      console.warn(error.message)
    }
  }, [data, error, onSuccess, setAddress])

  const handleSubmit: React.EventHandler<
    React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  > = evt => {
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
      <form className={`${styles.locationInput} mb4`} onSubmit={handleSubmit}>
        <Input
          label={<FormattedMessage id="place-components.label.postalCode" />}
          suffix={
            <Button
              type="submit"
              onClick={handleSubmit}
              isLoading={loading}
              variation={variation}
            >
              <IconSearch />
            </Button>
          }
          size="large"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
      {countryRules.fields.postalCode?.forgottenURL && (
        <ButtonPlain
          href={countryRules.fields.postalCode.forgottenURL}
          target="_blank noreferrer"
        >
          <FormattedMessage id="place-components.label.dontKnowPostalCode" />
        </ButtonPlain>
      )}
    </div>
  )
}

export default LocationInput
