import React, { useState } from 'react'
import { Dropdown } from 'vtex.styleguide'

import styles from './styles.css'

const countryDescriptions: CountryDescription[] = [
  {
    name: 'ARG',
    summary: [
      [{ name: 'street' }, { delimiter: ' ', name: 'number' }],
      [{ name: 'complement' }],
      [{ name: 'postalCode' }],
      [{ name: 'city' }, { delimiter: ', ', name: 'state' }],
    ]
  },
  {
    name: 'BRA',
    summary: [
      [
        { name: 'street' },
        { delimiter: ' ', name: 'number' },
        { delimiter: ', ', name: 'complement' },
      ],
      [
        { name: 'neighborhood', delimiterAfter: ' - ' },
        { name: 'city' },
        { delimiter: ' - ', name: 'state' },
      ],
      [{ name: 'postalCode' }],
    ]
  },
  {
    name: 'KOR',
    summary: [
      [{ name: 'street' }, { delimiter: ', ', name: 'complement' }],
      [
        { name: 'city' },
        { delimiter: ', ', name: 'state' },
        { delimiter: ' ', name: 'postalCode' },
      ],
    ]
  }
]

const PlaceDetails: StorefrontFunctionComponent<PlaceDetailsProps> = () => {
  const [option, setOption] = useState<string>('ARG')
  const [summary, setSummary] = useState<LineComponent[][]>([])

  return (
    <div className={`${styles.container} flex flex-column pv6 ph4`}>
      <Dropdown
        label='Country'
        options={[
          { value: 'ARG', label: 'Argentina' },
          { value: 'BRA', label: 'Brazil' },
          { value: 'KOR', label: 'Korea' }
        ]}
        value={option}
        onChange={(_: any, newVal: string) => {
          setOption(newVal)
          let newSummary = countryDescriptions.find(
            description => description.name == newVal
          )
          setSummary(newSummary ? newSummary.summary : [])
        }}
        placeholder="Select a country"
      />
      {summary.map((line: LineComponent[], _: number) => {
        let printedLine = line.map(lineComponent => {
          return (
            <span style={{ display: 'inline' }}>
              {lineComponent.name}
            </span>
          )
        })
        printedLine.push(<br />)
        return printedLine
      })}
    </div>
  )
}

interface PlaceDetailsProps { }

interface CountryDescription {
  name: string
  summary: LineComponent[][]
}

interface LineComponent {
  name: string
  delimiter?: string
  delimiterAfter?: string
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
