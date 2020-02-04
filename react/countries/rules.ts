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
    minWidth: '199px',
    maxWidth: '512px',
  },
  number: {
    minWidth: '71px',
    maxWidth: '128px',
  },
  'number-option': {
    minWidth: '256px',
    maxWidth: '256px',
  },
  'street-road-avenue': {
    minWidth: '256px',
    maxWidth: '512px',
  },
  neighborhood: {
    minWidth: '256px',
    maxWidth: '256px',
  },
  addressLine1: {
    minWidth: '256px',
    maxWidth: '512px',
  },
  addressLine2: {
    minWidth: '256px',
    maxWidth: '512px',
  },
  city: {
    minWidth: '199px',
    maxWidth: '256px',
  },
  canton: {
    minWidth: '256px',
    maxWidth: '256px',
  },
  province: {
    minWidth: '128px',
    maxWidth: '256px',
  },
  address: {
    minWidth: '256px',
    maxWidth: '512px',
  },
  town: {
    minWidth: '256px',
    maxWidth: '256px',
  },
  county: {
    minWidth: '256px',
    maxWidth: '256px',
  },
  interiorNo: {
    minWidth: '256px',
    maxWidth: '256px',
  },
  'exteriorNo-option': {
    minWidth: '256px',
    maxWidth: '256px',
  },
  colony: {
    minWidth: '256px',
    maxWidth: '256px',
  },
  'municipality-delegation': {
    minWidth: '256px',
    maxWidth: '256px',
  },
  stateAbbreviation: {
    minWidth: '128px',
    maxWidth: '128px',
  },
  state: {
    minWidth: '256px',
    maxWidth: '256px',
  },
  locality: {
    minWidth: '256px',
    maxWidth: '256px',
  },
  deliveryInstructions: {
    minWidth: '256px',
    maxWidth: '512px',
  },
  department: {
    minWidth: '256px',
    maxWidth: '256px',
  },
  addressLine3: {
    minWidth: '256px',
    maxWidth: '512px',
  },
  parish: {
    minWidth: '256px',
    maxWidth: '256px',
  },
}

export default rules
