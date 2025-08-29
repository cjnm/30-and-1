import dbConnect from "../lib/db";
import Job from "../lib/models/Job";

const sampleJobs = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    description:
      "We are looking for a senior full stack developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.",
    requirements: [
      "5+ years of experience with React and Node.js",
      "Experience with TypeScript",
      "Knowledge of database design and optimization",
      "Strong problem-solving skills",
    ],
    salary: {
      min: 120000,
      max: 180000,
      currency: "USD",
    },
    type: "full-time" as const,
    remote: true,
    tags: ["React", "Node.js", "TypeScript", "MongoDB"],
    applicationEmail: "jobs@techcorp.com",
    featured: true,
  },
  {
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    description:
      "Join our startup as a frontend developer and help build the next generation of web applications.",
    requirements: [
      "3+ years of React experience",
      "Experience with modern CSS frameworks",
      "Knowledge of responsive design",
      "Git proficiency",
    ],
    salary: {
      min: 80000,
      max: 120000,
      currency: "USD",
    },
    type: "full-time" as const,
    remote: false,
    tags: ["React", "CSS", "JavaScript", "HTML"],
    applicationUrl: "https://startupxyz.com/careers",
  },
  {
    title: "Backend Developer (Contract)",
    company: "Enterprise Solutions",
    location: "Remote",
    description:
      "Contract position for an experienced backend developer to work on microservices architecture.",
    requirements: [
      "Strong experience with Node.js or Python",
      "Microservices architecture experience",
      "Docker and Kubernetes knowledge",
      "API design experience",
    ],
    salary: {
      min: 80,
      max: 120,
      currency: "USD",
    },
    type: "contract" as const,
    remote: true,
    tags: ["Node.js", "Python", "Docker", "Kubernetes", "API"],
    applicationEmail: "contracts@enterprise.com",
  },
];

async function seedJobs() {
  try {
    await dbConnect();

    // Clear existing jobs
    await Job.deleteMany({});

    // Insert sample jobs
    const result = await Job.insertMany(sampleJobs);

    console.log(`Successfully seeded ${result.length} jobs`);
    console.log("Sample jobs created:");
    result.forEach((job) => {
      console.log(`- ${job.title} at ${job.company}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedJobs();
