import React, { useState } from 'react'
import { Dropdown } from 'vtex.styleguide'
import {
  countryDescriptions,
  sampleAddress as address,
  CountryDescription,
  LineFragment,
  Line,
  Summary,
} from './mocks/CountryDescriptions'

const PlaceDetails: StorefrontFunctionComponent<{}> = () => {
  const [option, setOption] = useState<string>('')
  const [summary, setSummary] = useState<Summary>([])

  const onDropdownChange = (_: Event, country: string) => {
    setOption(country)
    let description = countryDescriptions.find(
      (description: CountryDescription) => description.name == country
    )
    setSummary(description?.summary || [])
  }

  const parseLineFragment = (
    fragment: LineFragment,
    index: number,
    line: Line
  ) => {
    const hasPreviousFragment = index > 0 && address[line[index - 1].name]
    const hasNextFragment =
      index + 1 < line.length && address[line[index + 1].name]
    const hasDifferentDelimiter = fragment.delimiterAfter !== '-'
    const shouldShowDelimiter = hasNextFragment || hasDifferentDelimiter

    return address[fragment.name] ? (
      <span key={fragment.name}>
        {fragment.delimiter && hasPreviousFragment && (
          <span className={fragment.name + '-delimiter'}>
            {fragment.delimiter}
          </span>
        )}
        <span className={fragment.name}>{address[fragment.name]}</span>
        {fragment.delimiterAfter && shouldShowDelimiter && (
          <span className={fragment.name + '-delimiter-after'}>
            {fragment.delimiterAfter}
          </span>
        )}
      </span>
    ) : null
  }

  const parseLine = (line: Line, index: number) => [
    ...line.map(parseLineFragment),
    <br className={'line' + (index + 1) + '-delimiter'} key={index} />,
  ]

  return (
    <div>
      <Dropdown
        label="Country"
        options={[
          { value: 'ARG', label: 'Argentina' },
          { value: 'BRA', label: 'Brazil' },
          { value: 'KOR', label: 'Korea' },
        ]}
        value={option}
        onChange={onDropdownChange}
        placeholder="Select a country"
      />
      {summary.map(parseLine)}
    </div>
  )
}

export default PlaceDetails
