import jwt from "jsonwebtoken";
import { TProtectedFaculty } from "../types";

export async function generateToken(
    user: TProtectedFaculty
): Promise<string | null> {
    const jwtKey = process.env.JWT_KEY;
    if (!jwtKey) {
        console.error("JWT_KEY not found in environment variables.");
        return null;
    }

    try {
        // Generate token
        const token = jwt.sign(user, jwtKey);
        return token;
    } catch (error) {
        console.error("Error generating JWT token:", error);
        return null;
    }
}
