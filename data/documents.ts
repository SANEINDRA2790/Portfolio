export type DocumentCategory =
  | "Academic Documents"
  | "Professional Certifications"
  | "Research & Publications"
  | "Project Documentation"
  | "Additional Professional Documents";

export interface DocumentItem {
  id: string;
  name: string;
  category: DocumentCategory;
  type: "PDF" | "DOCX" | "Research Paper" | "Certificate" | "External Link";
  description: string;
  filePath?: string;
  externalUrl?: string;
  isAvailable: boolean;
  fileSize?: string;
  lastUpdated?: string;
}

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  "Academic Documents",
  "Professional Certifications",
  "Research & Publications",
  "Project Documentation",
  "Additional Professional Documents",
];

export const DOCUMENTS_DATA: DocumentItem[] = [
  // Academic Documents
  {
    id: "doc-msc-leicester",
    name: "MSc Data Science with Industry — Enrollment Verification",
    category: "Academic Documents",
    type: "PDF",
    description: "Official postgraduate degree enrollment and program documentation from the University of Leicester, United Kingdom (2026 – 2028).",
    filePath: "/documents/msc-leicester-enrollment.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },
  {
    id: "doc-btech-degree",
    name: "B.Tech Electronics & Communication Engineering Degree",
    category: "Academic Documents",
    type: "PDF",
    description: "Official graduation degree certificate and academic records from Sreenidhi Institute of Science and Technology (2018 – 2022).",
    filePath: "/documents/btech-degree-certificate.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },
  {
    id: "doc-intermediate-cert",
    name: "Intermediate Higher Secondary Certificate (MPC)",
    category: "Academic Documents",
    type: "PDF",
    description: "Board certificate for higher secondary education in Mathematics, Physics and Chemistry from Narayana Junior College (2016 – 2018).",
    filePath: "/documents/intermediate-certificate.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },

  // Professional Certifications
  {
    id: "doc-cert-ai102",
    name: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
    category: "Professional Certifications",
    type: "Certificate",
    description: "Official credential certificate validating enterprise expertise in Azure Cognitive Services, Azure OpenAI, and NLP solutions.",
    filePath: "/certificates/ai-102.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },
  {
    id: "doc-cert-ai900",
    name: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
    category: "Professional Certifications",
    type: "Certificate",
    description: "Official credential certificate demonstrating foundational knowledge in machine learning and artificial intelligence on Azure.",
    filePath: "/certificates/ai-900.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },
  {
    id: "doc-cert-pl300",
    name: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
    category: "Professional Certifications",
    type: "Certificate",
    description: "Official credential certificate validating business intelligence, DAX modeling, and automated Power BI reporting capabilities.",
    filePath: "/certificates/pl-300.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },
  {
    id: "doc-cert-aws",
    name: "AWS Certified Cloud Practitioner (CLF-C02)",
    category: "Professional Certifications",
    type: "Certificate",
    description: "Official AWS credential validating cloud architecture principles, security, and AWS infrastructure fundamentals.",
    filePath: "/certificates/aws-cloud-practitioner.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },
  {
    id: "doc-cert-gcp",
    name: "Google Cloud Associate Cloud Engineer (ACE)",
    category: "Professional Certifications",
    type: "Certificate",
    description: "Official credential verifying deployment and operation of scalable enterprise cloud infrastructure on Google Cloud.",
    filePath: "/certificates/google-cloud-ace.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },
  {
    id: "doc-cert-nasscom",
    name: "NASSCOM Python Fundamentals & Programming Certificate",
    category: "Professional Certifications",
    type: "Certificate",
    description: "Verified certification in Python programming, algorithmic data processing, and foundational data structures.",
    filePath: "/certificates/nasscom-python.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },

  // Research & Publications
  {
    id: "doc-pub-iot",
    name: "Research Paper: IoT Based Electricity Energy Meter",
    category: "Research & Publications",
    type: "Research Paper",
    description: "Peer-reviewed paper published in the International Journal of Computer Science and Mobile Computing detailing real-time IoT power telemetry.",
    filePath: "/documents/iot-electricity-energy-meter.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },
  {
    id: "doc-pub-fuzzy",
    name: "Research Paper: Automatic Fuzzy Clustering Image Segmentation",
    category: "Research & Publications",
    type: "Research Paper",
    description: "Peer-reviewed research paper published in the International Journal of Digital Electronics detailing adaptive fuzzy image clustering algorithms.",
    filePath: "/documents/fuzzy-clustering-image-segmentation.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },

  // Project Documentation
  {
    id: "doc-proj-tableau",
    name: "Food Delivery Analysis — Tableau Public Live Dashboard",
    category: "Project Documentation",
    type: "External Link",
    description: "Verified interactive business intelligence dashboard on Tableau Public tracking courier lead times, kitchen prep delays, and CSAT ratings.",
    externalUrl: "https://public.tableau.com/app/profile/sane.indra.kiran/viz/TABLEAU_ZOMATO_ANALYSIS_PROJECTedit/DELIVERY_ANALYSIS_analysis",
    isAvailable: true,
  },
  {
    id: "doc-proj-sql",
    name: "E-Commerce Database Optimization Technical Specification",
    category: "Project Documentation",
    type: "PDF",
    description: "Comprehensive database architecture, relational 3NF schema diagrams, indexing benchmark logs, and stored procedure definitions (-93% query latency).",
    filePath: "/documents/ecommerce-database-technical-spec.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },

  // Additional Professional Documents
  {
    id: "doc-capgemini-experience",
    name: "Capgemini Professional Experience Record & Role Summary",
    category: "Additional Professional Documents",
    type: "PDF",
    description: "Official confirmation and summary of enterprise tenure as Senior Analyst (Software Engineer) developing .NET Core, Angular, and MySQL systems.",
    filePath: "/documents/capgemini-experience-summary.pdf",
    isAvailable: false,
    fileSize: "Pending Upload",
  },
];

