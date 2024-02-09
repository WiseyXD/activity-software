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
    const user = await prisma.user.create({
        data: {
            email,
            password,
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
    string | null | boolean | { token: string | null; user: TProtectedFaculty }
> {
    const user = await prisma.user.findUnique({
        where: {
            email,
            password,
        },
        select: {
            id: true,
            email: true,
        },
    });
    if (!user) return false;
    const token = await generateToken(user);
    return { token, user };
}

export { createFaculty, loginFaculty };
