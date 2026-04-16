<?php
// phpcs:ignoreFile
session_start();
if (empty($_SESSION['ir_auth'])) { header('Location: /'); exit; }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Beycome Investor Report | FY 2025</title>
  <meta name="description" content="Beycome Investor Report - FY 2025 &amp; January 2026">
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

    * { box-sizing: border-box; }

    html, body {
      margin: 0; padding: 0;
      font-family: Roboto, "Segoe UI", "Helvetica Neue", sans-serif;
      background: radial-gradient(circle at 10% 10%, #e2e4ff 0%, #f5f5ff 42%), linear-gradient(180deg, #f7f8ff 0%, #eceeff 100%);
      color: var(--c-ink);
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }

    .ir-header { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 24px; box-shadow: 0 2px 12px rgba(21,25,70,0.1); background: rgba(255,255,255,0.9); backdrop-filter: saturate(160%) blur(14px); }
    .ir-header-left { display: flex; align-items: center; min-width: 0; gap: 14px; }
    .ir-header-logo { width: 124px; height: auto; display: block; }
    .ir-header-divider { width: 1px; height: 22px; background: var(--c-border); flex-shrink: 0; }
    .ir-header-title { font-size: 14px; letter-spacing: 0.02em; color: var(--c-ink-soft); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
    .ir-header-exit { border: 1px solid #c5c9ee; background: #ffffff; color: var(--c-ink); border-radius: 999px; padding: 8px 14px; font-weight: 600; font-size: 14px; font-family: inherit; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease; flex-shrink: 0; }
    .ir-header-exit:hover { transform: translateY(-1px); box-shadow: var(--shadow-sm); border-color: #9098d4; }

    .ir-page { max-width: 1080px; margin: 0 auto; padding: 28px 20px 64px; }

    .ir-hero { border-radius: var(--radius-xl); padding: 42px 34px; background: linear-gradient(160deg, #8c8cf0 0%, #2d3a8c 58%, #4a5bc7 100%); box-shadow: var(--shadow-lg); color: #fff; margin-bottom: 26px; }
    .ir-hero-label { display: inline-flex; padding: 6px 12px; border-radius: 999px; background: rgba(255,255,255,0.14); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 14px; }
    .ir-hero-title { margin: 0; font-size: clamp(28px, 4vw, 46px); line-height: 1.08; text-wrap: balance; }
    .ir-hero-subtitle { margin-top: 14px; font-size: clamp(15px, 1.8vw, 19px); line-height: 1.45; color: rgba(238,240,255,0.9); max-width: 860px; }

    .ir-section { background: var(--c-surface); border-radius: var(--radius-xl); padding: 42px 34px; box-shadow: var(--shadow-sm); margin-bottom: 22px; }
    .ir-section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 30px; }
    .ir-section-number { width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; background: var(--c-accent-soft); color: var(--c-accent); font-weight: 700; font-size: 15px; }
    .ir-section-title { margin: 0; font-size: clamp(22px, 3vw, 30px); letter-spacing: -0.015em; }
    .ir-subsection-title { margin: 32px 0 12px; font-size: 15px; color: var(--c-ink-soft); font-weight: 600; text-transform: uppercase; letter-spacing: 0.09em; }

    .ir-text { margin: 0 0 14px; color: #2f2f5a; font-size: 16px; line-height: 1.68; }

    .ir-note { border-left: 4px solid #a5aef9; background: #f0f1ff; border-radius: 0 var(--radius-md) var(--radius-md) 0; padding: 14px 16px; font-size: 14px; color: #24245c; line-height: 1.55; margin: 16px 0; }
    .ir-note--warning { border-left-color: #f59e0b; background: #fffaeb; color: #6e4d00; }

    .ir-grid-title { font-size: 14px; margin: 20px 0; }

    .ir-kpi-grid, .ir-revenue-grid, .ir-health-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; margin: 0 0 30px; }
    .ir-kpi-card, .ir-revenue-card, .ir-health-card { border: 1px solid var(--c-border); border-radius: var(--radius-md); background: #ffffff; padding: 15px; min-height: 108px; display: flex; flex-direction: column; justify-content: center; }
    .ir-kpi-value, .ir-revenue-value, .ir-health-value { font-size: clamp(23px, 2.1vw, 31px); font-weight: 700; letter-spacing: -0.02em; color: #19195a; line-height: 1.05; }
    .ir-kpi-label, .ir-revenue-label, .ir-health-label { margin-top: 8px; font-size: 13px; font-weight: 600; color: #27274a; opacity: 0.6; letter-spacing: 0.02em; text-transform: uppercase; }
    .ir-kpi-sub, .ir-revenue-sub, .ir-health-sub { margin-top: 6px; font-size: 12px; color: var(--c-ink-soft); font-weight: bold; letter-spacing: 0.02em; }
    .positive { color: var(--c-positive); }
    .negative { color: var(--c-negative); }

    .ir-table-wrap { margin: 8px 0 22px; overflow-x: auto; border: 1px solid var(--c-border); border-radius: var(--radius-md); }
    .ir-table { width: 100%; border-collapse: collapse; min-width: 640px; background: #ffffff; }
    .ir-table thead th { background: #f5f5ff; color: #24244a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; text-align: right; padding: 12px 14px; border-bottom: 1px solid var(--c-border); }
    .ir-table thead th:first-child, .ir-table tbody td:first-child { text-align: left; width: 30%; }
    .ir-table tbody td { padding: 11px 14px; border-bottom: 1px solid #ededfc; font-size: 14px; text-align: right; color: #1e1e46; }
    .ir-table tbody tr.bold td { font-weight: 700; background: #f9f9ff; }
    .ir-table tbody tr.total td { font-weight: 700; color: #7a271a; background: #fff6f5; }
    .ir-table tbody tr:last-child td { border-bottom: none; }

    .ir-signoff { margin-top: 10px; border: 1px solid var(--c-border); border-radius: var(--radius-xl); padding: 26px; background: linear-gradient(180deg, #ffffff 0%, #f8f8ff 100%); color: #21215a; }
    .ir-signoff p { margin: 0 0 12px; line-height: 1.65; }
    .ir-signoff-team, .ir-signoff-names { font-weight: 700; margin-bottom: 4px; }

    @media (min-width: 900px) {
      .ir-kpi-grid, .ir-revenue-grid, .ir-health-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    }

    @media (max-width: 720px) {
      .ir-header { padding: 12px 14px; }
      .ir-header-logo { width: 108px; }
      .ir-header-divider, .ir-header-title { display: none; }
      .ir-header-exit { padding: 7px 10px; font-size: 13px; }
      .ir-page { padding: 14px 12px 50px; }
      .ir-hero, .ir-section, .ir-signoff { border-radius: 14px; padding: 18px; }
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
      .ir-kpi-grid, .ir-revenue-grid, .ir-health-grid { gap: 10px !important; margin-bottom: 14px !important; grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
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
  <div id="investor-report-container" style="display:block;position:fixed;inset:0;z-index:2000;background:var(--c-bg);overflow-y:auto;">
    <div class="ir-header">
      <div class="ir-header-left">
        <img src="/assets/logo.svg" alt="Beycome" class="ir-header-logo">
        <div class="ir-header-divider"></div>
        <span class="ir-header-title">Investor Report | FY 2025</span>
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
        <h1 class="ir-hero-title">Beycome | FY 2025 &amp; January 2026</h1>
        <div class="ir-hero-subtitle">You + AI Guidance — Save up to 6% when selling and up to 2% when buying</div>
      </div>

      <!-- 01 EXECUTIVE SUMMARY -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">01</span>
          <h2 class="ir-section-title">Executive Summary</h2>
        </div>
        <div class="ir-subsection-title">Overview</div>
        <p class="ir-text">2025 was a defining and demanding year for us. After closing our Seed round — which required nearly six months of intense focus — we also experienced a temporary shutdown of operations in our #2 state, North Carolina, for close to five months. It was a year of adaptation, discipline, and resilience — one that ultimately made us stronger and more structured.</p>
        <p class="ir-text">Although the core platform performed in line with expectations, Customer Acquisition Cost (CAC) and sales cycles were higher and longer than initially projected. Nevertheless, we ended the year with solid traction: 4,820 unique customers, 9,580 listings created, and $1,262,777 in listing revenue. This represents approximately $262 in average revenue per customer (listing products only).</p>
        <p class="ir-text">On the title side, 2025 marked a significant structural evolution. From January through December, the title business generated $492K in gross revenue ($410K through First American and $82K through Altisource). Under the previous structure, Beycome recognized only 49% of the net profit, translating into approximately $120K recorded revenue — roughly 24% of total pro-forma gross volume.</p>
        <p class="ir-text">In mid-December 2025, we implemented a new structure through the formation of a Joint Venture within Beycome Title LLC. Under this updated model, we now recognize 100% of gross revenue on our balance sheet, with profits distributed 49% to Beycome Corp and 51% to our title partner. This change ensures that our reported revenue better reflects the real operational scale and market activity of our title business.</p>

        <div class="ir-note">
          <strong>Pro-forma Title Revenue Bridge</strong>
          <table style="width:100%;margin-top:10px;font-size:14px;border-collapse:collapse">
            <tr><td style="padding:6px 0">Beycome Title Revenue</td><td style="padding:6px 0;text-align:right;font-weight:700">$119,942</td></tr>
            <tr><td style="padding:6px 0">Title Partners Est. Revenue</td><td style="padding:6px 0;text-align:right;font-weight:700">$371,900</td></tr>
            <tr style="border-top:1px solid #c5cbf9"><td style="padding:8px 0;font-weight:700">Total Pro-forma Title Revenue</td><td style="padding:8px 0;text-align:right;font-weight:700">$491,842</td></tr>
          </table>
          <small style="color:var(--c-ink-soft)">The $492K pro-forma reflects the full title revenue now recognized under the new JV structure within Beycome Title LLC.</small>
        </div>

        <div class="ir-subsection-title">Key Performance Indicators</div>
        <div class="ir-grid-title">Marketplace</div>
        <div class="ir-kpi-grid">
          <div class="ir-kpi-card"><div class="ir-kpi-value">9,442</div><div class="ir-kpi-label">New Listing Clients</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">8,976</div><div class="ir-kpi-label">Basic Listings</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">410</div><div class="ir-kpi-label">Enhanced Listings</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">56</div><div class="ir-kpi-label">Concierge Package</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">36</div><div class="ir-kpi-label">Beycome Buyer Program</div></div>
        </div>

        <div class="ir-grid-title">Revenue Breakdown</div>
        <div class="ir-revenue-grid">
          <div class="ir-revenue-card"><div class="ir-revenue-value">$899K</div><div class="ir-revenue-label">Basic Listing</div></div>
          <div class="ir-revenue-card"><div class="ir-revenue-value">$169K</div><div class="ir-revenue-label">Enhanced Listing</div></div>
          <div class="ir-revenue-card"><div class="ir-revenue-value">$85K</div><div class="ir-revenue-label">Concierge</div></div>
          <div class="ir-revenue-card"><div class="ir-revenue-value">$110K</div><div class="ir-revenue-label">Other Sell Side</div></div>
          <div class="ir-revenue-card"><div class="ir-revenue-value">$108K</div><div class="ir-revenue-label">Buyer Program</div></div>
          <div class="ir-revenue-card"><div class="ir-revenue-value">$120K</div><div class="ir-revenue-label">Title</div></div>
        </div>

        <div class="ir-grid-title">Financial Health</div>
        <div class="ir-health-grid">
          <div class="ir-health-card"><div class="ir-health-value">$1.49M</div><div class="ir-health-label">Total Revenue</div><div class="ir-health-sub">FY 2025</div></div>
          <div class="ir-health-card"><div class="ir-health-value">$1.86M</div><div class="ir-health-label">Cash Balance</div><div class="ir-health-sub">12 Feb 2026</div></div>
          <div class="ir-health-card"><div class="ir-health-value">($37.4K)</div><div class="ir-health-label">Avg Monthly Burn</div></div>
          <div class="ir-health-card"><div class="ir-health-value">49 months</div><div class="ir-health-label">Runway</div></div>
        </div>
      </div>

      <!-- 02 FINANCIAL STATEMENTS -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">02</span>
          <h2 class="ir-section-title">Financial Statements</h2>
        </div>
        <div class="ir-note">Consolidated P&amp;L: Beycome Corp + Beycome Title of Florida LLC + LLC 1. Source: QuickBooks (accrual basis).</div>

        <div class="ir-table-wrap">
          <table class="ir-table" style="min-width:700px">
            <thead>
              <tr>
                <th style="text-align:left">Line Item</th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
                <th>Q4</th>
                <th style="background:#eceeff">FY 2025</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Revenue</strong></td>
                <td>$359,661</td>
                <td>$442,960</td>
                <td>$343,990</td>
                <td>$343,950</td>
                <td style="background:#f5f5ff"><strong>$1,490,561</strong></td>
              </tr>
              <tr>
                <td>Cost of Revenue</td>
                <td>($39,951)</td>
                <td>($60,878)</td>
                <td>($41,992)</td>
                <td>($68,352)</td>
                <td style="background:#f5f5ff">($211,174)</td>
              </tr>
              <tr class="bold">
                <td><strong>Gross Profit</strong></td>
                <td>$319,710</td>
                <td>$382,081</td>
                <td>$301,997</td>
                <td>$275,598</td>
                <td style="background:#f5f5ff"><strong>$1,279,387</strong></td>
              </tr>
              <tr>
                <td>Sales &amp; Marketing</td>
                <td>($84,496)</td>
                <td>($107,487)</td>
                <td>($117,161)</td>
                <td>($201,077)</td>
                <td style="background:#f5f5ff">($510,220)</td>
              </tr>
              <tr>
                <td>People</td>
                <td>($144,841)</td>
                <td>($142,974)</td>
                <td>($142,178)</td>
                <td>($170,802)</td>
                <td style="background:#f5f5ff">($600,795)</td>
              </tr>
              <tr>
                <td>Other General &amp; Admin</td>
                <td>($140,391)</td>
                <td>($126,005)</td>
                <td>($172,152)</td>
                <td>($167,264)</td>
                <td style="background:#f5f5ff">($605,812)</td>
              </tr>
              <tr class="bold">
                <td><strong>Total SG&amp;A</strong></td>
                <td>($369,728)</td>
                <td>($376,466)</td>
                <td>($431,491)</td>
                <td>($539,143)</td>
                <td style="background:#f5f5ff"><strong>($1,716,827)</strong></td>
              </tr>
              <tr>
                <td>Other Income / Expense</td>
                <td>($7,976)</td>
                <td>($4,365)</td>
                <td>$2,135</td>
                <td>($959)</td>
                <td style="background:#f5f5ff">($11,165)</td>
              </tr>
              <tr class="total">
                <td><strong>Net Income</strong></td>
                <td>($57,993)</td>
                <td>$1,251</td>
                <td>($127,358)</td>
                <td>($264,504)</td>
                <td style="background:#fff0ef"><strong>($448,605)</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="font-size:14px;font-weight:700;margin:16px 0 8px">Commentary</div>
        <ul style="margin:0 0 20px 20px;font-size:14px;line-height:1.8;color:var(--c-ink-soft)">
          <li>Listing fees (basic + enhanced) represented 72% of total revenue at $1,067,906.</li>
          <li>Gross margin held at 86% for the full year. COGS remained low relative to revenue.</li>
          <li>SG&amp;A totaled $1,716,827 (115% of revenue), driven by people costs and G&amp;A buildout.</li>
          <li>Marketing spend accelerated in Q4 ($201K vs $84K in Q1), reflecting scaled acquisition efforts.</li>
          <li>Net loss of ($448,605), representing a -30% net margin.</li>
        </ul>
      </div>

      <!-- 03 STRATEGY RECAP / UPDATE -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">03</span>
          <h2 class="ir-section-title">Strategy Recap / Update</h2>
        </div>

        <div class="ir-subsection-title">Strategy entering 2025</div>
        <p class="ir-text">We began 2025 with a clear objective: scale the marketplace through paid acquisition while maintaining CAC below $100, and simultaneously expand title services to increase revenue per transaction.</p>
        <p class="ir-text">Our core thesis was simple — drive more listings to create a compounding flywheel effect: greater inventory leads to more visibility, more transactions, and stronger monetization across services.</p>

        <div class="ir-subsection-title">What was reaffirmed</div>
        <ul style="margin:0 0 20px 20px;font-size:14px;line-height:1.8;color:var(--c-ink-soft)">
          <li><strong>AI-first product differentiation</strong> continues to resonate with sellers seeking control and savings.</li>
          <li><strong>Bundled services</strong> — including title, concierge, and buyer programs — significantly increase lifetime value per customer by expanding revenue per transaction and deepening service adoption.</li>
          <li><strong>Direct-to-consumer model</strong> has clear cost advantages versus agent-mediated alternatives.</li>
        </ul>

        <div class="ir-subsection-title">What was deprioritized</div>
        <ul style="margin:0 0 20px 20px;font-size:14px;line-height:1.8;color:var(--c-ink-soft)">
          <li>Following the cease and desist in North Carolina, we lost nearly 20% of revenue, materially impacting cash and near-term execution capacity.</li>
          <li>Reduced paid acquisition on Meta and social, as CAC was not aligned with sustainable unit economics given our current cash position.</li>
          <li>Slowed partner channel development due to high resource demand and unclear short-term ROI.</li>
          <li>Paused geographic expansion to concentrate on strengthening performance in our four core states.</li>
        </ul>

        <div class="ir-subsection-title">Rationale</div>
        <p class="ir-text">After Q1 and the loss of our second-largest revenue state, we shifted from a growth-first mindset to a disciplined focus on unit economics and cash efficiency.</p>
        <p class="ir-text">The decision to pause expansion was execution-driven, not a strategic pivot. We remain confident in the strength and scalability of the core model.</p>
      </div>

      <!-- 04 WHERE WE NEED HELP -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">04</span>
          <h2 class="ir-section-title">Where We Need Help</h2>
        </div>

        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div class="ir-subsection-title" style="margin:0">Hiring</div>
          <span style="padding:4px 12px;border-radius:8px;font-size:12px;font-weight:700;color:#bb4b43;background:rgba(187,75,67,0.1)">High priority</span>
        </div>
        <p class="ir-text">We are actively searching for a Head of Marketing with DTC real estate or financial services experience. A performance-driven operator who can own CAC and attribution.</p>
        <p class="ir-text">If you know someone, please forward their LinkedIn or reach out directly.</p>

        <div class="ir-subsection-title">Strategic Feedback</div>
        <p class="ir-text">We'd welcome a working session on our 2026 expansion plan. Specifically, we're weighing depth-first (more services in existing markets) versus breadth-first (geographic expansion with core offering).</p>
      </div>

      <!-- 05 PRODUCT UPDATE -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">05</span>
          <h2 class="ir-section-title">Product Update</h2>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
              <span style="color:#43bb4d;font-size:18px">&#10003;</span>
              <span style="font-size:15px;font-weight:700;color:var(--c-ink)">What We've Launched</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:14px;color:var(--c-ink-soft);line-height:1.5">AI-powered listing description generator with photo optimization</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:14px;color:var(--c-ink-soft);line-height:1.5">Integrated title ordering and status tracking dashboard</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:14px;color:var(--c-ink-soft);line-height:1.5">Buyer qualification flow with pre-approval routing</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:14px;color:var(--c-ink-soft);line-height:1.5">Mobile-optimized showing scheduler with calendar sync</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:14px;color:var(--c-ink-soft);line-height:1.5">Automated offer comparison tool with net proceeds calculator</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:14px;color:var(--c-ink-soft);line-height:1.5">Document vault with e-signature integration</div>
            </div>
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
              <span style="color:var(--c-accent);font-size:16px">&rarr;</span>
              <span style="font-size:15px;font-weight:700;color:var(--c-ink)">What's Next</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:14px;color:var(--c-ink-soft);line-height:1.5">Concierge dashboard for buyer transaction management</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:14px;color:var(--c-ink-soft);line-height:1.5">Mortgage rate comparison tool with lender integration</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:14px;color:var(--c-ink-soft);line-height:1.5">AI chatbot for seller FAQs and process guidance</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:14px;color:var(--c-ink-soft);line-height:1.5">Enhanced analytics for pricing recommendations</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 06 EXECUTION STATUS VS PLAN -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">06</span>
          <h2 class="ir-section-title">Execution Status vs Plan (2025)</h2>
        </div>
        <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap">
          <span style="padding:4px 12px;border-radius:8px;font-size:13px;font-weight:600;color:#43bb4d;background:rgba(67,187,77,0.1)">6 Done</span>
          <span style="padding:4px 12px;border-radius:8px;font-size:13px;font-weight:600;color:#d97706;background:rgba(217,119,6,0.1)">4 In progress</span>
          <span style="padding:4px 12px;border-radius:8px;font-size:13px;font-weight:600;color:#bb4b43;background:rgba(187,75,67,0.1)">1 At risk</span>
        </div>

        <div class="ir-table-wrap">
          <table class="ir-table" style="min-width:auto">
            <thead>
              <tr>
                <th style="text-align:left;width:70%">Initiative</th>
                <th style="text-align:right;width:30%">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Seed raise</td><td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:13px">&#10003; Done</span></td></tr>
              <tr><td>Hire: CMO</td><td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#bb4b43;font-weight:600;font-size:13px">&#9651; At risk</span></td></tr>
              <tr><td>Hire: Title Operations Lead</td><td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#d97706;font-weight:600;font-size:13px">&#9684; In progress</span></td></tr>
              <tr><td>Hire: Sales Manager</td><td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:13px">&#10003; Done</span></td></tr>
              <tr><td>Hire: Tech Team</td><td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:13px">&#10003; Done</span></td></tr>
              <tr><td>Marketing: Paid acquisition playbook</td><td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#d97706;font-weight:600;font-size:13px">&#9684; In progress</span></td></tr>
              <tr><td>Marketing: Content + SEO foundation</td><td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:13px">&#10003; Done</span></td></tr>
              <tr><td>Title: Florida coverage expansion</td><td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:13px">&#10003; Done</span></td></tr>
              <tr><td>Title: Texas entry</td><td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#d97706;font-weight:600;font-size:13px">&#9684; In progress</span></td></tr>
              <tr><td>Buyer/Concierge: Launch MVP</td><td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:13px">&#10003; Done</span></td></tr>
              <tr><td>Mortgage: Partner integration</td><td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#d97706;font-weight:600;font-size:13px">&#9684; In progress</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 07 JANUARY 2026 OUTLOOK -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">07</span>
          <h2 class="ir-section-title">January 2026 Outlook</h2>
        </div>

        <div class="ir-subsection-title">Jan 2026 Brief Outlook</div>

        <div style="margin-bottom:24px">
          <div style="font-size:15px;font-weight:700;margin-bottom:10px;color:var(--c-accent)">1. Early 2026 Traction</div>
          <p class="ir-text">In the first days of 2026, Beycome surpassed 100,000 engaged visitors on the platform, compared to 22,000 active users in the same period last year — nearly a 5&times; increase year over year driven by significant organic marketing and SEO performance improvements. Our gross revenue has progressed +55% vs January 2025, with $137K revenue (Beycome Real Estate) and $42K (Beycome Title) for a consolidated revenue of $179K gross revenue.</p>
        </div>

        <div style="margin-bottom:24px">
          <div style="font-size:15px;font-weight:700;margin-bottom:10px;color:var(--c-accent)">2. Title Revenue per Customer &amp; LTV Impact</div>
          <p class="ir-text">Average revenue per Title client is nearly $3,000 (based on funded Title deals in early 2026). This significantly increases average revenue per customer and lifetime value for listing clients who also purchase Title services.</p>
        </div>

        <div style="margin-bottom:24px">
          <div style="font-size:15px;font-weight:700;margin-bottom:10px;color:var(--c-accent)">3. Team</div>
          <p class="ir-text">We are currently a team of 24 (full-time, part-time, and contractor combined), 8 on payroll:</p>
          <ul style="margin:0 0 20px 20px;font-size:14px;line-height:1.8;color:var(--c-ink-soft)">
            <li>8 Customer Support and MLS Team (Miami-based manager + part-time, foreign contractors)</li>
            <li>6 Sales Team (Miami-based Manager + foreign contractors)</li>
            <li>6 Developers (Miami-based + 2 foreign contractors)</li>
            <li>4 Brokers (USA contractors)</li>
          </ul>

          <div style="font-size:14px;font-weight:700;margin:16px 0 8px;color:var(--c-accent)">Recently Hired</div>
          <ul style="margin:0 0 20px 20px;font-size:14px;line-height:1.8;color:var(--c-ink-soft)">
            <li>1 Sales Manager (Miami)</li>
            <li>5 Sales Representatives (foreign)</li>
            <li>3 Developers:
              <ul style="margin:4px 0 0 20px">
                <li>1 Front-End (Miami)</li>
                <li>1 AI Language (Miami)</li>
                <li>1 Back-End (foreign)</li>
              </ul>
            </li>
            <li>1 Compliance &amp; Customer Support (Miami)</li>
          </ul>
        </div>

        <div style="margin-bottom:24px">
          <div style="font-size:15px;font-weight:700;margin-bottom:10px;color:var(--c-accent)">4. Beycome Local Expansion</div>
          <p class="ir-text">Processing expansion into three new states: Virginia, Maryland, and Pennsylvania — expected to be completed before end of Q1. We are also finalizing the reopening of our California operation and Title expansion into Texas and California (Escrow services), targeted for end of Q1 as well.</p>
        </div>

        <div style="margin-top:32px;padding-top:28px;border-top:1px solid var(--c-border)">
          <div style="display:inline-block;padding:6px 14px;border-radius:6px;background:var(--c-accent-soft);color:var(--c-accent);font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:20px">Directional First Semester Focus Areas</div>

          <div style="margin-bottom:18px;padding-left:28px;position:relative;font-size:15px;line-height:1.7;color:#2f2f5a">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">&rarr;</span>
            <strong>Scale title services</strong> — expand coverage within existing markets and strengthen operational capacity to support 2&times; volume without a proportional increase in headcount.
          </div>

          <div style="margin-bottom:18px;padding-left:28px;position:relative;font-size:15px;line-height:1.7;color:#2f2f5a">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">&rarr;</span>
            <strong>Reduce CAC through content and referral channels</strong> — gradually shifting the acquisition mix toward organic growth based on 2025 insights around paid performance efficiency.
          </div>

          <div style="margin-bottom:18px;padding-left:28px;position:relative;font-size:15px;line-height:1.7;color:#2f2f5a">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">&rarr;</span>
            <strong>Revamp the Beycome platform</strong> — with a more intuitive, AI-guided UI/UX experience to simplify the journey and increase engagement and conversion.
          </div>

          <div style="margin-bottom:18px;padding-left:28px;position:relative;font-size:15px;line-height:1.7;color:#2f2f5a">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">&rarr;</span>
            <strong>Increase marketing efforts across multiple verticals</strong> — social media, blog, SEO, and strategic content — to diversify acquisition channels and strengthen organic growth.
          </div>

          <div style="margin-bottom:0;padding-left:28px;position:relative;font-size:15px;line-height:1.7;color:#2f2f5a">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">&rarr;</span>
            <strong>Improve conversion within the buyer program</strong> — by optimizing the funnel, clarifying the value proposition, and reducing friction across the user experience.
          </div>
        </div>
      </div>

      <!-- DOWNLOADABLE DOCUMENTS -->
      <?php
      $rdocs_file = __DIR__ . '/docs/report-docs.json';
      $rdocs = file_exists($rdocs_file) ? json_decode(file_get_contents($rdocs_file), true) : [];
      $my_docs = $rdocs['fy-2025'] ?? [];
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

      <!-- SIGN-OFF -->
      <div class="ir-signoff">
        <p>As always — and more than ever — we're fully committed to building a best-in-class real estate platform for everyday people, operating with transparency, sharp focus, and strong financial discipline.<br><br>Questions and feedback are always welcome.</p>
        <p class="ir-signoff-team">— The Beycome Team</p>
        <p class="ir-signoff-names">Nico &amp; Jodin</p>
      </div>
    </div>
  </div>
</body>
</html>
