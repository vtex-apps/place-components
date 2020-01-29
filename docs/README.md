# Place Components

The Place Components are three components (`PlaceDetails`, `AddressForm`, and `LocationForm`) that are meant to replace the [AddressForm](https://github.com/vtex/address-form) repository.

The Place Components should always be rendered inside their wrapper orchestrator, called [AddressContext](https://github.com/vtex-apps/address-context).

For all the following components, you can run tests with `vtex test` from the root repository.

To test internationalization, you can switch the locale information by adding the query string `?cultureInfo={locale}`, like `?cultureInfo=en`. More information in the [Locale Switcher repository](https://github.com/vtex-apps/locale-switcher).

Country data is sorted according to [Figma designs](https://www.figma.com/file/umwHrHA8nifvQIPEN3DHpX/Onda-Store---Place-Components?node-id=0%3A1) for this project, more specifically, to the [spreadsheet](https://docs.google.com/spreadsheets/d/1_sbwzLlgzFPsddPRTq6kcpbMyoxgOBfb1T8YRQs3k7k/edit#gid=0) defining details about the fields. Also, the label of each field, which corresponds to the "fantasy name", is placed first.

## Place Details

The Place Details component displays a summary of a place according to the address it receives from the wrapper orchestrator, and the description of the structure that receives as prop, that can be:

- Minimal
- Compact
- Extended

## Address Form

The Address Form component displays inputs and selects to add/edit information contained in the `Address` object it receives as prop from the wrapper orchestrator, and it also displays already filled data using the `PlaceDetails` component.

At first, the `AddressForm` renders a `PlaceDetails` with compact display mode, and edit button, and the rest of the fields as inputs/selects to complete the information. When the user clicks the edit button, it changes to render a `PlaceDetails` component in minimal display mode, and the rest of the fields as inputs/selects.

In the previous [AddressForm](https://github.com/vtex/address-form) repository, some of the fields are rendered as dropdowns, and some of those dropdowns depend on another (imagine selecting state, and then selecting city). In the new place components, that complex logic is only meant for the `LocationForm` (that is, when first selecting the address).

## Location Form

To be done.
