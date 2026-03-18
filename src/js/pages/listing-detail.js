import store from '../store.js';
import { renderSiteFooter } from '../components/footer.js';
import { getListingUrl } from '../utils.js';

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

function getSpecialTags(d) {
    const tags = [];
    const sqft = parseFloat((d.livingArea || '0').replace(/,/g, '')) || 0;
    const beds = parseInt(d.beds) || 0;
    const price = parseFloat((d.price || '0').replace(/,/g, '')) || 0;

    if (sqft >= 3000) tags.push('Spacious living');
    if (beds >= 5) tags.push('5+ bedrooms');
    if (d.pool && d.pool.toLowerCase() !== 'no' && d.pool.toLowerCase() !== 'none') tags.push('Private pool');
    if (d.parking && d.parking.toLowerCase().includes('garage')) tags.push('Garage parking');
    if (d.cooling && d.cooling.toLowerCase().includes('central')) tags.push('Central A/C');
    if (d.flooring) tags.push('Updated flooring');
    if (d.yearBuilt && parseInt(d.yearBuilt) >= 2015) tags.push('Recently built');
    if (d.lotFormatted && parseFloat(d.lotSize?.replace(/,/g, '')) >= 8000) tags.push('Large lot');
    tags.push('Modern kitchen');
    tags.push('Natural light');
    if (price >= 1000000) tags.push('Luxury home');
    if (d.stories && parseInt(d.stories) >= 2) tags.push('Multi-story');

    return tags.slice(0, 7);
}

function renderSimilarCards(currentId) {
    const properties = store.get('properties') || [];
    const others = properties.filter(p => p.id !== currentId).slice(0, 8);
    if (others.length === 0) return '';

    const cards = others.map(p => {
        const price = parseFloat((p.price || '0').replace(/,/g, '')) || 0;
        const sqft = parseFloat((p.livingArea || '0').replace(/,/g, ''));
        return `
        <div class="ld-prop-card" data-id="${p.id}" data-listing-url="${getListingUrl(p)}">
            <div class="ld-prop-img">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <button class="ld-prop-heart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
            </div>
            <div class="ld-prop-info">
                <span class="ld-prop-price">$${price.toLocaleString('en-US')}</span>
                <div class="ld-prop-stats">
                    <span>${p.beds || '--'} bd</span>
                    <span class="ld-prop-stats-sep">|</span>
                    <span>${p.baths || '--'} ba</span>
                    <span class="ld-prop-stats-sep">|</span>
                    <span>${sqft ? sqft.toLocaleString() : '--'} sqft</span>
                </div>
                <div class="ld-prop-address">${p.address ? (p.address + ', ' + (p.city || '') + ',&hellip;') : ''}</div>
            </div>
            <div class="ld-prop-mls">MLS ID #${p.mlsId || 'N/A'}, beycome, MIAMI</div>
        </div>`;
    }).join('');

    return `
    <div class="ld-similar">
        <div class="ld-similar-header">
            <h2>Nearby homes</h2>
            <div class="ld-similar-nav">
                <button class="ld-similar-arrow" id="ldNearbyPrev" disabled>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button class="ld-similar-arrow" id="ldNearbyNext">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>
        </div>
        <div class="ld-similar-track-wrap">
            <div class="ld-similar-track">${cards}</div>
        </div>
    </div>`;
}

export function render(propertyId) {
    const d = getPropertyData(propertyId);
    if (!d) {
        return `<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:16px;">
            <p style="font-size:16px;color:var(--c-error);font-weight:600;">Property not found</p>
            <a href="/Dashboard-beycome/#/your-listing" style="color:var(--c-accent);font-size:14px;">Back to listings</a>
        </div>`;
    }

    const price = parseFloat(d.price.replace(/,/g, '')) || 0;
    const downPct = 20;
    const downPayment = Math.round(price * downPct / 100);
    const loanAmount = price - downPayment;
    const monthlyMortgage = Math.round((loanAmount * 0.065 / 12) / (1 - Math.pow(1 + 0.065 / 12, -360)));
    const monthlyTax = Math.round(d.taxAmount / 12);
    const monthlyInsurance = Math.round(price * 0.004 / 12);
    const monthlyTotal = monthlyMortgage + monthlyTax + d.hoa + monthlyInsurance;
    const closingCosts = Math.round(price * 0.015);
    const dueAtClose = downPayment + closingCosts;

    return `
    <!-- Public Header -->
    <header style="padding:0 24px;height:56px;display:flex;align-items:center;justify-content:flex-end;position:sticky;top:0;z-index:100;background:var(--c-bg);">
        <a href="/Dashboard-beycome/#/your-listing" id="ldBackBtn" style="color:var(--c-primary);text-decoration:none;font-size:14px;font-weight:500;display:flex;align-items:center;gap:6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L18 6M6 6l12 12"/></svg>
            Close
        </a>
    </header>

    <!-- Photo Gallery -->
    <div style="max-width:1180px;margin:12px auto 0;padding:0 20px;">
        <div class="ld-gallery">
            <div class="ld-gallery-main">
                <svg class="ld-gallery-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <div class="ld-gallery-type"><span class="ld-gallery-type-dot"></span>${d.propertyType || 'Home'} for ${d.listingType === 'For Rent' ? 'rent' : 'sale'}</div>
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
                <div class="ld-gallery-actions">
                    <button class="ld-gallery-action-btn" id="ldGallerySave" title="Save">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    <button class="ld-gallery-action-btn" id="ldGalleryShare" title="Share">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    </button>
                    <button class="ld-gallery-action-btn" id="ldGalleryHide" title="Hide listing">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                    </button>
                </div>
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
    <div style="max-width:1180px;margin:0 auto;padding:0 20px;">
        <div class="ld-summary-bar">
            <div class="ld-summary-row">
                <div class="ld-summary-left">
                    <div class="ld-summary-address">${d.address}</div>
                    <div class="ld-summary-city">${d.city}, ${d.state} ${d.zipcode}</div>
                </div>
                <div class="ld-summary-stats">
                    ${d.beds ? `<div class="ld-summary-stat"><span class="ld-summary-stat-value">${d.beds}</span><span class="ld-summary-stat-label">beds</span></div>` : ''}
                    ${d.baths ? `<div class="ld-summary-stat"><span class="ld-summary-stat-value">${d.baths}</span><span class="ld-summary-stat-label">baths</span></div>` : ''}
                    ${d.sqftFormatted ? `<div class="ld-summary-stat"><span class="ld-summary-stat-value">${d.sqftFormatted}</span><span class="ld-summary-stat-label">sqft</span></div>` : ''}
                    ${d.lotFormatted ? `<div class="ld-summary-stat"><span class="ld-summary-stat-value">${d.lotFormatted}</span><span class="ld-summary-stat-label">lot sqft</span></div>` : ''}
                </div>
            </div>
        </div>
    </div>

    <!-- Tabs -->
    <div class="ld-tabs" id="ldTabs">
        <div class="ld-tabs-inner">
            <button class="ld-tab active" data-target="ldOverview">Overview</button>
            <button class="ld-tab" data-target="ldNeighborhood">Neighborhood</button>
            <button class="ld-tab" data-target="ldHistory">History</button>
            <button class="ld-tab" data-target="ldAffordability">Payment calculator</button>
        </div>
    </div>

    <!-- Two-column layout -->
    <div style="max-width:1180px;margin:0 auto;padding:0 20px;">
        <div class="ld-content">
            <!-- Main content -->
            <div class="ld-main">

                <!-- Overview -->
                <div id="ldOverview">
                    <div class="ld-section">
                        <h2 class="ld-section-title">What's special</h2>
                        <div class="ld-special-tags">
                            ${getSpecialTags(d).map(t => `<span class="ld-special-tag">${t}</span>`).join('')}
                        </div>
                        <p class="ld-description">${d.description}</p>
                    </div>

                    <div class="ld-section">
                        <h2 class="ld-section-title">Facts and features:</h2>
                        <div class="ld-facts-list">
                            <div class="ld-fact-item"><span class="ld-fact-label">Appliances:</span> <strong>Dryer, Range, Refrigerator, Washer</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Furnished:</span> <strong>Unfurnished</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Laundry:</span> <strong>Inside</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Lot Size:</span> <strong>${d.lotFormatted || 'N/A'} sqft</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Parking:</span> <strong>${d.parking}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Pool:</span> <strong>${d.pool}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Stories:</span> <strong>${d.stories}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Exterior:</span> <strong>Fenced</strong></div>
                        </div>

                        <h3 class="ld-section-subtitle">Structure:</h3>
                        <div class="ld-facts-list">
                            <div class="ld-fact-item"><span class="ld-fact-label">Year Built:</span> <strong>${d.yearBuilt}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Construction:</span> <strong>${d.construction}</strong></div>
                            <div class="ld-fact-item"><span class="ld-fact-label">Cooling:</span> <strong>${d.cooling}</strong></div>
                        </div>

                        <div id="ldFactsMore" style="display:none;">
                            <div class="ld-facts-list">
                                <div class="ld-fact-item"><span class="ld-fact-label">Flooring:</span> <strong>${d.flooring}</strong></div>
                                <div class="ld-fact-item"><span class="ld-fact-label">Roof:</span> <strong>${d.roof}</strong></div>
                                <div class="ld-fact-item"><span class="ld-fact-label">Heating:</span> <strong>${d.heating}</strong></div>
                                <div class="ld-fact-item"><span class="ld-fact-label">Window Features:</span> <strong>Impact Glass</strong></div>
                                <div class="ld-fact-item"><span class="ld-fact-label">Foundation:</span> <strong>Slab</strong></div>
                                <div class="ld-fact-item"><span class="ld-fact-label">Exterior:</span> <strong>Fenced</strong></div>
                            </div>

                            <h3 class="ld-section-subtitle">Utilities:</h3>
                            <div class="ld-facts-list">
                                <div class="ld-fact-item"><span class="ld-fact-label">Electric:</span> <strong>${d.electric}</strong></div>
                                <div class="ld-fact-item"><span class="ld-fact-label">Sewer:</span> <strong>${d.sewer}</strong></div>
                                <div class="ld-fact-item"><span class="ld-fact-label">Utilities:</span> <strong>Cable Available</strong></div>
                                <div class="ld-fact-item"><span class="ld-fact-label">Water Source:</span> <strong>${d.waterSource}</strong></div>
                            </div>

                            <h3 class="ld-section-subtitle">Tax:</h3>
                            <div class="ld-facts-list">
                                <div class="ld-fact-item"><span class="ld-fact-label">Parcel Number:</span> <strong>${d.parcel}</strong></div>
                                <div class="ld-fact-item"><span class="ld-fact-label">Zoning:</span> <strong>${d.zoning}</strong></div>
                            </div>

                            <h3 class="ld-section-subtitle">Location:</h3>
                            <div class="ld-facts-list">
                                <div class="ld-fact-item"><span class="ld-fact-label">Subdivision:</span> <strong>${d.subdivision}</strong></div>
                                <div class="ld-fact-item"><span class="ld-fact-label">MLS Area:</span> <strong>${d.mlsArea}</strong></div>
                            </div>
                        </div>
                        <button class="ld-see-more" data-toggle="ldFactsMore">See more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                    </div>

                </div>

                <!-- Neighborhood -->
                <div id="ldNeighborhood">
                    <div class="ld-section" style="border-bottom:none;padding-bottom:0;">
                        <h2 class="ld-section-title">Location</h2>
                        <div class="ld-location-tabs">
                            <button class="ld-location-tab active" data-loc="map">School</button>
                            <button class="ld-location-tab" data-loc="map">Religions</button>
                            <button class="ld-location-tab" data-loc="map">Other Places</button>
                            <button class="ld-location-tab" data-loc="commute">Commute</button>
                        </div>
                        <div class="ld-map-placeholder" id="ldLocMap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                        <p class="ld-school-disclaimer" id="ldSchoolDisclaimer">School data is provided by the National Center for Education Statistics and GreatSchools for reference purposes only; GreatSchools Ratings are based on various school quality indicators, including test scores, college readiness, and equity data, and enrollment eligibility should be verified directly with the applicable school or district.</p>
                        <div class="ld-commute-panel" id="ldLocCommute" style="display:none;">
                            <div class="ld-map-placeholder">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <div class="ld-travel-header">
                                <span class="ld-travel-title">Travel times</span>
                            </div>
                            <div class="ld-travel-destinations" id="ldTravelDests">
                                <div class="ld-travel-card" data-idx="0">
                                    <div class="ld-travel-card-marker">A</div>
                                    <div class="ld-travel-card-info">
                                        <input type="text" class="ld-travel-card-input" placeholder="Enter a destination" data-idx="0">
                                        <div class="ld-travel-card-mode">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                                            <span>By car <strong>-- mins</strong></span>
                                        </div>
                                    </div>
                                    <div class="ld-travel-card-edit">
                                        <button class="ld-travel-edit-btn" data-idx="0">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                            Edit
                                        </button>
                                        <div class="ld-travel-edit-menu" style="display:none;">
                                            <button data-action="car"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg> By car</button>
                                            <button data-action="transit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 17v-4h4v4"/><path d="M13 17V7h4v10"/></svg> By transit</button>
                                            <button data-action="walk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6m0 0 1.5-3.4a1 1 0 0 1 .9-.6h0a1 1 0 0 1 .9.6L17 14"/><path d="m6 8 3 1 2.5 5"/></svg> Walking</button>
                                            <button data-action="bike"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><circle cx="18.5" cy="18.5" r="3.5"/><circle cx="5.5" cy="18.5" r="3.5"/><path d="M15 18.5h-1a2 2 0 0 1-2-2V9.17a2 2 0 0 1 .59-1.42l3.82-3.82a.5.5 0 0 1 .82.24L18.18 8H15"/></svg> By bicycle</button>
                                            <button data-action="remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg> Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="ld-travel-add" id="ldTravelAdd">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                                Add another destination
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Score -->
                <div class="ld-section" style="border-bottom:none;">
                    <!-- Score title removed -->
                    <div class="ld-scores">
                        <!-- Walk Score -->
                        <div class="ld-score-card">
                            <div class="ld-score-gauge">
                                <svg viewBox="0 0 80 80" class="ld-score-ring">
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-border)" stroke-width="6"/>
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-success)" stroke-width="6" stroke-dasharray="${Math.round(213.6 * 0.53)} 213.6" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 40 40)"/>
                                </svg>
                                <div class="ld-score-gauge-inner">
                                    <span class="ld-score-gauge-number">53</span>
                                    <span class="ld-score-gauge-unit">/100</span>
                                </div>
                            </div>
                            <div class="ld-score-info">
                                <h4>Walk Score&reg;</h4>
                                <span class="ld-score-badge" style="background:hsla(137,28%,49%,0.12);color:var(--c-success);">Somewhat Walkable</span>
                                <p>Some errands can be accomplished on foot.</p>
                            </div>
                        </div>
                        <!-- Soundscore -->
                        <div class="ld-score-card">
                            <div class="ld-score-gauge">
                                <svg viewBox="0 0 80 80" class="ld-score-ring">
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-border)" stroke-width="6"/>
                                </svg>
                                <div class="ld-score-gauge-inner">
                                    <span class="ld-score-gauge-number">N/A</span>
                                </div>
                            </div>
                            <div class="ld-score-info">
                                <h4>Soundscore&trade;</h4>
                                <span class="ld-score-badge" style="background:hsla(0,0%,50%,0.1);color:var(--c-text-secondary);">No Data</span>
                                <p>Not enough data to provide a Soundscore.</p>
                            </div>
                        </div>
                        <!-- Transit Score -->
                        <div class="ld-score-card">
                            <div class="ld-score-gauge">
                                <svg viewBox="0 0 80 80" class="ld-score-ring">
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-border)" stroke-width="6"/>
                                </svg>
                                <div class="ld-score-gauge-inner">
                                    <span class="ld-score-gauge-number" style="opacity:0.3;">--</span>
                                </div>
                            </div>
                            <div class="ld-score-info">
                                <h4>Transit Score</h4>
                                <span class="ld-score-badge" style="background:hsla(0,0%,50%,0.1);color:var(--c-text-secondary);">No Data</span>
                                <p>Transit score data is not yet available.</p>
                            </div>
                        </div>
                        <!-- Air Quality -->
                        <div class="ld-score-card">
                            <div class="ld-score-gauge">
                                <svg viewBox="0 0 80 80" class="ld-score-ring">
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-border)" stroke-width="6"/>
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-success)" stroke-width="6" stroke-dasharray="${Math.round(213.6 * 0.72)} 213.6" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 40 40)"/>
                                </svg>
                                <div class="ld-score-gauge-inner">
                                    <span class="ld-score-gauge-number">38</span>
                                    <span class="ld-score-gauge-unit">AQI</span>
                                </div>
                            </div>
                            <div class="ld-score-info">
                                <h4>Air Quality</h4>
                                <span class="ld-score-badge" style="background:hsla(137,28%,49%,0.12);color:var(--c-success);">Good</span>
                                <p>Satisfactory with little to no health risk.</p>
                            </div>
                        </div>
                        <!-- Pollen -->
                        <div class="ld-score-card">
                            <div class="ld-score-gauge">
                                <svg viewBox="0 0 80 80" class="ld-score-ring">
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-border)" stroke-width="6"/>
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-warning)" stroke-width="6" stroke-dasharray="${Math.round(213.6 * 0.45)} 213.6" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 40 40)"/>
                                </svg>
                                <div class="ld-score-gauge-inner">
                                    <span class="ld-score-gauge-number">Med</span>
                                    <span class="ld-score-gauge-unit">Level</span>
                                </div>
                            </div>
                            <div class="ld-score-info">
                                <h4>Pollen</h4>
                                <span class="ld-score-badge" style="background:hsla(32,94%,44%,0.12);color:var(--c-warning);">Moderate</span>
                                <p>Tree: Low &bull; Grass: Moderate &bull; Weed: Low</p>
                            </div>
                        </div>
                        <!-- UV Index -->
                        <div class="ld-score-card">
                            <div class="ld-score-gauge">
                                <svg viewBox="0 0 80 80" class="ld-score-ring">
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-border)" stroke-width="6"/>
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-accent-orange)" stroke-width="6" stroke-dasharray="${Math.round(213.6 * 0.55)} 213.6" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 40 40)"/>
                                </svg>
                                <div class="ld-score-gauge-inner">
                                    <span class="ld-score-gauge-number">6</span>
                                    <span class="ld-score-gauge-unit">UV</span>
                                </div>
                            </div>
                            <div class="ld-score-info">
                                <h4>UV Index</h4>
                                <span class="ld-score-badge" style="background:hsla(16,100%,73%,0.12);color:var(--c-accent-orange);">High</span>
                                <p>Sunrise 6:42 AM &bull; Sunset 7:28 PM</p>
                            </div>
                        </div>
                    </div>
                    <p style="font-size:11px;color:var(--c-text-secondary);line-height:1.6;margin:12px 0 0;">Soundscore&trade; data provided by HowLoud. Walk Score&reg; and Transit Score&reg; powered by Walk Score&reg;. Environmental data powered by Google Maps APIs &bull; Updated daily</p>
                </div>

                <!-- Credit Back Promo -->
                <div class="ld-section" style="border-bottom:none;">
                    <div class="ld-promo">
                        <div class="ld-promo-circle"><span>Save</span><span>Credit Back</span></div>
                        <div class="ld-promo-text">
                            <h3>Buy with beycome and get up to $${d.creditBack} Credit Back*</h3>
                            <p>*Estimated beycome credit amount varies by closing price, commission offered and is not available in certain areas or where prohibited by law.</p>
                            <button class="ld-promo-btn">Start an Offer</button>
                        </div>
                    </div>
                </div>

                <!-- Listing Information -->
                <div class="ld-section">
                    <h2 class="ld-section-title">Listing information:</h2>
                    <div class="ld-agent-details">
                        <div>- Days on market: <strong>${d.daysOnMarket}</strong></div>
                        <div>- Listing provided by:</div>
                        <div>&nbsp;&nbsp;<strong>${d.agentName}</strong> &bull; ${d.brokerage} &bull; ${d.brokeragePhone}</div>
                        <div>- MLS Number: <strong>${d.mlsNumber}</strong></div>
                    </div>
                </div>

                <!-- Price History -->
                <div class="ld-section" id="ldHistory">
                    <h2 class="ld-section-title">Price history</h2>
                    <div class="ld-history-table-wrap">
                        <table class="ld-history-table">
                            <colgroup><col><col><col></colgroup>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Event</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>01/15/2025</td>
                                    <td>Listed for sale</td>
                                    <td>
                                        <span class="ld-history-price">$${d.priceFormatted}</span>
                                        <span class="ld-history-sqft">$${d.pricePerSqft}/sqft</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>08/22/2022</td>
                                    <td>Sold</td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(price * 0.85).toLocaleString()}</span>
                                        <span class="ld-history-sqft">$${(price * 0.85 / (parseFloat(d.sqftFormatted.replace(/,/g, '')) || 1)).toFixed(0)}/sqft</span>
                                        <span class="ld-history-change ld-history-change--down">-12.5%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>05/10/2022</td>
                                    <td>Listed for sale</td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(price * 0.92).toLocaleString()}</span>
                                        <span class="ld-history-sqft">$${(price * 0.92 / (parseFloat(d.sqftFormatted.replace(/,/g, '')) || 1)).toFixed(0)}/sqft</span>
                                        <span class="ld-history-change ld-history-change--up">+8.2%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>03/15/2019</td>
                                    <td>Sold</td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(price * 0.72).toLocaleString()}</span>
                                        <span class="ld-history-sqft">$${(price * 0.72 / (parseFloat(d.sqftFormatted.replace(/,/g, '')) || 1)).toFixed(0)}/sqft</span>
                                        <span class="ld-history-change ld-history-change--up">+15.4%</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody id="ldPriceHistMore" style="display:none;">
                                <tr>
                                    <td>11/02/2018</td>
                                    <td>Listed for sale</td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(price * 0.68).toLocaleString()}</span>
                                        <span class="ld-history-sqft">$${(price * 0.68 / (parseFloat(d.sqftFormatted.replace(/,/g, '')) || 1)).toFixed(0)}/sqft</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>06/20/2015</td>
                                    <td>Sold</td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(price * 0.55).toLocaleString()}</span>
                                        <span class="ld-history-sqft">$${(price * 0.55 / (parseFloat(d.sqftFormatted.replace(/,/g, '')) || 1)).toFixed(0)}/sqft</span>
                                        <span class="ld-history-change ld-history-change--up">+22.1%</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="ld-see-more" data-toggle="ldPriceHistMore">Show more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                    <p style="font-size:11px;color:var(--c-text-secondary);line-height:1.6;margin:12px 0 0;">Price history source: Public Record, beycome data, third-party providers and MLS.</p>
                </div>

                <!-- Public Tax History -->
                <div class="ld-section">
                    <h2 class="ld-section-title">Public tax history</h2>
                    <div class="ld-history-table-wrap">
                        <table class="ld-history-table">
                            <colgroup><col><col><col></colgroup>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Property taxes</th>
                                    <th>Tax assessment</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2024</td>
                                    <td>
                                        <span class="ld-history-price">$${d.taxAmount.toLocaleString()}</span>
                                        <span class="ld-history-change ld-history-change--up">+8.2%</span>
                                    </td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(price * 0.88).toLocaleString()}</span>
                                        <span class="ld-history-change ld-history-change--up">+10%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2023</td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(d.taxAmount * 0.92).toLocaleString()}</span>
                                        <span class="ld-history-change ld-history-change--up">+6.5%</span>
                                    </td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(price * 0.80).toLocaleString()}</span>
                                        <span class="ld-history-change ld-history-change--up">+10%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2022</td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(d.taxAmount * 0.86).toLocaleString()}</span>
                                        <span class="ld-history-change ld-history-change--up">+11.4%</span>
                                    </td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(price * 0.73).toLocaleString()}</span>
                                        <span class="ld-history-change ld-history-change--up">+10%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2021</td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(d.taxAmount * 0.78).toLocaleString()}</span>
                                        <span class="ld-history-change ld-history-change--up">+5.7%</span>
                                    </td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(price * 0.66).toLocaleString()}</span>
                                        <span class="ld-history-change ld-history-change--up">+6%</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody id="ldTaxHistMore" style="display:none;">
                                <tr>
                                    <td>2020</td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(d.taxAmount * 0.74).toLocaleString()}</span>
                                        <span class="ld-history-change ld-history-change--down">-0.2%</span>
                                    </td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(price * 0.62).toLocaleString()}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2019</td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(d.taxAmount * 0.74).toLocaleString()}</span>
                                        <span class="ld-history-change ld-history-change--up">+11.7%</span>
                                    </td>
                                    <td>
                                        <span class="ld-history-price">$${Math.round(price * 0.62).toLocaleString()}</span>
                                        <span class="ld-history-change ld-history-change--down">-15%</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="ld-see-more" data-toggle="ldTaxHistMore">Show more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                    <p style="font-size:11px;color:var(--c-text-secondary);line-height:1.6;margin:12px 0 0;">Tax history source: Public Record, beycome data, third-party providers and MLS.</p>
                </div>

                <!-- Affordability -->
                <div id="ldAffordability">
                    <div class="ld-section" style="border-bottom:none;">
                        <h2 class="ld-section-title">Affordability:</h2>
                        <div class="ld-afford-header">
                            <div class="ld-afford-inputs">
                                <div class="ld-afford-input-group">
                                    <label for="ldAffordPrice">Purchase price <span class="ld-afford-tip" data-tip="The total price you would pay for this property. Adjust to see how a different offer amount affects your costs.">&#9432;</span></label>
                                    <div class="ld-afford-input-wrap">
                                        <span class="ld-afford-input-prefix">$</span>
                                        <input type="text" id="ldAffordPrice" class="ld-afford-input" value="${d.priceFormatted}">
                                    </div>
                                </div>
                                <div class="ld-afford-input-group">
                                    <label for="ldAffordRate">Interest rate <span class="ld-afford-tip" data-tip="The annual mortgage interest rate from your lender. This affects your monthly payment. Rates vary based on credit score and loan type.">&#9432;</span></label>
                                    <div class="ld-afford-input-wrap ld-afford-input-wrap--sm">
                                        <input type="text" id="ldAffordRate" class="ld-afford-input" value="6.5" maxlength="5" style="width:48px;text-align:right;">
                                        <span class="ld-afford-input-suffix">%</span>
                                    </div>
                                </div>
                                <div class="ld-afford-input-group" id="ldDownGroup">
                                    <label for="ldAffordDownPct">Down payment <span class="ld-afford-tip" data-tip="The upfront cash you pay at closing. A higher down payment lowers your monthly mortgage and may help you avoid PMI (typically required below 20%).">&#9432;</span></label>
                                    <div class="ld-afford-down-split">
                                        <div class="ld-afford-down-half">
                                            <span class="ld-afford-input-prefix">$</span>
                                            <input type="text" id="ldAffordDownAmt" class="ld-afford-input" maxlength="11" value="${downPayment.toLocaleString('en-US')}">
                                        </div>
                                        <div class="ld-afford-down-divider"></div>
                                        <div class="ld-afford-down-half ld-afford-down-half--pct">
                                            <input type="text" id="ldAffordDownPct" class="ld-afford-input" value="${downPct}" maxlength="5" style="width:48px;text-align:right;">
                                            <span class="ld-afford-input-suffix">%</span>
                                        </div>
                                    </div>
                                </div>
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
                                    <div class="ld-afford-total"><span>Total</span><span id="ldAffordMonthlyTotal">$${monthlyTotal.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label" id="ldAffordMortgageLabel">Mortgage 6.5%</span><span class="ld-afford-value" id="ldAffordMortgageVal">$${monthlyMortgage.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Property Tax</span><span class="ld-afford-value" id="ldAffordTaxVal">$${monthlyTax.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">HOA Fee</span><span class="ld-afford-value">$${d.hoa.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Homeowners Insurance</span><span class="ld-afford-value" id="ldAffordInsVal">$${monthlyInsurance.toLocaleString()}</span></div>
                                </div>
                                <div class="ld-afford-col">
                                    <h4>Due at Close</h4>
                                    <div class="ld-afford-total"><span>Total</span><span id="ldAffordCloseTotal">$${dueAtClose.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label" id="ldAffordDownLabel">Down payment ${downPct}%</span><span class="ld-afford-value" id="ldAffordDownVal">$${downPayment.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Closing costs</span><span class="ld-afford-value" id="ldAffordClosingVal">$${closingCosts.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">beycome Pre-paid title: $99</span><span class="ld-afford-value" style="color:var(--c-accent);">Discover Title Services</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">beycome Credit Est.</span><span class="ld-afford-value" id="ldAffordCreditVal" style="color:var(--c-success);">$${d.creditBack}</span></div>
                                </div>
                            </div>
                        </div>
                        <div id="ldAffordCash" style="display:none;">
                            <div class="ld-afford-grid">
                                <div class="ld-afford-col">
                                    <h4>Monthly expenses</h4>
                                    <div class="ld-afford-total"><span>Total</span><span id="ldCashMonthlyTotal">$${(monthlyTax + d.hoa + monthlyInsurance).toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Property Tax</span><span class="ld-afford-value" id="ldCashTaxVal">$${monthlyTax.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">HOA Fee</span><span class="ld-afford-value">$${d.hoa.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Homeowners Insurance</span><span class="ld-afford-value" id="ldCashInsVal">$${monthlyInsurance.toLocaleString()}</span></div>
                                </div>
                                <div class="ld-afford-col">
                                    <h4>Due at Close</h4>
                                    <div class="ld-afford-total"><span>Total</span><span id="ldCashCloseTotal">$${(parseFloat(d.price.replace(/,/g, '')) + closingCosts).toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Purchase price</span><span class="ld-afford-value" id="ldCashPriceVal">$${d.priceFormatted}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">Closing costs</span><span class="ld-afford-value" id="ldCashClosingVal">$${closingCosts.toLocaleString()}</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">beycome Pre-paid title: $99</span><span class="ld-afford-value" style="color:var(--c-accent);">Discover Title Services</span></div>
                                    <div class="ld-afford-row"><span class="ld-afford-label">beycome Credit Est.</span><span class="ld-afford-value" id="ldCashCreditVal" style="color:var(--c-success);">$${d.creditBack}</span></div>
                                </div>
                            </div>
                            <p style="font-size:12px;color:var(--c-text-secondary);margin-top:12px;">No mortgage or down payment required for all-cash purchases.</p>
                        </div>
                        <p class="ld-afford-disclaimer">Estimated monthly costs and affordability data are provided as is by Beycome and third-party sources for informational purposes only, without any warranty or guarantee of accuracy, and should be independently verified before making any financial or real estate decisions.</p>
                    </div>
                </div>

                <!-- Sell promo -->
                <div class="ld-section" style="border-bottom:none;">
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

                <!-- Nearby Homes -->
                <div class="ld-section" style="border-bottom:none;">
                    ${renderSimilarCards(propertyId)}
                </div>

                <!-- Customer Reviews -->
                <div class="ld-section" style="border-bottom:none;">
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

                <!-- Disclaimer -->
                <div class="ld-section" style="border-bottom:none;">
                    <div class="ld-disclaimer">
                        <strong>Disclaimer:</strong> Information displayed on Beycome is provided &ldquo;as is&rdquo; and is deemed reliable but not guaranteed. All data, including property details, measurements, and calculations of area, may be obtained from various public and third-party sources and has not been verified by Beycome, any listing broker, or the MLS. The information is provided solely for consumers&rsquo; personal, non-commercial use and may not be used for any purpose other than identifying potential properties for purchase.<br><br>
                        <strong>Broker Reciprocity / IDX Disclosure:</strong> Certain listing information is provided by brokers participating in IDX (Internet Data Exchange) and may be based on information submitted by the MLS or other multiple listing services. All data is obtained from various sources and may not have been verified by the broker or the MLS. Open house information is subject to change without notice. Users should independently review and verify all information for accuracy. Properties displayed may or may not be listed by the office or agent presenting the information.
                    </div>
                </div>

            </div><!-- /.ld-main -->

            <!-- Sidebar -->
            <div class="ld-sidebar">
                <div class="ld-price-card">
                    <div class="ld-sidebar-price">$${d.priceFormatted} <span class="ld-sidebar-ppsf">$${d.pricePerSqft}/sqft</span></div>
                    <a href="javascript:void(0)" class="ld-credit-back">Credit Back up to $${d.creditBack}*</a>
                    <button class="ld-cta-primary" id="ldOfferBtn">Make an Offer</button>
                    <div class="ld-cta-row">
                        <button class="ld-cta-secondary" id="ldInfoBtn">Request Info</button>
                        <button class="ld-cta-secondary" id="ldTourBtn">Schedule tour</button>
                    </div>

                    <!-- Artur Chat -->
                    <div class="ld-chat-inline">
                        <div class="ld-chat-inline-messages" id="ldChatMessages"></div>
                        <div class="ld-chat-inline-input">
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
            </div><!-- /.ld-sidebar -->

        </div><!-- /.ld-content -->
    </div><!-- /max-width wrapper -->

    <!-- Footer -->
    ${renderSiteFooter()}

    `;
}

export function init(propertyId) {
    const container = document.getElementById('listing-detail-container') || document.getElementById('listing-detail-root');
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
    const sections = ['ldOverview', 'ldNeighborhood', 'ldHistory', 'ldAffordability'];
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
                const showDisplay = target.tagName === 'TBODY' ? 'table-row-group' : 'block';
                target.style.display = isVisible ? 'none' : showDisplay;
                btn.classList.toggle('expanded', !isVisible);
                const svgIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>';
                const label = btn.dataset.toggle.includes('Hist') ? 'Show more' : 'See more';
                btn.innerHTML = isVisible
                    ? `${label} ${svgIcon}`
                    : `Hide ${svgIcon}`;
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
                const rateGroup = document.getElementById('ldAffordRate')?.closest('.ld-afford-input-group');
                const downGroup = document.getElementById('ldDownGroup');
                if (btn.dataset.mode === 'mortgage') {
                    if (mortgageEl) mortgageEl.style.display = 'block';
                    if (cashEl) cashEl.style.display = 'none';
                    if (rateGroup) rateGroup.style.display = '';
                    if (downGroup) downGroup.style.display = '';
                } else {
                    if (mortgageEl) mortgageEl.style.display = 'none';
                    if (cashEl) cashEl.style.display = 'block';
                    if (rateGroup) rateGroup.style.display = 'none';
                    if (downGroup) downGroup.style.display = 'none';
                }
            });
        });
    }

    // Affordability recalculation on input change
    const affordPriceInput = document.getElementById('ldAffordPrice');
    const affordRateInput = document.getElementById('ldAffordRate');
    const affordDownPctInput = document.getElementById('ldAffordDownPct');
    const affordDownAmtInput = document.getElementById('ldAffordDownAmt');
    let _downSource = 'pct'; // track which down payment field the user last edited

    function recalcAffordability(source) {
        const rawPrice = (affordPriceInput ? affordPriceInput.value : '0').replace(/[^0-9.]/g, '');
        const rawRate = (affordRateInput ? affordRateInput.value : '6.5').replace(/[^0-9.]/g, '');
        const curPrice = parseFloat(rawPrice) || 0;
        const ratePercent = parseFloat(rawRate) || 6.5;
        const rate = ratePercent / 100;
        const d = getPropertyData(propertyId);
        const taxAmount = d ? d.taxAmount : Math.round(curPrice * 0.012);
        const hoa = d ? d.hoa : 0;

        // Down payment — sync % ↔ $
        let downPct, downAmt;
        if (source === 'downAmt') {
            const rawAmt = (affordDownAmtInput ? affordDownAmtInput.value : '0').replace(/[^0-9.]/g, '');
            downAmt = parseFloat(rawAmt) || 0;
            downPct = curPrice > 0 ? Math.round((downAmt / curPrice) * 10000) / 100 : 0;
            if (affordDownPctInput) affordDownPctInput.value = downPct;
        } else {
            const rawPct = (affordDownPctInput ? affordDownPctInput.value : '20').replace(/[^0-9.]/g, '');
            downPct = parseFloat(rawPct) || 0;
            downPct = Math.min(downPct, 100);
            downAmt = Math.round(curPrice * downPct / 100);
            if (affordDownAmtInput) affordDownAmtInput.value = downAmt.toLocaleString('en-US');
        }

        // Mortgage calculations
        const loanAmount = curPrice - downAmt;
        const mortgage = (rate > 0 && loanAmount > 0)
            ? Math.round((loanAmount * rate / 12) / (1 - Math.pow(1 + rate / 12, -360)))
            : 0;
        const tax = Math.round(taxAmount / 12);
        const insurance = Math.round(curPrice * 0.004 / 12);
        const monthlyTotal = mortgage + tax + hoa + insurance;
        const closing = Math.round(curPrice * 0.015);
        const dueClose = downAmt + closing;
        const creditBack = Math.round(curPrice * 0.02);

        // Update Mortgage tab
        const el = (id) => document.getElementById(id);
        if (el('ldAffordMonthlyTotal')) el('ldAffordMonthlyTotal').textContent = '$' + monthlyTotal.toLocaleString();
        if (el('ldAffordMortgageVal')) el('ldAffordMortgageVal').textContent = '$' + mortgage.toLocaleString();
        if (el('ldAffordMortgageLabel')) el('ldAffordMortgageLabel').textContent = 'Mortgage ' + ratePercent + '%';
        if (el('ldAffordTaxVal')) el('ldAffordTaxVal').textContent = '$' + tax.toLocaleString();
        if (el('ldAffordInsVal')) el('ldAffordInsVal').textContent = '$' + insurance.toLocaleString();
        if (el('ldAffordCloseTotal')) el('ldAffordCloseTotal').textContent = '$' + dueClose.toLocaleString();
        if (el('ldAffordDownLabel')) el('ldAffordDownLabel').textContent = 'Down payment ' + downPct + '%';
        if (el('ldAffordDownVal')) el('ldAffordDownVal').textContent = '$' + downAmt.toLocaleString();
        if (el('ldAffordClosingVal')) el('ldAffordClosingVal').textContent = '$' + closing.toLocaleString();
        if (el('ldAffordCreditVal')) el('ldAffordCreditVal').textContent = '$' + creditBack.toLocaleString();

        // Update Cash tab
        if (el('ldCashMonthlyTotal')) el('ldCashMonthlyTotal').textContent = '$' + (tax + hoa + insurance).toLocaleString();
        if (el('ldCashTaxVal')) el('ldCashTaxVal').textContent = '$' + tax.toLocaleString();
        if (el('ldCashInsVal')) el('ldCashInsVal').textContent = '$' + insurance.toLocaleString();
        if (el('ldCashCloseTotal')) el('ldCashCloseTotal').textContent = '$' + (curPrice + closing).toLocaleString();
        if (el('ldCashPriceVal')) el('ldCashPriceVal').textContent = '$' + curPrice.toLocaleString();
        if (el('ldCashClosingVal')) el('ldCashClosingVal').textContent = '$' + closing.toLocaleString();
        if (el('ldCashCreditVal')) el('ldCashCreditVal').textContent = '$' + creditBack.toLocaleString();
    }

    // Format price input with commas on blur
    if (affordPriceInput) {
        affordPriceInput.addEventListener('input', () => recalcAffordability(_downSource));
        affordPriceInput.addEventListener('blur', () => {
            const raw = affordPriceInput.value.replace(/[^0-9.]/g, '');
            const num = parseFloat(raw) || 0;
            affordPriceInput.value = num.toLocaleString('en-US');
        });
    }
    if (affordRateInput) {
        affordRateInput.addEventListener('input', () => recalcAffordability(_downSource));
    }
    if (affordDownPctInput) {
        affordDownPctInput.addEventListener('input', () => { _downSource = 'pct'; recalcAffordability('pct'); });
    }
    if (affordDownAmtInput) {
        affordDownAmtInput.addEventListener('input', () => { _downSource = 'downAmt'; recalcAffordability('downAmt'); });
        affordDownAmtInput.addEventListener('blur', () => {
            const raw = affordDownAmtInput.value.replace(/[^0-9.]/g, '');
            const num = parseFloat(raw) || 0;
            affordDownAmtInput.value = num.toLocaleString('en-US');
        });
    }


    // Save button toggle (gallery) — persists to localStorage
    const gallerySaveBtn = document.getElementById('ldGallerySave');
    if (gallerySaveBtn) {
        const savedList = JSON.parse(localStorage.getItem('savedListings') || '[]');
        if (savedList.includes(propertyId)) {
            gallerySaveBtn.classList.add('saved');
        }

        gallerySaveBtn.addEventListener('click', () => {
            gallerySaveBtn.classList.toggle('saved');
            const current = JSON.parse(localStorage.getItem('savedListings') || '[]');
            if (gallerySaveBtn.classList.contains('saved')) {
                if (!current.includes(propertyId)) {
                    current.push(propertyId);
                    localStorage.setItem('savedListings', JSON.stringify(current));
                }
                showToast('Added to your favorites.');
            } else {
                localStorage.setItem('savedListings', JSON.stringify(current.filter(id => id !== propertyId)));
                showToast('Removed from your favorites.');
            }
        });
    }

    // Share button (sidebar + gallery)
    function showShareToast() {
        const url = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url);
        }
        const toast = document.createElement('div');
        toast.textContent = 'Link copied to clipboard!';
        toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--c-primary);color:white;padding:10px 20px;border-radius:8px;font-size:14px;z-index:9999;';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
    const shareBtn = document.getElementById('ldShareBtn');
    const galleryShareBtn = document.getElementById('ldGalleryShare');
    if (shareBtn) shareBtn.addEventListener('click', showShareToast);
    if (galleryShareBtn) galleryShareBtn.addEventListener('click', showShareToast);

    // Hide listing button (gallery eye-off)
    const hideBtn = document.getElementById('ldGalleryHide');
    if (hideBtn) {
        // Restore state from localStorage
        const hidden = JSON.parse(localStorage.getItem('hiddenListings') || '[]');
        if (hidden.includes(propertyId)) {
            hideBtn.classList.add('active');
        }

        hideBtn.addEventListener('click', () => {
            hideBtn.classList.toggle('active');
            const hiddenList = JSON.parse(localStorage.getItem('hiddenListings') || '[]');
            if (hideBtn.classList.contains('active')) {
                if (!hiddenList.includes(propertyId)) {
                    hiddenList.push(propertyId);
                    localStorage.setItem('hiddenListings', JSON.stringify(hiddenList));
                }
                showToast('Listing hidden from your search results.');
            } else {
                localStorage.setItem('hiddenListings', JSON.stringify(hiddenList.filter(id => id !== propertyId)));
                showToast('Listing restored to your search results.');
            }
        });
    }

    function showToast(msg) {
        const toast = document.createElement('div');
        toast.textContent = msg;
        toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--c-primary);color:white;padding:10px 20px;border-radius:8px;font-size:14px;z-index:9999;';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
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

    // Nearby homes — heart save to collection
    container.querySelectorAll('.ld-prop-card').forEach(card => {
        const heartBtn = card.querySelector('.ld-prop-heart');
        const cardId = card.dataset.id;
        if (heartBtn && cardId) {
            // Init saved state
            const initSaved = JSON.parse(localStorage.getItem('savedListings') || '[]');
            if (initSaved.includes(cardId)) heartBtn.classList.add('saved');

            heartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                heartBtn.classList.toggle('saved');
                const current = JSON.parse(localStorage.getItem('savedListings') || '[]');
                if (heartBtn.classList.contains('saved')) {
                    if (!current.includes(cardId)) {
                        current.push(cardId);
                        localStorage.setItem('savedListings', JSON.stringify(current));
                    }
                    showToast('Added to your favorites.');
                } else {
                    localStorage.setItem('savedListings', JSON.stringify(current.filter(id => id !== cardId)));
                    showToast('Removed from your favorites.');
                }
            });
        }

        // Card click navigates to listing
        card.addEventListener('click', () => {
            const url = card.dataset.listingUrl;
            if (url) window.location.href = url;
        });
    });

    // Nearby homes carousel (grid-based pagination)
    const nearbyTrack = container.querySelector('.ld-similar-track');
    const nearbyPrev = document.getElementById('ldNearbyPrev');
    const nearbyNext = document.getElementById('ldNearbyNext');
    if (nearbyTrack && nearbyPrev && nearbyNext) {
        let nearbyPage = 0;
        const cards = Array.from(nearbyTrack.querySelectorAll('.ld-prop-card'));
        const visibleCount = () => window.innerWidth <= 767 ? 2 : 3;
        const maxPage = () => Math.max(0, Math.ceil(cards.length / visibleCount()) - 1);
        const updateNearby = () => {
            const vc = visibleCount();
            const start = nearbyPage * vc;
            cards.forEach((c, i) => { c.style.display = (i >= start && i < start + vc) ? '' : 'none'; });
            nearbyPrev.disabled = nearbyPage <= 0;
            nearbyNext.disabled = nearbyPage >= maxPage();
        };
        nearbyPrev.addEventListener('click', () => { if (nearbyPage > 0) { nearbyPage--; updateNearby(); } });
        nearbyNext.addEventListener('click', () => { if (nearbyPage < maxPage()) { nearbyPage++; updateNearby(); } });
        updateNearby();
    }

    // Location tab clicks (map vs commute panel)
    const ldLocMap = document.getElementById('ldLocMap');
    const ldLocCommute = document.getElementById('ldLocCommute');
    const ldSchoolDisclaimer = document.getElementById('ldSchoolDisclaimer');
    container.querySelectorAll('.ld-location-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.ld-location-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const panel = tab.dataset.loc;
            const isSchool = tab.textContent.trim() === 'School';
            if (ldLocMap) ldLocMap.style.display = panel === 'commute' ? 'none' : 'flex';
            if (ldLocCommute) ldLocCommute.style.display = panel === 'commute' ? 'flex' : 'none';
            if (ldSchoolDisclaimer) ldSchoolDisclaimer.style.display = isSchool ? 'block' : 'none';
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
        ldAddChatMsg('<span class="chat-online-dot" style="display:inline-block;vertical-align:middle;margin-right:4px;"></span>👋 Hi! I\'m <strong>Artur</strong>, your personal real estate assistant. Ask Artur anything about this property at <strong>' + ldAddr + '</strong>.<br><br>I can help you with:<br>• Scheduling a visit<br>• Understanding the price & neighborhood<br>• Making an offer');
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
