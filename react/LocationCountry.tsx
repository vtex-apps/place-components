import React, { useState, useEffect } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { Listbox } from 'vtex.checkout-components'
import { CountryFlag } from 'vtex.country-flags'
import { defineMessages, useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

const {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} = Listbox

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

const renderCountryFlagWithName = ({
  country,
  name,
}: {
  country: string
  name: string
}) => (
  <>
    <CountryFlag iso3={country} />
    <span className="dib ml3">{name}</span>
  </>
)

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

  // Do not render anything if we only have 1 country or none.
  if (countries.length <= 1) {
    return null
  }

  return (
    <ListboxInput
      translate={undefined}
      label={intl.formatMessage({ id: 'place-components.label.country' })}
      value={country}
      onChange={setCountry}
    >
      <ListboxButton>
        {({ label }) =>
          renderCountryFlagWithName({
            country,
            name: label,
          })
        }
      </ListboxButton>
      <ListboxPopover translate={undefined}>
        <ListboxList>
          {countries.map(countryCode => {
            const name =
              countryCode in messages
                ? intl.formatMessage(
                    messages[countryCode as keyof typeof messages]
                  )
                : countryCode

            return (
              <ListboxOption value={countryCode} label={name} key={countryCode}>
                {renderCountryFlagWithName({
                  country: countryCode,
                  name,
                })}
              </ListboxOption>
            )
          })}
        </ListboxList>
      </ListboxPopover>
    </ListboxInput>
  )
}

export default LocationCountry
