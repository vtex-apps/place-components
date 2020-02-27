import React, { useState, useEffect, useCallback } from 'react'
import GET_ADDRESS_FROM_GEOCOORDINATES from './graphql/queries.graphql'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { ButtonPlain, Spinner, Tooltip, IconLocation } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useLazyQuery } from 'react-apollo'

enum State {
  PROMPT,
  GRANTED,
  LOADING,
  DENIED,
}

const DeviceCoordinates: StorefrontFunctionComponent<{}> = () => {
  const { setAddress } = useAddressContext()
  const [state, setState] = useState<State>(State.PROMPT)
  const [getAddressFromGeocoordinates, { error, loading, data }] = useLazyQuery(
    GET_ADDRESS_FROM_GEOCOORDINATES
  )

  if (data) {
    setAddress(data.reverseGeocode)
  }

  if (error) {
    console.warn(`error ${error.message}`)
  }

  const onGetCurrentPositionSuccess = useCallback(
    ({ coords }: Position) => {
      console.log('Success!')
      getAddressFromGeocoordinates({
        variables: {
          lat: coords.latitude.toString(),
          lng: coords.longitude.toString(),
          apiKey: 'PUT API KEY HERE',
        },
      })

      setState(State.GRANTED)
    },
    [getAddressFromGeocoordinates]
  )

  const onGetCurrentPositionError = useCallback((err: PositionError) => {
    setState(State.DENIED)
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }, [])

  const onButtonClick = useCallback(() => {
    setState(State.LOADING)
    navigator.geolocation.getCurrentPosition(
      onGetCurrentPositionSuccess,
      onGetCurrentPositionError,
      {
        enableHighAccuracy: true,
      }
    )
  }, [onGetCurrentPositionSuccess, onGetCurrentPositionError])

  useEffect(() => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((result: { state: string }) => {
        if (result.state === 'granted') {
          onButtonClick()
        } else if (result.state === 'denied') {
          setState(State.DENIED)
        }
      })
  }, [onButtonClick])

  const renderIcon = () => {
    let icon = null

    switch (state) {
      case State.PROMPT:
        icon = <IconLocation block />
        break
      case State.GRANTED:
        icon = <IconLocation solid block />
        break
      case State.LOADING:
        icon = <Spinner size={16} block />
        break
      case State.DENIED:
        icon = <IconLocation block />
        break
    }

    if (loading) {
      icon = <Spinner size={16} />
    }

    return <div className="mr3">{icon}</div>
  }

  let buttonElement = (
    <ButtonPlain disabled={state === State.DENIED} onClick={onButtonClick}>
      <div className="flex items-center">
        <div className="flex-none">{renderIcon()}</div>
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
