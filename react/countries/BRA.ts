import { CountryRules } from '../typings/countryRulesTypes.d'

const rules: CountryRules = {
  fields: {
    country: {
      hidden: true,
      maxLength: 100,
      label: 'country',
      size: 'medium',
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
    neighborhood: {
      maxLength: 100,
      label: 'neighborhood',
      required: true,
      size: 'large',
    },
    reference: {
      hidden: true,
      maxLength: 750,
      label: 'reference',
      size: 'xlarge',
    },
    city: {
      maxLength: 100,
      label: 'city',
      required: true,
      size: 'large',
    },
    state: {
      maxLength: 100,
      label: 'state',
      required: true,
      size: 'mini',
      optionsCaption: 'UF',
      options: [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
      ],
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
      [{ name: 'neighborhood' }],
      [
        { name: 'city' },
        {
          delimiter: ' - ',
          name:
            'state' /* According to Davi's designs, it should be stateAbbreviation  */,
        },
      ],
      [{ name: 'postalCode' }],
    ],
    extended: [
      [{ name: 'receiverName' }],
      [{ name: 'street' }, { delimiter: ' ', name: 'number' }],
      [{ name: 'complement' }],
      [{ name: 'neighborhood' }],
      [
        { name: 'city' },
        {
          delimiter: ' - ',
          name:
            'state' /* According to Davi's designs, it should be stateAbbreviation  */,
        },
      ],
      [{ name: 'postalCode' }],
    ],
  },
}

export default rules
