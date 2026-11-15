#!/usr/bin/env node
/**
 * Standalone Generator for all 12 Pre-generated ATS Resume Combinations:
 * 4 Professional Roles × 3 Country Formats = 12 PDF Documents
 * Writes directly to public/cv/
 */

const fs = require("fs");
const path = require("path");

class SimplePDFBuilder {
  constructor(pageWidth = 595.28, pageHeight = 841.89) {
    this.width = pageWidth;
    this.height = pageHeight;
    this.pages = [];
    this.currentPageCommands = [];
    this.y = this.height - 38;
    this.marginLeft = 40;
    this.marginRight = this.width - 40;
    this.contentWidth = this.marginRight - this.marginLeft;
  }

  newPage() {
    if (this.currentPageCommands.length > 0) {
      this.pages.push(this.currentPageCommands.join("\n"));
      this.currentPageCommands = [];
    }
    this.y = this.height - 38;
  }

  drawLine(x1, y1, x2, y2, width = 0.6, r = 0.8, g = 0.8, b = 0.8) {
    const cmd = `${width.toFixed(2)} w ${r.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} RG ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`;
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

  wrapText(text, maxChars = 96) {
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

  checkPageBreak(neededSpace = 36) {
    if (this.y - neededSpace < 36) {
      this.newPage();
    }
  }

  addSectionHeader(title, r = 0.04, g = 0.38, b = 0.28) {
    this.checkPageBreak(32);
    this.y -= 13;
    this.addText(this.marginLeft, this.y, title.toUpperCase(), "/F2", 10, r, g, b);
    this.y -= 3.5;
    this.drawLine(this.marginLeft, this.y, this.marginRight, this.y, 0.75, r + 0.1, g + 0.15, b + 0.15);
    this.y -= 9;
  }

  addJobHeader(leftMain, leftSub, period, location = "") {
    this.checkPageBreak(22);
    const leftText = leftSub ? `${leftMain}  |  ${leftSub}` : leftMain;
    this.addText(this.marginLeft, this.y, leftText, "/F2", 9.2, 0.08, 0.12, 0.18);
    const rightStr = location ? `${period}  (${location})` : period;
    const rightX = this.marginRight - rightStr.length * 4.9;
    this.addText(rightX, this.y, rightStr, "/F3", 8.2, 0.35, 0.40, 0.45);
    this.y -= 11.5;
  }

  addBullet(text, indent = 13, maxChars = 96, bulletChar = "-") {
    const lines = this.wrapText(text, maxChars);
    this.checkPageBreak(lines.length * 10.5 + 4);
    for (let i = 0; i < lines.length; i++) {
      if (i === 0) {
        this.addText(this.marginLeft + 2, this.y, bulletChar, "/F2", 8.2, 0.15, 0.55, 0.42);
      }
      this.addText(this.marginLeft + indent, this.y, lines[i], "/F1", 8.2, 0.15, 0.18, 0.22);
      this.y -= 10.5;
    }
    this.y -= 1.5;
  }

  buildBuffer() {
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

    return Buffer.concat([header, ...chunks, Buffer.from(xref, "ascii"), Buffer.from(trailer, "ascii")]);
  }
}

// ROLES AND COUNTRY DEFINITIONS
const ROLES = [
  {
    id: "data-analyst",
    filenameRole: "Data_Analyst",
    title: "Data Analyst",
    headline: "Data Analyst | SQL Database Optimization & BI Automation",
    summary: {
      UK: "Commercially grounded Data Analyst with 2+ years of enterprise production experience at Capgemini, currently completing an MSc in Data Science with Industry at the University of Leicester (2026-2028). Proven track record of achieving a documented 20% database execution latency reduction across high-throughput transactional systems through SQL query tuning and stored procedure optimization. Experienced in developing executive business intelligence dashboards in Tableau and Power BI, automating manual reporting workflows using Excel/VBA (saving 14 hrs/week), and executing statistical exploratory data analysis in Python. Committed to delivering evidence-based data solutions that translate complex transactional datasets into commercial business decisions.",
      USA: "Quant-driven Data Analyst with 2+ years of enterprise experience at Capgemini specializing in SQL query optimization, business intelligence, and automated reporting pipelines. Spearheaded stored procedure refactoring that reduced database execution times by 20% across mission-critical enterprise systems. Proven expertise in building interactive executive dashboards in Tableau and Power BI, engineering automated data pipelines using Python (Pandas, NumPy) and Excel VBA, and extracting actionable commercial insights from high-volume transactional repositories.",
      India: "Results-driven Data Analyst with 2+ years of enterprise experience at Capgemini and specialized data analytics training at Innomatics Research Labs. Strong background in relational database architecture, SQL query tuning, stored procedure optimization, and business intelligence reporting. Spearheaded database performance tuning that achieved a 20% response-time improvement on production systems. Proficient in Python (Pandas, NumPy), Tableau, Power BI, and Excel VBA automation. Currently pursuing MSc Data Science with Industry at University of Leicester, UK.",
    },
    skills: [
      { category: "Databases & SQL Engineering", skills: ["SQL", "MySQL", "SQL Query Optimization", "Stored Procedures", "Relational Schema Design (3NF)", "B-Tree Indexing", "EXPLAIN Analysis"] },
      { category: "Business Intelligence & Reporting", skills: ["Power BI", "Tableau (Tableau Public)", "Excel Power Pivot & Slicers", "VBA & Macros", "Dynamic DAX", "CSAT KPI Trackers"] },
      { category: "Data Analytics & Python", skills: ["Python (Pandas, NumPy)", "Exploratory Data Analysis (EDA)", "Statistical Analysis", "Data Cleaning & Wrangling", "Outlier Imputation", "Hypothesis Testing"] },
      { category: "Software & Cloud Foundations", skills: ["C#", ".NET Core Web API", "RESTful APIs", "Microsoft Azure", "Git Version Control"] },
    ],
    projects: [
      { title: "Food Delivery Operational Analysis", tech: "Tableau Public, SQL, Python", cat: "Interactive BI", metric: "45,000+ Orders", bullet: "Engineered operational dashboard isolating courier lead times; proved kitchen preparation accounted for 58% of delay bottlenecks during rush periods." },
      { title: "Enterprise Sales Order & Revenue Intelligence", tech: "Excel, VBA, Power Pivot", cat: "BI & Dashboards", metric: "14 hrs/wk Saved", bullet: "Standardized relational model linking Orders, Products, and Territories with automated VBA ingestion, eliminating 14 hours of manual copy-paste overhead per week." },
      { title: "E-Commerce Relational Schema & SQL Tuning", tech: "MySQL, Stored Procedures", cat: "Database Tuning", metric: "-93% Latency", bullet: "Normalized 8-table enterprise schema in 3NF; added composite B-Tree indexing and stored procedures, cutting query execution from 1,840ms to 120ms." },
    ],
    certs: [
      "Microsoft Certified: Power BI Data Analyst Associate (PL-300) - DAX Formulas & Governance",
      "NASSCOM Certification: Python Fundamentals and Programming - Data Wrangling & Algorithmic Design",
      "Microsoft Certified: Azure AI Fundamentals (AI-900) - Machine Learning workloads",
      "Google Cloud Associate Cloud Engineer (ACE) - Enterprise Cloud Infrastructure Deployment",
      "AWS Certified Cloud Practitioner (CLF-C02) - Cloud Architecture Principles & Security",
      "Microsoft Certified: Azure AI Engineer Associate (AI-102) - Cognitive Services & Azure OpenAI",
    ],
    includePubs: false,
  },
  {
    id: "data-scientist",
    filenameRole: "Data_Scientist",
    title: "Data Scientist",
    headline: "Data Scientist | Statistical Modeling & Applied Machine Learning",
    summary: {
      UK: "Analytical Data Scientist candidate with 2+ years of enterprise engineering experience at Capgemini, currently completing an MSc in Data Science with Industry at the University of Leicester (2026-2028). Specializing in statistical modeling, exploratory data analysis, and predictive machine learning pipelines using Python (Pandas, NumPy, Scikit-learn). Demonstrated ability to combine mathematical rigor with practical engineering, backed by verified case studies including actuarial risk regression modeling (Random Forest R2 = 0.87) and high-concurrency database query optimization (20% latency reduction). Eager to leverage postgraduate statistical training and commercial software experience in a UK data science placement.",
      USA: "Data Scientist combining 2+ years of software engineering experience at Capgemini with postgraduate specialization in statistical modeling and predictive machine learning. Proficient in Python (NumPy, Pandas, Scikit-learn), regression analysis, exploratory data analysis (EDA), and model evaluation. Validated track record of delivering measurable outcomes including an actuarial regression model yielding 0.87 R2 on holdout splits and stored procedure optimization cutting database query times by 20%. Seeking data science opportunities to translate complex datasets into predictive business impact.",
      India: "Data Scientist with solid foundational software engineering experience at Capgemini and advanced postgraduate studies in Data Science with Industry at the University of Leicester, UK. Skilled in exploratory data analysis (EDA), statistical inference, feature engineering, and supervised machine learning using Python (Pandas, NumPy, Scikit-learn). Authored peer-reviewed research papers in image segmentation clustering and IoT telemetry. Proven ability to optimize data pipelines and build robust predictive regression models.",
    },
    skills: [
      { category: "Machine Learning & Predictive Modeling", skills: ["Scikit-learn", "Predictive Regression Modeling", "Model Evaluation (R2, RMSE, CV)", "Feature Engineering & Selection", "Supervised Algorithms", "StandardScaler Normalization"] },
      { category: "Data Science & Statistical Analysis", skills: ["Python (Pandas, NumPy)", "Exploratory Data Analysis (EDA)", "Statistical Analysis & Inference", "Hypothesis Testing", "Data Cleaning & Imputation", "Seaborn & Matplotlib"] },
      { category: "Databases & Big Data Infrastructure", skills: ["SQL", "MySQL", "Relational Schema Design", "Stored Procedures", "Query Optimization"] },
      { category: "Cloud AI & Software Fundamentals", skills: ["Microsoft Azure (AI-900, AI-102)", "C#", ".NET Core Web API", "Git Version Control"] },
    ],
    projects: [
      { title: "Medical Insurance Cost Predictive Modeling", tech: "Python, Scikit-learn, Random Forest", cat: "Machine Learning", metric: "R2 = 0.87", bullet: "Built transparent regression pipeline predicting insurance premiums; cross-validated Random Forest Regressor yielding 0.87 R2 on holdout evaluation split." },
      { title: "Automobile Brands Exploratory Data Analysis", tech: "Python, Pandas, Seaborn", cat: "Data Analytics", metric: "+0.87 Corr", bullet: "Analyzed 205 vehicle models across 26 technical attributes; Pearson correlation matrix isolated engine displacement and curb weight as primary retail price drivers." },
      { title: "Food Delivery Operational Intelligence", tech: "Tableau Public, SQL, Python", cat: "Interactive BI", metric: "45,000+ Orders", bullet: "Cleaned and modeled 45,000+ orders; proved kitchen prep dwell time accounted for 58% of delay bottlenecks during peak hours." },
    ],
    certs: [
      "Microsoft Certified: Azure AI Fundamentals (AI-900) - Machine Learning workloads",
      "NASSCOM Certification: Python Fundamentals and Programming - Data Wrangling & Algorithmic Design",
      "Microsoft Certified: Azure AI Engineer Associate (AI-102) - Cognitive Services & Azure OpenAI",
      "Microsoft Certified: Power BI Data Analyst Associate (PL-300) - DAX Formulas & Governance",
      "AWS Certified Cloud Practitioner (CLF-C02) - Cloud Architecture Principles & Security",
      "Google Cloud Associate Cloud Engineer (ACE) - Enterprise Cloud Infrastructure Deployment",
    ],
    includePubs: true,
  },
  {
    id: "ai-ml-engineer",
    filenameRole: "AI_ML_Engineer",
    title: "AI / Machine Learning Engineer",
    headline: "AI / Machine Learning Engineer | Cloud AI & Applied ML Algorithms",
    summary: {
      UK: "Software Engineer and aspiring AI/ML specialist with 2+ years of enterprise experience at Capgemini, currently pursuing an MSc in Data Science with Industry at the University of Leicester (2026-2028). Certified as a Microsoft Azure AI Engineer Associate (AI-102) and Azure AI Fundamentals (AI-900). Strong grounding in applied machine learning algorithms using Python (Scikit-learn), predictive modeling, and mathematical algorithms, complemented by 2 published peer-reviewed research papers in image segmentation clustering and IoT telemetry. Combining solid backend engineering foundations with cutting-edge postgraduate AI coursework to deliver robust, scalable machine learning solutions.",
      USA: "AI/ML Engineer combining 2+ years of full-stack enterprise software engineering at Capgemini with Microsoft Azure AI Engineer Associate (AI-102) certification and postgraduate specialization in Data Science. Skilled in Python, Scikit-learn, predictive regression, unsupervised clustering, and cloud AI architecture. Author of two peer-reviewed publications covering fuzzy clustering image segmentation and IoT telemetry. Passionate about bridging enterprise software engineering with applied machine learning and cloud AI services.",
      India: "AI / ML Engineer with 2+ years of enterprise engineering experience at Capgemini and certified in Microsoft Azure AI Engineer Associate (AI-102) and Azure AI Fundamentals (AI-900). Strong technical foundations in Python, Scikit-learn, machine learning algorithms, and RESTful API development. Authored and published 2 international research papers on unsupervised image segmentation and IoT telemetry architectures. Currently advancing specialization through MSc Data Science with Industry at University of Leicester, UK.",
    },
    skills: [
      { category: "Cloud AI & Cognitive Services", skills: ["Microsoft Azure (AI-102 Certified)", "Azure AI Fundamentals (AI-900)", "Cognitive Services & Vision Concepts", "Knowledge Mining Concepts", "Responsible AI Principles", "AWS Cloud Practitioner", "Google Cloud ACE"] },
      { category: "Machine Learning & Algorithms", skills: ["Python (Scikit-learn)", "Predictive Regression Modeling", "Unsupervised Fuzzy Clustering", "Feature Engineering & Normalization", "Model Evaluation Metrics", "Exploratory Data Analysis"] },
      { category: "Software Engineering & APIs", skills: ["C#", ".NET Core Web API", "RESTful API Integration", "MySQL", "Git Version Control"] },
      { category: "IoT & Telemetry Systems", skills: ["Real-time Telemetry Processing", "Hardware-Software Integration", "Microcontroller Interfacing"] },
    ],
    projects: [
      { title: "Medical Insurance Cost Predictive Modeling", tech: "Python, Scikit-learn", cat: "Machine Learning", metric: "R2 = 0.87", bullet: "Trained and evaluated machine learning regression models on 1,338 policyholders; benchmarked Random Forest Regressor achieving 0.87 R2 on holdout evaluation split." },
      { title: "Automobile Brands Exploratory Data Analysis", tech: "Python, Pandas, Seaborn", cat: "Exploratory Analytics", metric: "205 Models", bullet: "Evaluated 205 vehicle models with Pearson correlation matrix identifying displacement and curb weight as primary retail price drivers (+0.87)." },
      { title: "E-Commerce Relational Schema & SQL Tuning", tech: "SQL, MySQL, Stored Procedures", cat: "Database Tuning", metric: "-93% Latency", bullet: "Engineered 3NF relational schema with composite B-Tree indexing and stored procedures, cutting checkout query latency from 1,840ms to 120ms." },
    ],
    certs: [
      "Microsoft Certified: Azure AI Engineer Associate (AI-102) - Cognitive Services & Azure OpenAI",
      "Microsoft Certified: Azure AI Fundamentals (AI-900) - Machine Learning workloads",
      "Google Cloud Associate Cloud Engineer (ACE) - Enterprise Cloud Infrastructure Deployment",
      "AWS Certified Cloud Practitioner (CLF-C02) - Cloud Architecture Principles & Security",
      "NASSCOM Certification: Python Fundamentals and Programming - Data Wrangling & Algorithmic Design",
      "Microsoft Certified: Power BI Data Analyst Associate (PL-300) - DAX Formulas & Governance",
    ],
    includePubs: true,
  },
  {
    id: "software-engineer",
    filenameRole: "Software_Engineer",
    title: "Software Engineer",
    headline: "Software Engineer | Full-Stack .NET Core, Angular & Database Tuning",
    summary: {
      UK: "Full-Stack Software Engineer with 2+ years of commercial enterprise production experience at Capgemini, currently pursuing an MSc in Data Science with Industry at the University of Leicester (2026-2028). Proven expertise in building robust, high-performance web applications using C#, .NET Core Web API, Angular, and MySQL within Agile delivery environments. Spearheaded stored procedure refactoring and query execution plan analysis that achieved a documented 20% reduction in database execution times. Strong understanding of RESTful API design, relational schema architecture, and Microsoft Azure deployment pipelines. Seeking UK software engineering opportunities.",
      USA: "Software Engineer with 2+ years of enterprise engineering experience at Capgemini specializing in full-stack application development (.NET Core, C#, Angular) and relational database performance tuning. Proven track record of architecting scalable REST APIs and optimizing complex SQL stored procedures, achieving a documented 20% reduction in database latency. Skilled in Agile software lifecycles, cloud deployments on Azure, and writing clean, maintainable, testable code.",
      India: "Software Engineer with 2+ years of enterprise software engineering experience at Capgemini. Core expertise in full-stack web application development using .NET Core Web API, C#, Angular, TypeScript, and MySQL. Spearheaded stored procedure tuning that achieved a 20% database execution latency improvement on high-concurrency production systems. Certified across Microsoft Azure, AWS Cloud Practitioner, and Google Associate Cloud Engineer. Currently pursuing MSc Data Science with Industry at University of Leicester, UK.",
    },
    skills: [
      { category: "Backend & Systems Engineering", skills: ["C#", ".NET Core Web API", "RESTful APIs", "Object-Oriented Design (OOP)", "ASP.NET Core", "Dependency Injection", "Microservices Concepts"] },
      { category: "Databases & Query Optimization", skills: ["MySQL", "SQL Query Optimization", "Stored Procedures", "Relational Schema Design (3NF)", "B-Tree Indexing", "Execution Plan Analysis (EXPLAIN)", "ACID Transactions"] },
      { category: "Frontend Web Development", skills: ["Angular", "TypeScript / JavaScript", "HTML5 / CSS3", "Tailwind CSS", "Single Page Applications (SPA)", "Responsive Design"] },
      { category: "Cloud, DevOps & Tools", skills: ["Microsoft Azure", "AWS Cloud Fundamentals", "Google Cloud Platform (ACE)", "Git & Version Control", "Agile / Scrum Sprints"] },
    ],
    projects: [
      { title: "E-Commerce Relational Database & Query Optimization", tech: "SQL, MySQL, Stored Procedures", cat: "Database Tuning", metric: "-93% Latency", bullet: "Engineered 3NF relational database schema; implemented composite indexing and ACID-compliant checkout procedures, cutting latency from 1,840ms to 120ms." },
      { title: "Enterprise Sales Order & Revenue Intelligence", tech: "Excel, VBA, Relational Modeling", cat: "Systems & BI", metric: "14 hrs/wk Saved", bullet: "Standardized relational data model linking Orders, Customers, and Products with automated VBA ingestion routines saving 14+ hours per week." },
      { title: "Food Delivery Operational Intelligence", tech: "Tableau Public, SQL, Python", cat: "Interactive BI", metric: "45,000+ Orders", bullet: "Built interactive dashboard tracking 45,000+ orders; identified kitchen prep dwell time as root cause of 58% of delivery SLA breaches." },
    ],
    certs: [
      "Google Cloud Associate Cloud Engineer (ACE) - Enterprise Cloud Infrastructure Deployment",
      "AWS Certified Cloud Practitioner (CLF-C02) - Cloud Architecture Principles & Security",
      "Microsoft Certified: Azure AI Engineer Associate (AI-102) - Cognitive Services & Azure OpenAI",
      "Microsoft Certified: Power BI Data Analyst Associate (PL-300) - DAX Formulas & Governance",
      "Microsoft Certified: Azure AI Fundamentals (AI-900) - Machine Learning workloads",
      "NASSCOM Certification: Python Fundamentals and Programming - Data Wrangling & Algorithmic Design",
    ],
    includePubs: true,
  },
];

const COUNTRIES = ["UK", "USA", "India"];

function generateDocument(roleObj, country) {
  const pdf = new SimplePDFBuilder();
  const primaryR = country === "UK" ? 0.05 : country === "USA" ? 0.08 : 0.08;
  const primaryG = country === "UK" ? 0.42 : country === "USA" ? 0.35 : 0.45;
  const primaryB = country === "UK" ? 0.32 : country === "USA" ? 0.60 : 0.65;

  // Header
  pdf.y = 808;
  pdf.addText(pdf.marginLeft, pdf.y, "INDRA KIRAN SANE", "/F2", 18, 0.06, 0.10, 0.16);
  pdf.y -= 14;
  pdf.addText(pdf.marginLeft, pdf.y, roleObj.headline, "/F2", 9.8, primaryR, primaryG, primaryB);
  pdf.y -= 12.5;

  // Contact Strip
  if (country === "UK") {
    pdf.addText(pdf.marginLeft, pdf.y, "Location: Leicester, United Kingdom  |  Email: saneindradev2790@gmail.com  |  Phone: +44 07344738617", "/F1", 8, 0.30, 0.35, 0.40);
    pdf.y -= 9.5;
    pdf.addText(pdf.marginLeft, pdf.y, "LinkedIn: linkedin.com/in/indrakiran-sane  |  GitHub: github.com/SANEINDRA2790  |  Status: Open to UK Roles", "/F1", 8, 0.30, 0.35, 0.40);
  } else if (country === "USA") {
    pdf.addText(pdf.marginLeft, pdf.y, "Email: saneindradev2790@gmail.com  |  Phone: +44 07344738617  |  Location: Leicester, UK", "/F1", 8, 0.30, 0.35, 0.40);
    pdf.y -= 9.5;
    pdf.addText(pdf.marginLeft, pdf.y, "LinkedIn: linkedin.com/in/indrakiran-sane  |  GitHub: github.com/SANEINDRA2790  |  Portfolio: Live Case Studies", "/F1", 8, 0.30, 0.35, 0.40);
  } else {
    pdf.addText(pdf.marginLeft, pdf.y, "Email: saneindradev2790@gmail.com  |  Phone: +44 07344738617 / +91 Contact  |  Location: Leicester, UK / Hyderabad, IN", "/F1", 8, 0.30, 0.35, 0.40);
    pdf.y -= 9.5;
    pdf.addText(pdf.marginLeft, pdf.y, "LinkedIn: linkedin.com/in/indrakiran-sane  |  GitHub: github.com/SANEINDRA2790  |  Portfolio: Verified Case Studies", "/F1", 8, 0.30, 0.35, 0.40);
  }

  pdf.y -= 3.5;
  pdf.drawLine(pdf.marginLeft, pdf.y, pdf.marginRight, pdf.y, 0.9, primaryR, primaryG, primaryB);
  pdf.y -= 7.5;

  // Summary
  const summaryTitle = country === "UK" ? "Professional Profile" : country === "USA" ? "Executive Summary" : "Career Objective & Summary";
  pdf.addSectionHeader(summaryTitle, primaryR, primaryG, primaryB);
  for (const line of pdf.wrapText(roleObj.summary[country], 98)) {
    pdf.addText(pdf.marginLeft, pdf.y, line, "/F1", 8.2, 0.15, 0.18, 0.22);
    pdf.y -= 11;
  }

  // Skills
  const skillsTitle = country === "USA" ? "Core Technical Competencies" : "Technical Skills Matrix";
  pdf.addSectionHeader(skillsTitle, primaryR, primaryG, primaryB);
  for (const cat of roleObj.skills) {
    pdf.checkPageBreak(13);
    pdf.addText(pdf.marginLeft, pdf.y, `${cat.category}:`, "/F2", 8.3, 0.08, 0.12, 0.18);
    const skillsStr = cat.skills.join(", ");
    const lines = pdf.wrapText(skillsStr, 76);
    for (let l = 0; l < lines.length; l++) {
      if (l === 0) {
        pdf.addText(pdf.marginLeft + 130, pdf.y, lines[l], "/F1", 8.0, 0.20, 0.24, 0.28);
      } else {
        pdf.y -= 10.5;
        pdf.addText(pdf.marginLeft + 130, pdf.y, lines[l], "/F1", 8.0, 0.20, 0.24, 0.28);
      }
    }
    pdf.y -= 11.5;
  }

  // Experience
  pdf.addSectionHeader("Professional Experience", primaryR, primaryG, primaryB);
  pdf.addJobHeader("Senior Analyst (Software Engineer)", "Capgemini", "October 2023 - 2024", "Enterprise Solutions Unit");
  pdf.addBullet("Engineered full-stack enterprise web applications using .NET Core Web API, Angular, and MySQL within Agile production sprints.", 13, 96);
  pdf.addBullet("Refactored mission-critical SQL queries and transactional stored procedures, achieving a documented 20% reduction in database execution times.", 13, 96);
  pdf.addBullet("Collaborated with cloud engineering teams on Microsoft Azure deployment pipelines, environment configuration, and backend API monitoring.", 13, 96);
  pdf.addBullet("Conducted data cleansing and exploratory data reporting to support operational decision-making across core enterprise modules.", 13, 96);

  pdf.addJobHeader("Junior Data Analyst Trainee", "Innomatics Research Labs", "December 2022 - August 2023", "Data Science Division");
  pdf.addBullet("Processed and analyzed large tabular datasets utilizing Python (Pandas, NumPy) to isolate business trends and data anomalies.", 13, 96);
  pdf.addBullet("Designed interactive executive dashboards in Tableau and Power BI, translating raw transactional logs into KPI monitors.", 13, 96);
  pdf.addBullet("Automated weekly reporting pipelines using SQL queries, Excel formulas, and VBA macro routines, eliminating 14 hours of manual copy-paste overhead per week.", 13, 96);
  pdf.addBullet("Implemented supervised machine learning workflows including feature selection, data normalization, and baseline predictive regression models.", 13, 96);

  // Education
  const eduTitle = country === "UK" ? "Academic Qualifications" : "Education & Academic Background";
  pdf.addSectionHeader(eduTitle, primaryR, primaryG, primaryB);
  pdf.addJobHeader("MSc Data Science with Industry (Postgraduate Degree)", "University of Leicester", "2026 - 2028", "Leicester, United Kingdom");
  pdf.addBullet("Current Postgraduate Specialization: Advanced statistical modeling, scalable data architectures, machine learning algorithms, and UK industrial placement pathway.", 13, 96);
  pdf.addJobHeader("Bachelor of Technology (B.Tech) - Electronics & Communication", "Sreenidhi Institute of Science & Technology", "2018 - 2022", "Hyderabad, India");
  pdf.addBullet("Coursework in computational mathematics, linear algebra, signal processing, and algorithms; authored 2 published peer-reviewed research papers.", 13, 96);
  if (country !== "USA") {
    pdf.addJobHeader("Higher Secondary / Intermediate Education (MPC)", "Narayana Junior College", "2016 - 2018", "Hyderabad, India");
    pdf.addBullet("State Board Curriculum: Mathematics, Physics, and Chemistry; developed advanced analytical problem-solving and quantitative reasoning foundations.", 13, 96);
  }

  // Certifications
  pdf.addSectionHeader("Verified Professional Certifications", primaryR, primaryG, primaryB);
  for (const c of roleObj.certs.slice(0, country === "USA" ? 4 : 6)) {
    pdf.addBullet(c, 10, 98);
  }

  // Projects
  const projTitle = country === "USA" ? "Key Technical Projects" : "Empirical Projects & Case Studies";
  pdf.addSectionHeader(projTitle, primaryR, primaryG, primaryB);
  for (const p of roleObj.projects) {
    pdf.addJobHeader(p.title, p.tech, p.cat, p.metric);
    pdf.addBullet(p.bullet, 13, 96);
  }

  // Publications
  if (roleObj.includePubs && country !== "USA") {
    pdf.addSectionHeader("Peer-Reviewed Research Publications", primaryR, primaryG, primaryB);
    pdf.addJobHeader("IoT Based Electricity Energy Meter", "Int. Journal of Computer Science & Mobile Computing (IJCSMC)", "Published", "Author");
    pdf.addBullet("Designed hardware-software IoT telemetry system streaming real-time electrical energy consumption data with automated threshold alerting.", 13, 96);
    pdf.addJobHeader("Segmentation of Images using Automatic Fuzzy Clustering", "Int. Journal of Digital Electronics (IJDE)", "Published", "Author");
    pdf.addBullet("Developed unsupervised fuzzy clustering framework for adaptive digital image segmentation with superior noise resistance.", 13, 96);
  }

  return pdf.buildBuffer();
}

// MAIN EXECUTION: Generate all 12 combinations
const cvDir = path.join(__dirname, "..", "public", "cv");
fs.mkdirSync(cvDir, { recursive: true });

console.log("Generating all 12 Role × Country ATS Resumes...");
let generatedCount = 0;

for (const role of ROLES) {
  for (const country of COUNTRIES) {
    const filename = `Indra_Kiran_Sane_${role.filenameRole}_${country}.pdf`;
    const filePath = path.join(cvDir, filename);
    const pdfBuf = generateDocument(role, country);
    fs.writeFileSync(filePath, pdfBuf);
    console.log(`[${++generatedCount}/12] Generated: public/cv/${filename} (${pdfBuf.length} bytes)`);
  }
}

// Also keep the root aliases up-to-date
const publicDir = path.join(__dirname, "..", "public");
fs.copyFileSync(path.join(cvDir, "Indra_Kiran_Sane_Data_Analyst_UK.pdf"), path.join(publicDir, "Indra_Kiran_Sane_CV_UK.pdf"));
fs.copyFileSync(path.join(cvDir, "Indra_Kiran_Sane_Data_Analyst_USA.pdf"), path.join(publicDir, "Indra_Kiran_Sane_Resume_USA.pdf"));
fs.copyFileSync(path.join(cvDir, "Indra_Kiran_Sane_Software_Engineer_India.pdf"), path.join(publicDir, "Indra_Kiran_Sane_Resume_India.pdf"));
fs.copyFileSync(path.join(cvDir, "Indra_Kiran_Sane_Data_Analyst_UK.pdf"), path.join(publicDir, "resume.pdf"));
console.log("Synced root resume.pdf and legacy presets.");

