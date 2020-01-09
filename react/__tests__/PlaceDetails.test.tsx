import React from 'react'
import { render } from '@vtex/test-tools/react'
import {
  mockSummaries as summaries,
  sampleAddress as address,
} from '../__mocks__/mockSummaries'
import PlaceDetails from '../PlaceDetails'

describe('Place Details', () => {
  it('should render all data related to Argentina', () => {
    const { getByText } = render(
      <div>
        <PlaceDetails address={address} summary={summaries[0]} />
      </div>
    )

    expect(getByText(address.street as string)).toBeDefined()
    expect(getByText(address.number as string)).toBeDefined()
    expect(getByText(address.complement as string)).toBeDefined()
    expect(getByText(address.postalCode as string)).toBeDefined()
    expect(getByText(address.city as string)).toBeDefined()
    expect(getByText(address.state as string)).toBeDefined()
  })
})
