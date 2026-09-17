<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (($_POST['password'] ?? '') === 'beycome2026') {
        $_SESSION['investor_auth'] = true;
    }
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}
if (isset($_POST['logout'])) {
    session_destroy();
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}
$authed = $_SESSION['investor_auth'] ?? false;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beycome Investor Report | August 2026</title>
    <meta name="robots" content="noindex, nofollow">
    <style>
        @font-face {
            font-family: Roboto;
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('../fonts/roboto-400.woff2') format('woff2');
        }
        @font-face {
            font-family: Roboto;
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url('../fonts/roboto-700.woff2') format('woff2');
        }

        :root {
            --c-primary: #152330;
            --c-secondary: #4a5568;
            --c-muted: #718096;
            --c-accent: #7d8ff7;
            --c-accent-bg: #eef0fe;
            --c-orange: #FF9B77;
            --c-border: #e2e8f0;
            --c-card-bg: #f7f8fa;
            --c-green: #2f9c60;
            --c-green-bg: rgba(47,156,96,0.08);
            --c-red: #c0392b;
            --c-red-bg: #fdf2f2;
            --c-orange-warn: #d97706;
            --c-orange-warn-bg: #fffbeb;
            --color-warning: #d97706;
            --color-warning-bg: rgba(217,119,6,0.08);
            --color-gray-600: #4a5568;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: Roboto, ui-sans-serif, system-ui, -apple-system, sans-serif;
            background: #fff;
            color: var(--c-primary);
            -webkit-font-smoothing: antialiased;
            line-height: 1.6;
        }

        /* ── Password Gate ── */
        #gate {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }

        .gate-wrap { width: 100%; max-width: 380px; text-align: center; }

        .gate-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-bottom: 40px;
            text-decoration: none;
        }

        .gate-logo svg { width: 28px; height: 28px; }
        .gate-logo-text { font-size: 22px; font-weight: 700; color: var(--c-primary); letter-spacing: -0.5px; }
        .gate-title { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
        .gate-sub { font-size: 14px; color: var(--c-muted); margin-bottom: 28px; }

        .gate-input {
            width: 100%;
            border: 1px solid var(--c-border);
            border-radius: 10px;
            padding: 13px 16px;
            font-size: 15px;
            font-family: inherit;
            outline: none;
            transition: border-color 0.15s;
            text-align: center;
            letter-spacing: 0.06em;
            color: var(--c-primary);
            margin-bottom: 10px;
        }

        .gate-input:focus { border-color: var(--c-accent); }
        .gate-error { font-size: 13px; color: var(--c-red); margin-bottom: 10px; }

        .gate-btn {
            width: 100%;
            background: var(--c-primary);
            color: #fff;
            border: none;
            border-radius: 10px;
            padding: 13px;
            font-size: 15px;
            font-weight: 700;
            font-family: inherit;
            cursor: pointer;
            transition: opacity 0.15s;
        }

        .gate-btn:hover { opacity: 0.82; }
        .gate-note { margin-top: 20px; font-size: 12px; color: var(--c-muted); }

        /* ── Header ── */
        .ir-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 32px;
            border-bottom: 1px solid var(--c-border);
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 50;
        }

        .ir-header-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .ir-header-logo-text { font-size: 18px; font-weight: 700; color: var(--c-primary); letter-spacing: -0.3px; }
        .ir-header-actions { display: flex; align-items: center; gap: 20px; }

        .ir-header-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            color: var(--c-secondary);
            text-decoration: none;
            background: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
            padding: 0;
        }

        .ir-header-btn:hover { color: var(--c-primary); }

        /* ── Page ── */
        .ir-page { max-width: 960px; margin: 0 auto; padding: 0 24px 80px; }

        /* ── Title Block ── */
        .ir-title-block {
            text-align: center;
            padding: 52px 0 40px;
            border-bottom: 1px solid var(--c-border);
            margin-bottom: 40px;
        }

        .ir-title-label {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--c-muted);
            margin-bottom: 12px;
        }

        .ir-title-main {
            font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji";
            font-size: 40px;
            font-weight: 700;
            color: var(--c-primary);
            line-height: 1.15;
            margin-bottom: 12px;
        }

        .ir-title-sub { font-size: 16px; color: var(--c-muted); }

        /* ── Section Card ── */
        .ir-card {
            background: var(--c-card-bg);
            border-radius: 16px;
            padding: 28px 32px;
            margin-bottom: 24px;
        }

        .ir-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }

        .ir-card-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            background: var(--c-accent-bg);
            color: var(--c-accent);
            border-radius: 8px;
            font-size: 13px;
            font-weight: 700;
            flex-shrink: 0;
        }

        .ir-card-title {
            font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji";
            font-size: 22px;
            font-weight: 700;
            color: var(--c-primary);
        }

        /* ── Sub labels ── */
        .ir-sub-label {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--c-muted);
            margin: 24px 0 12px;
        }

        .ir-sub-label:first-of-type { margin-top: 0; }

        /* ── Body text ── */
        .ir-text { font-size: 15px; line-height: 1.75; color: var(--c-primary); margin-bottom: 14px; }
        .ir-text:last-child { margin-bottom: 0; }
        .ir-text strong { font-weight: 700; }

        /* ── YoY Banner ── */
        .ir-yoy-banner {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin: 24px 0 0;
        }

        .ir-yoy-card {
            background: rgba(90, 106, 212, 0.1);
            border-radius: 14px;
            padding: 22px 24px;
        }

        .ir-yoy-value {
            font-family: ui-sans-serif, system-ui, sans-serif;
            font-size: clamp(24px, 2.5vw, 36px);
            font-weight: 800;
            letter-spacing: -0.03em;
            color: var(--c-accent);
            line-height: 1;
            white-space: nowrap;
            margin-bottom: 6px;
        }

        .ir-yoy-label { font-size: 14px; font-weight: 700; color: var(--c-accent); line-height: 1.2; }
        .ir-yoy-sub { margin-top: 3px; font-size: 13px; color: var(--c-accent); opacity: 0.7; }

        /* ── KPI grids ── */
        .ir-kpi-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 4px;
        }

        .ir-kpi-grid-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 4px;
        }

        .ir-kpi {
            background: #fff;
            border: 1px solid var(--c-border);
            border-radius: 12px;
            padding: 16px;
        }

        .ir-kpi-val { font-size: 26px; font-weight: 700; color: var(--c-primary); line-height: 1.1; margin-bottom: 5px; }
        .ir-kpi-lbl { font-size: 11px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--c-secondary); }
        .ir-kpi-delta { font-size: 12px; margin-top: 4px; }
        .ir-kpi-delta.up   { color: var(--c-green); }
        .ir-kpi-delta.down { color: var(--c-red); }
        .ir-kpi-delta.flat { color: var(--c-muted); }

        /* ── Target cards ── */
        .ir-q2-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            margin-bottom: 14px;
        }

        .ir-q2-card {
            background: #fff;
            border: 1px solid var(--c-border);
            border-radius: 12px;
            padding: 20px;
        }

        .ir-q2-stream {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--c-muted);
            margin-bottom: 6px;
        }

        .ir-q2-pct { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 34px; font-weight: 700; line-height: 1; margin-bottom: 4px; }
        .ir-q2-pct.orange { color: var(--c-orange-warn); }
        .ir-q2-pct.green  { color: var(--c-green); }
        .ir-q2-pct.red    { color: var(--c-red); }

        .ir-q2-pct-sub { font-size: 12px; color: var(--c-muted); margin-bottom: 12px; }

        .ir-progress { height: 7px; background: var(--c-border); border-radius: 999px; overflow: hidden; margin-bottom: 14px; }
        .ir-progress-fill { height: 100%; border-radius: 999px; }
        .ir-progress-fill.orange { background: var(--c-orange-warn); }
        .ir-progress-fill.green  { background: var(--c-green); }
        .ir-progress-fill.red    { background: var(--c-red); }

        .ir-q2-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--c-muted); margin-bottom: 4px; }
        .ir-q2-row strong { color: var(--c-primary); font-weight: 700; }

        .ir-q2-badge {
            display: inline-block;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.06em;
            padding: 4px 12px;
            border-radius: 999px;
            margin-top: 10px;
        }

        .ir-q2-badge.beaten  { background: var(--c-green-bg); color: var(--c-green); }
        .ir-q2-badge.below   { background: var(--c-orange-warn-bg); color: var(--c-orange-warn); }
        .ir-q2-badge.missed  { background: var(--c-red-bg); color: var(--c-red); }
        .ir-q2-badge.monitor { background: var(--c-orange-warn-bg); color: var(--c-orange-warn); }

        .ir-q2-combined {
            background: #fff;
            border: 1px solid var(--c-border);
            border-radius: 12px;
            padding: 20px 24px;
            display: grid;
            grid-template-columns: auto 1fr 1fr 1fr auto;
            gap: 0 24px;
            align-items: center;
        }

        .ir-q2-combined-col-label { font-size: 11px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--c-muted); margin-bottom: 4px; }
        .ir-q2-combined-col-value { font-size: 17px; font-weight: 700; color: var(--c-primary); }
        .ir-q2-combined-pct { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 28px; font-weight: 700; color: var(--c-orange-warn); }
        .ir-q2-combined-pct-label { font-size: 12px; color: var(--c-muted); }

        /* ── Tables ── */
        .ir-table-wrap { overflow-x: auto; margin-bottom: 28px; }

        .ir-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .ir-table thead tr { background: #eef0f3; }

        .ir-table th {
            padding: 11px 16px;
            text-align: right;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--c-muted);
            border-bottom: 1px solid var(--c-border);
        }

        .ir-table th:first-child { text-align: left; }

        .ir-table td {
            padding: 11px 16px;
            border-bottom: 1px solid var(--c-border);
            text-align: right;
            color: var(--c-secondary);
            white-space: nowrap;
        }

        .ir-table td:first-child { text-align: left; }
        .ir-table tr.row-bold td { font-weight: 700; color: var(--c-primary); }
        .ir-table tr.row-indent td:first-child { padding-left: 32px; font-size: 13px; }
        .ir-table tr.row-total td { font-weight: 700; border-top: 2px solid var(--c-border); color: var(--c-primary); }
        .ir-table tr.row-net td { font-weight: 700; color: var(--c-red); background: var(--c-red-bg); }

        .ir-table th.col-aug { background: #dde0f8; color: #5a6ad4; }
        .ir-table td.col-aug { background: #f5f5ff; font-weight: 700; color: var(--c-primary); }

        .ir-table .mom-up     { color: var(--c-green); }
        .ir-table .mom-down   { color: var(--c-red); }
        .ir-table .mom-neutral { color: var(--c-muted); }

        .ir-table-note { font-size: 12px; color: var(--c-muted); margin-top: -20px; margin-bottom: 28px; line-height: 1.5; font-style: italic; }

        /* ── Warning note ── */
        .ir-note--warning {
            background: var(--color-warning-bg);
            border-left: 3px solid var(--color-warning);
            border-radius: 6px;
            padding: 12px 16px;
            font-size: 13px;
            line-height: 1.65;
            color: var(--c-secondary);
        }

        .ir-note--warning::before { content: "⚠ "; color: var(--color-warning); font-weight: 700; }

        /* ── Product list ── */
        .ir-product-list { list-style: none; }

        .ir-product-item {
            display: flex;
            gap: 12px;
            padding: 13px 0;
            border-bottom: 1px solid var(--c-border);
            font-size: 15px;
            line-height: 1.6;
        }

        .ir-product-item:first-child { border-top: 1px solid var(--c-border); }

        .ir-product-icon {
            width: 20px;
            flex-shrink: 0;
            font-size: 14px;
            font-weight: 700;
            margin-top: 2px;
            text-align: center;
        }

        .ir-product-icon.check { color: var(--c-green); }
        .ir-product-icon.arrow { color: var(--c-accent); }

        /* ── Closing ── */
        .ir-closing {
            background: #fff;
            border: 1px solid var(--c-border);
            border-radius: 12px;
            padding: 24px;
            margin-top: 20px;
            font-size: 15px;
            line-height: 1.75;
            color: var(--c-secondary);
            font-style: italic;
        }

        /* ── Legal Footer ── */
        .ir-footer { background: #f7f8fa; border-top: 1px solid var(--c-border); padding: 32px 24px; margin-top: 32px; }
        .ir-footer-inner { max-width: 960px; margin: 0 auto; }
        .ir-footer-title { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-muted); margin-bottom: 12px; }
        .ir-footer p { font-size: 12px; color: var(--c-muted); line-height: 1.7; margin-bottom: 8px; }
        .ir-footer a { color: var(--c-accent); text-decoration: none; }
        .ir-footer a:hover { text-decoration: underline; }

        /* ── Print ── */
        @media print {
            .ir-header, .ir-footer { display: none; }
            .ir-card { break-inside: avoid; }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
            .ir-header { padding: 14px 16px; }
            .ir-page { padding: 0 16px 60px; }
            .ir-card { padding: 20px; }
            .ir-title-main { font-size: 28px; }
            .ir-kpi-grid { grid-template-columns: repeat(2, 1fr); }
            .ir-kpi-grid-3 { grid-template-columns: repeat(2, 1fr); }
            .ir-q2-grid { grid-template-columns: 1fr; }
            .ir-yoy-banner { grid-template-columns: 1fr; }
            .ir-q2-combined { grid-template-columns: 1fr 1fr; gap: 12px; }
        }
    </style>
</head>
<body>

<?php if (!$authed): ?>
<div id="gate">
    <div class="gate-wrap">
        <a class="gate-logo" href="#">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="#152330"/>
                <rect x="9" y="13" width="6" height="8" rx="1" fill="#fff"/>
            </svg>
            <span class="gate-logo-text">beycome</span>
        </a>
        <div class="gate-title">Investor Portal</div>
        <div class="gate-sub">Enter your access password to continue</div>
        <form method="POST">
            <input type="password" name="password" class="gate-input" placeholder="Password" autocomplete="current-password">
            <?php if (isset($_POST['password'])): ?>
            <div class="gate-error">Incorrect password. Please try again.</div>
            <?php endif; ?>
            <button type="submit" class="gate-btn">Continue</button>
        </form>
        <p class="gate-note">This portal contains confidential information intended solely for Beycome investors.</p>
    </div>
</div>
<?php else: ?>

<header class="ir-header">
    <a class="ir-header-logo" href="index.php">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="#152330"/>
            <rect x="9" y="13" width="6" height="8" rx="1" fill="#fff"/>
        </svg>
        <span class="ir-header-logo-text">beycome</span>
    </a>
    <div class="ir-header-actions">
        <button class="ir-header-btn" onclick="window.print()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print / PDF
        </button>
        <a href="index.php" class="ir-header-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Back
        </a>
        <form method="POST" style="margin:0;">
            <button type="submit" name="logout" class="ir-header-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Log out
            </button>
        </form>
    </div>
</header>

<div class="ir-page">

    <div class="ir-title-block">
        <div class="ir-title-label">Monthly Operating Update</div>
        <h1 class="ir-title-main">Beycome Investor Report<br>August 2026</h1>
        <div class="ir-title-sub">AI-first real estate platform &nbsp;·&nbsp; Confidential</div>
    </div>

    <!-- 01 Executive Summary -->
    <div class="ir-card">
        <div class="ir-card-header">
            <div class="ir-card-num">01</div>
            <h2 class="ir-card-title">Executive Summary</h2>
        </div>

        <div class="ir-sub-label">Overview</div>

        <p class="ir-text">
            Revenue was <strong>$374,300</strong> in August — the second-highest month in company history — barely equal to July's record of $372,893 (+0.4% MoM). Basic Listing was $119,478 (–3.4%), Enhanced Listing $40,299 (–3.8%) and Concierge $24,975 (–10.7%). Title revenue reached <strong>$141,830</strong> (+16.2%) — a new record for the second consecutive month, including the first revenue from Harris County, Texas — and Buy Side was $29,339 (–26.9% from July, still the second-strongest month of the year).
        </p>
        <p class="ir-text">
            Through two months, Q3 stands at <strong>93.4%</strong> of the combined quarterly target on a run-rate basis. The Buyer Program has already collected $69,486 (run rate: 139.0% of its full-quarter $75K target), Title is running at 113.1% of its $350K target, and Listings are at 80.2% of the $775K target.
        </p>
        <p class="ir-text">
            Listing client volume was <strong>1,297</strong> in August (1,171 Basic, 101 Enhanced, 25 Concierge), down 5.5% from 1,372 in July, while 877 new customers were acquired (–2.2%). Title operations opened 44 orders and funded 37, with a closing cancellation rate of 11% (10% in July, down from 45% in May); 88 Basic + Title bundles were sold (+54% vs July). The Buyer Program signed 9 BBAs (vs 6 in July) and closed 6 deals (vs 4). Refund activity was $12,087 (78 transactions), down 16.7% from $14,519 (91 transactions) in July. Active users were 74,000 per Google Analytics (+12.1% vs July) — the third month on the clean post-IP-protection baseline.
        </p>
        <p class="ir-text">
            Gross margin was <strong>78.4%</strong>, versus 78.8% in July: cost of revenue rose to $80,778 (+2.1%) on record Title closing volume — Title costs were $37,448 (+14.5%) — while sell-side costs fell to $40,119 (–7.0%) on lower Stripe chargebacks ($6,289 vs $9,238 in July). Total S&amp;M fell to $137,477 (–14.3%), with traffic spend of $90,657 (–6.7%), and Total SG&amp;A declined 5.1% to $317,734; People was $114,688 (+2.2%) and Other G&amp;A $65,569 (+5.4%).
        </p>
        <p class="ir-text">
            Net loss narrowed to <strong>($20,871)</strong>, representing a –5.6% net margin versus –10.7% in July — the best month of the year. Traffic CAC was $70 per listing client (vs $71 in July) and total CAC was $106 (vs $117); revenue per client rose to $289 from $272 (+6.3%), lifting the revenue-to-CAC ratio to 2.7x.
        </p>
        <p class="ir-text">
            Cash on hand was <strong>$1,634,151</strong> across all entities as of end of August, down $64,723 from July: beyond the ($20,871) net loss, the month absorbed the settlement of July's accrued broker fees ($12,000) and a net $24.3K reduction in credit-card balances across entities. There were no JV distributions in August, and intercompany receivables due from Beycome Title LLC declined $11,285 on the Corp balance sheet. Estimated runway is 40.3 months based on the trailing 4-month average net loss of $40,572; on a cash basis, balances declined $63.0K per month over the same period (~26 months of coverage).
        </p>

        <div class="ir-yoy-banner">
            <div class="ir-yoy-card">
                <div class="ir-yoy-value">$374,300</div>
                <div class="ir-yoy-label">Revenue — 2nd-Highest Month</div>
                <div class="ir-yoy-sub">+0.4% vs July record ($372,893)</div>
            </div>
            <div class="ir-yoy-card">
                <div class="ir-yoy-value">–5.6%</div>
                <div class="ir-yoy-label">Net Margin — Best Month of Year</div>
                <div class="ir-yoy-sub">vs –10.7% in July · ($20,871) net loss</div>
            </div>
            <div class="ir-yoy-card">
                <div class="ir-yoy-value">40.3 mo</div>
                <div class="ir-yoy-label">Runway</div>
                <div class="ir-yoy-sub">$1.63M cash · trailing-4 avg net loss $40,572/mo</div>
            </div>
        </div>
    </div>

    <!-- 02 Key Performance Indicators -->
    <div class="ir-card">
        <div class="ir-card-header">
            <div class="ir-card-num">02</div>
            <h2 class="ir-card-title">Key Performance Indicators</h2>
        </div>

        <div class="ir-sub-label">Marketplace</div>
        <div class="ir-kpi-grid">
            <div class="ir-kpi">
                <div class="ir-kpi-val">1,297</div>
                <div class="ir-kpi-lbl">Listing Clients (August)</div>
                <div class="ir-kpi-delta down">–5.5% vs July (1,372)</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">74K</div>
                <div class="ir-kpi-lbl">Active Users (August)</div>
                <div class="ir-kpi-delta up">+12.1% vs July (66K) — clean baseline</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">$12,087</div>
                <div class="ir-kpi-lbl">Refunds (August)</div>
                <div class="ir-kpi-delta up">–16.7% vs July ($14,519)</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">877</div>
                <div class="ir-kpi-lbl">New Customers</div>
                <div class="ir-kpi-delta down">–2.2% vs July</div>
            </div>
        </div>

        <div class="ir-sub-label">Revenue Breakdown — August 2026</div>
        <div class="ir-kpi-grid">
            <div class="ir-kpi">
                <div class="ir-kpi-val">$119.5K</div>
                <div class="ir-kpi-lbl">Basic Listing</div>
                <div class="ir-kpi-delta down">–3.4% vs July</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">$40.3K</div>
                <div class="ir-kpi-lbl">Enhanced Listing</div>
                <div class="ir-kpi-delta down">–3.8% vs July</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">$25.0K</div>
                <div class="ir-kpi-lbl">Concierge</div>
                <div class="ir-kpi-delta down">–10.7% vs July</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">$141.8K</div>
                <div class="ir-kpi-lbl">Title</div>
                <div class="ir-kpi-delta up">+16.2% vs July — new record · Harris County TX</div>
            </div>
        </div>
        <div class="ir-kpi-grid" style="margin-top:10px;">
            <div class="ir-kpi">
                <div class="ir-kpi-val">$29.3K</div>
                <div class="ir-kpi-lbl">Buy Side</div>
                <div class="ir-kpi-delta down">–26.9% vs July ($40.1K) · 2nd-best of year</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">$18.4K</div>
                <div class="ir-kpi-lbl">Other Sell Side</div>
                <div class="ir-kpi-delta up">+9.7% — incl. add-ons, refunds</div>
            </div>
        </div>

        <div class="ir-sub-label">Unit Economics — August 2026</div>
        <div class="ir-kpi-grid">
            <div class="ir-kpi">
                <div class="ir-kpi-val">$106</div>
                <div class="ir-kpi-lbl">CAC (Total S&M)</div>
                <div class="ir-kpi-delta up">vs $117 July (–9.4%)</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">$70</div>
                <div class="ir-kpi-lbl">Traffic CAC</div>
                <div class="ir-kpi-delta up">vs $71 July</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">$289</div>
                <div class="ir-kpi-lbl">Rev / Client</div>
                <div class="ir-kpi-delta up">+6.3% vs July ($272)</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">2.7x</div>
                <div class="ir-kpi-lbl">Rev / CAC Ratio</div>
                <div class="ir-kpi-delta up">vs 2.3x July</div>
            </div>
        </div>

        <div class="ir-sub-label">S&amp;M Breakdown — August 2026</div>
        <div class="ir-table-wrap">
            <table class="ir-table">
                <thead>
                    <tr>
                        <th style="width:55%">Line Item</th>
                        <th>Aug 2026</th>
                        <th>% of S&M</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Advertising &amp; Marketing</td><td>($86,339)</td><td>62.8%</td></tr>
                    <tr><td>Broker Fees</td><td>($20,641)</td><td>15.0%</td></tr>
                    <tr><td>Seller Program</td><td>($10,696)</td><td>7.8%</td></tr>
                    <tr><td>MLS Fees</td><td>($9,002)</td><td>6.5%</td></tr>
                    <tr><td>MLS Support</td><td>($5,588)</td><td>4.1%</td></tr>
                    <tr><td>Marketing Acquisition</td><td>($4,318)</td><td>3.1%</td></tr>
                    <tr><td>MLS Subscriptions</td><td>($643)</td><td>0.5%</td></tr>
                    <tr><td>Other (Hiring, Software)</td><td>($250)</td><td>0.2%</td></tr>
                    <tr class="row-bold"><td>Total S&amp;M</td><td>($137,477)</td><td>100%</td></tr>
                    <tr class="row-indent"><td>Traffic (Adv + Acquisition)</td><td>($90,657)</td><td>65.9%</td></tr>
                    <tr class="row-indent"><td>Non-traffic</td><td>($46,820)</td><td>34.1%</td></tr>
                </tbody>
            </table>
        </div>
        <p class="ir-table-note" style="margin-top:0;">From August, paid-traffic spend is recorded under Advertising &amp; Marketing rather than Marketing Acquisition; traffic spend is comparable in aggregate only.</p>
    </div>

    <!-- 03 Q3 2026 Revenue Targets -->
    <div class="ir-card">
        <div class="ir-card-header">
            <div class="ir-card-num">03</div>
            <h2 class="ir-card-title">Q3 2026 Revenue Targets</h2>
        </div>
        <p class="ir-text" style="margin-bottom:20px;">Jul + Aug actuals vs Q3 targets published in the Q2 2026 investor report. Run rate assumes the average monthly pace sustained through the quarter (avg × 3).</p>

        <div class="ir-q2-grid">
            <div class="ir-q2-card">
                <div class="ir-q2-stream">Listings</div>
                <div class="ir-q2-pct orange">80.2%</div>
                <div class="ir-q2-pct-sub">of target at run rate</div>
                <div class="ir-progress"><div class="ir-progress-fill orange" style="width:80.2%"></div></div>
                <div class="ir-q2-row"><span>Jul+Aug Actual</span><strong>$414,315</strong></div>
                <div class="ir-q2-row"><span>Run Rate (×3)</span><strong>$621,473</strong></div>
                <div class="ir-q2-row"><span>Q3 Target</span><strong>$775,000</strong></div>
                <span class="ir-q2-badge monitor">MONITOR</span>
            </div>
            <div class="ir-q2-card">
                <div class="ir-q2-stream">Title</div>
                <div class="ir-q2-pct green">113.1%</div>
                <div class="ir-q2-pct-sub">of target at run rate</div>
                <div class="ir-progress"><div class="ir-progress-fill green" style="width:100%"></div></div>
                <div class="ir-q2-row"><span>Jul+Aug Actual</span><strong>$263,842</strong></div>
                <div class="ir-q2-row"><span>Run Rate (×3)</span><strong>$395,763</strong></div>
                <div class="ir-q2-row"><span>Q3 Target</span><strong>$350,000</strong></div>
                <span class="ir-q2-badge beaten">ON TRACK</span>
            </div>
            <div class="ir-q2-card">
                <div class="ir-q2-stream">Buyer</div>
                <div class="ir-q2-pct green">139.0%</div>
                <div class="ir-q2-pct-sub">of target at run rate</div>
                <div class="ir-progress"><div class="ir-progress-fill green" style="width:100%"></div></div>
                <div class="ir-q2-row"><span>Jul+Aug Actual</span><strong>$69,486</strong></div>
                <div class="ir-q2-row"><span>Run Rate (×3)</span><strong>$104,229</strong></div>
                <div class="ir-q2-row"><span>Q3 Target</span><strong>$75,000</strong></div>
                <span class="ir-q2-badge beaten">ON TRACK</span>
            </div>
        </div>

        <div class="ir-q2-combined">
            <div>
                <div class="ir-q2-combined-col-label">Combined Q3</div>
            </div>
            <div>
                <div class="ir-q2-combined-col-label">Jul+Aug Actual</div>
                <div class="ir-q2-combined-col-value">$747,193</div>
            </div>
            <div>
                <div class="ir-q2-combined-col-label">Run Rate (avg ×3)</div>
                <div class="ir-q2-combined-col-value">$1,120,790</div>
            </div>
            <div>
                <div class="ir-q2-combined-col-label">Q3 Target</div>
                <div class="ir-q2-combined-col-value">$1,200,000</div>
            </div>
            <div style="text-align:right; padding-left:20px; border-left: 1px solid var(--c-border);">
                <div class="ir-q2-combined-pct">93.4%</div>
                <div class="ir-q2-combined-pct-label">of target at pace</div>
            </div>
        </div>
    </div>

    <!-- 04 Financial Health -->
    <div class="ir-card">
        <div class="ir-card-header">
            <div class="ir-card-num">04</div>
            <h2 class="ir-card-title">Financial Health</h2>
        </div>
        <div class="ir-kpi-grid">
            <div class="ir-kpi">
                <div class="ir-kpi-val">$1.63M</div>
                <div class="ir-kpi-lbl">Cash Balance</div>
                <div class="ir-kpi-delta flat">End of August 2026</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val" style="color:var(--c-red);">($40.6K)</div>
                <div class="ir-kpi-lbl">Avg Monthly Net Loss</div>
                <div class="ir-kpi-delta flat">Trailing 4 months (P&L)</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">40.3 mo</div>
                <div class="ir-kpi-lbl">Runway</div>
                <div class="ir-kpi-delta up">vs 37.2 mo in July (+3.1 mo)</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">78.4%</div>
                <div class="ir-kpi-lbl">Gross Margin</div>
                <div class="ir-kpi-delta down">vs 78.8% in July (–0.4pp)</div>
            </div>
        </div>
        <p class="ir-text" style="margin-top:16px; font-size:13px; color:var(--c-muted); font-style:italic;">
            August cash movement (–$64,723) exceeded the ($20,871) net loss as July's accrued broker fees ($12,000) were settled and credit-card balances fell a net ~$24.3K across entities; there were no JV distributions in the month. On a cash basis, balances declined $63.0K per month over the trailing four months (~26 months of coverage).
        </p>
    </div>

    <!-- 05 Financial Statements -->
    <div class="ir-card">
        <div class="ir-card-header">
            <div class="ir-card-num">05</div>
            <h2 class="ir-card-title">Financial Statements</h2>
        </div>

        <div class="ir-sub-label">Consolidated P&amp;L — July 2026 vs August 2026</div>
        <div class="ir-table-wrap">
            <table class="ir-table">
                <thead>
                    <tr>
                        <th style="width:42%">Line Item</th>
                        <th>Jul 2026</th>
                        <th class="col-aug">Aug 2026</th>
                        <th>MoM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row-bold">
                        <td>Revenue</td><td>$372,893</td><td class="col-aug">$374,300</td><td class="mom-up">+0.4%</td>
                    </tr>
                    <tr class="row-bold">
                        <td>Cost of Revenue</td><td>($79,135)</td><td class="col-aug">($80,778)</td><td class="mom-down">+2.1%</td>
                    </tr>
                    <tr class="row-indent">
                        <td>Sell Side COGS</td><td>($43,116)</td><td class="col-aug">($40,119)</td><td class="mom-up">–7.0%</td>
                    </tr>
                    <tr class="row-indent">
                        <td>Buy Side COGS</td><td>($3,300)</td><td class="col-aug">($3,211)</td><td class="mom-up">–2.7%</td>
                    </tr>
                    <tr class="row-indent">
                        <td>Title COGS</td><td>($32,718)</td><td class="col-aug">($37,448)</td><td class="mom-down">+14.5%</td>
                    </tr>
                    <tr class="row-bold">
                        <td>Gross Profit</td><td>$293,758</td><td class="col-aug">$293,522</td><td class="mom-neutral">–0.1%</td>
                    </tr>
                    <tr>
                        <td>% Gross Margin</td><td>78.8%</td><td class="col-aug">78.4%</td><td class="mom-down">–0.4pp</td>
                    </tr>
                    <tr>
                        <td>Sales &amp; Marketing</td><td>($160,468)</td><td class="col-aug">($137,477)</td><td class="mom-up">–14.3%</td>
                    </tr>
                    <tr>
                        <td>People</td><td>($112,261)</td><td class="col-aug">($114,688)</td><td class="mom-down">+2.2%</td>
                    </tr>
                    <tr>
                        <td>Other G&amp;A</td><td>($62,201)</td><td class="col-aug">($65,569)</td><td class="mom-down">+5.4%</td>
                    </tr>
                    <tr class="row-bold">
                        <td>Total SG&amp;A</td><td>($334,930)</td><td class="col-aug">($317,734)</td><td class="mom-up">–5.1%</td>
                    </tr>
                    <tr>
                        <td>Other Income / (Expense)</td><td>$1,212</td><td class="col-aug">$3,341</td><td></td>
                    </tr>
                    <tr class="row-net">
                        <td>Net Income</td><td>($39,960)</td><td>($20,871)</td><td></td>
                    </tr>
                    <tr>
                        <td>% Net Margin</td><td>–10.7%</td><td class="col-aug">–5.6%</td><td class="mom-up">+5.1pp</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="ir-table-note">Consolidated P&amp;L across Beycome Corp, Beycome Title of Florida LLC (1 &amp; 2) and Beycome Title of Texas LLC. Source: QuickBooks (accrual basis), August month-end close. Figures rounded to the nearest dollar; totals may not foot due to rounding. July shown as published. After the July report, retroactive entries were posted to February–July (broker fees of $2,000/month — $12,000 total — accrued into July payables and settled in August, plus minor items). Other income is non-operating income recorded at Beycome Title of Florida. Title revenue includes a $7,731 retroactive correction recognized in August.</p>
    </div>

    <!-- 06 SEO & Traffic -->
    <div class="ir-card">
        <div class="ir-card-header">
            <div class="ir-card-num">06</div>
            <h2 class="ir-card-title">SEO &amp; Traffic</h2>
        </div>

        <div class="ir-sub-label">Google Search Console — August 2026</div>
        <div class="ir-kpi-grid">
            <div class="ir-kpi">
                <div class="ir-kpi-val">1.24M</div>
                <div class="ir-kpi-lbl">GSC Impressions</div>
                <div class="ir-kpi-delta up">+25% vs prior period (990.1K)</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">14,414</div>
                <div class="ir-kpi-lbl">GSC Clicks</div>
                <div class="ir-kpi-delta up">+15% vs prior period (12,561)</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">1.13%</div>
                <div class="ir-kpi-lbl">GSC CTR</div>
                <div class="ir-kpi-delta flat">August average</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">12.6</div>
                <div class="ir-kpi-lbl">GSC Avg Position</div>
                <div class="ir-kpi-delta down">vs 11.5 prior period</div>
            </div>
        </div>

        <div class="ir-sub-label">Google Analytics — August 2026</div>
        <div class="ir-kpi-grid">
            <div class="ir-kpi">
                <div class="ir-kpi-val">74,000</div>
                <div class="ir-kpi-lbl">Active Users</div>
                <div class="ir-kpi-delta up">+12.1% vs July (66K)</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">$90,657</div>
                <div class="ir-kpi-lbl">Traffic Spend</div>
                <div class="ir-kpi-delta up">–6.7% vs July ($97.2K)</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">$70</div>
                <div class="ir-kpi-lbl">Traffic CAC / Client</div>
                <div class="ir-kpi-delta up">vs $71 in July</div>
            </div>
            <div class="ir-kpi">
                <div class="ir-kpi-val">3rd mo</div>
                <div class="ir-kpi-lbl">Clean Baseline</div>
                <div class="ir-kpi-delta flat">Post IP-protection reset</div>
            </div>
        </div>
    </div>

    <!-- 07 Product & Technology -->
    <div class="ir-card">
        <div class="ir-card-header">
            <div class="ir-card-num">07</div>
            <h2 class="ir-card-title">Product &amp; Technology</h2>
        </div>

        <div class="ir-sub-label">What We Shipped in August</div>
        <ul class="ir-product-list">
            <li class="ir-product-item">
                <span class="ir-product-icon check">✓</span>
                <span>Created new metrics to classify support escalations, and added a dedicated CSAT rating for Artur.</span>
            </li>
            <li class="ir-product-item">
                <span class="ir-product-icon check">✓</span>
                <span>Improved MLS security in the back-office (VPN now enforced) and added a cool-down period to avoid being flagged for excessive speed on MLS.</span>
            </li>
            <li class="ir-product-item">
                <span class="ir-product-icon check">✓</span>
                <span>Added per-MLS lists of forbidden keywords; MLS latest news now displayed in the back-office.</span>
            </li>
            <li class="ir-product-item">
                <span class="ir-product-icon check">✓</span>
                <span>New website responds ~5× faster overall, with TTFB ~5.7× faster; improved handling of virtually staged pictures.</span>
            </li>
            <li class="ir-product-item">
                <span class="ir-product-icon check">✓</span>
                <span>Added fallback scenarios for database, cache or GitHub outages, a new infrastructure status page, a disaster-recovery plan for the new website, and a full automation monitor.</span>
            </li>
            <li class="ir-product-item">
                <span class="ir-product-icon check">✓</span>
                <span>Updated the make-an-offer page and process.</span>
            </li>
        </ul>

        <div class="ir-sub-label" style="margin-top:28px;">In Progress</div>
        <ul class="ir-product-list">
            <li class="ir-product-item">
                <span class="ir-product-icon arrow">→</span>
                <span>Moving the Sales and CS teams to the new back-office to sunset the legacy one.</span>
            </li>
        </ul>

        <div class="ir-closing">
            Thank you for your continued partnership. We remain committed to building a durable business and will continue to operate with transparency and discipline. Questions or feedback are always welcome.<br>
            — The Beycome Team
        </div>
    </div>

</div>

<footer class="ir-footer">
    <div class="ir-footer-inner">
        <div class="ir-footer-title">Confidentiality &amp; Legal Notice</div>
        <p>This portal contains confidential and proprietary information of Beycome Corp. and is intended solely for the use of authorized investors and prospective investors of Beycome. Access to this portal is restricted and subject to applicable confidentiality obligations.</p>
        <p>If you have accessed this portal in error, you are not authorized to review, use, copy, disclose, or distribute any of the information contained herein. Please exit immediately and notify us at <a href="mailto:policy@beycome.com">policy@beycome.com</a> so that we can take appropriate action.</p>
        <p>All content, materials, data, financial information, projections, and communications available through this portal are provided for informational purposes only and do not constitute an offer to sell, a solicitation of an offer to buy, or a recommendation to invest in any securities. Any investment in Beycome is subject to formal documentation, applicable securities laws, and investor qualification requirements.</p>
        <p>Questions or feedback — <a href="mailto:nj@beycome.com">nj@beycome.com</a> &amp; <a href="mailto:cyril@beycome.com">cyril@beycome.com</a></p>
    </div>
</footer>

<?php endif; ?>

</body>
</html>
