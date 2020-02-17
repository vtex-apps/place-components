import ARG from './ARG'
import BRA from './BRA'
import USA from './USA'
import { CountryRules } from '../typings/countryRulesTypes.d'

const rules: { [key: string]: CountryRules } = {
  ARG,
  BRA,
  USA,
}

export default rules
