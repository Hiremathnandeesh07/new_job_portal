import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import connectDB from "./utils/db.js";

dotenv.config();

const seedDatabase = async () => {
    try {
        await connectDB();
        console.log("Database connected.");

        // 1. Create a Recruiter User
        const userEmail = "recruiter@example.com";
        let user = await User.findOne({ email: userEmail });

        if (!user) {
            const hashedPassword = await bcrypt.hash("password123", 10);
            user = await User.create({
                fullname: "Test Recruiter",
                email: userEmail,
                phoneNumber: 1234567890,
                password: hashedPassword,
                role: "recruiter",
                profile: {
                    bio: "I hire the best talent.",
                    skills: ["Hiring", "Management"],
                    profilePhoto: ""
                }
            });
            console.log("Test Recruiter created.");
        } else {
            console.log("Test Recruiter already exists.");
        }

        // 2. Create a Company
        const companyName = "TechCorp";
        let company = await Company.findOne({ name: companyName });

        if (!company) {
            company = await Company.create({
                name: companyName,
                description: "A leading tech company.",
                website: "https://techcorp.com",
                location: "San Francisco, CA",
                logo: "",
                userId: user._id
            });
            console.log("Test Company created.");
        } else {
            console.log("Test Company already exists.");
        }

        // 3. Create Jobs
        const jobs = [
            {
                title: "Frontend Developer",
                description: "We are looking for a skilled Frontend Developer with React experience.",
                requirements: ["React", "JavaScript", "Tailwind CSS"],
                salary: 80000,
                experienceLevel: 2,
                location: "Bangalore",
                jobType: "Full-time",
                position: 2,
                company: company._id,
                created_by: user._id
            },
            {
                title: "Backend Developer",
                description: "Join our backend team to build scalable APIs.",
                requirements: ["Node.js", "Express", "MongoDB"],
                salary: 90000,
                experienceLevel: 3,
                location: "Pune",
                jobType: "Full-time",
                position: 1,
                company: company._id,
                created_by: user._id
            },
            {
                title: "Full Stack Engineer",
                description: "Work on both client and server side of our application.",
                requirements: ["MERN Stack", "AWS", "Docker"],
                salary: 110000,
                experienceLevel: 4,
                location: "Bangalore",
                jobType: "Hybrid",
                position: 1,
                company: company._id,
                created_by: user._id
            },
            {
                title: "UI/UX Designer",
                description: "Design beautiful and intuitive user interfaces.",
                requirements: ["Figma", "Adobe XD", "Prototyping"],
                salary: 75000,
                experienceLevel: 2,
                location: "Pune",
                jobType: "Contract",
                position: 1,
                company: company._id,
                created_by: user._id
            },
            {
                title: "DevOps Engineer",
                description: "Manage our infrastructure and CI/CD pipelines.",
                requirements: ["Kubernetes", "Jenkins", "Terraform"],
                salary: 100000,
                experienceLevel: 3,
                location: "Bangalore",
                jobType: "Full-time",
                position: 1,
                company: company._id,
                created_by: user._id
            }
        ];

        await Job.insertMany(jobs);
        console.log(`${jobs.length} jobs inserted successfully.`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
