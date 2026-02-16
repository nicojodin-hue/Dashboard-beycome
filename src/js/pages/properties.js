import store from '../store.js';
import { isDesktopView } from '../utils.js';
import { addChatMessage } from '../components/chat.js';

// Show cancel confirmation modal
function showCancelModal(propertyId, propertyName) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay show';
    modalOverlay.innerHTML = `
        <div class="modal">
            <h2>Cancel Property Listing</h2>
            <p style="margin-bottom: 20px;">Are you sure you want to cancel this listing?</p>
            <p style="font-weight: 600; margin-bottom: 20px;">${propertyName}</p>
            <p style="color: var(--c-text-secondary); margin-bottom: 24px;">This action cannot be undone. The property will be marked as cancelled.</p>
            <div class="modal-actions">
                <button class="btn btn-s modal-btn" id="cancelModalNo">Keep Listing</button>
                <button class="btn btn-danger modal-btn" id="cancelModalYes">Cancel Listing</button>
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
        // For now with demo data, just remove the card
        const card = document.querySelector(`[data-property-id="${propertyId}"]`).closest('.property-card');
        if (card) {
            card.remove();
            if (isDesktopView()) {
                addChatMessage('Property <strong>' + propertyName + '</strong> has been cancelled.');
            }
        }

        // When using real store data, uncomment this:
        // const properties = store.get('properties') || [];
        // const property = properties.find(p => p.id === propertyId);
        // if (property) {
        //     property.status = 'cancelled';
        //     store.set('properties', properties);
        //     window.location.reload();
        // }

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
            <div class="property-actions" style="display: flex; gap: 8px; margin-top: 12px;">
                <button class="btn btn-p property-edit-btn" data-property-id="${propertyId}" style="flex: 1;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
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
                        <button class="menu-item status-menu-item" data-action="temporary-off" data-property-id="${propertyId}" data-property-name="${name}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                            </svg>
                            Temporary Off Market
                        </button>
                        <button class="menu-item status-menu-item" data-action="under-contract" data-property-id="${propertyId}" data-property-name="${name}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                            Under Contract
                        </button>
                        <button class="menu-item status-menu-item danger" data-action="cancel" data-property-id="${propertyId}" data-property-name="${name}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Cancel Listing
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // For Under Contract properties, show Edit button and Status dropdown (can change to Active or Closed)
    if (status === 'under-contract') {
        return `
            <div class="property-actions" style="display: flex; gap: 8px; margin-top: 12px;">
                <button class="btn btn-p property-edit-btn" data-property-id="${propertyId}" style="flex: 1;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
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
                        <button class="menu-item status-menu-item" data-action="live-active" data-property-id="${propertyId}" data-property-name="${name}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                            </svg>
                            Live & Active
                        </button>
                        <button class="menu-item status-menu-item" data-action="closed" data-property-id="${propertyId}" data-property-name="${name}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Closed
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // For other statuses, show Edit and Cancel buttons
    return `
        <div class="property-actions" style="display: flex; gap: 8px; margin-top: 12px;">
            <button class="btn btn-p property-edit-btn" data-property-id="${propertyId}" style="flex: 1;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit
            </button>
            ${canDelete ? `
                <button class="btn property-delete-btn" data-property-id="${propertyId}" data-property-name="${name}" data-property-status="${status}" style="flex: 1; background: var(--c-bg-white); border: 1px solid var(--c-border); color: var(--c-error);">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Cancel
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

// Helper function to render a property card
function renderPropertyCard(property) {
    const statusClass = property.status || 'draft';
    const statusLabel = getStatusLabel(statusClass);
    const price = property.price ? '$' + parseFloat(property.price).toLocaleString() : 'No price';
    const address = property.address || 'No address';
    const beds = property.beds || 0;
    const baths = property.baths || 0;
    const sqft = property.livingArea ? parseFloat(property.livingArea).toLocaleString() + ' sqft' : '';

    return `
        <div class="property-card" style="position:relative;">
            <span class="property-status ${statusClass}" style="position:absolute;top:10px;left:10px;z-index:10;">${statusLabel}</span>
            <div class="property-image" style="background: linear-gradient(135deg, #7d8ff7 0%, #a5b4fc 100%);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </div>
            <div class="property-details">
                <h3>${address}</h3>
                <p style="font-size: 18px; font-weight: 700; color: var(--c-primary); margin: 8px 0;">${price}</p>
                <p style="font-size: 13px; color: var(--c-text-secondary); margin-bottom: 12px;">${beds} beds · ${baths} baths${sqft ? ' · ' + sqft : ''}</p>
                ${getActionButtons(property.id, statusClass, address)}
            </div>
        </div>
    `;
}

export function render() {
    const properties = store.get('properties') || [];
    const hasProperties = properties.length > 0;

    return `<div class="visit-tabs">
        <button class="btn btn-accent compose-btn" id="addPropertyBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>Add new listing</button>
        <div class="filter-dropdown" style="position: relative;">
            <button class="filter-btn" id="statusFilterBtn">
                <span id="statusFilterText">All Statuses</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            <div class="menu right scroll" id="statusFilterMenu">
                <button class="menu-item status-filter-item active" data-status="all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    All Statuses
                </button>
                <button class="menu-item status-filter-item" data-status="draft">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Draft
                </button>
                <button class="menu-item status-filter-item" data-status="pending-payment">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Pending Payment
                </button>
                <button class="menu-item status-filter-item" data-status="in-progress">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    In Progress
                </button>
                <button class="menu-item status-filter-item" data-status="request-doc">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Request Extra Document
                </button>
                <button class="menu-item status-filter-item" data-status="live-active">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    Live & Active
                </button>
                <button class="menu-item status-filter-item" data-status="temporary-off">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                    </svg>
                    Temporary Off Market
                </button>
                <button class="menu-item status-filter-item" data-status="under-contract">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                    Under Contract
                </button>
                <button class="menu-item status-filter-item" data-status="closed">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Closed
                </button>
                <button class="menu-item status-filter-item" data-status="cancelled">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Cancelled
                </button>
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

    document.getElementById('addPropertyBtn')?.addEventListener('click', () => {
        window.location.hash = '/submit-property';
    });

    document.getElementById('addPropertyBtnEmpty')?.addEventListener('click', () => {
        window.location.hash = '/submit-property';
    });

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
            filterPropertiesByStatus(status);
        });
    });

    function filterPropertiesByStatus(status) {
        const propertyCards = document.querySelectorAll('.property-card');

        propertyCards.forEach(card => {
            const cardStatus = card.querySelector('.property-status');

            if (status === 'all') {
                card.style.display = '';
            } else {
                // Get status class from the badge
                const hasStatus = cardStatus && cardStatus.classList.contains(status);
                card.style.display = hasStatus ? '' : 'none';
            }
        });
    }

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

            showCancelModal(propertyId, propertyName);
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
                // Show cancel confirmation modal
                showCancelModal(propertyId, propertyName);
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

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
            document.querySelectorAll('.menu.show').forEach(m => m.classList.remove('show'));
        }
    });
}
