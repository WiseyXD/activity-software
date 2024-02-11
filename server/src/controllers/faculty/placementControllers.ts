import { prisma } from "../../prisma/index";
import { TPlacement } from "../../types";

export async function createPlacementEvent(
    createdBy: { id: string | undefined },
    nameOfCompany: string,
    dateOfVisit: Date,
    orgaisedFor: string[],
    typeOfVisit: string,
    salaryPackage: number,
    noOfParticipationFromSaraswati: number,
    noOfParticipationOverall: number,
    noOfStudentsSelectedFromSaraswati: number,
    noOfStudentsSelectedOverall: number,
    listOfSelectedStudentsFromSaraswati: string[]
): Promise<boolean> {
    try {
        await prisma.placement.create({
            data: {
                nameOfCompany,
                dateOfVisit,
                createdBy: {
                    connect: {
                        id: createdBy.id,
                    },
                },
                typeOfVisit,
                salaryPackage,
                orgaisedFor: { set: orgaisedFor },
                noOfParticipationFromSaraswati,
                noOfStudentsSelectedFromSaraswati,
                noOfParticipationOverall,
                noOfStudentsSelectedOverall,
                listOfSelectedStudentsFromSaraswati,
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
        const events = await prisma.placement.findMany({
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
        const event = await prisma.placement.update({
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
        const event = await prisma.placement.delete({
            where: { id },
        });
        return event;
    } catch (error) {
        return false;
    }
}
