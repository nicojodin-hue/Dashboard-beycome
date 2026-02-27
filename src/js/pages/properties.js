import store from '../store.js';
import { isDesktopView } from '../utils.js';
import { addChatMessage } from '../components/chat.js';

// Show cancel/delete confirmation modal
function showCancelModal(propertyId, propertyName, propertyStatus) {
    const isDraft = propertyStatus === 'draft';
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay show';
    modalOverlay.innerHTML = `
        <div class="modal">
            <h2>${isDraft ? 'Delete Draft' : 'Cancel Property Listing'}</h2>
            <p style="margin-bottom: 20px;">${isDraft ? 'Are you sure you want to delete this draft?' : 'Are you sure you want to cancel this listing?'}</p>
            <p style="font-weight: 600; margin-bottom: 20px;">${propertyName}</p>
            <p style="color: var(--c-text-secondary); margin-bottom: 24px;">${isDraft ? 'This action cannot be undone. The draft will be permanently removed.' : 'This action cannot be undone. The property will be marked as cancelled.'}</p>
            <div class="modal-actions">
                <button class="btn btn-s modal-btn" id="cancelModalNo">${isDraft ? 'Keep Draft' : 'Keep Listing'}</button>
                <button class="btn btn-danger modal-btn" id="cancelModalYes">${isDraft ? 'Delete Draft' : 'Cancel Listing'}</button>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    // No button
    document.getElementById('cancelModalNo').addEventListener('click', () => {
        modalOverlay.remove();
    });

    // Yes button
    document.getElementById('cancelModalYes').addEventListener('click', () => {
        if (isDraft) {
            // Delete draft: remove from store entirely
            const properties = store.get('properties') || [];
            const updated = properties.filter(p => p.id !== propertyId);
            store.set('properties', updated);
        }

        // Remove the card from the grid
        const card = document.querySelector(`[data-property-id="${propertyId}"]`);
        const cardEl = card ? card.closest('.property-card') || card : null;
        if (cardEl) {
            cardEl.remove();
            if (isDesktopView()) {
                addChatMessage(isDraft
                    ? 'Draft <strong>' + propertyName + '</strong> has been deleted.'
                    : 'Property <strong>' + propertyName + '</strong> has been cancelled.');
            }
        }

        modalOverlay.remove();
    });
}

// Helper function to generate action buttons based on status
function getActionButtons(propertyId, status, name) {
    // Statuses that cannot be deleted/cancelled OR edited
    const nonEditableStatuses = ['closed', 'cancelled'];
    const nonDeletableStatuses = ['under-contract', 'closed', 'cancelled'];
    const canEdit = !nonEditableStatuses.includes(status);
    const canDelete = !nonDeletableStatuses.includes(status);

    // For closed or cancelled properties, show no buttons
    if (!canEdit) {
        return '';
    }

    // For Live & Active properties, show Status dropdown instead of Cancel button
    if (status === 'live-active') {
        return `
            <a href="#/listing/${propertyId}" class="btn btn-s property-view-listing-btn" data-property-id="${propertyId}" style="display:flex; align-items:center; justify-content:center; gap:6px; width:100%; text-decoration:none; margin-top:12px; background:var(--c-accent-bg); color:var(--c-accent); border:1px solid var(--c-accent); font-weight:600;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                View Listing
            </a>
            <div class="property-actions" style="display: flex; gap: 8px; padding-top: 8px;">
                <button class="btn property-edit-btn" data-property-id="${propertyId}" style="flex: 1;">
                    Edit
                </button>
                <div class="filter-dropdown" style="flex: 1; position: relative;">
                    <button class="btn property-status-btn" data-property-id="${propertyId}" data-property-name="${name}" style="width: 100%; background: var(--c-bg-white); border: 1px solid var(--c-border); justify-content: space-between;">
                        <span>Status</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div class="menu right" id="statusMenu-${propertyId}">
                        <button class="menu-item status-menu-item" data-action="temporary-off" data-property-id="${propertyId}" data-property-name="${name}">Temporary Off Market</button>
                        <button class="menu-item status-menu-item" data-action="under-contract" data-property-id="${propertyId}" data-property-name="${name}">Under Contract</button>
                        <button class="menu-item status-menu-item danger" data-action="cancel" data-property-id="${propertyId}" data-property-name="${name}">Cancel Listing</button>
                    </div>
                </div>
            </div>
        `;
    }

    // For Under Contract properties, show Edit button and Status dropdown (can change to Active or Closed)
    if (status === 'under-contract') {
        return `
            <div class="property-actions" style="display: flex; gap: 8px; padding-top: 12px;">
                <button class="btn property-edit-btn" data-property-id="${propertyId}" style="flex: 1;">
                    Edit
                </button>
                <div class="filter-dropdown" style="flex: 1; position: relative;">
                    <button class="btn property-status-btn" data-property-id="${propertyId}" data-property-name="${name}" style="width: 100%; background: var(--c-bg-white); border: 1px solid var(--c-border); justify-content: space-between;">
                        <span>Status</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div class="menu right" id="statusMenu-${propertyId}">
                        <button class="menu-item status-menu-item" data-action="live-active" data-property-id="${propertyId}" data-property-name="${name}">Live & Active</button>
                        <button class="menu-item status-menu-item" data-action="closed" data-property-id="${propertyId}" data-property-name="${name}">Closed</button>
                    </div>
                </div>
            </div>
        `;
    }

    // For other statuses, show Edit and Cancel buttons
    return `
        <div class="property-actions" style="display: flex; gap: 8px; padding-top: 12px;">
            <button class="btn property-edit-btn" data-property-id="${propertyId}" style="flex: 1;">
                Edit
            </button>
            ${canDelete ? `
                <button class="btn btn-danger property-delete-btn" data-property-id="${propertyId}" data-property-name="${name}" data-property-status="${status}" style="flex: 1;">
                    ${status === 'draft' ? 'Delete' : 'Cancel'}
                </button>
            ` : ''}
        </div>
    `;
}

// Helper function to get status label
function getStatusLabel(status) {
    const labels = {
        'draft': 'Draft',
        'pending-payment': 'Pending Payment',
        'in-progress': 'In Progress',
        'request-doc': 'Request Extra Document',
        'live-active': 'Live & Active',
        'temporary-off': 'Temporary Off Market',
        'under-contract': 'Under Contract',
        'closed': 'Closed',
        'cancelled': 'Cancelled'
    };
    return labels[status] || 'Draft';
}

// Helper function to get short property type label
function getShortPropertyType(type) {
    const map = {
        'Single Family Home': 'House',
        'Condo': 'Condo',
        'Townhouse': 'Townhouse',
        'Multi-Family': 'Multi-Family',
        'Land': 'Land',
        'Commercial': 'Commercial'
    };
    return map[type] || type || 'House';
}

// Helper function to get transaction type label
function getTransactionLabel(listingType) {
    if (!listingType) return 'Sale';
    return listingType.toLowerCase().includes('rent') ? 'Rent' : 'Sale';
}

// Helper function to get time ago label
function getTimeAgo(dateStr) {
    if (!dateStr) return '';
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    const diff = now - then;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + (mins === 1 ? ' minute ago' : ' minutes ago');
    if (hours < 24) return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    if (days < 30) return days + (days === 1 ? ' day ago' : ' days ago');
    const months = Math.floor(days / 30);
    if (months < 12) return months + (months === 1 ? ' month ago' : ' months ago');
    const years = Math.floor(days / 365);
    return years + (years === 1 ? ' year ago' : ' years ago');
}

// Helper function to render a property card
function renderPropertyCard(property) {
    const statusClass = property.status || 'draft';
    const statusLabel = getStatusLabel(statusClass);
    const priceNum = property.price ? parseFloat(property.price) : 0;
    const price = priceNum ? '$' + priceNum.toLocaleString() : 'No price';
    const address = property.address || 'No address';
    const city = property.city || '';
    const state = property.state || '';
    const zipcode = property.zipcode || '';
    const cityStateZip = [city, state].filter(Boolean).join(', ') + (zipcode ? ' ' + zipcode : '');
    const beds = property.beds || 0;
    const baths = property.baths || 0;
    const sqftNum = property.livingArea ? parseFloat(property.livingArea) : 0;
    const sqft = sqftNum ? sqftNum.toLocaleString() + ' sqft' : '';
    const pricePerSqft = (priceNum && sqftNum) ? '$' + Math.round(priceNum / sqftNum).toLocaleString() + '/sqft' : '';
    const propType = getShortPropertyType(property.propertyType);
    const transType = getTransactionLabel(property.listingType);
    const timeAgo = getTimeAgo(property.createdAt);

    return `
        <div class="property-card" data-property-id="${property.id}" style="position:relative;">
            <span class="property-status ${statusClass}" style="position:absolute;top:10px;left:10px;z-index:10;">${statusLabel}</span>
            ${timeAgo ? `<span style="position:absolute;top:10px;right:10px;z-index:10;font-size:11px;color:white;background:rgba(0,0,0,0.4);padding:3px 8px;border-radius:12px;">${timeAgo}</span>` : ''}
            <div class="property-image" style="background: linear-gradient(135deg, #7d8ff7 0%, #a5b4fc 100%);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </div>
            <div class="property-details">
                <p style="font-size: 13px; color: var(--c-text-secondary); margin-bottom: 4px;">${propType} for ${transType}</p>
                <h3><span class="address-main">${address}</span>${cityStateZip ? `<span class="address-secondary">${cityStateZip}</span>` : ''}</h3>
                <p style="font-size: 18px; font-weight: 700; color: var(--c-primary); margin: 8px 0;">${price}${pricePerSqft ? `<span style="font-size: 13px; font-weight: 400; color: var(--c-text-secondary); margin-left: 8px;">${pricePerSqft}</span>` : ''}</p>
                <p style="font-size: 13px; color: var(--c-text-secondary); margin-bottom: 12px;">${beds} beds · ${baths} baths${sqft ? ' · ' + sqft : ''}</p>
                ${getActionButtons(property.id, statusClass, address)}
            </div>
        </div>
    `;
}

export function render() {
    const properties = store.get('properties') || [];
    const hasProperties = properties.length > 0;
    const showSearchBar = properties.length >= 2;

    return `<div class="visit-tabs">
        <button class="btn btn-accent compose-btn" id="addPropertyBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>Add new listing</button>
        ${showSearchBar ? `
            <div class="message-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" id="propertySearchInput" placeholder="Search properties..." />
            </div>
        ` : ''}
        <div class="filter-dropdown" style="position: relative;">
            <button class="filter-btn" id="statusFilterBtn">
                <span id="statusFilterText">All Statuses</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            <div class="menu right scroll" id="statusFilterMenu">
                <button class="menu-item status-filter-item active" data-status="all">All Statuses</button>
                <button class="menu-item status-filter-item" data-status="draft">Draft</button>
                <button class="menu-item status-filter-item" data-status="pending-payment">Pending Payment</button>
                <button class="menu-item status-filter-item" data-status="in-progress">In Progress</button>
                <button class="menu-item status-filter-item" data-status="request-doc">Request Extra Document</button>
                <button class="menu-item status-filter-item" data-status="live-active">Live & Active</button>
                <button class="menu-item status-filter-item" data-status="temporary-off">Temporary Off Market</button>
                <button class="menu-item status-filter-item" data-status="under-contract">Under Contract</button>
                <button class="menu-item status-filter-item" data-status="closed">Closed</button>
                <button class="menu-item status-filter-item" data-status="cancelled">Cancelled</button>
            </div>
        </div>
    </div>
    <div class="property-grid" id="propertyGrid">
        ${hasProperties ? properties.map(property => renderPropertyCard(property)).join('') : `
            <div class="property-empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <h2>Ready to list your first property?</h2>
                <p>Most sellers save $15,000+ with Beycome. Join thousands of homeowners selling smarter.</p>
                <div class="empty-state-benefits">
                    <div class="benefit-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-success)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>List in 5 minutes</span>
                    </div>
                    <div class="benefit-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-success)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>No commission fees</span>
                    </div>
                    <div class="benefit-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-success)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Keep 100% of your profit</span>
                    </div>
                </div>
                <button class="btn btn-p" id="addPropertyBtnEmpty" style="padding: 14px 40px; font-size: 15px; font-weight: 600;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Get Started
                </button>
            </div>
        `}
    </div>`;
}

export function init() {
    let currentStatusFilter = 'all';
    let currentSearchQuery = '';

    document.getElementById('addPropertyBtn')?.addEventListener('click', () => {
        window.location.hash = '/submit-property';
    });

    document.getElementById('addPropertyBtnEmpty')?.addEventListener('click', () => {
        window.location.hash = '/submit-property';
    });

    // Search input handler
    document.getElementById('propertySearchInput')?.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value.toLowerCase();
        filterProperties();
    });

    function filterProperties() {
        const propertyCards = document.querySelectorAll('.property-card');
        propertyCards.forEach(card => {
            const cardStatus = card.querySelector('.property-status');
            const cardText = card.textContent.toLowerCase();
            const matchesStatus = currentStatusFilter === 'all' || (cardStatus && cardStatus.classList.contains(currentStatusFilter));
            const matchesSearch = !currentSearchQuery || cardText.includes(currentSearchQuery);
            card.style.display = (matchesStatus && matchesSearch) ? '' : 'none';
        });
    }

    // Status filter dropdown toggle
    document.getElementById('statusFilterBtn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = document.getElementById('statusFilterMenu');
        menu.classList.toggle('show');
    });

    // Status filter item handlers
    document.querySelectorAll('.status-filter-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const status = item.dataset.status;
            currentStatusFilter = status;

            // Update active state
            document.querySelectorAll('.status-filter-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update button text
            const filterText = item.textContent.trim();
            document.getElementById('statusFilterText').textContent = filterText;

            // Close menu
            document.getElementById('statusFilterMenu').classList.remove('show');

            // Filter properties
            filterProperties();
        });
    });

    // Edit button handlers
    document.querySelectorAll('.property-edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const propertyId = btn.dataset.propertyId;
            window.location.hash = '/submit-property/' + propertyId;
            if (isDesktopView()) {
                addChatMessage('Editing property ID: ' + propertyId);
            }
        });
    });

    // Delete/Cancel button handlers
    document.querySelectorAll('.property-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const propertyId = btn.dataset.propertyId;
            const propertyName = btn.dataset.propertyName;
            const propertyStatus = btn.dataset.propertyStatus;

            showCancelModal(propertyId, propertyName, propertyStatus);
        });
    });

    // Status dropdown handlers (for Live & Active properties)
    document.querySelectorAll('.property-status-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const propertyId = btn.dataset.propertyId;
            const menu = document.getElementById('statusMenu-' + propertyId);

            // Close all other menus
            document.querySelectorAll('.menu.show').forEach(m => {
                if (m !== menu) m.classList.remove('show');
            });

            menu.classList.toggle('show');
        });
    });

    // Status menu item handlers
    document.querySelectorAll('.status-menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = item.dataset.action;
            const propertyId = item.dataset.propertyId;
            const propertyName = item.dataset.propertyName;

            // Close menu
            const menu = item.closest('.menu');
            if (menu) menu.classList.remove('show');

            if (action === 'cancel') {
                // Show cancel confirmation modal (always 'live-active' from status menu)
                showCancelModal(propertyId, propertyName, 'live-active');
            } else if (action === 'temporary-off') {
                // Update status to temporary off market
                if (isDesktopView()) {
                    addChatMessage('Property <strong>' + propertyName + '</strong> is now temporarily off market.');
                }
                // Update property status in store when connected
            } else if (action === 'under-contract') {
                // Update status to under contract
                if (isDesktopView()) {
                    addChatMessage('Property <strong>' + propertyName + '</strong> is now under contract.');
                }
                // Update property status in store when connected
            } else if (action === 'live-active') {
                // Update status to live & active
                if (isDesktopView()) {
                    addChatMessage('Property <strong>' + propertyName + '</strong> is now live & active.');
                }
                // Update property status in store when connected
            } else if (action === 'closed') {
                // Update status to closed
                if (isDesktopView()) {
                    addChatMessage('Property <strong>' + propertyName + '</strong> has been closed.');
                }
                // Update property status in store when connected
            }
        });
    });

    // In-progress cards open the MLS questionnaire
    document.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('.filter-dropdown')) return;
            if (card.querySelector('.property-status.in-progress')) {
                const pid = card.dataset.propertyId;
                if (pid) window.location.hash = `/mls-form/${pid}`;
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
            document.querySelectorAll('.menu.show').forEach(m => m.classList.remove('show'));
        }
    });
}
