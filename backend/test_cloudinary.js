import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

console.log("Testing Cloudinary Connection...");
console.log("Cloud Name:", process.env.CLOUD_NAME);
console.log("API Key:", process.env.API_KEY);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

cloudinary.api.ping()
    .then(result => {
        console.log("Ping successful:", result);
    })
    .catch(error => {
        console.error("Ping failed:", error);
    });
