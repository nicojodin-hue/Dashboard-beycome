import store from '../store.js';
import { getListingUrl, showMobileToast } from '../utils.js';

function getPropertyById(id) {
    const properties = store.get('properties') || [];
    return properties.find(p => p.id === id);
}

function formatPrice(price) {
    return Number(price).toLocaleString();
}

function getShortType(type) {
    return type === 'Single Family Home' ? 'House' : type || 'Property';
}

function renderCard(prop, isCompareMode) {
    const price = formatPrice(prop.price);
    const ppsf = prop.livingArea ? Math.round(Number(prop.price) / Number(prop.livingArea)) : '';
    const type = getShortType(prop.propertyType);

    return `
    <div class="property-card collection-card" data-id="${prop.id}" data-type="${prop.propertyType || ''}" style="position:relative;">
        ${isCompareMode ? `<label class="fav-compare-check" data-id="${prop.id}"><input type="checkbox" class="fav-compare-input" data-id="${prop.id}" /><span class="fav-compare-mark"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span></label>` : ''}
        <span class="property-type-badge" style="position:absolute;top:10px;left:${isCompareMode ? '44' : '10'}px;z-index:10;"><span class="property-type-dot property-type-dot--live-active"></span>${type} for Sale</span>
        <button class="collection-fav-btn active" data-id="${prop.id}" title="Remove from favorites">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <div class="property-image property-image--clickable" style="background: var(--c-bg-white);" data-listing-link="${getListingUrl(prop)}">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" stroke-width="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span class="property-image-overlay"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> View Listing</span>
        </div>
        <div class="property-details">
            <div class="prop-header">
                <h3><span class="address-main">${prop.address}</span><span class="address-secondary">${prop.city}, ${prop.state} ${prop.zipcode}</span></h3>
                <div class="ld-summary-stats prop-stats">
                    ${prop.beds ? `<div class="ld-summary-stat"><span class="ld-summary-stat-value">${prop.beds}</span><span class="ld-summary-stat-label">beds</span></div>` : ''}
                    ${prop.baths ? `<div class="ld-summary-stat"><span class="ld-summary-stat-value">${prop.baths}</span><span class="ld-summary-stat-label">baths</span></div>` : ''}
                    ${prop.livingArea ? `<div class="ld-summary-stat"><span class="ld-summary-stat-value">${Number(prop.livingArea).toLocaleString()}</span><span class="ld-summary-stat-label">sqft</span></div>` : ''}
                </div>
            </div>
            <p style="font-size: 18px; font-weight: 700; color: var(--c-primary); margin: 8px 0;">$${price}${ppsf ? `<span style="font-size: 13px; font-weight: 400; color: var(--c-text-secondary); margin-left: 8px;">$${ppsf}/sqft</span>` : ''}</p>
        </div>
    </div>`;
}

function renderCompareModal(properties) {
    const sections = [
        {
            id: 'overview',
            label: 'Overview',
            rows: [
                { label: 'Status', fn: p => 'For Sale' },
                { label: 'List price', fn: p => '$' + formatPrice(p.price) },
                { label: 'Price/sqft', fn: p => (p.price && p.livingArea) ? '$' + Math.round(Number(p.price) / Number(p.livingArea)).toLocaleString() : '—' },
                { label: 'Bedrooms', fn: p => p.beds || '—' },
                { label: 'Bathrooms', fn: p => p.baths || '—' },
                { label: 'Square feet', fn: p => p.livingArea ? Number(p.livingArea).toLocaleString() : '—' },
            ]
        },
        {
            id: 'interior',
            label: 'Interior',
            rows: [
                { label: 'Home type', fn: p => p.propertyType || '—' },
                { label: 'Year built', fn: p => p.yearBuilt || '—' },
                { label: 'Cooling', fn: p => p.cooling || '—' },
                { label: 'Heating', fn: p => p.heating || '—' },
            ]
        },
        {
            id: 'property',
            label: 'Property',
            rows: [
                { label: 'Lot size', fn: p => p.lotSize ? Number(p.lotSize).toLocaleString() + ' sqft' : '—' },
                { label: 'Parking', fn: p => p.parking || '—' },
                { label: 'Stories', fn: p => p.stories || '—' },
            ]
        },
        {
            id: 'financial',
            label: 'Financial',
            rows: [
                { label: 'HOA dues', fn: p => p.hoa ? '$' + formatPrice(p.hoa) + '/mo' : '—' },
                { label: 'Tax amount', fn: p => p.taxAmount ? '$' + formatPrice(p.taxAmount) + '/yr' : '—' },
            ]
        },
        {
            id: 'neighborhood',
            label: 'Location',
            rows: [
                { label: 'City', fn: p => p.city || '—' },
                { label: 'State', fn: p => p.state || '—' },
                { label: 'Zip code', fn: p => p.zipcode || '—' },
            ]
        },
    ];

    function renderSection(section) {
        return `
            <tr class="compare-section-header" id="compare-section-${section.id}">
                <td colspan="${properties.length + 1}">${section.label}</td>
            </tr>
            ${section.rows.map(row => `<tr>
                <td class="compare-label">${row.label}</td>
                ${properties.map(p => `<td>${row.fn(p)}</td>`).join('')}
            </tr>`).join('')}
        `;
    }

    return `
    <div class="modal-overlay show" id="compareModal">
        <div class="modal compare-modal">
            <div class="compare-modal-header">
                <h2>Compare homes</h2>
                <button class="compare-modal-close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <nav class="compare-tabs">
                ${sections.map((s, i) => `<button class="compare-tab${i === 0 ? ' active' : ''}" data-section="${s.id}">${s.label}</button>`).join('')}
            </nav>
            <div class="compare-table-wrapper">
                <table class="compare-table">
                    <thead>
                        <tr>
                            <th class="compare-label-col"></th>
                            ${properties.map(p => `<th>
                                <div class="compare-th-inner">
                                    <div class="compare-th-img">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="1.5">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                        </svg>
                                    </div>
                                    <span class="compare-th-address">${p.address}</span>
                                    <span class="compare-th-city">${p.city}, ${p.state} ${p.zipcode}</span>
                                </div>
                            </th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${sections.map(s => renderSection(s)).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;
}

export function render() {
    const savedIds = JSON.parse(localStorage.getItem('savedListings') || '[]');
    const properties = savedIds.map(id => getPropertyById(id)).filter(Boolean);
    const hasProperties = properties.length > 0;
    const showSearch = properties.length >= 2;

    const cards = hasProperties
        ? properties.map(p => renderCard(p, false)).join('')
        : `<div class="collection-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--c-text-secondary);margin-bottom:16px;">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <h3>No saved properties yet</h3>
                <p>Click the heart icon on a listing to add it to your favorites.</p>
           </div>`;

    // Get unique property types for filter
    const types = [...new Set(properties.map(p => p.propertyType).filter(Boolean))];

    return `
    <div class="collection-page">
        <div class="visit-tabs">
            ${hasProperties && properties.length >= 2 ? `<button class="btn btn-accent compose-btn" id="favCompareBtn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>Compare
            </button>` : ''}
            ${showSearch ? `
                <div class="message-search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input type="text" id="favSearchInput" placeholder="Search favorites..." />
                </div>
            ` : ''}
            <div class="filter-dropdown" style="position: relative;">
                <button class="filter-btn" id="favSortBtn">
                    <span id="favSortText">All</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <div class="menu right" id="favSortMenu">
                    <button class="menu-item fav-sort-item active" data-sort="added">Recently Added</button>
                    <button class="menu-item fav-sort-item" data-sort="price-asc">Price: Low to High</button>
                    <button class="menu-item fav-sort-item" data-sort="price-desc">Price: High to Low</button>
                    <button class="menu-item fav-sort-item" data-sort="sqft-desc">Largest</button>
                </div>
            </div>
        </div>

        <div class="collection-grid" id="favGrid">${cards}</div>

        <div id="favCompareBar" class="fav-compare-bar" style="display:none;">
            <span id="favCompareCount">0 selected</span>
            <button class="btn btn-p" id="favCompareNow" disabled>Compare Selected</button>
            <button class="btn" id="favCompareCancel">Cancel</button>
        </div>
    </div>`;
}

export function init() {
    let currentTypeFilter = 'all';
    let currentSearch = '';
    let compareMode = false;
    const selectedIds = new Set();

    // Clickable property image → open listing
    document.querySelectorAll('.collection-card .property-image--clickable').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            if (compareMode) return;
            const link = img.dataset.listingLink;
            if (link) window.location.href = link;
        });
    });

    // Remove from favorites
    document.querySelectorAll('.collection-fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = btn.dataset.id;
            const saved = JSON.parse(localStorage.getItem('savedListings') || '[]');
            localStorage.setItem('savedListings', JSON.stringify(saved.filter(s => s !== id)));
            showMobileToast('Removed from your favorites.');

            // Remove card with animation
            const card = btn.closest('.collection-card');
            if (card) {
                card.style.transition = 'opacity 0.3s, transform 0.3s';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.remove();
                    const remaining = document.querySelectorAll('.collection-card').length;
                    const countEl = document.querySelector('.collection-count');
                    if (countEl) countEl.textContent = remaining + (remaining === 1 ? ' property' : ' properties');
                    if (remaining === 0) {
                        const grid = document.querySelector('.collection-grid');
                        if (grid) {
                            grid.innerHTML = `<div class="collection-empty">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--c-text-secondary);margin-bottom:16px;">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <h3>No saved properties yet</h3>
                                <p>Click the heart icon on a listing to add it to your favorites.</p>
                            </div>`;
                        }
                    }
                }, 300);
            }
        });
    });

    // Search
    document.getElementById('favSearchInput')?.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        filterCards();
    });

    function filterCards() {
        document.querySelectorAll('.collection-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            const type = card.dataset.type || '';
            const matchesSearch = !currentSearch || text.includes(currentSearch);
            const matchesType = currentTypeFilter === 'all' || type === currentTypeFilter;
            card.style.display = (matchesSearch && matchesType) ? '' : 'none';
        });
    }

    // Type filter dropdown
    document.getElementById('favTypeFilterBtn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('favTypeFilterMenu')?.classList.toggle('show');
    });

    document.querySelectorAll('.fav-type-filter').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            currentTypeFilter = item.dataset.type;
            document.querySelectorAll('.fav-type-filter').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            document.getElementById('favTypeFilterText').textContent = item.textContent.trim();
            document.getElementById('favTypeFilterMenu')?.classList.remove('show');
            filterCards();
        });
    });

    // Sort dropdown
    document.getElementById('favSortBtn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('favSortMenu')?.classList.toggle('show');
    });

    document.querySelectorAll('.fav-sort-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.fav-sort-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            document.getElementById('favSortText').textContent = item.textContent.trim();
            document.getElementById('favSortMenu')?.classList.remove('show');

            const grid = document.getElementById('favGrid');
            const cards = [...grid.querySelectorAll('.collection-card')];
            const sort = item.dataset.sort;

            cards.sort((a, b) => {
                const pa = getPropertyById(a.dataset.id);
                const pb = getPropertyById(b.dataset.id);
                if (!pa || !pb) return 0;
                if (sort === 'price-asc') return Number(pa.price) - Number(pb.price);
                if (sort === 'price-desc') return Number(pb.price) - Number(pa.price);
                if (sort === 'sqft-desc') return Number(pb.livingArea || 0) - Number(pa.livingArea || 0);
                // 'added' = original order from localStorage
                const saved = JSON.parse(localStorage.getItem('savedListings') || '[]');
                return saved.indexOf(a.dataset.id) - saved.indexOf(b.dataset.id);
            });

            cards.forEach(c => grid.appendChild(c));
        });
    });

    // Compare mode
    const compareBtn = document.getElementById('favCompareBtn');
    const compareBar = document.getElementById('favCompareBar');
    const compareNow = document.getElementById('favCompareNow');
    const compareCancel = document.getElementById('favCompareCancel');
    const compareCount = document.getElementById('favCompareCount');

    function enterCompareMode() {
        compareMode = true;
        selectedIds.clear();
        // Re-render cards with checkboxes
        const grid = document.getElementById('favGrid');
        const savedIds = JSON.parse(localStorage.getItem('savedListings') || '[]');
        const properties = savedIds.map(id => getPropertyById(id)).filter(Boolean);
        grid.innerHTML = properties.map(p => renderCard(p, true)).join('');
        compareBar.style.display = 'flex';
        compareBtn.style.display = 'none';
        updateCompareCount();
        bindCompareCheckboxes();
        // Re-bind heart and image click
        bindCardEvents();
    }

    function exitCompareMode() {
        compareMode = false;
        selectedIds.clear();
        const grid = document.getElementById('favGrid');
        const savedIds = JSON.parse(localStorage.getItem('savedListings') || '[]');
        const properties = savedIds.map(id => getPropertyById(id)).filter(Boolean);
        grid.innerHTML = properties.map(p => renderCard(p, false)).join('');
        compareBar.style.display = 'none';
        if (compareBtn) compareBtn.style.display = '';
        bindCardEvents();
    }

    function updateCompareCount() {
        const n = selectedIds.size;
        if (compareCount) compareCount.textContent = n + ' selected';
        if (compareNow) compareNow.disabled = n < 2;
    }

    function bindCompareCheckboxes() {
        document.querySelectorAll('.fav-compare-input').forEach(cb => {
            cb.addEventListener('change', () => {
                if (cb.checked) {
                    if (selectedIds.size >= 4) {
                        cb.checked = false;
                        showMobileToast('You can compare up to 4 properties.');
                        return;
                    }
                    selectedIds.add(cb.dataset.id);
                } else {
                    selectedIds.delete(cb.dataset.id);
                }
                updateCompareCount();
            });
        });
    }

    function bindCardEvents() {
        document.querySelectorAll('.collection-card .property-image--clickable').forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                if (compareMode) return;
                const link = img.dataset.listingLink;
                if (link) window.location.href = link;
            });
        });

        document.querySelectorAll('.collection-fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = btn.dataset.id;
                const saved = JSON.parse(localStorage.getItem('savedListings') || '[]');
                localStorage.setItem('savedListings', JSON.stringify(saved.filter(s => s !== id)));
                showMobileToast('Removed from your favorites.');
                const card = btn.closest('.collection-card');
                if (card) {
                    card.style.transition = 'opacity 0.3s, transform 0.3s';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.remove();
                        selectedIds.delete(id);
                        updateCompareCount();
                        const remaining = document.querySelectorAll('.collection-card').length;
                        const countEl = document.querySelector('.collection-count');
                        if (countEl) countEl.textContent = remaining + (remaining === 1 ? ' property' : ' properties');
                        if (remaining === 0) {
                            const grid = document.querySelector('.collection-grid');
                            if (grid) {
                                grid.innerHTML = `<div class="collection-empty">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--c-text-secondary);margin-bottom:16px;">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                    <h3>No saved properties yet</h3>
                                    <p>Click the heart icon on a listing to add it to your favorites.</p>
                                </div>`;
                            }
                            exitCompareMode();
                        }
                    }, 300);
                }
            });
        });
    }

    compareBtn?.addEventListener('click', enterCompareMode);
    compareCancel?.addEventListener('click', exitCompareMode);

    compareNow?.addEventListener('click', () => {
        const properties = [...selectedIds].map(id => getPropertyById(id)).filter(Boolean);
        if (properties.length < 2) return;
        const html = renderCompareModal(properties);
        document.body.insertAdjacentHTML('beforeend', html);

        const modal = document.getElementById('compareModal');
        modal.querySelector('.compare-modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

        // Tab navigation — scroll to section
        modal.querySelectorAll('.compare-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                modal.querySelectorAll('.compare-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const sectionId = tab.dataset.section;
                const section = modal.querySelector('#compare-section-' + sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
            document.querySelectorAll('.menu.show').forEach(m => m.classList.remove('show'));
        }
    });
}
