import { Formik, Form } from "formik";
import AuthInput from "../Input/AuthInput";
import Heading from "../Heading/Heading";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigator = useNavigate();
  return (
    <div className="dark:bg-dark_bg_1  w-screen h-screen flex justify-center items-center">
      <div className="center_wrapper_box w-[400px] h-[400px] p-5 bg-dark_bg_2 rounded-xl">
        <Heading
          title="Log In Now"
          text="We’ve missed you. Log in to reconnect with your favorite people."
        />
        <div className="form_bx mt-3">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <AuthInput title="Email" type="text" name="email" />
              <AuthInput title="Password" type="password" name="password" />

              <center>
                <Button className="bg-white rounded-[15px] w-[80px] font-font2 hover:bg-slate-200">
                  Sign In
                </Button>
              </center>
            </Form>
          </Formik>
          <div className="footer_area">
            <p
              onClick={() => navigator("/signUp")}
              className="text-dark_text_2 font-font2 italic cursor-pointer"
            >
              Create Account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
