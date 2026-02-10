import { toggleMenu } from '../utils.js';

export function renderNav() {
    return `<div class="nav-greeting-section"><span class="nav-greeting" id="navGreeting"></span></div>
    <div class="nav-container">
        <ul class="nav-menu">
            <li class="nav-item"><a href="javascript:void(0)" class="nav-link">Dashboard</a></li>
            <li class="nav-item"><a href="/your-listing" class="nav-link">Properties</a></li>
            <li class="nav-item"><a href="/offers" class="nav-link active">Offers<span class="nav-badge">1</span></a></li>
            <li class="nav-item"><a href="/requested-show" class="nav-link">Showings<span class="nav-badge" id="visitsBadge">2</span></a></li>
            <li class="nav-item"><a href="/your-messages" class="nav-link">Inbox<span class="nav-badge" id="messagesBadge">3</span></a></li>
            <li class="nav-item"><a href="/calendar" class="nav-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></a></li>
            <li class="nav-item" style="position: relative;">
                <a href="javascript:void(0)" class="nav-link has-dropdown" id="moreNavBtn">More<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
                <div class="menu right" id="toolsMenu">
                    <a href="/profile" class="menu-item">Account</a>
                    <a href="/contract" class="menu-item">Contract Center</a>
                </div>
            </li>
        </ul>
    </div>`;
}

export function initNav() {
    setGreeting();
    const moreBtn = document.getElementById('moreNavBtn');
    if (moreBtn) moreBtn.addEventListener('click', (e) => toggleMenu('toolsMenu', e));
}

function setGreeting() {
    const h = new Date().getHours();
    let g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    let i = h < 12 ? '☀️' : h < 17 ? '🌤️' : '🌙';
    const el = document.getElementById('navGreeting');
    if (el) el.innerHTML = '<span style="font-size: 20px; line-height: 1;">' + i + '</span> ' + g + ', John Doe';
}

export function updateMessagesBadge(count) {
    const b = document.getElementById('messagesBadge');
    if (!b) return;
    if (count > 0) { b.textContent = count; b.style.display = 'flex'; }
    else b.style.display = 'none';
}

export function updateVisitsBadge(count) {
    const b = document.getElementById('visitsBadge');
    if (!b) return;
    if (count > 0) { b.textContent = count; b.style.display = 'flex'; }
    else b.style.display = 'none';
}
