import { Address } from 'vtex.checkout-graphql'
import { LineFragment } from '../typings/placeComponentsTypes'

export interface CountryDescription {
  name: string
  summary: LineFragment[][]
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

export const sampleAddress: Address = {
  street: 'Av. Belgrano',
  number: '2248',
  complement: '',
  postalCode: '2000',
  city: 'Rosario',
  state: 'Santa Fe',
  addressId: '',
  addressType: null,
  country: 'Argentina',
  geoCoordinates: [],
  neighborhood: 'Las Delicias',
  receiverName: null,
  reference: null,
}
