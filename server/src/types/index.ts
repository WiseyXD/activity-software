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
