import React from 'react'
import rules from './countries/rules'
import { useAddressContext } from 'vtex.address-context/AddressContext'

const LocationSelect: StorefrontFunctionComponent<{}> = ({}) => {
  const { address } = useAddressContext()
  const countryRules = rules[address.country]

  return <div>{countryRules ? <div>Hola</div> : <div>Chau</div>}</div>
}

export default LocationSelect
