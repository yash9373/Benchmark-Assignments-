import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import api from "../servises/api";

interface CompanyState {
  companies: any[];
  setCompanies: (companies: any[]) => void;
  addCompany: (company: any) => void;
}

const useCompanyStore = create<CompanyState>((set) => ({
  companies: [],

  setCompanies: (companies) => set({ companies }),

  addCompany: (company) =>
    set((state) => ({ companies: [...state.companies, company] })),
}));

export default useCompanyStore;
