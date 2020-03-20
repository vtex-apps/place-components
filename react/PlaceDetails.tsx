import React from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'

import { LineFragment, Display } from './typings/countryRulesTypes.d'
import rules from './countries/rules'

interface Props {
  display: keyof Display
}

const PlaceDetails: StorefrontFunctionComponent<Props> = ({ display }) => {
  const { address } = useAddressContext()
  const summary = rules[address.country!].display[display]

  const parseLineFragment = (
    fragment: LineFragment,
    index: number,
    line: LineFragment[]
  ) => {
    const hasPreviousFragment = index > 0 && address[line[index - 1].name]
    const hasNextFragment =
      index + 1 < line.length && address[line[index + 1].name]
    const hasDifferentDelimiter = fragment.delimiterAfter !== '-'
    const shouldShowDelimiter = hasNextFragment ?? hasDifferentDelimiter

    return address[fragment.name] ? (
      <span key={fragment.name}>
        {fragment.delimiter && hasPreviousFragment && (
          <span>{fragment.delimiter}</span>
        )}
        <span className={fragment.name}>{address[fragment.name]}</span>
        {fragment.delimiterAfter && shouldShowDelimiter && (
          <span>{fragment.delimiterAfter}</span>
        )}
      </span>
    ) : null
  }

  const parseLine = (line: LineFragment[], index: number) => [
    <div key={index}>{line.map(parseLineFragment)}</div>,
  ]

  return <div className="lh-title">{summary.map(parseLine)}</div>
}

export default PlaceDetails
