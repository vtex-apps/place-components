import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ComponentProps,
} from 'react'
import {
  AddressContextProvider as AddressContextProviderOriginal,
  useAddressContext as useAddressContextOriginal,
} from 'vtex.address-context/AddressContext'

import { validateAddress } from './Utils'

type Context = ReturnType<typeof useAddressContextOriginal>

const AddressContext = createContext<Context | undefined>(undefined)

type AddressContextProps = ComponentProps<typeof AddressContextProviderOriginal>

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
    () =>
      ({
        countries,
        address: localAddress,
        setAddress: setLocalAddress,
        rules,
        isValid,
        invalidFields,
      } as Context),
    [countries, localAddress, rules, isValid, invalidFields]
  )

  return (
    <AddressContext.Provider value={state}>{children}</AddressContext.Provider>
  )
}

export const useAddressContext = () => {
  const context = useContext(AddressContext)
  if (context === undefined) {
    throw new Error(
      'useAddressContext must be used within an AddressContextProvider'
    )
  }

  return context
}

export default { AddressContextProvider, useAddressContext }
