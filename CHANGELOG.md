# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2020-03-20

### Added

- `LocationInput` component.
- Styling to `AddressForm` and others.

## [0.5.0] - 2020-03-16

### Added

- `DeviceCoordinates` component.

## [0.4.0] - 2020-02-27

### Added

- LocationCountry (that uses country from store settings as first option)
- LocationSelect
- Bolivia country JSON
- Initial styling to `AddressForm` (max/min width depending on fantasy name)

### Removed

- `size` property from country JSON objects

## [0.3.0] - 2020-02-17

### Added

- `LocaleSwitcher` dependency to handle locale query strings
- Internationalization
- Max length, and required validations
- Added mock for `AddressContext`
- Added JSON in new format for `ARG`, `BRA` and `USA`, and their TS interface definitions

### Changed

- `AddressForm` now contains an instance of `PlaceDetails`, and an edit button
- `PlaceDetails` and `AddressForm` now consume `address` information directly from `AddressContext` orchestrator
- Simplified `PlaceDetails` tests

## [0.0.4] - 2020-01-17

### Added

- New `AddressContext` dependency (orchestrator component) that provides means to alter global address object.
- New `AddressForm` component

### Changed

- The component should be tested in the `/places` route now, isolated from the rest of the store.

## [0.0.3] - 2020-01-17

### Added

- Automated tests for the PlaceDetails component

### Changed

- Separated PlaceDetails component from the rendered component that adds a Dropdown

## [0.0.2] - 2020-01-09

### Added

- Initial implementation of the PlaceDetails UI component
- Test component that renders PlaceDetails with a Dropdown to select country

## [0.0.1] - 2019-09-23

### Added

- **Component** Create the VTEX Store Component _IO Base App_
