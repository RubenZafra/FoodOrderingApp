import { supabase } from "@/src/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface Profile {
  avatar_url: string | null;
  full_name: string | null;
  id: string | null;
  group: string;
  updated_at: string | null;
  username: string | null;
  website: string | null;
}
interface SessionStore {
  session: Session | null;
  loading: boolean;
  fetchSession: () => Promise<void>;
  isAdmin: boolean;
  profile: Profile | null;
}

const useSessionStore = create<SessionStore>()((set, get) => ({
  session: null,
  loading: true,
  isAdmin: false,
  profile: null,
  fetchSession: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      set((state) => ({
        ...state,
        isAdmin: data?.group === "admin",
        profile: data || null,
        session,
        loading: false,
      }));
    }
  },
}));

export default useSessionStore;
