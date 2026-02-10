import { toggleMenu, isDesktopView } from '../utils.js';
import { addChatMessage, openMobileChat } from '../components/chat.js';
import { showMessageModal } from '../components/modals.js';

export function render() {
    return `<div class="visit-tabs">
        <div class="filter-dropdown">
            <button class="filter-btn" id="offerFilterBtn"><span id="offerFilterText">All</span><span class="filter-count" id="offerFilterCount">3</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
            <div class="menu" id="offerFilterMenu">
                <button class="menu-item active" data-filter="all">All <span class="filter-count">3</span></button>
                <button class="menu-item" data-filter="received">Received <span class="filter-count">2</span></button>
                <button class="menu-item" data-filter="sent">Sent <span class="filter-count">1</span></button>
            </div>
        </div>
    </div>
    <div class="offers-content" id="offersReceived">
        <div class="visit-card">
            <div class="visit-card-content">
                <div class="visit-info">
                    <h3><span class="address-main">1505 N Jean Baptiste Pointe du Sable Lake Shore Dr</span><span class="address-secondary">Bonadelle Ranchos-Madera Ranchos, CA 33135</span></h3>
                    <div class="visit-meta-row">
                        <span><strong>Jan 25, 2026</strong></span><span>from <strong>John Smith</strong></span>
                        <button class="contact-icon-btn" data-contact='{"name":"John Smith","address":"1505 N Jean Baptiste Pointe du Sable Lake Shore Dr","email":"john.smith@email.com","phone":"(305) 555-1234","title":"Offer on"}'><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                        <span class="status-badge pending">Pending</span>
                        <span class="status-badge" style="background: var(--c-warning-bg); color: var(--c-warning);">Expires in 48 hours</span>
                    </div>
                </div>
                <div class="visit-actions"><button class="btn view-offer-btn">View the offer</button></div>
            </div>
        </div>
        <div class="visit-card">
            <div class="visit-card-content">
                <div class="visit-info">
                    <h3><span class="address-main">456 Ocean Drive</span><span class="address-secondary">Miami Beach, FL 33139</span></h3>
                    <div class="visit-meta-row">
                        <span><strong>Jan 20, 2026</strong></span><span>from <strong>Sarah Johnson</strong></span>
                        <button class="contact-icon-btn" data-contact='{"name":"Sarah Johnson","address":"456 Ocean Drive, Miami Beach, FL","email":"sarah.johnson@email.com","phone":"(305) 555-5678","title":"Offer on"}'><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                        <span class="status-badge accepted">Accepted</span>
                    </div>
                </div>
                <div class="visit-actions"><button class="btn">View the offer</button></div>
            </div>
        </div>
    </div>
    <div class="offers-content" id="offersSent">
        <div class="visit-card">
            <div class="visit-card-content">
                <div class="visit-info">
                    <h3><span class="address-main">789 Palm Avenue</span><span class="address-secondary">Coral Gables, FL 33134</span></h3>
                    <div class="visit-meta-row">
                        <span><strong>Jan 25, 2026</strong></span><span>to <strong>David Miller</strong></span>
                        <button class="contact-icon-btn" data-contact='{"name":"David Miller","address":"789 Palm Avenue, Coral Gables, FL","email":"david.miller@email.com","phone":"(305) 555-9012","title":"Offer on"}'><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                        <span class="status-badge pending">Awaiting Response</span>
                    </div>
                </div>
                <div class="visit-actions"><button class="btn">View the offer</button></div>
            </div>
        </div>
    </div>`;
}

export function init() {
    document.getElementById('offerFilterBtn')?.addEventListener('click', (e) => toggleMenu('offerFilterMenu', e));

    document.querySelectorAll('#offerFilterMenu .menu-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('#offerFilterMenu .menu-item').forEach(i => i.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('offerFilterMenu').classList.remove('show');
            const filter = btn.dataset.filter;
            document.getElementById('offerFilterText').textContent = btn.textContent.trim().split(' ')[0];
            document.getElementById('offersReceived').style.display = (filter === 'all' || filter === 'received') ? 'block' : 'none';
            document.getElementById('offersSent').style.display = (filter === 'all' || filter === 'sent') ? 'block' : 'none';
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

    // View offer buttons
    document.querySelectorAll('.view-offer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isDesktopView()) {
                addChatMessage('📄 <strong>Viewing offer</strong><br><br>I can help you:<br>• Understand the terms<br>• Compare to market value<br>• Draft a counter-offer<br>• Accept or decline<br><br>What would you like to do?');
            } else { openMobileChat(); }
        });
    });
}
