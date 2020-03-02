import React from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { IconSearch, InputButton, ButtonPlain } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import GET_ADDRESS_FROM_POSTAL_CODE from './graphql/getAddressFromPostalCode.graphql'
import { useLazyQuery } from 'react-apollo'

const LocationInput: StorefrontFunctionComponent<{}> = () => {
  const { address, setAddress } = useAddressContext()
  const [getAddressFromPostalCode, { error, data }] = useLazyQuery(
    GET_ADDRESS_FROM_POSTAL_CODE
  )

  if (data) {
    setAddress(data.getAddressFromPostalCode)
  }

  if (error) {
    console.warn(`error ${error.message}`)
  }

  console.log(setAddress)
  console.log(address)

  const onButtonClick = () => {
    getAddressFromPostalCode({
      variables: {
        postalCode: '22061-020',
        countryCode: 'BRA',
      },
    })
  }

  const button = <IconSearch />

  return (
    <div>
      <div className="mb4">
        <InputButton
          label={<FormattedMessage id="place-components.label.postalCode" />}
          button={button}
          buttonProps={{ onClick: onButtonClick }}
        />
      </div>
      <ButtonPlain size="small">
        <FormattedMessage id="place-components.label.dontKnowPostalCode" />
      </ButtonPlain>
    </div>
  )
}

export default LocationInput
