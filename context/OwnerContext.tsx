"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ShieldCheck, LogOut, KeyRound } from "lucide-react";
import { DownloadCvModal } from "@/components/DownloadCvModal";

interface OwnerContextType {
  isOwner: boolean;
  activateOwner: () => void;
  deactivateOwner: () => void;
  toggleOwner: () => void;
  isCvModalOpen: boolean;
  openCvModal: () => void;
  closeCvModal: () => void;
}

const OwnerContext = createContext<OwnerContextType>({
  isOwner: false,
  activateOwner: () => {},
  deactivateOwner: () => {},
  toggleOwner: () => {},
  isCvModalOpen: false,
  openCvModal: () => {},
  closeCvModal: () => {},
});

export function OwnerProvider({ children }: { children: React.ReactNode }) {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      // 1. Check URL parameters for ?owner=true or ?admin=true or ?mode=owner or ?key=indra
      const params = new URLSearchParams(window.location.search);
      const hasOwnerParam =
        params.get("owner") === "true" ||
        params.get("admin") === "true" ||
        params.get("mode") === "owner" ||
        params.get("key") === "indra";

      if (hasOwnerParam) {
        localStorage.setItem("portfolio_is_owner", "true");
        setIsOwner(true);

        // Clean the query parameter from URL bar so it cannot be accidentally copied when sharing
        const url = new URL(window.location.href);
        url.searchParams.delete("owner");
        url.searchParams.delete("admin");
        url.searchParams.delete("mode");
        url.searchParams.delete("key");
        window.history.replaceState({}, document.title, url.toString());
        return;
      }

      // 2. Check localStorage
      const saved = localStorage.getItem("portfolio_is_owner");
      if (saved === "true") {
        setIsOwner(true);
      }
    }
  }, []);

  const activateOwner = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_is_owner", "true");
    }
    setIsOwner(true);
  };

  const deactivateOwner = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("portfolio_is_owner");
    }
    setIsOwner(false);
  };

  const toggleOwner = () => {
    if (isOwner) {
      deactivateOwner();
    } else {
      activateOwner();
    }
  };

  const openCvModal = () => setIsCvModalOpen(true);
  const closeCvModal = () => setIsCvModalOpen(false);

  return (
    <OwnerContext.Provider
      value={{
        isOwner,
        activateOwner,
        deactivateOwner,
        toggleOwner,
        isCvModalOpen,
        openCvModal,
        closeCvModal,
      }}
    >
      {children}

      {/* Global Interactive Download CV Modal */}
      <DownloadCvModal isOpen={isCvModalOpen} onClose={closeCvModal} />

      {/* Floating Owner Mode Control Pill (Only rendered for the Portfolio Holder on their browser) */}
      {mounted && isOwner && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500 text-zinc-950 text-xs font-mono font-bold shadow-2xl border border-emerald-400 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-zinc-950 animate-ping" />
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner Mode (Uploads Active)</span>
          </span>
          <button
            onClick={deactivateOwner}
            className="ml-1.5 px-2 py-0.5 rounded-full bg-zinc-950/20 hover:bg-zinc-950 text-zinc-900 hover:text-white transition-colors text-[10px] flex items-center gap-1 font-semibold"
            title="Switch to public recruiter view (hides all upload options)"
          >
            <LogOut className="w-2.5 h-2.5" />
            <span>Preview as Public</span>
          </button>
        </div>
      )}
    </OwnerContext.Provider>
  );
}

export function useOwner() {
  return useContext(OwnerContext);
}

export function useCvModal() {
  const { isCvModalOpen, openCvModal, closeCvModal } = useContext(OwnerContext);
  return { isCvModalOpen, openCvModal, closeCvModal };
}

