import React, { useState, useEffect } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { IconSearch, Input, Button, ButtonPlain } from 'vtex.styleguide'
import { FormattedMessage, useIntl } from 'react-intl'
import { useLazyQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import msk from 'msk'
import {
  Address,
  Query,
  QueryGetAddressFromPostalCodeArgs,
} from 'vtex.places-graphql'

import GET_ADDRESS_FROM_POSTAL_CODE from './graphql/getAddressFromPostalCode.graphql'
import styles from './LocationInput.css'

interface Props {
  onSuccess?: (address: Address) => void | Promise<void>
  variation?: 'primary' | 'secondary'
}

const LocationInput: React.FC<Props> = ({
  variation = 'secondary',
  onSuccess,
}) => {
  const { address, setAddress, rules } = useAddressContext()
  const { culture } = useRuntime()
  const intl = useIntl()
  const [inputValue, setInputValue] = useState('')
  const [executeGetAddressFromPostalCode, { error, data }] = useLazyQuery<
    Query,
    QueryGetAddressFromPostalCodeArgs
  >(GET_ADDRESS_FROM_POSTAL_CODE)
  const [loading, setLoading] = useState(false)
  const [invalidPostalCode, setInvalidPostalCode] = useState(false)

  const country = address?.country ?? culture.country

  const countryRules = country ? rules[country] : undefined

  useEffect(() => {
    let cancelled = false

    if (data?.getAddressFromPostalCode) {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      ;(onSuccess?.(data.getAddressFromPostalCode) || Promise.resolve())
        .then(() => {
          setAddress(prevAddress => ({
            ...prevAddress,
            ...data.getAddressFromPostalCode,
          }))

          if (cancelled) {
            return
          }

          setLoading(false)
        })
        .catch(() => {
          if (cancelled) {
            return
          }

          setInvalidPostalCode(true)
          setLoading(false)
        })
    }

    if (error) {
      console.warn(error.message)
      setInvalidPostalCode(true)
      setLoading(false)
    }

    return () => {
      cancelled = true
    }
  }, [data, error, onSuccess, setAddress])

  const handleSubmit: React.EventHandler<
    React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  > = evt => {
    evt.preventDefault()
    setLoading(true)
    setInvalidPostalCode(false)
    executeGetAddressFromPostalCode({
      variables: {
        postalCode: inputValue,
        countryCode: country,
      },
    })
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    setInputValue(evt.target.value)
  }

  const handleInputBlur = () => {
    const postalCodeMask = countryRules?.fields.postalCode?.mask

    if (!postalCodeMask) {
      return
    }

    setInputValue(msk(inputValue, postalCodeMask))
  }

  if (!countryRules) {
    return null
  }

  return (
    <div className="w-100">
      <form className={`${styles.locationInput} mb4`} onSubmit={handleSubmit}>
        <Input
          id="postal-code-input"
          label={<FormattedMessage id="place-components.label.postalCode" />}
          suffix={
            <Button
              id="submit-postal-code-button"
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
          onBlur={handleInputBlur}
          disabled={loading}
          error={invalidPostalCode}
          errorMessage={
            invalidPostalCode
              ? intl.formatMessage({ id: 'place-components.error.postalCode' })
              : undefined
          }
        />
      </form>
      {countryRules.fields.postalCode?.additionalData?.forgottenURL && (
        <ButtonPlain
          href={countryRules.fields.postalCode.additionalData.forgottenURL}
          target="_blank noreferrer"
        >
          <FormattedMessage id="place-components.label.dontKnowPostalCode" />
        </ButtonPlain>
      )}
    </div>
  )
}

export default LocationInput
