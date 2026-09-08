import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public/home-features');

const WIDTH = 1200;
const HEIGHT = 896;

const HTML_WORKFLOW = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: #0f172a;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 28px;
  }
  .main-card {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 28px;
    padding: 38px 46px;
    box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .card-header {
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 55%, #3b82f6 100%);
    border-radius: 22px;
    padding: 28px 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 12px 28px -6px rgba(37, 99, 235, 0.45);
  }
  .header-left {
    color: #ffffff;
  }
  .header-title {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .header-subtitle {
    font-size: 17px;
    font-weight: 500;
    opacity: 0.94;
    margin-top: 6px;
    letter-spacing: -0.01em;
  }
  .header-icon {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    backdrop-filter: blur(10px);
    border: 1.5px solid rgba(255,255,255,0.3);
  }
  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 10px;
  }
  .step-row {
    background: #ffffff;
    border: 2px solid #e2e8f0;
    border-radius: 22px;
    padding: 26px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  }
  .step-left {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    background: #eff6ff;
    border: 1.5px solid #dbeafe;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    flex-shrink: 0;
  }
  .step-texts h4 {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.01em;
  }
  .step-texts p {
    font-size: 15.5px;
    font-weight: 500;
    color: #64748b;
    margin-top: 4px;
  }
  .badge {
    padding: 10px 22px;
    border-radius: 9999px;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .badge-emerald {
    background: #ecfdf5;
    color: #059669;
    border: 1.5px solid #a7f3d0;
  }
  .badge-blue {
    background: #eff6ff;
    color: #2563eb;
    border: 1.5px solid #bfdbfe;
  }
  .badge-indigo {
    background: #f0fdf4;
    color: #16a34a;
    border: 1.5px solid #bbf7d0;
  }
</style>
</head>
<body>
  <div class="main-card">
    <div class="card-header">
      <div class="header-left">
        <div class="header-title">
          <span>NIST CSF 2.0 Compliance Workflow</span>
        </div>
        <div class="header-subtitle">3-Step Automated Verification & Evidence Pipeline</div>
      </div>
      <div class="header-icon">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      </div>
    </div>

    <div class="steps-list">
      <!-- Step 1 -->
      <div class="step-row">
        <div class="step-left">
          <div class="icon-wrapper">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              <path d="M12 13v6"/>
              <path d="m9 16 3 3 3-3"/>
            </svg>
          </div>
          <div class="step-texts">
            <h4>Evidence Validation</h4>
            <p>Automated telemetry sync across AWS, Azure & SaaS APIs</p>
          </div>
        </div>
        <div class="badge badge-emerald">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Auto-Collected</span>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="step-row">
        <div class="step-left">
          <div class="icon-wrapper">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div class="step-texts">
            <h4>Continuous Control Check</h4>
            <p>NIST CSF 2.0 PR.AC-1 Access Control verification active</p>
          </div>
        </div>
        <div class="badge badge-blue">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Passed (100%)</span>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="step-row">
        <div class="step-left">
          <div class="icon-wrapper">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <path d="m9 15 2 2 4-4"/>
            </svg>
          </div>
          <div class="step-texts">
            <h4>Audit Assessment Staging</h4>
            <p>SOC 2 Type II & ISO 27001 evidence packages bundled</p>
          </div>
        </div>
        <div class="badge badge-indigo">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Verified & Defensible</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

const HTML_MOBILE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: #ffffff;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    padding: 24px;
  }
  /* Background Table Container */
  .bg-table-card {
    position: absolute;
    inset: 24px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 28px;
    padding: 38px 48px;
    display: flex;
    flex-direction: column;
  }
  .table-top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .table-title {
    font-size: 26px;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
  }
  .table-subtitle {
    font-size: 15px;
    color: #64748b;
    font-weight: 500;
    margin-top: 3px;
  }
  .table-grid {
    display: flex;
    flex-direction: column;
  }
  .table-header {
    display: flex;
    justify-content: space-between;
    padding: 14px 0;
    border-bottom: 2px solid #e2e8f0;
    color: #475569;
    font-size: 13.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .table-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    border-bottom: 1px solid #e2e8f0;
  }
  .framework-name {
    font-weight: 700;
    font-size: 17px;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .status-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border-radius: 9999px;
    font-size: 13.5px;
    font-weight: 700;
    color: #2563eb;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
  }

  /* Center Stage Container */
  .stage-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  /* Phone Mockup */
  .phone-mockup {
    position: relative;
    z-index: 20;
    width: 360px;
    height: 680px;
    background: #ffffff;
    border-radius: 50px;
    border: 10px solid #0f172a;
    box-shadow: 
      0 35px 80px -10px rgba(0, 0, 0, 0.45),
      0 0 0 2px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 18px 22px 26px 22px;
    display: flex;
    flex-direction: column;
    transform: translateX(-60px);
  }
  .dynamic-island {
    width: 96px;
    height: 24px;
    background: #0f172a;
    border-radius: 20px;
    margin: 0 auto 14px auto;
  }
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: #0f172a;
    padding: 0 10px 12px 10px;
  }
  .phone-header {
    text-align: center;
    margin-bottom: 14px;
  }
  .phone-title {
    font-size: 19px;
    font-weight: 800;
    color: #0f172a;
  }
  .phone-sub {
    font-size: 12.5px;
    color: #64748b;
    font-weight: 500;
    margin-top: 2px;
  }
  .tabs {
    display: flex;
    background: #f1f5f9;
    padding: 4px;
    border-radius: 14px;
    margin-top: 12px;
  }
  .tab-btn {
    flex: 1;
    text-align: center;
    padding: 7px 0;
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
    border-radius: 10px;
  }
  .tab-btn.active {
    background: #ffffff;
    color: #2563eb;
    font-weight: 700;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  }
  /* Bar chart inside phone */
  .chart-card {
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 20px;
    padding: 16px 14px 12px 14px;
    margin-top: 14px;
  }
  .chart-header {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 700;
    color: #475569;
    margin-bottom: 14px;
  }
  .chart-container {
    height: 170px;
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px dashed #cbd5e1;
  }
  .bar-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
  }
  .bar {
    width: 100%;
    border-radius: 4px 4px 0 0;
    background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
  }
  .bar.current {
    background: linear-gradient(180deg, #60a5fa 0%, #1d4ed8 100%);
    box-shadow: 0 0 12px rgba(37, 99, 235, 0.45);
  }
  .chart-labels {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #94a3b8;
    margin-top: 8px;
    font-weight: 600;
  }
  .phone-bottom-badge {
    margin-top: auto;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 16px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .phone-bottom-text {
    font-size: 13px;
    font-weight: 700;
    color: #1e40af;
  }

  /* Floating Stats Card overlapping bottom-right of phone */
  .floating-stat-card {
    position: relative;
    z-index: 30;
    width: 360px;
    background: #ffffff;
    border-radius: 26px;
    padding: 26px 30px;
    box-shadow: 
      0 25px 60px -10px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(0, 0, 0, 0.06);
    border: 2px solid #e2e8f0;
    transform: translate(110px, 90px);
  }
  .stat-card-title {
    font-size: 13px;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 20px;
  }
  .stat-box {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 18px;
  }
  .stat-box:last-child {
    margin-bottom: 0;
  }
  .stat-icon {
    width: 56px;
    height: 56px;
    border-radius: 18px;
    background: #eff6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    border: 1.5px solid #bfdbfe;
    flex-shrink: 0;
  }
  .stat-val {
    font-size: 28px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.1;
  }
  .stat-sub {
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
    margin-top: 3px;
  }
</style>
</head>
<body>
  <!-- Background table -->
  <div class="bg-table-card">
    <div class="table-top-header">
      <div>
        <div class="table-title">GRC Program Command Center</div>
        <div class="table-subtitle">Continuous Multi-Framework Control Health & Audit Readiness</div>
      </div>
      <div class="status-chip">Live Sync Active</div>
    </div>
    <div class="table-grid">
      <div class="table-header">
        <div>Framework Control</div>
        <div>Audit Telemetry</div>
      </div>
      <div class="table-row">
        <div class="framework-name">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          NIST CSF 2.0 (PR.AC-1)
        </div>
        <div><span class="status-chip">Passed ✓</span></div>
      </div>
      <div class="table-row">
        <div class="framework-name">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
          ISO/IEC 27001:2022
        </div>
        <div><span class="status-chip">Passed ✓</span></div>
      </div>
      <div class="table-row">
        <div class="framework-name">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2"><circle cx="12" cy="12" r="10"/></svg>
          SOC 2 Type II Controls
        </div>
        <div><span class="status-chip">Passed ✓</span></div>
      </div>
      <div class="table-row">
        <div class="framework-name">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          HIPAA Safeguards
        </div>
        <div><span class="status-chip">Passed ✓</span></div>
      </div>
    </div>
  </div>

  <!-- Stage with Phone + Floating Card -->
  <div class="stage-overlay">
    <!-- Phone Mockup -->
    <div class="phone-mockup">
      <div class="dynamic-island"></div>
      <div class="status-bar">
        <span>9:41</span>
        <span>5G • 100%</span>
      </div>
      <div class="phone-header">
        <div class="phone-title">Security Posture</div>
        <div class="phone-sub">Real-Time Control Telemetry</div>
        <div class="tabs">
          <div class="tab-btn">Week</div>
          <div class="tab-btn active">Month</div>
          <div class="tab-btn">Year</div>
        </div>
      </div>

      <!-- Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <span>Compliance Index</span>
          <span style="color: #2563eb;">94% Peak</span>
        </div>
        <div class="chart-container">
          <div class="bar-col"><div class="bar" style="height: 40%;"></div></div>
          <div class="bar-col"><div class="bar" style="height: 52%;"></div></div>
          <div class="bar-col"><div class="bar" style="height: 65%;"></div></div>
          <div class="bar-col"><div class="bar" style="height: 78%;"></div></div>
          <div class="bar-col"><div class="bar" style="height: 70%;"></div></div>
          <div class="bar-col"><div class="bar" style="height: 85%;"></div></div>
          <div class="bar-col"><div class="bar" style="height: 90%;"></div></div>
          <div class="bar-col"><div class="bar current" style="height: 94%;"></div></div>
          <div class="bar-col"><div class="bar" style="height: 92%;"></div></div>
        </div>
        <div class="chart-labels">
          <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
        </div>
      </div>

      <div class="phone-bottom-badge">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <div class="phone-bottom-text">Active Telemetry Sync: 100% Healthy</div>
      </div>
    </div>

    <!-- Floating Stats Card -->
    <div class="floating-stat-card">
      <div class="stat-card-title">Track Posture Progress</div>
      <div class="stat-box">
        <div class="stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        </div>
        <div>
          <div class="stat-val">94%</div>
          <div class="stat-sub">Overall Compliance Rate</div>
        </div>
      </div>
      <div class="stat-box">
        <div class="stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M7 8h10"/>
            <path d="M7 12h10"/>
            <path d="M7 16h6"/>
          </svg>
        </div>
        <div>
          <div class="stat-val">106</div>
          <div class="stat-sub">Active Framework Controls</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

const HTML_COMPLIANCE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: #0f172a;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 24px;
  }
  .container-card {
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #2b384e 0%, #162032 100%);
    border-radius: 28px;
    padding: 44px 50px;
    box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.5);
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-banner {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .org-title {
    font-size: 34px;
    font-weight: 800;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 14px;
    letter-spacing: -0.02em;
  }
  .active-pill {
    background: #059669;
    color: #ffffff;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
  .org-meta {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #cbd5e1;
    font-size: 15px;
    font-weight: 500;
  }
  .org-meta span {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .progress-card {
    background: #ffffff;
    border-radius: 22px;
    padding: 22px 28px;
    width: 330px;
    box-shadow: 0 14px 30px -6px rgba(0, 0, 0, 0.3);
  }
  .progress-title {
    font-size: 13px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }
  .progress-stat {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .progress-stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: #eff6ff;
    color: #2563eb;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #bfdbfe;
    flex-shrink: 0;
  }
  .progress-stat-num {
    font-size: 22px;
    font-weight: 800;
    color: #0f172a;
  }
  .progress-stat-sub {
    font-size: 13.5px;
    color: #64748b;
    font-weight: 500;
  }

  /* Cascading floating cards */
  .cascading-stack {
    position: relative;
    height: 440px;
    width: 100%;
  }
  .cascade-card {
    position: absolute;
    background: #ffffff;
    border-radius: 22px;
    padding: 24px 32px;
    box-shadow: 0 20px 45px -8px rgba(0, 0, 0, 0.4);
    border: 2px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cascade-1 {
    top: 20px;
    right: 30px;
    width: 740px;
    z-index: 15;
    opacity: 0.95;
  }
  .cascade-2 {
    top: 130px;
    right: 120px;
    width: 820px;
    z-index: 20;
    opacity: 0.98;
  }
  .cascade-3 {
    top: 240px;
    right: 210px;
    width: 870px;
    z-index: 25;
    box-shadow: 0 28px 60px -10px rgba(0, 0, 0, 0.55);
    border: 2.5px solid #bfdbfe;
  }
  .cascade-left {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .check-box {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: #2563eb;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .cascade-text {
    font-size: 18.5px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.01em;
  }
  .cascade-badge {
    padding: 9px 20px;
    border-radius: 9999px;
    font-size: 14.5px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .badge-valid {
    background: #eff6ff;
    color: #2563eb;
    border: 1.5px solid #bfdbfe;
  }
  .badge-ready {
    background: #ecfdf5;
    color: #059669;
    border: 1.5px solid #a7f3d0;
  }
</style>
</head>
<body>
  <div class="container-card">
    <div class="top-banner">
      <div>
        <div class="org-title">
          <span>Enterprise Audit Staging</span>
          <span class="active-pill">Audit Ready</span>
        </div>
        <div class="org-meta">
          <span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Scope: SOC 2 Type II & ISO 27001 Multi-Framework
          </span>
          <span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            Next External Review: Oct 2025 (100% Defensible Evidence)
          </span>
        </div>
      </div>

      <div class="progress-card">
        <div class="progress-title">Track Audit Progress</div>
        <div class="progress-stat">
          <div class="progress-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          </div>
          <div>
            <div class="progress-stat-num">98% Complete</div>
            <div class="progress-stat-sub">14 Evidence Packs Ready</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cascading Stack -->
    <div class="cascading-stack">
      <div class="cascade-card cascade-1">
        <div class="cascade-left">
          <div class="check-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="cascade-text">AWS CloudTrail Multi-Region Encryption Policy Verified</div>
        </div>
        <div class="cascade-badge badge-valid">
          <span>• Validated</span>
        </div>
      </div>

      <div class="cascade-card cascade-2">
        <div class="cascade-left">
          <div class="check-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="cascade-text">Okta Adaptive MFA Enforcement Configuration Validated</div>
        </div>
        <div class="cascade-badge badge-valid">
          <span>• Validated</span>
        </div>
      </div>

      <div class="cascade-card cascade-3">
        <div class="cascade-left">
          <div class="check-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="cascade-text">ISO 27001 & SOC 2 Export-Ready Audit Evidence Bundle</div>
        </div>
        <div class="cascade-badge badge-ready">
          <span>• Export Ready</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

async function renderMockups() {
  console.log('Launching browser for mockup generation...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  const items = [
    { html: HTML_WORKFLOW, file: 'workflow-mockup.png' },
    { html: HTML_MOBILE, file: 'mobile-mockup.png' },
    { html: HTML_COMPLIANCE, file: 'compliance-mockup.png' },
  ];

  for (const item of items) {
    console.log(`Rendering ${item.file}...`);
    await page.setContent(item.html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);

    const outPath = path.join(OUTPUT_DIR, item.file);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`Saved ${outPath}`);
  }

  await browser.close();
  console.log('All mockups rendered successfully!');
}

renderMockups().catch(err => {
  console.error('Error rendering mockups:', err);
  process.exit(1);
});
