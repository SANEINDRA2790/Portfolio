export interface CertificateItem {
  id: string;
  title: string;
  code: string;
  issuer: string;
  badgeColor: string;
  description: string;
  status: "Certified" | "Completed";
  filePath?: string;
  verificationUrl?: string;
  isUploaded: boolean;
  fileType?: "pdf" | "image";
  skillsCovered: string[];
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "ai-102",
    title: "Microsoft Certified: Azure AI Engineer Associate",
    code: "AI-102",
    issuer: "Microsoft",
    badgeColor: "#0078D4",
    status: "Certified",
    description: "Designing and implementing AI solutions using Azure Cognitive Services, Azure OpenAI, Cognitive Search, and knowledge mining.",
    filePath: "/certificates/ai-102.pdf",
    verificationUrl: "",
    isUploaded: false, // Set to true when PDF is placed in public/certificates/ai-102.pdf
    fileType: "pdf",
    skillsCovered: ["Azure OpenAI", "Cognitive Services", "Computer Vision", "NLP", "Conversational AI"],
  },
  {
    id: "ai-900",
    title: "Microsoft Certified: Azure AI Fundamentals",
    code: "AI-900",
    issuer: "Microsoft",
    badgeColor: "#0078D4",
    status: "Certified",
    description: "Demonstrating foundational knowledge of machine learning (ML) and artificial intelligence (AI) workloads and Azure services.",
    filePath: "/certificates/ai-900.pdf",
    verificationUrl: "",
    isUploaded: false,
    fileType: "pdf",
    skillsCovered: ["Azure Machine Learning", "Computer Vision Workloads", "NLP Workloads", "Responsible AI"],
  },
  {
    id: "pl-300",
    title: "Microsoft Certified: Power BI Data Analyst Associate",
    code: "PL-300",
    issuer: "Microsoft",
    badgeColor: "#F2C811",
    status: "Certified",
    description: "Transforming enterprise data into actionable business intelligence using Power BI, DAX formulas, data modeling, and automated workspaces.",
    filePath: "/certificates/pl-300.pdf",
    verificationUrl: "",
    isUploaded: false,
    fileType: "pdf",
    skillsCovered: ["Power BI Modeling", "DAX Formulas", "Data Cleaning", "Dashboard Governance", "Dataflows"],
  },
  {
    id: "aws-clf-c02",
    title: "AWS Certified Cloud Practitioner",
    code: "CLF-C01 / CLF-C02",
    issuer: "Amazon Web Services",
    badgeColor: "#FF9900",
    status: "Certified",
    description: "Comprehensive understanding of AWS Cloud infrastructure, security, architecture principles, billing, and core services.",
    filePath: "/certificates/aws-cloud-practitioner.pdf",
    verificationUrl: "",
    isUploaded: false,
    fileType: "pdf",
    skillsCovered: ["AWS IAM", "EC2 & S3", "Cloud Security", "VPC Networking", "Cloud Economics"],
  },
  {
    id: "gcp-ace",
    title: "Google Cloud Associate Cloud Engineer",
    code: "ACE",
    issuer: "Google Cloud",
    badgeColor: "#4285F4",
    status: "Certified",
    description: "Deploying applications, monitoring operations, and managing enterprise cloud solutions on Google Cloud Platform.",
    filePath: "/certificates/google-cloud-ace.pdf",
    verificationUrl: "",
    isUploaded: false,
    fileType: "pdf",
    skillsCovered: ["Google Compute Engine", "GKE / Kubernetes", "Cloud Storage", "IAM Policies", "gcloud CLI"],
  },
  {
    id: "nasscom-python",
    title: "Python Fundamentals and Programming",
    code: "NASSCOM Cert",
    issuer: "NASSCOM",
    badgeColor: "#10B981",
    status: "Certified",
    description: "Verified competency in Python data structures, functional programming, data wrangling, and algorithmic efficiency.",
    filePath: "/certificates/nasscom-python.pdf",
    verificationUrl: "",
    isUploaded: false,
    fileType: "pdf",
    skillsCovered: ["Python Core", "Data Structures", "Algorithmic Efficiency", "Data Wrangling", "OOP"],
  },
];

