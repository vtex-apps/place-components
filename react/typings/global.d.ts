import { Address } from 'vtex.checkout-graphql'

declare global {
  interface LineFragment {
    name: keyof Fields
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
    /**
     * Optional mask to format the field for display.
     *
     * E.g.: the mask "99999-999" for Brazil postal code, it would
     * format the value "22250040" to "22250-040".
     */
    mask?: string
  }

  interface Display {
    minimal: LineFragment[][]
    compact: LineFragment[][]
    extended: LineFragment[][]
  }

  interface PostalCodeField extends Field {
    /**
     * Link to the country postal code service to help the user
     * retrieve the postal code for their address.
     */
    forgottenURL?: string
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
    postalCode?: PostalCodeField
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
