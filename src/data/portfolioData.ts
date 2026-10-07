export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Full Stack / Web" | "Core Java / OOP" | "Security & Backend" | "Data & Analytics";
  tags: string[];
  roleBadge?: string;
  description: string;
  highlights: string[];
  metrics?: string;
  kanji: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score?: string;
  details?: string;
  status?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  skills: string[];
  badgeColor: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Abhishek Dubey",
    japaneseName: "アビシェック・ドゥベイ",
    title: "Aspiring Web Developer | Software Developer",
    location: "Delhi, Uttar Pradesh, India",
    phone: "+91 8707377658",
    email: "dubeyabhi9794@gmail.com",
    linkedin: "https://linkedin.com/in/abhishek-dubey",
    github: "https://github.com/abhishekdubey",
    resumePdfUrl: "/Abhishek_Dubey_Resume.pdf",
    statusBadge: "Open to Opportunities • MCA Candidate",
    bio: "MCA student with a strong foundation in Java, Python, Data Structures & Algorithms, and Web Development (HTML, CSS, JavaScript). Seeking a Web Developer / Software Developer role to apply problem-solving skills, build scalable applications, and contribute to real-world engineering teams.",
  },

  skills: {
    languages: [
      { name: "Java", level: "Core & OOP", icon: "Coffee", desc: "Object-oriented programming, classes, file handling & memory fundamentals" },
      { name: "Python", level: "Scripting & Backend", icon: "Code2", desc: "Flask backend APIs, data manipulation & automation" },
      { name: "C++", level: "DSA & Problem Solving", icon: "Cpu", desc: "Data structures, memory pointers, algorithmic problem-solving" },
      { name: "JavaScript", level: "Modern ES6+", icon: "FileCode", desc: "Async/await, DOM manipulation, functional programming" },
    ],
    webTechnologies: [
      { name: "HTML5", level: "Semantic Markup", desc: "Accessible, semantic document architecture" },
      { name: "CSS3", level: "Flexbox & Grid", desc: "Responsive layouts, animations & visual fidelity" },
      { name: "JavaScript (ES6+)", level: "Dynamic Client-Side", desc: "Event handling, fetch APIs, client logic" },
      { name: "React", level: "Component Basics", desc: "Reusable components, state hooks & modular UI" },
    ],
    databases: [
      { name: "MySQL", level: "Relational Queries", desc: "Relational database schema design, queries, keys & indexing" },
    ],
    toolsAndPlatforms: [
      { name: "Git", desc: "Version control & branch management" },
      { name: "GitHub", desc: "Remote repositories & collaboration" },
      { name: "VS Code", desc: "Primary IDE & debugger environment" },
      { name: "Postman", desc: "API testing, endpoints validation & debugging" },
    ],
    coreConcepts: [
      { name: "Data Structures & Algorithms (DSA)", desc: "Arrays, LinkedLists, Stacks, Queues, Searching & Sorting" },
      { name: "Object-Oriented Programming (OOP)", desc: "Encapsulation, Inheritance, Polymorphism, Abstraction" },
      { name: "DBMS", desc: "Normalization, ACID properties, transactions & ER diagrams" },
      { name: "Operating Systems", desc: "Process scheduling, threads, concurrency & memory management" },
    ],
    softSkills: [
      "Communication",
      "Teamwork",
      "Problem-Solving",
      "Time Management",
      "Adaptability",
    ],
  },

  projects: [
    {
      id: "swasthik",
      title: "Swasthik – Hospital Management System",
      subtitle: "BCA Final Year Capstone Project",
      category: "Full Stack / Web",
      tags: ["PHP/Web", "MySQL", "Database Architecture", "UI Design"],
      roleBadge: "Grade A Awarded",
      kanji: "命", // Life / Care
      description: "A comprehensive hospital management platform engineered to digitize and streamline administrative, medical, and appointment workflows.",
      highlights: [
        "Developed a hospital management system to streamline patient, doctor, appointment, and hospital record management.",
        "Designed user-friendly modules to manage patient information, appointments, and medical records efficiently.",
        "Implemented database-driven functionality to improve data organization and eliminate manual paper record-keeping.",
        "Successfully defended and completed the project, receiving a top 'A Grade' assessment.",
      ],
      metrics: "Replaced paper records with unified SQL database tables",
    },
    {
      id: "banking",
      title: "Banking Management System",
      subtitle: "Enterprise Console Application",
      category: "Core Java / OOP",
      tags: ["Java", "OOP Principles", "File Handling", "Data Validation"],
      roleBadge: "Defended in Mock Viva",
      kanji: "金", // Money / Metal
      description: "A robust console-based banking application demonstrating strict encapsulation, inheritance hierarchies, and persistent transaction ledgers.",
      highlights: [
        "Designed and developed a console-based banking system in Java implementing core OOP principles (encapsulation, inheritance) to manage accounts, deposits, withdrawals, and transaction history.",
        "Built modular, reusable classes with rigorous input validation to handle real-world banking edge cases reliably.",
        "Prepared complete technical documentation and defended design decisions in an intensive mock viva/examiner evaluation.",
      ],
      metrics: "Multi-account ledger with atomic transaction logging",
    },
    {
      id: "nids",
      title: "Network Intrusion Detection System (NIDS)",
      subtitle: "Faculty Supervised Security Research",
      category: "Security & Backend",
      tags: ["Python", "Flask", "Network Security", "REST API", "IEEE Std 830"],
      roleBadge: "IEEE Spec Authored",
      kanji: "防", // Defense
      description: "Network telemetry surveillance system detecting malicious packets and intrusions with REST endpoints and full specification documentation.",
      highlights: [
        "Co-developed a mini-project detecting network intrusions using Python and Flask under faculty supervision.",
        "Authored a 12-page institutional synopsis and an IEEE Std 830-1998 compliant Software Requirements Specification (SRS) document.",
        "Defined a formal traceability matrix and robust REST API specification for alert dispatching.",
      ],
      metrics: "12-page IEEE Std 830-1998 compliant specification document",
    },
    {
      id: "netflix-clone",
      title: "Netflix Streaming Interface Clone",
      subtitle: "High-Fidelity Front-End Replica",
      category: "Full Stack / Web",
      tags: ["HTML5", "CSS3", "CSS Grid & Flexbox", "Responsive Design"],
      roleBadge: "Visual Fidelity Focus",
      kanji: "影", // Cinema / Shadow
      description: "Pixel-accurate, responsive user interface replicating Netflix's landing page, media carousels, and responsive breakpoint structures.",
      highlights: [
        "Built a responsive front-end replica of the Netflix landing page focusing on layout accuracy, CSS Flexbox/Grid, and visual fidelity.",
        "Practiced semantic HTML structuring and mobile-responsive design principles across varied screen viewports.",
        "Crafted smooth hover micro-interactions, dark-theme gradients, and polished typography hierarchy.",
      ],
      metrics: "100% responsive down to mobile viewports",
    },
    {
      id: "ecommerce-analytics",
      title: "E-Commerce Sales Data Analysis",
      subtitle: "Exploratory Retail Intelligence",
      category: "Data & Analytics",
      tags: ["Python", "Excel", "Data Cleaning", "EDA", "Business Intelligence"],
      roleBadge: "3 Analytical Reports",
      kanji: "析", // Analysis
      description: "Data pipeline and exploratory analysis of high-volume retail transactions to discover purchasing trends, revenue drivers, and inventory insights.",
      highlights: [
        "Collaborated in a team to perform data cleaning, exploratory data analysis (EDA), and insight generation on an e-commerce sales dataset.",
        "Handled missing value imputation, outlier detection, and categorical grouping for seasonal sales patterns.",
        "Delivered three structured analytical reports summarizing key business insights and executive growth trends.",
      ],
      metrics: "3 comprehensive analytical reports delivered to stakeholders",
    },
  ] as Project[],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "IMS Engineering College (IMSEC), Ghaziabad",
      location: "Ghaziabad, Uttar Pradesh",
      period: "2025 – 2027",
      status: "Pursuing",
      details: "Focusing on advanced algorithms, software engineering paradigms, distributed systems, and modern full-stack development.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Devi Ahilya Vishwavidyalaya",
      location: "Indore, Madhya Pradesh",
      period: "Completed",
      score: "CGPA: 6.8",
      details: "Graduated with A-grade Capstone project in hospital informatics. Core coursework in C++, Java, RDBMS, and Web Systems.",
    },
    {
      degree: "Senior Secondary (12th Grade)",
      institution: "Kisan Inter College",
      location: "Varanasi, Uttar Pradesh",
      period: "Completed",
      score: "69%",
      details: "Science & Mathematics stream with foundational computing coursework.",
    },
    {
      degree: "Secondary School Examination (10th Grade)",
      institution: "Kisan Inter College",
      location: "Varanasi, Uttar Pradesh",
      period: "Completed",
      score: "68%",
      details: "General sciences, mathematics, and fundamentals.",
    },
  ] as EducationItem[],

  certifications: [
    {
      name: "Meta Front-End Development Certificate",
      issuer: "Coursera / Meta",
      skills: ["React", "HTML5 & CSS3", "JavaScript UI", "Responsive Design", "Version Control"],
      badgeColor: "border-blue-500/40 text-blue-400 bg-blue-500/10",
    },
    {
      name: "IBM SkillsBuild Certification",
      issuer: "IBM",
      skills: ["AI Fundamentals", "Project Management", "Lifelong Professional Skills", "Agile Mindset"],
      badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    },
    {
      name: "Data Analytics Certification",
      issuer: "Code With Harry",
      skills: ["Python", "Data Analysis", "Pandas", "EDA", "Statistical Visualization"],
      badgeColor: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    },
  ] as Certification[],
};
