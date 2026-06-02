import type {
  Project,
  SkillCategory,
  Experience,
  Certification,
  JourneyMilestone,
  DesignWork,
  NavItem,
} from "@/app/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Projects", districtName: "Innovation District", href: "#projects" },
  { label: "Skills", districtName: "Skills Garden", href: "#skills" },
  { label: "Experience", districtName: "Guild Hall", href: "#experience" },
  { label: "Journey", districtName: "Memory Lane", href: "#journey" },
  { label: "Design", districtName: "Studio District", href: "#design" },
  { label: "Contact", districtName: "The Beacon", href: "#contact" },
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Neural Skies",
    description:
      "A deep learning model that classifies cloud formations from satellite imagery using CNNs, achieving 94% accuracy across 11 cloud types.",
    longDescription:
      "Built a convolutional neural network pipeline to classify cloud formations from satellite data. Includes a full preprocessing workflow, data augmentation strategies, and a lightweight inference API.",
    techStack: ["Python", "TensorFlow", "OpenCV", "FastAPI", "Docker"],
    githubUrl: "#",
    liveUrl: "#",
    category: "ai",
    featured: true,
    year: 2024,
  },
  {
    id: "p2",
    title: "DataLens",
    description:
      "An interactive data visualization dashboard that transforms complex CSV datasets into explorable visual stories with real-time filtering.",
    longDescription:
      "End-to-end data pipeline and visualization tool built for non-technical users. Features drag-and-drop CSV upload, automatic chart recommendations, and shareable dashboard links.",
    techStack: ["React", "D3.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
    category: "data",
    featured: true,
    year: 2024,
  },
  {
    id: "p3",
    title: "CircuitChat",
    description:
      "A real-time collaborative IDE with integrated AI code suggestions, live syntax highlighting, and multi-user cursor tracking.",
    longDescription:
      "Collaborative coding environment with WebSocket-powered real-time sync, AI-assisted code completion via Anthropic API, and support for 15+ programming languages.",
    techStack: ["Next.js", "TypeScript", "WebSockets", "Redis", "Anthropic API"],
    githubUrl: "#",
    liveUrl: "#",
    category: "software",
    featured: true,
    year: 2023,
  },
  {
    id: "p4",
    title: "Solarpunk UI Kit",
    description:
      "A comprehensive open-source design system inspired by solarpunk aesthetics — warm, organic, and future-forward component library.",
    longDescription:
      "50+ Figma components and React primitives with full accessibility support, dark/light variants, and documentation site. Used by 200+ designers in the community.",
    techStack: ["Figma", "React", "Storybook", "CSS Variables", "TypeScript"],
    githubUrl: "#",
    liveUrl: "#",
    category: "design",
    featured: false,
    year: 2023,
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
    role: "Data Science Intern",
    organization: "TechCorp Analytics",
    type: "internship",
    startDate: "May 2024",
    endDate: "August 2024",
    description:
      "Worked within the data intelligence team to build predictive models and automated reporting pipelines for business stakeholders.",
    highlights: [
      "Built an ML pipeline that reduced report generation time by 60%",
      "Analysed datasets of 1M+ rows using Pandas and Spark",
      "Presented findings to cross-functional teams weekly",
      "Contributed to internal Python tooling used across 3 departments",
    ],
    location: "Bengaluru, India",
  },
  {
    id: "e2",
    role: "Research Assistant — NLP Lab",
    organization: "University Research Division",
    type: "research",
    startDate: "January 2024",
    endDate: "Present",
    description:
      "Assisting faculty researchers in developing NLP tools for low-resource South Indian languages, focusing on text classification and sentiment analysis.",
    highlights: [
      "Curating and annotating a novel Malayalam dataset of 50K samples",
      "Experimenting with fine-tuned BERT variants for regional language tasks",
      "Co-authoring a workshop paper submission",
    ],
    location: "Remote",
  },
  {
    id: "e3",
    role: "UI/UX Design Lead",
    organization: "IEEE Student Branch",
    type: "volunteering",
    startDate: "August 2023",
    endDate: "Present",
    description:
      "Leading the visual identity and digital design for the university's IEEE chapter, creating all event collateral, social media graphics, and website assets.",
    highlights: [
      "Redesigned the chapter website increasing engagement by 40%",
      "Created design systems for consistent brand across all events",
      "Mentored junior members in Figma and design fundamentals",
    ],
    location: "On-campus",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "c1",
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    date: "October 2024",
    credentialUrl: "#",
    category: "technical",
  },
  {
    id: "c2",
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "August 2024",
    credentialUrl: "#",
    category: "technical",
  },
  {
    id: "c3",
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    date: "March 2024",
    credentialUrl: "#",
    category: "technical",
  },
  {
    id: "c4",
    title: "UI/UX Design Professional Certificate",
    issuer: "Google / Coursera",
    date: "December 2023",
    credentialUrl: "#",
    category: "design",
  },
  {
    id: "c5",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    date: "September 2023",
    credentialUrl: "#",
    category: "technical",
  },
  {
    id: "c6",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM / Coursera",
    date: "June 2023",
    credentialUrl: "#",
    category: "technical",
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "j1",
    year: "2022",
    month: "August",
    title: "The Journey Begins",
    description:
      "Enrolled in Electrical and Computer Science Engineering. Showed up with a laptop, curiosity, and absolutely no idea what I was getting into. That first week of C programming humbled me instantly.",
    type: "education",
    emoji: "🎓",
  },
  {
    id: "j2",
    year: "2022",
    month: "November",
    title: "First Line of Code That Actually Worked",
    description:
      "Spent 3 hours debugging a segmentation fault. When it finally ran — I felt like I could build anything. That feeling hasn't left.",
    type: "skill",
    emoji: "⚡",
  },
  {
    id: "j3",
    year: "2023",
    month: "February",
    title: "Discovered Python & Fell in Love with Data",
    description:
      "A senior recommended I try Python for a small project. Two weeks later I had gone down a complete data science rabbit hole and was analysing cricket match statistics at 2am. No regrets.",
    type: "skill",
    emoji: "🐍",
  },
  {
    id: "j4",
    year: "2023",
    month: "June",
    title: "First Design Project Published",
    description:
      "Created event posters for a college fest. People stopped in the hallway to look at them. That was the moment I realised design and engineering aren't separate — they're the same curiosity.",
    type: "project",
    emoji: "🎨",
  },
  {
    id: "j5",
    year: "2023",
    month: "August",
    title: "Joined IEEE — Became Design Lead",
    description:
      "Said yes before knowing what it would involve. Redesigned the chapter's entire visual identity. Learned that leadership means caring about the details everyone else skips.",
    type: "achievement",
    emoji: "🏛️",
  },
  {
    id: "j6",
    year: "2024",
    month: "January",
    title: "First ML Model Trained",
    description:
      "Built my first image classifier. It was a hot dog / not hot dog clone. It worked 70% of the time. I was unreasonably proud. Started the ML Specialisation the same week.",
    type: "skill",
    emoji: "🧠",
  },
  {
    id: "j7",
    year: "2024",
    month: "May",
    title: "First Internship",
    description:
      "Walked into a real office, with real deadlines, and real stakeholders. Terrifying and exhilarating. Learned more in 3 months than I expected, and confirmed that data science is where I want to be.",
    type: "achievement",
    emoji: "💼",
  },
  {
    id: "j8",
    year: "2024",
    month: "October",
    title: "Building Nimbara",
    description:
      "Decided my portfolio should look like my brain feels — a city of ideas floating in the sky. Currently building it. You are standing in it right now.",
    type: "reflection",
    emoji: "🌤️",
  },
];

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
