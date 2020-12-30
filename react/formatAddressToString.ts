import { Address } from 'vtex.checkout-graphql'
import { CountryRules } from 'vtex.address-context/types'
import msk from 'msk'

import { Display } from './typings/countryRulesTypes'

export default function formatAddressToString(
  address: Address,
  rules: CountryRules,
  displayType: keyof Display = 'compact'
) {
  const displaySpec = rules.display[displayType]

  return displaySpec
    .map(line => line.filter(fragment => address[fragment.name]))
    .filter(line => line.length > 0)
    .map(line =>
      line
        .map((fragment, index) => {
          const hasPreviousFragment = index > 0 && address[line[index - 1].name]
          const hasNextFragment =
            index + 1 < line.length && address[line[index + 1].name]

          const hasDifferentDelimiter = fragment.delimiterAfter !== '-'
          const shouldShowDelimiter = hasNextFragment ?? hasDifferentDelimiter

          const valueMask =
            fragment.name in rules.fields
              ? rules.fields[fragment.name]?.mask
              : undefined

          const fragmentValue = valueMask
            ? msk(address[fragment.name] as string, valueMask)
            : address[fragment.name]

          return [
            hasPreviousFragment && fragment.delimiter,
            fragmentValue,
            shouldShowDelimiter && fragment.delimiterAfter,
          ]
            .filter(Boolean)
            .join(' ')
        })
        .join(' ')
    )
    .join(' ')
}
