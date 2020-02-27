import React from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import rules from './countries/rules'
import { Dropdown } from 'vtex.styleguide'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Address } from 'vtex.checkout-graphql'

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
  const { address, setAddress } = useAddressContext()
  const countryRules = rules[address.country]

  if (!countryRules.locationSelect) {
    throw `The country "${address.country}" is not applicable to the LocationSelect component`
  }

  const { countryData, fields } = countryRules.locationSelect

  const addressFields = fields.map(field => address[field.name])
  const firstMissingIdx = addressFields.findIndex(field => !field)
  const completedFields =
    firstMissingIdx === -1
      ? addressFields
      : addressFields.slice(0, firstMissingIdx)

  const getLocationSelects = () => {
    let locationSelects = []
    let currentOptions = countryData

    for (let i = 0; i < fields.length; ++i) {
      const field = fields[i]
      const value = address[field.name]

      locationSelects.push(
        <Dropdown
          {...{
            label: (
              <FormattedMessage
                {...messages[field.label as keyof typeof messages]}
              />
            ),
            disabled: i > completedFields.length,
            options: Object.keys(currentOptions).map(name => {
              return { label: name, value: name }
            }),
            onChange: ({
              target: { value },
            }: React.ChangeEvent<HTMLSelectElement>) => {
              let newFields: { [key: string]: string | null } = {
                [field.name as string]: value,
              }
              for (let j = i + 1; j < fields.length; ++j) {
                newFields = { ...newFields, [fields[j].name as string]: null }
              }
              setAddress((prevAddress: Address) => ({
                ...prevAddress,
                ...newFields,
              }))
            },
            placeholder: 'Select...',
            value,
          }}
        />
      )

      currentOptions = value ? currentOptions[value as keyof {}] : {}
    }

    return locationSelects
  }

  return <div>{getLocationSelects()}</div>
}

export default LocationSelect
