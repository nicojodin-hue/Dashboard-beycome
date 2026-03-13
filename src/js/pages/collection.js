import store from '../store.js';
import { getListingUrl } from '../utils.js';

function getPropertyById(id) {
    const properties = store.get('properties') || [];
    return properties.find(p => p.id === id);
}

function formatPrice(price) {
    return Number(price).toLocaleString();
}

function renderCard(prop) {
    const price = formatPrice(prop.price);
    const ppsf = prop.livingArea ? Math.round(Number(prop.price) / Number(prop.livingArea)) : '';
    const type = prop.propertyType === 'Single Family Home' ? 'House' : prop.propertyType || 'Property';

    return `
    <div class="collection-card" data-id="${prop.id}">
        <div class="collection-card-img">
            <svg class="collection-card-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <button class="collection-remove-btn" data-id="${prop.id}" title="Remove from collection">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
        <div class="collection-card-body">
            <span class="collection-card-type">${type} for Sale</span>
            <div class="collection-card-row">
                <div class="collection-card-left">
                    <h3 class="collection-card-address">${prop.address}</h3>
                    <p class="collection-card-city">${prop.city}, ${prop.state} ${prop.zipcode}</p>
                </div>
                <div class="collection-card-stats">
                    ${prop.beds ? `<div class="collection-card-stat"><span class="collection-card-stat-value">🛏️ ${prop.beds}</span><span class="collection-card-stat-label">beds</span></div>` : ''}
                    ${prop.baths ? `<div class="collection-card-stat"><span class="collection-card-stat-value">🛁 ${prop.baths}</span><span class="collection-card-stat-label">baths</span></div>` : ''}
                    ${prop.livingArea ? `<div class="collection-card-stat"><span class="collection-card-stat-value">📐 ${Number(prop.livingArea).toLocaleString()}</span><span class="collection-card-stat-label">sqft</span></div>` : ''}
                </div>
            </div>
            <div class="collection-card-price">
                <strong>$${price}</strong>
                ${ppsf ? `<span>$${ppsf}/sqft</span>` : ''}
            </div>
            <a href="${getListingUrl(prop)}" class="collection-card-view">View Listing</a>
        </div>
    </div>`;
}

export function render() {
    const savedIds = JSON.parse(localStorage.getItem('savedListings') || '[]');
    const properties = savedIds.map(id => getPropertyById(id)).filter(Boolean);

    const cards = properties.length > 0
        ? properties.map(p => renderCard(p)).join('')
        : `<div class="collection-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--c-text-secondary);margin-bottom:16px;">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <h3>No saved properties yet</h3>
                <p>Click the heart icon on a listing to add it to your collection.</p>
           </div>`;

    return `
    <div class="collection-page">
        <div class="collection-header">
            <h2>My Collection</h2>
            <span class="collection-count">${properties.length} ${properties.length === 1 ? 'property' : 'properties'}</span>
        </div>
        <div class="collection-grid">${cards}</div>
    </div>`;
}

export function init() {
    // Remove from collection
    document.querySelectorAll('.collection-remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = btn.dataset.id;
            const saved = JSON.parse(localStorage.getItem('savedListings') || '[]');
            localStorage.setItem('savedListings', JSON.stringify(saved.filter(s => s !== id)));

            // Remove card with animation
            const card = btn.closest('.collection-card');
            if (card) {
                card.style.transition = 'opacity 0.3s, transform 0.3s';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.remove();
                    // Update count
                    const remaining = document.querySelectorAll('.collection-card').length;
                    const countEl = document.querySelector('.collection-count');
                    if (countEl) countEl.textContent = remaining + (remaining === 1 ? ' property' : ' properties');
                    // Show empty state if none left
                    if (remaining === 0) {
                        const grid = document.querySelector('.collection-grid');
                        if (grid) {
                            grid.innerHTML = `<div class="collection-empty">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--c-text-secondary);margin-bottom:16px;">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <h3>No saved properties yet</h3>
                                <p>Click the heart icon on a listing to add it to your collection.</p>
                            </div>`;
                        }
                    }
                }, 300);
            }
        });
    });
}
