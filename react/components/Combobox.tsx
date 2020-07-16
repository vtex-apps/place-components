import {
  Combobox as ReachCombobox,
  ComboboxInput as ReachComboboxInput,
  ComboboxInputProps as ReachComboboxInputProps,
  ComboboxPopover as ReachComboboxPopover,
  ComboboxPopoverProps as ReachComboboxPopoverProps,
  ComboboxList as ReachComboboxList,
  ComboboxListProps as ReachComboboxListProps,
  ComboboxOption as ReachComboboxOption,
  ComboboxOptionProps as ReachComboboxOptionProps,
} from '@reach/combobox'
import React from 'react'
import classNames from 'classnames'

import styles from './Combobox.css'

export const Combobox = ReachCombobox

export const ComboboxInput = ReachComboboxInput

export const ComboboxPopover: React.FC<ReachComboboxPopoverProps & {
  className?: string
}> = ({ className, ...props }) => (
  <ReachComboboxPopover
    {...props}
    className={classNames(
      className,
      styles.popover,
      'bg-base list ma0 pa0 outline-0'
    )}
  />
)

export const ComboboxList = ReachComboboxList

export const ComboboxOption = ReachComboboxOption

export default {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
}
