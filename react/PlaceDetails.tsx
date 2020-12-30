import msk from 'msk'
import React from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { Display, AddressFields } from 'vtex.address-context/types'
import { ButtonPlain } from 'vtex.styleguide'
import { useIntl, defineMessages } from 'react-intl'

interface Props {
  display?: keyof Display
  hiddenFields?: AddressFields[]
  onEdit?: () => void
}

const messages = defineMessages({
  edit: {
    defaultMessage: '',
    id: 'place-components.label.edit',
  },
})

const PlaceDetails: React.FC<Props> = ({
  display = 'extended',
  hiddenFields = [],
  onEdit,
}) => {
  const { address, rules } = useAddressContext()
  const countryRules = rules[address.country as string]

  const intl = useIntl()

  if (!countryRules) {
    return null
  }

  const displaySpec = countryRules.display[display]

  return (
    <div className="flex flex-column">
      {displaySpec
        .map(line => {
          return line.filter(
            fragment =>
              address[fragment.name] && !hiddenFields.includes(fragment.name)
          )
        })
        .filter(line => line.length > 0)
        .map((line, displayIndex) => (
          <div className="flex" key={displayIndex}>
            {line.map((fragment, index) => {
              const hasPreviousFragment =
                index > 0 && address[line[index - 1].name]

              const hasNextFragment =
                index + 1 < line.length && address[line[index + 1].name]

              const hasDifferentDelimiter = fragment.delimiterAfter !== '-'
              const shouldShowDelimiter =
                hasNextFragment ?? hasDifferentDelimiter

              const valueMask =
                fragment.name in countryRules.fields
                  ? countryRules.fields[fragment.name]?.mask
                  : undefined

              const addressValue = valueMask
                ? msk(address[fragment.name] as string, valueMask)
                : address[fragment.name]

              return (
                <div className="dib" key={fragment.name}>
                  {fragment.delimiter && hasPreviousFragment && (
                    <span>{fragment.delimiter}</span>
                  )}
                  <span className={fragment.name}>{addressValue}</span>
                  {fragment.delimiterAfter && shouldShowDelimiter && (
                    <span>{fragment.delimiterAfter}</span>
                  )}
                </div>
              )
            })}
            {onEdit && displayIndex === 0 && (
              <div className="ml4 flex items-center">
                <ButtonPlain onClick={onEdit}>
                  <span className="ttl">
                    {intl.formatMessage(messages.edit)}
                  </span>
                </ButtonPlain>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default PlaceDetails
