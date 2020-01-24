import React from 'react'
import { Input } from 'vtex.styleguide'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { LineFragment, Fields } from './typings/countryRulesTypes.d'
import rules from './countries/rules'

interface Props {
  summary: LineFragment[][]
}

const AddressForm: StorefrontFunctionComponent<Props> = ({ summary }) => {
  const { address, setAddress } = useAddressContext()
  const fields = rules[address.country].fields

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
      ...(required && { required }),
    }
  }

  const parseLineFragment = (fragment: LineFragment) => {
    return address[fragment.name] != null ? (
      <span key={fragment.name} className="w-25 dib mh3">
        <Input {...getInputProps(fragment)} />
      </span>
    ) : null
  }

  const parseLine = (line: LineFragment[], index: number) => [
    ...line.map(parseLineFragment),
    <br className={'line' + (index + 1) + '-delimiter'} key={index} />,
  ]

  return (
    <div>
      <div>{summary.map(parseLine)}</div>
    </div>
  )
}

export default AddressForm
