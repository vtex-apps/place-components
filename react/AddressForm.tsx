import React, { useState } from 'react'
import { Input, Dropdown, ButtonPlain } from 'vtex.styleguide'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import {
  LineFragment,
  Fields,
  OptionsField,
  Display,
} from './typings/countryRulesTypes.d'
import rules from './countries/rules'
import PlaceDetails from './PlaceDetails'
import { FormattedMessage, defineMessages } from 'react-intl'
import NumberOption from './components/NumberOption'

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
  const { fields, display } = rules[address.country]
  const summary = display['extended'] as LineFragment[][]

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
    getSummaryFields(display['compact'])
  )

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

    if (ignoredFields.has(fragment.name)) return null
    if (address[fragment.name] == null) return null
    if (numberHasWithoutOption(labelName)) return <NumberOption showCheckbox />

    const getFieldProps = (fragment: LineFragment) => {
      const maxLength = field && field.maxLength ? field.maxLength : null
      const autoComplete =
        field && field.autoComplete ? field.autoComplete : null
      const required = field && field.required ? field.required : null
      const label = (
        <FormattedMessage id={`place-components.label.${labelName}`} />
      )
      const onChange = (event: React.ChangeEvent) => {
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLSelectElement
        ) {
          setAddress({
            ...address,
            [fragment.name]: event.target.value,
          })
        }
      }
      const fieldRequired = {
        errorMessage: (
          <FormattedMessage id={`place-components.error.field-required`} />
        ),
      }
      const options =
        field && (field as OptionsField).options
          ? (field as OptionsField).options
          : null
      const value = address[fragment.name]

      return {
        label,
        value,
        onChange,
        options,
        ...(maxLength && { maxLength }),
        ...(autoComplete && { autoComplete }),
        ...(required && address[fragment.name].length == 0 && fieldRequired),
      }
    }

    return (
      <span key={fragment.name} className="w-25 dib mh3">
        {hasOptions(field as OptionsField) ? (
          <Dropdown {...getFieldProps(fragment)} />
        ) : (
          <Input {...getFieldProps(fragment)} />
        )}
      </span>
    )
  }

  const parseLine = (line: LineFragment[], index: number) => [
    ...line.map(parseLineFragment),
    <br key={index} />,
  ]

  const onEditButtonClick = () => {
    setIgnoredFields(getSummaryFields(display['minimal']))
    setEditing(true)
  }

  const displayMode: keyof Display = editing ? 'minimal' : 'compact'

  return (
    <div>
      <PlaceDetails display={displayMode} />
      {!editing && (
        <ButtonPlain onClick={onEditButtonClick}>
          <FormattedMessage id="place-components.label.edit" />
        </ButtonPlain>
      )}
      <div>{summary.map(parseLine)}</div>
    </div>
  )
}

export default AddressForm
