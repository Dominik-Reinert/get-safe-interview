import React from "react";

interface AgeStepProps {
  age: number;
  onSetAge: (age: number) => void;
  onDone: () => void;
}

const AgeStep: React.FC<AgeStepProps> = (props) => {
  const fieldId: string = "age";
  const emitAge = React.useCallback(
    ({ target: { value } }) => {
      props.onSetAge(Number(value));
    },
    [props]
  );
  const emitDone = React.useCallback(() => props.onDone(), [props]);

  const checkButtonDisabled = React.useCallback(() => props.age < 0, [
    props.age
  ]);
  return (
    <>
      <div>
        <label htmlFor={fieldId}>Age:</label>
        <br />
        <input
          id={fieldId}
          type="number"
          onChange={emitAge}
          value={props.age}
        ></input>
      </div>
      <button disabled={checkButtonDisabled()} onClick={emitDone}>
        Next
      </button>
    </>
  );
};

export default AgeStep;
