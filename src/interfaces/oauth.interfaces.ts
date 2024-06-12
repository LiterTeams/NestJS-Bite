import { TokensIF } from "./tokens.interfaces";
import { Prisma } from "@prisma/client";

interface SignInIF {
    email: string;
    password: string;
}

interface SignInResponseIF extends Omit<Prisma.UserCreateInput, "password">, TokensIF {}

export type { SignInIF, SignInResponseIF }