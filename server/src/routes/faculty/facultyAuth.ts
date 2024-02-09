require("dotenv").config();
import express, { Request, Response } from "express";
import { TFaculty } from "../../types";
import { facultySchema } from "../../services/inputValidation";
import {
    createFaculty,
    loginFaculty,
} from "../../controllers/faculty/facultyControllers";

const authRouter = express.Router();

authRouter.post(
    "/signup",
    async (
        req: Request<{ params: string }, {}, TFaculty, { query: string }>,
        res: Response
    ) => {
        const { email, password } = req.body;
        try {
            const result = facultySchema.safeParse({ email, password });
            if (!result.success) throw Error("Please put valid inputs");
            const user = await createFaculty(email, password);
            if (!user) throw Error("User Already Exist");
            res.status(201).json(user);
        } catch (error: any) {
            const msg = error.message;
            res.status(500).json({ msg });
        }
    }
);

authRouter.post(
    "/login",
    async (
        req: Request<{ params: string }, {}, TFaculty, { query: string }>,
        res: Response
    ) => {
        const { email, password } = req.body;
        try {
            const result = facultySchema.safeParse({ email, password });
            if (!result.success) throw Error("Please put valid inputs");
            const userData = await loginFaculty(email, password);
            if (!userData) throw Error("Invalid Credentials");
            res.status(200).json(userData);
        } catch (error: any) {
            const msg = error.message;
            res.status(500).json({ msg });
        }
    }
);

export default authRouter;
