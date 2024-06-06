import { ErrorMessage, Field } from "formik";

interface AuthInputInterface {
  title: string;
  type: string;
  name: string;
  placeholder?: string;
}

export default function AuthInput({ title, type, name }: AuthInputInterface) {
  return (
    <div className="mb-1">
      <label className="block text-dark_text_2 text-sm font-bold mb-2" htmlFor={name}>{title}</label>
      <Field
      className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-white text-white font-font2 my-2 rounded-[15px]"  name={name} type={type} />
      <ErrorMessage name={name} component="div" />
    </div>
  );
}
