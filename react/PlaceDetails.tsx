import React from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'

import { Display } from './typings/countryRulesTypes.d'
import rules from './countries/rules'

interface Props {
  display?: keyof Display
}

const PlaceDetails: React.FC<Props> = ({ display = 'extended' }) => {
  const { address } = useAddressContext()
  const displaySpec = rules[address.country!].display[display]

  return (
    <div>
      {displaySpec.map((line, displayIndex) => (
        <div key={displayIndex}>
          {line.map((fragment, index) => {
            if (!address[fragment.name]) {
              return null
            }

            const hasPreviousFragment =
              index > 0 && address[line[index - 1].name]
            const hasNextFragment =
              index + 1 < line.length && address[line[index + 1].name]
            const hasDifferentDelimiter = fragment.delimiterAfter !== '-'
            const shouldShowDelimiter = hasNextFragment ?? hasDifferentDelimiter

            return (
              <span key={fragment.name}>
                {fragment.delimiter && hasPreviousFragment && (
                  <span>{fragment.delimiter}</span>
                )}
                <span className={fragment.name}>{address[fragment.name]}</span>
                {fragment.delimiterAfter && shouldShowDelimiter && (
                  <span>{fragment.delimiterAfter}</span>
                )}
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default PlaceDetails
