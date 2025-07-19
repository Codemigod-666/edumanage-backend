"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = 1000;
(0, database_1.default)();
exports.app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://attend-pay.vercel.app",
        process.env.CORS_URL || "",
    ],
    credentials: true,
}));
console.log("url", process.env.CORS_URL);
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false })); // (express middleware) parse the data from the "FORMS" to the req.body
// routes
// auth routes
exports.app.use("/api/auth", userRoutes_1.default);
exports.app.use("/api/students", studentRoutes_1.default);
// middleware
//middlewares
exports.app.use(errorMiddleware_1.default);
// app.use(roleHandler);
// get
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from Rishi Khandagle!");
// });
exports.app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Rishi Khandagle!" });
});
// listen to a port
exports.app.listen(PORT, () => console.log("Server is running on port", PORT));
