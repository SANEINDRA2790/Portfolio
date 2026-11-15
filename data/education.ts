export interface EducationItem {
  id: string;
  institution: string;
  qualification: string;
  degree: string;
  period: string;
  location: string;
  isCurrent?: boolean;
  focus: string;
  highlights: string[];
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "msc-leicester",
    institution: "University of Leicester, United Kingdom",
    qualification: "Master's Degree",
    degree: "MSc Data Science with Industry",
    period: "2026 – 2028",
    location: "Leicester, United Kingdom",
    isCurrent: true,
    focus: "Advanced Statistical Analysis, Machine Learning, Big Data Analytics & Industrial Practice",
    highlights: [
      "Current postgraduate qualification developing computational models, advanced machine learning, and statistical inference.",
      "Specialized research curriculum focusing on scalable data processing, predictive modeling algorithms, and empirical validation.",
      "Industrial placement pathway targeted at UK commercial technology and analytics environments.",
    ],
  },
  {
    id: "btech-sreenidhi",
    institution: "Sreenidhi Institute of Science and Technology",
    qualification: "Bachelor's Degree",
    degree: "Bachelor of Technology (B.Tech) in Electronics and Communication Engineering",
    period: "08 August 2018 – 22 June 2022",
    location: "Hyderabad, India",
    isCurrent: false,
    focus: "Embedded Systems, Signal Processing, Computational Mathematics & Software Fundamentals",
    highlights: [
      "Rigorous mathematical foundations in linear algebra, multivariable calculus, and probability theory.",
      "Authored and published 2 peer-reviewed research papers in international journals during undergraduate tenure.",
      "Engineered hardware-software integrated systems combining IoT telemetry with real-time algorithmic processing.",
    ],
  },
  {
    id: "intermediate-narayana",
    institution: "Narayana Junior College",
    qualification: "Intermediate / Higher Secondary Education",
    degree: "MPC (Mathematics, Physics and Chemistry)",
    period: "2016 – 2018",
    location: "Hyderabad, India",
    isCurrent: false,
    focus: "Higher Mathematics, Physical Sciences, Analytical Problem Solving & Logic",
    highlights: [
      "Core training in calculus, coordinate geometry, advanced algebra, and physical sciences.",
      "Developed competitive analytical reasoning and mathematical problem-solving foundations.",
    ],
  },
];

