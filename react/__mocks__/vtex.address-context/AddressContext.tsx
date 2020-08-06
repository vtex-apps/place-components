import React, { createContext, useContext, useState, useMemo } from 'react'
import { Address } from 'vtex.checkout-graphql'
import { AddressRules, AddressFields } from 'vtex.address-context/react/types'

import { validateAddress } from './Utils'

type AddressUpdate = Address | ((prevAddress: Address) => Address)

interface Context {
  countries: string[]
  address: Address
  setAddress: (address: AddressUpdate) => void
  rules: AddressRules
  isValid: boolean
  invalidFields: AddressFields[]
}

interface AddressContextProps {
  address: Address
  countries: string[]
  rules: AddressRules
}

const AddressContextContext = createContext<Context | undefined>(undefined)

export const AddressContextProvider: React.FC<AddressContextProps> = ({
  children,
  address,
  countries,
  rules = {},
}) => {
  const [localAddress, setLocalAddress] = useState(address)

  const { invalidFields, isValid } = useMemo(
    () => validateAddress(localAddress, rules),
    [localAddress, rules]
  )

  const state = useMemo(
    () => ({
      countries,
      address: localAddress,
      setAddress: setLocalAddress,
      rules,
      isValid,
      invalidFields,
    }),
    [countries, localAddress, rules, isValid, invalidFields]
  )

  return (
    <AddressContextContext.Provider value={state}>
      {children}
    </AddressContextContext.Provider>
  )
}

export const useAddressContext = () => {
  const context = useContext(AddressContextContext)
  if (context === undefined) {
    throw new Error(
      'useAddressContext must be used within an AddressContextProvider'
    )
  }

  return context
}

export default { AddressContextProvider, useAddressContext }
