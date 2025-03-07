import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface CompanyState {
  companies: any[];
  setCompanies: (companies: any[]) => void;
  addCompany: (company: any) => void;
}

const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      companies: [],

      setCompanies: (companies) => set({ companies }),

      addCompany: (company) =>
        set((state) => ({ companies: [...state.companies, company] })),
    }),
    { name: "company-storage" } as PersistOptions<CompanyState>
  )
);

export default useCompanyStore;
