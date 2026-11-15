import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RecruiterSnapshot } from "@/components/RecruiterSnapshot";
import { AboutMe } from "@/components/AboutMe";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsSection } from "@/components/ProjectsSection";
import { EducationCertifications } from "@/components/EducationCertifications";
import { ResearchSection } from "@/components/ResearchSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#ededed]">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Recruiter Fast-Track Snapshot (30-second grasp) */}
        <RecruiterSnapshot />

        {/* About Me Narrative */}
        <AboutMe />

        {/* Technical Skills Matrix */}
        <SkillsMatrix />

        {/* Professional Experience Timeline */}
        <ExperienceTimeline />

        {/* Featured Projects with Live Interactive Visual Evidence */}
        <ProjectsSection />

        {/* Education & Verified Industry Certifications */}
        <EducationCertifications />

        {/* Academic Research & Publications */}
        <ResearchSection />

        {/* Contact & Inquiry Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
