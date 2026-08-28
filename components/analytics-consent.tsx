"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  captureMinimalPageview,
  ensurePostHogStarted,
  posthog,
  POSTHOG_CONSENT_STORAGE_KEY,
  POSTHOG_PROJECT_TOKEN,
  type PostHogConsentChoice,
} from "../lib/posthog-config";

function readConsentChoice(): PostHogConsentChoice | null {
  try {
    const value = globalThis.localStorage?.getItem(POSTHOG_CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

const CONSENT_CHANGE_EVENT = "synqlayer-posthog-consent-change";

function subscribeToConsentChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  };
}

function getServerConsentSnapshot() {
  return null;
}

function applyConsentChoice(consent: PostHogConsentChoice) {
  if (!ensurePostHogStarted()) {
    return;
  }

  if (consent === "accepted") {
    posthog.opt_in_capturing({ captureEventName: false });
  } else {
    posthog.opt_out_capturing();
  }

  captureMinimalPageview(consent);
}

export function AnalyticsConsent() {
  const choice = useSyncExternalStore(
    subscribeToConsentChanges,
    readConsentChoice,
    getServerConsentSnapshot,
  );

  useEffect(() => {
    if (POSTHOG_PROJECT_TOKEN && choice) {
      applyConsentChoice(choice);
    }
  }, [choice]);

  function chooseAnalytics(consent: PostHogConsentChoice) {
    window.localStorage.setItem(POSTHOG_CONSENT_STORAGE_KEY, consent);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }

  if (choice || !POSTHOG_PROJECT_TOKEN) {
    return null;
  }

  return (
    <section
      aria-label="Privacyvriendelijke analytics keuze"
      style={{
        position: "fixed",
        right: "clamp(12px, 4vw, 24px)",
        bottom: "clamp(12px, 4vw, 24px)",
        left: "clamp(12px, 4vw, auto)",
        zIndex: 50,
        maxWidth: 460,
        borderRadius: 16,
        border: "1px solid rgba(255, 255, 255, 0.35)",
        background: "rgba(13, 23, 42, 0.96)",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
        color: "white",
        padding: 18,
      }}
    >
      <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 8px" }}>
        Privacyvriendelijke analytics
      </h2>
      <p style={{ fontSize: "0.92rem", lineHeight: 1.45, margin: "0 0 14px" }}>
        We meten alleen minimale paginaweergaven om deze pilot te verbeteren. Geen
        persoonlijke profielen, replay, heatmaps of advertentietracking.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <button
          type="button"
          onClick={() => chooseAnalytics("rejected")}
          style={{
            flex: "1 1 160px",
            borderRadius: 999,
            border: "1px solid rgba(255, 255, 255, 0.6)",
            background: "transparent",
            color: "white",
            cursor: "pointer",
            fontWeight: 700,
            padding: "10px 14px",
          }}
        >
          Weigeren
        </button>
        <button
          type="button"
          onClick={() => chooseAnalytics("accepted")}
          style={{
            flex: "1 1 160px",
            borderRadius: 999,
            border: "1px solid #ffb65c",
            background: "#ffb65c",
            color: "#0d172a",
            cursor: "pointer",
            fontWeight: 700,
            padding: "10px 14px",
          }}
        >
          Accepteren
        </button>
      </div>
    </section>
  );
}
