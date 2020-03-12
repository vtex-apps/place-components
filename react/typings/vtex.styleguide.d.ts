/* eslint-disable import/order */

import * as Styleguide from 'vtex.styleguide'

declare module 'vtex.styleguide' {
  import React from 'react'

  export const Input: React.FC

  export const Spinner: React.FC

  export const IconLocation: React.FC
}
