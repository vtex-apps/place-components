import React, { useState, useEffect } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { Dropdown } from 'vtex.styleguide'
import { FormattedMessage, defineMessages, useIntl } from 'react-intl'
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

const LocationCountry: React.FC = () => {
  const intl = useIntl()
  const { address, setAddress, countries } = useAddressContext()
  const {
    culture: { country: storeCountry },
  } = useRuntime()
  const [country, setCountry] = useState(() => {
    if (address?.country) {
      return address.country
    }

    /* should try to get by saved addresses in account */

    /* should try to get by IP */

    /* else, try to get by store config */
    return storeCountry
  })

  if (country && countries && !countries.includes(country)) {
    throw new Error(
      `The country "${country}" doesn't belong to the country list, can't render LocationCountry`
    )
  }

  const options = sortOptionsByLabel(
    countries.map((name: string) => {
      return {
        label: intl.formatMessage(messages[name as keyof typeof messages]),
        value: name,
      }
    })
  )

  useEffect(() => {
    setAddress(prevAddress => ({
      ...prevAddress,
      country,
      // reset all other fields related
      // to the country
      city: null,
      complement: null,
      geoCoordinates: null,
      neighborhood: null,
      number: null,
      postalCode: null,
      state: null,
      street: null,
    }))
  }, [country, setAddress])

  return (
    <Dropdown
      label={<FormattedMessage id="place-components.label.country" />}
      value={country}
      placeholder="Select..."
      onChange={({ target: { value } }) => {
        setCountry(value)
      }}
      options={options}
    />
  )
}

export default LocationCountry
