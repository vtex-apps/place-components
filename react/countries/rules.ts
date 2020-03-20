import React from 'react'

import ARG from './ARG'
import BOL from './BOL'
import BRA from './BRA'
import USA from './USA'
import { CountryRules } from '../typings/countryRulesTypes.d'

const rules: { [key: string]: CountryRules } = {
  ARG,
  BOL,
  BRA,
  USA,
}

export const styleRules: {
  [key: string]: React.CSSProperties
} = {
  complement: {
    minWidth: 199,
    maxWidth: 512,
  },
  number: {
    minWidth: 71,
    maxWidth: 128,
  },
  numberOption: {
    minWidth: 256,
    maxWidth: 256,
  },
  streetRoadAvenue: {
    minWidth: 256,
    maxWidth: 512,
  },
  neighborhood: {
    minWidth: 256,
    maxWidth: 256,
  },
  addressLine1: {
    minWidth: 256,
    maxWidth: 512,
  },
  addressLine2: {
    minWidth: 256,
    maxWidth: 512,
  },
  city: {
    minWidth: 199,
    maxWidth: 256,
  },
  canton: {
    minWidth: 256,
    maxWidth: 256,
  },
  province: {
    minWidth: 128,
    maxWidth: 256,
  },
  address: {
    minWidth: 256,
    maxWidth: 512,
  },
  town: {
    minWidth: 256,
    maxWidth: 256,
  },
  county: {
    minWidth: 256,
    maxWidth: 256,
  },
  interiorNo: {
    minWidth: 256,
    maxWidth: 256,
  },
  exteriorNoOption: {
    minWidth: 256,
    maxWidth: 256,
  },
  colony: {
    minWidth: 256,
    maxWidth: 256,
  },
  municipalityDelegation: {
    minWidth: 256,
    maxWidth: 256,
  },
  stateAbbreviation: {
    minWidth: 128,
    maxWidth: 128,
  },
  state: {
    minWidth: 256,
    maxWidth: 256,
  },
  locality: {
    minWidth: 256,
    maxWidth: 256,
  },
  deliveryInstructions: {
    minWidth: 256,
    maxWidth: 512,
  },
  department: {
    minWidth: 256,
    maxWidth: 256,
  },
  addressLine3: {
    minWidth: 256,
    maxWidth: 512,
  },
  parish: {
    minWidth: 256,
    maxWidth: 256,
  },
}

export default rules
