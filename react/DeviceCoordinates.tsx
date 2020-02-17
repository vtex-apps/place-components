import React, { useState, useEffect } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { ButtonPlain, Spinner, Tooltip } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { LocationRequestIcon } from './images/LocationRequestIcon'
import { LocationConceivedIcon } from './images/LocationConceivedIcon'

enum State {
  PROMPT,
  GRANTED,
  LOADING,
  DENIED,
}

const colors = {
  blue: '#134cd8',
  gray: '#979899',
}

const DeviceCoordinates: StorefrontFunctionComponent<{}> = () => {
  const { address, setAddress } = useAddressContext()
  const [state, setState] = useState<State>(State.PROMPT)

  useEffect(() => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((result: { state: string }) => {
        if (result.state === 'granted') {
          setState(State.GRANTED)
        } else if (result.state === 'denied') {
          setState(State.DENIED)
        }
      })
  }, [])

  const onGetCurrentPositionSuccess = ({ coords }: Position) => {
    console.log(coords.latitude)
    console.log(coords.longitude)

    setAddress({
      ...address,
      geoCoordinates: [coords.latitude, coords.longitude],
    })
    setState(State.GRANTED)
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
    setState(
      State.LOADING
    ) /* No guarantee that this will run before onGetCurrentPositionSuccess setState! */
  }

  const renderIcon = () => {
    let icon = null

    switch (state) {
      case State.PROMPT:
        icon = <LocationRequestIcon color={colors.blue} />
        break
      case State.GRANTED:
        icon = <LocationConceivedIcon color={colors.blue} />
        break
      case State.LOADING:
        icon = <Spinner size={16} />
        break
      case State.DENIED:
        icon = <LocationRequestIcon color={colors.gray} />
        break
    }

    return icon
  }

  const renderButton = () => {
    const buttonProps = {
      disabled: state === State.DENIED,
      onClick: onButtonClick,
    }

    return (
      <ButtonPlain {...buttonProps}>
        {renderIcon()}
        <FormattedMessage id="place-components.label.useCurrentLocation" />
      </ButtonPlain>
    )
  }

  return (
    <div>
      {state === State.DENIED ? (
        <Tooltip label="Permission not granted">{renderButton()}</Tooltip>
      ) : (
        renderButton()
      )}
    </div>
  )
}

export default DeviceCoordinates
