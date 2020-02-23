import React from 'react'
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
  const { address, setAddress } = useAddressContext()
  const countryRules = rules[address.country]

  if (!countryRules.locationSelect) {
    throw `The LocationSelect component is not applicable to this country: ${address.country}`
  }

  const { countryData, fields } = countryRules.locationSelect

  const getCompletedFieldsArray = () => {
    const takeWhile = (array: any[], f: (arg0: any) => boolean) => {
      const first = array.findIndex(f)
      return first === -1 ? array : array.slice(0, first)
    }
    const addressFields = fields.map(field => address[field.name])
    return takeWhile(addressFields, x => !x)
  }

  const completed = getCompletedFieldsArray()

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
            disabled: i > completed.length,
            options: Object.keys(currentOptions).map(name => {
              return { label: name, value: name }
            }),
            onChange: ({ target }: React.ChangeEvent) => {
              if (target instanceof HTMLSelectElement) {
                let newFields: { [key: string]: string | null } = {
                  [field.name as string]: target.value,
                }
                for (let j = i + 1; j < fields.length; ++j) {
                  newFields = { ...newFields, [fields[j].name as string]: null }
                }
                setAddress({
                  ...address,
                  ...newFields,
                })
              }
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
