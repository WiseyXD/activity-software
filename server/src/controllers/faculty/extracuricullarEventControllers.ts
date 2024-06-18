import { Request, Response } from "express";
import { prisma } from "../../prisma/index";

import { TExtracurricularEvent } from "../../types";

export async function createExtracuricullarEvent(
    req: Request<
        { params: string },
        {},
        TExtracurricularEvent,
        { query: string }
    >,
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
        honorariumPaid,
        rankAchieved,
        departmentAchievement,
        collegeAchievement,
    } = req.body;
    const createdBy = req.id;
    try {
        const created = await prisma.extraCurricularEvent.create({
            data: {
                title,
                department,
                createdBy: {
                    connect: {
                        id: createdBy,
                    },
                },
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
                honorariumPaid,
                rankAchieved,
                departmentAchievement,
                collegeAchievement,
            },
        });
        res.status(201).json({ msg: "Successful creation" });
    } catch (error: any) {
        const msg = error.message;
        console.error("Error creating technical event:", error);
        res.status(500).json({ msg });
    }
}

export async function findEventsByUserId(
    req: Request<
        { eventId: string },
        {},
        TExtracurricularEvent,
        { query: string }
    >,
    res: Response
) {
    const id = req.id;

    try {
        const events = await prisma.extraCurricularEvent.findMany({
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
    const evenData = req.body;
    try {
        const event = await prisma.extraCurricularEvent.update({
            where: { id },
            data: evenData,
        });
        res.status(201).json({ msg: "Successfull Updation" });
    } catch (error: any) {
        res.status(500).json({ msg: "Error while Updation" + error.message });
    }
}

export async function getEventById(
    req: Request<{ eventId: string }, {}, any, { query: string }>,
    res: Response
) {
    const id = req.params.eventId;

    try {
        const event = await prisma.extraCurricularEvent.findFirst({
            where: { id },
        });
        res.status(201).json({ event });
    } catch (error: any) {
        res.status(500).json({
            msg: "Error while fetching event" + error.message,
        });
    }
}

export async function deleteEventById(
    req: Request<{ eventId: string }, {}, {}, { query: string }>,
    res: Response
) {
    const id = req.params.eventId;
    try {
        const event = await prisma.extraCurricularEvent.delete({
            where: { id },
        });

        res.status(200).json({ msg: "Event Deleted Successfully" });
    } catch (error: any) {
        const msg = error.message;
        res.status(500).json({ msg });
    }
}
