import React, { useState } from 'react'
import { Input, Dropdown, ButtonPlain } from 'vtex.styleguide'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import {
  LineFragment,
  Fields,
  Field,
  Display,
} from './typings/countryRulesTypes.d'
import rules from './countries/rules'
import PlaceDetails from './PlaceDetails'
import { FormattedMessage, useIntl, defineMessages } from 'react-intl'
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
  fieldRequired: {
    defaultMessage: '',
    id: 'place-components.error.fieldRequired',
  },
  edit: {
    defaultMessage: '',
    id: 'place-components.label.edit',
  },
})

const getSummaryFields = (summary: LineFragment[][]) => {
  let summaryFields = new Set()
  summary.forEach((line: LineFragment[]) => {
    line.forEach((fragment: LineFragment) => {
      summaryFields.add(fragment.name)
    })
  })
  return summaryFields
}

const AddressForm: StorefrontFunctionComponent = () => {
  const intl = useIntl()
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

  const getFieldProps = (field: Field, fragment: LineFragment) => {
    const { maxLength, autoComplete, required, label, options } = field

    const onChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setAddress({
        ...address,
        [fragment.name]: event.target.value,
      })
    }
    const fieldRequired = {
      errorMessage: intl.formatMessage(messages.fieldRequired),
    }
    const value = address[fragment.name]

    return {
      label: <FormattedMessage {...messages[label as keyof typeof messages]} />,
      value,
      onChange,
      ...(options && { options }),
      ...(maxLength && { maxLength }),
      ...(autoComplete && { autoComplete }),
      ...(required && address[fragment.name].length === 0 && fieldRequired),
    }
  }

  const parseLineFragment = (fragment: LineFragment) => {
    const field = fields[fragment.name as keyof Fields]
    if (
      !field ||
      ignoredFields.has(fragment.name) ||
      address[fragment.name] == null
    )
      return null

    if (hasWithoutNumberOption(field.label))
      return <NumberOption showCheckbox />

    return (
      <span key={fragment.name} className="w-25 dib mh3">
        {field.options ? (
          <Dropdown {...getFieldProps(field, fragment)} />
        ) : (
          <Input {...getFieldProps(field, fragment)} />
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
          <FormattedMessage {...messages.edit} />
        </ButtonPlain>
      )}
      <div>{summary.map(parseLine)}</div>
    </div>
  )
}

export default AddressForm
