import { CountryRules } from '../typings/countryRulesTypes'

const rules: CountryRules = {
  fields: {
    country: {
      hidden: true,
      maxLength: 100,
      label: 'country',
      size: 'medium',
      required: true,
    },
    street: {
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    number: {
      maxLength: 750,
      label: 'number',
      required: true,
      size: 'mini',
      autoComplete: 'nope',
    },
    complement: {
      maxLength: 750,
      label: 'complement',
      size: 'large',
    },
    reference: {
      hidden: true,
      maxLength: 750,
      label: 'reference',
      size: 'xlarge',
    },
    neighborhood: {
      hidden: true,
      maxLength: 100,
      label: 'neighborhood',
      size: 'large',
    },
    state: {
      // Not for now...
    },
    city: {
      // Not for now...
    },
    receiverName: {
      elementName: 'receiver',
      maxLength: 750,
      label: 'receiverName',
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
