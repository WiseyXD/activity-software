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
    findEventsByUserId
);

placementEventRouter.put(
    "/update/:eventId",
    updateEventById
);

placementEventRouter.delete(
    "/delete/:eventId",
    deleteEventById
);

export default placementEventRouter;
