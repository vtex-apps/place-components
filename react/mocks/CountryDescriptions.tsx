export interface LineFragment {
  name: keyof CheckoutAddress
  delimiter?: string
  delimiterAfter?: string
}

export type Line = LineFragment[]

export type Summary = Line[]

export interface CountryDescription {
  name: string
  summary: Summary
}

export const countryDescriptions: CountryDescription[] = [
  {
    name: 'ARG',
    summary: [
      [{ name: 'street' }, { delimiter: ' ', name: 'number' }],
      [{ name: 'complement' }],
      [{ name: 'postalCode' }],
      [{ name: 'city' }, { delimiter: ', ', name: 'state' }],
    ],
  },
  {
    name: 'BRA',
    summary: [
      [
        { name: 'street' },
        { delimiter: ' ', name: 'number' },
        { delimiter: ', ', name: 'complement' },
      ],
      [
        { name: 'neighborhood', delimiterAfter: ' - ' },
        { name: 'city' },
        { delimiter: ' - ', name: 'state' },
      ],
      [{ name: 'postalCode' }],
    ],
  },
  {
    name: 'KOR',
    summary: [
      [{ name: 'street' }, { delimiter: ', ', name: 'complement' }],
      [
        { name: 'city' },
        { delimiter: ', ', name: 'state' },
        { delimiter: ' ', name: 'postalCode' },
      ],
    ],
  },
]

export const sampleAddress: CheckoutAddress = {
  street: 'Av. Belgrano',
  number: '2248',
  complement: '',
  postalCode: '2000',
  city: 'Rosario',
  state: 'Santa Fe',
  addressId: '',
  addressType: '',
  country: 'Argentina',
  geoCoordinates: [],
  neighborhood: null,
  receiverName: null,
  reference: null,
}

export interface CheckoutAddress {
  addressId: string
  addressType: string
  city: string | null
  complement: string | null
  country: string
  geoCoordinates: number[]
  neighborhood: string | null
  number: string | null
  postalCode: string | null
  receiverName: string | null
  reference: string | null
  state: string | null
  street: string | null
}
