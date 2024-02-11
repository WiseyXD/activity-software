import { Request, Response } from "express";
import { prisma } from "../../prisma/index";
import { TAchievement, TParticipant, TTechnicalEvent } from "../../types";

export async function findEventsByUserId(id: string | undefined) {
    try {
        const events = await prisma.achievement.findMany({
            where: {
                userId: id,
            },
            include: {
                participants: true,
            },
        });
        return events;
    } catch (error) {
        return false;
    }
}

export async function updateEventById(id: string | undefined, evenData: any) {
    try {
        const event = await prisma.achievement.update({
            where: { id },
            data: evenData,
        });
        return event;
    } catch (error) {
        return false;
    }
}

export async function deleteEventById(id: string | undefined) {
    try {
        const event = await prisma.achievement.findUnique({
            where: { id },
            include: { participants: true },
        });
        await prisma.participant.deleteMany({
            where: { achievementId: id },
        });

        // Delete the achievement itself
        await prisma.achievement.delete({
            where: { id },
        });

        return event;
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
}

export async function createAchievement(
    req: Request<{ params: string }, {}, TAchievement, { query: string }>,
    res: Response
) {
    try {
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
            participants,
        } = req.body;
        const id = req.id;
        const createdBy = { id: req.id };
        // Create achievement
        const createdAchievement = await prisma.achievement.create({
            data: {
                createdBy: { connect: { id: createdBy.id } },
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
                participants: {
                    createMany: {
                        data: participants.map((participant: any) => ({
                            name: participant.name,
                            department: participant.department,
                            year: participant.year,
                            files: participant.files,
                        })),
                    },
                },
            },
            include: {
                participants: true,
            },
        });
        res.status(201).json({ msg: "Successfull creation" });
    } catch (err) {
        res.status(500).json({ error: "Event creation error" });
    }
}
