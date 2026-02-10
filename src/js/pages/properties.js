import store from '../store.js';
import { isDesktopView } from '../utils.js';
import { addChatMessage } from '../components/chat.js';

export function render() {
    return `<div class="visit-tabs">
        <button class="btn btn-accent compose-btn" id="addPropertyBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>Add new property</button>
    </div>
    <div class="property-grid" id="propertyGrid">
        <div class="property-card" data-property-id="2" style="position:relative;">
            <span class="property-status request-doc" style="position:absolute;top:10px;left:10px;z-index:10;">Request extra document</span>
            <div class="property-image" style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>
            <div class="property-details"><h3>456 Ocean Drive</h3><p>Miami Beach, FL 33139</p><div class="property-footer"><span class="property-price">$725,000</span></div><button class="btn btn-danger property-delete-btn" data-del-id="2" data-del-name="456 Ocean Drive"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>Delete</button></div>
        </div>
    </div>`;
}

export function init() {
    document.getElementById('addPropertyBtn')?.addEventListener('click', () => {
        window.location.hash = '/submit-property';
    });

    document.querySelectorAll('.property-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.delId;
            const name = btn.dataset.delName;
            const card = btn.closest('.property-card');
            if (card) {
                card.remove();
                const props = store.get('properties').filter(p => !p.id.includes(name));
                store.set('properties', props);
                if (isDesktopView()) addChatMessage('🗑️ Property <strong>' + name + '</strong> has been deleted.');
            }
        });
    });
}
