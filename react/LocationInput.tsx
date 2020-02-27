import React from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { IconSearch, Input, ButtonPlain } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

const LocationInput: StorefrontFunctionComponent<{}> = () => {
  const { address, setAddress } = useAddressContext()

  console.log(setAddress)
  console.log(address)

  return (
    <div>
      <div className="mb4">
        <Input
          label={<FormattedMessage id="place-components.label.postalCode" />}
          button={<IconSearch />}
        />
      </div>
      <ButtonPlain size="small">
        <FormattedMessage id="place-components.label.dontKnowPostalCode" />
      </ButtonPlain>
    </div>
  )
}

export default LocationInput
