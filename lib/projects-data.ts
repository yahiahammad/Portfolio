export interface Project {
  id: string;
  slug: string;
  title: string;
  type: string;
  year: string;
  desc: string;
  tags: string[];
  hasCase?: boolean;
  /** Path relative to /public, e.g. "/projects/unibite.png" */
  image?: string;
}

export interface SkillCategory {
  cat: string;
  score: number;
  items: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "unibite",
    image: "/projects/unibite.png",
    title: "Unibite",
    type: "Full-Stack",
    year: "2025",
    desc: "Full-stack university food ordering platform with JWT auth, role-based access, real-time order management, and mobile-responsive UI.",
    tags: ["Node.js", "Express.js", "MongoDB", "EJS"],
    hasCase: true,
  },
  {
    id: "02",
    slug: "robotic-arm",
    image: "/projects/robotic-arm.png",
    title: "Robotic Arm",
    type: "Hardware · Embedded",
    year: "2026",
    desc: "Wireless gesture-controlled robotic hand with 1:1 real-time motion replication over low-latency Wi-Fi UDP between dual ESP32s.",
    tags: ["ESP32", "C++", "MPU-6050"],
    hasCase: true,
  },
  {
    id: "03",
    slug: "careerpath-ai",
    title: "CareerPath AI",
    image: "/projects/careerpath-ai.png",
    type: "AI · Full-Stack",
    year: "2025",
    desc: "Career development platform with RAG pipeline, LLM-powered counselor, and semantic course recommendations via Supabase Vector Store.",
    tags: ["Next.js", "Groq", "RAG"],
    hasCase: true,
  },
  {
    id: "04",
    slug: "ai-fitness-tracker",
    image: "/projects/ai-fitness-tracker.svg",
    title: "AI Fitness Tracker",
    type: "ML · Computer Vision",
    year: "2025",
    desc: "Real-time posture correction and rep-counting using trigonometric joint-angle computation and frame-smoothing over live video.",
    tags: ["Python", "OpenCV", "MediaPipe"],
    hasCase: true,
  },
];

export const SKILLS: SkillCategory[] = [
  {
    cat: "Languages",
    score: 82,
    items: ["Python", "JavaScript", "TypeScript", "Java", "C++", "C"],
  },
  {
    cat: "Frontend",
    score: 86,
    items: ["React", "Next.js", "Tailwind CSS", "ShadCN", "Radix UI", "Recharts", "HTML / CSS"],
  },
  {
    cat: "Backend & DB",
    score: 80,
    items: ["Node.js", "Express.js", "FastAPI", "MongoDB", "PostgreSQL", "Supabase", "MySQL"],
  },
  {
    cat: "AI / ML",
    score: 75,
    items: ["PySpark", "Scikit-learn", "TensorFlow", "Pandas", "NumPy", "Groq SDK", "OpenCV", "MediaPipe"],
  },
  {
    cat: "Tools",
    score: 68,
    items: ["Docker", "Git", "Plotly", "Matplotlib", "Seaborn"],
  },
];
