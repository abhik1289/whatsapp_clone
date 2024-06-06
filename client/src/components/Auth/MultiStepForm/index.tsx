import MultiStepsFormInterface from "@/utils/AuthFormInterface";
import FormContainer from "./FormContainer";
import Steps from "./Steps";


export default function MultiStepForm({ step, setStep }: MultiStepsFormInterface) {
  return (
    <div className="w-[600px] max-h-auto min-h-[80vh] py-2 flex flex-wrap dark:bg-dark_bg_2 rounded-xl ">
      <Steps step={step}  />
      <FormContainer step={step} setStep={setStep} />
    </div>
  );
}
