import mongoose from "mongoose";
import dotenv from "dotenv";
import { Job } from "./models/job.model.js";
import connectDB from "./utils/db.js";

dotenv.config();

const updateLocations = async () => {
    try {
        await connectDB();
        console.log("Database connected.");

        const jobs = await Job.find({});
        const locations = ["Bangalore", "Pune"];

        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            job.location = locations[i % locations.length]; // Alternate between Bangalore and Pune
            await job.save();
        }

        console.log(`Updated ${jobs.length} jobs with locations: ${locations.join(", ")}`);
        process.exit(0);
    } catch (error) {
        console.error("Error updating locations:", error);
        process.exit(1);
    }
};

updateLocations();
