import express from "express"
import passport from "passport"

const is_authenticated = async (req, res, next) => {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Error: must be authenticated to access this resource" })

    next()
}

const user_router = express.Router()

user_router.post("/weights", is_authenticated,)

export default user_router
