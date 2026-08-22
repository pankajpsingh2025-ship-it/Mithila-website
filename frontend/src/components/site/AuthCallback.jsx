import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authSession } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
export const AuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = window.location.hash || "";
    const match = hash.match(/session_id=([^&]+)/);
    const sessionId = match ? decodeURIComponent(match[1]) : null;

    const finish = (target) => {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      navigate(target, { replace: true });
    };

    if (!sessionId) { finish("/"); return; }

    (async () => {
      try {
        const u = await authSession(sessionId);
        setUser(u);
        finish("/");
      } catch {
        finish("/");
      }
    })();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen grid place-items-center bg-creamlight text-maroon">
      <div className="flex items-center gap-3 text-sm">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-maroon/30 border-t-maroon" />
        Signing you in…
      </div>
    </div>
  );
};
