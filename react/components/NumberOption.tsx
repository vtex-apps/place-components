import React, { useState } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { Input, Checkbox } from 'vtex.styleguide'
import rules from '../countries/rules'
import {
  FormattedMessage,
  injectIntl,
  InjectedIntlProps,
  defineMessages,
} from 'react-intl'

const messages = defineMessages({
  wn: {
    defaultMessage: '',
    id: 'place-components.label.wn',
  },
})

interface Props {
  showCheckbox: boolean
}

const NumberOption: StorefrontFunctionComponent<Props & InjectedIntlProps> = ({
  showCheckbox,
  intl,
}) => {
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
    const value = address['number']
    const onChange = (event: React.ChangeEvent) => {
      if (event.target instanceof HTMLInputElement) {
        setAddress({
          ...address,
          number: event.target.value,
        })
      }
    }
    const fieldRequired = {
      errorMessage: (
        <FormattedMessage id={`place-components.error.field-required`} />
      ),
    }

    return {
      label,
      value,
      onChange,
      disabled,
      ...(maxLength && { maxLength }),
      ...(autoComplete && { autoComplete }),
      ...(required && address['number'].length == 0 && fieldRequired),
    }
  }

  const getCheckboxProps = () => {
    const onChange = (event: React.ChangeEvent) => {
      if (event.target instanceof HTMLInputElement) {
        setAddress({
          ...address,
          number: disabled ? '-' : intl.formatMessage(messages.wn),
        })
        setDisabled(!disabled)
      }
    }

    return {
      id: 'number-checkbox',
      name: 'number-checkbox',
      label: <FormattedMessage id="place-components.label.without-number" />,
      onChange,
      checked: disabled,
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

export default injectIntl(NumberOption)
