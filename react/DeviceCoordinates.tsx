import React, { useState } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { ButtonPlain } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { LocationRequestIcon } from './images/LocationRequestIcon'
import { LocationConceivedIcon } from './images/LocationRequestIcon'
import { Spinner } from 'vtex.styleguide'

enum State {
  OFF,
  ON,
  LOADING,
}

const DeviceCoordinates: StorefrontFunctionComponent<{}> = () => {
  const { address, setAddress, countries } = useAddressContext()
  const [state, setState] = useState<State>(State.OFF)

  console.log(address, setAddress, countries, setState)

  const renderIcon = () => {
    let icon = null

    switch (state) {
      case State.OFF:
        icon = <LocationRequestIcon />
        break
      case State.ON:
        icon = <LocationConceivedIcon />
        break
      case State.LOADING:
        icon = <Spinner />
        break
    }

    return icon
  }

  return (
    <div>
      <ButtonPlain>
        {renderIcon()}
        <FormattedMessage id="place-components.label.useCurrentLocation" />
      </ButtonPlain>
    </div>
  )
}

export default DeviceCoordinates
