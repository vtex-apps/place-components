import React from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { Dropdown } from 'vtex.styleguide'
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  InjectedIntlProps,
} from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

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

interface Option {
  label: string
  value: string
}

const sortOptionsByLabel = (options: Option[]) => {
  return options
    .slice()
    .sort((a: Option, b: Option) => a.label.localeCompare(b.label))
}

const LocationCountry: StorefrontFunctionComponent<{} & InjectedIntlProps> = ({
  intl,
}) => {
  const { address, setAddress, countries } = useAddressContext()
  const {
    culture: { country: storeCountry },
  } = useRuntime()
  let { country } = address

  console.log(storeCountry)

  if (!country) {
    /* Try to get by saved addresses in account */

    /* Try to get by IP */

    /* Try to get by store config */

    country = storeCountry
  }

  const options = sortOptionsByLabel(
    countries.map((name: string) => {
      return {
        label: intl.formatMessage(messages[name as keyof (typeof messages)]),
        value: name,
      }
    })
  )

  const dropdownProps = {
    label: <FormattedMessage id="place-components.label.country" />,
    value: country,
    placeholder: 'Select...',
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
    options,
  }

  return <Dropdown {...dropdownProps}></Dropdown>
}

export default injectIntl(LocationCountry)