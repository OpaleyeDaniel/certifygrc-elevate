import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { defaultWaitlistPopupConfig, type WaitlistPopupConfig } from "@/config/waitlistPopup";

export type UseWaitlistPopupResult = {
  open: boolean;
  setOpen: (open: boolean) => void;
  recordDismiss: () => void;
};

function msSinceDismiss(lastDismissedAt: number | null, now: number): number {
  if (lastDismissedAt == null) return Number.POSITIVE_INFINITY;
  return now - lastDismissedAt;
}

/**
 * Waitlist modal orchestration:
 * - Opens once per eligible route visit after `initialDelayMs` (including full page refresh).
 * - After dismiss: respects cooldown, then may reopen via repeat timer or dwell polling while the tab stays visible.
 * - Timers cleared on unmount / excluded routes (no leaks).
 */
export function useWaitlistPopup(config: WaitlistPopupConfig = defaultWaitlistPopupConfig): UseWaitlistPopupResult {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const openRef = useRef(open);
  openRef.current = open;

  const initialTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dwellIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initialQueuedRef = useRef(false);
  const lastDismissedAtRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (initialTimerRef.current != null) {
      clearTimeout(initialTimerRef.current);
      initialTimerRef.current = null;
    }
    if (repeatTimerRef.current != null) {
      clearTimeout(repeatTimerRef.current);
      repeatTimerRef.current = null;
    }
    if (dwellIntervalRef.current != null) {
      clearInterval(dwellIntervalRef.current);
      dwellIntervalRef.current = null;
    }
  }, []);

  const isPathExcluded = useCallback(() => {
    return config.excludePathnames.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  }, [config.excludePathnames, pathname]);

  const cooldownMs = Math.max(config.cooldownAfterDismissMs, config.minRepeatIntervalMs);

  const tryAutoOpen = useCallback(() => {
    if (isPathExcluded()) return;
    if (openRef.current) return;
    const now = Date.now();
    if (msSinceDismiss(lastDismissedAtRef.current, now) < cooldownMs) return;
    setOpen(true);
  }, [cooldownMs, isPathExcluded]);

  const scheduleInitialOpen = useCallback(() => {
    if (initialTimerRef.current != null) return;
    const id = window.setTimeout(() => {
      initialTimerRef.current = null;
      tryAutoOpen();
    }, config.initialDelayMs);
    initialTimerRef.current = id;
  }, [config.initialDelayMs, tryAutoOpen]);

  const scheduleRepeatOpen = useCallback(() => {
    if (repeatTimerRef.current != null) return;
    const id = window.setTimeout(() => {
      repeatTimerRef.current = null;
      tryAutoOpen();
    }, cooldownMs);
    repeatTimerRef.current = id;
  }, [cooldownMs, tryAutoOpen]);

  const ensureDwellPolling = useCallback(() => {
    if (config.dwellRetriggerMs <= 0) return;
    if (dwellIntervalRef.current != null) return;
    dwellIntervalRef.current = window.setInterval(() => {
      if (isPathExcluded()) return;
      if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
      tryAutoOpen();
    }, config.dwellRetriggerMs);
  }, [config.dwellRetriggerMs, isPathExcluded, tryAutoOpen]);

  const recordDismiss = useCallback(() => {
    lastDismissedAtRef.current = Date.now();
    setOpen(false);
    scheduleRepeatOpen();
  }, [scheduleRepeatOpen]);

  const setOpenWrapped = useCallback(
    (next: boolean) => {
      if (!next) {
        recordDismiss();
      } else {
        setOpen(true);
      }
    },
    [recordDismiss],
  );

  useEffect(() => {
    if (isPathExcluded()) {
      clearTimers();
      setOpen(false);
      initialQueuedRef.current = false;
      return;
    }

    if (!initialQueuedRef.current) {
      initialQueuedRef.current = true;
      scheduleInitialOpen();
    }

    ensureDwellPolling();
  }, [pathname, isPathExcluded, clearTimers, scheduleInitialOpen, ensureDwellPolling]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return { open, setOpen: setOpenWrapped, recordDismiss };
}
