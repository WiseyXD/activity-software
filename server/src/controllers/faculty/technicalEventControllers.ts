import { prisma } from "../../prisma/index";
import { TTechnicalEvent } from "../../types";

export async function createTechnicalEvent(
    title: string,
    department: string,
    createdBy: string | undefined, // Assuming createdBy is the ID of the user who created the event
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
        // Create the technical event using Prisma
        await prisma.technicalEvent.create({
            data: {
                title,
                department,
                createdBy: {
                    connect: { id: createdBy }, // Assuming createdBy is the ID of the user
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
        return true; // Return true if the event is created successfully
    } catch (error) {
        console.error("Error creating technical event:", error);
        return false; // Return false if an error occurs during event creation
    }
}
