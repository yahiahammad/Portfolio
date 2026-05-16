export interface CaseStudySection {
  id: string;
  label: string;
}

export interface Metric {
  n: string;
  d: string;
}

export interface Challenge {
  q: string;
  a: string;
}

export interface CaseStudy {
  slug: string;
  id: string;
  title: string;
  type: string;
  tagline: string;
  role: string;
  timeline: string;
  status: string;
  github: string;
  privateRepo?: boolean;
  demo: string;
  demoPage?: string;
  stack: string[];
  sections: CaseStudySection[];
  overviewParagraphs: string[];
  problemParagraphs: string[];
  highlights: string[];
  challenges: Challenge[];
  metrics: Metric[];
  outcomeText: string;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "unibite": {
    slug: "unibite",
    id: "01",
    title: "Unibite",
    type: "Full-Stack",
    tagline:
      "University food ordering platform with JWT auth, role-based access control, and real-time order management — built for the MIU cafeteria as a production-grade Node.js/EJS application with three distinct user roles.",
    role: "Full-Stack Developer",
    timeline: "Spring 2025",
    status: "Shipped",
    github: "https://github.com/yahiahammad/UniBite",
    privateRepo: true,
    demo: "https://unibite.store",
    stack: ["Node.js", "Express.js", "MongoDB", "EJS", "JWT", "Mongoose", "REST API"],
    sections: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
      { id: "highlights", label: "Technical Highlights" },
      { id: "challenges", label: "Challenges & Decisions" },
      { id: "outcome", label: "Outcome" },
    ],
    overviewParagraphs: [
      "Unibite is a full-stack food ordering platform designed for the Misr International University cafeteria. Students browse a live menu and place orders, vendors manage their offerings and fulfil incoming requests, and admins oversee the entire platform — all rendered server-side with EJS templates and backed by a Node.js/Express REST API.",
      "The system enforces strict role separation across three distinct account types: students order food, vendors manage menus and process orders for their stall, and admins control platform-wide settings and user management. Every boundary is enforced at the Express middleware layer, not just the UI.",
    ],
    problemParagraphs: [
      "University cafeterias typically operate on paper slips and verbal orders — a system that collapses under lunchtime volume. Students queue for 20+ minutes, orders get lost, and cafeteria staff have no real-time visibility into demand. There was no digital touchpoint between the kitchen and the customer.",
      "The challenge was to replace this with a product that feels consumer-grade but runs on university infrastructure: reliable under burst traffic, manageable by non-technical cafeteria vendors, and secure enough to prevent students from accessing vendor or admin controls or each other's order histories.",
    ],
    highlights: [
      "Stateless JWT authentication with role claims embedded in the token payload — middleware on every protected route validates the token and extracts the role without a database round-trip.",
      "Role-based access control implemented at the Express.js middleware layer, gating admin routes behind a role-assertion middleware that short-circuits the request before hitting any controller logic.",
      "Mongoose schemas with pre-save hooks for password hashing via bcrypt, keeping credential handling out of controller code and ensuring passwords are never stored in plaintext.",
      "Real-time order status updates rendered via EJS partials with server-side state — order state transitions (Pending → Preparing → Ready → Completed) are persisted to MongoDB and reflected on page refresh within the vendor dashboard.",
      "Vendor dashboard with per-stall sales analytics: daily order counts, revenue totals, and top-selling items computed via MongoDB aggregation pipelines, rendered server-side into EJS templates.",
    ],
    challenges: [
      {
        q: "Session management: JWT vs. server sessions",
        a: "Chose stateless JWTs over session cookies to avoid server-side session storage and simplify horizontal scaling. Role claims in the payload eliminate a database lookup on every authenticated request.",
      },
      {
        q: "Preventing privilege escalation across three roles",
        a: "EJS template gating is cosmetic — every vendor and admin route requires the Express middleware to independently verify the JWT role claim. A student with a crafted token receives a 403 before any controller logic runs.",
      },
      {
        q: "Schema flexibility vs. data integrity in MongoDB",
        a: "Used Mongoose schemas with strict mode enabled and required field validation to enforce structure at the application layer, compensating for MongoDB's schema-less storage model.",
      },
      {
        q: "Order state consistency across concurrent updates",
        a: "Implemented atomic findByIdAndUpdate operations with $set to prevent partial writes, ensuring order state transitions are never interleaved across concurrent admin actions.",
      },
    ],
    metrics: [
      { n: "3", d: "Distinct user roles: student, vendor, admin" },
      { n: "JWT", d: "Stateless auth with role claims — zero DB on verify" },
      { n: "EJS", d: "Server-side templating — no client-side JS framework" },
      { n: "Agg.", d: "MongoDB aggregation pipelines for per-stall analytics" },
    ],
    outcomeText:
      "Delivered a production-ready university food ordering system from schema design to deployed UI — complete three-role hierarchy (student, vendor, admin), protected API surface, order lifecycle tracking, and per-stall sales analytics. The project demonstrated a full server-rendered Node.js stack under realistic multi-role requirements, with security enforced at the middleware layer rather than relying on EJS template gating.",
  },
  "robotic-arm": {
    slug: "robotic-arm",
    id: "02",
    title: "Robotic Arm",
    type: "Hardware · Embedded",
    tagline:
      "Wireless gesture-controlled robotic hand that replicates finger flex and wrist orientation in real time — five flex sensors and an MPU-6050 on a glove, dual ESP32s communicating over UDP, servos on the hand.",
    role: "Embedded Systems Engineer",
    timeline: "Spring 2026",
    status: "Shipped",
    github: "",
    privateRepo: true,
    demo: "",
    stack: ["ESP32", "C++", "MPU-6050", "Flex Sensors", "Wi-Fi UDP", "PWM / Servos"],
    sections: [
      { id: "overview",    label: "Overview" },
      { id: "problem",     label: "Problem" },
      { id: "highlights",  label: "Technical Highlights" },
      { id: "challenges",  label: "Challenges & Decisions" },
      { id: "outcome",     label: "Outcome" },
    ],
    overviewParagraphs: [
      "The Robotic Arm is a wireless gesture-replication system built around two ESP32 microcontrollers. A glove worn by the operator carries five flex sensors (one per finger) and an MPU-6050 IMU on the wrist. A sender ESP32 reads all sensor data, packages it into a compact UDP payload, and streams it over Wi-Fi to a receiver ESP32 mounted on the robotic hand — which drives five servo motors and a wrist servo to mirror the operator's movements in real time.",
      "The design goal was 1:1 fidelity with imperceptible lag: every finger curl and wrist rotation on the glove should appear on the robotic hand within the same motion cycle, with no perceptible delay. The entire stack runs on bare-metal C++ firmware with no RTOS, keeping interrupt and loop latency deterministic.",
    ],
    problemParagraphs: [
      "Existing low-cost robotic hand projects typically use a single microcontroller with a wired connection, limiting reach and requiring the operator to stay tethered to the hand. Introducing wireless communication while keeping latency low enough for real-time replication is the central engineering problem — Wi-Fi stacks add non-deterministic delay, and TCP's acknowledgement overhead compounds it.",
      "The secondary problem is sensor mapping: flex sensors produce a non-linear analog voltage proportional to bend angle, and the MPU-6050 gyroscope accumulates drift over time. Both require calibration and filtering before the data is meaningful enough to drive servo positions accurately.",
    ],
    highlights: [
      "Flex sensors on all five fingers wired to ESP32 ADC pins — raw analog readings per sensor calibrated at rest and full-flex positions to produce a normalised [0, 1] bend coefficient, then mapped to a servo PWM range via linear interpolation.",
      "MPU-6050 connected over I2C at 400 kHz delivering 3-axis accelerometer and 3-axis gyroscope data; a complementary filter combines both axes to produce stable pitch and roll angles while suppressing gyroscope drift.",
      "UDP transport chosen over TCP on the sender-to-receiver link — no connection setup, no acknowledgement round-trips, packets transmitted at ~100 Hz. A compact binary struct carries all six sensor values in a single datagram, keeping payload size under 50 bytes.",
      "Receiver-side servo control via ESP32 hardware PWM (LEDC peripheral) producing 50 Hz signals with pulse widths mapped from incoming angle data — each servo updated every packet, giving smooth, continuous motion.",
      "Static IP addressing on both ESP32s in AP/STA mode eliminates DNS lookup and DHCP negotiation from the latency budget, keeping the wireless round-trip time consistently under 20 ms.",
    ],
    challenges: [
      {
        q: "TCP vs UDP for real-time sensor streaming",
        a: "TCP's retransmission and congestion-control machinery added 40–80 ms of jitter in early tests — unacceptable for a real-time replication system. Switched to UDP and accepted occasional packet loss: a dropped frame means the hand holds its last position for one cycle (~10 ms), which is imperceptible in practice.",
      },
      {
        q: "Gyroscope drift corrupting wrist orientation over time",
        a: "Pure gyroscope integration accumulates several degrees of error per minute. Applied a complementary filter blending accelerometer-derived angle (accurate long-term, noisy short-term) with gyroscope-integrated angle (accurate short-term, drifts long-term) using a 0.96/0.04 weight split, producing stable orientation with no visible drift over extended sessions.",
      },
      {
        q: "Non-linear flex sensor response across the bend range",
        a: "Flex sensors do not produce a linear voltage curve across their full range — the relationship between bend angle and resistance is roughly logarithmic. Addressed with a per-sensor two-point calibration (flat and fully curled) and a lookup map that corrects the curve before the value reaches the interpolation stage.",
      },
      {
        q: "Servo chatter from high-frequency packet updates",
        a: "Updating servos every incoming packet (100 Hz) caused audible buzzing and motor heating because servos re-seek their position on every PWM update even when the target is unchanged. Added a dead-zone threshold: servo position only updates if the new target differs from the current position by more than 2°, eliminating chatter without any perceptible lag in motion.",
      },
    ],
    metrics: [
      { n: "<20ms", d: "Wireless round-trip latency over Wi-Fi UDP" },
      { n: "100 Hz", d: "Sensor sampling and packet transmission rate" },
      { n: "6", d: "Degrees of freedom: 5 fingers + wrist orientation" },
      { n: "50B", d: "UDP payload size carrying all six sensor values" },
    ],
    outcomeText:
      "Delivered a fully wireless, real-time gesture-replication system with sub-20 ms end-to-end latency across six degrees of freedom. The complementary filter eliminated observable IMU drift, the dead-zone threshold resolved servo chatter, and the UDP transport kept latency deterministic under sustained operation. The project demonstrated that real-time embedded wireless control is achievable on commodity hardware with careful protocol and signal-processing choices.",
  },
  "ai-fitness-tracker": {
    slug: "ai-fitness-tracker",
    id: "04",
    title: "AI Fitness Tracker",
    type: "ML · Computer Vision",
    tagline:
      "Real-time rep counter tracking four exercises simultaneously — bicep curls (left & right), squats, and shoulder press — using arctan2 joint-angle trigonometry and EMA smoothing over a live webcam feed. No gym equipment, no wearables, just a camera.",
    role: "ML Engineer",
    timeline: "Fall 2025",
    status: "Shipped",
    github: "https://github.com/yahiahammad/MP-OCV-Fitness-Tracker",
    privateRepo: false,
    demo: "",
    demoPage: "/projects/ai-fitness-tracker/demo",
    stack: ["Python", "OpenCV", "MediaPipe", "NumPy", "Pygame"],
    sections: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
      { id: "highlights", label: "Technical Highlights" },
      { id: "challenges", label: "Challenges & Decisions" },
      { id: "outcome", label: "Outcome" },
    ],
    overviewParagraphs: [
      "AI Fitness Tracker is a real-time computer vision application that detects human pose from a live webcam feed, computes joint angles via arctan2 trigonometry, and uses those angles to simultaneously count repetitions across four exercises — left curl, right curl, squat, and shoulder press — all running locally on CPU with no internet connection required.",
      "Each exercise has its own joint triplet and angle thresholds defining the UP and DOWN phases. Wrist position relative to the nose landmark disambiguates curls from shoulder press without any additional input. An exponential moving average smooths raw landmark output per frame, and a semi-transparent HUD with per-exercise progress bars renders directly onto the video feed via OpenCV.",
    ],
    problemParagraphs: [
      "Most people who exercise at home have no feedback mechanism — they count reps manually, lose track mid-set, and have no way to know whether their range of motion is sufficient. Personal trainers are expensive. Wearable trackers count steps but cannot evaluate movement quality or distinguish between exercises.",
      "The goal was to build a system that could track multiple exercises simultaneously using only a laptop webcam and open-source Python libraries — no cloud inference, no GPU, no wearables. The core engineering challenge was making the angle pipeline accurate enough to count correctly without being so sensitive that minor landmark jitter triggers phantom reps.",
    ],
    highlights: [
      "MediaPipe Pose landmark pipeline detecting 33 body keypoints per frame at 25–30 fps on CPU, yielding normalised (x, y) coordinates for every joint used in angle computation.",
      "Joint angle computation via `np.arctan2`: for each joint triplet (e.g. shoulder→elbow→wrist), two 2D direction vectors are formed and the signed angle between them is extracted, folded into [0°, 180°] to produce a stable scalar per frame.",
      "Exponential moving average smoothing with α=0.7 applied per joint before threshold evaluation — `smoothed = 0.7 × prev + 0.3 × current` — attenuating landmark jitter without introducing the lag of a sliding window buffer.",
      "Wrist-relative-to-nose position check as the exercise disambiguator: curls require the wrist to stay below the nose landmark (y_wrist > y_nose in image coordinates), while shoulder press requires both wrists above it — allowing both exercises to run concurrently on the same angle stream.",
      "Semi-transparent OpenCV HUD rendered via `cv2.addWeighted` with per-exercise rep counters, stage labels, and progress bars mapped from joint angle to pixel width using `np.interp`.",
    ],
    challenges: [
      {
        q: "Landmark jitter triggering false rep counts",
        a: "Raw MediaPipe output oscillates by several degrees frame-to-frame on a stationary subject. Replaced per-frame raw angles with an exponential moving average (α=0.7), which suppresses noise while keeping reaction time fast enough that reps register within one motion cycle.",
      },
      {
        q: "Distinguishing curls from shoulder press on the same joint stream",
        a: "Both exercises use the shoulder/elbow/wrist triplet, so angle alone cannot tell them apart. Added a wrist-position gate: if the wrist is below the nose, the angle feeds the curl counter; if above, it feeds the press counter. This lets both run simultaneously with zero additional input.",
      },
      {
        q: "Preventing double-counts when angle hovers near a threshold",
        a: "A two-stage finite state machine (down → up) ensures a rep only registers on a complete phase transition. The counter increments only when the angle crosses the UP threshold after having previously confirmed the DOWN state — so hovering at the boundary cannot re-trigger.",
      },
      {
        q: "Rendering a responsive HUD without a UI framework",
        a: "Used `cv2.addWeighted` to alpha-blend black rectangles onto the frame for the top and bottom bars, avoiding hard opaque boxes. Progress bars are drawn as filled rectangles with width computed via `np.interp`, giving a live visual of range-of-motion without any additional dependency.",
      },
    ],
    metrics: [
      { n: "4", d: "Simultaneous exercise trackers: L curl, R curl, squat, press" },
      { n: "33", d: "Body keypoints detected per frame by MediaPipe Pose" },
      { n: "α=0.7", d: "EMA smoothing coefficient applied per joint per frame" },
      { n: "25–30", d: "FPS sustained on CPU — no GPU required" },
    ],
    outcomeText:
      "Delivered a fully local, real-time rep-counting system that simultaneously tracks four exercises from a single webcam feed with no server, cloud API, or specialised hardware. The arctan2 angle pipeline generalises across exercise types by swapping joint triplets and thresholds, and the wrist-position gate elegantly handles exercise disambiguation without extra sensors. The project demonstrates that a meaningful fitness feedback loop is achievable with a webcam and ~200 lines of Python.",
  },
  "careerpath-ai": {
    slug: "careerpath-ai",
    id: "03",
    title: "CareerPath AI",
    type: "AI · Full-Stack",
    tagline:
      "Career development platform combining RAG, LLM-powered counseling, and semantic course recommendations to map a personalized path from current skills to target role.",
    role: "Full-Stack Dev & ML Engineer",
    timeline: "Fall 2025",
    status: "Shipped",
    github: "https://github.com/yahiahammad/careerpath-ai",
    demo: "#",
    stack: ["Next.js", "TypeScript", "Supabase", "Groq (Llama 3.3)", "RAG", "Mermaid.js", "Fuse.js"],
    sections: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
      { id: "highlights", label: "Technical Highlights" },
      { id: "challenges", label: "Challenges & Decisions" },
      { id: "outcome", label: "Outcome" },
    ],
    overviewParagraphs: [
      "CareerPath AI is a full-stack career development platform that combines retrieval-augmented generation with a personalized skill assessment engine. It delivers tailored course recommendations, real-time career trajectory visualization, and an LLM-powered counselor — all driven by a locally-embedded Supabase Vector Store and sub-100ms Groq inference.",
      "The platform targets students and early-career engineers who know their current skills but lack a structured path forward. Rather than surfacing job listings, CareerPath maps the gap between where you are and where you want to go, then builds a concrete plan to close it.",
    ],
    problemParagraphs: [
      "Job seekers and students face a structureless information problem. Generic job boards surface roles but offer no path — leaving users to manually reverse-engineer required skills from job descriptions, search for courses, and guess at timelines. There's no feedback loop.",
      "Existing tools (LinkedIn Learning, Coursera) are passive content libraries. They require the user to already know what to learn. CareerPath inverts this: given a target role and a current skill profile, it generates a personalized learning roadmap and surfaces the right resources automatically — without the user having to know the right questions to ask.",
    ],
    highlights: [
      "RAG pipeline using the Groq SDK (Llama 3.3) and Supabase Vector Store with Xenova Transformers for semantic embedding and nearest-neighbor course retrieval.",
      "LLM-powered career counselor chatbot generating Mermaid.js diagrams on-the-fly to visualize career trajectories and pivot paths as tokens stream in.",
      "PostgreSQL Row Level Security policies enforcing strict multi-tenant data isolation — each user's profile, history, and skill data is isolated at the database layer.",
      "Custom Fuse.js assessment engine fuzzy-matching user-declared proficiencies against a 200+ skill taxonomy to produce a ranked, weighted skill-gap report.",
      "Automated skill extraction from course metadata via the LLM, enabling dynamic tagging and relevance scoring for the personalized recommendation feed.",
    ],
    challenges: [
      {
        q: "RAG vs. fine-tuning for domain knowledge",
        a: "Chose RAG over fine-tuning for interpretability and zero retraining cost. The knowledge base can be updated by swapping embeddings — a single upsert, no model touch required.",
      },
      {
        q: "Embedding strategy without a dedicated microservice",
        a: "Used Xenova Transformers running as a WASM module inside Next.js API routes, eliminating a separate embedding service and keeping infrastructure costs at zero.",
      },
      {
        q: "Real-time diagram rendering from streaming LLM output",
        a: "Built a streaming response parser that detects Mermaid.js code fences in the token stream and progressively re-renders diagrams as the LLM completes each definition node.",
      },
      {
        q: "Skill-gap scoring across heterogeneous self-reported data",
        a: "Used Fuse.js fuzzy search to normalize free-text skill inputs against a canonical taxonomy, then applied cosine-weighted scoring to produce a ranked, human-readable gap report.",
      },
    ],
    metrics: [
      { n: "<150ms", d: "Average recommendation response via Groq inference" },
      { n: "200+", d: "Industry skill benchmarks in the assessment taxonomy" },
      { n: "5", d: "Core user flows: assess, recommend, plan, chat, visualize" },
      { n: "RLS", d: "Row Level Security enforced on every user data table" },
    ],
    outcomeText:
      "Delivered a fully functional end-to-end career assessment platform — from skill intake and vector-based course matching to a streaming LLM chatbot generating live career trajectory diagrams. The architecture runs entirely on a free Supabase tier with zero backend servers beyond Vercel edge functions, keeping infrastructure overhead at absolute minimum.",
  },
};

export const CASE_STUDY_ORDER = ["unibite", "robotic-arm", "ai-fitness-tracker", "careerpath-ai"];

export function getNextStudy(currentSlug: string): CaseStudy {
  const idx = CASE_STUDY_ORDER.indexOf(currentSlug);
  const nextSlug = CASE_STUDY_ORDER[(idx + 1) % CASE_STUDY_ORDER.length];
  return CASE_STUDIES[nextSlug];
}
