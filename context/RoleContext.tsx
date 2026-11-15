"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProfessionalRole, ROLES_CONFIG, RoleConfig } from "@/data/rolesData";

interface RoleContextType {
  activeRole: ProfessionalRole | "all";
  setActiveRole: (role: ProfessionalRole | "all") => void;
  roleConfig: RoleConfig | null;
  resetRole: () => void;
}

const RoleContext = createContext<RoleContextType>({
  activeRole: "all",
  setActiveRole: () => {},
  roleConfig: null,
  resetRole: () => {},
});

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRoleState] = useState<ProfessionalRole | "all">("all");

  useEffect(() => {
    // Check URL parameters for ?role=data-analyst etc. on initial mount
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get("role") as ProfessionalRole;
      if (roleParam && ROLES_CONFIG[roleParam]) {
        setActiveRoleState(roleParam);
      }
    }
  }, []);

  const setActiveRole = (role: ProfessionalRole | "all") => {
    setActiveRoleState(role);
    if (typeof window !== "undefined" && role !== "all") {
      // Update URL query param smoothly without reload so visitors can share the tailored link
      const url = new URL(window.location.href);
      url.searchParams.set("role", role);
      window.history.replaceState({}, document.title, url.toString());
    } else if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("role");
      window.history.replaceState({}, document.title, url.toString());
    }
  };

  const resetRole = () => setActiveRole("all");

  const roleConfig = activeRole !== "all" ? ROLES_CONFIG[activeRole] : null;

  return (
    <RoleContext.Provider
      value={{
        activeRole,
        setActiveRole,
        roleConfig,
        resetRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
