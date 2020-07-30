import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Address } from 'vtex.checkout-graphql'
import { AddressRules } from 'vtex.address-context/types'

interface Context {
  countries: string[]
  address: Address
  setAddress: (_: Address) => void
}

interface AddressContextProps {
  children: ReactNode
  address: Address
  countries: string[]
  rules: AddressRules
}

const AddressContextContext = createContext<Context | undefined>(undefined)

export const AddressContextProvider = ({
  children,
  address,
  countries,
  rules,
}: AddressContextProps) => {
  const [localAddress, setLocalAddress] = useState(address)
  const [localRule, setLocalRule] = useState(rules)

  const state = {
    countries,
    address: localAddress,
    setAddress: setLocalAddress,
    rule: localRule,
    setRule: setLocalRule,
  }

  return (
    <AddressContextContext.Provider value={state}>
      {children}
    </AddressContextContext.Provider>
  )
}

export const useAddressContext = () => useContext(AddressContextContext)

export default { AddressContextProvider, useAddressContext }
