import React, { useState } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { Input, Checkbox } from 'vtex.styleguide'
import { FormattedMessage, useIntl, defineMessages } from 'react-intl'
import { Address } from 'vtex.checkout-graphql'

import rules from '../countries/rules'

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
  name: string
  label: React.ReactNode
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
  maxLength?: number
  autoComplete?: string
}

const NumberOption: React.FC<Props> = ({ showCheckbox, ...props }) => {
  const intl = useIntl()
  const { setAddress } = useAddressContext()
  const [disabled, setDisabled] = useState(false)

  const onCheckboxChange = () => {
    setAddress((prevAddress: Address) => ({
      ...prevAddress,
      number: disabled ? '-' : intl.formatMessage(messages.wn),
    }))
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
        <Input {...props} disabled={disabled || props.disabled} />
      </div>
      {showCheckbox && (
        <div className="flex-none h-regular ml5 mt7 flex items-center">
          <Checkbox {...checkboxProps} />
        </div>
      )}
    </div>
  )
}

export default NumberOption
