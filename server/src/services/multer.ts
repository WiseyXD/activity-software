import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const storage = multer.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        callback(null, path.resolve("./src/services/uploads/"));
        // callback(null, "../uploads");
    },

    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
    ): void => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        callback(
            null,
            file.fieldname + "-" + uniqueSuffix + "-" + file.originalname
        );
    },
});

export const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "application/pdf"
    ) {
        callback(null, true);
    } else {
        console.log("Only png,jpg,jpeg,pdf");
        callback(null, false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
