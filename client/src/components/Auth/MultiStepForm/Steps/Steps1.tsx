import { Formik, Form } from "formik";
import AuthInput from "../../Input/AuthInput";

export default function Steps1() {
  return (
    <div>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <div className="wrapper flex gap-2">
            <div className="w-6/12">
              <AuthInput title="First Name" type="text" name="firstName" />
            </div>
            <div className="w-6/12">
              <AuthInput title="Last Name" type="text" name="lastName" />
            </div>
          </div>
          <AuthInput title="Email" type="text" name="email" />
          <AuthInput title="Password" type="password" name="password" />
        </Form>
      </Formik>
    </div>
  );
}
