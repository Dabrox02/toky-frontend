import { createClient } from "@/utils/supabase/client";
import { createContext, useEffect, useState } from "react";

const SessionContext = createContext(null);
const supabase = createClient();

const SessionProvider = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={session}>
      <App />
    </SessionContext.Provider>
  );
};
