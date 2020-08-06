import { Address } from 'vtex.checkout-graphql'
import {
  AddressRules,
  AddressFields,
  Field,
} from 'vtex.address-context/react/types'

export const validateAddress = (
  address: Address | null | undefined,
  rules: AddressRules
) => {
  if (!address?.country || !rules[address.country]) {
    return {
      isValid: false,
      invalidFields: [],
    }
  }

  const invalidFields = (Object.entries(rules[address.country].fields) as Array<
    [AddressFields, Field]
  >)
    .filter(([field, fieldSchema]) => {
      const fieldValue = address[field]

      if (fieldSchema.required && !fieldValue) {
        return true
      }

      if (
        fieldSchema.maxLength &&
        fieldValue &&
        (fieldValue as string).length > fieldSchema.maxLength
      ) {
        return true
      }

      return false
    })
    .map(([field]) => field)

  return {
    isValid: invalidFields.length === 0,
    invalidFields,
  }
}

export default { validateAddress }
