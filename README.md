# Indra Kiran Sane — Professional Data Science & Analytics Portfolio

> **Production-Ready Personal Portfolio** designed to position **Indra Kiran Sane** competitively for UK Data Analyst, Business Intelligence, Junior Data Scientist, and Software Engineering opportunities.

Built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4** following high-conversion product design principles inspired by **Linear**, **Vercel**, and **Stripe**.

---

## 🌟 Key Highlights & Design Decisions

- **Dark-First Aesthetic:** Near-black obsidian (`#09090b`), slate dark cards (`#111215`), subtle grid lines, and refined borders (`border-white/[0.08]`) with restrained emerald/cyan glowing accents.
- **The 30-Second Recruiter Conversion Funnel:** Immediate executive snapshot bar displaying verified commercial impact:
  - **20% SQL Response-Time Boost** via query refactoring at Capgemini
  - **2+ Years of Enterprise Software Engineering** (.NET Core Web API, Angular, MySQL)
  - **MSc in Data Science** candidate at University of Leicester, UK
  - **6 Verified Cloud & AI Credentials** (Microsoft AI-102, AI-900, PL-300, AWS Cloud Practitioner, Google Cloud ACE, NASSCOM Python)
- **Zero-Dependency Interactive Charts:** High-performance, accessible native SVG data visualizers (`InteractiveChartPreview`) embedded directly inside project cards and detailed case study pages.
- **Dedicated Deep-Dive Case Study Pages (`/projects/[slug]`):**
  1. `automobile-brands-eda`: Automobile Brands Exploratory Data Analysis (Python, Pandas, NumPy, Matplotlib, Seaborn)
  2. `sales-order-analysis`: Enterprise Sales Order & Revenue Intelligence (Excel, VBA, Pivot Tables, interactive dashboards)
  3. `ecommerce-database-optimization`: E-Commerce Relational Database & Query Optimization (SQL, MySQL, Stored Procedures, 93% latency reduction)
  4. `food-delivery-performance-bi`: Food Delivery Fleet & Fulfilment Performance Analysis (Tableau, SQL, CSAT drop-off curves)
  5. `medical-insurance-price-prediction`: Medical Insurance Cost Predictive Modeling (Scikit-learn, Random Forest with transparent R² = 87% validation notice)
- **Academic Research & Publications Section:** Documenting peer-reviewed papers in IoT Telemetry (*International Journal of Computer Science and Mobile Computing*) and Unsupervised Image Segmentation (*International Journal of Digital Electronics*).
- **Interactive Contact & Fast Actions:** Functional message form with direct email fallback, 1-click email copy widget, and direct CV download (`/resume.pdf`).

---

## 🛠️ Project Structure

```
myportfolio/
├── app/
│   ├── globals.css              # Dark-first theme tokens, custom grid backdrop & scrollbars
│   ├── layout.tsx               # Root layout, metadata, SEO configuration
│   ├── page.tsx                 # Unified homepage composing all portfolio sections
│   └── projects/[slug]/
│       └── page.tsx             # Statically prerendered individual case study pages
├── components/
│   ├── AboutMe.tsx              # Narrative covering software-to-data evolution & philosophies
│   ├── ContactSection.tsx       # Message form, contact details, email clipboard copy
│   ├── EducationCertifications.tsx # Leicester MSc, Sreenidhi B.Tech & 6 Cloud/AI credentials
│   ├── ExperienceTimeline.tsx   # Capgemini & Innomatics with quantified metrics
│   ├── Footer.tsx               # Footer with quick links & professional closing statement
│   ├── Hero.tsx                 # Value proposition, CTAs & animated systems graph
│   ├── Icons.tsx                # Pixel-perfect SVG brand and utility iconography
│   ├── InteractiveChartPreview.tsx # Interactive bar/scatter/line visual evidence component
│   ├── Navbar.tsx               # Sticky blurred navigation with UK status pill & CV CTA
│   ├── ProjectCard.tsx          # Individual project showcase card with live chart preview
│   ├── ProjectsSection.tsx      # Filterable project gallery by domain
│   ├── RecruiterSnapshot.tsx    # 30-second recruiter panel for instant conversion
│   └── ResearchSection.tsx      # Peer-reviewed academic research publications
├── data/
│   └── portfolioData.ts         # SINGLE SOURCE OF TRUTH for all profile, project & skill data
├── public/
│   └── resume.pdf               # Downloadable CV asset (ready for your official PDF)
├── package.json
└── tsconfig.json
```

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Validation
```bash
npm run build
npm run start
```

---

## 📝 How to Update Your Information (Single Source of Truth)

All your data is cleanly separated from UI code in [`data/portfolioData.ts`](data/portfolioData.ts).

### 1. Updating Contact Details & Social Links
Open `data/portfolioData.ts` and modify the `personal` object:
```ts
personal: {
  name: "Indra Kiran Sane",
  email: "your.official.email@gmail.com",    // Update to your active email
  linkedIn: "https://www.linkedin.com/in/...", // Your official LinkedIn URL
  github: "https://github.com/...",           // Your official GitHub URL
  location: "Leicester, United Kingdom",
  ukWorkStatus: "Eligible to work in the UK • Graduate Route Eligible",
}
```

### 2. Updating Your Official Resume PDF
Simply copy your latest PDF file to:
```
public/resume.pdf
```
Both the **Download Resume** buttons in the Hero, Navbar, Recruiter Snapshot, Case Study pages, and Footer automatically link to this file.

### 3. Adding or Updating Projects
Add a new object to the `projects` array in `data/portfolioData.ts`. A dedicated deep-dive page (`/projects/[your-slug]`) will be automatically generated with interactive charts, schema breakdowns, and findings.

---

## 🌐 Deploying to Vercel (Recommended)

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial release of professional data science & software portfolio"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **Deploy**. Vercel will build and host your portfolio on a high-speed global CDN with free SSL.
