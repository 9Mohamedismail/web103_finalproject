import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { pathToFileURL } from "node:url";
import "./config/dotenv.js";
import {
    deserializeUser,
    GitHub,
    serializeUser,
} from "./config/auth.js";
import authRoutes from "./routes/auth.js";
import cardsRoutes from "./routes/cards.js";
import reviewsRoutes from "./routes/reviews.js";
import usersRoutes from "./routes/users.js";
import favoritesRoutes from "./routes/favorites.js";
import {
    allowedClientOrigins,
    isProduction,
} from "./config/environment.js";

const app = express();
const PORT = process.env.PORT || 3001;
const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    throw new Error("SESSION_SECRET is required");
}

if (isProduction) {
    app.set("trust proxy", 1);
}

app.use(express.json());
app.use(
    cors({
        origin(origin, callback) {
            callback(null, !origin || allowedClientOrigins.has(origin));
        },
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    }),
);

app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
        },
    }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(GitHub);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use("/auth", authRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api", reviewsRoutes);
app.use("/api", favoritesRoutes);
app.use("/api/users", usersRoutes);

export function startServer(port = PORT) {
    return app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
}

export { app };

const isMainModule =
    process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMainModule) {
    startServer();
}
