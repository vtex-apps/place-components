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

const messages = defineMessages({
  country: {
    defaultMessage: '',
    id: 'place-components.label.country',
  },
  state: {
    defaultMessage: '',
    id: 'place-components.label.state',
  },
  city: {
    defaultMessage: '',
    id: 'place-components.label.city',
  },
  neighborhood: {
    defaultMessage: '',
    id: 'place-components.label.neighborhood',
  },
  streetRoadAvenue: {
    defaultMessage: '',
    id: 'place-components.label.streetRoadAvenue',
  },
  numberOption: {
    defaultMessage: '',
    id: 'place-components.label.numberOption',
  },
  complement: {
    defaultMessage: '',
    id: 'place-components.label.complement',
  },
  stateAbbreviation: {
    defaultMessage: '',
    id: 'place-components.label.stateAbbreviation',
  },
})

type LabelType = keyof (typeof messages)

const getSummaryFields = (summary: LineFragment[][]) => {
  let summaryFields = new Set()
  summary.forEach((line: LineFragment[]) => {
    line.forEach((fragment: LineFragment) => {
      summaryFields.add(fragment.name)
    })
  })
  return summaryFields
}

const AddressForm: StorefrontFunctionComponent<{}> = () => {
  const { address, setAddress } = useAddressContext()
  const [editing, setEditing] = useState(false)
  const { fields, display } = rules[address.country]
  const summary = display.extended as LineFragment[][]

  const [ignoredFields, setIgnoredFields] = useState(
    getSummaryFields(display.compact)
  )

  const hasWithoutNumberOption = (label: string) => {
    return label.length >= 6 && label.substr(label.length - 6) == 'Option'
  }

  const hasOptions = (field: OptionsField) => {
    return field.options
  }

  const parseLineFragment = (fragment: LineFragment) => {
    const field = fields[fragment.name as keyof Fields]
    if (!field) return null
    const labelName: LabelType = field.label as LabelType

    if (ignoredFields.has(fragment.name)) return null
    if (address[fragment.name] == null) return null
    if (hasWithoutNumberOption(labelName)) return <NumberOption showCheckbox />

    const getFieldProps = (fragment: LineFragment) => {
      const { maxLength, autoComplete, required } = field
      const label = <FormattedMessage {...messages[labelName]} />

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
          <FormattedMessage id={`place-components.error.fieldRequired`} />
        ),
      }
      const options = (field as OptionsField).options
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
        ...(required && address[fragment.name].length === 0 && fieldRequired),
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
    setIgnoredFields(getSummaryFields(display.minimal))
    setEditing(true)
  }

  const displayMode: keyof Display = editing ? 'minimal' : 'compact'

  return (
    <div>
      <PlaceDetails display={displayMode} />
      {!editing && (
        <ButtonPlain onClick={onEditButtonClick} title="edit">
          <FormattedMessage id="place-components.label.edit" />
        </ButtonPlain>
      )}
      <div>{summary.map(parseLine)}</div>
    </div>
  )
}

export default AddressForm
