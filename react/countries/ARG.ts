import { CountryRules } from '../typings/countryRulesTypes'

const rules: CountryRules = {
  fields: {
    country: {
      label: 'country',
      hidden: true,
      maxLength: 100,
      size: 'medium',
    },
    state: {
      label: 'state',
      // Not for now...
    },
    city: {
      label: 'city',
      // Not for now...
    },
    neighborhood: {
      label: 'neighborhood',
      hidden: true,
      maxLength: 100,
      size: 'large',
      required: true,
    },
    street: {
      label: 'streetRoadAvenue',
      required: true,
      size: 'xlarge',
    },
    number: {
      label: 'numberOption',
      maxLength: 750,
      required: true,
      size: 'mini',
      autoComplete: 'nope',
    },
    complement: {
      label: 'complement',
      maxLength: 750,
      size: 'large',
    },
    reference: {
      label: 'reference',
      hidden: true,
      maxLength: 750,
      size: 'xlarge',
    },
    receiverName: {
      label: 'receiverName',
      elementName: 'receiver',
      maxLength: 750,
      size: 'xlarge',
      required: true,
    },
  },
  display: {
    minimal: [[{ name: 'postalCode' }]],
    compact: [
      [{ name: 'street' }, { delimiter: ' ', name: 'number' }],
      [{ name: 'postalCode' }, { delimiter: ' ', name: 'city' }],
    ],
    extended: [
      [{ name: 'receiverName' }],
      [{ name: 'street' }, { delimiter: ' ', name: 'number' }],
      [{ name: 'complement' }],
      [{ name: 'postalCode' }, { delimiter: ' ', name: 'city' }],
    ],
  },
}

export default rules
