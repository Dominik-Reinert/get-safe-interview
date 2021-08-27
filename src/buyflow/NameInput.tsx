import React from "react";

interface NameInputProps {
  fieldId: string;
  label: string;
  name: string;
  onSetName: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = (props) => {
  const fieldId: string = props.fieldId;
  const emitName = React.useCallback(
    ({ target: { value } }) => {
      props.onSetName(value);
    },
    [props]
  );
  return (
    <div>
      <label htmlFor={fieldId}>{props.label}:</label>
      <br />
      <input
        id={fieldId}
        type="name"
        onChange={emitName}
        value={props.name}
        required
      ></input>
    </div>
  );
};

export default NameInput;
