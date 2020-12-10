import {
  Query,
  QuerySuggestAddressesArgs,
} from 'vtex.geolocation-graphql-interface'
import { MockedResponse } from '@apollo/react-testing'

import SUGGEST_ADDRESSES from '../../graphql/suggestAddresses.graphql'
import { DEFAULT_SESSION_TOKEN } from './sessionToken.fixture'

export const simpleSuggestions: MockedResponse = {
  request: {
    query: SUGGEST_ADDRESSES,
    variables: {
      searchTerm: 'Praia de Botafogo',
      sessionToken: DEFAULT_SESSION_TOKEN,
    } as QuerySuggestAddressesArgs,
  },
  result: {
    data: {
      suggestAddresses: [
        {
          description: 'Praia de Botafogo, 200, Botafogo, Rio de Janeiro, RJ',
          mainText: 'Praia de Botafogo, 200',
          mainTextMatchInterval: {
            offset: 0,
            length: 0,
          },
          secondaryText: 'Botafogo, Rio de Janeiro, RJ',
          externalId: '1',
        },
        {
          description: 'Praia de Botafogo, 300, Botafogo, Rio de Janeiro, RJ',
          mainText: 'Praia de Botafogo, 300',
          mainTextMatchInterval: {
            offset: 0,
            length: 0,
          },
          secondaryText: 'Botafogo, Rio de Janeiro, RJ',
          externalId: '2',
        },
      ],
    } as Query,
  },
}

export const simpleSuggestionWithoutToken: MockedResponse = {
  ...simpleSuggestions,
  request: {
    ...simpleSuggestions.request,
    variables: {
      ...simpleSuggestions.request.variables,
      sessionToken: null,
    } as QuerySuggestAddressesArgs,
  },
}

export const noSuggestions: MockedResponse = {
  request: {
    query: SUGGEST_ADDRESSES,
    variables: {
      searchTerm: 'asdfasdfasdf',
      sessionToken: DEFAULT_SESSION_TOKEN,
    } as QuerySuggestAddressesArgs,
  },
  result: {
    data: {
      suggestAddresses: [] as Query['suggestAddresses'],
    } as Query,
  },
}
