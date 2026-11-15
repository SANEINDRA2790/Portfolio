#!/usr/bin/env node
/**
 * Generate Professional, ATS-Optimised PDF Resumes for Indra Kiran Sane:
 * 1. UK Standard Curriculum Vitae (Indra_Kiran_Sane_CV_UK.pdf)
 * 2. India / International Technical Resume (Indra_Kiran_Sane_Resume_India.pdf)
 * 3. Default download fallback (resume.pdf)
 */

const fs = require("fs");
const path = require("path");

class SimplePDFBuilder {
  constructor(pageWidth = 595.28, pageHeight = 841.89) {
    this.width = pageWidth;
    this.height = pageHeight;
    this.pages = [];
    this.currentPageCommands = [];
    this.y = this.height - 40;
    this.marginLeft = 40;
    this.marginRight = this.width - 40;
    this.contentWidth = this.marginRight - this.marginLeft;
  }

  newPage() {
    if (this.currentPageCommands.length > 0) {
      this.pages.push(this.currentPageCommands.join("\n"));
      this.currentPageCommands = [];
    }
    this.y = this.height - 40;
  }

  drawLine(x1, y1, x2, y2, width = 0.6, r = 0.8, g = 0.8, b = 0.8) {
    const cmd = `${width.toFixed(2)} w ${r.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} RG ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`;
    this.currentPageCommands.push(cmd);
  }

  drawRect(x, y, w, h, r = 0.95, g = 0.95, b = 0.95) {
    const cmd = `${r.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`;
    this.currentPageCommands.push(cmd);
  }

  escapeText(text) {
    return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }

  addText(x, y, text, font = "/F1", size = 9, r = 0.1, g = 0.1, b = 0.1) {
    const cleanText = this.escapeText(text);
    const cmd = `BT ${font} ${size.toFixed(2)} Tf ${r.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${cleanText}) Tj ET`;
    this.currentPageCommands.push(cmd);
  }

  wrapText(text, maxChars = 95) {
    const words = text.split(" ");
    const lines = [];
    let cur = [];
    let curLen = 0;
    for (const w of words) {
      if (curLen + w.length + (cur.length > 0 ? 1 : 0) <= maxChars) {
        cur.push(w);
        curLen += w.length + (cur.length > 1 ? 1 : 0);
      } else {
        if (cur.length > 0) lines.push(cur.join(" "));
        cur = [w];
        curLen = w.length;
      }
    }
    if (cur.length > 0) lines.push(cur.join(" "));
    return lines;
  }

  checkPageBreak(neededSpace = 40) {
    if (this.y - neededSpace < 40) {
      this.newPage();
    }
  }

  addSectionHeader(title) {
    this.checkPageBreak(35);
    this.y -= 14;
    this.addText(this.marginLeft, this.y, title.toUpperCase(), "/F2", 10.5, 0.04, 0.38, 0.28);
    this.y -= 4;
    this.drawLine(this.marginLeft, this.y, this.marginRight, this.y, 0.8, 0.15, 0.55, 0.42);
    this.y -= 10;
  }

  addJobHeader(role, company, period, location = "") {
    this.checkPageBreak(25);
    this.addText(this.marginLeft, this.y, `${role}  |  ${company}`, "/F2", 9.5, 0.08, 0.12, 0.18);
    const rightStr = location ? `${period}  (${location})` : period;
    const rightX = this.marginRight - rightStr.length * 5.0;
    this.addText(rightX, this.y, rightStr, "/F3", 8.5, 0.35, 0.40, 0.45);
    this.y -= 12;
  }

  addBullet(text, indent = 14, maxChars = 95, bulletChar = "-") {
    const lines = this.wrapText(text, maxChars);
    this.checkPageBreak(lines.length * 11 + 6);
    for (let i = 0; i < lines.length; i++) {
      if (i === 0) {
        this.addText(this.marginLeft + 2, this.y, bulletChar, "/F2", 8.5, 0.15, 0.55, 0.42);
      }
      this.addText(this.marginLeft + indent, this.y, lines[i], "/F1", 8.5, 0.15, 0.18, 0.22);
      this.y -= 11;
    }
    this.y -= 2;
  }

  buildPdf(outputPath) {
    if (this.currentPageCommands.length > 0) {
      this.pages.push(this.currentPageCommands.join("\n"));
      this.currentPageCommands = [];
    }

    const totalPages = this.pages.length;
    const objects = [];

    const f1Idx = 3 + totalPages * 2;
    const f2Idx = f1Idx + 1;
    const f3Idx = f2Idx + 1;

    const fontF1 = `${f1Idx} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;
    const fontF2 = `${f2Idx} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`;
    const fontF3 = `${f3Idx} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj\n`;

    const pageKids = Array.from({ length: totalPages }, (_, i) => `${3 + i} 0 R`).join(" ");
    const objPages = `2 0 obj\n<< /Type /Pages /Kids [${pageKids}] /Count ${totalPages} >>\nendobj\n`;
    const objCatalog = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;

    objects.push({ id: 1, data: Buffer.from(objCatalog, "latin1") });
    objects.push({ id: 2, data: Buffer.from(objPages, "latin1") });

    const contentStartIdx = 3 + totalPages;
    for (let i = 0; i < totalPages; i++) {
      const pageObjIdx = 3 + i;
      const contentObjIdx = contentStartIdx + i;
      const pObj = `${pageObjIdx} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${this.width.toFixed(2)} ${this.height.toFixed(2)}] /Contents ${contentObjIdx} 0 R /Resources << /Font << /F1 ${f1Idx} 0 R /F2 ${f2Idx} 0 R /F3 ${f3Idx} 0 R >> >> >>\nendobj\n`;
      objects.push({ id: pageObjIdx, data: Buffer.from(pObj, "latin1") });

      const streamContent = Buffer.from(this.pages[i], "latin1");
      const cObjHeader = Buffer.from(`${contentObjIdx} 0 obj\n<< /Length ${streamContent.length} >>\nstream\n`, "ascii");
      const cObjFooter = Buffer.from("\nendstream\nendobj\n", "ascii");
      objects.push({ id: contentObjIdx, data: Buffer.concat([cObjHeader, streamContent, cObjFooter]) });
    }

    objects.push({ id: f1Idx, data: Buffer.from(fontF1, "latin1") });
    objects.push({ id: f2Idx, data: Buffer.from(fontF2, "latin1") });
    objects.push({ id: f3Idx, data: Buffer.from(fontF3, "latin1") });

    objects.sort((a, b) => a.id - b.id);

    const header = Buffer.from("%PDF-1.4\n", "ascii");
    const chunks = [];
    const offsets = { 0: 0 };
    let currentOffset = header.length;

    for (const obj of objects) {
      offsets[obj.id] = currentOffset;
      chunks.push(obj.data);
      currentOffset += obj.data.length;
    }

    const xrefOffset = currentOffset;
    const maxObjId = Math.max(...Object.keys(offsets).map(Number));
    let xref = `xref\n0 ${maxObjId + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= maxObjId; i++) {
      const off = offsets[i] || 0;
      xref += `${String(off).padStart(10, "0")} 00000 n \n`;
    }

    const trailer = `trailer\n<< /Size ${maxObjId + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    const fullPdf = Buffer.concat([header, ...chunks, Buffer.from(xref, "ascii"), Buffer.from(trailer, "ascii")]);
    fs.writeFileSync(outputPath, fullPdf);
    console.log(`Successfully generated ATS PDF (${totalPages} pages): ${outputPath} (${fullPdf.length} bytes)`);
  }
}

function generateUkCv(outputPath) {
  const pdf = new SimplePDFBuilder();

  pdf.y = 805;
  pdf.addText(pdf.marginLeft, pdf.y, "INDRA KIRAN SANE", "/F2", 18, 0.06, 0.10, 0.16);
  pdf.y -= 14;
  pdf.addText(pdf.marginLeft, pdf.y, "Data Analyst  |  Aspiring Data Scientist  |  Software Engineer", "/F2", 10, 0.08, 0.50, 0.38);
  pdf.y -= 13;

  const contactLeft = "Location: Leicester, United Kingdom  |  Email: saneindradev2790@gmail.com  |  Phone: +44 07344738617";
  pdf.addText(pdf.marginLeft, pdf.y, contactLeft, "/F1", 8, 0.30, 0.35, 0.40);
  pdf.y -= 10;
  const contactRight = "LinkedIn: linkedin.com/in/indrakiran-sane  |  GitHub: github.com/SANEINDRA2790  |  Status: Open to UK Roles";
  pdf.addText(pdf.marginLeft, pdf.y, contactRight, "/F1", 8, 0.30, 0.35, 0.40);
  pdf.y -= 4;
  pdf.drawLine(pdf.marginLeft, pdf.y, pdf.marginRight, pdf.y, 1.0, 0.08, 0.50, 0.38);
  pdf.y -= 8;

  pdf.addSectionHeader("Professional Profile");
  const summary =
    "Commercially grounded Data Analyst and Software Engineer with 2+ years of enterprise production experience " +
    "at Capgemini, currently pursuing an MSc in Data Science with Industry at the University of Leicester (2026-2028). " +
    "Demonstrated track record of achieving a documented 20% database execution latency reduction across high-throughput " +
    "transactional systems through SQL query tuning and stored procedure optimization. Experienced in developing full-stack " +
    "enterprise applications (.NET Core Web API, Angular, MySQL), creating decision-driven executive business intelligence " +
    "dashboards in Tableau and Power BI, and executing statistical exploratory data analysis in Python. Committed to delivering " +
    "scalable, reproducible data solutions that translate complex transactional datasets into commercial business decisions.";
  for (const line of pdf.wrapText(summary, 98)) {
    pdf.addText(pdf.marginLeft, pdf.y, line, "/F1", 8.5, 0.15, 0.18, 0.22);
    pdf.y -= 11.5;
  }

  pdf.addSectionHeader("Technical Competencies & Skills");
  const skills = [
    ["Data Analytics & EDA:", "Python (Pandas, NumPy), Exploratory Data Analysis, Statistical Analysis, Data Wrangling, Imputation, Hypothesis Testing"],
    ["Databases & Query Tuning:", "MySQL, SQL Stored Procedures, Composite B-Tree Indexing, Query Optimization, 3NF Relational Architecture, EXPLAIN Analysis"],
    ["Business Intelligence:", "Power BI, Tableau (Tableau Public), Excel (Power Pivot, Dynamic DAX, Slicers), KPI Dashboards, Reporting Automation"],
    ["Software Engineering:", "C#, .NET Core Web API, Angular, RESTful API Architecture, Object-Oriented Design, Agile/Scrum Sprints"],
    ["Machine Learning (Applied):", "Scikit-learn, Predictive Regression Modeling, Model Evaluation (R2, RMSE, Cross-Validation), Feature Scaling"],
    ["Cloud & Infrastructure:", "Microsoft Azure (AI-102, AI-900, PL-300), AWS Cloud Fundamentals (CLF-C02), Google Cloud ACE, Git Version Control"],
  ];
  for (const [label, val] of skills) {
    pdf.checkPageBreak(14);
    pdf.addText(pdf.marginLeft, pdf.y, label, "/F2", 8.5, 0.08, 0.12, 0.18);
    pdf.addText(pdf.marginLeft + 140, pdf.y, val, "/F1", 8.2, 0.20, 0.24, 0.28);
    pdf.y -= 11.5;
  }

  pdf.addSectionHeader("Professional Experience");
  pdf.addJobHeader("Senior Analyst (Software Engineer)", "Capgemini", "October 2023 - 2024", "Enterprise Solutions Unit");
  pdf.addBullet("Engineered and deployed full-stack enterprise web applications using .NET Core Web API, Angular, and MySQL within Agile production sprints.", 14, 96);
  pdf.addBullet("Refactored high-concurrency SQL queries and transactional stored procedures, achieving a documented 20% reduction in database execution times.", 14, 96);
  pdf.addBullet("Collaborated with cloud engineering teams on Microsoft Azure deployment pipelines, environment configuration, and backend API monitoring.", 14, 96);
  pdf.addBullet("Conducted data cleansing and exploratory data reporting to support operational decision-making across core enterprise modules.", 14, 96);
  pdf.addBullet("Authored comprehensive Standard Operating Procedures (SOPs) and technical documentation to streamline onboarding and maintain code quality.", 14, 96);

  pdf.addJobHeader("Junior Data Analyst Trainee", "Innomatics Research Labs", "December 2022 - August 2023", "Data Science Division");
  pdf.addBullet("Processed and analyzed large tabular datasets utilizing Python (Pandas, NumPy) to isolate business trends, seasonal variance, and data anomalies.", 14, 96);
  pdf.addBullet("Designed and maintained interactive executive dashboards in Tableau and Power BI, translating raw transactional logs into actionable KPI monitors.", 14, 96);
  pdf.addBullet("Automated weekly reporting pipelines using SQL queries, Excel formulas, and VBA macro routines, eliminating 14 hours of manual copy-paste overhead.", 14, 96);
  pdf.addBullet("Implemented supervised machine learning workflows including feature selection, data normalization, and baseline predictive regression models.", 14, 96);

  pdf.addSectionHeader("Academic Qualifications");
  pdf.addJobHeader("MSc Data Science with Industry (Postgraduate Degree)", "University of Leicester", "2026 - 2028", "Leicester, United Kingdom");
  pdf.addBullet("Current Postgraduate Specialization: Advanced statistical modeling, scalable data architectures, machine learning algorithms, and industrial UK practice.", 14, 96);

  pdf.addJobHeader("Bachelor of Technology (B.Tech) - Electronics & Communication", "Sreenidhi Institute of Science & Tech", "2018 - 2022", "Hyderabad, India");
  pdf.addBullet("Coursework in computational mathematics, linear algebra, signal processing, and algorithms; authored 2 published peer-reviewed research papers.", 14, 96);

  pdf.addJobHeader("Intermediate / Higher Secondary Education (MPC)", "Narayana Junior College", "2016 - 2018", "Hyderabad, India");
  pdf.addBullet("Focus on Mathematics, Physics, and Chemistry; developed advanced analytical problem-solving and quantitative reasoning foundations.", 14, 96);

  pdf.addSectionHeader("Verified Professional Certifications");
  const certs = [
    "Microsoft Certified: Azure AI Engineer Associate (AI-102) - Cognitive Services, Knowledge Mining, Azure OpenAI",
    "Microsoft Certified: Azure AI Fundamentals (AI-900) - Machine Learning workloads, Computer Vision, Responsible AI",
    "Microsoft Certified: Power BI Data Analyst Associate (PL-300) - DAX Formulas, Data Modeling, Dashboard Governance",
    "AWS Certified Cloud Practitioner (CLF-C02) - Cloud Architecture Principles, Security, IAM, Cloud Economics",
    "Google Cloud Associate Cloud Engineer (ACE) - GKE, Cloud Storage, Compute Engine Deployment, gcloud CLI",
    "NASSCOM Certification: Python Fundamentals and Programming - Data Structures, Algorithmic Efficiency, Wrangling",
  ];
  for (const c of certs) {
    pdf.addBullet(c, 10, 98);
  }

  pdf.addSectionHeader("Empirical Projects & Research Publications");
  pdf.addJobHeader("Food Delivery Operational Analysis", "Tableau Public Live Dashboard", "Interactive BI", "45,000+ Orders");
  pdf.addBullet("Engineered operational dashboard isolating courier lead times; proved kitchen preparation accounted for 58% of delay bottlenecks during rush periods.", 14, 96);

  pdf.addJobHeader("E-Commerce Relational Schema & SQL Tuning", "MySQL Optimization Study", "Database Tuning", "-93% Latency");
  pdf.addBullet("Normalized 8-table enterprise schema in 3NF; added composite B-Tree indexing and stored procedures, cutting query execution from 1,840ms to 120ms.", 14, 96);

  pdf.addJobHeader("Medical Insurance Predictive Cost Modeling", "Scikit-Learn Regression", "Machine Learning", "R2 = 0.87");
  pdf.addBullet("Built transparent regression pipeline predicting insurance premiums; cross-validated Random Forest Regressor yielding 0.87 R2 on holdout split.", 14, 96);

  pdf.addJobHeader("Research Paper: IoT Based Electricity Energy Meter", "Int. Journal of Computer Science & Mobile Computing", "Published", "Peer-Reviewed");
  pdf.addBullet("Architected real-time power telemetry and consumption tracking hardware-software framework with automated demand-side load notifications.", 14, 96);

  pdf.buildPdf(outputPath);
}

function generateIndiaResume(outputPath) {
  const pdf = new SimplePDFBuilder();

  pdf.y = 805;
  pdf.addText(pdf.marginLeft, pdf.y, "INDRA KIRAN SANE", "/F2", 18, 0.06, 0.10, 0.16);
  pdf.y -= 14;
  pdf.addText(pdf.marginLeft, pdf.y, "Software Engineer  |  Data Analyst  |  Aspiring Data Scientist", "/F2", 10, 0.10, 0.45, 0.65);
  pdf.y -= 13;

  const contactLeft = "Email: saneindradev2790@gmail.com  |  Phone: +44 07344738617 / +91 Contact  |  Location: Leicester, UK / Hyderabad, IN";
  pdf.addText(pdf.marginLeft, pdf.y, contactLeft, "/F1", 8, 0.30, 0.35, 0.40);
  pdf.y -= 10;
  const contactRight = "LinkedIn: linkedin.com/in/indrakiran-sane  |  GitHub: github.com/SANEINDRA2790  |  Portfolio: Live Case Studies Available";
  pdf.addText(pdf.marginLeft, pdf.y, contactRight, "/F1", 8, 0.30, 0.35, 0.40);
  pdf.y -= 4;
  pdf.drawLine(pdf.marginLeft, pdf.y, pdf.marginRight, pdf.y, 1.0, 0.10, 0.45, 0.65);
  pdf.y -= 8;

  pdf.addSectionHeader("Executive Summary");
  const summary =
    "Results-oriented Software Engineer and Data Analyst with 2+ years of professional enterprise experience at Capgemini, " +
    "specializing in full-stack web application development (.NET Core Web API, Angular, C#) and high-performance database " +
    "optimization (MySQL, SQL query tuning, stored procedures). Proven ability to reduce database latency by 20% on production " +
    "systems through execution plan profiling and B-Tree indexing. Strong analytical capabilities in Python (Pandas, NumPy, EDA) " +
    "and Business Intelligence (Power BI, Tableau, Excel VBA). Pursuing MSc Data Science with Industry at University of Leicester, " +
    "UK. Certified in Microsoft Azure (AI-102, AI-900, PL-300), AWS Cloud (CLF-C02), and Google Cloud (ACE).";
  for (const line of pdf.wrapText(summary, 98)) {
    pdf.addText(pdf.marginLeft, pdf.y, line, "/F1", 8.5, 0.15, 0.18, 0.22);
    pdf.y -= 11.5;
  }

  pdf.addSectionHeader("Technical Skills Matrix");
  const matrix = [
    ["Programming Languages:", "Python, SQL, C#, TypeScript, JavaScript, VBA"],
    ["Backend & Frameworks:", ".NET Core Web API, ASP.NET, RESTful Web Services, Entity Framework, Node.js fundamentals"],
    ["Frontend Technologies:", "Angular, TypeScript, HTML5, CSS3, Tailwind CSS, Responsive Web Design"],
    ["Databases & Optimization:", "MySQL, SQL Server, Stored Procedures, Triggers, Views, Query Optimization, B-Tree Indexing, EXPLAIN"],
    ["BI & Visualisation Tools:", "Power BI, Tableau Desktop / Public, Excel Power Pivot, Dynamic DAX, Matplotlib, Seaborn"],
    ["Data Science & ML:", "Exploratory Data Analysis (EDA), Scikit-learn, Predictive Regression, Classification, Model Evaluation"],
    ["Cloud & DevOps:", "Microsoft Azure (App Services, Cognitive Services), AWS Cloud, Google Cloud Platform, Git, CI/CD, Agile"],
  ];
  for (const [label, val] of matrix) {
    pdf.checkPageBreak(14);
    pdf.addText(pdf.marginLeft, pdf.y, label, "/F2", 8.5, 0.08, 0.12, 0.18);
    pdf.addText(pdf.marginLeft + 140, pdf.y, val, "/F1", 8.2, 0.20, 0.24, 0.28);
    pdf.y -= 11.5;
  }

  pdf.addSectionHeader("Professional Experience");
  pdf.addJobHeader("Senior Analyst (Software Engineer)", "Capgemini", "October 2023 - 2024", "Delivery Center, India");
  pdf.addBullet("Developed enterprise-grade full-stack web solutions utilizing .NET Core Web API, C#, Angular, and MySQL within Agile sprints.", 14, 96);
  pdf.addBullet("Analyzed slow query execution plans using EXPLAIN and refactored relational database stored procedures, slashing query latency by 20%.", 14, 96);
  pdf.addBullet("Architected RESTful microservice endpoints and integrated third-party APIs with comprehensive error handling and logging.", 14, 96);
  pdf.addBullet("Collaborated with cross-functional cloud engineering and DevOps teams on Azure cloud infrastructure deployment and monitoring.", 14, 96);
  pdf.addBullet("Authored rigorous technical design documents (TDDs) and Standard Operating Procedures (SOPs) to ensure enterprise compliance.", 14, 96);

  pdf.addJobHeader("Junior Data Analyst / Data Science Trainee", "Innomatics Research Labs", "December 2022 - August 2023", "Hyderabad, India");
  pdf.addBullet("Executed data cleaning, imputation, and exploratory data analysis (EDA) on high-volume tabular datasets using Python (Pandas, NumPy).", 14, 96);
  pdf.addBullet("Designed executive KPI dashboards and operational reporting views in Tableau and Power BI for stakeholder performance tracking.", 14, 96);
  pdf.addBullet("Automated manual weekly reporting routines by authoring complex SQL views and Excel VBA macros, saving 14+ hours of manual labor per week.", 14, 96);
  pdf.addBullet("Participated in machine learning sprints, engineering features and validating baseline predictive regression models using Scikit-learn.", 14, 96);

  pdf.addSectionHeader("Education & Academic Background");
  pdf.addJobHeader("MSc Data Science with Industry (Postgraduate)", "University of Leicester", "2026 - 2028", "United Kingdom");
  pdf.addBullet("Specializing in Advanced Machine Learning, Big Data Analytics, Statistical Inference, and UK Commercial Industry Placement.", 14, 96);

  pdf.addJobHeader("Bachelor of Technology (B.Tech) - Electronics & Communication", "Sreenidhi Institute of Science & Technology", "2018 - 2022", "Hyderabad, India");
  pdf.addBullet("Graduated with strong foundations in Linear Algebra, Computational Mathematics, and Embedded Systems; published 2 international research papers.", 14, 96);

  pdf.addJobHeader("Higher Secondary Intermediate (MPC)", "Narayana Junior College", "2016 - 2018", "Hyderabad, India");
  pdf.addBullet("State Board Curriculum: Mathematics, Physics, and Chemistry with distinction in analytical problem solving.", 14, 96);

  pdf.addSectionHeader("Professional Certifications & Accreditations");
  const certs = [
    "Microsoft Certified: Azure AI Engineer Associate (AI-102) - Enterprise AI Solutions & Cognitive Services",
    "Microsoft Certified: Azure AI Fundamentals (AI-900) - AI/ML Workloads & Principles",
    "Microsoft Certified: Power BI Data Analyst Associate (PL-300) - Business Intelligence & DAX",
    "AWS Certified Cloud Practitioner (CLF-C02) - Cloud Architecture, Compute, Storage & Security",
    "Google Cloud Associate Cloud Engineer (ACE) - Enterprise Cloud Infrastructure Deployment",
    "NASSCOM Certification: Python Fundamentals and Programming - Data Wrangling & Algorithmic Design",
  ];
  for (const c of certs) {
    pdf.addBullet(c, 10, 98);
  }

  pdf.addSectionHeader("Key Technical Projects & Case Studies");
  pdf.addJobHeader("E-Commerce Relational Database & Query Optimization", "SQL, MySQL, Stored Procedures", "Database Architecture", "93% Speedup");
  pdf.addBullet("Engineered 3NF relational database schema; implemented composite indexing and ACID-compliant checkout procedures, cutting latency from 1,840ms to 120ms.", 14, 96);

  pdf.addJobHeader("Food Delivery Operational Intelligence", "Tableau Public, SQL, Python", "BI & Analytics", "45,000+ Orders");
  pdf.addBullet("Built interactive multi-dimensional dashboard tracking 45,000+ orders; identified kitchen dwell time as root cause of 58% of delivery SLA breaches.", 14, 96);

  pdf.addJobHeader("Automobile Specification & Price Correlation EDA", "Python, Pandas, Seaborn", "Exploratory Analytics", "205 Models");
  pdf.addBullet("Evaluated 205 vehicle models across 26 attributes; Pearson correlation matrix identified displacement and curb weight as primary retail price drivers (+0.87).", 14, 96);

  pdf.addJobHeader("Healthcare Insurance Cost Predictive Modeling", "Python, Scikit-learn, Random Forest", "Predictive Modeling", "R2 = 0.87");
  pdf.addBullet("Trained machine learning regression models on 1,338 policyholders; benchmarked Random Forest Regressor achieving 0.87 R2 on holdout evaluation split.", 14, 96);

  pdf.addSectionHeader("Peer-Reviewed Research Publications");
  pdf.addJobHeader("IoT Based Electricity Energy Meter", "Int. Journal of Computer Science & Mobile Computing (IJCSMC)", "Published", "Author");
  pdf.addBullet("Designed hardware-software IoT telemetry system streaming real-time electrical energy consumption data with automated threshold alerting.", 14, 96);

  pdf.addJobHeader("Segmentation of Images using Automatic Fuzzy Clustering", "Int. Journal of Digital Electronics (IJDE)", "Published", "Author");
  pdf.addBullet("Developed unsupervised fuzzy clustering framework for adaptive digital image segmentation with superior noise resistance.", 14, 96);

  pdf.buildPdf(outputPath);
}

// Main Execution
const publicDir = path.join(__dirname, "..", "public");
const ukCvPath = path.join(publicDir, "Indra_Kiran_Sane_CV_UK.pdf");
const indiaResumePath = path.join(publicDir, "Indra_Kiran_Sane_Resume_India.pdf");
const fallbackResumePath = path.join(publicDir, "resume.pdf");

console.log("Generating UK Standard Curriculum Vitae (ATS-Optimised)...");
generateUkCv(ukCvPath);

console.log("Generating India / International Technical Resume (ATS-Optimised)...");
generateIndiaResume(indiaResumePath);

fs.copyFileSync(ukCvPath, fallbackResumePath);
console.log(`Updated default ${fallbackResumePath} with UK CV (${fs.statSync(fallbackResumePath).size} bytes)`);

