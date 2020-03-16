import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { ButtonPlain, Spinner, Tooltip, IconLocation } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useLazyQuery } from 'react-apollo'

import REVERSE_GEOCODE_QUERY from './graphql/reverseGeocode.graphql'

enum State {
  PROMPT,
  GRANTED,
  LOADING,
  DENIED,
}

const DeviceCoordinates: StorefrontFunctionComponent = () => {
  const { setAddress } = useAddressContext()
  const [state, setState] = useState<State>(State.PROMPT)
  const [executeReverseGeocode, { error, loading, data }] = useLazyQuery(
    REVERSE_GEOCODE_QUERY
  )

  useEffect(() => {
    if (data) {
      setState(State.GRANTED)
      setAddress(data.reverseGeocode)
    } else if (loading) {
      setState(State.LOADING)
    } else if (error) {
      console.warn(`error ${error.message}`)
    }
  }, [data, error, loading, setAddress])

  const onGetCurrentPositionSuccess = useCallback(
    ({ coords }: Position) => {
      setState(State.GRANTED)

      executeReverseGeocode({
        variables: {
          lat: coords.latitude.toString(),
          lng: coords.longitude.toString(),
        },
      })
    },
    [executeReverseGeocode]
  )

  const onGetCurrentPositionError = useCallback((err: PositionError) => {
    setState(State.DENIED)
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }, [])

  const requestGeolocation = useCallback(() => {
    setState(State.LOADING)
    navigator.geolocation.getCurrentPosition(
      onGetCurrentPositionSuccess,
      onGetCurrentPositionError,
      {
        enableHighAccuracy: true,
      }
    )
  }, [onGetCurrentPositionError, onGetCurrentPositionSuccess])

  const handleButtonClick = () => {
    requestGeolocation()
  }

  useEffect(() => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((result: { state: string }) => {
        if (result.state === 'granted') {
          requestGeolocation()
        } else if (result.state === 'denied') {
          setState(State.DENIED)
        }
      })
  }, [requestGeolocation])

  const icon = useMemo(() => {
    let iconElement = null

    switch (state) {
      case State.PROMPT:
        iconElement = <IconLocation block />
        break
      case State.GRANTED:
        iconElement = <IconLocation solid block />
        break
      case State.LOADING:
        iconElement = <Spinner size={16} block />
        break
      case State.DENIED:
        iconElement = <IconLocation block />
        break
      default:
    }

    return <div className="mr3">{iconElement}</div>
  }, [state])

  let buttonElement = (
    <ButtonPlain disabled={state === State.DENIED} onClick={handleButtonClick}>
      <div className="flex items-center">
        <div className="flex-none">{icon}</div>
        <div className="flex-auto">
          <FormattedMessage id="place-components.label.useCurrentLocation" />
        </div>
      </div>
    </ButtonPlain>
  )

  if (state === State.DENIED) {
    buttonElement = (
      <Tooltip label="Permission not granted">{buttonElement}</Tooltip>
    )
  }

  return buttonElement
}

export default DeviceCoordinates
