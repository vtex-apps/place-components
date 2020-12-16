import { Query, QueryAddressArgs } from 'vtex.geolocation-graphql-interface'
import { MockedResponse } from '@apollo/react-testing'

import ADDRESS from '../../graphql/address.graphql'
import { DEFAULT_SESSION_TOKEN } from './sessionToken.fixture'

export const simpleSuggestedAddress: MockedResponse = {
  request: {
    query: ADDRESS,
    variables: {
      externalId: '1',
      sessionToken: DEFAULT_SESSION_TOKEN,
    } as QueryAddressArgs,
  },
  result: {
    data: {
      address: {
        addressId: '1',
        addressType: 'residential',
        city: 'Rio de Janeiro',
        complement: null,
        country: 'BRA',
        geoCoordinates: [
          -43.18037200000001,
          -22.9418474,
        ] as Query['address']['geoCoordinates'],
        neighborhood: 'Botafogo',
        number: '200',
        postalCode: '22250-145',
        receiverName: null,
        reference: null,
        state: 'RJ',
        street: 'Rua Praia de Botafogo',
      } as Query['address'],
    } as Query,
  },
}
