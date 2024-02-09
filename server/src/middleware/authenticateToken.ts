import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TProtectedFaculty } from "../types";

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
        // Verify token and extract user details
        const userDetails = jwt.verify(token, jwtKey) as JwtPayload;
        req.body.email = userDetails.email;
        req.body.id = userDetails.id;
        // Call next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails (e.g., invalid or expired token), return 401 Unauthorized
        return res.status(401).json({ error: "Unauthorized" });
    }
}
