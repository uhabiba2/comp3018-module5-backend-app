import express from "express";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import router from "./api/v1/routes/postRoutes";

const app = express();

// 1. Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

// 2. Body parsing middleware
app.use(express.json());

// 3. API Routes
app.use("/api/v1/posts", router);

// 4. Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;