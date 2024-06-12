import { compare } from "bcrypt";
const bcryptCompare = async (currentPassword: string, checkPassword: string) => compare(currentPassword, checkPassword);
export default bcryptCompare;