import msk from 'msk'
import React from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { Display, AddressFields } from 'vtex.address-context/types'

interface Props {
  display?: keyof Display
  hiddenFields?: AddressFields[]
}

const PlaceDetails: React.FC<Props> = ({
  display = 'extended',
  hiddenFields = [],
}) => {
  const { address, rules } = useAddressContext()
  const countryRules = rules[address.country as string]

  if (!countryRules) {
    return null
  }

  const displaySpec = countryRules.display[display]

  return (
    <div className="flex flex-column">
      {displaySpec.map((line, displayIndex) => (
        <div key={displayIndex}>
          {line.map((fragment, index) => {
            if (
              !address[fragment.name] ||
              hiddenFields.includes(fragment.name)
            ) {
              return null
            }

            const hasPreviousFragment =
              index > 0 && address[line[index - 1].name]
            const hasNextFragment =
              index + 1 < line.length && address[line[index + 1].name]
            const hasDifferentDelimiter = fragment.delimiterAfter !== '-'
            const shouldShowDelimiter = hasNextFragment ?? hasDifferentDelimiter

            const valueMask =
              fragment.name in countryRules.fields
                ? countryRules.fields[fragment.name]?.mask
                : undefined

            const addressValue = valueMask
              ? msk(address[fragment.name] as string, valueMask)
              : address[fragment.name]

            return (
              <span key={fragment.name}>
                {fragment.delimiter && hasPreviousFragment && (
                  <span>{fragment.delimiter}</span>
                )}
                <span className={fragment.name}>{addressValue}</span>
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
