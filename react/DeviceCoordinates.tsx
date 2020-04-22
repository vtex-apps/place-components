import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useAddressContext } from 'vtex.address-context/AddressContext'
import { ButtonPlain, Spinner, Tooltip, IconLocation } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useLazyQuery } from 'react-apollo'

import REVERSE_GEOCODE_QUERY from './graphql/reverseGeocode.graphql'

enum PermissionState {
  PROMPT,
  PENDING,
  GRANTED,
  DENIED,
}

const DeviceCoordinates: React.FC = () => {
  const { setAddress } = useAddressContext()
  const [geolocationPermission, setGeolocationPermission] = useState<
    PermissionState
  >(PermissionState.PROMPT)
  const [executeReverseGeocode, { error, loading, data }] = useLazyQuery(
    REVERSE_GEOCODE_QUERY
  )

  useEffect(() => {
    if (data) {
      setAddress(data.reverseGeocode)
    }

    if (error) {
      console.warn(error.message)
    }
  }, [data, error, loading, setAddress])

  const onGetCurrentPositionSuccess = useCallback(
    ({ coords }: Position) => {
      setGeolocationPermission(PermissionState.GRANTED)

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
    setGeolocationPermission(PermissionState.DENIED)
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }, [])

  const requestGeolocation = useCallback(() => {
    setGeolocationPermission(PermissionState.PENDING)
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
      .then((result: PermissionStatus) => {
        if (result.state === 'granted') {
          requestGeolocation()
        } else if (result.state === 'denied') {
          setGeolocationPermission(PermissionState.DENIED)
        }
      })
  }, [requestGeolocation])

  const locationIcon = useMemo(() => {
    switch (geolocationPermission) {
      case PermissionState.PROMPT:
        return <IconLocation block />
      case PermissionState.GRANTED:
        return <IconLocation solid block />
      case PermissionState.PENDING:
        return <Spinner size={16} block />
      case PermissionState.DENIED:
        return <IconLocation block />
      default:
        return null
    }
  }, [geolocationPermission])

  let buttonElement = (
    <ButtonPlain
      disabled={geolocationPermission === PermissionState.DENIED}
      onClick={handleButtonClick}
    >
      <div className="flex items-center">
        <div className="flex-none mr3">
          {loading ? <Spinner size={16} /> : locationIcon}
        </div>
        <div className="flex-auto">
          <FormattedMessage id="place-components.label.useCurrentLocation" />
        </div>
      </div>
    </ButtonPlain>
  )

  if (geolocationPermission === PermissionState.DENIED) {
    buttonElement = (
      <Tooltip label="Permission not granted">{buttonElement}</Tooltip>
    )
  }

  return buttonElement
}

export default DeviceCoordinates
