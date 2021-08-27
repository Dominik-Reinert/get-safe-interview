import React from "react";
import AgeStep from "./AgeStep";
import EmailStep from "./EmailStep";
import SummaryStep from "./SummaryStep";
import NameStep from './NameStep'

interface BuyflowProps {
  productId: ProductIds;
}

export enum ProductIds {
  devIns = "dev_ins"
}

const PRODUCT_IDS_TO_NAMES = {
  [ProductIds.devIns]: "Developer Insurance"
};

enum Steps {
  NAME,
  EMAIL,
  AGE,
  SUMMARY
}

function useSteps():[currentStep: Steps, onSetNextStep: () => void] {
  const [currentStep, setStep] = React.useState<Steps>(Steps.NAME);

  const onNextStep = React.useCallback(() => {
    switch (currentStep) {
      case Steps.NAME:
        setStep(Steps.EMAIL);
        break;
      case Steps.EMAIL:
        setStep(Steps.AGE);
        break;
      case Steps.AGE:
        setStep(Steps.SUMMARY);
        break;
      case Steps.SUMMARY:
        throw new Error("There is no further step!");
    }
  }, [currentStep, setStep]);
  return [currentStep, onNextStep]
}

const Buyflow: React.FC<BuyflowProps> = (props) => {
  const [currentStep, onNextStep] = useSteps();
  const [firstName, setFirstName] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [age, setAge] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>("");

  const onSetFirstName = React.useCallback((newFirstName) => setFirstName(newFirstName), [setFirstName]);
  const onSetName = React.useCallback((newName) => setName(newName), [setName]);
  const onSetAge = React.useCallback((newAge) => setAge(newAge), [setAge]);
  const onSetEmail = React.useCallback((newEmail) => setEmail(newEmail), [
    setEmail
  ]);

  return (
    <>
      <h4>Buying {PRODUCT_IDS_TO_NAMES[props.productId]}</h4>
      {currentStep === Steps.NAME && <NameStep firstName={firstName} name={name} onSetFirstName={onSetFirstName} onSetName={onSetName} onDone={onNextStep} />}
      {currentStep === Steps.EMAIL && <EmailStep email={email} onSetEmail={onSetEmail} onDone={onNextStep} />}
      {currentStep === Steps.AGE && <AgeStep age={age} onSetAge={onSetAge} onDone={onNextStep} />} 
      {currentStep === Steps.SUMMARY && <SummaryStep firstName={firstName} name={name} age={age} email={email} />}
    </>
  );
};

export default Buyflow;
