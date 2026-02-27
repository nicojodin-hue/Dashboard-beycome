import { toggleMenu } from '../utils.js';
import { showMessageModal } from '../components/modals.js';

export function render() {
    // Count total offers (hardcoded for demo, should come from store in production)
    const totalOffers = 3;
    const showSearchBar = totalOffers >= 2;

    return `<div class="visit-tabs">
        ${showSearchBar ? `
            <div class="message-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" id="offerSearchInput" placeholder="Search offers..." />
            </div>
        ` : ''}
        <div class="filter-dropdown">
            <button class="filter-btn" id="offerFilterBtn"><span id="offerFilterText">All</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
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
                <div class="visit-actions"><button class="btn view-offer-btn" data-offer-id="offer_1">View the offer</button></div>
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
                <div class="visit-actions"><button class="btn view-offer-btn" data-offer-id="offer_2">View the offer</button></div>
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
                <div class="visit-actions"><button class="btn view-offer-btn" data-offer-id="offer_3">View the offer</button></div>
            </div>
        </div>
    </div>`;
}

function updateOfferBadgesFromStorage() {
    const statusMap = {
        'accepted': '<span class="status-badge accepted">Accepted</span>',
        'declined': '<span class="status-badge declined">Declined</span>',
        'countered': '<span class="status-badge" style="background:var(--c-warning-bg);color:var(--c-warning);">Countered</span>'
    };

    document.querySelectorAll('.view-offer-btn').forEach(btn => {
        const offerId = btn.dataset.offerId;
        if (!offerId) return;
        const saved = localStorage.getItem('offerStatus_' + offerId);
        if (!saved || !statusMap[saved]) return;

        // Find the meta row in the same card
        const card = btn.closest('.visit-card');
        if (!card) return;
        const metaRow = card.querySelector('.visit-meta-row');
        if (!metaRow) return;

        // Remove existing status badges
        metaRow.querySelectorAll('.status-badge').forEach(b => b.remove());

        // Insert new badge(s)
        let badges = statusMap[saved];
        if (saved === 'countered' && localStorage.getItem('offerCounterWaiting_' + offerId) === 'true') {
            badges += ' <span class="status-badge" style="background:var(--c-periwinkle-bg);color:var(--c-periwinkle);">Awaiting Response</span>';
        }
        metaRow.insertAdjacentHTML('beforeend', badges);
    });
}

export function init() {
    let currentFilter = 'all';
    let currentSearchQuery = '';

    // Update badges from localStorage
    updateOfferBadgesFromStorage();

    document.getElementById('offerFilterBtn')?.addEventListener('click', (e) => toggleMenu('offerFilterMenu', e));

    // Offer search handler
    const searchInput = document.getElementById('offerSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase();
            filterOffers();
        });
    }

    function filterOffers() {
        const offerCards = document.querySelectorAll('.visit-card');

        offerCards.forEach(card => {
            const address = card.querySelector('.address-main')?.textContent.toLowerCase() || '';
            const cityStateZip = card.querySelector('.address-secondary')?.textContent.toLowerCase() || '';
            const fullAddress = address + ' ' + cityStateZip;
            const contactName = card.querySelector('.visit-meta-row strong:nth-of-type(2)')?.textContent.toLowerCase() || '';
            const searchableText = fullAddress + ' ' + contactName;

            // Check search query
            let searchMatch = true;
            if (currentSearchQuery) {
                searchMatch = searchableText.includes(currentSearchQuery);
            }

            // Check filter (received/sent/all)
            let filterMatch = true;
            if (currentFilter !== 'all') {
                const isInReceived = card.closest('#offersReceived') !== null;
                const isInSent = card.closest('#offersSent') !== null;
                filterMatch = (currentFilter === 'received' && isInReceived) || (currentFilter === 'sent' && isInSent);
            }

            // Show card only if both match
            card.style.display = (searchMatch && filterMatch) ? '' : 'none';
        });

        // Hide/show sections based on filter
        document.getElementById('offersReceived').style.display = (currentFilter === 'all' || currentFilter === 'received') ? 'block' : 'none';
        document.getElementById('offersSent').style.display = (currentFilter === 'all' || currentFilter === 'sent') ? 'block' : 'none';
    }

    document.querySelectorAll('#offerFilterMenu .menu-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('#offerFilterMenu .menu-item').forEach(i => i.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('offerFilterMenu').classList.remove('show');
            currentFilter = btn.dataset.filter;
            document.getElementById('offerFilterText').textContent = btn.textContent.trim().split(' ')[0];
            filterOffers();
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
            const offerId = btn.dataset.offerId;
            if (offerId) {
                window.location.hash = '/offers/' + offerId;
            }
        });
    });
}
