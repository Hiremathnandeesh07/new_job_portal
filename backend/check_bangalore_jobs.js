import mongoose from "mongoose";
import dotenv from "dotenv";
import { Job } from "./models/job.model.js";
import connectDB from "./utils/db.js";

dotenv.config();

const checkBangaloreJobs = async () => {
    try {
        await connectDB();
        console.log("Database connected.");

        const jobs = await Job.find({ location: "Bangalore" });

        console.log(`Found ${jobs.length} jobs in Bangalore:`);
        jobs.forEach(job => {
            console.log(`- ${job.title} (${job.jobType})`);
        });

        process.exit(0);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        process.exit(1);
    }
};

checkBangaloreJobs();
