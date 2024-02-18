export type TFaculty = {
    email: string;
    password: string;
};

export type TProtectedFaculty = {
    email: string;
    id: string;
};

export type TTechnicalEvent = {
    title: string;
    department: string;
    eventLevel: string;
    orgaisedFor: string[];
    createdBy?: string;
    eventType: string;
    typeOfParticipant: string;
    startDate: Date;
    endDate: Date;
    resourcePersonName: string;
    resourcePersonDesignation: string;
    resourcePersonOrg: string;
    resourcePersonDomain: string;
};

export type TExtracurricularEvent = {
    title: string;
    department: string;
    eventLevel: string;
    orgaisedFor: string[];
    createdBy?: string;
    eventType: string;
    typeOfParticipant: string;
    startDate: Date;
    endDate: Date;
    resourcePersonName: string;
    resourcePersonDesignation: string;
    resourcePersonOrg: string;
    resourcePersonDomain: string;
};

export type TPlacement = {
    createdBy?: string;
    nameOfCompany: string;
    dateOfVisit: Date;
    orgaisedFor: string[];
    typeOfVisit: string;
    salaryPackage: number;
    noOfParticipationFromSaraswati: number;
    noOfParticipationOverall: number;
    noOfStudentsSelectedFromSaraswati: number;
    noOfStudentsSelectedOverall: number;
    listOfSelectedStudentsFromSaraswati: string[];
};

export type TAchievement = {
    id: string;
    createdBy: string;
    instituteName: string;
    activityType: string;
    eventLevel: string;
    dateOfEvent: Date;
    title: string;
    description: string;
    rankAchieved: string;
    personCategory: string;
    achievement: string;
    awardAmount: string;
    achievementProof: string;
    participants: TParticipant[];
};

export type TParticipant = {
    id: string;
    createdBy: string;
    name: string;
    department: string;
    year: string;
    files: string[];
};
