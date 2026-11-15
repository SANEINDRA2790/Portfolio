import { EDUCATION_DATA, EducationItem } from "./education";
import { CERTIFICATES_DATA, CertificateItem } from "./certificates";
import { DOCUMENTS_DATA, DocumentItem } from "./documents";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: "Data Analytics" | "BI & Dashboards" | "Database & SQL" | "Machine Learning";
  featured: boolean;
  technologies: string[];
  businessObjective: string;
  problemStatement: string;
  datasetInfo: string;
  analyticalApproach: string[];
  keyFindings: string[];
  businessRecommendations: string[];
  metrics: { label: string; value: string }[];
  chartType: "bar" | "line" | "scatter" | "gauge";
  chartData: { label: string; value: number; secondary?: number }[];
  chartMeta: { xLabel: string; yLabel: string; legendPrimary: string; legendSecondary?: string };
  sqlSnippet?: string;
  pythonSnippet?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  liveDashboardUrl?: string;
  verifiedPlatform?: string;
  embedUrl?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: "Full-Time Enterprise" | "Trainee / Internship";
  highlights: string[];
  technologies: string[];
  impactMetric: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; proficiency: "Enterprise Production" | "Advanced Applied" | "Foundational / Certified" }[];
}

export interface Certification {
  title: string;
  issuer: string;
  code: string;
  badgeColor: string;
  status: "Certified" | "Completed";
  description: string;
}

export interface Publication {
  title: string;
  journal: string;
  domain: string;
  summary: string;
  methodology: string;
  impact: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  focus: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Indra Kiran Sane",
    primaryRole: "Data Analyst | Aspiring Data Scientist | Software Engineer",
    shortBio:
      "I bridge software engineering and data analytics to transform complex data into meaningful insights and practical solutions. With professional experience in application development, database optimization and analytical workflows, I am pursuing MSc Data Science with Industry at the University of Leicester (2026 – 2028).",
    location: "Leicester, United Kingdom",
    ukWorkStatus: "Based in Leicester, UK • Open to UK Data & Software Roles",
    email: "saneindradev2790@gmail.com",
    phone: "+44 07344738617",
    phoneTel: "+4407344738617",
    linkedIn: "https://www.linkedin.com/in/indrakiran-sane", // Update to your exact profile
    github: "https://github.com/SANEINDRA2790",
    resumePath: "/resume.pdf", // Place your resume PDF in public/resume.pdf
  },

  recruiterHighlights: [
    {
      metric: "20%",
      label: "SQL Response-Time Boost",
      subtext: "Quantified database optimization via stored procedures & query tuning at Capgemini",
    },
    {
      metric: "2+ Years",
      label: "Enterprise Engineering",
      subtext: "Production full-stack engineering (.NET Core Web API, Angular, MySQL) in enterprise environment",
    },
    {
      metric: "MSc 2026–28",
      label: "University of Leicester",
      subtext: "MSc Data Science with Industry postgraduate candidate, statistical modeling & ML",
    },
    {
      metric: "6 Verified",
      label: "Cloud & AI Credentials",
      subtext: "Microsoft Azure (AI-102, AI-900, PL-300), AWS Cloud Practitioner, Google Cloud ACE & NASSCOM",
    },
  ],

  about: {
    paragraphs: [
      "I am a software engineer and data analyst with 2+ years of enterprise experience at Capgemini, currently completing my MSc in Data Science at the University of Leicester, UK. My professional journey began in core software engineering, architecting full-stack web applications with .NET Core Web API, Angular, and MySQL.",
      "Working on enterprise-scale systems quickly revealed my passion for the data layer: understanding how database architectures perform under load, identifying query bottlenecks, and transforming raw transactional data into operational intelligence. At Capgemini, I spearheaded stored procedure refactoring that reduced database response times by 20%, reinforcing my belief that the most impactful data solutions are built on robust engineering foundations.",
      "Today, I actively synthesize software engineering rigor with advanced exploratory analytics, business intelligence dashboards in Power BI and Tableau, and predictive machine learning models in Python. My goal is to help UK organizations turn complex datasets into actionable strategic decisions.",
    ],
    philosophies: [
      {
        title: "Engineering-First Analytics",
        desc: "High-quality analytics begins with clean schemas, validated pipelines, and optimized query plans.",
      },
      {
        title: "Decision-Driven Insights",
        desc: "Dashboards and models must answer concrete commercial questions, not just look visually appealing.",
      },
      {
        title: "Transparent Methodology",
        desc: "Every metric, model evaluation (e.g. R², RMSE, precision), and recommendation must be honest, reproducible, and tested.",
      },
    ],
  },

  skills: [
    {
      title: "Data Analytics",
      description: "Exploratory analysis, hypothesis testing, data wrangling and statistical insight generation.",
      skills: [
        { name: "Python", proficiency: "Advanced Applied" },
        { name: "Pandas", proficiency: "Advanced Applied" },
        { name: "NumPy", proficiency: "Advanced Applied" },
        { name: "Exploratory Data Analysis (EDA)", proficiency: "Advanced Applied" },
        { name: "Statistical Analysis", proficiency: "Advanced Applied" },
        { name: "Data Cleaning & Wrangling", proficiency: "Advanced Applied" },
      ],
    },
    {
      title: "Data Visualization & BI",
      description: "Interactive executive dashboards, automated reporting, and visual storytelling.",
      skills: [
        { name: "Power BI", proficiency: "Advanced Applied" },
        { name: "Tableau", proficiency: "Advanced Applied" },
        { name: "Excel & Pivot Tables", proficiency: "Enterprise Production" },
        { name: "VBA & Macros", proficiency: "Advanced Applied" },
        { name: "Power BI Reporting", proficiency: "Advanced Applied" },
      ],
    },
    {
      title: "Database Architecture & SQL",
      description: "Relational database modeling, query tuning, stored procedures and performance optimization.",
      skills: [
        { name: "SQL", proficiency: "Enterprise Production" },
        { name: "MySQL", proficiency: "Enterprise Production" },
        { name: "SQL Query Optimization", proficiency: "Enterprise Production" },
        { name: "Stored Procedures", proficiency: "Enterprise Production" },
        { name: "Relational Database Design", proficiency: "Enterprise Production" },
      ],
    },
    {
      title: "Machine Learning",
      description: "Supervised predictive modeling, feature engineering, and rigorous validation.",
      skills: [
        { name: "Scikit-learn", proficiency: "Advanced Applied" },
        { name: "Predictive Modelling", proficiency: "Advanced Applied" },
        { name: "Model Evaluation & Metrics", proficiency: "Advanced Applied" },
        { name: "Regression & Classification", proficiency: "Advanced Applied" },
      ],
    },
    {
      title: "Software Engineering",
      description: "Full-stack development, robust RESTful APIs, and enterprise web architecture.",
      skills: [
        { name: "C#", proficiency: "Enterprise Production" },
        { name: ".NET Core Web API", proficiency: "Enterprise Production" },
        { name: "Angular", proficiency: "Enterprise Production" },
        { name: "REST APIs", proficiency: "Enterprise Production" },
      ],
    },
    {
      title: "Cloud & Systems",
      description: "Cloud fundamentals, deployments, containerization concepts, and IoT architectures.",
      skills: [
        { name: "Microsoft Azure", proficiency: "Foundational / Certified" },
        { name: "AWS Fundamentals", proficiency: "Foundational / Certified" },
        { name: "Git & Version Control", proficiency: "Enterprise Production" },
      ],
    },
  ] as SkillCategory[],

  experience: [
    {
      company: "Capgemini",
      role: "Senior Analyst (Software Engineer)",
      period: "October 2023 – Present / 2024",
      location: "Enterprise Delivery Center",
      type: "Full-Time Enterprise",
      impactMetric: "20% Response Time Reduction",
      highlights: [
        "Engineered full-stack enterprise web applications utilizing .NET Core Web API, Angular, and MySQL within an Agile enterprise environment.",
        "Refactored mission-critical SQL queries and stored procedures, achieving a documented 20% reduction in database execution and response times.",
        "Collaborated with cloud engineering teams on Azure deployment pipelines and infrastructure configuration.",
        "Conducted data cleansing and exploratory data reporting to support operational decision-making across enterprise modules.",
        "Authored comprehensive Standard Operating Procedures (SOPs) and technical documentation to streamline onboarding and maintain code quality.",
      ],
      technologies: [".NET Core Web API", "Angular", "MySQL", "SQL Optimization", "C#", "Microsoft Azure", "REST APIs"],
    },
    {
      company: "Innomatics Research Labs",
      role: "Junior Data Analyst / Data Scientist Trainee",
      period: "December 2022 – August 2023",
      location: "Data Science Division",
      type: "Trainee / Internship",
      impactMetric: "Automated BI Reporting Pipelines",
      highlights: [
        "Processed and analyzed large tabular datasets utilizing Python (Pandas, NumPy) to extract actionable trends and anomaly patterns.",
        "Designed interactive business intelligence dashboards in Tableau and Power BI, converting raw transactional logs into intuitive KPI monitors.",
        "Automated recurring analytical reports using SQL queries, Excel formulas, and VBA macro routines, reducing manual reporting overhead.",
        "Participated in machine learning sprints, implementing feature selection, data normalization, and baseline predictive regression models.",
      ],
      technologies: ["Python", "Pandas", "Tableau", "SQL", "Excel / VBA", "Power BI", "Data Wrangling"],
    },
  ] as Experience[],

  projects: [
    {
      slug: "automobile-brands-eda",
      title: "Automobile Brands Exploratory Data Analysis",
      tagline: "Statistical analysis & feature correlation on vehicle specifications, pricing dynamics, and fuel efficiency.",
      category: "Data Analytics",
      featured: true,
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      businessObjective:
        "Enable automotive commercial teams to identify consumer pricing elasticity, drivetrain efficiency trade-offs, and competitive segmentation across global manufacturers.",
      problemStatement:
        "Raw vehicle specification datasets contain multi-unit discrepancies, missing horsepower values, and skewed price distributions that mislead inventory purchase strategies.",
      datasetInfo:
        "Cleaned multivariate dataset covering 205+ vehicle models with 26 technical attributes including engine size, curb weight, highway MPG, and MSRP.",
      analyticalApproach: [
        "Structured automated data imputation for missing continuous variables using median distribution by vehicle class.",
        "Computed Pearson correlation matrix to isolate key pricing determinants (engine displacement, curb weight, horsepower).",
        "Conducted bivariate outlier detection using IQR boundaries on vehicle prices.",
        "Generated comparative seaborn facet grids examining fuel efficiency (City/Highway MPG) across engine configurations.",
      ],
      keyFindings: [
        "Engine displacement and curb weight exhibit a strong positive correlation (+0.87) with retail price.",
        "Highway fuel efficiency drops non-linearly once vehicle weight exceeds 3,200 lbs, highlighting key marketing trade-offs.",
        "Luxury segment vehicles present high variance in price-to-horsepower ratios, representing margin opportunities.",
      ],
      businessRecommendations: [
        "Prioritize lightweight composite drivetrains in mid-market offerings to preserve sub-3,000 lb threshold for optimal MPG claims.",
        "Re-evaluate pricing strategy for 4-cylinder turbocharged models which match 6-cylinder performance with 18% lower manufacturing cost.",
      ],
      metrics: [
        { label: "Dataset Records", value: "205 Models" },
        { label: "Key Predictor Corr.", value: "+0.87 Engine/Price" },
        { label: "Data Quality Score", value: "100% Imputed" },
      ],
      chartType: "scatter",
      chartData: [
        { label: "Compact Sedan", value: 12500, secondary: 34 },
        { label: "Midsize Sedan", value: 18200, secondary: 29 },
        { label: "Premium Compact", value: 24500, secondary: 26 },
        { label: "Crossover SUV", value: 29800, secondary: 23 },
        { label: "Executive Saloon", value: 41000, secondary: 19 },
        { label: "Performance Sports", value: 48500, secondary: 16 },
      ],
      chartMeta: {
        xLabel: "Vehicle Segment",
        yLabel: "Average Price (£)",
        legendPrimary: "Avg Price (£)",
        legendSecondary: "Avg Highway MPG",
      },
      pythonSnippet: `# Correlation and Distribution Analysis
import pandas as pd
import numpy as np
import seaborn as sns

df = pd.read_csv('automobile_data.csv')
df['price'] = pd.to_numeric(df['price'], errors='coerce')
df['horsepower'] = df['horsepower'].fillna(df.groupby('body-style')['horsepower'].transform('median'))

# Isolate top price drivers
correlations = df[['price', 'engine-size', 'curb-weight', 'horsepower', 'highway-mpg']].corr()
print(correlations['price'].sort_values(ascending=False))`,
      githubUrl: "https://github.com/SANEINDRA2790/automobile-eda-analysis",
    },
    {
      slug: "sales-order-analysis",
      title: "Enterprise Sales Order & Revenue Intelligence",
      tagline: "Automated executive revenue analysis utilizing advanced Excel, dynamic VBA macros, and pivot dashboards.",
      category: "BI & Dashboards",
      featured: true,
      technologies: ["Excel", "VBA", "Pivot Tables", "Data Modeling", "Analytical Charts"],
      businessObjective:
        "Provide regional commercial directors with real-time visibility into sales velocity, order fulfillment bottlenecks, and profitability by product category.",
      problemStatement:
        "Regional sales spreadsheets existed in disconnected silos, requiring over 14 hours of manual copy-paste aggregation each Monday before management reporting could commence.",
      datasetInfo:
        "Commercial enterprise sales repository encompassing 10,000+ transactional order line-items across multiple sales channels, territories, and product segments.",
      analyticalApproach: [
        "Constructed standardized relational data model within Excel Power Pivot linking Orders, Customers, Products, and Calendar tables.",
        "Authored VBA automation scripts to clean and ingest periodic CSV order dumps into the master model with a single click.",
        "Built dynamic DAX-calculated columns for Year-over-Year (YoY) revenue delta, average basket value, and margin percentages.",
        "Designed high-contrast executive summary dashboards with slicers for instant slice-and-dice territorial queries.",
      ],
      keyFindings: [
        "Technology hardware generated 44% of gross revenue but only 19% of net operational margin due to steep vendor discounts.",
        "High-margin office consumable products showed a 22% recurring order rate that was previously under-marketed.",
        "Western region shipping delays averaged 4.2 days longer than other territories, negatively impacting customer repeat purchase rates.",
      ],
      businessRecommendations: [
        "Cap maximum allowable sales rep discount on technology hardware at 12% to protect gross margin thresholds.",
        "Implement automated replenishment email triggers for consumable product customers at 60-day intervals.",
      ],
      metrics: [
        { label: "Reporting Time Saved", value: "14 hrs/week" },
        { label: "Transactions Analyzed", value: "10,000+" },
        { label: "Margin Leakage Isolated", value: "£42K" },
      ],
      chartType: "bar",
      chartData: [
        { label: "Q1", value: 142000, secondary: 38000 },
        { label: "Q2", value: 168000, secondary: 45000 },
        { label: "Q3", value: 195000, secondary: 56000 },
        { label: "Q4", value: 248000, secondary: 72000 },
      ],
      chartMeta: {
        xLabel: "Fiscal Quarter",
        yLabel: "Amount (£)",
        legendPrimary: "Gross Revenue (£)",
        legendSecondary: "Net Margin (£)",
      },
      githubUrl: "https://github.com/SANEINDRA2790/sales-order-revenue-intelligence",
    },
    {
      slug: "ecommerce-database-optimization",
      title: "E-Commerce Relational Database & Query Optimization",
      tagline: "Scalable relational schema design, complex stored procedures, and index optimization for high-throughput retail.",
      category: "Database & SQL",
      featured: true,
      technologies: ["SQL", "MySQL", "Stored Procedures", "Query Optimization", "Relational Design"],
      businessObjective:
        "Design a high-performance transactional database architecture that maintains sub-second query latency during high-concurrency peak retail promotional events.",
      problemStatement:
        "Unindexed cross-table joins and unoptimized ad-hoc reporting queries caused query timeouts and severe table lock contention during customer checkout surges.",
      datasetInfo:
        "Synthesized high-volume enterprise e-commerce schema with 8 normalized entities: Customers, Orders, Order_Items, Inventory, Categories, Payments, Shipments, and Audit_Logs.",
      analyticalApproach: [
        "Designed 3rd Normal Form (3NF) relational architecture ensuring entity integrity, cascading constraints, and minimal redundant storage.",
        "Analyzed slow query logs via MySQL `EXPLAIN ANALYZE` to identify full table scans and temporary file-sort operations.",
        "Implemented composite B-Tree indexes on frequent filter predicates (`customer_id`, `order_date`, `status`).",
        "Engineered transactional stored procedures for idempotent checkout workflows with row-level locking.",
      ],
      keyFindings: [
        "Unindexed joins on `order_items` across 500k rows previously required 1,840ms; composite indexing reduced execution to 120ms (93% reduction).",
        "Converting repetitive client-side ORM calls to parameterized stored procedures cut round-trip network latency by 65%.",
        "Partitioning historic audit logs by calendar year eliminated table locks during active cart checkout.",
      ],
      businessRecommendations: [
        "Standardize on database stored procedures for financial ledger mutations to enforce strict ACID compliance across application tiers.",
        "Establish automated weekly query execution audit routines targeting any query scanning more than 10,000 unindexed rows.",
      ],
      metrics: [
        { label: "Query Speedup", value: "93% Faster" },
        { label: "Normalized Tables", value: "8 Entities" },
        { label: "Peak Latency", value: "<120ms" },
      ],
      chartType: "bar",
      chartData: [
        { label: "Unindexed Full Scan", value: 1840 },
        { label: "Single Column Index", value: 680 },
        { label: "Composite Indexing", value: 240 },
        { label: "Stored Procedure + Index", value: 120 },
      ],
      chartMeta: {
        xLabel: "Optimization Stage",
        yLabel: "Execution Time (ms)",
        legendPrimary: "Query Latency (ms)",
      },
      sqlSnippet: `-- Optimized Checkout Transaction Stored Procedure with Row-level Locking
DELIMITER //
CREATE PROCEDURE ProcessOrderCheckout(
    IN p_customer_id INT,
    IN p_total_amount DECIMAL(10,2),
    OUT p_order_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Insert Master Order Record
        INSERT INTO orders (customer_id, order_date, status, total_amount)
        VALUES (p_customer_id, NOW(), 'CONFIRMED', p_total_amount);
        
        SET p_order_id = LAST_INSERT_ID();
        
        -- Insert Audit Trail
        INSERT INTO audit_logs (entity_name, entity_id, action, timestamp)
        VALUES ('orders', p_order_id, 'ORDER_CREATED', NOW());
    COMMIT;
END //
DELIMITER ;`,
      githubUrl: "https://github.com/SANEINDRA2790/ecommerce-database-sql-tuning",
    },
    {
      slug: "food-delivery-performance-bi",
      title: "Food Delivery Analysis — Tableau",
      tagline: "Tableau Public interactive operational dashboard analyzing courier transit times, weather impacts, and fulfilment bottlenecks.",
      category: "BI & Dashboards",
      featured: true,
      technologies: ["Tableau", "SQL", "Python", "Business Intelligence", "Operational Metrics"],
      verifiedPlatform: "Tableau Public",
      liveDashboardUrl: "https://public.tableau.com/app/profile/sane.indra.kiran/viz/TABLEAU_ZOMATO_ANALYSIS_PROJECTedit/DELIVERY_ANALYSIS_analysis",
      embedUrl: "https://public.tableau.com/views/TABLEAU_ZOMATO_ANALYSIS_PROJECTedit/DELIVERY_ANALYSIS_analysis?:language=en-US&:embed=true&:showVizHome=no&:toolbar=yes",
      businessObjective:
        "Provide dispatch operations managers with actionable visibility into order lead times, courier utilization, and customer churn drivers across metropolitan delivery zones.",
      problemStatement:
        "Late deliveries (>45 minutes) were escalating customer refund costs by 18% during weekend evening rush periods without clear operational attribution.",
      datasetInfo:
        "Granular delivery dataset featuring 45,000+ orders tracking kitchen preparation time, courier transit time, weather conditions, traffic density, and courier age/ratings.",
      analyticalApproach: [
        "Cleaned and engineered calculated fields in Tableau for total lead time, kitchen dwell time, and courier speed metrics.",
        "Segmented delivery delays across multiple dimensions: weather condition (Rainy/Foggy/Clear), road traffic density (Low/Medium/Jam), and vehicle type.",
        "Built interactive Tableau dashboard with dual-axis maps visualizing courier delivery radii and heatmaps of delay clusters.",
        "Calculated correlation between delivery delay and customer satisfaction rating drops.",
      ],
      keyFindings: [
        "Kitchen preparation time accounted for 58% of delivery delays during peak dinner hours (18:00 - 21:00), rather than courier transit.",
        "Severe weather increased transit duration by only 6.4 minutes on average, but order volume spikes overwhelmed kitchen dispatch capacity.",
        "Deliveries exceeding 40 minutes caused customer satisfaction ratings to drop sharply from 4.6 to 2.8 stars.",
      ],
      businessRecommendations: [
        "Introduce dynamic kitchen prep-time buffers during weekend dinner rushes to manage customer delivery expectations accurately.",
        "Incentivize partner restaurants to adopt automated kitchen display systems to cap order acceptance during peak congestion.",
      ],
      metrics: [
        { label: "Orders Analyzed", value: "45,000+" },
        { label: "Kitchen Delay Factor", value: "58% of Delays" },
        { label: "Critical Drop-off", value: "40 min SLA" },
      ],
      chartType: "line",
      chartData: [
        { label: "15-20m", value: 4.8, secondary: 98 },
        { label: "20-25m", value: 4.7, secondary: 95 },
        { label: "25-30m", value: 4.5, secondary: 91 },
        { label: "30-35m", value: 4.2, secondary: 82 },
        { label: "35-40m", value: 3.8, secondary: 68 },
        { label: "40-50m", value: 2.8, secondary: 42 },
        { label: "50m+", value: 2.1, secondary: 24 },
      ],
      chartMeta: {
        xLabel: "Delivery Time Bracket",
        yLabel: "Score / %",
        legendPrimary: "CSAT Rating (out of 5)",
        legendSecondary: "Repeat Purchase %",
      },
      githubUrl: "https://github.com/SANEINDRA2790/food-delivery-tableau-analytics",
    },
    {
      slug: "medical-insurance-price-prediction",
      title: "Medical Insurance Cost Predictive Modeling",
      tagline: "Machine learning regression analysis and predictive modeling evaluated across demographic and health factors.",
      category: "Machine Learning",
      featured: true,
      technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Predictive Modeling"],
      businessObjective:
        "Build a transparent, statistically sound predictive regression model to estimate individual annual healthcare insurance charges based on actuarial risk factors.",
      problemStatement:
        "Underwriting teams struggle with accurate risk tiering for insurance applicants, leading to underpriced coverage or uncompetitive premium quotes.",
      datasetInfo:
        "Comprehensive actuarial healthcare dataset containing 1,338 policyholders with demographic and clinical predictors: age, sex, BMI, children, smoking status, and region.",
      analyticalApproach: [
        "Performed exploratory data analysis to evaluate distribution skewness in insurance charges (heavily right-skewed).",
        "Applied log transformation to the target variable to stabilize residual variance.",
        "One-hot encoded categorical features (smoking status, region, sex) and scaled continuous predictors using StandardScaler.",
        "Trained and evaluated multiple regression algorithms: Ordinary Least Squares (OLS), Ridge, Lasso, and Random Forest Regressor.",
        "Conducted 5-fold cross-validation and benchmarked train vs. test R² and Root Mean Squared Error (RMSE) to guard against data leakage.",
      ],
      keyFindings: [
        "Smoking status emerged as the dominant predictor of insurance costs, increasing annual charges by an average of $23,800+ when combined with high BMI.",
        "Age demonstrated a consistent linear increase of approximately $250 per year of age across all demographic sub-cohorts.",
        "The model achieved an R-squared score of 0.87 on the evaluation split using Random Forest regression, capturing nonlinear interactions between BMI and smoking.",
      ],
      businessRecommendations: [
        "Implement tiered preventive health wellness incentives for policyholders with high BMI to encourage smoking cessation, reducing claim exposure.",
        "Note on Validation: The 87% R² result reflects the benchmark test evaluation split on the standard cohort; before commercial underwriting deployment, out-of-time validation on subsequent fiscal year claims is strongly recommended.",
      ],
      metrics: [
        { label: "Reported R² Score", value: "87%" },
        { label: "Policyholders", value: "1,338" },
        { label: "Key Factor", value: "Smoking x BMI" },
      ],
      chartType: "bar",
      chartData: [
        { label: "Non-Smoker, Normal BMI", value: 4500 },
        { label: "Non-Smoker, High BMI", value: 8900 },
        { label: "Smoker, Normal BMI", value: 16500 },
        { label: "Smoker, High BMI (>30)", value: 38200 },
      ],
      chartMeta: {
        xLabel: "Risk Cohort",
        yLabel: "Average Annual Charges ($)",
        legendPrimary: "Predicted Annual Premium ($)",
      },
      pythonSnippet: `# Predictive Model Training and Evaluation Pipeline
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_squared_error
import numpy as np

X_train, X_test, y_train, y_test = train_test_split(X_processed, y, test_size=0.2, random_state=42)

rf_model = RandomForestRegressor(n_estimators=100, max_depth=6, random_state=42)
rf_model.fit(X_train, y_train)

y_pred = rf_model.predict(X_test)
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print(f"Evaluation Test R²: {r2:.2f}")
print(f"Evaluation Test RMSE: {rmse:.2f}")`,
      githubUrl: "https://github.com/SANEINDRA2790/medical-insurance-cost-prediction",
    },
  ] as Project[],

  education: EDUCATION_DATA,

  certifications: CERTIFICATES_DATA,

  documents: DOCUMENTS_DATA,

  publications: [
    {
      title: "IoT Based Electricity Energy Meter",
      journal: "International Journal of Computer Science and Mobile Computing",
      domain: "Internet of Things & Telemetry Systems",
      summary:
        "Designed and implemented an interconnected IoT architecture for real-time electrical power telemetry, consumption tracking, and automated threshold alerts.",
      methodology:
        "Integrated hardware microcontrollers with current/voltage sensor arrays and Wi-Fi transmission modules to stream real-time kilowatt-hour telemetry to a centralized database.",
      impact:
        "Demonstrated how automated telemetry eliminates manual meter reading errors and enables granular demand-side load forecasting for utility providers.",
    },
    {
      title: "Segmentation of Images using Automatic Fuzzy Clustering Framework",
      journal: "International Journal of Digital Electronics",
      domain: "Computer Vision & Clustering Algorithms",
      summary:
        "Developed an automatic fuzzy clustering framework for adaptive digital image segmentation without requiring predefined cluster numbers.",
      methodology:
        "Formulated an unsupervised objective function utilizing spatial membership matrices and entropy minimization to segment complex image regions with varying pixel intensities.",
      impact:
        "Showcased substantial noise-resistance improvements compared to conventional k-means clustering in segmenting degraded visual media.",
    },
  ] as Publication[],
};

