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
  numberOption: {
    defaultMessage: '',
    id: 'place-components.label.numberOption',
  },
})

type LabelType = keyof (typeof messages)

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
    const field = rules[address.country].fields.number
    if (!field) return null
    const { maxLength, autoComplete, required } = field
    const label = <FormattedMessage {...messages[field.label as LabelType]} />

    const value = address.number
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
        <FormattedMessage id={`place-components.error.fieldRequired`} />
      ),
    }

    return {
      label,
      value,
      onChange,
      disabled,
      ...(maxLength && { maxLength }),
      ...(autoComplete && { autoComplete }),
      ...(required && address.number.length == 0 && fieldRequired),
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
      label: <FormattedMessage id="place-components.label.withoutNumber" />,
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
