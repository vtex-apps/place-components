import React, { useState } from 'react'
import { Input } from 'vtex.styleguide'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { LineFragment, Fields, Display } from './typings/countryRulesTypes.d'
import rules from './countries/rules'
import PlaceDetails from './PlaceDetails'
import { ButtonPlain } from 'vtex.styleguide'

const AddressForm: StorefrontFunctionComponent<{}> = () => {
  const { address, setAddress } = useAddressContext()
  const [ editing, setEditing ] = useState<boolean>(false)
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

  const [ ignoredFields, setIgnoredFields ] = useState(getSummaryFields(summaries['compact']))

  const getInputProps = (fragment: LineFragment) => {
    const field = fields.hasOwnProperty(fragment.name)
      ? fields[fragment.name as keyof Fields]
      : null
    const maxLength = field?.maxLength
    const autoComplete = field?.autoComplete
    const required = field?.required
    const label = field?.label

    return {
      placeholder: fragment.name,
      label: label || fragment.name,
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
      ...(required && address[fragment.name].length == 0 && { errorMessage: "This field is required" }),
    }
  }

  const parseLineFragment = (fragment: LineFragment) => {
    return address[fragment.name] != null && !ignoredFields.has(fragment.name) ? (
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
