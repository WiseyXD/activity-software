require("dotenv").config();
import { prisma } from "../../../prisma";
import express, { Request, Response } from "express";
import { TProtectedFaculty, TPlacement } from "../../../types";
import {
    createPlacementEvent,
    deleteEventById,
    findEventsByUserId,
    updateEventById,
} from "../../../controllers/faculty/placementControllers";

const placementEventRouter = express.Router();

placementEventRouter.post(
    "/create",
    async (
        req: Request<{ params: string }, {}, TPlacement, { query: string }>,
        res: Response
    ) => {
        const {
            nameOfCompany,
            dateOfVisit,
            orgaisedFor,
            typeOfVisit,
            salaryPackage,
            noOfParticipationFromSaraswati,
            noOfParticipationOverall,
            noOfStudentsSelectedFromSaraswati,
            noOfStudentsSelectedOverall,
            listOfSelectedStudentsFromSaraswati,
        } = req.body;
        const createdBy = { id: req.id };
        const event = await createPlacementEvent(
            createdBy,
            nameOfCompany,
            dateOfVisit,
            orgaisedFor,
            typeOfVisit,
            salaryPackage,
            noOfParticipationFromSaraswati,
            noOfParticipationOverall,
            noOfStudentsSelectedFromSaraswati,
            noOfStudentsSelectedOverall,
            listOfSelectedStudentsFromSaraswati
        );
        if (!event) res.status(500).json({ error: "Event creation error" });
        res.status(201).json({ msg: "Successfull creation" });
    }
);

placementEventRouter.get(
    "/read",
    async (
        req: Request<{ params: string }, {}, TPlacement, { query: string }>,
        res: Response
    ) => {
        const id = req.id;
        const createdBy = { id: req.id };
        const events = await findEventsByUserId(id);
        if (!events) res.status(500).json({ error: "No Event Created" });
        res.status(201).json({ events });
    }
);

placementEventRouter.put(
    "/update/:eventId",
    async (
        req: Request<{ eventId: string }, {}, TPlacement, { query: string }>,
        res: Response
    ) => {
        const id = req.params.eventId;
        const eventData = req.body;
        const event = await updateEventById(id, eventData);
        if (!event)
            res.status(500).json({ error: "Error while event updation" });
        res.status(201).json({ event });
    }
);

placementEventRouter.delete(
    "/delete/:eventId",
    async (
        req: Request<{ eventId: string }, {}, {}, { query: string }>,
        res: Response
    ) => {
        const id = req.params.eventId;
        const event = await deleteEventById(id);
        if (!event)
            res.status(500).json({ error: "Error while event deletion" });
        res.status(200).json({ event });
    }
);

export default placementEventRouter;
