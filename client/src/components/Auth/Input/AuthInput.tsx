import { Field } from "formik";

interface AuthInputInterface {
  control: string;
  title: string;
  type: string;
  name: string;
  placeholder: string;
}

export default function AuthInput({
  control,
  title,
  type,
  name,
  placeholder,
}: AuthInputInterface) {
  switch (control) {
    case "input":
      return (
        <div>
          <div className="input_heading">{title}</div>
          <Field placeholder={placeholder} type={type} name={name} />
        </div>
      );
  }
}
