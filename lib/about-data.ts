export interface TimelineEntry {
  title: string;
  org: string;
  date: string;
  bullets?: string[];
  note?: string;
}

export const EXPERIENCE: TimelineEntry[] = [
  {
    title: "AI & Data Science Intern",
    org: "PaySky",
    date: "Jun – Aug 2025",
    bullets: [
      "Built a PySpark ETL pipeline ingesting 24M+ transaction, user, and card records in a single automated run.",
      "Benchmarked K-Means, DBSCAN, GMM, Agglomerative & Rule-Based clustering; selected Agglomerative via silhouette scores.",
      "Segmented users into Loyal / At-Risk / Churned personas; layered geographic heat maps via Plotly Mapbox.",
      "Deployed full solution with FastAPI backend, React frontend, and Docker containers.",
    ],
  },
  {
    title: "Teaching Co-Assistant",
    org: "Misr International University",
    date: "Sep 2024 – Jan 2025",
    bullets: [
      "Led C++ tutorial sessions and one-on-one support for a cohort of first-year students.",
      "Directly improved lab pass rates through targeted session planning.",
    ],
  },
];

export const EDUCATION: TimelineEntry[] = [
  {
    title: "BSc Computer Science",
    org: "Misr International University",
    date: "2023 – 2027",
    note: "GPA 3.32 / 4.0",
  },
  {
    title: "Supervised Machine Learning: Regression & Classification",
    org: "DeepLearning.AI & Stanford University — Coursera",
    date: "2024",
    note: "Linear / logistic regression, gradient descent, regularisation, NumPy, Scikit-learn",
  },
  {
    title: "Digital Egypt Pioneers — Data Science Scholarship",
    org: "Egyptian Ministry of Communications & IT",
    date: "2024 – 2025",
    note: "Data analysis, ML, big data — Pandas, NumPy, TensorFlow, Scikit-learn",
  },
];

export const CHANNELS = [
  {
    label: "yahiamhammad@gmail.com",
    href: "mailto:yahiamhammad@gmail.com",
    type: "email",
  },
  {
    label: "github.com/yahiahammad",
    href: "https://github.com/yahiahammad",
    type: "github",
  },
  {
    label: "linkedin.com/in/yahiahammad",
    href: "https://linkedin.com/in/yahiahammad",
    type: "linkedin",
  },
];
