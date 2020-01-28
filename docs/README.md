# Place Components

The Place Components should always be rendered inside their wrapper orchestrator, called [AddressContext](https://github.com/vtex-apps/address-context).

For all the following components, you can run tests with `vtex test` from the root repository.

To test internationalization, you can switch the locale information by adding the query string `?cultureInfo={locale}`, like `?cultureInfo=en`. More information in the [Locale Switcher repository](https://github.com/vtex-apps/locale-switcher).

## Place Details

The Place Details component displays a summary of a place according to the address and structure it receives as props from the wrapper orchestrator.

## Address Form

The Address Form component displays inputs and selects to add/edit information contained in the `Address` object it receives as prop from the wrapper orchestrator.

## Location Form

To be done.
