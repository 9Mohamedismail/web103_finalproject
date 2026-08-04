import GitHubStrategy from "passport-github2";
import { pool } from "./database.js";

const serverUrl = (process.env.SERVER_URL || "http://localhost:3001").replace(
    /\/+$/,
    "",
);

const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${serverUrl}/auth/github/callback`,
};

const verify = async (_accessToken, _refreshToken, profile, callback) => {
    try {
        const result = await pool.query(
            `
                INSERT INTO users (githubid, username)
                VALUES ($1, $2)
                ON CONFLICT (githubid) DO UPDATE
                SET username = EXCLUDED.username
                RETURNING
                    id,
                    username,
                    credit_score;
            `,
            [String(profile.id), profile.username],
        );

        return callback(null, result.rows[0]);
    } catch (error) {
        return callback(error);
    }
};

export const GitHub = new GitHubStrategy(options, verify);

export function serializeUser(user, callback) {
    callback(null, user.id);
}

export async function deserializeUser(id, callback) {
    try {
        const result = await pool.query(
            `
                SELECT
                    id,
                    username,
                    credit_score
                FROM users
                WHERE id = $1;
            `,
            [id],
        );

        callback(null, result.rows[0] ?? false);
    } catch (error) {
        callback(error);
    }
}
