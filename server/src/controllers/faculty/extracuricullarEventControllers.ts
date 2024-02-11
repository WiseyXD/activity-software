import { prisma } from "../../prisma/index";
import { TTechnicalEvent } from "../../types";

export async function createExtracuricullarEvent(
    title: string,
    department: string,
    createdBy: { id: string | undefined },
    endDate: Date,
    eventLevel: string,
    eventType: string,
    orgaisedFor: string[],
    resourcePersonDesignation: string,
    resourcePersonDomain: string,
    resourcePersonName: string,
    resourcePersonOrg: string,
    startDate: Date,
    typeOfParticipant: string
): Promise<boolean> {
    try {
        await prisma.extraCurricularEvent.create({
            data: {
                title,
                department,
                createdBy: {
                    connect: {
                        id: createdBy.id,
                    },
                },
                endDate,
                eventLevel,
                eventType,
                orgaisedFor: { set: orgaisedFor },
                resourcePersonDesignation,
                resourcePersonDomain,
                resourcePersonName,
                resourcePersonOrg,
                startDate,
                typeOfParticipant,
            },
        });
        return true;
    } catch (error) {
        console.error("Error creating technical event:", error);
        return false;
    }
}

export async function findEventsByUserId(id: string | undefined) {
    try {
        const events = await prisma.extraCurricularEvent.findMany({
            where: {
                userId: id,
            },
        });
        return events;
    } catch (error) {
        return false;
    }
}

export async function updateEventById(id: string | string, evenData: any) {
    try {
        const event = await prisma.extraCurricularEvent.update({
            where: { id },
            data: evenData,
        });
        return event;
    } catch (error) {
        return false;
    }
}

export async function deleteEventById(id: string | string) {
    try {
        const event = await prisma.extraCurricularEvent.delete({
            where: { id },
        });
        return event;
    } catch (error) {
        return false;
    }
}
