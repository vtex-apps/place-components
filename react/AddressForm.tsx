import React, { useState } from 'react'
import { Input, Dropdown, ButtonPlain } from 'vtex.styleguide'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import {
  LineFragment,
  Fields,
  Field,
  Display,
} from './typings/countryRulesTypes.d'
import rules, { styleRules } from './countries/rules'
import PlaceDetails from './PlaceDetails'
import { FormattedMessage, useIntl, defineMessages } from 'react-intl'
import NumberOption from './components/NumberOption'
import { Address } from 'vtex.checkout-graphql'

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

    const onChange = ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setAddress((prevAddress: Address) => ({
        ...prevAddress,
        [fragment.name]: value,
      }))
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
    ) {
      return null
    }

    const style = styleRules[field.label]

    let fragmentElement

    if (hasWithoutNumberOption(field.label)) {
      fragmentElement = <NumberOption showCheckbox />
    } else if (field.options) {
      fragmentElement = <Dropdown {...getFieldProps(field, fragment)} />
    } else {
      fragmentElement = <Input {...getFieldProps(field, fragment)} />
    }

    return (
      <div className="flex-auto mb5" style={style as React.CSSProperties}>
        {fragmentElement}
      </div>
    )
  }

  const parseLine = (line: LineFragment[], index: number) => [
    <div className="flex flex-wrap" key={index}>
      {line.map(parseLineFragment)}
    </div>,
  ]

  const onEditButtonClick = () => {
    setIgnoredFields(getSummaryFields(display.minimal))
    setEditing(true)
  }

  const displayMode: keyof Display = editing ? 'minimal' : 'compact'

  return (
    <div>
      <div className="mb6">
        <PlaceDetails display={displayMode} />
        {!editing && (
          <ButtonPlain onClick={onEditButtonClick} title="edit">
            <FormattedMessage {...messages.edit} />
          </ButtonPlain>
        )}
      </div>
      <div>{summary.map(parseLine)}</div>
    </div>
  )
}

export default AddressForm
