
// import cors from "cors";




import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import { router } from "./app/routes";


const app = express();

app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is a Multi-Tenant Organization Workspace API",
  });
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
