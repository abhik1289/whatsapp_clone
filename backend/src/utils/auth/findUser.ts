import { userModel } from "../../model";

const findUserByEmail = async (email: string) => {
  const isExits = await userModel.findOne({ email: email });
  if (isExits) {
    return true;
  }
  return false;
};
const findUserById = async (userId: string) => {
  const isExits = await userModel.findById(userId);
  if (isExits) {
    return true;
  }
  return false;
};
export { findUserByEmail, findUserById };
