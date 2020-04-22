const rules: CountryRules = {
  fields: {
    country: {
      label: 'country',
      hidden: true,
      maxLength: 100,
    },
    state: {
      label: 'stateAbbreviation',
      maxLength: 100,
      required: true,
      optionsCaption: 'UF',
      options: [
        { label: 'Acre', value: 'AC' },
        { label: 'Alagoas', value: 'AL' },
        { label: 'Amapá', value: 'AP' },
        { label: 'Amazonas', value: 'AM' },
        { label: 'Bahia', value: 'BA' },
        { label: 'Ceará', value: 'CE' },
        { label: 'Distrito Federal', value: 'DF' },
        { label: 'Espírito Santo', value: 'ES' },
        { label: 'Goiás', value: 'GO' },
        { label: 'Maranhão', value: 'MA' },
        { label: 'Mato Grosso', value: 'MT' },
        { label: 'Mato Grosso do Sul', value: 'MS' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Pará', value: 'PA' },
        { label: 'Paraíba', value: 'PB' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Pernambuco', value: 'PE' },
        { label: 'Piauí', value: 'PI' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Rio Grande do Norte', value: 'RN' },
        { label: 'Rio Grande do Sul', value: 'RS' },
        { label: 'Rondônia', value: 'RO' },
        { label: 'Roraima', value: 'RR' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'São Paulo', value: 'SP' },
        { label: 'Sergipe', value: 'SE' },
        { label: 'Tocantins', value: 'TO' },
      ],
    },
    city: {
      label: 'city',
      maxLength: 100,
      required: true,
    },
    neighborhood: {
      label: 'neighborhood',
      maxLength: 100,
      required: true,
    },
    street: {
      label: 'streetRoadAvenue',
      required: true,
    },
    number: {
      label: 'numberOption',
      maxLength: 750,
      required: true,
      autoComplete: 'nope',
    },
    complement: {
      label: 'complement',
      maxLength: 750,
    },
    reference: {
      label: 'reference',
      hidden: true,
      maxLength: 750,
    },
    receiverName: {
      label: 'receiverName',
      elementName: 'receiver',
      maxLength: 750,
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
          name: 'state',
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
          name: 'state',
        },
      ],
      [{ name: 'postalCode' }],
    ],
  },
}

export default rules
