import React from "react";
import useDisableButtonOnInvalidLength from "./UseInvalidLengthCheck";
import { emailRegex } from "./EmailRegex";

interface EmailStepProps {
  email: string;
  onSetEmail: (email: string) => void;
  onDone: () => void;
}

const EmailStep: React.FC<EmailStepProps> = (props) => {
  const fieldId: string = "email";
  const emitEmail = React.useCallback(
    ({ target: { value } }) => {
      props.onSetEmail(value);
    },
    [props]
  );
  const emitDone = React.useCallback(() => props.onDone(), [props]);

  const [isButtonDisabled] = useDisableButtonOnInvalidLength([props.email]);

  const checkButtonDisabled = React.useCallback(
    () => isButtonDisabled() || !props.email.match(emailRegex),
    [props.email, isButtonDisabled]
  );
  return (
    <>
      <div>
        <label htmlFor={fieldId}>Email:</label>
        <br />
        <input
          id={fieldId}
          type="email"
          onChange={emitEmail}
          value={props.email}
        ></input>
      </div>
      <button disabled={checkButtonDisabled()} onClick={emitDone}>
        Next
      </button>
    </>
  );
};

export default EmailStep;
