import classnames from 'classnames'
import React, { useState, useMemo, useRef } from 'react'
import { Input, Dropdown } from 'vtex.styleguide'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import {
  LineFragment,
  AddressFields,
  Fields,
  Field,
} from 'vtex.address-context/types'
import { useIntl, defineMessages } from 'react-intl'

import { styleRules } from './countries/rules'
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
  postalCode: {
    defaultMessage: '',
    id: 'place-components.label.postalCode',
  },
})

/**
 * This utility serves to create a "diff" for the fields we will
 * show to the user.
 *
 * For example if the address form is not in a  editing state, we will
 * render a place details with the "extended" display and we will only
 * show the fields that are *not* in the compact mode. This works by ignoring
 * all fields from the compact mode that are in the extended mode.
 */
const getExcludedFields = (
  summary: LineFragment[][],
  includedFields: string[] = []
) => {
  const excludedFields = new Set<string>()
  summary.forEach((line: LineFragment[]) => {
    line.forEach((fragment: LineFragment) => {
      if (includedFields.includes(fragment.name)) {
        return
      }

      excludedFields.add(fragment.name)
    })
  })
  return excludedFields
}

const hasWithoutNumberOption = (label: string) => {
  return label.endsWith('Option')
}

interface AddressFormProps {
  hiddenFields?: AddressFields[]
  mandatoryEditableFields?: AddressFields[]
  onResetAddress?: () => void
}

interface FieldMeta {
  blurred: boolean
}

type FieldsMeta = {
  [field in AddressFields]?: FieldMeta
}

const AddressForm: React.FC<AddressFormProps> = ({
  hiddenFields = [],
  mandatoryEditableFields = [],
  onResetAddress,
}) => {
  const intl = useIntl()
  const { address, setAddress, invalidFields, rules } = useAddressContext()
  const [editing, setEditing] = useState(false)

  const countryRules = (address.country && rules[address.country]) || undefined

  const { fields, display } = countryRules ?? {}
  const summary = display?.extended

  const [fieldsMeta, setFieldsMeta] = useState<FieldsMeta>({})

  const handleEditButtonClick = () => {
    if (editing) {
      onResetAddress?.()
    } else {
      setEditing(true)
    }
  }

  const displayMode = editing ? 'minimal' : 'compact'

  // The use of `useRef` is to prevent the fields from suddenly disappearing
  // from the form while typing the value
  //
  // For example: if the form is missing the number from the address and the user
  // starts typing the number, since the only validation we do on numbers is to check
  // if the value _exists_, as soon as the first character is typed the field will no
  // longer be invalid causing it to suddenly "disappear" from the screen if we don't use
  // the `useRef` hook.
  const initialInvalidFields = useRef([
    ...invalidFields,
    ...mandatoryEditableFields,
  ])

  const ignoredFields = useMemo(
    () =>
      getExcludedFields(
        display?.[displayMode] ?? [],
        initialInvalidFields.current
      ),
    [display, displayMode]
  )

  const handleFieldBlur: React.FocusEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = evt => {
    const fieldName = evt.target.name

    if (!(fieldName in address)) {
      return
    }

    setFieldsMeta(prevMeta => ({
      ...prevMeta,
      [fieldName]: {
        blurred: true,
      },
    }))
  }

  return (
    <div>
      <div className="mb6 flex items-baseline lh-copy">
        <PlaceDetails
          display={displayMode}
          hiddenFields={initialInvalidFields.current as AddressFields[]}
          onEdit={handleEditButtonClick}
        />
      </div>
      <div>
        {summary
          ?.map(line =>
            line.filter(fragment => {
              const field = fields?.[fragment.name as keyof Fields]

              if (
                !field ||
                ignoredFields.has(fragment.name) ||
                hiddenFields.includes(fragment.name) ||
                address[fragment.name] == null
              ) {
                return false
              }

              return true
            })
          )
          .filter(line => line.length > 0)
          .map((line, index, renderedSummary) => (
            <div className="flex flex-wrap" key={index}>
              {line.map((fragment, fragmentIndex) => {
                const field = fields?.[fragment.name as keyof Fields] as Field
                const style = styleRules[field.label]

                let fragmentElement = null

                const { maxLength, autoComplete, required, label } = field

                const handleChange: React.ChangeEventHandler<
                  HTMLInputElement | HTMLSelectElement
                > = ({ target: { value } }) => {
                  setAddress(prevAddress => ({
                    ...prevAddress,
                    [fragment.name]: value,
                  }))
                }

                const value = address[fragment.name] as string

                const commonProps = {
                  label: intl.formatMessage(
                    messages[label as keyof typeof messages]
                  ),
                  value,
                  onChange: handleChange,
                  name: fragment.name,
                  onBlur: handleFieldBlur,
                  ...(maxLength && { maxLength }),
                  ...(autoComplete && { autoComplete }),
                  ...(required &&
                  address[fragment.name]?.length === 0 &&
                  fieldsMeta[fragment.name]?.blurred
                    ? {
                        errorMessage: intl.formatMessage(
                          messages.fieldRequired
                        ),
                      }
                    : null),
                }

                fragmentElement = hasWithoutNumberOption(field.label) ? (
                  <NumberOption {...commonProps} showCheckbox />
                ) : field.options ? (
                  <Dropdown {...commonProps} options={field.options} />
                ) : (
                  <Input {...commonProps} />
                )

                return (
                  <div
                    className={classnames('flex-auto', {
                      mb5: index < renderedSummary.length - 1,
                      mr5: fragmentIndex < line.length - 1,
                    })}
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
