require("dotenv").config();
import express, { Request, Response } from "express";
import { TFaculty } from "../types";
import { createFaculty, loginFaculty } from "../controllers/facultyControllers";

const facultyRouter = express.Router();

facultyRouter.post(
    "/signup",
    async (
        req: Request<{ params: string }, {}, TFaculty, { query: string }>,
        res: Response
    ) => {
        const { email, password } = req.body;

        try {
            const user = await createFaculty(email, password);
            if (!user) throw Error("User Already Exist");
            res.status(200).json(user);
        } catch (error: any) {
            const msg = error.message;
            res.status(500).json({ msg });
        }
    }
);

facultyRouter.post(
    "/login",
    async (
        req: Request<{ params: string }, {}, TFaculty, { query: string }>,
        res: Response
    ) => {
        const { email, password } = req.body;

        try {
            const user = await loginFaculty(email, password);
            if (!user) throw Error("Invalid Credentials");
            res.status(200).json(user);
        } catch (error: any) {
            const msg = error.message;
            res.status(500).json({ msg });
        }
    }
);
export default facultyRouter;
