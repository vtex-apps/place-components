import { Address } from 'vtex.checkout-graphql'

export interface LineFragment {
  name: keyof Address
  delimiter?: string
  delimiterAfter?: string
}

export interface Field {
  label: string
  hidden?: boolean
  maxLength?: number
  size?: string
  required?: boolean
  autoComplete?: string
  optionsCaption?: string
  options?: { label: string; value: string }[]
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
  fields: ({ name: string; label: string })[]
}

export interface CountryRules {
  fields: Fields
  display: Display
  locationSelect?: LocationSelect
}
