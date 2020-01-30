import { Address } from 'vtex.checkout-graphql'
import { countryDescriptions } from '../mocks/CountryDescriptions'

export const mockDescriptions = {
  ARG: countryDescriptions[0],
  BRA: countryDescriptions[1],
  KOR: countryDescriptions[2],
}

export const completeAddress: Address = {
  street: 'Av. Belgrano',
  number: '2248',
  complement: 'B',
  postalCode: '2000',
  city: 'Rosario',
  state: 'Santa Fe',
  addressId: '',
  addressType: null,
  country: 'ARG',
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
  country: 'ARG',
  geoCoordinates: [],
  neighborhood: '',
  receiverName: null,
  reference: null,
}

export const sampleAddress: Address = {
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
