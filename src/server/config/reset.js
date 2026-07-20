import { seedDatabase } from "./seed.js"

seedDatabase()
    .then(() => console.log("Database reset and seeded successfully"))
    .catch((error) => {
        console.error("Database reset failed", error)
        process.exitCode = 1
    })
