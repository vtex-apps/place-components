import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Address } from 'vtex.checkout-graphql'

interface Context {
  countries: string[]
  address: Address
  setAddress: (_: Event) => void
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
  const state = {
    countries: countries,
    address: address,
    setAddress: () => {},
  }

  return (
    <AddressContextContext.Provider value={state}>
      {children}
    </AddressContextContext.Provider>
  )
}

export const useAddressContext = () => useContext(AddressContextContext)

export default { AddressContextProvider, useAddressContext }
