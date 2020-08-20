import { Address } from 'vtex.checkout-graphql'
import { AddressRules } from 'vtex.address-context/react/types'

import { Suggestion } from '../LocationSearch'

export const completeAddress: Address = {
  street: 'Av. Belgrano',
  number: '2248',
  complement: 'B',
  postalCode: '2000',
  city: 'Rosario',
  state: 'Santa Fé',
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
  city: '',
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

export const getFewAddresses = (searchTerm: string): Suggestion[] =>
  [
    {
      description: 'Praia de Botafogo, 300, Botafogo, Rio de Janeiro, RJ',
      mainText: 'Praia de Botafogo, 300',
      mainTextMatchInterval: {
        offset: 0,
        size: 0,
      },
      secondaryText: 'Botafogo, Rio de Janeiro, RJ',
    },
    {
      description: 'Praia de Botafogo, 200, Botafogo, Rio de Janeiro, RJ',
      mainText: 'Praia de Botafogo, 200',
      mainTextMatchInterval: {
        offset: 0,
        size: 0,
      },
      secondaryText: 'Botafogo, Rio de Janeiro, RJ',
    },
  ].filter(
    suggestion => searchTerm.length && suggestion.mainText.includes(searchTerm)
  )

export const braRules: AddressRules = {
  BRA: {
    display: {
      minimal: [
        [
          {
            name: 'postalCode',
          },
        ],
      ],
      compact: [
        [
          {
            name: 'street',
          },
          {
            delimiter: ' ',
            name: 'number',
          },
        ],
        [
          {
            name: 'neighborhood',
          },
        ],
        [
          {
            name: 'city',
          },
          {
            delimiter: ' - ',
            name: 'state',
          },
        ],
        [
          {
            name: 'postalCode',
          },
        ],
      ],
      extended: [
        [
          {
            name: 'receiverName',
          },
        ],
        [
          {
            name: 'street',
          },
          {
            delimiter: ' ',
            name: 'number',
          },
        ],
        [
          {
            name: 'complement',
          },
        ],
        [
          {
            name: 'neighborhood',
          },
        ],
        [
          {
            name: 'city',
          },
          {
            delimiter: ' - ',
            name: 'state',
          },
        ],
        [
          {
            name: 'postalCode',
          },
        ],
      ],
    },
    fields: {
      country: {
        label: 'country',
        hidden: true,
        maxLength: 100,
      },
      state: {
        label: 'stateAbbreviation',
        maxLength: 100,
        required: true,
        optionsCaption: 'UF',
        options: [
          {
            label: 'AC',
            value: 'AC',
          },
          {
            label: 'AL',
            value: 'AL',
          },
          {
            label: 'AP',
            value: 'AP',
          },
          {
            label: 'AM',
            value: 'AM',
          },
          {
            label: 'BA',
            value: 'BA',
          },
          {
            label: 'CE',
            value: 'CE',
          },
          {
            label: 'DF',
            value: 'DF',
          },
          {
            label: 'ES',
            value: 'ES',
          },
          {
            label: 'GO',
            value: 'GO',
          },
          {
            label: 'MA',
            value: 'MA',
          },
          {
            label: 'MT',
            value: 'MT',
          },
          {
            label: 'MS',
            value: 'MS',
          },
          {
            label: 'MG',
            value: 'MG',
          },
          {
            label: 'PA',
            value: 'PA',
          },
          {
            label: 'PB',
            value: 'PB',
          },
          {
            label: 'PR',
            value: 'PR',
          },
          {
            label: 'PE',
            value: 'PE',
          },
          {
            label: 'PI',
            value: 'PI',
          },
          {
            label: 'RJ',
            value: 'RJ',
          },
          {
            label: 'RN',
            value: 'RN',
          },
          {
            label: 'RS',
            value: 'RS',
          },
          {
            label: 'RO',
            value: 'RO',
          },
          {
            label: 'RR',
            value: 'RR',
          },
          {
            label: 'SC',
            value: 'SC',
          },
          {
            label: 'SP',
            value: 'SP',
          },
          {
            label: 'SE',
            value: 'SE',
          },
          {
            label: 'TO',
            value: 'TO',
          },
        ],
      },
      city: {
        label: 'city',
        maxLength: 100,
        required: true,
      },
      neighborhood: {
        label: 'neighborhood',
        maxLength: 100,
        required: true,
      },
      street: {
        label: 'streetRoadAvenue',
        required: true,
      },
      number: {
        label: 'numberOption',
        maxLength: 750,
        required: true,
        autoComplete: 'off',
      },
      complement: {
        label: 'complement',
        maxLength: 750,
      },
      reference: {
        label: 'reference',
        hidden: true,
        maxLength: 750,
      },
      receiverName: {
        label: 'receiverName',
        elementName: 'receiver',
        maxLength: 750,
        required: true,
      },
      postalCode: {
        mask: '99999-999',
        label: 'postalCode',
        additionalData: {
          forgottenURL:
            'http://www.buscacep.correios.com.br/servicos/dnec/index.do',
        },
      },
    },
  },
}
