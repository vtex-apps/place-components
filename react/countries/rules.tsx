import ARG from './ARG'
import BRA from './BRA'
import KOR from './KOR'
import { CountryRules } from '../typings/countryRulesTypes.d'

const rules: { [key: string]: CountryRules } = {
  ARG,
  BRA,
  KOR,
}

export default rules
