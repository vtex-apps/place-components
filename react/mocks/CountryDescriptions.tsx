import { Address } from 'vtex.checkout-graphql'
import { LineFragment } from '../typings/countryRulesTypes'

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

export const sampleAddress1: Address = {
  street: 'Rua Afonso Camargo',
  number: '805',
  complement: '',
  postalCode: '85070-200',
  city: 'Guarapuava',
  state: 'PR',
  addressId: '',
  addressType: null,
  country: 'BRA',
  geoCoordinates: [],
  neighborhood: 'Santana',
  receiverName: null,
  reference: null,
}

export const sampleAddress2: Address = {
  street: 'Calle Azurduy 158',
  number: '158',
  complement: 'La ultima casa en Coimata al lado de las Pozas',
  postalCode: '',
  city: 'Sucre',
  state: 'Santa Fe',
  addressId: '',
  addressType: null,
  country: 'BOL',
  geoCoordinates: [],
  neighborhood: 'Santana',
  receiverName: null,
  reference: null,
}
