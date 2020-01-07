import React from 'react'
import { render } from '@vtex/test-tools/react'
//import Component from '../components/index'
import { Dropdown } from 'vtex.styleguide'

describe('HelloWorld Component', () => {
  const { getByText } = render(
    <Dropdown
      label="Option"
      options={[
        { value: 'first', label: '1' },
        { value: 'second', label: '2' },
      ]}
      onChange={() => {}}
      value={'first'}
      placeholder="Select an option"
    />
  )

  it('should render the example in TypeScript', () => {
    expect(getByText(/Select a painter/)).toBeDefined()
  })
})
