import React from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { Dropdown } from 'vtex.styleguide'
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  InjectedIntlProps,
} from 'react-intl'

const messages = defineMessages({
  ARG: {
    defaultMessage: '',
    id: 'place-components.label.ARG',
  },
  BRA: {
    defaultMessage: '',
    id: 'place-components.label.BRA',
  },
  BOL: {
    defaultMessage: '',
    id: 'place-components.label.BOL',
  },
  KOR: {
    defaultMessage: '',
    id: 'place-components.label.KOR',
  },
})

const LocationCountry: StorefrontFunctionComponent<{} & InjectedIntlProps> = ({
  intl,
}) => {
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
      return {
        label: intl.formatMessage(messages[name as keyof (typeof messages)]),
        value: name,
      }
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

export default injectIntl(LocationCountry)
