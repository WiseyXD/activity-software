require("dotenv").config();
import express, { Request, Response } from "express";
import bodyParser, { urlencoded } from "body-parser";
import cors from "cors";

import facultyRouter from "./routes/faculty/facultyRoutes";

const app = express();
const PORT = process.env.LOCALPORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/faculty", facultyRouter);

app.listen(PORT, () => {
    console.log("Server is Listening at port " + PORT);
});
