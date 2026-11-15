import type { Metadata } from "next";
import "./globals.css";
import { OwnerProvider } from "@/context/OwnerContext";

export const metadata: Metadata = {
  title: "Indra Kiran Sane | Data Analyst, Aspiring Data Scientist & Software Engineer",
  description:
    "Professional portfolio of Indra Kiran Sane — Data Analyst and Software Engineer with 2+ years of enterprise experience at Capgemini and MSc Data Science with Industry candidate at the University of Leicester, UK (2026 – 2028). Specializing in SQL optimization, Power BI, Tableau, Python analytics, and full-stack systems.",
  keywords: [
    "Indra Kiran Sane",
    "Data Analyst UK",
    "Business Intelligence Analyst",
    "Software Engineer",
    "MSc Data Science with Industry",
    "University of Leicester",
    "SQL Optimization",
    "Power BI Specialist",
    "Tableau Dashboards",
    "Capgemini Software Engineer",
    "Python Data Science",
    "Machine Learning Placement UK",
  ],
  authors: [{ name: "Indra Kiran Sane" }],
  creator: "Indra Kiran Sane",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://indrakiran-sane.dev",
    title: "Indra Kiran Sane | Data Analyst & Software Engineer",
    description:
      "Enterprise software engineering, database query optimization (-20% response time), and modern data science portfolio for UK tech opportunities.",
    siteName: "Indra Kiran Sane Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indra Kiran Sane | Data Analyst & Software Engineer",
    description:
      "Enterprise software engineering, database query optimization (-20% response time), and modern data science portfolio for UK tech opportunities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Indra Kiran Sane",
  jobTitle: "Data Analyst & Software Engineer",
  email: "saneindradev2790@gmail.com",
  telephone: "+44 07344738617",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Leicester",
    addressCountry: "United Kingdom",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "University of Leicester",
    },
    {
      "@type": "EducationalOrganization",
      name: "Sreenidhi Institute of Science and Technology",
    },
    {
      "@type": "EducationalOrganization",
      name: "Narayana Junior College",
    },
  ],
  worksFor: {
    "@type": "Organization",
    name: "Capgemini",
  },
  knowsAbout: [
    "SQL Query Optimization",
    "Data Analytics",
    "Power BI",
    "Tableau",
    "Python",
    "Scikit-learn",
    ".NET Core Web API",
    "Angular",
    "Machine Learning",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[var(--bg-page)] text-[var(--text-primary)]">
        <OwnerProvider>
          {children}
        </OwnerProvider>
      </body>
    </html>
  );
}
