import { toggleMenu, isDesktopView, showMobileToast } from '../utils.js';
import { addChatMessage } from '../components/chat.js';
import { showMessageModal, showSuccess } from '../components/modals.js';

let pendingVisitsCount = 2;

export function render() {
    return `<div class="visit-tabs">
        <div class="filter-dropdown">
            <button class="filter-btn" id="visitFilterBtn"><span id="filterDropdownText">All</span><span class="filter-count" id="filterDropdownCount">3</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
            <div class="menu" id="filterDropdownMenu">
                <button class="menu-item active" data-filter="all">All <span class="filter-count">3</span></button>
                <button class="menu-item" data-filter="received">Received <span class="filter-count">2</span></button>
                <button class="menu-item" data-filter="requested">Requested <span class="filter-count">1</span></button>
            </div>
        </div>
    </div>
    <div id="visitsReceived">
        <div class="visit-card" data-status="pending" id="visit1">
            <div class="visit-card-content">
                <div class="visit-info">
                    <h3><span class="address-main">1505 N Jean Baptiste Pointe du Sable Lake Shore Dr</span><span class="address-secondary">Bonadelle Ranchos-Madera Ranchos, CA 33135</span></h3>
                    <div class="visit-meta-row">
                        <span><strong>Jan 28 · 10:00 AM</strong></span><span>from <strong>John Smith</strong></span>
                        <button class="contact-icon-btn" data-contact='{"name":"John Smith","address":"1505 N Jean Baptiste Pointe du Sable Lake Shore Dr","email":"john.smith@email.com","phone":"(305) 555-1234","title":"Visit request for"}'><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                        <span class="status-badge pending">Pending</span>
                    </div>
                </div>
                <div class="visit-actions">
                    <button class="btn decline-btn">Decline</button>
                    <button class="btn btn-success accept-btn">Accept</button>
                </div>
            </div>
        </div>
        <div class="visit-card" data-status="pending" id="visit2">
            <div class="visit-card-content">
                <div class="visit-info">
                    <h3><span class="address-main">456 Ocean Drive</span><span class="address-secondary">Miami Beach, FL 33139</span></h3>
                    <div class="visit-meta-row">
                        <span><strong>Jan 30 · 2:30 PM</strong></span><span>from <strong>Sarah Johnson</strong></span>
                        <button class="contact-icon-btn" data-contact='{"name":"Sarah Johnson","address":"456 Ocean Drive, Miami Beach, FL","email":"sarah.johnson@email.com","phone":"(305) 555-5678","title":"Visit request for"}'><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                        <span class="status-badge pending">Pending</span>
                    </div>
                </div>
                <div class="visit-actions">
                    <button class="btn decline-btn">Decline</button>
                    <button class="btn btn-success accept-btn">Accept</button>
                </div>
            </div>
        </div>
    </div>
    <div id="visitsRequested">
        <div class="visit-card" id="requestedVisit1">
            <div class="visit-card-content">
                <div class="visit-info">
                    <h3><span class="address-main">789 Palm Avenue</span><span class="address-secondary">Coral Gables, FL 33134</span></h3>
                    <div class="visit-meta-row"><span><strong>Feb 02 · 11:00 AM</strong></span><span>from <strong>David Miller</strong></span>
                        <button class="contact-icon-btn" data-contact='{"name":"David Miller","address":"789 Palm Avenue, Coral Gables, FL","email":"david.miller@email.com","phone":"(305) 555-9012","title":"Visit at"}'><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                        <span class="status-badge accepted">Confirmed</span>
                    </div>
                </div>
                <div class="visit-actions"><button class="btn cancel-requested-btn">Cancel</button></div>
            </div>
        </div>
    </div>`;
}

export function init() {
    document.getElementById('visitFilterBtn')?.addEventListener('click', (e) => toggleMenu('filterDropdownMenu', e));

    document.querySelectorAll('#filterDropdownMenu .menu-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('#filterDropdownMenu .menu-item').forEach(i => i.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('filterDropdownMenu').classList.remove('show');
            const filter = btn.dataset.filter;
            document.getElementById('filterDropdownText').textContent = btn.textContent.trim().split(' ')[0];
            document.getElementById('visitsReceived').style.display = (filter === 'all' || filter === 'received') ? 'block' : 'none';
            document.getElementById('visitsRequested').style.display = (filter === 'all' || filter === 'requested') ? 'block' : 'none';
        });
    });

    // Contact buttons
    document.querySelectorAll('#page-content .contact-icon-btn[data-contact]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const c = JSON.parse(btn.dataset.contact);
            showMessageModal(c.name, c.address, c.email, c.phone, c.title);
        });
    });

    // Accept buttons
    document.querySelectorAll('.accept-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.visit-card');
            updateCardStatus(card, 'accepted');
            pendingVisitsCount--;
            updateVisitBadge();
            if (isDesktopView()) { addChatMessage('Accept visit', true); setTimeout(() => addChatMessage('📅 Well done! We\'ll automatically send a message to the lead and an email to you to confirm the visit.'), 600); }
            else showSuccess('Well done!', '📅 We\'ll send a confirmation to the lead and you.');
        });
    });

    // Decline buttons
    document.querySelectorAll('.decline-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.visit-card');
            if (isDesktopView()) {
                addChatMessage('Decline visit', true);
                setTimeout(() => {
                    const cm = document.getElementById('chatMessages');
                    const d = document.createElement('div');
                    d.className = 'chat-message bot';
                    d.innerHTML = '<div><div class="message-bubble">Just checking 😄 This will decline the visit and notify the buyer.</div><div style="display: flex; gap: 8px; margin-top: 12px;"><button class="btn chat-keep">Keep it</button><button class="btn btn-accent chat-resched">Reschedule</button><button class="btn btn-danger chat-decline">Decline it</button></div></div>';
                    cm.appendChild(d);
                    cm.scrollTop = cm.scrollHeight;
                    d.querySelector('.chat-keep').addEventListener('click', function () { this.parentElement.style.display = 'none'; addChatMessage('Cancel', true); setTimeout(() => addChatMessage('No problem! The visit request is still pending.'), 600); });
                    d.querySelector('.chat-resched').addEventListener('click', function () { this.parentElement.style.display = 'none'; addChatMessage('Reschedule', true); setTimeout(() => addChatMessage('📅 Done! Reschedule request sent.'), 600); updateCardStatus(card, 'rescheduling'); pendingVisitsCount--; updateVisitBadge(); });
                    d.querySelector('.chat-decline').addEventListener('click', function () { this.parentElement.style.display = 'none'; addChatMessage('Decline it', true); setTimeout(() => addChatMessage('Done! The visit has been declined.'), 600); updateCardStatus(card, 'declined'); pendingVisitsCount--; updateVisitBadge(); });
                }, 600);
            } else {
                document.getElementById('declineVisitModal').classList.add('show');
            }
        });
    });

    // Cancel requested visit
    document.querySelectorAll('.cancel-requested-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.visit-card');
            if (isDesktopView()) {
                addChatMessage('Cancel visit', true);
                setTimeout(() => {
                    const cm = document.getElementById('chatMessages');
                    const d = document.createElement('div');
                    d.className = 'chat-message bot';
                    d.innerHTML = '<div><div class="message-bubble">Hold on 👀 This will cancel the visit.</div><div style="display: flex; gap: 8px; margin-top: 12px;"><button class="btn chat-keep2">Keep it</button><button class="btn btn-accent chat-resched2">Reschedule</button><button class="btn btn-danger chat-cancel2">Cancel it</button></div></div>';
                    cm.appendChild(d);
                    cm.scrollTop = cm.scrollHeight;
                    d.querySelector('.chat-keep2').addEventListener('click', function () { this.parentElement.style.display = 'none'; addChatMessage('Keep Visit', true); setTimeout(() => addChatMessage('No problem! Your visit is still scheduled.'), 600); });
                    d.querySelector('.chat-resched2').addEventListener('click', function () { this.parentElement.style.display = 'none'; addChatMessage('Reschedule', true); setTimeout(() => addChatMessage('📅 Done! Reschedule request sent.'), 600); });
                    d.querySelector('.chat-cancel2').addEventListener('click', function () { this.parentElement.style.display = 'none'; addChatMessage('Cancel Visit', true); setTimeout(() => addChatMessage('😔 We\'ll send your cancellation request.'), 600); updateCardStatus(card, 'cancelled'); });
                }, 600);
            } else {
                document.getElementById('cancelVisitModal').classList.add('show');
            }
        });
    });
}

function updateCardStatus(card, status) {
    if (!card) return;
    const badge = card.querySelector('.visit-meta-row .status-badge');
    const ad = card.querySelector('.visit-actions');
    if (status === 'declined' || status === 'cancelled') {
        if (badge) { badge.className = 'status-badge'; badge.style.background = 'var(--c-error-bg)'; badge.style.color = 'var(--c-error)'; badge.textContent = status === 'declined' ? 'Declined' : 'Cancelled'; }
        if (ad) ad.innerHTML = '';
    } else if (status === 'accepted') {
        if (badge) { badge.className = 'status-badge accepted'; badge.textContent = 'Accepted'; }
        if (ad) ad.innerHTML = '<button class="btn cancel-accepted-btn">Cancel</button>';
    } else if (status === 'rescheduling') {
        if (badge) { badge.className = 'status-badge'; badge.style.background = '#fef9ed'; badge.style.color = 'var(--c-warning)'; badge.textContent = 'Rescheduling'; }
        if (ad) ad.innerHTML = '';
    }
}

function updateVisitBadge() {
    const b = document.getElementById('visitsBadge');
    if (b) { if (pendingVisitsCount > 0) b.textContent = pendingVisitsCount; else b.style.display = 'none'; }
    const mb = document.getElementById('mobileVisitsBadge');
    if (mb) { if (pendingVisitsCount > 0) { mb.textContent = pendingVisitsCount; mb.style.display = 'flex'; } else mb.style.display = 'none'; }
}
