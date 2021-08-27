import React from 'react'

function useDisableButtonOnInvalidLength(elements: string[]): [isButtonDisabled: () => boolean] {
 // useMemo to prevent rerender
  const invalidLength = React.useMemo(() => [0, undefined, null], []);
  const checkButtonDisabled = React.useCallback(
    () =>
    elements?.map(element => element?.trim().length)
    .filter(elementLength => invalidLength.includes(elementLength)).length !== 0,
    [elements, invalidLength]
  );
 return [checkButtonDisabled]
}

export default useDisableButtonOnInvalidLength;