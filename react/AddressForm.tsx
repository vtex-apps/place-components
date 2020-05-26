import React, { useState, useMemo } from 'react'
import { Input, Dropdown, ButtonPlain } from 'vtex.styleguide'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { FormattedMessage, useIntl, defineMessages } from 'react-intl'

import rules, { styleRules } from './countries/rules'
import PlaceDetails from './PlaceDetails'
import NumberOption from './components/NumberOption'

const messages = defineMessages({
  receiverName: {
    id: 'place-components.label.receiverName',
    defaultMessage: 'Receiver',
  },
  country: {
    defaultMessage: '',
    id: 'place-components.label.country',
  },
  state: {
    defaultMessage: '',
    id: 'place-components.label.state',
  },
  city: {
    defaultMessage: '',
    id: 'place-components.label.city',
  },
  neighborhood: {
    defaultMessage: '',
    id: 'place-components.label.neighborhood',
  },
  streetRoadAvenue: {
    defaultMessage: '',
    id: 'place-components.label.streetRoadAvenue',
  },
  numberOption: {
    defaultMessage: '',
    id: 'place-components.label.numberOption',
  },
  complement: {
    defaultMessage: '',
    id: 'place-components.label.complement',
  },
  stateAbbreviation: {
    defaultMessage: '',
    id: 'place-components.label.stateAbbreviation',
  },
  fieldRequired: {
    defaultMessage: '',
    id: 'place-components.error.fieldRequired',
  },
  edit: {
    defaultMessage: '',
    id: 'place-components.label.edit',
  },
})

const getSummaryFields = (summary: LineFragment[][]) => {
  const summaryFields = new Set()
  summary.forEach((line: LineFragment[]) => {
    line.forEach((fragment: LineFragment) => {
      summaryFields.add(fragment.name)
    })
  })
  return summaryFields
}

const hasWithoutNumberOption = (label: string) => {
  return label.endsWith('Option')
}

interface AddressFormProps {
  hiddenFields?: AddressFields[]
}

const AddressForm: React.FC<AddressFormProps> = ({ hiddenFields = [] }) => {
  const intl = useIntl()
  const { address, setAddress } = useAddressContext()
  const [editing, setEditing] = useState(false)
  const { fields, display } = rules[address.country!]
  const summary = display.extended

  const onEditButtonClick = () => {
    setEditing(true)
  }

  const displayMode = editing ? 'minimal' : 'compact'

  const ignoredFields = useMemo(() => getSummaryFields(display[displayMode]), [
    display,
    displayMode,
  ])

  return (
    <div>
      <div className="mb6">
        <PlaceDetails display={displayMode} />
        {!editing && (
          <ButtonPlain onClick={onEditButtonClick} title="edit">
            <FormattedMessage {...messages.edit} />
          </ButtonPlain>
        )}
      </div>
      <div>
        {summary.map((line, index) => (
          <div className="flex" key={index}>
            {line.map(fragment => {
              const field = fields[fragment.name as keyof Fields]

              if (
                !field ||
                ignoredFields.has(fragment.name) ||
                hiddenFields.includes(fragment.name) ||
                address[fragment.name] == null
              ) {
                return null
              }

              const style = styleRules[field.label]

              let fragmentElement = null

              if (hasWithoutNumberOption(field.label)) {
                fragmentElement = <NumberOption showCheckbox />
              } else {
                const Component = field.options ? Dropdown : Input

                const {
                  maxLength,
                  autoComplete,
                  required,
                  label,
                  options,
                } = field

                const handleChange: React.ChangeEventHandler<
                  HTMLInputElement | HTMLSelectElement
                > = ({ target: { value } }) => {
                  setAddress(prevAddress => ({
                    ...prevAddress,
                    [fragment.name]: value,
                  }))
                }

                const value = address[fragment.name]!

                fragmentElement = (
                  // @ts-ignore: TypeScript struggles to infer the types for a component
                  // that is "simultaneously" two components.
                  <Component
                    label={
                      <FormattedMessage
                        {...messages[label as keyof typeof messages]}
                      />
                    }
                    value={value}
                    onChange={handleChange}
                    {...(options && { options })}
                    {...(maxLength && { maxLength })}
                    {...(autoComplete && { autoComplete })}
                    {...(required &&
                      address[fragment.name]!.length === 0 && {
                        errorMessage: intl.formatMessage(
                          messages.fieldRequired
                        ),
                      })}
                  />
                )
              }

              return (
                <div
                  className="flex-auto mb5 mr5"
                  style={style}
                  key={fragment.name}
                >
                  {fragmentElement}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddressForm
