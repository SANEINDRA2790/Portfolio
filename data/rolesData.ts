import { PORTFOLIO_DATA, Project } from "./portfolioData";
import { CERTIFICATES_DATA, CertificateItem } from "./certificates";
import { EDUCATION_DATA } from "./education";

export type ProfessionalRole =
  | "data-analyst"
  | "data-scientist"
  | "ai-ml-engineer"
  | "software-engineer";

export type CountryFormat = "UK" | "USA" | "India";

export interface RoleConfig {
  id: ProfessionalRole;
  title: string;
  shortTitle: string;
  headline: string;
  tagline: string;
  positioningType: "established" | "developing";
  positioningLabel: string;
  suitabilityRationale: string;
  missingEvidenceNotes?: string;
  keyPillars: string[];
  roleSummary: {
    UK: string;
    USA: string;
    India: string;
  };
  prioritizedSkills: {
    category: string;
    skills: string[];
  }[];
  prioritizedProjects: string[]; // project slugs in priority order
  prioritizedCertifications: string[]; // certification codes in priority order
  prioritizedExperienceBullets: {
    company: string;
    bullets: string[];
  }[];
  publicationsRelevant: boolean;
  highlightedMetric: {
    value: string;
    label: string;
    description: string;
  };
}

export const COUNTRY_FORMATS: {
  id: CountryFormat;
  name: string;
  docTitle: string;
  type: string;
  pageTarget: string;
  description: string;
  standardNotes: string[];
}[] = [
  {
    id: "UK",
    name: "United Kingdom",
    docTitle: "Curriculum Vitae",
    type: "UK Standard CV",
    pageTarget: "1–2 Pages",
    description: "Structured for UK recruiters, commercial hiring teams, and UK ATS systems (Workday, Taleo, Greenhouse).",
    standardNotes: [
      "Compliant with UK Equality Act 2010 (strictly no photo, age, date of birth, or marital status)",
      "MSc Data Science with Industry at University of Leicester prominently positioned",
      "Reverse-chronological employment history with commercial metrics (20% SQL reduction)",
      "UK contact details: Leicester location and +44 telephone",
    ],
  },
  {
    id: "USA",
    name: "United States",
    docTitle: "Resume",
    type: "US Professional Resume",
    pageTarget: "1–2 Pages",
    description: "Standard American resume format emphasizing quantified impact, technical competencies, and commercial outcomes.",
    standardNotes: [
      "American resume conventions (concise, high-impact executive summary)",
      "Strictly no photograph, date of birth, or unnecessary personal identifiers",
      "Technical skills matrix positioned upfront for rapid screening",
      "Quantified bullet points emphasizing business ROI and efficiency gains",
    ],
  },
  {
    id: "India",
    name: "India & Global",
    docTitle: "Resume",
    type: "Indian & Global Tech Resume",
    pageTarget: "1–2 Pages",
    description: "Structured for Indian IT enterprises, global software teams, and corporate technical roles.",
    standardNotes: [
      "Structured technical skill matrix covering full-stack, databases, and analytics",
      "Detailed enterprise engineering at Capgemini and analytical training at Innomatics",
      "Comprehensive academic background: Leicester MSc, Sreenidhi B.Tech & Narayana MPC",
      "Verified multi-cloud certifications and peer-reviewed research publications highlighted",
    ],
  },
];

export const ROLES_CONFIG: Record<ProfessionalRole, RoleConfig> = {
  "data-analyst": {
    id: "data-analyst",
    title: "Data Analyst",
    shortTitle: "Data Analyst",
    headline: "Data Analyst | SQL Database Optimization & BI Automation",
    tagline:
      "Transforming complex relational datasets into actionable executive insights through SQL query tuning, interactive BI dashboards, and automated Python/VBA reporting pipelines.",
    positioningType: "established",
    positioningLabel: "Commercial Enterprise Experience",
    suitabilityRationale:
      "2+ years of enterprise experience at Capgemini delivering a documented 20% database execution latency reduction through SQL query tuning and stored procedures, combined with interactive Tableau Public dashboards and automated Excel/VBA reporting pipelines.",
    keyPillars: [
      "SQL Query Optimization & Database Architecture (MySQL, Stored Procedures, B-Tree Indexing)",
      "Python Data Wrangling & Exploratory Data Analysis (Pandas, NumPy, Seaborn)",
      "Business Intelligence Dashboards (Tableau Public, Power BI, DAX)",
      "Reporting Automation (Excel Power Pivot, VBA Macros, automated CSV ingestion)",
    ],
    roleSummary: {
      UK: "Commercially grounded Data Analyst with 2+ years of enterprise production experience at Capgemini, currently completing an MSc in Data Science with Industry at the University of Leicester (2026–2028). Proven track record of achieving a documented 20% database execution latency reduction across high-throughput transactional systems through SQL query tuning and stored procedure optimization. Experienced in developing executive business intelligence dashboards in Tableau and Power BI, automating manual reporting workflows using Excel/VBA (saving 14 hrs/week), and executing statistical exploratory data analysis in Python. Committed to delivering evidence-based data solutions that translate complex transactional datasets into commercial business decisions.",
      USA: "Quant-driven Data Analyst with 2+ years of enterprise experience at Capgemini specializing in SQL query optimization, business intelligence, and automated reporting pipelines. Spearheaded stored procedure refactoring that reduced database execution times by 20% across mission-critical enterprise systems. Proven expertise in building interactive executive dashboards in Tableau and Power BI, engineering automated data pipelines using Python (Pandas, NumPy) and Excel VBA, and extracting actionable commercial insights from high-volume transactional repositories.",
      India: "Results-driven Data Analyst with 2+ years of enterprise experience at Capgemini and specialized data analytics training at Innomatics Research Labs. Strong background in relational database architecture, SQL query tuning, stored procedure optimization, and business intelligence reporting. Spearheaded database performance tuning that achieved a 20% response-time improvement on production systems. Proficient in Python (Pandas, NumPy), Tableau, Power BI, and Excel VBA automation. Currently pursuing MSc Data Science with Industry at University of Leicester, UK.",
    },
    prioritizedSkills: [
      {
        category: "Databases & SQL Engineering",
        skills: [
          "SQL",
          "MySQL",
          "SQL Query Optimization",
          "Stored Procedures",
          "Relational Schema Design (3NF)",
          "B-Tree Indexing",
          "Execution Plan Analysis (EXPLAIN)",
        ],
      },
      {
        category: "Business Intelligence & Data Visualization",
        skills: [
          "Power BI",
          "Tableau (Tableau Public)",
          "Excel (Power Pivot & Slicers)",
          "VBA & Macros",
          "DAX Expressions",
          "Operational KPI Trackers",
        ],
      },
      {
        category: "Data Analytics & Exploratory Analysis",
        skills: [
          "Python (Pandas, NumPy)",
          "Exploratory Data Analysis (EDA)",
          "Statistical Analysis",
          "Data Cleaning & Wrangling",
          "Outlier Detection & Imputation",
          "Hypothesis Testing",
        ],
      },
      {
        category: "Software & Cloud Foundations",
        skills: ["C#", ".NET Core Web API", "RESTful APIs", "Microsoft Azure", "Git & Version Control"],
      },
    ],
    prioritizedProjects: [
      "food-delivery-performance-bi",
      "sales-order-analysis",
      "ecommerce-database-optimization",
      "automobile-brands-eda",
    ],
    prioritizedCertifications: ["PL-300", "NASSCOM-PY", "AI-900", "GCP-ACE", "AWS-CP", "AI-102"],
    prioritizedExperienceBullets: [
      {
        company: "Capgemini",
        bullets: [
          "Refactored mission-critical SQL queries and transactional stored procedures, achieving a documented 20% reduction in database execution times.",
          "Conducted data cleansing, exploratory data reporting, and performance profiling across high-concurrency enterprise modules.",
          "Engineered full-stack enterprise web applications using .NET Core Web API, Angular, and MySQL within Agile production sprints.",
          "Authored comprehensive Standard Operating Procedures (SOPs) and technical documentation to streamline onboarding and maintain code quality.",
        ],
      },
      {
        company: "Innomatics Research Labs",
        bullets: [
          "Designed interactive business intelligence dashboards in Tableau and Power BI, translating raw transactional logs into intuitive KPI monitors.",
          "Automated recurring analytical reports using SQL queries, Excel formulas, and VBA macro routines, eliminating 14 hours of manual copy-paste overhead per week.",
          "Processed and analyzed large tabular datasets utilizing Python (Pandas, NumPy) to isolate business trends, seasonal variance, and anomalies.",
          "Implemented data validation and wrangling routines to prepare raw datasets for executive presentations.",
        ],
      },
    ],
    publicationsRelevant: false,
    highlightedMetric: {
      value: "20%",
      label: "SQL Response-Time Boost",
      description: "Achieved via stored procedure refactoring and B-Tree indexing on Capgemini enterprise systems.",
    },
  },

  "data-scientist": {
    id: "data-scientist",
    title: "Data Scientist",
    shortTitle: "Data Scientist",
    headline: "Data Scientist | Statistical Modeling & Applied Machine Learning",
    tagline:
      "Synthesizing software engineering foundations with rigorous statistical inference, exploratory data analysis, and predictive machine learning models in Python.",
    positioningType: "developing",
    positioningLabel: "Developing Postgraduate Specialization",
    suitabilityRationale:
      "Currently pursuing MSc in Data Science with Industry at the University of Leicester (2026–2028), specializing in advanced statistical modeling, algorithmic validation, and predictive machine learning. Supported by verified Python EDA, Scikit-learn regression models (R² = 0.87), and published clustering research.",
    missingEvidenceNotes:
      "Focused on empirical, academic, and validated coursework modeling; currently developing commercial enterprise machine learning pipeline and MLOps deployment evidence through the UK industrial placement pathway.",
    keyPillars: [
      "Statistical Analysis & Exploratory Data Analysis (Python, Pandas, NumPy, Seaborn)",
      "Applied Machine Learning & Predictive Modeling (Scikit-learn, Regression, Cross-Validation)",
      "Model Evaluation Rigor (R², RMSE, Feature Scaling, Outlier Handling)",
      "Scalable Data Foundations (Relational Database Optimization, SQL Query Tuning)",
    ],
    roleSummary: {
      UK: "Analytical Data Scientist candidate with 2+ years of enterprise engineering experience at Capgemini, currently completing an MSc in Data Science with Industry at the University of Leicester (2026–2028). Specializing in statistical modeling, exploratory data analysis, and predictive machine learning pipelines using Python (Pandas, NumPy, Scikit-learn). Demonstrated ability to combine mathematical rigor with practical engineering, backed by verified case studies including actuarial risk regression modeling (Random Forest R² = 0.87) and high-concurrency database query optimization (20% latency reduction). Eager to leverage postgraduate statistical training and commercial software experience in a UK data science placement.",
      USA: "Data Scientist combining 2+ years of software engineering experience at Capgemini with postgraduate specialization in statistical modeling and predictive machine learning. Proficient in Python (NumPy, Pandas, Scikit-learn), regression analysis, exploratory data analysis (EDA), and model evaluation. Validated track record of delivering measurable outcomes including an actuarial regression model yielding 0.87 R² on holdout splits and stored procedure optimization cutting database query times by 20%. Seeking data science opportunities to translate complex datasets into predictive business impact.",
      India: "Data Scientist with solid foundational software engineering experience at Capgemini and advanced postgraduate studies in Data Science with Industry at the University of Leicester, UK. Skilled in exploratory data analysis (EDA), statistical inference, feature engineering, and supervised machine learning using Python (Pandas, NumPy, Scikit-learn). Authored peer-reviewed research papers in image segmentation clustering and IoT telemetry. Proven ability to optimize data pipelines and build robust predictive regression models.",
    },
    prioritizedSkills: [
      {
        category: "Machine Learning & Predictive Modeling",
        skills: [
          "Scikit-learn",
          "Predictive Regression Modeling",
          "Model Evaluation (R², RMSE, Cross-Validation)",
          "Feature Engineering & Selection",
          "Supervised Algorithms",
          "Data Normalization & StandardScaler",
        ],
      },
      {
        category: "Data Science & Statistical Analysis",
        skills: [
          "Python (Pandas, NumPy)",
          "Exploratory Data Analysis (EDA)",
          "Statistical Analysis & Inference",
          "Hypothesis Testing",
          "Data Cleaning & Imputation",
          "Seaborn & Matplotlib",
        ],
      },
      {
        category: "Databases & Big Data Infrastructure",
        skills: ["SQL", "MySQL", "Relational Schema Design", "Stored Procedures", "Query Optimization"],
      },
      {
        category: "Cloud AI & Software Fundamentals",
        skills: ["Microsoft Azure (AI-900, AI-102)", "C#", ".NET Core Web API", "Git Version Control"],
      },
    ],
    prioritizedProjects: [
      "medical-insurance-price-prediction",
      "automobile-brands-eda",
      "food-delivery-performance-bi",
      "ecommerce-database-optimization",
    ],
    prioritizedCertifications: ["AI-900", "NASSCOM-PY", "AI-102", "PL-300", "AWS-CP", "GCP-ACE"],
    prioritizedExperienceBullets: [
      {
        company: "Capgemini",
        bullets: [
          "Conducted exploratory data reporting and statistical profiling across production transactional data to isolate performance bottlenecks.",
          "Refactored complex database stored procedures and queries, reducing database execution latency by 20%.",
          "Engineered full-stack web applications utilizing .NET Core Web API, Angular, and MySQL within Agile production environments.",
          "Collaborated on data pipeline integrity, API monitoring, and Azure cloud service deployments.",
        ],
      },
      {
        company: "Innomatics Research Labs",
        bullets: [
          "Participated in machine learning sprints: implemented feature selection, data normalization, and baseline predictive regression models.",
          "Processed and cleaned high-volume multivariate datasets using Python (Pandas, NumPy) to isolate non-linear trends.",
          "Built visual exploratory analysis reports and interactive Tableau dashboards to validate data distributions.",
          "Automated weekly data preparation pipelines using SQL and Excel VBA routines.",
        ],
      },
    ],
    publicationsRelevant: true,
    highlightedMetric: {
      value: "R² = 0.87",
      label: "Model Accuracy",
      description: "Achieved on holdout evaluation split using Random Forest Regressor for actuarial healthcare cost prediction.",
    },
  },

  "ai-ml-engineer": {
    id: "ai-ml-engineer",
    title: "AI / Machine Learning Engineer",
    shortTitle: "AI / ML Engineer",
    headline: "AI / Machine Learning Engineer | Cloud AI & Applied ML Algorithms",
    tagline:
      "Grounded in machine learning fundamentals, multi-cloud AI credentials (Azure AI-102 & AI-900), and peer-reviewed computer vision and IoT research publications.",
    positioningType: "developing",
    positioningLabel: "Developing Specialization & Certified Foundations",
    suitabilityRationale:
      "Certified in Microsoft Azure AI Engineer Associate (AI-102) and Azure AI Fundamentals (AI-900). Authored 2 published peer-reviewed research papers in image segmentation clustering and IoT telemetry. Grounded in Python and Scikit-learn predictive modeling. Developing large-scale production MLOps and deep learning pipeline specialization through postgraduate study at the University of Leicester.",
    missingEvidenceNotes:
      "Qualifications are grounded in verified cloud AI certifications, Scikit-learn predictive models, and peer-reviewed research publications; does not claim multi-year enterprise production ML model deployment or LLM fine-tuning experience.",
    keyPillars: [
      "Cloud AI Engineering (Microsoft Azure AI-102, AI-900, Cognitive Services concepts)",
      "Machine Learning Fundamentals (Scikit-learn, Regression, Clustering, Feature Scaling)",
      "Peer-Reviewed Academic Research (Automatic Fuzzy Clustering Image Segmentation & IoT Telemetry)",
      "Core Software Engineering & API Integration (Python, C#, REST APIs, MySQL)",
    ],
    roleSummary: {
      UK: "Software Engineer and aspiring AI/ML specialist with 2+ years of enterprise experience at Capgemini, currently pursuing an MSc in Data Science with Industry at the University of Leicester (2026–2028). Certified as a Microsoft Azure AI Engineer Associate (AI-102) and Azure AI Fundamentals (AI-900). Strong grounding in applied machine learning algorithms using Python (Scikit-learn), predictive modeling, and mathematical algorithms, complemented by 2 published peer-reviewed research papers in image segmentation clustering and IoT telemetry. Combining solid backend engineering foundations with cutting-edge postgraduate AI coursework to deliver robust, scalable machine learning solutions.",
      USA: "AI/ML Engineer combining 2+ years of full-stack enterprise software engineering at Capgemini with Microsoft Azure AI Engineer Associate (AI-102) certification and postgraduate specialization in Data Science. Skilled in Python, Scikit-learn, predictive regression, unsupervised clustering, and cloud AI architecture. Author of two peer-reviewed publications covering fuzzy clustering image segmentation and IoT telemetry. Passionate about bridging enterprise software engineering with applied machine learning and cloud AI services.",
      India: "AI / ML Engineer with 2+ years of enterprise engineering experience at Capgemini and certified in Microsoft Azure AI Engineer Associate (AI-102) and Azure AI Fundamentals (AI-900). Strong technical foundations in Python, Scikit-learn, machine learning algorithms, and RESTful API development. Authored and published 2 international research papers on unsupervised image segmentation and IoT telemetry architectures. Currently advancing specialization through MSc Data Science with Industry at University of Leicester, UK.",
    },
    prioritizedSkills: [
      {
        category: "Cloud AI & Cognitive Services",
        skills: [
          "Microsoft Azure (AI-102 Certified)",
          "Azure AI Fundamentals (AI-900)",
          "Cognitive Services & Vision Concepts",
          "Knowledge Mining & Search Concepts",
          "Responsible AI Principles",
          "AWS Cloud Practitioner (CLF-C02)",
          "Google Cloud Associate Cloud Engineer",
        ],
      },
      {
        category: "Machine Learning & Algorithms",
        skills: [
          "Python (Scikit-learn)",
          "Predictive Regression Modeling",
          "Unsupervised Clustering (Fuzzy Clustering)",
          "Feature Engineering & Normalization",
          "Model Evaluation Metrics",
          "Exploratory Data Analysis",
        ],
      },
      {
        category: "Software Engineering & APIs",
        skills: ["C#", ".NET Core Web API", "RESTful API Integration", "MySQL", "Git Version Control"],
      },
      {
        category: "IoT & Telemetry Systems",
        skills: ["Real-time Telemetry Processing", "Hardware-Software Integration", "Microcontroller Interfacing"],
      },
    ],
    prioritizedProjects: [
      "medical-insurance-price-prediction",
      "automobile-brands-eda",
      "ecommerce-database-optimization",
      "food-delivery-performance-bi",
    ],
    prioritizedCertifications: ["AI-102", "AI-900", "GCP-ACE", "AWS-CP", "NASSCOM-PY", "PL-300"],
    prioritizedExperienceBullets: [
      {
        company: "Capgemini",
        bullets: [
          "Engineered backend RESTful API microservices and integrated enterprise services with robust logging and validation.",
          "Refactored relational stored procedures and SQL queries, cutting database execution latency by 20%.",
          "Collaborated with cloud teams on Azure deployment pipelines and environment configuration.",
          "Conducted data analysis and cleansing routines on production enterprise transaction streams.",
        ],
      },
      {
        company: "Innomatics Research Labs",
        bullets: [
          "Engineered and evaluated supervised machine learning regression models using Python and Scikit-learn.",
          "Conducted feature extraction, outlier detection, and data imputation on high-dimensional datasets.",
          "Designed interactive business intelligence dashboards in Tableau and Power BI to monitor analytical metrics.",
          "Automated recurring data ingestion pipelines using SQL and Excel VBA routines.",
        ],
      },
    ],
    publicationsRelevant: true,
    highlightedMetric: {
      value: "2 Papers",
      label: "Peer-Reviewed Research",
      description: "Published in international journals on fuzzy clustering image segmentation and IoT power telemetry.",
    },
  },

  "software-engineer": {
    id: "software-engineer",
    title: "Software Engineer",
    shortTitle: "Software Engineer",
    headline: "Software Engineer | Full-Stack .NET Core, Angular & Database Tuning",
    tagline:
      "2+ years of commercial enterprise engineering at Capgemini building high-throughput REST APIs in .NET Core, responsive Angular SPAs, and tuned MySQL relational schemas.",
    positioningType: "established",
    positioningLabel: "Commercial Enterprise Experience",
    suitabilityRationale:
      "2+ years of professional enterprise engineering experience at Capgemini developing commercial applications with .NET Core Web API, C#, Angular, and MySQL. Spearheaded stored procedure optimizations that cut query latency by 20% on production systems.",
    keyPillars: [
      "Backend API Engineering (C#, .NET Core Web API, RESTful Microservices, Dependency Injection)",
      "Database Architecture & Query Optimization (MySQL, Stored Procedures, 3NF Schemas, -20% Latency)",
      "Frontend SPA Engineering (Angular, TypeScript, Responsive Web Interfaces, State Management)",
      "Enterprise Cloud & DevOps (Microsoft Azure, Git Version Control, Agile/Scrum Sprints)",
    ],
    roleSummary: {
      UK: "Full-Stack Software Engineer with 2+ years of commercial enterprise production experience at Capgemini, currently pursuing an MSc in Data Science with Industry at the University of Leicester (2026–2028). Proven expertise in building robust, high-performance web applications using C#, .NET Core Web API, Angular, and MySQL within Agile delivery environments. Spearheaded stored procedure refactoring and query execution plan analysis that achieved a documented 20% reduction in database execution times. Strong understanding of RESTful API design, relational schema architecture, and Microsoft Azure deployment pipelines. Seeking UK software engineering opportunities.",
      USA: "Software Engineer with 2+ years of enterprise engineering experience at Capgemini specializing in full-stack application development (.NET Core, C#, Angular) and relational database performance tuning. Proven track record of architecting scalable REST APIs and optimizing complex SQL stored procedures, achieving a documented 20% reduction in database latency. Skilled in Agile software lifecycles, cloud deployments on Azure, and writing clean, maintainable, testable code.",
      India: "Software Engineer with 2+ years of enterprise software engineering experience at Capgemini. Core expertise in full-stack web application development using .NET Core Web API, C#, Angular, TypeScript, and MySQL. Spearheaded stored procedure tuning that achieved a 20% database execution latency improvement on high-concurrency production systems. Certified across Microsoft Azure, AWS Cloud Practitioner, and Google Associate Cloud Engineer. Currently pursuing MSc Data Science with Industry at University of Leicester, UK.",
    },
    prioritizedSkills: [
      {
        category: "Backend & Systems Engineering",
        skills: [
          "C#",
          ".NET Core Web API",
          "RESTful APIs",
          "Object-Oriented Design (OOP)",
          "ASP.NET Core",
          "Dependency Injection",
          "Microservices Concepts",
        ],
      },
      {
        category: "Databases & Query Optimization",
        skills: [
          "MySQL",
          "SQL Query Optimization",
          "Stored Procedures",
          "Relational Schema Design (3NF)",
          "B-Tree Indexing",
          "Execution Plan Analysis (EXPLAIN)",
          "Database Transactions & ACID",
        ],
      },
      {
        category: "Frontend Web Development",
        skills: [
          "Angular",
          "TypeScript / JavaScript",
          "HTML5 / CSS3",
          "Tailwind CSS",
          "Single Page Applications (SPA)",
          "Responsive Design",
        ],
      },
      {
        category: "Cloud, DevOps & Tools",
        skills: [
          "Microsoft Azure",
          "AWS Cloud Fundamentals",
          "Google Cloud Platform (ACE)",
          "Git & Version Control",
          "Agile / Scrum Sprints",
        ],
      },
    ],
    prioritizedProjects: [
      "ecommerce-database-optimization",
      "sales-order-analysis",
      "food-delivery-performance-bi",
      "medical-insurance-price-prediction",
    ],
    prioritizedCertifications: ["GCP-ACE", "AWS-CP", "AI-102", "PL-300", "AI-900", "NASSCOM-PY"],
    prioritizedExperienceBullets: [
      {
        company: "Capgemini",
        bullets: [
          "Engineered and deployed full-stack enterprise web applications using .NET Core Web API, Angular, and MySQL within Agile production sprints.",
          "Refactored mission-critical SQL queries and transactional stored procedures, achieving a documented 20% reduction in database execution times.",
          "Architected RESTful endpoints and integrated external API services with comprehensive exception handling and logging.",
          "Collaborated with cloud engineering teams on Microsoft Azure deployment pipelines and environment configuration.",
          "Authored comprehensive Standard Operating Procedures (SOPs) and technical documentation to streamline onboarding and maintain code quality.",
        ],
      },
      {
        company: "Innomatics Research Labs",
        bullets: [
          "Automated recurring analytical reports using SQL queries, Excel formulas, and VBA macro routines, eliminating 14 hours of manual copy-paste overhead per week.",
          "Designed and maintained interactive data reporting dashboards in Tableau and Power BI.",
          "Processed tabular datasets utilizing Python (Pandas, NumPy) to extract business trend metrics.",
          "Engineered data verification scripts to ensure pipeline data integrity.",
        ],
      },
    ],
    publicationsRelevant: true,
    highlightedMetric: {
      value: "20%",
      label: "SQL Latency Cut",
      description: "Documented 20% response-time reduction on Capgemini enterprise database production systems.",
    },
  },
};
