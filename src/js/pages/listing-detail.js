import store from '../store.js';

let _observers = [];

function getPropertyData(propertyId) {
    const properties = store.get('properties') || [];
    const p = properties.find(pr => pr.id === propertyId);
    if (!p) return null;

    const price = parseFloat((p.price || '0').replace(/,/g, '')) || 0;
    const sqft = parseFloat((p.livingArea || '0').replace(/,/g, '')) || 0;
    const pricePerSqft = sqft > 0 ? (price / sqft).toFixed(2) : '0';
    const creditBack = Math.round(price * 0.02);
    const daysOnMarket = Math.max(1, Math.floor((Date.now() - new Date(p.createdAt).getTime()) / 86400000));

    return {
        ...p,
        priceFormatted: price.toLocaleString('en-US'),
        pricePerSqft,
        creditBack: creditBack.toLocaleString('en-US'),
        daysOnMarket,
        sqftFormatted: sqft.toLocaleString('en-US'),
        lotFormatted: p.lotSize ? parseFloat(p.lotSize.replace(/,/g, '')).toLocaleString('en-US') : null,
        description: p.description || `Welcome to this beautiful ${p.propertyType || 'home'} located at ${p.address}, ${p.city}, ${p.state} ${p.zipcode}. This ${p.beds}-bedroom, ${p.baths}-bathroom property offers ${sqft.toLocaleString()} sqft of living space. The open floor plan features a spacious living area, updated kitchen with modern appliances, and generous bedrooms with ample natural light. The property is conveniently located near schools, shopping, and major highways. Don't miss this opportunity!`,
        yearBuilt: p.yearBuilt || 2005,
        construction: p.construction || 'CBS / Block',
        roof: p.roof || 'Shingle',
        flooring: p.flooring || 'Tile, Laminate',
        cooling: p.cooling || 'Central Air',
        heating: p.heating || 'Central',
        parking: p.parking || '2-car Garage',
        pool: p.pool || 'No',
        stories: p.stories || 1,
        waterSource: p.waterSource || 'Public',
        sewer: p.sewer || 'Public Sewer',
        electric: p.electric || 'FPL',
        hoa: p.hoa || 0,
        taxAmount: p.taxAmount || Math.round(price * 0.012),
        taxYear: p.taxYear || 2025,
        parcel: p.parcel || '01-3114-045-0040',
        zoning: p.zoning || 'Residential',
        subdivision: p.subdivision || 'N/A',
        mlsArea: p.mlsArea || 'Miami-Dade',
        county: p.county || 'Miami-Dade',
        mlsNumber: p.mlsNumber || 'A' + Math.floor(Math.random() * 9000000 + 1000000),
        agentName: p.agentName || 'beycome Team',
        agentEmail: p.agentEmail || 'support@beycome.com',
        brokerage: p.brokerage || 'beycome Realty',
        brokeragePhone: p.brokeragePhone || '(804) 656-5007',
    };
}

function renderSimilarCards(currentId) {
    const properties = store.get('properties') || [];
    const others = properties.filter(p => p.id !== currentId).slice(0, 6);
    if (others.length === 0) return '';

    const cards = others.map(p => {
        const price = parseFloat((p.price || '0').replace(/,/g, '')) || 0;
        const credit = Math.round(price * 0.02);
        return `
        <div class="ld-prop-card" data-id="${p.id}">
            <div class="ld-prop-img">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <button class="ld-prop-heart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
            </div>
            <div class="ld-prop-info">
                <div style="display:flex;align-items:baseline;gap:8px;">
                    <span class="ld-prop-price">$${price.toLocaleString('en-US')}</span>
                    ${credit > 0 ? `<span class="ld-prop-credit">$${credit.toLocaleString('en-US')} Credit Back*</span>` : ''}
                </div>
                <div class="ld-prop-address">${[p.address, [p.city, p.state].filter(Boolean).join(', '), p.zipcode].filter(Boolean).join(', ')}</div>
                <div class="ld-prop-stats">
                    <span>${p.beds} beds</span>
                    <span>${p.baths} baths</span>
                    <span>${parseFloat((p.livingArea || '0').replace(/,/g, '')).toLocaleString()} Sqft</span>
                </div>
            </div>
        </div>`;
    }).join('');

    return `
    <div class="ld-similar">
        <h2>Similar properties</h2>
        <div class="ld-similar-grid">${cards}</div>
    </div>`;
}

export function render(propertyId) {
    const d = getPropertyData(propertyId);
    if (!d) {
        return `<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:16px;">
            <p style="font-size:16px;color:var(--c-error);font-weight:600;">Property not found</p>
            <a href="#/your-listing" style="color:var(--c-accent);font-size:14px;">Back to listings</a>
        </div>`;
    }

    const monthlyMortgage = Math.round((parseFloat(d.price.replace(/,/g, '')) * 0.97 * 0.065 / 12) / (1 - Math.pow(1 + 0.065 / 12, -360)));
    const monthlyTax = Math.round(d.taxAmount / 12);
    const monthlyInsurance = Math.round(parseFloat(d.price.replace(/,/g, '')) * 0.004 / 12);
    const monthlyTotal = monthlyMortgage + monthlyTax + d.hoa + monthlyInsurance;
    const downPayment3 = Math.round(parseFloat(d.price.replace(/,/g, '')) * 0.03);
    const closingCosts = Math.round(parseFloat(d.price.replace(/,/g, '')) * 0.015);
    const dueAtClose = downPayment3 + closingCosts;

    return `
    <!-- Public Header -->
    <header style="background:var(--c-bg-white);border-bottom:1px solid var(--c-border);padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;">
        <div style="display:flex;align-items:center;gap:32px;">
            <a href="#/your-listing" style="display:flex;align-items:center;">
                <svg width="140" height="28" viewBox="0 0 564 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M80.4 49.6c0 22-15.6 39.2-37.2 39.2S6 71.6 6 49.6 21.6 10.4 43.2 10.4s37.2 17.2 37.2 39.2z" fill="#FF9B77"/><path d="M43.2 2C20 2 2 22 2 49.6s18 47.6 41.2 47.6 41.2-20 41.2-47.6S66.4 2 43.2 2zm0 8.4c21.6 0 37.2 17.2 37.2 39.2S64.8 88.8 43.2 88.8 6 71.6 6 49.6s15.6-39.2 37.2-39.2z" fill="#152330"/><text x="95" y="70" font-family="system-ui,sans-serif" font-size="62" font-weight="700" fill="#152330">beycome</text></svg>
            </a>
            <nav style="display:flex;gap:24px;font-size:14px;font-weight:500;">
                <a href="javascript:void(0)" style="color:var(--c-primary);text-decoration:none;">Sell</a>
                <a href="javascript:void(0)" style="color:var(--c-primary);text-decoration:none;">Buy</a>
                <a href="javascript:void(0)" style="color:var(--c-primary);text-decoration:none;">Title Services</a>
                <a href="javascript:void(0)" style="color:var(--c-primary);text-decoration:none;">Home Estimate</a>
            </nav>
        </div>
        <a href="#/your-listing" id="ldBackBtn" style="color:var(--c-primary);text-decoration:none;font-size:14px;font-weight:500;display:flex;align-items:center;gap:6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L18 6M6 6l12 12"/></svg>
            Close
        </a>
    </header>

    <!-- Photo Gallery -->
    <div style="max-width:1200px;margin:12px auto 0;padding:0 20px;">
        <div class="ld-gallery">
            <div class="ld-gallery-main">
                <svg class="ld-gallery-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <div class="ld-gallery-map">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div class="ld-gallery-count">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    1 / 25 photos
                </div>
                <button class="ld-gallery-nav">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>
            <div class="ld-gallery-side">
                <svg class="ld-gallery-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <div class="ld-gallery-side">
                <svg class="ld-gallery-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
        </div>
    </div>

    <!-- Price + Stats Summary Bar (Zillow-style) -->
    <div style="max-width:1200px;margin:0 auto;padding:0 20px;">
        <div class="ld-summary-bar">
            <div class="ld-summary-left">
                <div class="ld-summary-meta">
                    <span class="ld-summary-status"><span class="ld-status-dot"></span>${d.status === 'live-active' ? 'Active' : d.status === 'under-contract' ? 'Under Contract' : 'Active'}</span>
                </div>
                <div class="ld-summary-address">${d.address}</div>
                <div class="ld-summary-city">${d.city}, ${d.state} ${d.zipcode}</div>
            </div>
            <div class="ld-summary-stats">
                <div class="ld-summary-stat">
                    <span class="ld-summary-stat-value">${d.beds}</span>
                    <span class="ld-summary-stat-label">beds</span>
                </div>
                <div class="ld-summary-stat">
                    <span class="ld-summary-stat-value">${d.baths}</span>
                    <span class="ld-summary-stat-label">baths</span>
                </div>
                <div class="ld-summary-stat">
                    <span class="ld-summary-stat-value">${d.sqftFormatted}</span>
                    <span class="ld-summary-stat-label">sqft</span>
                </div>
                ${d.lotFormatted ? `<div class="ld-summary-stat">
                    <span class="ld-summary-stat-value">${d.lotFormatted}</span>
                    <span class="ld-summary-stat-label">lot sqft</span>
                </div>` : ''}
            </div>
        </div>
    </div>

    <!-- Tabs -->
    <div class="ld-tabs" id="ldTabs">
        <div class="ld-tabs-inner">
            <button class="ld-tab active" data-target="ldOverview">Overview</button>
            <button class="ld-tab" data-target="ldNeighborhood">Neighborhood</button>
            <button class="ld-tab" data-target="ldAmenities">Amenities</button>
            <button class="ld-tab" data-target="ldPriceDetails">Price details</button>
        </div>
    </div>

    <!-- Two-column layout -->
    <div style="max-width:1200px;margin:0 auto;padding:0 20px;">
        <div class="ld-content">
            <!-- Main content -->
            <div class="ld-main">

                <!-- Overview -->
                <div id="ldOverview">
                    <div class="ld-section">
                        <h2 class="ld-section-title">Description:</h2>
                        <div class="ld-summary-meta">
                            <span class="ld-summary-status"><span class="ld-status-dot"></span>${d.status === 'live-active' ? 'Active' : d.status === 'under-contract' ? 'Under Contract' : 'Active'}</span>
                            <span class="ld-summary-sep">&bull;</span>
                            <span>${d.propertyType || 'Single Family Home'} for ${d.listingType === 'For Rent' ? 'rent' : 'sale'}</span>
                            ${(d.propertyType || '').toLowerCase() !== 'land' ? `<span class="ld-summary-sep">&bull;</span><span>Built in ${d.yearBuilt}</span>` : ''}
                            ${d.lotFormatted ? `<span class="ld-summary-sep">&bull;</span><span>${d.lotFormatted} sqft lot</span>` : ''}
                        </div>
                        <p class="ld-description">${d.description}</p>
                    </div>

                    <div class="ld-section">
                        <h2 class="ld-section-title">Listing information:</h2>
                        <div class="ld-agent-details">
                            <div>- Days on market: <strong>${d.daysOnMarket}</strong></div>
                            <div>- Listing provided by:</div>
                            <div>&nbsp;&nbsp;<strong>${d.agentName}</strong> &bull; ${d.brokerage} &bull; ${d.brokeragePhone}</div>
                            <div>- MLS Number: <strong>${d.mlsNumber}</strong></div>
                        </div>
                    </div>
                </div>

                <!-- Neighborhood -->
                <div id="ldNeighborhood">
                    <div class="ld-section">
                        <h2 class="ld-section-title">Location</h2>
                        <div class="ld-location-tabs">
                            <button class="ld-location-tab active">School</button>
                            <button class="ld-location-tab">Religions</button>
                            <button class="ld-location-tab">Other Places</button>
                        </div>
                        <div class="ld-map-placeholder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                    </div>

                    <div class="ld-section">
                        <div class="ld-commute-header">
                            <h2 class="ld-section-title" style="margin:0;">What will my commute be?</h2>
                        </div>
                        <div style="border:1px solid var(--c-border);border-radius:8px;padding:12px 16px;margin-bottom:16px;font-size:14px;color:var(--c-text-secondary);">
                            <span style="margin-right:8px;">&#9737;</span> Add a commute location
                        </div>
                        <div class="ld-commute-modes">
                            <button class="ld-commute-mode active">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                            </button>
                            <button class="ld-commute-mode">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 17v-4h4v4"/><path d="M13 17V7h4v10"/></svg>
                            </button>
                            <button class="ld-commute-mode">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 4v16M17 4v16M7 4v16M3 8h4m-4 4h4m-4 4h4m6-8h4m-4 4h4m-4 4h4"/></svg>
                            </button>
                            <button class="ld-commute-mode">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18.5" cy="18.5" r="3.5"/><circle cx="5.5" cy="18.5" r="3.5"/><path d="M15 18.5h-1a2 2 0 0 1-2-2V9.17a2 2 0 0 1 .59-1.42l3.82-3.82a.5.5 0 0 1 .82.24L18.18 8H15"/></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Amenities -->
                <div id="ldAmenities">
                    <div class="ld-section">
                        <h2 class="ld-section-title">Facts and features:</h2>
                        <div class="ld-facts-list" id="ldFacts">
                            <div class="ld-fact-item"><span class="ld-fact-label">Appliances:</span> <strong>Dryer, Range, Refrigerator, Washer</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Furnished:</span> <strong>Unfurnished</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Laundry:</span> <strong>Inside</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Lot Size:</span> <strong>${d.lotFormatted || 'N/A'} sqft</strong></div>
                        </div>
                        <div class="ld-facts-list" id="ldFactsMore" style="display:none;">
                            <div class="ld-fact-item"><span class="ld-fact-label">Parking:</span> <strong>${d.parking}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Pool:</span> <strong>${d.pool}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Stories:</span> <strong>${d.stories}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Exterior:</span> <strong>Fenced</strong></div>
                        </div>
                        <button class="ld-see-more" data-toggle="ldFactsMore">See 4 more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                    </div>

                    <div class="ld-section">
                        <h2 class="ld-section-title">Structure:</h2>
                        <div class="ld-facts-list" id="ldStructure">
                            <div class="ld-fact-item"><span class="ld-fact-label">Year Built:</span> <strong>${d.yearBuilt}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Construction:</span> <strong>${d.construction}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Cooling:</span> <strong>${d.cooling}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Exterior:</span> <strong>Fenced</strong></div>
                        </div>
                        <div class="ld-facts-list" id="ldStructureMore" style="display:none;">
                            <div class="ld-fact-item"><span class="ld-fact-label">Flooring:</span> <strong>${d.flooring}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Roof:</span> <strong>${d.roof}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Heating:</span> <strong>${d.heating}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Window Features:</span> <strong>Impact Glass</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Foundation:</span> <strong>Slab</strong></div>
                        </div>
                        <button class="ld-see-more" data-toggle="ldStructureMore">See 5 more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                    </div>

                    <div class="ld-section">
                        <h2 class="ld-section-title">Utilities:</h2>
                        <div class="ld-facts-list">
                            <div class="ld-fact-item"><span class="ld-fact-label">Electric:</span> <strong>${d.electric}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Sewer:</span> <strong>${d.sewer}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Utilities:</span> <strong>Cable Available</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Water Source:</span> <strong>${d.waterSource}</strong></div>
                        </div>
                    </div>

                    <div class="ld-section">
                        <h2 class="ld-section-title">Tax:</h2>
                        <div class="ld-facts-list">
                            <div class="ld-fact-item"><span class="ld-fact-label">Parcel Number:</span> <strong>${d.parcel}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Zoning:</span> <strong>${d.zoning}</strong></div>
                        </div>
                    </div>

                    <div class="ld-section">
                        <h2 class="ld-section-title">Location:</h2>
                        <div class="ld-facts-list">
                            <div class="ld-fact-item"><span class="ld-fact-label">Subdivision:</span> <strong>${d.subdivision}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">MLS Area:</span> <strong>${d.mlsArea}</strong></div>
                        </div>
                    </div>
                </div>

                <!-- Price Details -->
                <div id="ldPriceDetails">
                    <div class="ld-section" style="border-bottom:none;">
                        <h2 class="ld-section-title">Affordability:</h2>
                        <div class="ld-afford-header">
                            <div class="ld-afford-price-row">
                                <span style="font-size:14px;color:var(--c-text-secondary);">Purchase price</span>
                                <span style="font-size:18px;font-weight:700;color:var(--c-primary);">$${d.priceFormatted}</span>
                            </div>
                            <div class="ld-afford-toggle" id="ldAffordToggle">
                                <button class="ld-afford-toggle-btn active" data-mode="mortgage">Mortgage</button>
                                <button class="ld-afford-toggle-btn" data-mode="cash">All cash</button>
                            </div>
                        </div>
                        <div id="ldAffordMortgage">
                            <div class="ld-afford-grid">
                                <div class="ld-afford-col">
                                    <h4>Monthly expenses</h4>
                                    <div class="ld-afford-total"><span>Total</span><span>$${monthlyTotal.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Mortgage 6.5%</span><span class="ld-afford-value">$${monthlyMortgage.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Property Tax</span><span class="ld-afford-value">$${monthlyTax.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">HOA Fee</span><span class="ld-afford-value">$${d.hoa.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Homeowners Insurance</span><span class="ld-afford-value">$${monthlyInsurance.toLocaleString()}</span></div>
                                </div>
                                <div class="ld-afford-col">
                                    <h4>Due at Close</h4>
                                    <div class="ld-afford-total"><span>Total</span><span>$${dueAtClose.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Minimum down payment 3%</span><span class="ld-afford-value">$${downPayment3.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Closing costs</span><span class="ld-afford-value">$${closingCosts.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">beycome Pre-paid title: $99</span><span class="ld-afford-value" style="color:var(--c-accent);">Discover Title Services</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">beycome Credit Est.</span><span class="ld-afford-value" style="color:var(--c-success);">$${d.creditBack}</span></div>
                                </div>
                            </div>
                        </div>
                        <div id="ldAffordCash" style="display:none;">
                            <div class="ld-afford-grid">
                                <div class="ld-afford-col">
                                    <h4>Monthly expenses</h4>
                                    <div class="ld-afford-total"><span>Total</span><span>$${(monthlyTax + d.hoa + monthlyInsurance).toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Property Tax</span><span class="ld-afford-value">$${monthlyTax.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">HOA Fee</span><span class="ld-afford-value">$${d.hoa.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Homeowners Insurance</span><span class="ld-afford-value">$${monthlyInsurance.toLocaleString()}</span></div>
                                </div>
                                <div class="ld-afford-col">
                                    <h4>Due at Close</h4>
                                    <div class="ld-afford-total"><span>Total</span><span>$${(parseFloat(d.price.replace(/,/g, '')) + closingCosts).toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Purchase price</span><span class="ld-afford-value">$${d.priceFormatted}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Closing costs</span><span class="ld-afford-value">$${closingCosts.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">beycome Pre-paid title: $99</span><span class="ld-afford-value" style="color:var(--c-accent);">Discover Title Services</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">beycome Credit Est.</span><span class="ld-afford-value" style="color:var(--c-success);">$${d.creditBack}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="ld-sidebar">
                <div class="ld-price-card">
                    <div class="ld-sidebar-price">$${d.priceFormatted} <span class="ld-sidebar-ppsf">$${d.pricePerSqft}/sf</span></div>
                    <a href="javascript:void(0)" class="ld-credit-back">Credit Back up to $${d.creditBack}*</a>
                    <button class="ld-cta-primary" id="ldOfferBtn">Make an Offer</button>
                    <button class="ld-cta-secondary" id="ldInfoBtn">Request Information</button>
                    <button class="ld-cta-secondary" id="ldTourBtn">Schedule a tour</button>
                    <div class="ld-price-actions">
                        <button class="ld-price-icon" id="ldSaveBtn" title="Save">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                        <button class="ld-price-icon" id="ldShareBtn" title="Share">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                        </button>
                    </div>
                </div>

                <!-- Artur Chat -->
                <div class="chat-widget ld-chat-widget">
                    <div class="chat-header"><h3>💬 Chat with Artur<span class="chat-online-dot"></span></h3></div>
                    <div class="chat-messages" id="ldChatMessages"></div>
                    <div class="chat-input-container">
                        <div class="chat-input-wrapper">
                            <input type="text" class="chat-input" id="ldChatInput" placeholder="Ask Artur anything…">
                            <button class="chat-attach-btn" id="ldChatAttachBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>
                            <button class="chat-mic-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg></button>
                            <button class="chat-send-btn" id="ldChatSendBtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></button>
                        </div>
                        <div class="chat-disclaimer">✨ Artur has helped <strong>18,500+</strong> homeowners close their sale<br>Beycome makes no warranties regarding content produced by Artur.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Credit Back Promo -->
    <div style="max-width:1200px;margin:0 auto 40px;padding:0 20px;">
        <div class="ld-promo">
            <div class="ld-promo-circle"><span>Save</span><span>Credit Back</span></div>
            <div class="ld-promo-text">
                <h3>Buy with beycome and get up to $${d.creditBack} Credit Back*</h3>
                <p>*Estimated beycome credit amount varies by closing price, commission offered and is not available in certain areas or where prohibited by law.</p>
                <button class="ld-promo-btn">Start an Offer</button>
            </div>
        </div>
    </div>

    <!-- Score -->
    <div style="max-width:1200px;margin:0 auto;padding:0 20px;">
        <h2 class="ld-section-title" style="margin-bottom:16px;">Score:</h2>
        <div class="ld-scores">
            <div class="ld-score-card">
                <div class="ld-score-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>
                </div>
                <div>
                    <div class="ld-score-label">Walk Score&reg;</div>
                    <div style="display:flex;align-items:baseline;gap:8px;margin:4px 0;">
                        <span class="ld-score-value">53%</span>
                        <span class="ld-score-desc">Somewhat walkable - some errands can be accomplished on foot.</span>
                    </div>
                    <div class="ld-score-bar"><div class="ld-score-bar-fill" style="width:53%;background:var(--c-success);"></div></div>
                </div>
            </div>
            <div class="ld-score-card">
                <div class="ld-score-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                </div>
                <div>
                    <div class="ld-score-label">Soundscore&trade;</div>
                    <div style="display:flex;align-items:baseline;gap:8px;margin:4px 0;">
                        <span class="ld-score-value">N/A</span>
                        <span class="ld-score-desc">We don't have enough data to provide your Soundscore.</span>
                    </div>
                    <div class="ld-score-bar"><div class="ld-score-bar-fill" style="width:0%;"></div></div>
                </div>
            </div>
            <div class="ld-score-card ld-score-card--empty">
                <div class="ld-score-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div>
                    <div class="ld-score-label">Transit Score</div>
                    <div style="display:flex;align-items:baseline;gap:8px;margin:4px 0;">
                        <span class="ld-score-value" style="opacity:0.3;">--</span>
                        <span class="ld-score-desc">Transit score data is not yet available for this area.</span>
                    </div>
                    <div class="ld-score-bar"><div class="ld-score-bar-fill" style="width:0%;"></div></div>
                </div>
            </div>
        </div>
        <div class="ld-env-grid">
            <!-- Air Quality -->
            <div class="ld-env-card">
                <div class="ld-env-gauge">
                    <svg viewBox="0 0 80 80" class="ld-env-ring">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-border)" stroke-width="6"/>
                        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-success)" stroke-width="6" stroke-dasharray="${Math.round(213.6 * 0.72)} 213.6" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 40 40)"/>
                    </svg>
                    <div class="ld-env-gauge-inner">
                        <span class="ld-env-gauge-number">38</span>
                        <span class="ld-env-gauge-unit">AQI</span>
                    </div>
                </div>
                <div class="ld-env-info">
                    <h4>Air Quality</h4>
                    <span class="ld-env-badge" style="background:hsla(137,28%,49%,0.12);color:var(--c-success);">Good</span>
                    <p>Air quality is satisfactory with little to no health risk.</p>
                </div>
            </div>
            <!-- Pollen -->
            <div class="ld-env-card">
                <div class="ld-env-gauge">
                    <svg viewBox="0 0 80 80" class="ld-env-ring">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-border)" stroke-width="6"/>
                        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-warning)" stroke-width="6" stroke-dasharray="${Math.round(213.6 * 0.45)} 213.6" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 40 40)"/>
                    </svg>
                    <div class="ld-env-gauge-inner">
                        <span class="ld-env-gauge-number">Med</span>
                        <span class="ld-env-gauge-unit">Level</span>
                    </div>
                </div>
                <div class="ld-env-info">
                    <h4>Pollen</h4>
                    <span class="ld-env-badge" style="background:hsla(32,94%,44%,0.12);color:var(--c-warning);">Moderate</span>
                    <div class="ld-env-pollen-types">
                        <div class="ld-env-pollen-type"><span class="ld-env-pollen-dot" style="background:var(--c-success);"></span>Tree <span>Low</span></div>
                        <div class="ld-env-pollen-type"><span class="ld-env-pollen-dot" style="background:var(--c-warning);"></span>Grass <span>Moderate</span></div>
                        <div class="ld-env-pollen-type"><span class="ld-env-pollen-dot" style="background:var(--c-success);"></span>Weed <span>Low</span></div>
                    </div>
                </div>
            </div>
            <!-- UV / Sun -->
            <div class="ld-env-card">
                <div class="ld-env-gauge">
                    <svg viewBox="0 0 80 80" class="ld-env-ring">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-border)" stroke-width="6"/>
                        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-accent-orange)" stroke-width="6" stroke-dasharray="${Math.round(213.6 * 0.55)} 213.6" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 40 40)"/>
                    </svg>
                    <div class="ld-env-gauge-inner">
                        <span class="ld-env-gauge-number">6</span>
                        <span class="ld-env-gauge-unit">UV</span>
                    </div>
                </div>
                <div class="ld-env-info">
                    <h4>UV Index / Sun</h4>
                    <span class="ld-env-badge" style="background:hsla(16,100%,73%,0.12);color:var(--c-accent-orange);">High</span>
                    <div class="ld-env-sun-times">
                        <div class="ld-env-sun-row">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                            <span>Sunrise <strong>6:42 AM</strong></span>
                        </div>
                        <div class="ld-env-sun-row">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M12 10V2"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>
                            <span>Sunset <strong>7:28 PM</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p style="font-size:11px;color:var(--c-text-secondary);margin:-24px 0 40px;">Environmental data powered by Google Maps APIs &bull; Updated daily</p>
    </div>

    <!-- Sell promo -->
    <div style="max-width:1200px;margin:0 auto 40px;padding:0 20px;">
        <div class="ld-promo" style="background:var(--c-bg-light);">
            <div class="ld-promo-circle" style="background:var(--c-accent-orange);"><span>No</span><span>Commission</span></div>
            <div class="ld-promo-text">
                <h3>Also selling a home? We can help with that too.</h3>
                <p style="color:var(--c-accent-orange);font-weight:600;font-size:16px;">Save money, time and stress.</p>
                <p>$99, $399 and $1,399 True Flat fee.</p>
                <button class="ld-promo-btn" style="background:var(--c-accent-orange);">List your home</button>
            </div>
        </div>
    </div>

    <!-- Disclaimer -->
    <div style="max-width:1200px;margin:0 auto;padding:0 20px;">
        <div class="ld-disclaimer">
            <strong>Disclaimer</strong><br><br>
            Based on information submitted to the MLS GRID. All data is obtained from various sources and may not have been verified by broker or MLS GRID. Supplied Open House Information is subject to change without notice. All information should be independently reviewed and verified for accuracy. Properties may or may not be listed by the office/agent presenting the information.
        </div>
    </div>

    <!-- Similar Properties -->
    <div style="max-width:1200px;margin:0 auto;padding:0 20px;">
        ${renderSimilarCards(propertyId)}
    </div>

    <!-- Customer Reviews -->
    <div style="padding:0 20px;">
        <div class="ld-reviews">
            <h2>Customer reviews</h2>
            <div class="ld-review-card">
                <div class="ld-review-avatar">M</div>
                <div class="ld-review-name">Marc & Staci K., Loxahatchee, Fl</div>
                <div class="ld-review-stars">&starf;&starf;&starf;&starf;&starf;</div>
                <p class="ld-review-text">We officially close TOMORROW! And yes we got our asking price. With love and gratitude, Mission Accomplished. Closed with beycome in 1 month & 14 days.</p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="ld-footer">
        <div class="ld-footer-inner">
            <div class="ld-footer-grid">
                <div class="ld-footer-col">
                    <h4>Features</h4>
                    <a href="javascript:void(0)">Sell my home</a>
                    <a href="javascript:void(0)">Buy a home</a>
                    <a href="javascript:void(0)">Title</a>
                    <a href="javascript:void(0)">Property Price Estimator</a>
                    <a href="javascript:void(0)">Yard Sign</a>
                </div>
                <div class="ld-footer-col">
                    <h4>Resources</h4>
                    <a href="javascript:void(0)">Contact</a>
                    <a href="javascript:void(0)">How it Works</a>
                    <a href="javascript:void(0)">Real estate Glossary</a>
                    <a href="javascript:void(0)">Blog</a>
                    <a href="javascript:void(0)">FAQ</a>
                </div>
                <div class="ld-footer-col">
                    <h4>Company</h4>
                    <a href="javascript:void(0)">About Us</a>
                    <a href="javascript:void(0)">Reviews</a>
                    <a href="javascript:void(0)">Press</a>
                    <a href="javascript:void(0)">Terms & Conditions</a>
                    <a href="javascript:void(0)">Privacy & Security</a>
                </div>
                <div class="ld-footer-col">
                    <h4>Contact</h4>
                    <p>5701 Sunset Drive #224, South Miami, FL 33143</p>
                    <p style="margin-top:8px;">Phone: (804) 656-5007</p>
                    <p>Email: contact@beycome.com</p>
                    <p style="margin-top:8px;">Monday to Friday - 8:30am - 6:30pm EST<br>Saturday - 9am - 5pm EST</p>
                </div>
            </div>
            <div class="ld-footer-bottom">&copy; ${new Date().getFullYear()} beycome. All rights reserved.</div>
        </div>
    </footer>

    `;
}

export function init(propertyId) {
    const container = document.getElementById('listing-detail-container');
    if (!container) return;

    // Scroll to top
    container.scrollTop = 0;

    // Tab click handlers
    container.querySelectorAll('.ld-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.ld-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.target);
            if (target) {
                const tabsBar = container.querySelector('.ld-tabs');
                const offset = tabsBar ? tabsBar.offsetHeight + 10 : 60;
                const top = target.getBoundingClientRect().top + container.scrollTop - container.getBoundingClientRect().top - offset;
                container.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for scroll-spy tabs
    const sections = ['ldOverview', 'ldNeighborhood', 'ldAmenities', 'ldPriceDetails'];
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                container.querySelectorAll('.ld-tab').forEach(t => t.classList.remove('active'));
                const tab = container.querySelector(`.ld-tab[data-target="${entry.target.id}"]`);
                if (tab) tab.classList.add('active');
            }
        });
    }, { root: container, rootMargin: '-80px 0px -60% 0px', threshold: 0 });

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
    _observers.push(observer);

    // See more toggles
    container.querySelectorAll('.ld-see-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.toggle);
            if (target) {
                const isVisible = target.style.display !== 'none';
                target.style.display = isVisible ? 'none' : 'block';
                btn.classList.toggle('expanded', !isVisible);
                btn.innerHTML = isVisible
                    ? btn.innerHTML.replace('See less', 'See more').replace(/See \d+ more/, btn.textContent.trim().match(/See \d+ more/)?.[0] || 'See more')
                    : btn.innerHTML.replace(/See \d+ more/, 'See less');
            }
        });
    });

    // Affordability mortgage/cash toggle
    const affordToggle = container.querySelector('#ldAffordToggle');
    if (affordToggle) {
        affordToggle.querySelectorAll('.ld-afford-toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                affordToggle.querySelectorAll('.ld-afford-toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const mortgageEl = document.getElementById('ldAffordMortgage');
                const cashEl = document.getElementById('ldAffordCash');
                if (btn.dataset.mode === 'mortgage') {
                    if (mortgageEl) mortgageEl.style.display = 'block';
                    if (cashEl) cashEl.style.display = 'none';
                } else {
                    if (mortgageEl) mortgageEl.style.display = 'none';
                    if (cashEl) cashEl.style.display = 'block';
                }
            });
        });
    }

    // Save button toggle
    const saveBtn = document.getElementById('ldSaveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveBtn.classList.toggle('saved');
        });
    }

    // Share button
    const shareBtn = document.getElementById('ldShareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const url = window.location.href;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url);
            }
            // Show toast
            const toast = document.createElement('div');
            toast.textContent = 'Link copied to clipboard!';
            toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--c-primary);color:white;padding:10px 20px;border-radius:8px;font-size:14px;z-index:9999;';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        });
    }

    // CTA buttons — toast messages
    ['ldOfferBtn', 'ldInfoBtn', 'ldTourBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                const msgs = {
                    ldOfferBtn: 'Redirecting to offer form...',
                    ldInfoBtn: 'Request sent! The agent will contact you shortly.',
                    ldTourBtn: 'Tour request sent! You will receive a confirmation.'
                };
                const toast = document.createElement('div');
                toast.textContent = msgs[id];
                toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--c-primary);color:white;padding:10px 20px;border-radius:8px;font-size:14px;z-index:9999;';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2500);
            });
        }
    });

    // Similar property card clicks
    container.querySelectorAll('.ld-prop-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            if (id) window.location.hash = '/listing/' + id;
        });
    });

    // Location tab clicks
    container.querySelectorAll('.ld-location-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.ld-location-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Commute mode clicks
    container.querySelectorAll('.ld-commute-mode').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.ld-commute-mode').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Sidebar Artur Chat (uses same design as dashboard chat)
    const ldChatInput = container.querySelector('#ldChatInput');
    const ldChatSend = container.querySelector('#ldChatSendBtn');
    const ldChatMessages = container.querySelector('#ldChatMessages');

    function ldAddChatMsg(text, isUser) {
        if (!ldChatMessages) return;
        const div = document.createElement('div');
        div.className = 'chat-message ' + (isUser ? 'user' : 'bot');
        div.innerHTML = '<div><div class="message-bubble">' + text + '</div></div>';
        ldChatMessages.appendChild(div);
        ldChatMessages.scrollTop = ldChatMessages.scrollHeight;
    }

    // Initial greeting
    const ldPropData = getPropertyData(propertyId);
    const ldAddr = ldPropData ? ldPropData.address : 'this property';
    setTimeout(() => {
        ldAddChatMsg('👋 Hi! I\'m <strong>Artur</strong>, your personal real estate assistant. Ask me anything about this property at <strong>' + ldAddr + '</strong>.<br><br>I can help you with:<br>• Scheduling a visit<br>• Understanding the price & neighborhood<br>• Making an offer');
    }, 800);

    function ldSendChat() {
        if (!ldChatInput) return;
        const msg = ldChatInput.value.trim();
        if (!msg) return;
        ldAddChatMsg(msg, true);
        ldChatInput.value = '';

        const responses = [
            "Great question! Let me check that for you. A member of our team will follow up shortly with the details.",
            "Thanks for your interest! I'd recommend scheduling a visit to see the property in person. Want me to set that up?",
            "I can help with that! Based on the listing details, here's what I know — feel free to ask more specific questions.",
            "That's a common question! The seller is open to discussing terms. Would you like to make an offer through beycome?",
            "Good to know you're interested! I'll pass this along to the listing agent. In the meantime, is there anything else I can help with?"
        ];
        setTimeout(() => {
            ldAddChatMsg(responses[Math.floor(Math.random() * responses.length)], false);
        }, 800 + Math.random() * 600);
    }

    if (ldChatSend) ldChatSend.addEventListener('click', ldSendChat);
    if (ldChatInput) ldChatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') ldSendChat(); });
}

export function cleanup() {
    _observers.forEach(o => o.disconnect());
    _observers = [];
}
