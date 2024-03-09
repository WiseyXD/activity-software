import { prisma } from "../../prisma/index";
import { TPlacement } from "../../types";
import { Request, Response } from "express";

export async function createPlacementEvent(
    req: Request<{ params: string }, {}, TPlacement, { query: string }>,
    res: Response
) {
    const {
        nameOfCompany,
        dateOfVisit,
        organisedFor,
        typeOfVisit,
        salaryPackage,
        noOfParticipationFromSaraswati,
        noOfParticipationOverall,
        noOfStudentsSelectedFromSaraswati,
        noOfStudentsSelectedOverall,
        listOfSelectedStudentsFromSaraswati,
    } = req.body;
    const createdBy = req.id;
    try {
        const createPlacement = await prisma.placement.create({
            data: {
                nameOfCompany,
                dateOfVisit,
                createdBy: {
                    connect: {
                        id: createdBy,
                    },
                },
                typeOfVisit,
                salaryPackage,
                organisedFor,
                noOfParticipationFromSaraswati,
                noOfStudentsSelectedFromSaraswati,
                noOfParticipationOverall,
                noOfStudentsSelectedOverall,
                listOfSelectedStudentsFromSaraswati,
            },
        });
        res.status(201).json({ msg: "Successful creation" });
    } catch (err: any) {
        const msg = err.message;
        console.error("Error creating placement:", err);
        res.status(500).json({ msg });
    }
}

export async function findEventsByUserId(
    req: Request<{ placementId: string }, {}, TPlacement, { query: string }>,
    res: Response
) {
    const id = req.params.placementId;
    try {
        const events = await prisma.placement.findMany({
            where: {
                userId: id,
            },
        });
        res.status(200).json({ events });
    } catch (error: any) {
        const msg = error.message;
        console.log({ msg });
        res.status(500).json({ msg });
    }
}

export async function updateEventById(
    req: Request<{ eventId: string }, {}, any, { query: string }>,
    res: Response
) {
    const id = req.params.eventId;
    const eventData = req.body;
    try {
        const event = await prisma.placement.update({
            where: { id },
            data: eventData,
        });
        res.status(201).json({ msg: "Successfull Updation" });
    } catch (error) {
        // return false;
        res.status(500).json({ error: "Error while event updation" });
    }
}

export async function deleteEventById(
    req: Request<{ eventId: string }, {}, {}, { query: string }>,
    res: Response
) {
    const id = req.params.eventId;
    try {
        const event = await prisma.placement.delete({
            where: { id },
        });
        res.status(200).json({ msg: "Event Deleted Succesfully" });
    } catch (error: any) {
        const msg = error.message;
        res.status(500).json({ msg });
    }
}
