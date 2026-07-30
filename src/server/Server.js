import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./config/dotenv.js";
import { GitHub } from "./config/auth.js";
import authRoutes from "./routes/auth.js";
import cardsRoutes from "./routes/cards.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    }),
);

app.use(
    session({
        secret: process.env.SESSION_SECRET || "cardmaxer-secret",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        resave: false,
        saveUninitialized: false,
    }),
);


app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log('Raw Cookie header:', req.headers.cookie);
    next();
});

passport.use(GitHub);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/debug-session', (req, res) => {
    res.json({
        rawCookieHeader: req.headers.cookie,
        sessionID: req.sessionID,
        sessionData: req.session,
        isAuthenticated: req.isAuthenticated?.(),
        user: req.user,
    });
});

app.use("/auth", authRoutes);
app.use("/api/cards", cardsRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
