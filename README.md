# Readme

_TLDR: To add a new step, add it to the `Steps` enum. To have different transitions, edit the `useSteps` hook and to plug in different components, change the return value in `Buyflow.tsx`_

This is the code and architecture documentation. If you need help starting the server, please have a look at the [create react app docs.](.README_create-react-app.md)

## Steps

The `Steps` enum represents the possible states that the form can be in. Depending on the current step, the `Buyflow` renders a different input

### Adding a new step

- Add a new value to the `Step` enum
- Add/Change the transitions in the `useSteps` hook to fit your needs
- Create the new step component
- If your new step inputs new data, add a new state to the Buyflow
- plug in conditional rendering to the Buyflow and handle the data accordingly

## Data handling

### Current states

As is best practice, the states are handled in the single, quite high level place `Buyflow`. While `App` is the root of the application, `Buyflow` is where I would probably plug in the `<form>` element and send the data to the server, so this is the place to go.

### Data usage

Each step gets the data it needs as prop. This makes sure that the step component rerenders upon changes and is always on the latest state. Other than that, it ensures reusability in other places, as it gets the data from outside and also prevents invalid/stale states in the component, as it is stateless.

### Data updates

In order to update data in the `Buyflow`, every `Step` is supposed to emit the input data in a callback which is supposed to start with the prefix `on`, as is standard in HTML (e.g. `onDataChange`).

That again ensures reusability in other places.

### Data validation

Currently, there are not many validations in place, but the `useInvalidLenghtCheck` returns a good starting point to make sure it is not possible to input any string that is or boils down to something empty.

Simply plug the returned function as the `disabled` prop of the `next` button in your step, providing the values to be validated as a string array parameter.

## Next up - What would I add next?

- move a lot of the dependencies to the devDependencies. This just does not work in codesandbox
- The submit to the server - pretty useless form otherwise :)
- A back button
  - Allow going back to the previous form
  - Cheap to do, just add another transition function to the `useSteps` and plug in a new button
- Saving the dirty form to the local storage
  - Promt the user if they want to restart all over or continue where they left off
- Maybe add the form as url parameters to make sharing a link easy
