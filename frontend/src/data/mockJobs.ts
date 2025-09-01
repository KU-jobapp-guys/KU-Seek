import type { Job } from "@/assets/type";

export const mockJobs: Job[] = [
  {
    company: "TechCorp Inc.",
    role: "Frontend Developer",
    location: "Bangkok, Thailand",
    postTime: new Date("2025-08-01T10:00:00"),
    description: `Develop and maintain web applications using React and TypeScript. Collaborate with designers and backend developers. Ensure responsiveness and performance optimization across browsers and devices.`,
    highlights: [
      "Develop web applications with React & TypeScript",
      "Collaborate with designers & backend developers",
      "Ensure responsive & high-performance UI"
    ],
    jobType: "Full-time",
    skills: ["React", "TypeScript", "HTML", "CSS", "TailwindCSS"],
    salary: "50,000 THB/month"
  },
  {
    company: "DataSolutions Co.",
    role: "Data Analyst",
    location: "Chiang Mai, Thailand",
    postTime: new Date("2025-08-03T15:30:00"),
    description: `Analyze large datasets, generate reports and insights, collaborate with business teams, and ensure data accuracy. Build dashboards for stakeholders and support data-driven decisions.`,
    highlights: [
      "Analyze large datasets",
      "Generate actionable insights",
      "Build dashboards for stakeholders"
    ],
    jobType: "Contract",
    skills: ["SQL", "Python", "Excel", "Tableau"],
    salary: "40,000 THB/month"
  },
  {
    company: "FinTech Global",
    role: "Backend Developer",
    location: "Bangkok, Thailand",
    postTime: new Date("2025-08-05T09:00:00"),
    description: `Build scalable backend services and REST APIs using Node.js and Express. Implement database models, authentication, and caching strategies. Work closely with frontend developers for seamless integration.`,
    highlights: [
      "Build backend services & REST APIs",
      "Implement database & authentication",
      "Collaborate with frontend team"
    ],
    jobType: "Full-time",
    skills: ["Node.js", "Express", "MongoDB", "Docker"],
    salary: "60,000 THB/month"
  },
  {
    company: "Creative Studios",
    role: "UI/UX Designer",
    location: "Phuket, Thailand",
    postTime: new Date("2025-08-07T11:45:00"),
    description: `Design user interfaces and experiences for web and mobile applications. Conduct user research, create wireframes, prototypes, and ensure design consistency across platforms.`,
    highlights: [
      "Design UI/UX for web & mobile apps",
      "Conduct user research & create prototypes",
      "Ensure consistent design across platforms"
    ],
    jobType: "Part-time",
    skills: ["Figma", "Adobe XD", "Sketch", "User Research"],
    salary: "30,000 THB/month"
  },
];
