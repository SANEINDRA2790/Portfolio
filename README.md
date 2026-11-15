# Indra Kiran Sane — Professional Data Science & Analytics Portfolio

> **Production-Ready Personal Portfolio Website** positioned for UK Technology, Data Analytics, Business Intelligence, Junior Data Scientist, and Software Engineering opportunities.

Built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4** following minimal, high-conversion design principles inspired by **Linear**, **Vercel**, and **Stripe**.

---

## 🌟 Key Highlights & Updated Features

### 1. Verified Contact Information
- **Full Name:** Indra Kiran Sane
- **Professional Email:** [`saneindradev2790@gmail.com`](mailto:saneindradev2790@gmail.com) *(Clicking opens visitor's default email client via `mailto`)*
- **UK Contact Number:** [`+44 07344738617`](tel:+4407344738617) *(Clicking initiates phone call via `tel`)*
- **Location:** Leicester, United Kingdom
- **Work Authorization:** Based in Leicester, UK • Open to UK Data & Software Roles

### 2. Verified Academic Timeline
- **Master's Degree (Current):**
  - **MSc Data Science with Industry** — University of Leicester, United Kingdom (2026 – 2028)
  - Features visually distinct priority treatment (emerald border, pulse indicator, and "Current Postgraduate Qualification" badge).
- **Bachelor's Degree:**
  - **B.Tech in Electronics and Communication Engineering** — Sreenidhi Institute of Science and Technology, Hyderabad, India (08 August 2018 – 22 June 2022).
- **Intermediate / Higher Secondary Education:**
  - **MPC (Mathematics, Physics and Chemistry)** — Narayana Junior College, Hyderabad, India (2016 – 2018).

### 3. Verified Project Links & Interactive Tableau Public Embed
- **Tableau Public Project:** `Food Delivery Analysis — Tableau`
  - **Live URL:** [Tableau Public Dashboard](https://public.tableau.com/app/profile/sane.indra.kiran/viz/TABLEAU_ZOMATO_ANALYSIS_PROJECTedit/DELIVERY_ANALYSIS_analysis)
  - Features prominent **"View Live Dashboard"** buttons across project cards and case study pages.
  - Interactive, responsive **Tableau Public iframe embed** integrated directly into [`/projects/food-delivery-performance-bi`](/projects/food-delivery-performance-bi).
  - Extensible architecture in `Project` interface for adding more verified project links anytime.

### 4. Interactive Certificate Verification Gallery (`#certifications`)
- Features all 6 official credentials:
  1. Microsoft AI-102 — Azure AI Engineer Associate
  2. Microsoft AI-900 — Azure AI Fundamentals
  3. Microsoft PL-300 — Power BI Data Analyst Associate
  4. AWS Certified Cloud Practitioner
  5. Google Cloud Associate Cloud Engineer (ACE)
  6. Python Fundamentals and Programming — NASSCOM
- **Interactive Modal (`components/CertificateModal.tsx`):**
  - Clicking any card opens a preview modal.
  - Supports embedded PDF/image viewing, full-size open, and 1-click downloading.
  - Displays a clean, honest **"Certificate Pending Upload"** state when the document is not yet placed in `public/certificates/`.

### 5. Dedicated Document Library (`/documents`)
- Accessible via the dedicated **"More Documents"** button in the main navigation and homepage action rows.
- Completely separate from the **Download CV** button.
- Categorized repository:
  - *Academic Documents*
  - *Professional Certifications*
  - *Research & Publications*
  - *Project Documentation*
  - *Additional Professional Documents*
- Real-time search filter and category tabs.
- Document preview modal, download buttons, and verified external resource links.

---

## 📁 Structured Project Architecture

```
myportfolio/
├── app/
│   ├── documents/
│   │   └── page.tsx             # Dedicated Document Repository (/documents)
│   ├── projects/[slug]/
│   │   └── page.tsx             # Case study pages with Tableau Public embed & metrics
│   ├── globals.src.css          # Raw Tailwind source styles & CSS variables
│   ├── globals.css              # Auto-compiled production stylesheet
│   ├── layout.tsx               # Root layout, OpenGraph, and JSON-LD schema
│   ├── not-found.tsx            # Custom obsidian 404 page
│   └── page.tsx                 # Homepage composing all sections
├── components/
│   ├── CertificateModal.tsx     # Fullscreen certificate preview & pending upload modal
│   ├── EducationCertifications.tsx # 3-tier education timeline & clickable cert gallery
│   ├── TableauEmbed.tsx         # Responsive Tableau Public live embed & external launch
│   ├── Navbar.tsx               # Navigation with "More Documents" & theme toggle
│   ├── Hero.tsx                 # Hero with primary/secondary actions & contact info
│   ├── ContactSection.tsx       # Contact form, mailto, tel link, and clipboard widgets
│   ├── RecruiterSnapshot.tsx    # 30-second recruiter executive summary
│   ├── ProjectsSection.tsx      # Filterable project showcase
│   ├── ProjectCard.tsx          # Card with live dashboard button & chart preview
│   └── Footer.tsx               # Footer with contact links & document repository
├── data/
│   ├── certificates.ts          # Structured metadata for the 6 credentials
│   ├── documents.ts             # Document library items & categories
│   ├── education.ts             # University of Leicester, Sreenidhi, & Narayana records
│   └── portfolioData.ts         # Central exports and backwards-compatible data store
├── public/
│   ├── certificates/            # Drop your certificate PDFs/images here
│   ├── documents/               # Drop additional transcripts, reports, and papers here
│   └── resume.pdf               # Downloadable CV asset
├── scripts/
│   └── build-css.js             # Automated Tailwind CSS v4 compiler pipeline
└── package.json
```

---

## 🛠️ How to Add Documents, Certificates & Links

### 1. Uploading a Certificate File
1. Place your certificate PDF into:
   ```
   public/certificates/ai-102.pdf
   ```
   *(or `ai-900.pdf`, `pl-300.pdf`, etc.)*
2. In `data/certificates.ts`, set `isUploaded: true` for that certificate:
   ```ts
   {
     id: "ai-102",
     isUploaded: true,
     filePath: "/certificates/ai-102.pdf",
     ...
   }
   ```
3. The certificate modal will instantly render the live document viewer and enable downloads!

### 2. Adding Future Project Verification Links
In `data/portfolioData.ts`, add `liveDashboardUrl` or `verifiedPlatform` to any project object:
```ts
{
  slug: "automobile-brands-eda",
  liveDashboardUrl: "https://github.com/...", // Or Streamlit / Tableau / Power BI URL
  verifiedPlatform: "GitHub Repository",
  ...
}
```
The project card and case study page will automatically display prominent **"View Live Dashboard"** buttons.

### 3. Adding Documents to the Document Library
In `data/documents.ts`, add an item to `DOCUMENTS_DATA`:
```ts
{
  id: "doc-sample",
  name: "Master's Academic Transcript (Semester 1)",
  category: "Academic Documents",
  type: "PDF",
  description: "Official transcript issued by the University of Leicester.",
  filePath: "/documents/msc-transcript-sem1.pdf",
  isAvailable: true, // Set to true when PDF is placed in public/documents/
}
```

---

## 🔒 Google Drive Integration (Security Architecture)

To connect documents from Google Drive safely:

### Approach A: Explicitly Shared Google Drive Links (Recommended & Zero Setup)
1. In Google Drive, right-click the specific document > **Share** > **Anyone with the link can view**.
2. Copy the share URL (e.g. `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`).
3. In `data/documents.ts`, paste this URL into `externalUrl`:
   ```ts
   {
     id: "doc-drive-example",
     name: "Technical Architecture Report",
     category: "Project Documentation",
     type: "External Link",
     externalUrl: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing",
     isAvailable: true,
   }
   ```
   **Security Benefit:** Only the single selected file is shared. Your private drive, personal files, and other folders remain completely private and inaccessible.

### Approach B: Google Drive API via Service Account (Advanced Backend Sync)
If you want to sync an entire designated folder automatically without manual links:
1. Create a Google Cloud Project at [console.cloud.google.com](https://console.cloud.google.com).
2. Enable the **Google Drive API**.
3. Create a **Service Account** and download its JSON key file.
4. Create a dedicated folder in Google Drive (e.g. `Portfolio-Public-Docs`) and share it with the service account's email (`...iam.gserviceaccount.com`).
5. Store the Service Account credentials on the **server-side** in `.env.local` (never in client-side code):
   ```env
   GOOGLE_SERVICE_ACCOUNT_EMAIL=...
   GOOGLE_PRIVATE_KEY="..."
   GOOGLE_DRIVE_FOLDER_ID=...
   ```
6. A Next.js API route (e.g. `/api/documents/sync`) fetches the file list server-side and serves it to the frontend.
**Never expose your Google account password or personal OAuth refresh tokens in frontend code.**

---

## 🚀 Running and Deploying

### Test Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3000/documents](http://localhost:3000/documents).

### Production Build Validation
```bash
npm run build
```
*(Verified: compiles statically with 11 prerendered pages and zero errors).*

### Deploy to GitHub & Vercel
```bash
git add .
git commit -m "feat: updated contact info, education timeline, clickable cert gallery, and document library"
git push origin main
```
Vercel automatically detects the Next.js updates and deploys the new pages globally with free SSL!
