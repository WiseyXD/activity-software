require("dotenv").config();
import express, { Request, Response } from "express";
import { TProtectedFaculty } from "../../types";
import { authenticateToken } from "../../middleware/authenticateToken";

const actionsRouter = express.Router();
actionsRouter.use(authenticateToken);

actionsRouter.get(
    "/",
    (
        req: Request<
            { params: string },
            {},
            TProtectedFaculty,
            { query: string }
        >,
        res: Response
    ) => {
        res.send(req.body.email);
    }
);

export default actionsRouter;
