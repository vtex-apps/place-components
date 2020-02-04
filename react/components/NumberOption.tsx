import React, { useState } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { Input, Checkbox } from 'vtex.styleguide'
import rules from '../countries/rules'
import { FormattedMessage, useIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
  wn: {
    defaultMessage: '',
    id: 'place-components.label.wn',
  },
  numberOption: {
    defaultMessage: '',
    id: 'place-components.label.numberOption',
  },
  fieldRequired: {
    defaultMessage: '',
    id: 'place-components.error.fieldRequired',
  },
  withoutNumber: {
    defaultMessage: '',
    id: 'place-components.label.withoutNumber',
  },
})

interface Props {
  showCheckbox: boolean
}

const NumberOption: StorefrontFunctionComponent<Props> = ({ showCheckbox }) => {
  const intl = useIntl()
  const { address, setAddress } = useAddressContext()
  const [disabled, setDisabled] = useState(false)
  const field = rules[address.country].fields.number
  if (!field) return null
  const { maxLength, autoComplete, required, label } = field

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      number: event.target.value,
    })
  }

  const fieldRequired = {
    errorMessage: intl.formatMessage(messages.fieldRequired),
  }

  const inputProps = {
    label: <FormattedMessage {...messages[label as keyof typeof messages]} />,
    value: address.number,
    onChange: onInputChange,
    disabled,
    ...(maxLength && { maxLength }),
    ...(autoComplete && { autoComplete }),
    ...(required && address.number.length === 0 && fieldRequired),
  }

  const onCheckboxChange = () => {
    setAddress({
      ...address,
      number: disabled ? '-' : intl.formatMessage(messages.wn),
    })
    setDisabled(!disabled)
  }

  const checkboxProps = {
    id: 'number-checkbox',
    name: 'number-checkbox',
    label: <FormattedMessage {...messages.withoutNumber} />,
    onChange: onCheckboxChange,
    checked: disabled,
  }

  return (
    <div className="flex">
      <div className="flex-auto">
        <Input {...inputProps} />
      </div>
      {showCheckbox && (
        <div className="flex-auto">
          <Checkbox {...checkboxProps} />
        </div>
      )}
    </div>
  )
}

export default NumberOption
