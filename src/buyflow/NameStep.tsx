import React from "react";
import NameInput from "./NameInput";
import useDisableButtonOnInvalidLength from "./UseInvalidLengthCheck";

interface NameStepProps {
  name: string;
  firstName: string;
  onSetName: (name: string) => void;
  onSetFirstName: (firstName: string) => void;
  onDone: () => void;
}

const NameStep: React.FC<NameStepProps> = (props) => {
  const emitDone = React.useCallback(() => props.onDone(), [props]);

  const [isButtonDisabled] = useDisableButtonOnInvalidLength([
    props.firstName,
    props.name
  ]);

  return (
    <>
      <NameInput
        fieldId="first-name"
        label="First name"
        name={props.firstName}
        onSetName={props.onSetFirstName}
      />
      <NameInput
        fieldId="name"
        label="Name"
        name={props.name}
        onSetName={props.onSetName}
      />
      <button disabled={isButtonDisabled()} onClick={emitDone}>
        Next
      </button>
    </>
  );
};

export default NameStep;
