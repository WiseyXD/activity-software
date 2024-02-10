import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TProtectedFaculty } from "../types";

declare module "express" {
    interface Request {
        email?: string;
        id?: string;
    }
}
export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const jwtKey = process.env.JWT_KEY;
    if (!jwtKey) {
        return res.status(401).json({ error: "JWT Key Missing" });
    }
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader || typeof bearerHeader !== "string") {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = bearerHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const userDetails = jwt.verify(token, jwtKey) as JwtPayload;
        req.email = userDetails.email;
        req.id = userDetails.id;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
}
