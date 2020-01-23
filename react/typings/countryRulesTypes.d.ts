import { Address } from 'vtex.checkout-graphql'

export interface LineFragment {
  name: keyof Address
  delimiter?: string
  delimiterAfter?: string
}
