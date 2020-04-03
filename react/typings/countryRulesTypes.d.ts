import { Address } from 'vtex.checkout-graphql'

export interface LineFragment {
  name: AddressFields
  delimiter?: string
  delimiterAfter?: string
}

type AddressFields = keyof Omit<Address, '__typename'>

export interface Field {
  label: string
  name?: AddressFields
  hidden?: boolean
  maxLength?: number
  size?: string
  required?: boolean
  autoComplete?: string
  optionsCaption?: string
  options?: Array<{ label: string; value: string }>
  elementName?: string
}

export interface Display {
  minimal: LineFragment[][]
  compact: LineFragment[][]
  extended: LineFragment[][]
}

export interface Fields {
  country?: Field
  street?: Field
  number?: Field
  complement?: Field
  reference?: Field
  neighborhood?: Field
  state?: Field
  city?: Field
  receiverName?: Field
}

export interface LocationSelect {
  countryData: object
  fields: Field[]
}

export interface CountryRules {
  fields: Fields
  display: Display
  locationSelect?: LocationSelect
}
