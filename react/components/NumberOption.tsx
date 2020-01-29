import React, { useState } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { Input, Checkbox } from 'vtex.styleguide'
import rules from '../countries/rules'
import { FormattedMessage } from 'react-intl'

interface Props {
  showCheckbox: boolean
}

const NumberOption: StorefrontFunctionComponent<Props> = ({ showCheckbox }) => {
  const { address, setAddress } = useAddressContext()
  const [disabled, setDisabled] = useState(false)

  const getInputProps = () => {
    const field = rules[address.country].fields['number']
    const maxLength = field && field.maxLength ? field.maxLength : null
    const autoComplete = field && field.autoComplete ? field.autoComplete : null
    const required = field && field.required ? field.required : null
    const labelName = field && field.label ? field.label : null
    const label = (
      <FormattedMessage id={`place-components.label.${labelName}`} />
    )

    return {
      label: label,
      value: address['number'],
      onChange: (event: React.ChangeEvent) => {
        if (event.target instanceof HTMLInputElement) {
          setAddress({
            ...address,
            number: event.target.value,
          })
        }
      },
      ...(maxLength && { maxLength }),
      ...(autoComplete && { autoComplete }),
      ...(required &&
        address['number'].length == 0 && {
          errorMessage: (
            <FormattedMessage id={`place-components.error.field-required`} />
          ),
        }),
      disabled: disabled,
    }
  }

  const getCheckboxProps = () => {
    return {
      id: 'number-checkbox',
      name: 'number-checkbox',
      label: 'Without number - add internationalization',
      onChange: (event: React.ChangeEvent) => {
        console.log('aconteceu')
        if (event.target instanceof HTMLInputElement) {
          console.log('aconteceu x2')
          setAddress({
            ...address,
            number: disabled ? '-' : 'S/N - add internationalization',
          })
          setDisabled(!disabled)
        }
      },
    }
  }

  return (
    <span>
      <span className="w-25 dib mh3">
        <Input {...getInputProps()} />
      </span>
      {showCheckbox && (
        <span className="w-25 dib mh3">
          <Checkbox {...getCheckboxProps()} />
        </span>
      )}
    </span>
  )
}

export default NumberOption
