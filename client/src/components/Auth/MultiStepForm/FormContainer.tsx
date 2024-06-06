import FormHeading from "./Heading";
import { NextButton, PreviousButton } from "@/utils/UI/Buttons";
import MultiStepsFormInterafce from "@/utils/AuthFormInterface";
import Steps1 from "./Steps/Steps1";
import Steps2 from "./Steps/Steps2";
import Steps3 from "./Steps/Steps3";
import Steps4 from "./Steps/Steps4";

export default function FormContainer({
  step,
  setStep,
}: MultiStepsFormInterafce) {
  const headingData = {
    titles: ["Personal info", "Verification", "Basic information", "Completed"],

    descriptions: [
      "Please provide First name, Last name Email Address and Password",
      "To continue, enter the one-time password (OTP) sent to your email address. It's a 6-digit code",
      "Status, Profile and more",
    ],
  };
  console.log(step);
  const changeStep = () => {
    if (step >= 1 && step <= 3) {
      setStep(step + 1);
    } else return;
  };
  const goBackPreviousStep = () => {
    setStep(step - 1);
  };
  return (
    <div className="md:w-7/12 w-full py-2  px-3">
      <FormHeading
        title={headingData.titles[step - 1]}
        subTitle={headingData.descriptions[step - 1]}
      />
      {step == 1 ? (
        <Steps1 />
      ) : step == 2 ? (
        <Steps2 />
      ) : step == 3 ? (
        <Steps3 />
      ) : step == 4 ? (
        <Steps4 />
      ) : null}
      <NextButton
        text={step == 4 ? "Completed" : "Next Step"}
        onTap={changeStep}
      />
      <PreviousButton
        text={"Go Back"}
        hide={step === 1 || step === 4 || step === 3}
        onTap={goBackPreviousStep}
      />
    </div>
  );
}
