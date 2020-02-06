import React, { useState } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import rules from './countries/rules'
import { Dropdown } from 'vtex.styleguide'
import { FormattedMessage, defineMessages } from 'react-intl'

const messages = defineMessages({
  province: {
    defaultMessage: '',
    id: 'place-components.label.province',
  },
  city: {
    defaultMessage: '',
    id: 'place-components.label.city',
  },
  department: {
    defaultMessage: '',
    id: 'place-components.label.department',
  },
  region: {
    defaultMessage: '',
    id: 'place-components.label.region',
  },
  community: {
    defaultMessage: '',
    id: 'place-components.label.community',
  },
  municipality: {
    defaultMessage: '',
    id: 'place-components.label.municipality',
  },
  district: {
    defaultMessage: '',
    id: 'place-components.label.district',
  },
  state: {
    defaultMessage: '',
    id: 'place-components.label.state',
  },
  locality: {
    defaultMessage: '',
    id: 'place-components.label.locality',
  },
})

const LocationSelect: StorefrontFunctionComponent<{}> = () => {
  const { address } = useAddressContext()
  const countryRules = rules[address.country]
  if (!countryRules.locationSelect) {
    return (
      <div>
        The LocationSelect component is not applicable to this country :(
      </div>
    )
  }
  const { countryData, fields } = countryRules.locationSelect
  const [completed, setCompleted] = useState([])

  console.log(countryData)
  console.log(fields)
  console.log(setCompleted)

  return (
    <div>
      {fields.map((field: any, index: number) => {
        const getDropdownOptions = () => {
          return Object.keys(countryData).map(name => {
            return { value: name, label: name }
          })
        }

        const getDropdownProps = () => {
          return {
            label: (
              <FormattedMessage
                {...messages[field.label as keyof (typeof messages)]}
              />
            ),
            disabled: index > completed.length,
            options: index == completed.length ? getDropdownOptions() : [],
          }
        }

        return <Dropdown {...getDropdownProps()} key={index} />
      })}
    </div>
  )
}

export default LocationSelect
