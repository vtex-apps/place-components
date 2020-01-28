import React, { useState } from 'react'
import { Input } from 'vtex.styleguide'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { LineFragment, Fields, Display } from './typings/countryRulesTypes.d'
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
    const field = fields.hasOwnProperty(fragment.name)
      ? fields[fragment.name as keyof Fields]
      : null
    const maxLength = field && field.maxLength ? field.maxLength : null
    const autoComplete = field && field.autoComplete ? field.autoComplete : null
    const required = field && field.required ? field.required : null
    const labelName = field && field.label ? field.label : null
    const label = (
      <FormattedMessage id={`place-components.label.${labelName}`} />
    )

    return {
      placeholder: fragment.name,
      label: label,
      value: address[fragment.name],
      onChange: (event: any) => {
        const newAddress = {
          ...address,
          [fragment.name]: event.target.value,
        }
        setAddress(newAddress)
      },
      ...(maxLength && { maxLength }),
      ...(autoComplete && { autoComplete }),
      ...(required &&
        address[fragment.name].length == 0 && {
          errorMessage: 'This field is required',
        }),
    }
  }

  const parseLineFragment = (fragment: LineFragment) => {
    return address[fragment.name] != null &&
      !ignoredFields.has(fragment.name) ? (
      <span key={fragment.name} className="w-25 dib mh3">
        <Input {...getInputProps(fragment)} />
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

  return (
    <div>
      <PlaceDetails
        display={(editing ? 'minimal' : 'compact') as keyof Display}
      />
      {!editing && <ButtonPlain onClick={onEditButtonClick}>Edit</ButtonPlain>}
      <div>{summary.map(parseLine)}</div>
    </div>
  )
}

export default AddressForm
