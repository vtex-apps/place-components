import {
  Query,
  QueryGetAddressByExternalIdArgs,
} from 'vtex.geolocation-graphql-interface'
import { MockedResponse } from '@apollo/react-testing'

import GET_ADDRESS_BY_EXTERNAL_ID from '../../graphql/getAddressByExternalId.graphql'

export const simpleSuggestedAddress: MockedResponse = {
  request: {
    query: GET_ADDRESS_BY_EXTERNAL_ID,
    variables: {
      id: '1',
    } as QueryGetAddressByExternalIdArgs,
  },
  result: {
    data: {
      getAddressByExternalId: {
        addressId: '1',
        addressType: 'residential',
        city: 'Rio de Janeiro',
        complement: null,
        country: 'BRA',
        geoCoordinates: [
          -43.18037200000001,
          -22.9418474,
        ] as Query['getAddressByExternalId']['geoCoordinates'],
        neighborhood: 'Botafogo',
        number: '200',
        postalCode: '22250-145',
        receiverName: null,
        reference: null,
        state: 'RJ',
        street: 'Rua Praia de Botafogo',
      } as Query['getAddressByExternalId'],
    } as Query,
  },
}
