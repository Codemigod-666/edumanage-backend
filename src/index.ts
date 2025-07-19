import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDb from "./database";
import userRoutes from "./routes/userRoutes";
import studentRoutes from "./routes/studentRoutes";
import errorHandler from "./middleware/errorMiddleware";

dotenv.config();

export const app = express();
const PORT = 1000;

connectDb();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://attend-pay.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // (express middleware) parse the data from the "FORMS" to the req.body

// routes
// auth routes
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
  res.json({ message: "Hello from Rishi Khandagle!" });
});

// listen to a port
app.listen(PORT, () => console.log("Server is running on port", PORT));
