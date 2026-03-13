// Standalone entry point for listing-detail page
// URL format: /Dashboard-beycome/listing-detail.html?id=prop_seed_2

// CSS imports (only what the listing detail page needs)
import '../styles/main.css';
import '../styles/components.css';
import '../styles/layout.css';
import '../styles/listing-detail.css';
import '../styles/responsive.css';

// Store
import store from './store.js';

// Components
import { renderIcons } from './components/icons.js';

// Listing detail page
import * as listingDetailPage from './pages/listing-detail.js';

// Seed data (in case user lands directly on this page)
store.seed();

// Mount icons
document.getElementById('icons-sprite').innerHTML = renderIcons();

// Get property ID from URL query params
const params = new URLSearchParams(window.location.search);
const propertyId = params.get('id');

if (propertyId) {
    const root = document.getElementById('listing-detail-root');
    root.innerHTML = listingDetailPage.render(propertyId);
    listingDetailPage.init(propertyId);

    // Update page title with property address
    const properties = store.get('properties') || [];
    const prop = properties.find(p => p.id === propertyId);
    if (prop) {
        document.title = `${prop.address}, ${prop.city}, ${prop.state} ${prop.zipcode} - beycome`;
    }
} else {
    // No property ID — redirect back to dashboard
    window.location.href = '/Dashboard-beycome/#/your-listing';
}
