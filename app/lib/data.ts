export const PERSONAL = {
  name: "Gayathri Menon",
  email: "gmenon.workco@gmail.com",
  linkedin: "https://www.linkedin.com/in/gayathri-menon-328376274/",
  github: "https://github.com/whoj1ngmu77",
  location: "Delhi, India",
  university: "Vellore Institute of Technology",
  degree: "BTech, Electrical and Computer Science Engineering",
  year: "3rd Year",
  cgpa: "8.3 / 10.0",
  graduation: "July 2028",
  headshot: "/Gayathri_headshot.png",
  resume: "/Resume-Gayathri.pdf",
  tagline: "Engineer by training. Builder by nature. Designer at heart.",
};
import type {
  Project,
  SkillCategory,
  Experience,
  Certification,
  DesignWork,
  NavItem,
} from "@/app/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Projects",    districtName: "Innovation District", href: "#projects"       },
  { label: "Skills",      districtName: "Skills Garden",       href: "#skills"         },
  { label: "Experience",  districtName: "Guild Hall",          href: "#experience"     },
  { label: "Vision",      districtName: "The Vision Tower",    href: "#vision"         },
  { label: "Design",      districtName: "Studio District",     href: "#design"         },
  { label: "Contact",     districtName: "The Beacon",          href: "#contact"        },
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Personal Finance Intelligence System",
    description:
      "AI-powered financial analytics dashboard that transforms raw transaction data into spending intelligence, behavioral insights, risk detection, and predictive analytics.",
    longDescription:
      "Upload raw bank statements, UPI history, or CSV files and instantly get spending analytics, behavioral intelligence (late-night spending, impulse purchases), overspending risk prediction, financial health scoring, and smart personalized recommendations. Built to simulate a real-world fintech system.",
    techStack: ["Python", "Streamlit", "Pandas", "Scikit-learn", "Plotly", "Machine Learning"],
    githubUrl: "https://github.com/whoj1ngmu77/personal-finance-intelligence-system",
    liveUrl: "https://finintel.streamlit.app/",
    category: "data",
    featured: true,
    year: 2025,
  },
  {
    id: "p2",
    title: "SonicClear",
    description:
      "Real-time speech enhancement system using DSP and deep learning — spectral gating with Ideal Ratio Masking to suppress background noise and improve speech clarity in low-SNR environments.",
    longDescription:
      "SonicClear uses Ideal Ratio Masking (IRM) and neural noise suppression to clean audio in real time. Built a low-latency streaming pipeline in Python with librosa and PyTorch. Applicable to transcription tools, accessibility software, and voice interfaces.",
    techStack: ["Python", "PyTorch", "librosa", "DSP", "IRM", "Deep Learning"],
    githubUrl: "https://github.com/whoj1ngmu77/SonicClear-Real-Time-Speech-Enhancement-System",
    liveUrl: "https://sonic-real-time-speech-enhancement-system.streamlit.app/",
    category: "ai",
    featured: true,
    year: 2024,
  },
  {
    id: "p3",
    title: "Notevera AI",
    description:
      "Smart AI platform that converts study material into organised notes, study planners, and personalised learning resources using NLP and transformer-based models.",
    longDescription:
      "Built an AI-driven note-taking assistant that auto-summarizes, tags, and organizes study material using transformer-based NLP. Features a conversational interface for natural-language note querying and a responsive frontend. Designed to reduce cognitive load for students.",
    techStack: ["Python", "Transformers", "NLP", "HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/whoj1ngmu77/Notevera-ai",
    liveUrl: "https://notevera-ai.vercel.app/",
    category: "ai",
    featured: true,
    year: 2024,
  },
  {
    id: "p4",
    title: "Face Recognition System",
    description:
      "Computer vision project using OpenCV to detect and recognise faces in real time — built as a foundational exploration of image processing and CV pipelines.",
    longDescription:
      "Implemented a face detection and recognition pipeline using OpenCV's Haar cascade classifiers and LBPH face recognizer. Supports real-time webcam input and static image recognition. An early hands-on project that sparked a deeper interest in computer vision.",
    techStack: ["Python", "OpenCV", "Computer Vision", "Haar Cascade", "LBPH"],
    githubUrl: "https://github.com/whoj1ngmu77/FaceRecognition-opencvproject",
    liveUrl: "#",
    category: "ai",
    featured: false,
    year: 2024,
  },
  {
    id: "p5",
    title: "AI Research Assistant",
    description:
      "Full-stack RAG application where users upload PDFs and ask natural language questions — answers are grounded in the document with page-level source citations, streaming token-by-token like ChatGPT.",
    longDescription:
      "Built a production-quality RAG pipeline: PDF parsing with pypdf, semantic chunking via LangChain, 3072-dimensional Gemini embeddings stored in ChromaDB with per-user metadata filtering, and answer generation with Gemini 2.5 Flash. V2 adds Google OAuth authentication, persistent chat session history with SQLite, real-time streaming responses via Server-Sent Events, and a live usage analytics dashboard. Deployed on Vercel (frontend) and Render (backend).",
    techStack: ["Python", "FastAPI", "Next.js", "TypeScript", "Gemini API", "ChromaDB", "LangChain", "SQLAlchemy", "NextAuth", "Tailwind CSS"],
    githubUrl: "https://github.com/whoj1ngmu77/ai-research-assistant",
    liveUrl: "https://ai-research-assistant-ean8jjj6i.vercel.app",
    category: "ai",
    featured: true,
    year: 2026,
  },
{
    id: "p6",
    title: "Mirra AI",
    description:
      "Production mental wellness chatbot co-built with a collaborator — designed to make emotional support more accessible through empathetic AI conversation and mood tracking.",
    longDescription:
      "Built a full-stack mental wellness platform with persistent emotional memory, Google OAuth, mood-chip inputs, 12 wellness games, crisis routing to verified Indian helplines, and Chart.js mood analytics. Features Aurora Borealis dark and soft pastel themes. Filed a patent disclosure report for the novel emotional memory architecture.",
    techStack: ["Next.js", "FastAPI", "Gemini API", "Python", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/whoj1ngmu77",
    liveUrl: "https://mirraaiag.vercel.app",
    category: "ai",
    featured: true,
    year: 2026,
  },
  {
    id: "p7",
    title: "AI Interview Coach",
    description:
      "Production multi-agent AI system where 4 specialized agents collaborate to analyze your resume, generate targeted questions, conduct a mock interview, and evaluate your performance.",
    longDescription:
      "Built a LangGraph-orchestrated multi-agent pipeline: Agent 1 analyzes resume strengths and skill gaps, Agent 2 generates personalized questions, Agent 3 conducts a real-time mock interview with conversation memory, Agent 4 evaluates all answers and generates a detailed feedback report with per-question scores. Features persistent session storage, analytics dashboard, and 19 passing tests. Deployed on Vercel and Render.",
    techStack: ["Next.js 15", "TypeScript", "FastAPI", "LangGraph", "Groq", "Python", "Docker", "Tailwind CSS"],
    githubUrl: "https://github.com/whoj1ngmu77/ai-interview-coach",
    liveUrl: "https://ai-interview-coach-inky-omega.vercel.app",
    category: "ai",
    featured: true,
    year: 2026,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming",
    districtLabel: "The Core Tower",
    color: "#4ECDC4",
    skills: [
      { name: "Python", level: "flourishing", icon: "🐍" },
      { name: "TypeScript", level: "blooming", icon: "🔷" },
      { name: "JavaScript", level: "blooming", icon: "✨" },
      { name: "C/C++", level: "growing", icon: "⚙️" },
      { name: "Java", level: "growing", icon: "☕" },
      { name: "SQL", level: "blooming", icon: "🗃️" },
    ],
  },
  {
    id: "datascience",
    name: "Data Science",
    districtLabel: "The Observatory",
    color: "#D4A843",
    skills: [
      { name: "Pandas", level: "flourishing", icon: "🐼" },
      { name: "NumPy", level: "flourishing", icon: "🔢" },
      { name: "Matplotlib", level: "blooming", icon: "📊" },
      { name: "Scikit-learn", level: "blooming", icon: "🔬" },
      { name: "Jupyter", level: "flourishing", icon: "📓" },
      { name: "Tableau", level: "growing", icon: "📈" },
    ],
  },
  {
    id: "aiml",
    name: "AI & ML",
    districtLabel: "The Neural Spire",
    color: "#C4B0E8",
    skills: [
      { name: "TensorFlow", level: "blooming", icon: "🧠" },
      { name: "PyTorch", level: "growing", icon: "🔥" },
      { name: "NLP", level: "growing", icon: "💬" },
      { name: "Computer Vision", level: "growing", icon: "👁️" },
      { name: "LLM APIs", level: "blooming", icon: "🤖" },
      { name: "Prompt Engineering", level: "blooming", icon: "✍️" },
    ],
  },
  {
    id: "design",
    name: "Design",
    districtLabel: "The Studio",
    color: "#FF8C42",
    skills: [
      { name: "Figma", level: "flourishing", icon: "🎨" },
      { name: "Adobe Illustrator", level: "blooming", icon: "🖊️" },
      { name: "Photoshop", level: "blooming", icon: "🖼️" },
      { name: "UI/UX Design", level: "blooming", icon: "🎯" },
      { name: "Typography", level: "growing", icon: "🔤" },
      { name: "Brand Design", level: "growing", icon: "💎" },
    ],
  },
  {
    id: "tools",
    name: "Tools & Platforms",
    districtLabel: "The Toolshed",
    color: "#7BC67E",
    skills: [
      { name: "Git / GitHub", level: "flourishing", icon: "🌿" },
      { name: "Docker", level: "growing", icon: "🐳" },
      { name: "Linux", level: "blooming", icon: "🐧" },
      { name: "VS Code", level: "flourishing", icon: "💻" },
      { name: "Vercel", level: "blooming", icon: "▲" },
      { name: "Postman", level: "growing", icon: "📮" },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "e1",
    role: "Creative Design Intern",
    organization: "Spectov Startup",
    type: "internship",
    startDate: "Jan 2026",
    endDate: "Jul 2026",
    description:
      "Produced social media graphics, UI mockups, and brand assets for a growing startup using Canva and Figma, maintaining visual consistency across all digital deliverables.",
    highlights: [
      "Produced social media graphics, UI mockups, and brand assets using Canva and Figma",
      "Maintained visual consistency across all digital deliverables",
      "Collaborated with cross-functional teams to iterate on designs under deadlines",
      "Incorporated stakeholder feedback to meet business objectives",
    ],
    location: "Remote",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "c1",
    title: "IBM Generative AI Using IBM WatsonX",
    issuer: "IBM",
    date: "2024",
    credentialUrl: "#",
    category: "technical",
  },
  {
    id: "c2",
    title: "Frontend Development Certification",
    issuer: "Coursera",
    date: "2024",
    credentialUrl: "#",
    category: "technical",
  },
  {
    id: "c3",
    title: "Data Analytics Certification",
    issuer: "DeepLearning.AI / Coursera",
    date: "2024",
    credentialUrl: "#",
    category: "technical",
  },
  {
    id: "c4",
    title: "Google Solution Challenge Participant",
    issuer: "Google",
    date: "2024",
    credentialUrl: "#",
    category: "other",
  },
];
export const VISION_CARDS = [
  {
    id: "v1",
    icon: "🚀",
    title: "Why I Build",
    content:
      "I enjoy turning ideas into things people can actually use. Whether it's a machine learning project, a data dashboard, a design concept, or a web application, I'm most motivated when I'm solving a real problem and learning something new along the way. For me, technology is more than code — it's a way to create experiences, improve decisions, and make complex things easier for people.",
    accentColor: "var(--teal)",
  },
  {
    id: "v2",
    icon: "✨",
    title: "What Makes Me Different",
    content:
      "I enjoy exploring the space between engineering, data, and design. While many people choose one path, I like understanding both how something works and how people experience it. That curiosity has led me to experiment with AI, data analytics, web development, design systems, and creative problem solving. I believe the best solutions happen when technical thinking and creativity work together.",
    accentColor: "var(--brass)",
  },
  {
    id: "v3",
    icon: "🎯",
    title: "What I'm Looking For",
    content:
      "I'm looking for opportunities that challenge me to learn faster, think deeper, and contribute to meaningful work. I enjoy environments where curiosity is encouraged, experimentation is welcomed, and people care about building things well. My current focus is growing toward a career in Data Science, Analytics, Machine Learning, and technology-driven problem solving.",
    accentColor: "var(--ember)",
  },
  {
    id: "v4",
    icon: "🌟",
    title: "Long-Term Vision",
    content:
      "I want to build products and solutions that combine data, technology, and human-centered design. My goal is not just to write code or analyze data. I want to create things that are useful, intuitive, and impactful — the kind of work that helps people make better decisions, solve real problems, and experience technology in a better way.",
    accentColor: "var(--lavender)",
  },
];

export const MISSION_LOG = {
  objective: "Become an exceptional Data Scientist.",
  focus: ["Data Analytics", "Machine Learning", "Problem Solving", "Building Real Projects"],
  values: ["Curiosity", "Consistency", "Creativity", "Continuous Learning"],
  cityStatus: "EXPANDING",
  version: "Nimbara v1.0",
};

export const DESIGN_WORKS: DesignWork[] = [
  {
    id: "d1",
    title: "Aurora Fest — Event Branding",
    category: "branding",
    description:
      "Complete visual identity for Aurora Fest 2024 — a college cultural festival. Includes logo, colour system, poster series, and social media kit.",
    imageUrl: "",
    tools: ["Figma", "Adobe Illustrator"],
    year: 2024,
  },
  {
    id: "d2",
    title: "DataLens — Product UI",
    category: "ui",
    description:
      "Full UI design system for the DataLens dashboard project — dark mode, data-forward layout, and accessible component library.",
    imageUrl: "",
    tools: ["Figma", "Tailwind CSS"],
    year: 2024,
  },
  {
    id: "d3",
    title: "Solarpunk City — Illustration Series",
    category: "illustration",
    description:
      "A five-part digital illustration series exploring what solarpunk cities might look like — the inspiration behind Nimbara.",
    imageUrl: "",
    tools: ["Adobe Illustrator", "Photoshop"],
    year: 2023,
  },
  {
    id: "d4",
    title: "IEEE Chapter Rebrand",
    category: "branding",
    description:
      "Redesigned the university IEEE chapter's visual identity — modernised logo, new colour palette, and a flexible design system.",
    imageUrl: "",
    tools: ["Figma", "Adobe Illustrator"],
    year: 2023,
  },
  {
    id: "d5",
    title: "Nimbara Typographic Poster",
    category: "poster",
    description:
      "Typographic art poster — 'Cities are built from ideas'. Exploring the intersection of engineering precision and design expression.",
    imageUrl: "",
    tools: ["Figma", "Adobe Photoshop"],
    year: 2024,
  },
  {
    id: "d6",
    title: "Personal Logo & Brand",
    category: "branding",
    description:
      "My own personal brand — a logomark that bridges circuit-board geometry and organic form. Built to grow with me.",
    imageUrl: "",
    tools: ["Adobe Illustrator"],
    year: 2023,
  },
];
