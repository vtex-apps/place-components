import React from 'react'
import { render } from '@vtex/test-tools/react'
import {
  mockSummaries as summaries,
  sampleAddress as address,
} from '../__mocks__/mockSummaries'
import PlaceDetails from '../PlaceDetails'

describe('Place Details', () => {
  it('should render all data present in the summary and in the address', () => {
    const { queryByText } = render(
      <div>
        <PlaceDetails address={address} summary={summaries[0]} />
      </div>
    )

    expect(queryByText(address.street as string)).toBeTruthy()
    expect(queryByText(address.number as string)).toBeTruthy()
    expect(queryByText(address.complement as string)).toBeTruthy()
    expect(queryByText(address.postalCode as string)).toBeTruthy()
    expect(queryByText(address.city as string)).toBeTruthy()
    expect(queryByText(address.state as string)).toBeTruthy()
  })

  it('should not render data not present in the summary', () => {
    const { queryByText } = render(
      <div>
        <PlaceDetails address={address} summary={summaries[2]} />
      </div>
    )

    expect(queryByText(address.number as string)).toBeFalsy()
    expect(queryByText(address.country as string)).toBeFalsy()
    expect(queryByText(address.neighborhood as string)).toBeFalsy()
  })
})
