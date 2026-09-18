<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['logout'])) {
        session_destroy();
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit;
    }
    if (($_POST['password'] ?? '') === 'beycome2026') {
        $_SESSION['investor_auth'] = true;
    }
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
    <title>Beycome Investor Portal</title>
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
            --c-border: #e2e8f0;
            --c-card-bg: #f7f8fa;
            --c-green: #2f9c60;
            --c-green-bg: rgba(47,156,96,0.08);
            --c-red: #c0392b;
            --c-red-bg: #fdf2f2;
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
        .ir-page { max-width: 760px; margin: 0 auto; padding: 0 24px 80px; }

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
            font-size: 36px;
            font-weight: 700;
            color: var(--c-primary);
            line-height: 1.15;
            margin-bottom: 12px;
        }

        .ir-title-sub { font-size: 16px; color: var(--c-muted); }

        /* ── Report list ── */
        .ir-year-label {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--c-muted);
            margin: 32px 0 12px;
        }

        .ir-report-list { list-style: none; }

        .ir-report-item a {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 20px;
            border: 1px solid var(--c-border);
            border-radius: 12px;
            text-decoration: none;
            margin-bottom: 10px;
            transition: border-color 0.15s, background 0.15s;
            background: #fff;
        }

        .ir-report-item a:hover { border-color: var(--c-accent); background: var(--c-card-bg); }

        .ir-report-left { display: flex; align-items: center; gap: 14px; }

        .ir-report-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: var(--c-accent-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .ir-report-icon svg { color: var(--c-accent); }

        .ir-report-name { font-size: 16px; font-weight: 700; color: var(--c-primary); }
        .ir-report-meta { font-size: 13px; color: var(--c-muted); margin-top: 2px; }

        .ir-report-badge {
            font-size: 11px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 999px;
            background: var(--c-green-bg);
            color: var(--c-green);
            letter-spacing: 0.04em;
        }

        .ir-report-badge.quarterly {
            background: var(--c-accent-bg);
            color: var(--c-accent);
        }

        .ir-report-chevron { color: var(--c-border); }

        /* ── Footer ── */
        .ir-footer { background: #f7f8fa; border-top: 1px solid var(--c-border); padding: 32px 24px; margin-top: 32px; }
        .ir-footer-inner { max-width: 760px; margin: 0 auto; }
        .ir-footer-title { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-muted); margin-bottom: 12px; }
        .ir-footer p { font-size: 12px; color: var(--c-muted); line-height: 1.7; margin-bottom: 8px; }
        .ir-footer a { color: var(--c-accent); text-decoration: none; }
        .ir-footer a:hover { text-decoration: underline; }

        @media (max-width: 600px) {
            .ir-header { padding: 14px 16px; }
            .ir-page { padding: 0 16px 60px; }
            .ir-title-main { font-size: 26px; }
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
        <div class="ir-title-label">Confidential</div>
        <h1 class="ir-title-main">Beycome Investor Portal</h1>
        <div class="ir-title-sub">Monthly operating updates &amp; quarterly reports</div>
    </div>

    <div class="ir-year-label">2026 — Q3</div>
    <ul class="ir-report-list">
        <li class="ir-report-item">
            <a href="aug-2026.php">
                <div class="ir-report-left">
                    <div class="ir-report-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    </div>
                    <div>
                        <div class="ir-report-name">August 2026</div>
                        <div class="ir-report-meta">Revenue $374,300 &nbsp;·&nbsp; Net loss ($20,871) &nbsp;·&nbsp; –5.6% margin</div>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:10px;">
                    <span class="ir-report-badge">Latest</span>
                    <svg class="ir-report-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
            </a>
        </li>
        <li class="ir-report-item">
            <a href="jul-2026.php">
                <div class="ir-report-left">
                    <div class="ir-report-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    </div>
                    <div>
                        <div class="ir-report-name">July 2026</div>
                        <div class="ir-report-meta">Revenue $372,893 &nbsp;·&nbsp; Net loss ($39,960) &nbsp;·&nbsp; –10.7% margin</div>
                    </div>
                </div>
                <svg class="ir-report-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
        </li>
    </ul>

    <div class="ir-year-label">2026 — Q2</div>
    <ul class="ir-report-list">
        <li class="ir-report-item">
            <a href="q2-2026.php">
                <div class="ir-report-left">
                    <div class="ir-report-icon" style="background:var(--c-accent-bg);">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--c-accent)"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
                    </div>
                    <div>
                        <div class="ir-report-name">Q2 2026 — Quarterly Report</div>
                        <div class="ir-report-meta">April · May · June · Full-quarter summary</div>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:10px;">
                    <span class="ir-report-badge quarterly">Quarterly</span>
                    <svg class="ir-report-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
            </a>
        </li>
        <li class="ir-report-item">
            <a href="jun-2026.php">
                <div class="ir-report-left">
                    <div class="ir-report-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    </div>
                    <div>
                        <div class="ir-report-name">June 2026</div>
                        <div class="ir-report-meta">Monthly operating update</div>
                    </div>
                </div>
                <svg class="ir-report-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
        </li>
    </ul>

</div>

<footer class="ir-footer">
    <div class="ir-footer-inner">
        <div class="ir-footer-title">Confidentiality &amp; Legal Notice</div>
        <p>This portal contains confidential and proprietary information of Beycome Corp. and is intended solely for the use of authorized investors and prospective investors of Beycome. Access to this portal is restricted and subject to applicable confidentiality obligations.</p>
        <p>Questions or feedback — <a href="mailto:nj@beycome.com">nj@beycome.com</a> &amp; <a href="mailto:cyril@beycome.com">cyril@beycome.com</a></p>
    </div>
</footer>

<?php endif; ?>

</body>
</html>
