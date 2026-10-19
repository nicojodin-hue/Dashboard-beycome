<?php
// phpcs:ignoreFile
session_start();
if (empty($_SESSION['ir_auth'])) { header('Location: /'); exit; }

if (false) {
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Beycome Investor Report</title>
  <style>
    /* Roboto — self-hosted */
    @font-face { font-family:Roboto; font-style:normal; font-weight:400; font-display:swap; src:url('/assets/roboto-400.woff2') format('woff2'); }
    @font-face { font-family:Roboto; font-style:normal; font-weight:600; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }
    @font-face { font-family:Roboto; font-style:normal; font-weight:700; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Roboto, "Segoe UI", "Helvetica Neue", sans-serif;
      background: #fefefe;
      color: #1a1f4d;
    }
    .pw-card {
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 22px 60px rgba(21, 25, 70, 0.13);
      padding: 44px 40px 36px;
      width: 100%;
      max-width: 380px;
      text-align: center;
    }
    .pw-logo {
      width: 130px;
      margin: 0 auto 28px;
      display: block;
    }
    .pw-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 6px;
      letter-spacing: -0.01em;
    }
    .pw-sub {
      font-size: 14px;
      color: #5a627a;
      margin-bottom: 28px;
    }
    .pw-input {
      width: 100%;
      padding: 11px 14px;
      border: 1.5px solid #d5d8f0;
      border-radius: 10px;
      font-size: 15px;
      font-family: inherit;
      color: #1a1f4d;
      outline: none;
      transition: border-color 0.18s;
      margin-bottom: 14px;
    }
    .pw-input:focus { border-color: #7d8ff7; }
    .pw-input.error { border-color: #b42318; }
    .pw-error {
      font-size: 13px;
      color: #b42318;
      margin-bottom: 14px;
      display: <?php echo $error ? 'block' : 'none'; ?>;
    }
    .pw-btn {
      width: 100%;
      padding: 12px;
      background: #7d8ff7;
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: background 0.18s, transform 0.14s;
    }
    .pw-btn:hover { background: #6b7de6; transform: translateY(-1px); }
    .pw-btn:active { transform: translateY(0); }
  </style>
</head>
<body>
  <div class="pw-card">
    <img src="/assets/logo.svg" alt="Beycome" class="pw-logo">
    <div class="pw-title">Investor Report</div>
    <div class="pw-sub">Enter the password to continue</div>
    <form method="POST" action="" autocomplete="off">
      <input
        class="pw-input<?php echo $error ? ' error' : ''; ?>"
        type="password"
        name="password"
        placeholder="Password"
        autofocus
        required
      >
      <div class="pw-error">Incorrect password. Please try again.</div>
      <button class="pw-btn" type="submit">Continue</button>
    </form>
  </div>
</body>
</html>
<?php
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Beycome Investor Report | Feb 2026</title>
  <meta name="description" content="Beycome Investor Report - February 2026">
  <style>
    @font-face { font-family:Roboto; font-style:normal; font-weight:400; font-display:swap; src:url('/assets/roboto-400.woff2') format('woff2'); }
    @font-face { font-family:Roboto; font-style:normal; font-weight:600; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }
    @font-face { font-family:Roboto; font-style:normal; font-weight:700; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }

    :root {
      --c-bg: #fefefe;
      --c-surface: #ffffff;
      --c-ink: #1a1f4d;
      --c-ink-soft: #5a627a;
      --c-border: #d5d8f0;
      --c-accent: #7d8ff7;
      --c-accent-soft: #e5eaff;
      --c-negative: #bb4b43;
      --c-positive: #43bb4d;
      --shadow-lg: 0 22px 60px rgba(21, 25, 70, 0.12);
      --shadow-sm: 0 8px 24px rgba(21, 25, 70, 0.08);
      --radius-xl: 22px;
      --radius-lg: 16px;
      --radius-md: 12px;
      --radius-sm: 10px;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      font-family: Roboto, "Segoe UI", "Helvetica Neue", sans-serif;
      background: radial-gradient(circle at 10% 10%, #e2e4ff 0%, #f5f5ff 42%), linear-gradient(180deg, #f7f8ff 0%, #eceeff 100%);
      color: var(--c-ink);
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }

    .ir-header {
      position: sticky;
      top: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 14px 24px;
      box-shadow: 0 2px 12px rgba(21, 25, 70, 0.1);
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: saturate(160%) blur(14px);
    }

    .ir-header-left {
      display: flex;
      align-items: center;
      min-width: 0;
      gap: 14px;
    }

    .ir-header-logo {
      width: 124px;
      height: auto;
      display: block;
    }

    .ir-header-divider {
      width: 1px;
      height: 22px;
      background: var(--c-border);
      flex-shrink: 0;
    }

    .ir-header-title {
      font-size: 14px;
      letter-spacing: 0.02em;
      color: var(--c-ink-soft);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .ir-header-exit {
      border: 1px solid #c5c9ee;
      background: #ffffff;
      color: var(--c-ink);
      border-radius: 999px;
      padding: 8px 14px;
      font-weight: 600;
      font-size: 14px;
      font-family: inherit;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;
      flex-shrink: 0;
    }

    .ir-header-exit:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
      border-color: #9098d4;
    }

    .ir-page {
      max-width: 1080px;
      margin: 0 auto;
      padding: 28px 20px 64px;
    }

    .ir-hero {
      border-radius: var(--radius-xl);
      padding: 42px 34px;
      background: linear-gradient(160deg, #8c8cf0 0%, #2d3a8c 58%, #4a5bc7 100%);
      box-shadow: var(--shadow-lg);
      color: #fff;
      margin-bottom: 26px;
    }

    .ir-hero-label {
      display: inline-flex;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.14);
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 14px;
    }

    .ir-hero-title {
      margin: 0;
      font-size: clamp(28px, 4vw, 46px);
      line-height: 1.08;
      text-wrap: balance;
    }

    .ir-hero-subtitle {
      margin-top: 14px;
      font-size: clamp(15px, 1.8vw, 19px);
      line-height: 1.45;
      color: rgba(238, 240, 255, 0.9);
      max-width: 860px;
    }

    .ir-section {
      background: var(--c-surface);
      border-radius: var(--radius-xl);
      padding: 42px 34px;
      box-shadow: var(--shadow-sm);
      margin-bottom: 22px;
    }

    .ir-section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 30px;
    }

    .ir-section-number {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      background: var(--c-accent-soft);
      color: var(--c-accent);
      font-weight: 700;
      font-size: 15px;
    }

    .ir-section-title {
      margin: 0;
      font-size: clamp(22px, 3vw, 30px);
      letter-spacing: -0.015em;
    }

    .ir-subsection-title {
      margin: 32px 0 12px;
      font-size: 15px;
      color: var(--c-ink-soft);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.09em;
    }

    .ir-text {
      margin: 0 0 14px;
      color: #2f2f5a;
      font-size: 16px;
      line-height: 1.68;
    }

    .ir-yoy-banner {
      margin: 30px 0;
      border-radius: var(--radius-lg);
      border: 1px solid #c5cbf9;
      background: linear-gradient(120deg, #e8eaff 0%, #f5f6ff 100%);
      padding: 18px;
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .ir-yoy-value {
      font-size: clamp(28px, 3vw, 40px);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.03em;
    }

    .ir-yoy-label {
      font-size: 15px;
      font-weight: 700;
      color: var(--c-ink);
    }

    .ir-yoy-sub {
      margin-top: 4px;
      color: var(--c-ink-soft);
      font-size: 13px;
    }

    .ir-note {
      border-left: 4px solid #a5aef9;
      background: #f0f1ff;
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      padding: 14px 16px;
      font-size: 14px;
      color: #24245c;
      line-height: 1.55;
      margin: 16px 0;
    }

    .ir-note--warning {
      border-left-color: #f59e0b;
      background: #fffaeb;
      color: #6e4d00;
    }

    .ir-grid-title {
      font-size: 14px;
      margin: 20px 0;
    }

    .ir-kpi-grid,
    .ir-revenue-grid,
    .ir-daily-grid,
    .ir-health-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 22px;
      margin: 0 0 30px;
    }

    .ir-kpi-card,
    .ir-revenue-card,
    .ir-health-card {
      border: 1px solid var(--c-border);
      border-radius: var(--radius-md);
      background: #ffffff;
      padding: 15px;
      min-height: 108px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .ir-kpi-value,
    .ir-revenue-value,
    .ir-health-value {
      font-size: clamp(23px, 2.1vw, 31px);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #19195a;
      line-height: 1.05;
    }

    .ir-kpi-label,
    .ir-revenue-label,
    .ir-health-label {
      margin-top: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #27274a;
      opacity: 0.6;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .ir-kpi-sub,
    .ir-revenue-sub,
    .ir-health-sub {
      margin-top: 6px;
      font-size: 12px;
      color: var(--c-ink-soft);
      font-weight: bold;
      letter-spacing: 0.02em
    }

    .positive {
      color: var(--c-positive);
    }

    .negative {
      color: var(--c-negative);
    }

    .ir-table-wrap {
      margin: 8px 0 22px;
      overflow-x: auto;
      border: 1px solid var(--c-border);
      border-radius: var(--radius-md);
    }

    .ir-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 640px;
      background: #ffffff;
    }

    .ir-table thead th {
      background: #f5f5ff;
      color: #24244a;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-weight: 700;
      text-align: right;
      padding: 12px 14px;
      border-bottom: 1px solid var(--c-border);
    }

    .ir-table thead th:first-child,
    .ir-table tbody td:first-child {
      text-align: left;
      width: 46%;
    }

    .ir-table tbody td {
      padding: 11px 14px;
      border-bottom: 1px solid #ededfc;
      font-size: 14px;
      text-align: right;
      color: #1e1e46;
    }

    .ir-table tbody tr.bold td {
      font-weight: 700;
      background: #f9f9ff;
    }

    .ir-table tbody tr.total td {
      font-weight: 700;
      color: #7a271a;
      background: #fff6f5;
    }

    .ir-table tbody tr:last-child td {
      border-bottom: none;
    }

    .ir-closing-note {
      margin-top: 8px;
      border-radius: var(--radius-md);
      border: 1px solid #c8cbf0;
      padding: 16px;
      color: #2e2e5c;
      line-height: 1.65;
      background: #f7f7ff;
    }

    .ir-signoff {
      margin-top: 10px;
      border: 1px solid var(--c-border);
      border-radius: var(--radius-xl);
      padding: 26px;
      background: linear-gradient(180deg, #ffffff 0%, #f8f8ff 100%);
      color: #21215a;
    }

    .ir-signoff p {
      margin: 0 0 12px;
      line-height: 1.65;
    }

    .ir-signoff-team,
    .ir-signoff-names {
      font-weight: 700;
      margin-bottom: 4px;
    }

    @media (min-width: 900px) {
      .ir-kpi-grid,
      .ir-revenue-grid,
      .ir-daily-grid,
      .ir-health-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    @media (max-width: 720px) {
      .ir-header {
        padding: 12px 14px;
      }

      .ir-header-logo {
        width: 108px;
      }

      .ir-header-divider,
      .ir-header-title {
        display: none;
      }

      .ir-header-exit {
        padding: 7px 10px;
        font-size: 13px;
      }

      .ir-page {
        padding: 14px 12px 50px;
      }

      .ir-hero,
      .ir-section,
      .ir-signoff {
        border-radius: 14px;
        padding: 18px;
      }
    }

    @media print {
      html, body { background: #fff !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      #investor-report-container { position: static !important; overflow: visible !important; }
      .ir-header { position: static !important; box-shadow: none !important; backdrop-filter: none !important; background: #fff !important; padding: 10px 20px !important; }
      .ir-header-exit, .ir-print-btn { display: none !important; }
      .ir-page { padding: 0 10px !important; max-width: 100% !important; }
      .ir-hero { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; padding: 24px 28px !important; margin-bottom: 12px !important; }
      .ir-section { box-shadow: none !important; border: 1px solid #e0e0e0; padding: 20px 24px !important; margin-bottom: 10px !important; }
      .ir-section-header { margin-bottom: 14px !important; }
      .ir-signoff { box-shadow: none !important; padding: 16px 20px !important; margin-top: 6px !important; }
      .ir-kpi-grid, .ir-revenue-grid, .ir-daily-grid, .ir-health-grid { gap: 10px !important; margin-bottom: 14px !important; grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
      .ir-kpi-card, .ir-revenue-card, .ir-health-card { min-height: auto !important; padding: 10px 12px !important; }
      .ir-kpi-value, .ir-revenue-value, .ir-health-value { font-size: 20px !important; }
      .ir-table { min-width: auto !important; font-size: 12px !important; }
      .ir-table thead th { padding: 8px 10px !important; font-size: 11px !important; }
      .ir-table tbody td { padding: 7px 10px !important; font-size: 12px !important; }
      .ir-table-wrap { margin: 6px 0 12px !important; }
      .ir-text { font-size: 14px !important; margin-bottom: 8px !important; line-height: 1.5 !important; }
      .ir-note { padding: 10px 12px !important; margin: 8px 0 !important; font-size: 12px !important; }
      .ir-subsection-title { margin: 16px 0 8px !important; font-size: 13px !important; }
      .ir-grid-title { margin: 10px 0 !important; font-size: 13px !important; }
      .ir-yoy-banner { margin: 14px 0 !important; padding: 12px !important; }
      .ir-section-title { font-size: 22px !important; }
      .ir-hero-title { font-size: 32px !important; }
      a { color: inherit !important; text-decoration: none !important; }
      .ir-section, .ir-hero, .ir-signoff, .ir-note, .ir-table-wrap { break-inside: auto; }
      .ir-section-header, .ir-kpi-card, .ir-revenue-card, .ir-health-card { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div id="investor-report-container" style="display: block; position: fixed; inset: 0px; z-index: 2000; background: var(--c-bg); overflow-y: auto;">
    <div class="ir-header">
      <div class="ir-header-left">
        <img src="/assets/logo.svg" alt="Beycome" class="ir-header-logo">
        <div class="ir-header-divider"></div>
        <span class="ir-header-title">Investor Report | Feb 2026</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <button onclick="window.print()" class="ir-header-exit ir-print-btn" style="color:var(--c-accent)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print / PDF
        </button>
        <a class="ir-header-exit" href="/" aria-label="Back to reports">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Back
        </a>
      </div>
    </div>

    <div class="ir-page">
      <div class="ir-hero">
        <div class="ir-hero-label">Investor Report</div>
        <h1 class="ir-hero-title">Beycome | February 2026</h1>
        <div class="ir-hero-subtitle">You + AI Guidance — Save up to 6% when selling and up to 2% when buying</div>
      </div>

      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">01</span>
          <h2 class="ir-section-title">Executive Summary</h2>
        </div>

        <div class="ir-subsection-title">Overview</div>
        <p class="ir-text">Revenue was $155,971 in February, down 9.9% from $173,148 in January. The decline is largely attributable to the shorter month - February had 28 calendar days versus 31 in January, representing 3 fewer days of revenue generation. Comparing the first 28 days of each month, February revenue was approximately 18% higher than January over the same period, indicating that underlying demand continued to trend upward.</p>
        <p class="ir-text">Platform traffic reached 96,000 engaged visitors, up 50% from 64,000 in January, driven by organic and SEO gains deployed in late 2025. New listing clients were broadly flat at 812 versus 832 in January. Revenue mix continued to shift toward higher-value products: Enhanced Listing revenue increased 32.5% MoM and Concierge was up 27.3%, reflecting improved monetization per customer.</p>
        <p class="ir-text">Gross margin was 87%, in line with January. OpEx increased in the period, led by a planned ramp-up in Sales &amp; Marketing (+28.8%) to capture the growing traffic base. Net loss was ($92,370) versus ($47,494) in January, driven by the combination of a shorter revenue month and higher marketing investment. Cash on hand was $2.03M as of February 28, representing an estimated runway of 29 months.</p>

        <div class="ir-yoy-banner">
          <div class="ir-yoy-value">+34.5%</div>
          <div class="ir-yoy-detail">
            <div class="ir-yoy-label">Revenue Growth</div>
            <div class="ir-yoy-sub">Feb 2026 vs Feb 2025</div>
          </div>
        </div>

        <div class="ir-note ir-note--warning">Important note for partners: Since January 29, 2026, new MLS and state-level regulations have prohibited the listing of wholesale and double-closing transactions on Beycome across most U.S. states. This change has generated a temporary increase in refund activity ($7,518 in February vs. $4,583 in January). Despite the fact that we did not anticipate this immediate change, we have already shifted our target to B2C.</div>

        <div class="ir-subsection-title">Key Performance Indicators</div>
        <div class="ir-grid-title">Marketplace</div>
        <div class="ir-kpi-grid">
          <div class="ir-kpi-card">
            <div class="ir-kpi-value">812</div>
            <div class="ir-kpi-label">New Listing Clients</div>
            <div class="ir-kpi-sub negative">-2.4% vs Jan</div>
          </div>
          <div class="ir-kpi-card">
            <div class="ir-kpi-value">748</div>
            <div class="ir-kpi-label">Basic Listings</div>
            <div class="ir-kpi-sub">Feb 2026</div>
          </div>
          <div class="ir-kpi-card">
            <div class="ir-kpi-value">50</div>
            <div class="ir-kpi-label">Enhanced Listings</div>
            <div class="ir-kpi-sub">Feb 2026</div>
          </div>
          <div class="ir-kpi-card">
            <div class="ir-kpi-value">96K</div>
            <div class="ir-kpi-label">Engaged Visitors</div>
            <div class="ir-kpi-sub positive">+50% vs Jan</div>
          </div>
          <div class="ir-kpi-card">
            <div class="ir-kpi-value">$7,518</div>
            <div class="ir-kpi-label">Refunds (Feb)</div>
            <div class="ir-kpi-sub positive">+64% vs Jan</div>
          </div>
          <div class="ir-kpi-card">
            <div class="ir-kpi-value">28</div>
            <div class="ir-kpi-label">Calendar Days</div>
            <div class="ir-kpi-sub">vs 31 in Jan</div>
          </div>
        </div>

        <div class="ir-grid-title">Revenue Breakdown</div>
        <div class="ir-revenue-grid">
          <div class="ir-revenue-card">
            <div class="ir-revenue-value">$75.6K</div>
            <div class="ir-revenue-label">Basic Listing</div>
            <div class="ir-revenue-sub negative">-2.1% vs Jan</div>
          </div>
          <div class="ir-revenue-card">
            <div class="ir-revenue-value">$21.1K</div>
            <div class="ir-revenue-label">Enhanced Listing</div>
            <div class="ir-revenue-sub positive">+32.5% vs Jan</div>
          </div>
          <div class="ir-revenue-card">
            <div class="ir-revenue-value">$15.3K</div>
            <div class="ir-revenue-label">Concierge</div>
            <div class="ir-revenue-sub positive">+27.3% vs Jan</div>
          </div>
          <div class="ir-revenue-card">
            <div class="ir-revenue-value">$9.1K</div>
            <div class="ir-revenue-label">Other Sell Side</div>
            <div class="ir-revenue-sub negative">-56.0% vs Jan</div>
          </div>
          <div class="ir-revenue-card">
            <div class="ir-revenue-value">$6.5K</div>
            <div class="ir-revenue-label">Buy Side</div>
            <div class="ir-revenue-sub negative">-44.0% vs Jan</div>
          </div>
          <div class="ir-revenue-card">
            <div class="ir-revenue-value">$28.4K</div>
            <div class="ir-revenue-label">Title</div>
            <div class="ir-revenue-sub negative">-20.6% vs Jan</div>
          </div>
        </div>

        <div class="ir-grid-title">Daily Revenue Comparison</div>
        <div class="ir-daily-grid">
          <div class="ir-kpi-card">
            <div class="ir-kpi-value">$5,585</div>
            <div class="ir-kpi-label">Daily Rev (Jan)</div>
            <div class="ir-kpi-sub">31 days</div>
          </div>
          <div class="ir-kpi-card">
            <div class="ir-kpi-value">$5,570</div>
            <div class="ir-kpi-label">Daily Rev (Feb)</div>
            <div class="ir-kpi-sub">28 days</div>
          </div>
          <div class="ir-kpi-card">
            <div class="ir-kpi-value">+18%</div>
            <div class="ir-kpi-label">Run Rate (28th)</div>
            <div class="ir-kpi-sub">vs Jan daily avg</div>
          </div>
          <div class="ir-kpi-card">
            <div class="ir-kpi-value">$155.9K</div>
            <div class="ir-kpi-label">Total Rev (Feb)</div>
            <div class="ir-kpi-sub">28-day month</div>
          </div>
        </div>

        <div class="ir-note"><strong>Note:</strong> Refund volume increased 64% MoM ($7,518 in Feb vs. $4,583 in Jan), related to the wholesale/double-closing regulatory change. Refunds are already netted against revenue figures above.</div>
      </div>

      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">02</span>
          <h2 class="ir-section-title">Financial Statements</h2>
        </div>

        <div class="ir-table-wrap">
          <table class="ir-table">
            <thead>
              <tr>
                <th>Line Item</th>
                <th>Jan 2026</th>
                <th>Feb 2026</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bold">
                <td>Revenue</td>
                <td>$173,148</td>
                <td>$155,971</td>
              </tr>
              <tr>
                <td>Cost of Revenue</td>
                <td>($21,419)</td>
                <td>($20,830)</td>
              </tr>
              <tr>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;Sell Side COGS</td>
                <td>($17,438)</td>
                <td>($14,489)</td>
              </tr>
              <tr>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;Buy Side COGS</td>
                <td>($1,237)</td>
                <td>($690)</td>
              </tr>
              <tr>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;Title COGS</td>
                <td>($2,744)</td>
                <td>($5,652)</td>
              </tr>
              <tr class="bold">
                <td>Gross Profit</td>
                <td>$151,729</td>
                <td>$135,141</td>
              </tr>
              <tr>
                <td>% Gross Margin</td>
                <td>88%</td>
                <td>87%</td>
              </tr>
              <tr>
                <td>Sales &amp; Marketing</td>
                <td>($64,377)</td>
                <td>($82,904)</td>
              </tr>
              <tr>
                <td>People</td>
                <td>($70,416)</td>
                <td>($75,622)</td>
              </tr>
              <tr>
                <td>Other G&amp;A</td>
                <td>($64,430)</td>
                <td>($68,985)</td>
              </tr>
              <tr class="bold">
                <td>Total SG&amp;A</td>
                <td>($199,223)</td>
                <td>($227,511)</td>
              </tr>
              <tr>
                <td>Other Income / Expense</td>
                <td>$0</td>
                <td>$0</td>
              </tr>
              <tr class="total">
                <td>Net Income</td>
                <td>($47,494)</td>
                <td>($92,370)</td>
              </tr>
              <tr>
                <td>% Net Margin</td>
                <td>-27%</td>
                <td>-59%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="ir-grid-title">Financial Health</div>
        <div class="ir-health-grid">
          <div class="ir-health-card">
            <div class="ir-health-value">$2.03M</div>
            <div class="ir-health-label">Cash Balance</div>
            <div class="ir-health-sub">28 Feb 2026</div>
          </div>
          <div class="ir-health-card">
            <div class="ir-health-value">($69.9K)</div>
            <div class="ir-health-label">Avg Monthly Burn</div>
            <div class="ir-health-sub"></div>
          </div>
          <div class="ir-health-card">
            <div class="ir-health-value">29 mo</div>
            <div class="ir-health-label">Estimated Runway</div>
            <div class="ir-health-sub"></div>
          </div>
          <div class="ir-health-card">
            <div class="ir-health-value">87%</div>
            <div class="ir-health-label">Gross Margin</div>
            <div class="ir-health-sub">Stable vs Jan</div>
          </div>
        </div>

        <div class="ir-closing-note">Thank you for your continued partnership. We remain committed to building a durable business and will continue to operate with transparency and discipline. Questions or feedback are always welcome.<br><br><strong>- The Beycome Team</strong></div>
      </div>

      <?php
      $rdocs_file = __DIR__ . '/docs/report-docs.json';
      $rdocs = file_exists($rdocs_file) ? json_decode(file_get_contents($rdocs_file), true) : [];
      $my_docs = $rdocs['feb-2026'] ?? [];
      if (!empty($my_docs)) :
      ?>
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </span>
          <h2 class="ir-section-title">Financial Documents</h2>
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          <?php
          $type_labels = ['pl' => 'P&L Statement', 'pl-title' => 'P&L Beycome Title', 'balance-sheet' => 'Balance Sheet', 'pl-jan' => 'P&L — January', 'pl-feb' => 'P&L — February', 'pl-mar' => 'P&L — March', 'pl-apr' => 'P&L — April', 'pl-may' => 'P&L — May', 'pl-jun' => 'P&L — June', 'pl-jul' => 'P&L — July', 'pl-aug' => 'P&L — August', 'pl-sep' => 'P&L — September', 'pl-oct' => 'P&L — October', 'pl-nov' => 'P&L — November', 'pl-dec' => 'P&L — December'];
          foreach ($my_docs as $tkey => $doc) :
            $size = $doc['size'] > 1048576 ? round($doc['size']/1048576,1).'MB' : round($doc['size']/1024).'KB';
          ?>
          <a href="/docs/<?php echo htmlspecialchars($doc['filename']); ?>" download style="display:flex;align-items:center;gap:12px;padding:16px 24px;background:#fff;border:1px solid var(--c-border);border-radius:var(--radius-md);text-decoration:none;color:var(--c-ink);transition:border-color 0.15s,box-shadow 0.15s;flex:1;min-width:240px">
            <div style="width:40px;height:40px;border-radius:10px;background:#fef2f2;display:grid;place-items:center;flex-shrink:0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b42318" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div>
              <div style="font-size:15px;font-weight:700"><?php echo htmlspecialchars($type_labels[$tkey] ?? $tkey); ?></div>
              <div style="font-size:12px;color:var(--c-ink-soft)">PDF · <?php echo $size; ?></div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="2" style="margin-left:auto;flex-shrink:0"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
          <?php endforeach; ?>
        </div>
      </div>
      <?php endif; ?>

      <div class="ir-signoff">
        <p>As always - and more than ever - we're fully committed to building a best-in-class real estate platform for everyday people, operating with transparency, sharp focus, and strong financial discipline.<br><br>Questions and feedback are always welcome.</p>
        <p class="ir-signoff-team">- The Beycome Team</p>
        <p class="ir-signoff-names">Nico &amp; Jodin</p>
      </div>
    </div>
  </div>

  <script>
    // no-op
  </script>
</body>
</html>
