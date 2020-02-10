import React from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { Dropdown } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

const LocationCountry: StorefrontFunctionComponent<{}> = () => {
  const { address, setAddress, countries } = useAddressContext()
  const { country } = address
  console.log(country)
  console.log(address)
  console.log(countries)
  console.log(setAddress)

  const dropdownProps = {
    label: <FormattedMessage id="place-components.label.country" />,
    value: country,
    placeholder: 'Select...',
    options: countries.map((name: string) => {
      return { label: name, value: name }
    }),
    onChange: ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
      setAddress({
        ...address,
        city: null,
        complement: null,
        country: target.value,
        geoCoordinates: null,
        neighborhood: null,
        number: null,
        postalCode: null,
        state: null,
        street: null,
      })
    },
  }

  return <Dropdown {...dropdownProps}></Dropdown>
}

export default LocationCountry
