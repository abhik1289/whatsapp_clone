import * as Yup from "yup";

const pattern = /^[a-zA-Z]$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9\s]).{8,}$/;

const regestartionValidation = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First name must be between 2 and 16 characters.")
    .max(16, "First name must be between 2 and 16 characters.")
    .matches(pattern),
  lastName: Yup.string()
    .required("First Name is required")
    .min(2, "First name must be between 2 and 16 characters.")
    .max(16, "First name must be between 2 and 16 characters.")
    .matches(pattern),
  email: Yup.string().email(),
  password: Yup.string()
    .min(2, "Password must be between 2 and 16 characters.")
    .max(16, "Password must be between 2 and 16 characters.")
    .matches(passwordRegex),
});
export default regestartionValidation;
