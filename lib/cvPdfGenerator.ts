/**
 * Dynamic ATS-Optimised PDF 1.4 Vector Builder
 * Supports:
 * - 4 Professional Roles: Data Analyst, Data Scientist, AI/ML Engineer, Software Engineer
 * - 3 Country Formats: UK (CV), USA (Resume), India (Resume)
 * - Customization: Edited summary, selected skills, selected projects, edited experience bullets
 * Output: Pure ATS-friendly PDF Buffer / Uint8Array (no external binaries, 100% vector text)
 */

import { ProfessionalRole, CountryFormat, ROLES_CONFIG, RoleConfig } from "@/data/rolesData";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { CERTIFICATES_DATA } from "@/data/certificates";
import { EDUCATION_DATA } from "@/data/education";

export interface CustomCvPayload {
  role: ProfessionalRole;
  country: CountryFormat;
  headline?: string;
  summary?: string;
  selectedSkillCategories?: {
    category: string;
    skills: string[];
  }[];
  selectedProjectSlugs?: string[];
  experienceBullets?: {
    company: string;
    bullets: string[];
  }[];
  includePublications?: boolean;
}

class SimplePDFBuilder {
  width: number;
  height: number;
  pages: string[];
  currentPageCommands: string[];
  y: number;
  marginLeft: number;
  marginRight: number;
  contentWidth: number;

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

  drawLine(x1: number, y1: number, x2: number, y2: number, width = 0.6, r = 0.8, g = 0.8, b = 0.8) {
    const cmd = `${width.toFixed(2)} w ${r.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} RG ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`;
    this.currentPageCommands.push(cmd);
  }

  escapeText(text: string): string {
    return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }

  addText(x: number, y: number, text: string, font = "/F1", size = 9, r = 0.1, g = 0.1, b = 0.1) {
    const cleanText = this.escapeText(text);
    const cmd = `BT ${font} ${size.toFixed(2)} Tf ${r.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${cleanText}) Tj ET`;
    this.currentPageCommands.push(cmd);
  }

  wrapText(text: string, maxChars = 96): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let cur: string[] = [];
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

  addSectionHeader(title: string, r = 0.04, g = 0.38, b = 0.28) {
    this.checkPageBreak(32);
    this.y -= 13;
    this.addText(this.marginLeft, this.y, title.toUpperCase(), "/F2", 10, r, g, b);
    this.y -= 3.5;
    this.drawLine(this.marginLeft, this.y, this.marginRight, this.y, 0.75, r + 0.1, g + 0.15, b + 0.15);
    this.y -= 9;
  }

  addJobHeader(leftMain: string, leftSub: string, period: string, location = "") {
    this.checkPageBreak(22);
    const leftText = leftSub ? `${leftMain}  |  ${leftSub}` : leftMain;
    this.addText(this.marginLeft, this.y, leftText, "/F2", 9.2, 0.08, 0.12, 0.18);
    const rightStr = location ? `${period}  (${location})` : period;
    const rightX = this.marginRight - rightStr.length * 4.9;
    this.addText(rightX, this.y, rightStr, "/F3", 8.2, 0.35, 0.40, 0.45);
    this.y -= 11.5;
  }

  addBullet(text: string, indent = 13, maxChars = 96, bulletChar = "-") {
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

  buildBuffer(): Buffer {
    if (this.currentPageCommands.length > 0) {
      this.pages.push(this.currentPageCommands.join("\n"));
      this.currentPageCommands = [];
    }

    const totalPages = this.pages.length;
    const objects: { id: number; data: Buffer }[] = [];

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
    const chunks: Buffer[] = [];
    const offsets: Record<number, number> = { 0: 0 };
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

/**
 * Main Dynamic CV PDF Generator
 */
export function generateCvPdf(payload: CustomCvPayload): Buffer {
  const { role, country } = payload;
  const roleConfig = ROLES_CONFIG[role] || ROLES_CONFIG["data-analyst"];
  const pdf = new SimplePDFBuilder();

  // Color scheme by country / role
  const primaryR = country === "UK" ? 0.05 : country === "USA" ? 0.08 : 0.08;
  const primaryG = country === "UK" ? 0.42 : country === "USA" ? 0.35 : 0.45;
  const primaryB = country === "UK" ? 0.32 : country === "USA" ? 0.60 : 0.65;

  // 1. Header: Name & Title
  pdf.y = 808;
  pdf.addText(pdf.marginLeft, pdf.y, "INDRA KIRAN SANE", "/F2", 18, 0.06, 0.10, 0.16);
  pdf.y -= 14;

  const headline = payload.headline || roleConfig.headline;
  pdf.addText(pdf.marginLeft, pdf.y, headline, "/F2", 9.8, primaryR, primaryG, primaryB);
  pdf.y -= 12.5;

  // 2. Contact Strip (Country-Specific Conventions)
  if (country === "UK") {
    const contactLine1 = "Location: Leicester, United Kingdom  |  Email: saneindradev2790@gmail.com  |  Phone: +44 07344738617";
    pdf.addText(pdf.marginLeft, pdf.y, contactLine1, "/F1", 8, 0.30, 0.35, 0.40);
    pdf.y -= 9.5;
    const contactLine2 = "LinkedIn: linkedin.com/in/indrakiran-sane  |  GitHub: github.com/SANEINDRA2790  |  Status: Open to UK Roles";
    pdf.addText(pdf.marginLeft, pdf.y, contactLine2, "/F1", 8, 0.30, 0.35, 0.40);
  } else if (country === "USA") {
    const contactLine1 = "Email: saneindradev2790@gmail.com  |  Phone: +44 07344738617  |  Location: Leicester, UK";
    pdf.addText(pdf.marginLeft, pdf.y, contactLine1, "/F1", 8, 0.30, 0.35, 0.40);
    pdf.y -= 9.5;
    const contactLine2 = "LinkedIn: linkedin.com/in/indrakiran-sane  |  GitHub: github.com/SANEINDRA2790  |  Portfolio: Live Case Studies";
    pdf.addText(pdf.marginLeft, pdf.y, contactLine2, "/F1", 8, 0.30, 0.35, 0.40);
  } else {
    // India
    const contactLine1 = "Email: saneindradev2790@gmail.com  |  Phone: +44 07344738617 / +91 Contact  |  Location: Leicester, UK / Hyderabad, IN";
    pdf.addText(pdf.marginLeft, pdf.y, contactLine1, "/F1", 8, 0.30, 0.35, 0.40);
    pdf.y -= 9.5;
    const contactLine2 = "LinkedIn: linkedin.com/in/indrakiran-sane  |  GitHub: github.com/SANEINDRA2790  |  Portfolio: Verified Case Studies";
    pdf.addText(pdf.marginLeft, pdf.y, contactLine2, "/F1", 8, 0.30, 0.35, 0.40);
  }

  pdf.y -= 3.5;
  pdf.drawLine(pdf.marginLeft, pdf.y, pdf.marginRight, pdf.y, 0.9, primaryR, primaryG, primaryB);
  pdf.y -= 7.5;

  // 3. Professional Profile / Summary
  const summaryHeader = country === "UK" ? "Professional Profile" : country === "USA" ? "Executive Summary" : "Career Objective & Summary";
  pdf.addSectionHeader(summaryHeader, primaryR, primaryG, primaryB);

  const summaryText = payload.summary || roleConfig.roleSummary[country];
  for (const line of pdf.wrapText(summaryText, 98)) {
    pdf.addText(pdf.marginLeft, pdf.y, line, "/F1", 8.2, 0.15, 0.18, 0.22);
    pdf.y -= 11;
  }

  // 4. Technical Skills
  const skillsHeader = country === "USA" ? "Core Technical Competencies" : "Technical Skills Matrix";
  pdf.addSectionHeader(skillsHeader, primaryR, primaryG, primaryB);

  const skillCats = payload.selectedSkillCategories || roleConfig.prioritizedSkills;
  for (const cat of skillCats) {
    if (cat.skills.length === 0) continue;
    pdf.checkPageBreak(13);
    pdf.addText(pdf.marginLeft, pdf.y, `${cat.category}:`, "/F2", 8.3, 0.08, 0.12, 0.18);
    const skillsListStr = cat.skills.join(", ");
    const lines = pdf.wrapText(skillsListStr, 76);
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

  // 5. Professional Experience (Reverse-Chronological)
  pdf.addSectionHeader("Professional Experience", primaryR, primaryG, primaryB);

  const expBullets = payload.experienceBullets || roleConfig.prioritizedExperienceBullets;
  const capgeminiBullets = expBullets.find((e) => e.company.toLowerCase().includes("capgemini"))?.bullets || [
    "Engineered full-stack enterprise web applications utilizing .NET Core Web API, Angular, and MySQL within Agile production environments.",
    "Refactored mission-critical SQL queries and stored procedures, achieving a documented 20% reduction in database execution times.",
    "Collaborated with cloud engineering teams on Azure deployment pipelines, environment configuration, and backend API monitoring.",
    "Conducted data cleansing and exploratory data reporting to support operational decision-making across enterprise modules.",
  ];

  const innomaticsBullets = expBullets.find((e) => e.company.toLowerCase().includes("innomatics"))?.bullets || [
    "Processed and analyzed large tabular datasets utilizing Python (Pandas, NumPy) to isolate business trends and data anomalies.",
    "Designed and maintained interactive executive dashboards in Tableau and Power BI, translating raw transactional logs into KPI monitors.",
    "Automated weekly reporting pipelines using SQL queries, Excel formulas, and VBA macro routines, eliminating 14 hours of manual copy-paste overhead per week.",
    "Implemented supervised machine learning workflows including feature selection, data normalization, and baseline predictive regression models.",
  ];

  // Role 1: Capgemini
  pdf.addJobHeader("Senior Analyst (Software Engineer)", "Capgemini", "October 2023 - 2024", "Enterprise Solutions Unit");
  for (const b of capgeminiBullets) {
    pdf.addBullet(b, 13, 96);
  }

  // Role 2: Innomatics
  pdf.addJobHeader("Junior Data Analyst Trainee", "Innomatics Research Labs", "December 2022 - August 2023", "Data Science Division");
  for (const b of innomaticsBullets) {
    pdf.addBullet(b, 13, 96);
  }

  // 6. Education
  pdf.addSectionHeader(country === "UK" ? "Academic Qualifications" : "Education & Academic Background", primaryR, primaryG, primaryB);

  pdf.addJobHeader("MSc Data Science with Industry (Postgraduate Degree)", "University of Leicester", "2026 - 2028", "Leicester, United Kingdom");
  pdf.addBullet("Current Postgraduate Specialization: Advanced statistical modeling, scalable data architectures, machine learning algorithms, and UK industrial placement pathway.", 13, 96);

  pdf.addJobHeader("Bachelor of Technology (B.Tech) - Electronics & Communication", "Sreenidhi Institute of Science & Technology", "2018 - 2022", "Hyderabad, India");
  pdf.addBullet("Coursework in computational mathematics, linear algebra, signal processing, and algorithms; authored 2 published peer-reviewed research papers.", 13, 96);

  if (country !== "USA") {
    pdf.addJobHeader("Higher Secondary / Intermediate Education (MPC)", "Narayana Junior College", "2016 - 2018", "Hyderabad, India");
    pdf.addBullet("State Board Curriculum: Mathematics, Physics, and Chemistry; developed advanced analytical problem-solving and quantitative reasoning foundations.", 13, 96);
  }

  // 7. Verified Professional Certifications
  pdf.addSectionHeader("Verified Professional Certifications", primaryR, primaryG, primaryB);

  const certItems = [
    "Microsoft Certified: Azure AI Engineer Associate (AI-102) - Cognitive Services & Azure OpenAI",
    "Microsoft Certified: Azure AI Fundamentals (AI-900) - Machine Learning Workloads & Principles",
    "Microsoft Certified: Power BI Data Analyst Associate (PL-300) - Business Intelligence & DAX",
    "AWS Certified Cloud Practitioner (CLF-C02) - Cloud Architecture, Compute, Storage & Security",
    "Google Cloud Associate Cloud Engineer (ACE) - Enterprise Cloud Infrastructure Deployment",
    "NASSCOM Certification: Python Fundamentals and Programming - Data Wrangling & Algorithmic Design",
  ];

  // Prioritize certs by role
  const sortedCerts = [...certItems].sort((a, b) => {
    const aPriority = roleConfig.prioritizedCertifications.some((c) => a.includes(c));
    const bPriority = roleConfig.prioritizedCertifications.some((c) => b.includes(c));
    if (aPriority && !bPriority) return -1;
    if (!aPriority && bPriority) return 1;
    return 0;
  });

  for (const c of sortedCerts.slice(0, country === "USA" ? 4 : 6)) {
    pdf.addBullet(c, 10, 98);
  }

  // 8. Key Projects (Select prioritized projects)
  pdf.addSectionHeader(country === "USA" ? "Key Technical Projects" : "Empirical Projects & Case Studies", primaryR, primaryG, primaryB);

  const selectedSlugs = payload.selectedProjectSlugs || roleConfig.prioritizedProjects.slice(0, 3);
  const matchedProjects = selectedSlugs
    .map((slug) => PORTFOLIO_DATA.projects.find((p) => p.slug === slug))
    .filter(Boolean) as Project[];

  for (const proj of matchedProjects) {
    const metricsStr = proj.metrics.map((m) => `${m.label}: ${m.value}`).join(" | ");
    pdf.addJobHeader(proj.title, proj.technologies.slice(0, 3).join(", "), proj.category, metricsStr);
    const outcomeText = proj.keyFindings[0] || proj.problemStatement;
    pdf.addBullet(outcomeText, 13, 96);
  }

  // 9. Peer-Reviewed Publications (if relevant or requested)
  const shouldIncludePubs = payload.includePublications !== undefined ? payload.includePublications : roleConfig.publicationsRelevant;
  if (shouldIncludePubs && country !== "USA") {
    pdf.addSectionHeader("Peer-Reviewed Research Publications", primaryR, primaryG, primaryB);
    pdf.addJobHeader("IoT Based Electricity Energy Meter", "Int. Journal of Computer Science & Mobile Computing (IJCSMC)", "Published", "Author");
    pdf.addBullet("Designed hardware-software IoT telemetry system streaming real-time electrical energy consumption data with automated threshold alerting.", 13, 96);
    pdf.addJobHeader("Segmentation of Images using Automatic Fuzzy Clustering", "Int. Journal of Digital Electronics (IJDE)", "Published", "Author");
    pdf.addBullet("Developed unsupervised fuzzy clustering framework for adaptive digital image segmentation with superior noise resistance.", 13, 96);
  }

  return pdf.buildBuffer();
}

/**
 * Standard filename generator:
 * Indra_Kiran_Sane_[Role]_[Country].pdf
 */
export function getCvFileName(role: ProfessionalRole, country: CountryFormat): string {
  const roleMap: Record<ProfessionalRole, string> = {
    "data-analyst": "Data_Analyst",
    "data-scientist": "Data_Scientist",
    "ai-ml-engineer": "AI_ML_Engineer",
    "software-engineer": "Software_Engineer",
  };
  const roleStr = roleMap[role] || "Professional";
  return `Indra_Kiran_Sane_${roleStr}_${country}.pdf`;
}
