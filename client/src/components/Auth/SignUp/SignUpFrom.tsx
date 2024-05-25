import { Form } from "react-router-dom";
import Heading from "../Heading/Heading";
import { Formik } from "formik";
import AuthInput from "../Input/AuthInput";
export default function SignUpFrom() {
  let regesterFormValues = {};
  return (
    <div className="w-[390px] space-y-4 dark:bg-dark_bg_2 rounded-xl p-5">
      <Heading
        title="Regester Now"
        text="  Connect, Share, and Engage: Your Platform for Meaningful Conversations"
      />
      <Formik
        initialValues={{firstName:''}}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          // alert(JSON.stringify(values, null, 2));
          // actions.setSubmitting(false);
        }}
      >
        <Form>
          <AuthInput
            name="firstName"
            placeholder="Write your first name"
            control="input"
            title="First Name"
            type="text"
          />
        </Form>
      </Formik>
    </div>
  );
}
