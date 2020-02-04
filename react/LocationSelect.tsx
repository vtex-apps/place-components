import React, { useState } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import rules from './countries/rules'
import { Dropdown } from 'vtex.styleguide'

/*
const LocationSelect: StorefrontFunctionComponent<{}> = () => {
  const { address } = useAddressContext()
  const countryRules = rules[address.country]
  const countryData = countryRules?.locationSelect?.countryData
  const fields = countryRules?.locationSelect?.fields
  const [completed , setCompleted] = useState([])

  return fields.map((
    { name, label } _: any,
    index: number , fields
  ) => {
    const getDropdownOptions = () => {
      return Object.keys(
        completed.reduce((obj, curr) => obj[curr], countryData)
      )
    }

    const getDropdownProps = () => {
      return {
        disabled: index > completed.length,
        options: index == completed.length ? getDropdownOptions() : [],
      }
    }

    return <Dropdown {...getDropdownProps()} key={index} />
  })
}*/

const LocationSelect: StorefrontFunctionComponent<{}> = () => {
  const { address } = useAddressContext()
  const countryRules = rules[address.country]
  if (!countryRules.locationSelect) {
    return (
      <div>
        The LocationSelect component is not applicable to this country :'(
      </div>
    )
  }
  const { countryData, fields } = countryRules.locationSelect
  const [completed, setCompleted] = useState([])

  console.log(countryData)
  console.log(fields)
  console.log(setCompleted)

  return (
    <div>
      {fields.map((_: any, index: number) => {
        const getDropdownOptions = () => {
          return Object.keys(countryData)
        }

        const getDropdownProps = () => {
          return {
            disabled: index > completed.length,
            options: index == completed.length ? getDropdownOptions() : [],
          }
        }

        return <Dropdown {...getDropdownProps()} key={index} />
      })}
    </div>
  )
}

export default LocationSelect
