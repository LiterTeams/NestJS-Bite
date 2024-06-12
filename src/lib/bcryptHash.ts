import { hash } from "bcrypt";
const bcryptHash = async (password: string, salt: number) => await hash(password, salt);
export default bcryptHash;