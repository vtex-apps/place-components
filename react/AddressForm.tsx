import React from 'react'
import { Address } from 'vtex.checkout-graphql'
import { Input, Button } from 'vtex.styleguide'
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
  const { setAddress, text, setText } = useAddressContext()

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
            const newAddress = {
              ...address,
              [fragment.name]: event.target.value,
            }
            setAddress(newAddress)
            console.log('PRINTING NEW ADDRESS AND EVENT TARGET VALUE')
            console.log(newAddress)
            console.log(event.target.value)
            console.log('---')
          }}
          /*
          onChange={(event: any) => {
            const newAddress = address
            newAddress[fragment.name] = event.target.value
            setAddress(newAddress)
            console.log('PRINTING NEW ADDRESS AND EVENT TARGET VALUE')
            console.log(newAddress)
            console.log(event.target.value)
            console.log('---')
          }}*/
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
      <p>Texto is: {text}</p>
      <Button onClick={() => setText('wawawa')}>Click</Button>
      <div>{summary.map(parseLine)}</div>
    </div>
  )
}

export default AddressForm
