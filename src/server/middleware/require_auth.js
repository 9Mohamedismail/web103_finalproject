function requireAuthentication(req, res, next) {
    if (!req.isAuthenticated() || !req.user) {
        return res.status(401).json({ error: "Authentication required" });
    }

    return next();
}

export default requireAuthentication;
