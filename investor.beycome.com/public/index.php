<?php
// phpcs:ignoreFile

session_start();

if (isset($_GET['logout'])) {
    $_SESSION = [];
    session_destroy();
    header('Location: /');
    exit;
}

$error = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submitted = $_POST['password'] ?? '';
    if (hash_equals('beycome2026', $submitted)) {
        $_SESSION['ir_auth'] = true;
    } else {
        $error = true;
    }
}

if (empty($_SESSION['ir_auth'])) {
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
  <title>Beycome Investor Reports</title>
  <meta name="description" content="Beycome Investor Portal — Quarterly and monthly operating updates">
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
  </style>
</head>
<body>
  <div style="min-height:100vh;background:#fefefe">
    <!-- Header -->
    <div class="ir-header">
      <div class="ir-header-left">
        <img src="/assets/logo.svg" alt="Beycome" class="ir-header-logo">
        <div class="ir-header-divider"></div>
        <span class="ir-header-title"></span>
      </div>
      <a class="ir-header-exit" href="?logout" aria-label="Log out">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        Log out
      </a>
    </div>

    <!-- Hero -->
    <div style="text-align:center;padding:64px 24px 40px;max-width:672px;margin:0 auto">
      <div style="font-size:14px;color:rgba(26,31,77,0.5);margin-bottom:12px">Investor Portal</div>
      <h1 style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:48px;font-weight:700;color:#1a1f4d;line-height:1.1;margin-bottom:16px">Beycome Reports.</h1>
      <p style="font-size:18px;color:#5a627a;line-height:1.5">Quarterly and monthly operating updates.</p>
    </div>

    <!-- Report Cards -->
    <div style="max-width:800px;margin:0 auto;padding:0 24px 64px">
      <!-- Q1 2026 -->
      <div style="background:#fff;border:1px solid #d5d8f0;border-radius:22px;padding:32px;margin-bottom:20px;box-shadow:0 8px 24px rgba(21,25,70,0.08)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
          <div>
            <div style="font-size:24px;font-weight:700;color:#1a1f4d;margin-bottom:4px">Q1 2026</div>
            <div style="font-size:14px;color:#5a627a">January – March 2026</div>
          </div>
          <span style="display:inline-block;padding:4px 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;border-radius:20px;background:#e5eaff;color:#5a6ad4">Latest</span>
        </div>
        <div style="display:flex;gap:32px;align-items:baseline">
          <div>
            <div style="font-size:32px;font-weight:700;color:#5a6ad4">$575,031</div>
            <div style="font-size:13px;color:rgba(26,31,77,0.5);margin-top:2px">Revenue</div>
          </div>
          <div>
            <div style="font-size:20px;font-weight:700;color:#43bb4d">+60% YoY</div>
            <div style="font-size:13px;color:rgba(26,31,77,0.5);margin-top:2px">Growth</div>
          </div>
        </div>
        <div style="margin-top:16px;font-size:14px;color:#5a627a">2,854 listing clients · 30.3mo runway · 86% gross margin</div>
        <div style="display:flex;gap:12px;margin-top:20px;padding-top:20px;border-top:1px solid #eceeff">
          <a href="/q1-2026.php" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#5a6ad4;color:#fff;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;transition:opacity 0.2s">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            View Report
          </a>
          <a href="javascript:void(0)" onclick="var w=window.open('/q1-2026.php','_blank');w.addEventListener('load',function(){w.print()})" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#fff;color:#5a6ad4;border:1px solid #d5d8f0;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;transition:border-color 0.2s;cursor:pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print / PDF
          </a>
        </div>
      </div>

      <!-- Feb 2026 -->
      <div style="background:#fff;border:1px solid #d5d8f0;border-radius:22px;padding:32px;margin-bottom:20px;box-shadow:0 8px 24px rgba(21,25,70,0.08)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
          <div>
            <div style="font-size:24px;font-weight:700;color:#1a1f4d;margin-bottom:4px">February 2026</div>
            <div style="font-size:14px;color:#5a627a">Monthly Update</div>
          </div>
        </div>
        <div style="display:flex;gap:32px;align-items:baseline">
          <div>
            <div style="font-size:32px;font-weight:700;color:#5a6ad4">$155,971</div>
            <div style="font-size:13px;color:rgba(26,31,77,0.5);margin-top:2px">Revenue</div>
          </div>
          <div>
            <div style="font-size:20px;font-weight:700;color:#43bb4d">+34.5% YoY</div>
            <div style="font-size:13px;color:rgba(26,31,77,0.5);margin-top:2px">Growth</div>
          </div>
        </div>
        <div style="margin-top:16px;font-size:14px;color:#5a627a">812 listing clients · 29mo runway · 87% gross margin</div>
        <div style="display:flex;gap:12px;margin-top:20px;padding-top:20px;border-top:1px solid #eceeff">
          <a href="/feb-2026.php" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#5a6ad4;color:#fff;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;transition:opacity 0.2s">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            View Report
          </a>
          <a href="javascript:void(0)" onclick="var w=window.open('/feb-2026.php','_blank');w.addEventListener('load',function(){w.print()})" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#fff;color:#5a6ad4;border:1px solid #d5d8f0;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;transition:border-color 0.2s;cursor:pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print / PDF
          </a>
        </div>
      </div>

      <!-- FY 2025 & Jan 2026 -->
      <div style="background:#fff;border:1px solid #d5d8f0;border-radius:22px;padding:32px;margin-bottom:20px;box-shadow:0 8px 24px rgba(21,25,70,0.08)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
          <div>
            <div style="font-size:24px;font-weight:700;color:#1a1f4d;margin-bottom:4px">FY 2025 &amp; January 2026</div>
            <div style="font-size:14px;color:#5a627a">Annual Review + January Monthly Update</div>
          </div>
        </div>
        <div style="display:flex;gap:32px;align-items:baseline">
          <div>
            <div style="font-size:32px;font-weight:700;color:#5a6ad4">$173,148</div>
            <div style="font-size:13px;color:rgba(26,31,77,0.5);margin-top:2px">Jan Revenue</div>
          </div>
        </div>
        <div style="margin-top:16px;font-size:14px;color:#5a627a">832 listing clients · FY 2025 annual summary included</div>
        <div style="display:flex;gap:12px;margin-top:20px;padding-top:20px;border-top:1px solid #eceeff">
          <a href="/fy-2025.php" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#5a6ad4;color:#fff;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;transition:opacity 0.2s">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            View Report
          </a>
          <a href="javascript:void(0)" onclick="var w=window.open('/fy-2025.php','_blank');w.addEventListener('load',function(){w.print()})" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#fff;color:#5a6ad4;border:1px solid #d5d8f0;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;transition:border-color 0.2s;cursor:pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print / PDF
          </a>
        </div>
      </div>

      <!-- Uploaded Documents -->
      <?php
      $docs_meta = __DIR__ . '/docs/files.json';
      $docs = file_exists($docs_meta) ? json_decode(file_get_contents($docs_meta), true) : [];
      if (!empty($docs)) :
          // Group by category
          $grouped = [];
          foreach ($docs as $d) { $grouped[$d['category']][] = $d; }
      ?>
      <div style="background:#fff;border:1px solid #d5d8f0;border-radius:22px;padding:32px;margin-bottom:20px;box-shadow:0 8px 24px rgba(21,25,70,0.08)">
        <div style="font-size:20px;font-weight:700;color:#1a1f4d;margin-bottom:20px">Financial Documents</div>
        <?php foreach ($grouped as $cat => $cat_docs) : ?>
        <div style="margin-bottom:20px">
          <div style="font-size:13px;font-weight:700;color:#5a627a;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:10px"><?php echo htmlspecialchars($cat); ?></div>
          <?php foreach ($cat_docs as $doc) :
              $ext = strtoupper($doc['ext']);
              $size = $doc['size'] > 1048576 ? round($doc['size']/1048576, 1).'MB' : round($doc['size']/1024).'KB';
              $colors = ['PDF'=>'#b42318','XLSX'=>'#2e7d32','PPTX'=>'#e65100','DOCX'=>'#1565c0','CSV'=>'#7b1fa2'];
              $color = $colors[$ext] ?? '#5a627a';
          ?>
          <a href="/docs/<?php echo htmlspecialchars($doc['filename']); ?>" download style="display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid #eceeff;border-radius:10px;text-decoration:none;margin-bottom:8px;transition:background 0.15s">
            <div style="width:36px;height:36px;border-radius:8px;background:<?php echo $color; ?>15;display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="<?php echo $color; ?>" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:14px;font-weight:600;color:#1a1f4d"><?php echo htmlspecialchars($doc['label']); ?></div>
              <div style="font-size:12px;color:#5a627a"><?php echo $ext; ?> · <?php echo $size; ?></div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a6ad4" stroke-width="2" style="flex-shrink:0"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
          <?php endforeach; ?>
        </div>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>

      <!-- Confidential note -->
      <div style="text-align:center;margin-top:48px;padding:32px;font-size:14px;color:rgba(26,31,77,0.4);line-height:1.6">
        This portal is confidential and intended solely for the use of Beycome investors.<br>
        Questions or feedback are always welcome — <strong>nj@beycome.com</strong>
      </div>
    </div>
  </div>

  <style>
    a[href*="-2026"]:hover {
      border-color: #7d8ff7 !important;
      box-shadow: 0 12px 32px rgba(21,25,70,0.14) !important;
      transform: translateY(-2px);
    }
  </style>
</body>
</html>
