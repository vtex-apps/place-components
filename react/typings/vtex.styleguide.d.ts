/* eslint-disable import/order */

import * as Styleguide from 'vtex.styleguide'

declare module 'vtex.styleguide' {
  import React from 'react'

  export const Button: React.FC

  export const Input: React.FC

  export const InputButton: React.FC

  export const Spinner: React.FC

  export const IconLocation: React.FC

  export const Checkbox: React.FC

  export const Dropdown: React.FC

  export const IconSearch: React.FC
}
