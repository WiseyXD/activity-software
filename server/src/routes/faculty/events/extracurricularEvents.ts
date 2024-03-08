require("dotenv").config();
import { prisma } from "../../../prisma";
import express, { Request, Response } from "express";
import { TExtracurricularEvent } from "../../../types";
import {
    createExtracuricullarEvent,
    deleteEventById,
    findEventsByUserId,
    updateEventById,
} from "../../../controllers/faculty/extracuricullarEventControllers";

const extracurricularEventRouter = express.Router();

extracurricularEventRouter.post(
    "/create",
    async (
        req: Request<
            { params: string },
            {},
            TExtracurricularEvent,
            { query: string }
        >,
        res: Response
    ) => {
        const {
            title,
            department,
            endDate,
            eventLevel,
            eventType,
            orgaisedFor,
            resourcePersonDesignation,
            resourcePersonDomain,
            resourcePersonName,
            resourcePersonOrg,
            startDate,
            typeOfParticipant,
        } = req.body;
        const createdBy = { id: req.id };
        const event = await createExtracuricullarEvent(
            title,
            department,
            createdBy,
            endDate,
            eventLevel,
            eventType,
            orgaisedFor,
            resourcePersonDesignation,
            resourcePersonDomain,
            resourcePersonName,
            resourcePersonOrg,
            startDate,
            typeOfParticipant
        );
        if (!event) res.status(500).json({ error: "Event creation error" });
        res.status(201).json({ msg: "Successfull creation" });
    }
);

extracurricularEventRouter.get(
    "/read",
    findEventsByUserId
);

extracurricularEventRouter.put(
    "/update/:eventId",
    updateEventById
);

extracurricularEventRouter.delete(
    "/delete/:eventId",
    deleteEventById
);

export default extracurricularEventRouter;
