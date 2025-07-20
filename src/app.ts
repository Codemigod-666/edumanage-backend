// import express, { Express } from "express"
// import { json, urlencoded } from "body-parser"
import routes from "./routes";

import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDb from "./database";
import userRoutes from "./routes/userRoutes";
import studentRoutes from "./routes/studentRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

export const app = express();
connectDb();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://attend-pay.vercel.app",
      process.env.CORS_URL || "",
    ],
    credentials: true,
  })
);

console.log("url", process.env.CORS_URL);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // (express middleware) parse the data from the "FORMS" to the req.body

// routes
// auth routes
app.use("/", routes);
app.use("/api/auth", userRoutes);
app.use("/api/students", studentRoutes);

// middleware
//middlewares
app.use(errorHandler);
// app.use(roleHandler);

// get

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from Rishi Khandagle!");
// });
app.get("/api/hello", (req: Request, res: Response) => {
  if (req) {
    console.log("request");
  }
  res.json({ message: "Hello from Rishi Khandagle!" });
});

// listen to a port
// app.listen(PORT, () => console.log("Server is running on port", PORT));

export default app;
