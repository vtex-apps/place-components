import React from 'react'
import { Address } from 'vtex.checkout-graphql'
import { LineFragment } from './typings/countryRulesTypes'

interface Props {
  address: Address
  summary: LineFragment[][]
}

const PlaceDetails: StorefrontFunctionComponent<Props> = ({
  address,
  summary,
}) => {
  const parseLineFragment = (
    fragment: LineFragment,
    index: number,
    line: LineFragment[]
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

  const parseLine = (line: LineFragment[], index: number) => [
    ...line.map(parseLineFragment),
    <br className={'line' + (index + 1) + '-delimiter'} key={index} />,
  ]

  return <div>{summary.map(parseLine)}</div>
}

export default PlaceDetails
