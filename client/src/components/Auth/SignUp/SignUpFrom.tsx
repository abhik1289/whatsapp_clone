import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Heading from "../Heading/Heading";
import AuthInput from "../Input/AuthInput";
import { useState } from "react";
import MultiStepForm from "../MultiStepForm";

export default function SignUpFrom() {
  const [step, setStep] = useState<number>(1);
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });
  return (
     <MultiStepForm step={step} setStep={setStep} />
  );
}
