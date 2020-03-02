import React, { useState } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { IconSearch, Input, ButtonPlain } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import GET_ADDRESS_FROM_POSTAL_CODE from './graphql/getAddressFromPostalCode.graphql'
import { useLazyQuery } from 'react-apollo'

const LocationInput: StorefrontFunctionComponent<{}> = () => {
  const { address, setAddress } = useAddressContext()
  const [inputValue, setInputValue] = useState('')
  const [getAddressFromPostalCode, { error, data }] = useLazyQuery(
    GET_ADDRESS_FROM_POSTAL_CODE
  )

  if (!address.country) {
    throw 'The LocationField (Input) should be used when the country field is already filled'
  }

  if (data) {
    setAddress(data.getAddressFromPostalCode)
  }

  if (error) {
    console.warn(`error ${error.message}`)
  }

  const onButtonClick = () => {
    console.log(inputValue)
    console.log(address.country)
    getAddressFromPostalCode({
      variables: {
        postalCode: inputValue,
        countryCode: address.country,
      },
    })
  }

  const button = <IconSearch />

  return (
    <div>
      <div className="mb4">
        <Input
          label={<FormattedMessage id="place-components.label.postalCode" />}
          button={button}
          buttonProps={{ onClick: onButtonClick }}
          value={inputValue}
          onChange={({
            target: { value },
          }: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(value)
          }}
        />
      </div>
      <ButtonPlain size="small">
        <FormattedMessage id="place-components.label.dontKnowPostalCode" />
      </ButtonPlain>
    </div>
  )
}

export default LocationInput
