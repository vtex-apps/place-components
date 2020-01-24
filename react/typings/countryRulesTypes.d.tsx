import { Address } from 'vtex.checkout-graphql'

export interface LineFragment {
  name: keyof Address
  delimiter?: string
  delimiterAfter?: string
}

interface Field {
  hidden?: boolean
  maxLength?: number
  label?: string
  size?: string
  required?: boolean
  autoComplete?: string
}

interface OptionsField extends Field {
  /* I would like to clean the fields with options  */
  optionsCaption?: string
  optionsPairs?: { label: string; value: string }[]
  options?: string[]
}

interface ReceiverField extends Field {
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
  state?: OptionsField
  city?: Field
  receiverName?: ReceiverField
}

export interface CountryRules {
  fields: Fields
  display: Display
}
