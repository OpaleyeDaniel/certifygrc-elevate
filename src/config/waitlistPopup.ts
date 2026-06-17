/**
 * Waitlist auto-popup timing — tune without touching hook logic.
 */
export type WaitlistPopupConfig = {
  /** Time after landing on an allowed route before the first open (ms). */
  initialDelayMs: number;
  /**
   * After the user closes the modal, wait this long before it may open again
   * (repeat timer + dwell checks).
   */
  cooldownAfterDismissMs: number;
  /**
   * Floor between automatic opens while browsing (ms). Usually matches cooldown.
   */
  minRepeatIntervalMs: number;
  /** Do not auto-show on these pathnames (e.g. pages with heavy forms). */
  excludePathnames: string[];
  /**
   * While the tab is visible, periodically try to open the modal again after cooldown.
   * Set to 0 to disable.
   */
  dwellRetriggerMs: number;
};

export const defaultWaitlistPopupConfig: WaitlistPopupConfig = {
  initialDelayMs: 2_000,
  cooldownAfterDismissMs: 7 * 60 * 1_000,
  minRepeatIntervalMs: 7 * 60 * 1_000,
  excludePathnames: ["/early-access", "/contact", "/partner"],
  /** ~10 minutes — feels present without hammering active readers. */
  dwellRetriggerMs: 10 * 60 * 1_000,
};
