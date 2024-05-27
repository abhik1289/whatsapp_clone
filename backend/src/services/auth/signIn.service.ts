import { userModel } from "../../model";
import { findUserById } from "./findUser.service";
import bcrypt from 'bcrypt';

const SignIn = async (userId: any, password: string): Promise<boolean> => {
    const findUser = await findUserById(userId);
    if (findUser) {
        const isValid: boolean = await bcrypt.compare(password, findUser.password);
        if (isValid) {
            return true;
        } else {
            return false;
        }
    }
    return false; // Added for cases where findUser is null
};
export default SignIn;