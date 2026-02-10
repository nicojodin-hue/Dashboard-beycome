import { toggleMenu, closeAllDropdowns, showMobileToast } from '../utils.js';

export function renderFooter() {
    return `<div class="mobile-bottom-nav-chat">
        <div class="mobile-nav-chat-wrapper">
            <input type="text" class="mobile-nav-chat-input" id="mobileNavChatInput" placeholder="Ask Artur anything…">
            <button class="mobile-nav-chat-attach"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>
            <button class="mobile-nav-chat-mic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg></button>
            <button class="mobile-nav-chat-send" id="mobileNavChatSend"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></button>
        </div>
    </div>
    <div class="mobile-bottom-nav-items">
        <div class="mobile-bottom-nav-item" data-route="/your-listing">
            <div class="mobile-bottom-nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>
            <span class="mobile-bottom-nav-label">Properties</span>
        </div>
        <div class="mobile-bottom-nav-item active" data-route="/offers">
            <div class="mobile-bottom-nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg><span class="mobile-bottom-nav-badge">1</span></div>
            <span class="mobile-bottom-nav-label">Offers</span>
        </div>
        <div class="mobile-bottom-nav-item" data-route="/requested-show">
            <div class="mobile-bottom-nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg><span class="mobile-bottom-nav-badge" id="mobileVisitsBadge">2</span></div>
            <span class="mobile-bottom-nav-label">Showings</span>
        </div>
        <div class="mobile-bottom-nav-item" data-route="/your-messages">
            <div class="mobile-bottom-nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><span class="mobile-bottom-nav-badge" id="mobileMessagesBadge">3</span></div>
            <span class="mobile-bottom-nav-label">Inbox</span>
        </div>
        <div class="mobile-more-wrapper">
            <div class="menu up right" id="mobileDropupMenu">
                <button class="menu-item" data-route="/calendar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>Calendar</button>
                <button class="menu-item" data-route="/contract"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>Contracts</button>
                <button class="menu-item" data-route="/profile"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>Account</button>
            </div>
            <div class="mobile-bottom-nav-item" id="mobileMoreBtn">
                <div class="mobile-bottom-nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></div>
                <span class="mobile-bottom-nav-label">More</span>
            </div>
        </div>
    </div>`;
}

export function initFooter() {
    document.querySelectorAll('.mobile-bottom-nav-item[data-route]').forEach(item => {
        item.addEventListener('click', () => { window.location.hash = item.dataset.route; });
    });
    document.querySelectorAll('#mobileDropupMenu .menu-item[data-route]').forEach(item => {
        item.addEventListener('click', () => { window.location.hash = item.dataset.route; closeAllDropdowns(); });
    });
    const moreBtn = document.getElementById('mobileMoreBtn');
    if (moreBtn) moreBtn.addEventListener('click', (e) => toggleMenu('mobileDropupMenu', e));
    const sendBtn = document.getElementById('mobileNavChatSend');
    if (sendBtn) sendBtn.addEventListener('click', sendMobileNavChat);
    const chatInput = document.getElementById('mobileNavChatInput');
    if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMobileNavChat(); });
}

function sendMobileNavChat() {
    const input = document.getElementById('mobileNavChatInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    showMobileToast('Message sent to Artur!');
}

export function updateMobileBadges(pendingVisits, unreadMessages) {
    const vb = document.getElementById('mobileVisitsBadge');
    if (vb) { if (pendingVisits > 0) { vb.textContent = pendingVisits; vb.style.display = 'flex'; } else vb.style.display = 'none'; }
    const mb = document.getElementById('mobileMessagesBadge');
    if (mb) { if (unreadMessages > 0) { mb.textContent = unreadMessages; mb.style.display = 'flex'; } else mb.style.display = 'none'; }
}
