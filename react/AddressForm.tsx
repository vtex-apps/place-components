import React, { useState } from 'react'
import { Input, Checkbox, Dropdown } from 'vtex.styleguide'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import {
  LineFragment,
  Fields,
  OptionsField,
  Display,
} from './typings/countryRulesTypes.d'
import rules from './countries/rules'
import PlaceDetails from './PlaceDetails'
import { ButtonPlain } from 'vtex.styleguide'
import { FormattedMessage, defineMessages } from 'react-intl'

defineMessages({
  country: {
    defaultMessage: 'Country',
    id: 'place-components.label.country',
  },
  state: {
    defaultMessage: 'State',
    id: 'place-components.label.state',
  },
  city: {
    defaultMessage: 'City',
    id: 'place-components.label.city',
  },
  neighborhood: {
    defaultMessage: 'Neighborhood',
    id: 'place-components.label.neighborhood',
  },
  ['street-road-avenue']: {
    defaultMessage: 'Street/Road/Avenue',
    id: 'place-components.label.street-road-avenue',
  },
  ['number-option']: {
    defaultMessage: 'Number',
    id: 'place-components.label.number-option',
  },
  complement: {
    defaultMessage: 'Complement',
    id: 'place-components.label.complement',
  },
  stateAbbreviation: {
    defaultMessage: 'State',
    id: 'place-components.label.stateAbbreviation',
  },
})

const AddressForm: StorefrontFunctionComponent<{}> = () => {
  const { address, setAddress } = useAddressContext()
  const [editing, setEditing] = useState<boolean>(false)
  const fields = rules[address.country].fields
  const summaries = rules[address.country].display
  const summary = summaries['extended'] as LineFragment[][]

  const getSummaryFields = (summary: LineFragment[][]) => {
    let summaryFields = new Set()
    summary.forEach((line: LineFragment[]) => {
      line.forEach((fragment: LineFragment) => {
        summaryFields.add(fragment.name)
      })
    })
    return summaryFields
  }

  const [ignoredFields, setIgnoredFields] = useState(
    getSummaryFields(summaries['compact'])
  )

  const getInputProps = (fragment: LineFragment) => {
    const field = fields[fragment.name as keyof Fields]
    const maxLength = field && field.maxLength ? field.maxLength : null
    const autoComplete = field && field.autoComplete ? field.autoComplete : null
    const required = field && field.required ? field.required : null
    const labelName = field && field.label ? field.label : null
    const label = (
      <FormattedMessage id={`place-components.label.${labelName}`} />
    )

    return {
      label: label,
      value: address[fragment.name],
      onChange: (event: React.ChangeEvent) => {
        if (event.target instanceof HTMLInputElement) {
          const newAddress = {
            ...address,
            [fragment.name]: event.target.value,
          }
          setAddress(newAddress)
        }
      },
      ...(maxLength && { maxLength }),
      ...(autoComplete && { autoComplete }),
      ...(required &&
        address[fragment.name].length == 0 && {
          errorMessage: (
            <FormattedMessage id={`place-components.error.field-required`} />
          ),
        }),
    }
  }

  const getDropdownProps = (fragment: LineFragment) => {
    const field = fields[fragment.name as keyof Fields]
    const required = field && field.required ? field.required : null
    const labelName = field && field.label ? field.label : null
    const options =
      field && (field as OptionsField).options
        ? (field as OptionsField).options
        : null
    const label = (
      <FormattedMessage id={`place-components.label.${labelName}`} />
    )

    return {
      label: label,
      value: address[fragment.name],
      onChange: (event: React.ChangeEvent) => {
        if (event.target instanceof HTMLSelectElement) {
          const newAddress = {
            ...address,
            [fragment.name]: event.target.value,
          }
          setAddress(newAddress)
        }
      },
      ...(required &&
        address[fragment.name].length == 0 && {
          errorMessage: (
            <FormattedMessage id={`place-components.error.field-required`} />
          ),
        }),
      options: options,
    }
  }

  const numberHasWithoutOption = (label: string | null) => {
    return (
      label && label.length >= 7 && label.substr(label.length - 7) == '-option'
    )
  }

  const hasOptions = (field: OptionsField) => {
    return field && field.options
  }

  const parseLineFragment = (fragment: LineFragment) => {
    const field = fields[fragment.name as keyof Fields]
    const labelName = field && field.label ? field.label : null
    const fragmentName = fragment.name
    return address[fragmentName] != null && !ignoredFields.has(fragmentName) ? (
      <span>
        <span key={fragmentName} className="w-25 dib mh3">
          {hasOptions(field as OptionsField) ? (
            <Dropdown {...getDropdownProps(fragment)} />
          ) : (
            <Input {...getInputProps(fragment)} />
          )}
        </span>
        {numberHasWithoutOption(labelName) && (
          <span className="w-25 dib mh3">
            <Checkbox checked={false} label="Without number" />
          </span>
        )}
      </span>
    ) : null
  }

  const parseLine = (line: LineFragment[], index: number) => [
    ...line.map(parseLineFragment),
    <br key={index} />,
  ]

  const onEditButtonClick = () => {
    setIgnoredFields(getSummaryFields(summaries['minimal']))
    setEditing(true)
  }

  const displayMode: keyof Display = editing ? 'minimal' : 'compact'

  return (
    <div>
      <PlaceDetails display={displayMode} />
      {!editing && <ButtonPlain onClick={onEditButtonClick}>Edit</ButtonPlain>}
      <div>{summary.map(parseLine)}</div>
    </div>
  )
}

export default AddressForm
