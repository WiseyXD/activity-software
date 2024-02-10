import bcrypt from "bcrypt";
import { prisma } from "../../prisma/index";
import { generateToken } from "../../services/generateToken";
import { TFaculty, TProtectedFaculty } from "../../types";

async function findFaculty(email: string): Promise<TFaculty | null> {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    return user;
}

async function createFaculty(
    email: string,
    password: string
): Promise<boolean | TProtectedFaculty> {
    if (await findFaculty(email)) {
        return false;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashPassword,
        },
        select: {
            id: true,
            email: true,
        },
    });
    return user;
}

async function loginFaculty(
    email: string,
    password: string
): Promise<
    | string
    | null
    | boolean
    | { token: string | null; userDetails: TProtectedFaculty }
> {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            password: true,
        },
    });
    if (!user) return false;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return false;
    const userDetails = { email: user.email, id: user.id };
    const token = await generateToken(userDetails);
    return { token, userDetails };
}

export { createFaculty, loginFaculty };
