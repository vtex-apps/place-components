import React from 'react'
import { Address } from 'vtex.checkout-graphql'
import { Input } from 'vtex.styleguide'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { LineFragment } from './typings/countryRulesTypes.d'

interface Props {
  address: Address
  summary: LineFragment[][]
}

const AddressForm: StorefrontFunctionComponent<Props> = ({
  address,
  summary,
}) => {
  const { setAddress } = useAddressContext()

  const parseLineFragment = (fragment: LineFragment) => {
    return address[fragment.name] != null ? (
      <span key={fragment.name} className="w-25 dib mh3">
        <Input
          placeholder={fragment.name}
          label={fragment.name}
          value={address[fragment.name]}
          onChange={(event: any) => {
            const newAddress = {
              ...address,
              [fragment.name]: event.target.value,
            }
            setAddress(newAddress)
          }}
        />
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
