import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

interface SessionStore {
  session: Session | null;
  setSession: (session: Session | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useSessionStore = create<SessionStore>()((set, get) => ({
  session: null,
  setSession: (session) => {
    set((state) => ({
      session,
    }));
  },
  loading: true,
  setLoading: (loading) => {
    set((state) => ({
      loading,
    }));
  },
}));

export default useSessionStore;
