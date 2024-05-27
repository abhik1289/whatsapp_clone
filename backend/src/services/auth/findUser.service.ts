import { userModel } from "../../model";

const findUserByEmail = async (email: string) => {
  const isExits = await userModel.findOne({ email: email });
  if (isExits) {
    return isExits;
  }
  return false;
};
const findUserById = async (userId: any) => {
  const isExits = await userModel.findById(userId);
  if (isExits) {
    return isExits;
  }
  return false;
};
export { findUserByEmail, findUserById };
