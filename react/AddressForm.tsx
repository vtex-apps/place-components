import React from 'react'
import { Address } from 'vtex.checkout-graphql'
import { Input } from 'vtex.styleguide'
import { useAddressContext } from 'vtex.address-context/AddressContext'

export interface LineFragment {
  name: keyof Address
  delimiter?: string
  delimiterAfter?: string
}

interface Props {
  address: Address
  summary: LineFragment[][]
}

const AddressForm: StorefrontFunctionComponent<Props> = ({
  address,
  summary,
}) => {
  const { setAddress } = useAddressContext()

  const parseLineFragment = (
    fragment: LineFragment
    //    index: number,
    //    line: LineFragment[]
  ) => {
    return address[fragment.name] ? (
      <span key={fragment.name} className="w-25 dib mh3">
        <Input
          placeholder={fragment.name}
          label={fragment.name}
          value={address[fragment.name]}
          onChange={(event: any) => {
            let newAddress = address
            newAddress[fragment.name] = event.target.value
            console.log(event.target.value)
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

  return <div>{summary.map(parseLine)}</div>
}

export default AddressForm
