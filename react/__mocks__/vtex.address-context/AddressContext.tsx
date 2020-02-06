import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Address } from 'vtex.checkout-graphql'

interface Context {
  countries: string[]
  address: Address
  setAddress: (_: Address) => void
}

interface AddressContextProps {
  children: ReactNode
  address: Address
  countries: string[]
}

const AddressContextContext = createContext<Context | undefined>(undefined)

export const AddressContextProvider = ({
  children,
  address,
  countries,
}: AddressContextProps) => {
  const [localAddress, setLocalAddress] = useState(address)

  const state = {
    countries: countries,
    address: localAddress,
    setAddress: setLocalAddress,
  }

  return (
    <AddressContextContext.Provider value={state}>
      {children}
    </AddressContextContext.Provider>
  )
}

export const useAddressContext = () => useContext(AddressContextContext)

export default { AddressContextProvider, useAddressContext }
