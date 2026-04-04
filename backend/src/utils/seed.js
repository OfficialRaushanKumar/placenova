const mongoose = require("mongoose");
const path = require("node:path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// Import models
const User = require("../models/User");
const Company = require("../models/Company");
const Application = require("../models/Application");

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in backend/.env");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Clear old data
    await User.deleteMany();
    await Company.deleteMany();
    await Application.deleteMany();

    // Create Coordinator
    const coordinator = await User.create({
      name: "Placement Coordinator",
      email: "coordinator@demo.com",
      password: "demo123",
      role: "coordinator",
    });

    console.log("✅ Coordinator created");

    console.log("ℹ️ Skipping student seed. Add students manually from the website.");

    // Create Companies
    await Company.insertMany([
      {
        name: "Google",
        industry: "IT",
        location: {
          city: "Bangalore",
          state: "Karnataka",
          country: "India",
        },
        roles: [
          {
            title: "Software Engineer",
            type: "Full-Time",
            package: 30,
            skills: ["JavaScript", "Node.js", "React"],
            openings: 5,
            eligibility: {
              branches: ["CSE", "IT", "ECE"],
              minCGPA: 7,
              maxBacklogs: 0,
            },
          },
        ],
        hiringStatus: "open",
        addedBy: coordinator._id,
      },
      {
        name: "Amazon",
        industry: "E-Commerce",
        location: {
          city: "Hyderabad",
          state: "Telangana",
          country: "India",
        },
        roles: [
          {
            title: "SDE",
            type: "Full-Time",
            package: 28,
            skills: ["DSA", "Java", "System Design"],
            openings: 4,
            eligibility: {
              branches: ["CSE", "IT", "ECE"],
              minCGPA: 6.5,
              maxBacklogs: 0,
            },
          },
        ],
        hiringStatus: "open",
        addedBy: coordinator._id,
      },
      {
        name: "Microsoft",
        industry: "IT",
        location: {
          city: "Noida",
          state: "Uttar Pradesh",
          country: "India",
        },
        roles: [
          {
            title: "Developer",
            type: "Full-Time",
            package: 26,
            skills: ["C#", ".NET", "Azure"],
            openings: 3,
            eligibility: {
              branches: ["CSE", "IT", "ECE"],
              minCGPA: 7,
              maxBacklogs: 0,
            },
          },
        ],
        hiringStatus: "open",
        addedBy: coordinator._id,
      },
    ]);

    console.log("✅ Companies created");

    // Skip applications because students are managed manually from UI.
    console.log("ℹ️ Skipping application seed. Applications will be created from user actions.");

    console.log("🎉 FULL DATABASE SEEDED SUCCESSFULLY!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();