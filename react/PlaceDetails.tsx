import React, { useState } from 'react'
import { Dropdown } from 'vtex.styleguide'

const address: { [index: string]: any } = {
  street: 'Av. Belgrano',
  number: 2248,
  complement: '',
  postalCode: '2000',
  city: 'Rosario',
  state: 'Santa Fe',
}

const countryDescriptions: CountryDescription[] = [
  {
    name: 'ARG',
    summary: [
      [{ name: 'street' }, { delimiter: ' ', name: 'number' }],
      [{ name: 'complement' }],
      [{ name: 'postalCode' }],
      [{ name: 'city' }, { delimiter: ', ', name: 'state' }],
    ],
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
    ],
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
    ],
  },
]

const PlaceDetails: StorefrontFunctionComponent<PlaceDetailsProps> = () => {
  const [option, setOption] = useState<string>('ARG')
  const [summary, setSummary] = useState<LineComponent[][]>([])

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
        onChange={(_: any, newVal: string) => {
          setOption(newVal)
          let newSummary = countryDescriptions.find(
            description => description.name == newVal
          )
          setSummary(newSummary ? newSummary.summary : [])
        }}
        placeholder="Select a country"
      />
      {summary.map((line: LineComponent[], index: number) => [
        ...line.map(
          (field: LineComponent, index: number, line: LineComponent[]) => {
            const hasPreviousField = index > 0 && address[line[index - 1].name]
            const hasNextField =
              index + 1 < line.length && address[line[index + 1].name]
            const hasDifferentDelimiter = field.delimiterAfter !== '-'
            const shouldShowDelimiter = hasNextField || hasDifferentDelimiter

            return address[field.name] ? (
              <span key={field.name}>
                {field.delimiter && hasPreviousField && (
                  <span className={field.name + '-delimiter'}>
                    {field.delimiter}
                  </span>
                )}
                <span className={field.name}>{address[field.name]}</span>
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

interface PlaceDetailsProps {}

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
