import React, { useState } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { ButtonPlain } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { LocationRequestIcon } from './images/LocationRequestIcon'
import { LocationConceivedIcon } from './images/LocationConceivedIcon'
import { Spinner } from 'vtex.styleguide'

enum State {
  OFF,
  ON,
  LOADING,
  DENIED,
}

const colors = {
  blue: '#134cd8',
  gray: '#979899',
}

const DeviceCoordinates: StorefrontFunctionComponent<{}> = () => {
  const { address, setAddress, countries } = useAddressContext()
  const [state, setState] = useState<State>(State.OFF)

  console.log(address, setAddress, countries, setState)

  const renderIcon = () => {
    let icon = null

    switch (state) {
      case State.OFF:
        icon = <LocationRequestIcon color={colors.blue} />
        break
      case State.ON:
        icon = <LocationConceivedIcon color={colors.blue} />
        break
      case State.LOADING:
        icon = <Spinner size={20} />
        break
      case State.DENIED:
        icon = <LocationRequestIcon color={colors.gray} />
        break
    }

    return icon
  }

  const onGetCurrentPositionSuccess = ({ coords }: Position) => {
    console.log(coords.latitude)
    console.log(coords.longitude)

    setAddress({
      ...address,
      geoCoordinates: [coords.latitude, coords.longitude],
    })
    setState(State.ON)
  }

  const onGetCurrentPositionError = (err: PositionError) => {
    setState(State.DENIED)
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  const onButtonClick = () => {
    navigator.geolocation.getCurrentPosition(
      onGetCurrentPositionSuccess,
      onGetCurrentPositionError,
      {
        enableHighAccuracy: true,
      }
    )
  }

  const buttonProps = {
    disabled: state === State.DENIED,
    onClick: onButtonClick,
  }

  return (
    <div>
      <ButtonPlain {...buttonProps}>
        {renderIcon()}
        <FormattedMessage id="place-components.label.useCurrentLocation" />
      </ButtonPlain>
    </div>
  )
}

export default DeviceCoordinates
