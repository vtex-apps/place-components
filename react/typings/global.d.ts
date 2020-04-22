import { Address } from 'vtex.checkout-graphql'

declare global {
  interface LineFragment {
    name: AddressFields
    delimiter?: string
    delimiterAfter?: string
  }

  type AddressFields = keyof Omit<Address, '__typename' | 'geoCoordinates'>

  interface Field {
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

  interface Display {
    minimal: LineFragment[][]
    compact: LineFragment[][]
    extended: LineFragment[][]
  }

  interface Fields {
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

  interface LocationSelect {
    countryData: object
    fields: Field[]
  }

  interface CountryRules {
    fields: Fields
    display: Display
    locationSelect?: LocationSelect
  }
}
