import React from 'react'
import { render } from '@vtex/test-tools/react'
import {
  mockDescriptions as descriptions,
  completeAddress,
  incompleteAddress,
} from '../__mocks__/mockSummaries'
import PlaceDetails from '../PlaceDetails'

describe('Place Details', () => {
  it('should render all data present in the summary and in the address', () => {
    const { queryByText } = render(
      <div>
        <PlaceDetails
          address={completeAddress}
          summary={descriptions.ARG.summary}
        />
      </div>
    )

    expect(queryByText(completeAddress.street as string)).toBeTruthy()
    expect(queryByText(completeAddress.number as string)).toBeTruthy()
    expect(queryByText(completeAddress.complement as string)).toBeTruthy()
    expect(queryByText(completeAddress.postalCode as string)).toBeTruthy()
    expect(queryByText(completeAddress.city as string)).toBeTruthy()
    expect(queryByText(completeAddress.state as string)).toBeTruthy()
  })

  it('should not render data present in the address, but not present in the summary', () => {
    const { queryByText } = render(
      <div>
        <PlaceDetails
          address={completeAddress}
          summary={descriptions.KOR.summary}
        />
      </div>
    )

    expect(queryByText(completeAddress.number as string)).toBeFalsy()
    expect(queryByText(completeAddress.country as string)).toBeFalsy()
    expect(queryByText(completeAddress.neighborhood as string)).toBeFalsy()
  })

  it('should not render delimiter attached to a value if the value is not rendered', () => {
    const { queryByText } = render(
      <div>
        <PlaceDetails
          address={incompleteAddress}
          summary={descriptions.ARG.summary}
        />
      </div>
    )

    expect(queryByText(', ' as string)).toBeFalsy()
  })

  it('should correctly render delimiters when all required values are present', () => {
    const { queryByText, queryAllByText } = render(
      <div>
        <PlaceDetails
          address={completeAddress}
          summary={descriptions.BRA.summary}
        />
      </div>
    )

    expect(queryByText(completeAddress.neighborhood as string)).toBeTruthy()
    expect(queryByText(completeAddress.city as string)).toBeTruthy()
    expect(queryByText(completeAddress.state as string)).toBeTruthy()
    const query = queryAllByText(' - ' as string, { exact: false, trim: false })
    expect(query.length).toEqual(2)
  })
})
