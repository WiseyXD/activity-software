import { Request, Response } from "express";
import { prisma } from "../../prisma/index";
import { TAchievement, TParticipant } from "../../types";

export async function findEventsByUserId(
    req: Request<{ params: string }, {}, TAchievement, { query: string }>,
    res: Response
) {
    const id = req.id;
    try {
        const events = await prisma.achievement.findMany({
            where: {
                userId: id,
            },
            include: {
                participants: true,
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
        const event = await prisma.achievement.update({
            where: { id },
            data: eventData,
            include: {
                participants: true,
            },
        });
        res.status(201).json({ msg: "Successfull Updation" });
    } catch (error) {
        return false;
        res.status(500).json({ error: "Error while event updation" });
    }
}

export async function deleteEventById(
    req: Request<{ eventId: string }, {}, {}, { query: string }>,
    res: Response
) {
    const id = req.params.eventId;
    try {
        const event = await prisma.achievement.findUnique({
            where: { id },
            include: { participants: true },
        });
        await prisma.participant.deleteMany({
            where: { achievementId: id },
        });

        await prisma.achievement.delete({
            where: { id },
        });

        res.status(200).json({ msg: "Event Deleted Succesfully" });
    } catch (error: any) {
        const msg = error.message;
        res.status(500).json({ msg });
    }
}

export async function createAchievement(
    req: Request<{ params: string }, {}, TAchievement, { query: string }>,
    res: Response
) {
    const {
        instituteName,
        activityType,
        eventLevel,
        dateOfEvent,
        title,
        description,
        rankAchieved,
        personCategory,
        achievement,
        awardAmount,
        achievementProof,
        participants,
    } = req.body;
    const createdBy = req.id;

    try {
        const createdAchievement = await prisma.achievement.create({
            data: {
                createdBy: { connect: { id: createdBy } },
                instituteName,
                activityType,
                eventLevel,
                dateOfEvent,
                title,
                description,
                rankAchieved,
                personCategory,
                achievement,
                awardAmount,
                achievementProof,
                participants: {
                    createMany: {
                        data: participants.map((participant: any) => ({
                            name: participant.name,
                            department: participant.department,
                            year: participant.year,
                        })),
                    },
                },
            },
            include: {
                participants: true,
            },
        });
        res.status(201).json({ msg: "Successful creation" });
    } catch (err: any) {
        const msg = err.message;
        console.error("Error creating achievement:", err);
        res.status(500).json({ msg });
    }
}
// Participant Endpoint

export async function deleteParticipant(
    req: Request<{ participantId: string }, {}, any, { query: string }>,
    res: Response
) {
    const id = req.params.participantId;
    try {
        const participant = await prisma.participant.delete({
            where: { id },
        });
        res.status(200).json({ msg: "Participant Deleted" });
    } catch (error: any) {
        const msg = error.message;
        res.status(500).json({ msg });
    }
}

export async function updateParticipant(
    req: Request<{ participantId: string }, {}, any, { query: string }>,
    res: Response
) {
    const id = req.params.participantId;
    const participantData = req.body;
    try {
        const participant = await prisma.participant.update({
            where: { id },
            data: participantData,
        });
        res.status(200).json({ msg: "Participant Info updated" });
    } catch (error: any) {
        const msg = error.message;
        res.status(500).json({ msg });
    }
}

export async function addParticipant(
    req: Request<{ achievementId: string }, {}, any, { query: string }>,
    res: Response
) {
    const achievementId = req.params.achievementId;
    const participantData = req.body;
    try {
        const participant = await prisma.participant.create({
            data: {
                ...participantData,
                createdBy: { connect: { id: achievementId } },
            },
        });
        res.status(201).json({ msg: "Participant Added" });
    } catch (error: any) {
        const msg = error.message;
        res.status(500).json({ msg });
    }
}
