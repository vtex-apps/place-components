import React, { useState } from 'react'
import { Dropdown } from 'vtex.styleguide'
import {
  countryDescriptions,
  sampleAddress,
  CountryDescription,
  LineFragment,
} from './mocks/CountryDescriptions'

const PlaceDetails: StorefrontFunctionComponent<{}> = () => {
  const [option, setOption] = useState<string>('')
  const [summary, setSummary] = useState<LineFragment[][]>([])

  const onDropdownChange = (_: any, country: string) => {
    setOption(country)
    let description = countryDescriptions.find(
      (description: CountryDescription) => description.name == country
    )
    setSummary(description ? description.summary : [])
  }

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
      {summary.map((line: LineFragment[], index: number) => [
        ...line.map(
          (field: LineFragment, index: number, line: LineFragment[]) => {
            const hasPreviousField =
              index > 0 && sampleAddress[line[index - 1].name]
            const hasNextField =
              index + 1 < line.length && sampleAddress[line[index + 1].name]
            const hasDifferentDelimiter = field.delimiterAfter !== '-'
            const shouldShowDelimiter = hasNextField || hasDifferentDelimiter

            return sampleAddress[field.name] ? (
              <span key={field.name}>
                {field.delimiter && hasPreviousField && (
                  <span className={field.name + '-delimiter'}>
                    {field.delimiter}
                  </span>
                )}
                <span className={field.name}>{sampleAddress[field.name]}</span>
                {field.delimiterAfter && shouldShowDelimiter && (
                  <span className={field.name + '-delimiter-after'}>
                    {field.delimiterAfter}
                  </span>
                )}
              </span>
            ) : null
          }
        ),
        <br className={'line' + (index + 1) + '-delimiter'} key={index} />,
      ])}
    </div>
  )
}

PlaceDetails.schema = {
  title: 'editor.base-store-component.title',
  description: 'editor.base-store-component.description',
  type: 'object',
  properties: {
    title: {
      title: 'editor.base-store-component.title.title',
      description: 'editor.base-store-component.title.description',
      type: 'string',
      default: null,
    },
  },
}

export default PlaceDetails
