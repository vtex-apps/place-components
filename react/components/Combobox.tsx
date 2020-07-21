import {
  Combobox as ReachCombobox,
  ComboboxInput as ReachComboboxInput,
  ComboboxPopover as ReachComboboxPopover,
  ComboboxPopoverProps as ReachComboboxPopoverProps,
  ComboboxList as ReachComboboxList,
  ComboboxListProps as ReachComboboxListProps,
  ComboboxOption as ReachComboboxOption,
  ComboboxOptionProps as ReachComboboxOptionProps,
  ComboboxOptionText as ReachComboboxOptionText,
} from '@reach/combobox'
import { PopoverProps } from '@reach/popover'
import React, { forwardRef } from 'react'
import classNames from 'classnames'

import styles from './Combobox.css'

export const Combobox = ReachCombobox

export const ComboboxInput = ReachComboboxInput

export const ComboboxPopover = forwardRef<
  HTMLDivElement,
  ReachComboboxPopoverProps &
    Partial<PopoverProps> &
    React.RefAttributes<HTMLDivElement>
>(function ComboboxPopover({ className, ...props }, ref) {
  return (
    <ReachComboboxPopover
      {...props}
      ref={ref}
      className={classNames(
        className,
        styles.popover,
        'bg-base pv3 mt2 br2 ba bw1 b--muted-4 absolute outline-0'
      )}
    />
  )
})

export const ComboboxList: React.FC<ReachComboboxListProps & {
  className?: string
}> = ({ className, ...props }) => (
  <ReachComboboxList
    {...props}
    className={classNames(className, 'bg-base list ma0 pa0 outline-0')}
  />
)

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="none"
  >
    <path
      d="M7.04917 0C3.12177 0 0 3.1 0 7C0 8.56189 0.476353 10.0562 1.42906 11.2607C1.50908 11.3782 1.60101 11.4919 1.70535 11.6007L5.19589 15.2393C5.63744 15.6996 6.21111 15.9534 6.79833 16.0006C6.97371 16.0366 7.15342 16.0328 7.31309 15.9891C7.86105 15.9204 8.39053 15.6705 8.80411 15.2393L12.2946 11.6007C12.4052 11.4855 12.5017 11.3647 12.585 11.2399C13.5268 10.039 13.9976 8.55289 13.9976 7C14.0983 3.1 10.9766 0 7.04917 0ZM9.56673 6.5C9.56673 7.88071 8.43958 9 7.04917 9C5.65876 9 4.53161 7.88071 4.53161 6.5C4.53161 5.11929 5.65876 4 7.04917 4C8.43958 4 9.56673 5.11929 9.56673 6.5Z"
      fill="currentColor"
    />
  </svg>
)

export const ComboboxOption: React.FC<ReachComboboxOptionProps & {
  className?: string
}> = ({ className, children, ...props }) => (
  <ReachComboboxOption
    {...props}
    className={classNames(
      className,
      styles.option,
      'flex items-center pointer bg-action-secondary pv3 ph5'
    )}
  >
    {children ?? (
      <>
        <Icon className="flex-shrink-0 mr4" />
        <div className="truncate">
          <ReachComboboxOptionText />
        </div>
      </>
    )}
  </ReachComboboxOption>
)

export default {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
}
