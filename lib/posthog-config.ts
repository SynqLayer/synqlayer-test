import posthog from "posthog-js";
import type { CaptureResult, Properties } from "posthog-js";

export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";
export const POSTHOG_PROJECT_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || "";

export const POSTHOG_CONSENT_STORAGE_KEY = "synqlayer_posthog_consent";

export type PostHogConsentChoice = "accepted" | "rejected";

const URL_PROPERTY_KEYS = [
  "$current_url",
  "$referrer",
  "$session_entry_url",
  "$session_entry_referrer",
  "$initial_current_url",
  "$initial_referrer",
  "$initial_session_entry_url",
  "$initial_session_entry_referrer",
] as const;

const ATTRIBUTION_PROPERTY_NAMES = new Set([
  "gad_source",
  "mc_cid",
  "gclid",
  "gclsrc",
  "dclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "twclid",
  "li_fat_id",
  "igshid",
  "ttclid",
  "rdt_cid",
  "epik",
  "qclid",
  "sccid",
  "irclid",
  "_kx",
  "ph_keyword",
  "search_engine",
]);

function sanitizeUrlValue(value: unknown) {
  if (typeof value !== "string" || value === "$direct" || value.trim() === "") {
    return value;
  }

  try {
    const parsed = new URL(value, typeof window !== "undefined" ? window.location.origin : undefined);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return undefined;
  }
}

function normalizePropertyName(key: string) {
  return key
    .replace(/^\$session_entry_/, "")
    .replace(/^\$initial_/, "")
    .replace(/^\$/, "");
}

function isAttributionProperty(key: string) {
  const normalized = normalizePropertyName(key);
  return normalized.startsWith("utm_") || ATTRIBUTION_PROPERTY_NAMES.has(normalized);
}

function sanitizePropertyObject(properties: Properties) {
  for (const key of URL_PROPERTY_KEYS) {
    if (!(key in properties)) {
      continue;
    }

    const sanitized = sanitizeUrlValue(properties[key]);
    if (typeof sanitized === "undefined") {
      delete properties[key];
    } else {
      properties[key] = sanitized;
    }
  }

  for (const key of Object.keys(properties)) {
    if (isAttributionProperty(key)) {
      delete properties[key];
    }
  }
}

function sanitizeNestedProperties(value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    sanitizePropertyObject(value as Properties);
  }
}

export function sanitizePostHogEvent(captureResult: CaptureResult | null) {
  if (!captureResult || captureResult.event !== "$pageview") {
    return null;
  }

  if (captureResult.properties) {
    sanitizePropertyObject(captureResult.properties);
    sanitizeNestedProperties(captureResult.properties.$set);
    sanitizeNestedProperties(captureResult.properties.$set_once);
  }

  return captureResult;
}

export const posthogClientOptions = {
  api_host: POSTHOG_HOST,
  defaults: "2026-05-30",
  cookieless_mode: "on_reject",
  person_profiles: "never",
  autocapture: false,
  capture_pageview: false,
  capture_pageleave: false,
  request_batching: false,
  disable_session_recording: true,
  capture_performance: false,
  capture_heatmaps: false,
  capture_dead_clicks: false,
  capture_exceptions: false,
  disable_surveys: true,
  disable_surveys_automatic_display: true,
  disable_external_dependency_loading: true,
  advanced_disable_flags: true,
  disable_capture_url_hashes: true,
  mask_personal_data_properties: true,
  mask_all_text: true,
  mask_all_element_attributes: true,
  save_campaign_params: false,
  save_referrer: false,
  before_send: sanitizePostHogEvent,
} as const;

let posthogStarted = false;
let lastCapturedPageviewKey: string | null = null;

export function ensurePostHogStarted() {
  if (posthogStarted || !POSTHOG_PROJECT_TOKEN) {
    return posthogStarted;
  }

  posthog.init(POSTHOG_PROJECT_TOKEN, posthogClientOptions);
  posthogStarted = true;
  return true;
}

export function captureMinimalPageview(consent: PostHogConsentChoice) {
  if (typeof window === "undefined" || !ensurePostHogStarted()) {
    return;
  }

  const pagePath = window.location.pathname;
  const pageviewKey = `${consent}:${pagePath}`;
  if (lastCapturedPageviewKey === pageviewKey) {
    return;
  }

  lastCapturedPageviewKey = pageviewKey;
  posthog.capture("$pageview", {
    $current_url: `${window.location.origin}${pagePath}`,
  });
}

export { posthog };
