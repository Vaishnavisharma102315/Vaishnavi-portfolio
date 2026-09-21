"use client";

import React, { useState } from "react";

// --- Real Data from Vaishnavi's CV ---
const STATS = [
  {
    num: "04",
    label: "AI & Data Systems",
    sub: "End-to-end ML & analytics apps",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-1a4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4V6a4 4 0 0 0-4-4z" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    num: "07",
    label: "Verified Credentials",
    sub: "Infosys, LPU, iamneo & more",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "2028",
    label: "B.Tech CSE Graduate",
    sub: "Lovely Professional University",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    num: "100%",
    label: "Open Source Repos",
    sub: "Available on GitHub profile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
];

const PROJECTS = [
  {
    name: "AI Dropout Risk Intelligence System",
    category: "AI / Machine Learning",
    date: "May '26",
    href: "https://github.com/Vaishnavisharma102315",
    metric: "Real-Time Risk Scoring Gauge & Explainability",
    summary:
      "End-to-end classification pipeline predicting student dropout risk and recommending targeted academic interventions, deployed with an interactive Streamlit UI.",
    bullets: [
      "Built Logistic Regression classification pipeline on academic performance data with automated model persistence via pickle.",
      "Engineered real-time individual risk scoring with dynamic visual gauge indicators and feature importance charts (attendance, marks, study hours).",
      "Designed an institutional batch monitoring dashboard simulating cohort risk distributions with automated critical alerts.",
    ],
    tags: ["Python", "Streamlit", "scikit-learn", "Pandas", "Model Persistence", "Explainable AI"],
  },
  {
    name: "SegmentIQ — Customer Segmentation Dashboard",
    category: "Unsupervised ML & Analytics",
    date: "Jun '26",
    href: "https://github.com/Vaishnavisharma102315",
    metric: "2,236 Retail Customers Clustered",
    summary:
      "End-to-end unsupervised ML clustering pipeline and client-side analytics dashboard segmenting retail customers based on demographic and purchasing patterns.",
    bullets: [
      "Robust preprocessing pipelines: median imputation, outlier filtering, and multi-feature standardization via StandardScaler.",
      "Optimized cluster selection sweeping K=2–8 using Inertia (Elbow Method) and Silhouette scores, projected in 2D with Principal Component Analysis (PCA).",
      "Single-file interactive dashboard with Chart.js, featuring segment KPI cards, spend breakdowns, and a real-time segment prediction tool.",
    ],
    tags: ["Python", "scikit-learn", "Chart.js", "PCA", "K-Means", "StandardScaler"],
  },
  {
    name: "Exploratory Data Analysis & Predictive Modeling",
    category: "Data Science & Statistics",
    date: "2025 – 2026",
    href: "https://github.com/Vaishnavisharma102315",
    metric: "Statistical Modeling & EDA",
    summary:
      "Comprehensive data exploration, statistical modeling, and predictive classification workflows on structured tabular datasets.",
    bullets: [
      "Implemented structured data cleaning, distribution checks, missing value strategies, and feature encoding pipelines.",
      "Conducted hypothesis testing, correlation heatmaps, and multi-feature interaction studies.",
      "Benchmarked baseline machine learning models with cross-validation and ROC-AUC metrics.",
    ],
    tags: ["Python", "NumPy", "Pandas", "scikit-learn", "Seaborn", "Hypothesis Testing"],
  },
  {
    name: "Database Management & Query Optimization",
    category: "Relational DBMS & SQL",
    date: "Jul '26",
    href: "https://github.com/Vaishnavisharma102315",
    metric: "Optimized Relational Schema & ACID Compliance",
    summary:
      "Relational database modeling, schema normalization (1NF–3NF), transaction management, and complex SQL query performance tuning.",
    bullets: [
      "Modeled robust entity-relationship diagrams and implemented 3NF relational schemas for high data integrity.",
      "Engineered ACID-compliant transactions with foreign key cascades and relational constraints.",
      "Formulated performant SQL queries using nested subqueries, window functions, and indexing strategies.",
    ],
    tags: ["SQL", "Relational DBMS", "Normalization (3NF)", "Transactions", "Query Optimization"],
  },
];

const EDUCATION = [
  {
    name: "Bachelor of Technology (B.Tech) – CSE",
    institution: "Lovely Professional University (LPU)",
    location: "Phagwara, Punjab",
    period: "Aug 2024 – 2028",
    status: "Degree in Progress • CGPA Focused",
    description:
      "Intensive undergraduate engineering degree centered on Artificial Intelligence, Machine Learning, Database Architecture, and Computer Science foundations.",
    coursework: [
      "Database Management Systems (DBMS)",
      "Data Structures & Algorithms",
      "AI & Machine Learning Foundations",
      "Java Programming",
      "C Programming",
      "Object-Oriented Programming",
    ],
  },
  {
    name: "AI & ML Basics to Advanced (Career Ready Programme)",
    institution: "TheEduBootCamp (Eduniketan Private Limited)",
    location: "Online / Practical Labs",
    period: "Jun 2026 – Jul 2026",
    status: "Career Ready Certification",
    description:
      "Rigorous program covering core & advanced machine learning algorithms, statistical data analysis, model persistence, and deployment of intelligent data apps.",
    coursework: [
      "Supervised Algorithms",
      "Unsupervised Clustering",
      "Feature Engineering",
      "Model Persistence (Pickle)",
      "Evaluation Metrics",
    ],
  },
];

const CERTIFICATIONS = [
  {
    title: "Database Management System (Part 1 & 2)",
    issuer: "Infosys Springboard",
    date: "Jul '26",
    tags: ["Relational Architecture", "SQL Queries", "Transactions", "3NF"],
  },
  {
    title: "Programming in JAVA",
    issuer: "iamneo & Lovely Professional University",
    date: "May '26",
    tags: ["Core Java", "OOP Principles", "Data Structures"],
  },
  {
    title: "AI & ML Basics to Advanced",
    issuer: "TheEduBootCamp (Eduniketan Pvt. Ltd.)",
    date: "Jul '26",
    tags: ["Supervised Learning", "Clustering", "scikit-learn"],
  },
  {
    title: "Computer Programming (72 Hours)",
    issuer: "iamneo & Lovely Professional University",
    date: "May '25",
    tags: ["Algorithmic Logic", "Problem Solving", "Syntax"],
  },
  {
    title: "Introduction to AI & ML",
    issuer: "Skillera",
    date: "Mar '25",
    tags: ["AI Foundations", "Machine Learning Workflows"],
  },
  {
    title: "C Programming (18-Hour Live Course)",
    issuer: "CSE Pathshala",
    date: "Jan '25",
    tags: ["Pointers", "Memory Management", "Modular Code"],
  },
  {
    title: "Effective Communication Skills",
    issuer: "Skillera",
    date: "Oct '24",
    tags: ["Technical Presentations", "Workplace Agility"],
  },
];

const ACHIEVEMENTS = [
  {
    title: "CodeClash — Coding Competition",
    organizer: "AccentureEmph & Centre for Professional Enhancement (LPU)",
    badge: "Competitor & Problem Solver",
    description:
      "Competed in fast-paced algorithmic coding challenges solving complex data structure problems under tight execution time limits.",
  },
  {
    title: "Byte Battle 1.0 — Technical Quiz",
    organizer: "AccentureEmph & Centre for Professional Enhancement",
    badge: "Participant Badge",
    description:
      "Tested comprehensive technical knowledge across core Computer Science, DBMS fundamentals, and programming principles.",
  },
  {
    title: "Cryptic Clues — Coding Centered Event",
    organizer: "Optimyzr for Success & Centre for Professional Enhancement",
    badge: "Participant Badge",
    description:
      "Participated in logic deduction, code debugging, and cryptic algorithmic problem-solving tasks.",
  },
];

const ArrowUpRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");

  const showProjects = activeTab === "all" || activeTab === "projects";
  const showEducation = activeTab === "all" || activeTab === "education";
  const showCerts = activeTab === "all" || activeTab === "certs";
  const showAchievements = activeTab === "all" || activeTab === "achievements";

  return (
    <section id="projects-section" className="px-6 lg:px-20 py-24">
      {/* Section Header */}
      <div className="pj-head">
        <div>
          <span className="pj-label">PORTFOLIO &amp; BACKGROUND</span>
          <h2 className="pj-title">Engineered Work &amp; Credentials</h2>
        </div>
      </div>

      {/* Quick Metrics & Stats Bar */}
      <div className="pj-stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className="pj-stat-card">
            <div className="pj-stat-icon">{s.icon}</div>
            <div className="pj-stat-num">{s.num}</div>
            <div className="pj-stat-label">{s.label}</div>
            <div className="pj-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Interactive Category Filter Tabs */}
      <div className="pj-tabs" role="tablist" aria-label="Project and Background Categories">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "all"}
          className={`pj-tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          <span>✨ All Highlights</span>
          <span className="opacity-70 text-xs">(16)</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "projects"}
          className={`pj-tab-btn ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          <span>💻 AI &amp; ML Projects</span>
          <span className="opacity-70 text-xs">(4)</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "education"}
          className={`pj-tab-btn ${activeTab === "education" ? "active" : ""}`}
          onClick={() => setActiveTab("education")}
        >
          <span>🎓 Education &amp; Training</span>
          <span className="opacity-70 text-xs">(2)</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "certs"}
          className={`pj-tab-btn ${activeTab === "certs" ? "active" : ""}`}
          onClick={() => setActiveTab("certs")}
        >
          <span>📜 Certifications</span>
          <span className="opacity-70 text-xs">(7)</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "achievements"}
          className={`pj-tab-btn ${activeTab === "achievements" ? "active" : ""}`}
          onClick={() => setActiveTab("achievements")}
        >
          <span>🏆 Contests &amp; Badges</span>
          <span className="opacity-70 text-xs">(3)</span>
        </button>
      </div>

      {/* 1. Featured AI/ML Projects Cards */}
      {showProjects && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-theme-border">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-fg-muted">
              Featured Intelligent Systems ({PROJECTS.length})
            </h3>
            <span className="text-xs text-accent font-semibold tracking-wider">
              Python • scikit-learn • Streamlit • SQL
            </span>
          </div>

          <div className="pj-cards-grid">
            {PROJECTS.map((p, i) => (
              <article key={p.name} className="pj-card">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-accent text-white tracking-widest">
                      0{i + 1}
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-fg-muted uppercase">
                      {p.category}
                    </span>
                    <span className="text-xs text-fg-muted opacity-60">• {p.date}</span>
                  </div>
                  {p.metric && (
                    <div className="pj-metric">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{p.metric}</span>
                    </div>
                  )}
                </div>

                <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mt-3 mb-2">
                  {p.name}
                </h4>

                <p className="text-sm md:text-base text-fg-muted max-w-4xl leading-relaxed">
                  {p.summary}
                </p>

                {/* Technical Highlights */}
                <ul className="pj-card-bullets">
                  {p.bullets.map((bullet, idx) => (
                    <li key={idx} className="pj-card-bullet">
                      <CheckIcon />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags & Action Row */}
                <div className="flex items-center justify-between gap-4 flex-wrap pt-4 border-t border-theme-border mt-4">
                  <div className="pj-tags" style={{ marginTop: 0 }}>
                    {p.tags.map((tag) => (
                      <span key={tag} className="pj-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="pj-action inline-flex items-center gap-1.5"
                  >
                    <span>View GitHub</span>
                    <ArrowUpRight />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 2. Education & Professional Training */}
      {showEducation && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-theme-border">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-fg-muted">
              Education &amp; Training
            </h3>
            <span className="text-xs text-fg-muted font-medium">Academic Rigor &amp; Practical Labs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION.map((edu) => (
              <div key={edu.name} className="pj-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {edu.status}
                    </span>
                    <span className="text-xs font-semibold text-fg-muted tracking-wide">
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-bold tracking-tight text-fg mb-1">
                    {edu.name}
                  </h4>

                  <p className="text-xs font-semibold text-accent tracking-wider uppercase mb-3">
                    {edu.institution} {edu.location ? `• ${edu.location}` : ""}
                  </p>

                  <p className="text-sm text-fg-muted leading-relaxed mb-4">
                    {edu.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-theme-border">
                  <span className="text-xs font-semibold tracking-wider text-fg uppercase block mb-2">
                    Key Coursework / Focus:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((c) => (
                      <span
                        key={c}
                        className="text-[0.72rem] font-medium px-2.5 py-1 rounded-md bg-bg border border-theme-border text-fg-muted"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Verified Certifications Grid */}
      {showCerts && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-theme-border">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-fg-muted">
              Verified Professional Certifications ({CERTIFICATIONS.length})
            </h3>
            <span className="text-xs text-emerald-500 font-semibold tracking-wide">
              ✓ 100% Verified
            </span>
          </div>

          <div className="cert-grid">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.title} className="cert-card">
                <div className="flex items-center justify-between gap-2">
                  <div className="cert-badge">
                    <span>✓</span>
                    <span>VERIFIED</span>
                  </div>
                  <span className="text-xs font-semibold text-fg-muted">{cert.date}</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-fg tracking-tight leading-snug mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-medium text-accent tracking-wide">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-theme-border/60">
                  {cert.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[0.68rem] px-2 py-0.5 rounded-full bg-accent-soft text-accent font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Competitions & Co-Curricular Badges */}
      {showAchievements && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-theme-border">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-fg-muted">
              Co-Curricular Competitions &amp; Hackathons ({ACHIEVEMENTS.length})
            </h3>
            <span className="text-xs text-fg-muted font-medium">LPU &amp; Corporate Challenges</span>
          </div>

          <div className="contest-grid">
            {ACHIEVEMENTS.map((item) => (
              <div key={item.title} className="contest-card">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0 text-lg">
                  🏆
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[0.68rem] font-bold uppercase tracking-wider text-amber-500 mb-0.5">
                    {item.badge}
                  </span>
                  <h4 className="text-base font-bold text-fg tracking-tight leading-snug mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-accent font-medium mb-1.5">
                    {item.organizer}
                  </p>
                  <p className="text-xs text-fg-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
