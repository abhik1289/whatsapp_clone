import { userModel } from "../../model";

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  try {
    const saveUser = await userModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    return saveUser;
  } catch (error: any) {
    return error;
  }
};
