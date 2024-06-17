import { prisma } from "../../prisma/index";
import { TTechnicalEvent } from "../../types";
import { Request, Response } from "express";

export async function createTechnicalEvent(
    req: Request<{ params: string }, {}, TTechnicalEvent, { query: string }>,
    res: Response
) {
    const {
        title,
        department,
        endDate,
        eventLevel,
        eventType,
        organisedFor,
        resourcePersonDesignation,
        resourcePersonDomain,
        resourcePersonName,
        resourcePersonOrg,
        startDate,
        typeOfParticipant,
        description,
        outcome,
        expenditure,
        revenue,
        fundingAgency,
        fundsReceived,
        rankAchieved,
        departmentAchievement,
        collegeAchievement,
    } = req.body;
    const createdBy = req.id;
    try {
        await prisma.technicalEvent.create({
            data: {
                title,
                department,
                eventLevel,
                organisedFor,
                createdBy: {
                    connect: {
                        id: createdBy,
                    },
                },
                typeOfParticipant,
                eventType,
                startDate,
                endDate,
                resourcePersonName,
                resourcePersonDesignation,
                resourcePersonOrg,
                resourcePersonDomain,
                description,
                outcome,
                expenditure,
                revenue,
                fundingAgency,
                fundsReceived,
                rankAchieved,
                departmentAchievement,
                collegeAchievement,
            },
        });
        res.status(201).json({ msg: "Successful creation" });
    } catch (err: any) {
        const msg = err.message;
        console.error("Error creating achievement:", err);
        res.status(500).json({ msg });
    }
}

export async function findEventsByUserId(
    req: Request<{ params: string }, {}, TTechnicalEvent, { query: string }>,
    res: Response
) {
    try {
        const id = req.id;
        const events = await prisma.technicalEvent.findMany({
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
        const event = await prisma.technicalEvent.update({
            where: { id },
            data: eventData,
        });
        res.status(201).json({ msg: "Successfull Updation" });
    } catch (error) {
        res.status(500).json({ error: "Error while event updation" });
    }
}

export async function deleteEventById(
    req: Request<{ eventId: string }, {}, {}, { query: string }>,
    res: Response
) {
    const id = req.params.eventId;
    try {
        const event = await prisma.technicalEvent.delete({
            where: { id },
        });
        res.status(200).json({ msg: "Event Deleted Succesfully" });
    } catch (error: any) {
        const msg = error.message;
        res.status(500).json({ msg });
    }
}
