import { Address } from 'vtex.checkout-graphql'
import { CountryDescription } from '../mocks'

export const mockSummaries: CountryDescription[] = [
  [
    [{ name: 'street' }, { delimiter: ' ', name: 'number' }],
    [{ name: 'complement' }],
    [{ name: 'postalCode' }],
    [{ name: 'city' }, { delimiter: ', ', name: 'state' }],
  ],
  [
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
  [
    [{ name: 'street' }, { delimiter: ', ', name: 'complement' }],
    [
      { name: 'city' },
      { delimiter: ', ', name: 'state' },
      { delimiter: ' ', name: 'postalCode' },
    ],
  ],
]

export const completeAddress: Address = {
  street: 'Av. Belgrano',
  number: '2248',
  complement: 'B',
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

export const incompleteAddress: Address = {
  street: 'Av. Belgrano',
  number: '2248',
  complement: '',
  postalCode: '2000',
  city: 'Rosario',
  state: '',
  addressId: '',
  addressType: null,
  country: 'Argentina',
  geoCoordinates: [],
  neighborhood: '',
  receiverName: null,
  reference: null,
}
