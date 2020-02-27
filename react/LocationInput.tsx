import React from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
// import { ButtonPlain, Spinner, Tooltip, IconLocation } from 'vtex.styleguide'
// import { FormattedMessage } from 'react-intl'

const LocationInput: StorefrontFunctionComponent<{}> = () => {
  const { setAddress } = useAddressContext()

  console.log(setAddress)

  return <div>Holanda</div>
}

export default LocationInput
