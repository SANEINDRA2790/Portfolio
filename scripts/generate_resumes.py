#!/usr/bin/env python3
"""
Generate Professional, ATS-Optimised PDF Resumes for Indra Kiran Sane:
1. UK Standard Curriculum Vitae (Indra_Kiran_Sane_CV_UK.pdf)
2. India / International Technical Resume (Indra_Kiran_Sane_Resume_India.pdf)
3. Default download fallback (resume.pdf)
"""

import os
import sys

class SimplePDFBuilder:
    def __init__(self, page_width=595.28, page_height=841.89):
        self.width = page_width
        self.height = page_height
        self.pages = []
        self.current_page_commands = []
        self.y = self.height - 40
        self.margin_left = 40
        self.margin_right = self.width - 40
        self.content_width = self.margin_right - self.margin_left

    def new_page(self):
        if self.current_page_commands:
            self.pages.append("\n".join(self.current_page_commands))
            self.current_page_commands = []
        self.y = self.height - 40

    def draw_line(self, x1, y1, x2, y2, width=0.6, r=0.8, g=0.8, b=0.8):
        cmd = f"{width:.2f} w {r:.2f} {g:.2f} {b:.2f} RG {x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S"
        self.current_page_commands.append(cmd)

    def draw_rect(self, x, y, w, h, r=0.95, g=0.95, b=0.95):
        cmd = f"{r:.2f} {g:.2f} {b:.2f} rg {x:.2f} {y:.2f} {w:.2f} {h:.2f} re f"
        self.current_page_commands.append(cmd)

    def escape_text(self, text):
        return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")

    def add_text(self, x, y, text, font="/F1", size=9, r=0.1, g=0.1, b=0.1):
        clean_text = self.escape_text(text)
        cmd = f"BT {font} {size:.2f} Tf {r:.2f} {g:.2f} {b:.2f} rg {x:.2f} {y:.2f} Td ({clean_text}) Tj ET"
        self.current_page_commands.append(cmd)

    def wrap_text(self, text, max_chars=95):
        words = text.split(" ")
        lines = []
        cur = []
        cur_len = 0
        for w in words:
            if cur_len + len(w) + (1 if cur else 0) <= max_chars:
                cur.append(w)
                cur_len += len(w) + (1 if cur else 0)
            else:
                if cur:
                    lines.append(" ".join(cur))
                cur = [w]
                cur_len = len(w)
        if cur:
            lines.append(" ".join(cur))
        return lines

    def check_page_break(self, needed_space=40):
        if self.y - needed_space < 40:
            self.new_page()

    def add_section_header(self, title):
        self.check_page_break(35)
        self.y -= 14
        self.add_text(self.margin_left, self.y, title.upper(), font="/F2", size=10.5, r=0.04, g=0.38, b=0.28)
        self.y -= 4
        self.draw_line(self.margin_left, self.y, self.margin_right, self.y, width=0.8, r=0.15, g=0.55, b=0.42)
        self.y -= 10

    def add_job_header(self, role, company, period, location=""):
        self.check_page_break(25)
        # Role & Company on left
        self.add_text(self.margin_left, self.y, f"{role}  |  {company}", font="/F2", size=9.5, r=0.08, g=0.12, b=0.18)
        # Period & Location on right (align approx)
        right_str = f"{period}  ({location})" if location else period
        # Approx width calculation for right align: 5.5 pts per char at 8.5 pt font
        right_x = self.margin_right - (len(right_str) * 5.0)
        self.add_text(right_x, self.y, right_str, font="/F3", size=8.5, r=0.35, g=0.40, b=0.45)
        self.y -= 12

    def add_bullet(self, text, indent=14, max_chars=95, bullet_char="-"):
        lines = self.wrap_text(text, max_chars)
        self.check_page_break(len(lines) * 11 + 6)
        for i, line in enumerate(lines):
            if i == 0:
                self.add_text(self.margin_left + 2, self.y, bullet_char, font="/F2", size=8.5, r=0.15, g=0.55, b=0.42)
                self.add_text(self.margin_left + indent, self.y, line, font="/F1", size=8.5, r=0.15, g=0.18, b=0.22)
            else:
                self.add_text(self.margin_left + indent, self.y, line, font="/F1", size=8.5, r=0.15, g=0.18, b=0.22)
            self.y -= 11
        self.y -= 2

    def build_pdf(self, output_path):
        if self.current_page_commands:
            self.pages.append("\n".join(self.current_page_commands))
            self.current_page_commands = []

        total_pages = len(self.pages)
        objects = []
        
        # Object 1: Catalog
        # Object 2: Pages list
        # Object 3..3+total_pages-1: Page objects
        # Object ...: Content streams
        # Fonts: F1 (Helvetica), F2 (Helvetica-Bold), F3 (Helvetica-Oblique)
        
        f1_idx = 3 + total_pages * 2
        f2_idx = f1_idx + 1
        f3_idx = f2_idx + 1
        
        # Font objects
        font_f1 = f"{f1_idx} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"
        font_f2 = f"{f2_idx} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n"
        font_f3 = f"{f3_idx} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj\n"
        
        page_kids = " ".join([f"{3 + i} 0 R" for i in range(total_pages)])
        obj_pages = f"2 0 obj\n<< /Type /Pages /Kids [{page_kids}] /Count {total_pages} >>\nendobj\n"
        obj_catalog = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
        
        objects.append((1, obj_catalog))
        objects.append((2, obj_pages))
        
        # Page & Content objects
        content_start_idx = 3 + total_pages
        for i in range(total_pages):
            page_obj_idx = 3 + i
            content_obj_idx = content_start_idx + i
            p_obj = (
                f"{page_obj_idx} 0 obj\n"
                f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {self.width:.2f} {self.height:.2f}] "
                f"/Contents {content_obj_idx} 0 R "
                f"/Resources << /Font << /F1 {f1_idx} 0 R /F2 {f2_idx} 0 R /F3 {f3_idx} 0 R >> >> >>\n"
                f"endobj\n"
            )
            objects.append((page_obj_idx, p_obj))
            
            # Content stream
            stream_content = self.pages[i].encode("latin-1", errors="replace")
            c_obj = (
                f"{content_obj_idx} 0 obj\n"
                f"<< /Length {len(stream_content)} >>\n"
                f"stream\n"
            ).encode("ascii") + stream_content + b"\nendstream\nendobj\n"
            objects.append((content_obj_idx, c_obj))
            
        objects.append((f1_idx, font_f1))
        objects.append((f2_idx, font_f2))
        objects.append((f3_idx, font_f3))
        
        # Sort by object ID
        objects.sort(key=lambda x: x[0])
        
        # Write PDF binary
        header = b"%PDF-1.4\n"
        body = b""
        offsets = {0: 0}
        
        for obj_id, obj_data in objects:
            offsets[obj_id] = len(header) + len(body)
            if isinstance(obj_data, str):
                body += obj_data.encode("latin-1", errors="replace")
            else:
                body += obj_data
                
        xref_offset = len(header) + len(body)
        max_obj_id = max(offsets.keys())
        xref = f"xref\n0 {max_obj_id + 1}\n0000000000 65535 f \n"
        for i in range(1, max_obj_id + 1):
            off = offsets.get(i, 0)
            xref += f"{off:010d} 00000 n \n"
            
        trailer = (
            f"trailer\n"
            f"<< /Size {max_obj_id + 1} /Root 1 0 R >>\n"
            f"startxref\n{xref_offset}\n%%EOF\n"
        )
        
        os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(header + body + xref.encode("ascii") + trailer.encode("ascii"))
        print(f"Successfully generated ATS PDF ({total_pages} pages): {output_path} ({os.path.getsize(output_path)} bytes)")


def generate_uk_cv(output_path):
    pdf = SimplePDFBuilder()
    
    # Header: Name & Title
    pdf.y = 805
    pdf.add_text(pdf.margin_left, pdf.y, "INDRA KIRAN SANE", font="/F2", size=18, r=0.06, g=0.10, b=0.16)
    pdf.y -= 14
    pdf.add_text(pdf.margin_left, pdf.y, "Data Analyst  |  Aspiring Data Scientist  |  Software Engineer", font="/F2", size=10, r=0.08, g=0.50, b=0.38)
    pdf.y -= 13
    
    # Contact Strip (UK Specific: Leicester location, +44 phone, UK right to work)
    contact_left = "Location: Leicester, United Kingdom  |  Email: saneindradev2790@gmail.com  |  Phone: +44 07344738617"
    pdf.add_text(pdf.margin_left, pdf.y, contact_left, font="/F1", size=8, r=0.30, g=0.35, b=0.40)
    pdf.y -= 10
    contact_right = "LinkedIn: linkedin.com/in/indrakiran-sane  |  GitHub: github.com/SANEINDRA2790  |  Status: Open to UK Roles"
    pdf.add_text(pdf.margin_left, pdf.y, contact_right, font="/F1", size=8, r=0.30, g=0.35, b=0.40)
    pdf.y -= 4
    pdf.draw_line(pdf.margin_left, pdf.y, pdf.margin_right, pdf.y, width=1.0, r=0.08, g=0.50, b=0.38)
    pdf.y -= 8

    # Professional Summary (UK Standard)
    pdf.add_section_header("Professional Profile")
    summary = (
        "Commercially grounded Data Analyst and Software Engineer with 2+ years of enterprise production experience "
        "at Capgemini, currently pursuing an MSc in Data Science with Industry at the University of Leicester (2026-2028). "
        "Demonstrated track record of achieving a documented 20% database execution latency reduction across high-throughput "
        "transactional systems through SQL query tuning and stored procedure optimization. Experienced in developing full-stack "
        "enterprise applications (.NET Core Web API, Angular, MySQL), creating decision-driven executive business intelligence "
        "dashboards in Tableau and Power BI, and executing statistical exploratory data analysis in Python. Committed to delivering "
        "scalable, reproducible data solutions that translate complex transactional datasets into commercial business decisions."
    )
    for line in pdf.wrap_text(summary, 98):
        pdf.add_text(pdf.margin_left, pdf.y, line, font="/F1", size=8.5, r=0.15, g=0.18, b=0.22)
        pdf.y -= 11.5

    # Core Competencies (6 Categories)
    pdf.add_section_header("Technical Competencies & Skills")
    skills = [
        ("Data Analytics & EDA:", "Python (Pandas, NumPy), Exploratory Data Analysis, Statistical Analysis, Data Wrangling, Imputation, Hypothesis Testing"),
        ("Databases & Query Tuning:", "MySQL, SQL Stored Procedures, Composite B-Tree Indexing, Query Optimization, 3NF Relational Architecture, EXPLAIN Analysis"),
        ("Business Intelligence:", "Power BI, Tableau (Tableau Public), Excel (Power Pivot, Dynamic DAX, Slicers), KPI Dashboards, Reporting Automation"),
        ("Software Engineering:", "C#, .NET Core Web API, Angular, RESTful API Architecture, Object-Oriented Design, Agile/Scrum Sprints"),
        ("Machine Learning (Applied):", "Scikit-learn, Predictive Regression Modeling, Model Evaluation (R2, RMSE, Cross-Validation), Feature Scaling"),
        ("Cloud & Infrastructure:", "Microsoft Azure (AI-102, AI-900, PL-300), AWS Cloud Fundamentals (CLF-C02), Google Cloud ACE, Git Version Control"),
    ]
    for label, val in skills:
        pdf.check_page_break(14)
        pdf.add_text(pdf.margin_left, pdf.y, label, font="/F2", size=8.5, r=0.08, g=0.12, b=0.18)
        pdf.add_text(pdf.margin_left + 140, pdf.y, val, font="/F1", size=8.2, r=0.20, g=0.24, b=0.28)
        pdf.y -= 11.5

    # Professional Experience
    pdf.add_section_header("Professional Experience")
    
    # Role 1: Capgemini
    pdf.add_job_header("Senior Analyst (Software Engineer)", "Capgemini", "October 2023 - 2024", "Enterprise Solutions Unit")
    pdf.add_bullet("Engineered and deployed full-stack enterprise web applications using .NET Core Web API, Angular, and MySQL within Agile production sprints.", max_chars=96)
    pdf.add_bullet("Refactored high-concurrency SQL queries and transactional stored procedures, achieving a documented 20% reduction in database execution times.", max_chars=96)
    pdf.add_bullet("Collaborated with cloud engineering teams on Microsoft Azure deployment pipelines, environment configuration, and backend API monitoring.", max_chars=96)
    pdf.add_bullet("Conducted data cleansing and exploratory data reporting to support operational decision-making across core enterprise modules.", max_chars=96)
    pdf.add_bullet("Authored comprehensive Standard Operating Procedures (SOPs) and technical documentation to streamline onboarding and maintain code quality.", max_chars=96)

    # Role 2: Innomatics
    pdf.add_job_header("Junior Data Analyst Trainee", "Innomatics Research Labs", "December 2022 - August 2023", "Data Science Division")
    pdf.add_bullet("Processed and analyzed large tabular datasets utilizing Python (Pandas, NumPy) to isolate business trends, seasonal variance, and data anomalies.", max_chars=96)
    pdf.add_bullet("Designed and maintained interactive executive dashboards in Tableau and Power BI, translating raw transactional logs into actionable KPI monitors.", max_chars=96)
    pdf.add_bullet("Automated weekly reporting pipelines using SQL queries, Excel formulas, and VBA macro routines, eliminating 14 hours of manual copy-paste overhead.", max_chars=96)
    pdf.add_bullet("Implemented supervised machine learning workflows including feature selection, data normalization, and baseline predictive regression models.", max_chars=96)

    # Education (UK Format - Highlight Leicester MSc prominently)
    pdf.add_section_header("Academic Qualifications")
    
    pdf.add_job_header("MSc Data Science with Industry (Postgraduate Degree)", "University of Leicester", "2026 - 2028", "Leicester, United Kingdom")
    pdf.add_bullet("Current Postgraduate Specialization: Advanced statistical modeling, scalable data architectures, machine learning algorithms, and industrial UK practice.", max_chars=96)
    
    pdf.add_job_header("Bachelor of Technology (B.Tech) - Electronics & Communication", "Sreenidhi Institute of Science & Tech", "2018 - 2022", "Hyderabad, India")
    pdf.add_bullet("Coursework in computational mathematics, linear algebra, signal processing, and algorithms; authored 2 published peer-reviewed research papers.", max_chars=96)

    pdf.add_job_header("Intermediate / Higher Secondary Education (MPC)", "Narayana Junior College", "2016 - 2018", "Hyderabad, India")
    pdf.add_bullet("Focus on Mathematics, Physics, and Chemistry; developed advanced analytical problem-solving and quantitative reasoning foundations.", max_chars=96)

    # Verified Certifications
    pdf.add_section_header("Verified Professional Certifications")
    certs = [
        "Microsoft Certified: Azure AI Engineer Associate (AI-102) - Cognitive Services, Knowledge Mining, Azure OpenAI",
        "Microsoft Certified: Azure AI Fundamentals (AI-900) - Machine Learning workloads, Computer Vision, Responsible AI",
        "Microsoft Certified: Power BI Data Analyst Associate (PL-300) - DAX Formulas, Data Modeling, Dashboard Governance",
        "AWS Certified Cloud Practitioner (CLF-C02) - Cloud Architecture Principles, Security, IAM, Cloud Economics",
        "Google Cloud Associate Cloud Engineer (ACE) - GKE, Cloud Storage, Compute Engine Deployment, gcloud CLI",
        "NASSCOM Certification: Python Fundamentals and Programming - Data Structures, Algorithmic Efficiency, Wrangling",
    ]
    for c in certs:
        pdf.add_bullet(c, indent=10, max_chars=98)

    # Key Empirical Projects & Publications
    pdf.add_section_header("Empirical Projects & Research Publications")
    pdf.add_job_header("Food Delivery Operational Analysis", "Tableau Public Live Dashboard", "Interactive BI", "45,000+ Orders")
    pdf.add_bullet("Engineered operational dashboard isolating courier lead times; proved kitchen preparation accounted for 58% of delay bottlenecks during rush periods.", max_chars=96)
    
    pdf.add_job_header("E-Commerce Relational Schema & SQL Tuning", "MySQL Optimization Study", "Database Tuning", "-93% Latency")
    pdf.add_bullet("Normalized 8-table enterprise schema in 3NF; added composite B-Tree indexing and stored procedures, cutting query execution from 1,840ms to 120ms.", max_chars=96)

    pdf.add_job_header("Medical Insurance Predictive Cost Modeling", "Scikit-Learn Regression", "Machine Learning", "R2 = 0.87")
    pdf.add_bullet("Built transparent regression pipeline predicting insurance premiums; cross-validated Random Forest Regressor yielding 0.87 R2 on holdout split.", max_chars=96)

    pdf.add_job_header("Research Paper: IoT Based Electricity Energy Meter", "Int. Journal of Computer Science & Mobile Computing", "Published", "Peer-Reviewed")
    pdf.add_bullet("Architected real-time power telemetry and consumption tracking hardware-software framework with automated demand-side load notifications.", max_chars=96)

    pdf.build_pdf(output_path)


def generate_india_resume(output_path):
    pdf = SimplePDFBuilder()
    
    # Header: Name & Title (Indian Tech Corporate Standard)
    pdf.y = 805
    pdf.add_text(pdf.margin_left, pdf.y, "INDRA KIRAN SANE", font="/F2", size=18, r=0.06, g=0.10, b=0.16)
    pdf.y -= 14
    pdf.add_text(pdf.margin_left, pdf.y, "Software Engineer  |  Data Analyst  |  Aspiring Data Scientist", font="/F2", size=10, r=0.10, g=0.45, b=0.65)
    pdf.y -= 13
    
    # Contact Strip
    contact_left = "Email: saneindradev2790@gmail.com  |  Phone: +44 07344738617 / +91 Contact  |  Location: Leicester, UK / Hyderabad, IN"
    pdf.add_text(pdf.margin_left, pdf.y, contact_left, font="/F1", size=8, r=0.30, g=0.35, b=0.40)
    pdf.y -= 10
    contact_right = "LinkedIn: linkedin.com/in/indrakiran-sane  |  GitHub: github.com/SANEINDRA2790  |  Portfolio: Live Case Studies Available"
    pdf.add_text(pdf.margin_left, pdf.y, contact_right, font="/F1", size=8, r=0.30, g=0.35, b=0.40)
    pdf.y -= 4
    pdf.draw_line(pdf.margin_left, pdf.y, pdf.margin_right, pdf.y, width=1.0, r=0.10, g=0.45, b=0.65)
    pdf.y -= 8

    # Executive Summary (Indian IT MNC & Enterprise Standard)
    pdf.add_section_header("Executive Summary")
    summary = (
        "Results-oriented Software Engineer and Data Analyst with 2+ years of professional enterprise experience at Capgemini, "
        "specializing in full-stack web application development (.NET Core Web API, Angular, C#) and high-performance database "
        "optimization (MySQL, SQL query tuning, stored procedures). Proven ability to reduce database latency by 20% on production "
        "systems through execution plan profiling and B-Tree indexing. Strong analytical capabilities in Python (Pandas, NumPy, EDA) "
        "and Business Intelligence (Power BI, Tableau, Excel VBA). Pursuing MSc Data Science with Industry at University of Leicester, "
        "UK. Certified in Microsoft Azure (AI-102, AI-900, PL-300), AWS Cloud (CLF-C02), and Google Cloud (ACE)."
    )
    for line in pdf.wrap_text(summary, 98):
        pdf.add_text(pdf.margin_left, pdf.y, line, font="/F1", size=8.5, r=0.15, g=0.18, b=0.22)
        pdf.y -= 11.5

    # Technical Skills Matrix
    pdf.add_section_header("Technical Skills Matrix")
    matrix = [
        ("Programming Languages:", "Python, SQL, C#, TypeScript, JavaScript, VBA"),
        ("Backend & Frameworks:", ".NET Core Web API, ASP.NET, RESTful Web Services, Entity Framework, Node.js fundamentals"),
        ("Frontend Technologies:", "Angular, TypeScript, HTML5, CSS3, Tailwind CSS, Responsive Web Design"),
        ("Databases & Optimization:", "MySQL, SQL Server, Stored Procedures, Triggers, Views, Query Optimization, B-Tree Indexing, EXPLAIN"),
        ("BI & Visualisation Tools:", "Power BI, Tableau Desktop / Public, Excel Power Pivot, Dynamic DAX, Matplotlib, Seaborn"),
        ("Data Science & ML:", "Exploratory Data Analysis (EDA), Scikit-learn, Predictive Regression, Classification, Model Evaluation"),
        ("Cloud & DevOps:", "Microsoft Azure (App Services, Cognitive Services), AWS Cloud, Google Cloud Platform, Git, CI/CD, Agile"),
    ]
    for label, val in matrix:
        pdf.check_page_break(14)
        pdf.add_text(pdf.margin_left, pdf.y, label, font="/F2", size=8.5, r=0.08, g=0.12, b=0.18)
        pdf.add_text(pdf.margin_left + 140, pdf.y, val, font="/F1", size=8.2, r=0.20, g=0.24, b=0.28)
        pdf.y -= 11.5

    # Professional Experience (Detailed Engineering Focus)
    pdf.add_section_header("Professional Experience")
    
    # Capgemini
    pdf.add_job_header("Senior Analyst (Software Engineer)", "Capgemini", "October 2023 - 2024", "Delivery Center, India")
    pdf.add_bullet("Developed enterprise-grade full-stack web solutions utilizing .NET Core Web API, C#, Angular, and MySQL within Agile sprints.", max_chars=96)
    pdf.add_bullet("Analyzed slow query execution plans using EXPLAIN and refactored relational database stored procedures, slashing query latency by 20%.", max_chars=96)
    pdf.add_bullet("Architected RESTful microservice endpoints and integrated third-party APIs with comprehensive error handling and logging.", max_chars=96)
    pdf.add_bullet("Collaborated with cross-functional cloud engineering and DevOps teams on Azure cloud infrastructure deployment and monitoring.", max_chars=96)
    pdf.add_bullet("Authored rigorous technical design documents (TDDs) and Standard Operating Procedures (SOPs) to ensure enterprise compliance.", max_chars=96)

    # Innomatics
    pdf.add_job_header("Junior Data Analyst / Data Science Trainee", "Innomatics Research Labs", "December 2022 - August 2023", "Hyderabad, India")
    pdf.add_bullet("Executed data cleaning, imputation, and exploratory data analysis (EDA) on high-volume tabular datasets using Python (Pandas, NumPy).", max_chars=96)
    pdf.add_bullet("Designed executive KPI dashboards and operational reporting views in Tableau and Power BI for stakeholder performance tracking.", max_chars=96)
    pdf.add_bullet("Automated manual weekly reporting routines by authoring complex SQL views and Excel VBA macros, saving 14+ hours of manual labor per week.", max_chars=96)
    pdf.add_bullet("Participated in machine learning sprints, engineering features and validating baseline predictive regression models using Scikit-learn.", max_chars=96)

    # Education (Indian Standard Format)
    pdf.add_section_header("Education & Academic Background")
    
    pdf.add_job_header("MSc Data Science with Industry (Postgraduate)", "University of Leicester", "2026 - 2028", "United Kingdom")
    pdf.add_bullet("Specializing in Advanced Machine Learning, Big Data Analytics, Statistical Inference, and UK Commercial Industry Placement.", max_chars=96)

    pdf.add_job_header("Bachelor of Technology (B.Tech) - Electronics & Communication", "Sreenidhi Institute of Science & Technology", "2018 - 2022", "Hyderabad, India")
    pdf.add_bullet("Graduated with strong foundations in Linear Algebra, Computational Mathematics, and Embedded Systems; published 2 international research papers.", max_chars=96)

    pdf.add_job_header("Higher Secondary Intermediate (MPC)", "Narayana Junior College", "2016 - 2018", "Hyderabad, India")
    pdf.add_bullet("State Board Curriculum: Mathematics, Physics, and Chemistry with distinction in analytical problem solving.", max_chars=96)

    # Certifications & Credentials
    pdf.add_section_header("Professional Certifications & Accreditations")
    certs = [
        "Microsoft Certified: Azure AI Engineer Associate (AI-102) - Enterprise AI Solutions & Cognitive Services",
        "Microsoft Certified: Azure AI Fundamentals (AI-900) - AI/ML Workloads & Principles",
        "Microsoft Certified: Power BI Data Analyst Associate (PL-300) - Business Intelligence & DAX",
        "AWS Certified Cloud Practitioner (CLF-C02) - Cloud Architecture, Compute, Storage & Security",
        "Google Cloud Associate Cloud Engineer (ACE) - Enterprise Cloud Infrastructure Deployment",
        "NASSCOM Certification: Python Fundamentals and Programming - Data Wrangling & Algorithmic Design",
    ]
    for c in certs:
        pdf.add_bullet(c, indent=10, max_chars=98)

    # Key Technical Projects
    pdf.add_section_header("Key Technical Projects & Case Studies")
    pdf.add_job_header("E-Commerce Relational Database & Query Optimization", "SQL, MySQL, Stored Procedures", "Database Architecture", "93% Speedup")
    pdf.add_bullet("Engineered 3NF relational database schema; implemented composite indexing and ACID-compliant checkout procedures, cutting latency from 1,840ms to 120ms.", max_chars=96)
    
    pdf.add_job_header("Food Delivery Operational Intelligence", "Tableau Public, SQL, Python", "BI & Analytics", "45,000+ Orders")
    pdf.add_bullet("Built interactive multi-dimensional dashboard tracking 45,000+ orders; identified kitchen dwell time as root cause of 58% of delivery SLA breaches.", max_chars=96)

    pdf.add_job_header("Automobile Specification & Price Correlation EDA", "Python, Pandas, Seaborn", "Exploratory Analytics", "205 Models")
    pdf.add_bullet("Evaluated 205 vehicle models across 26 attributes; Pearson correlation matrix identified displacement and curb weight as primary retail price drivers (+0.87).", max_chars=96)

    pdf.add_job_header("Healthcare Insurance Cost Predictive Modeling", "Python, Scikit-learn, Random Forest", "Predictive Modeling", "R2 = 0.87")
    pdf.add_bullet("Trained machine learning regression models on 1,338 policyholders; benchmarked Random Forest Regressor achieving 0.87 R2 on holdout evaluation split.", max_chars=96)

    # Research Publications
    pdf.add_section_header("Peer-Reviewed Research Publications")
    pdf.add_job_header("IoT Based Electricity Energy Meter", "Int. Journal of Computer Science & Mobile Computing (IJCSMC)", "Published", "Author")
    pdf.add_bullet("Designed hardware-software IoT telemetry system streaming real-time electrical energy consumption data with automated threshold alerting.", max_chars=96)
    
    pdf.add_job_header("Segmentation of Images using Automatic Fuzzy Clustering", "Int. Journal of Digital Electronics (IJDE)", "Published", "Author")
    pdf.add_bullet("Developed unsupervised fuzzy clustering framework for adaptive digital image segmentation with superior noise resistance.", max_chars=96)

    pdf.build_pdf(output_path)


if __name__ == "__main__":
    public_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")
    
    uk_cv_path = os.path.join(public_dir, "Indra_Kiran_Sane_CV_UK.pdf")
    india_resume_path = os.path.join(public_dir, "Indra_Kiran_Sane_Resume_India.pdf")
    fallback_resume_path = os.path.join(public_dir, "resume.pdf")
    
    print("Generating UK Standard Curriculum Vitae (ATS-Optimised)...")
    generate_uk_cv(uk_cv_path)
    
    print("Generating India / International Technical Resume (ATS-Optimised)...")
    generate_india_resume(india_resume_path)
    
    # Overwrite default fallback resume.pdf with UK CV
    with open(uk_cv_path, "rb") as src, open(fallback_resume_path, "wb") as dst:
        dst.write(src.read())
    print(f"Updated default {fallback_resume_path} with UK CV ({os.path.getsize(fallback_resume_path)} bytes)")

