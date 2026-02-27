// Hash-based SPA router
const routeMap = {
    '/your-listing': 'properties',
    '/offers': 'offers',
    '/requested-show': 'visits',
    '/your-messages': 'messages',
    '/calendar': 'calendar',
    '/contract': 'contracts',
    '/profile': 'account',
    '/submit-property': 'addProperty'
};

const pageToRoute = {};
Object.entries(routeMap).forEach(([k, v]) => pageToRoute[v] = k);

let routing = false;
let pageModules = {};
let onPageChange = null;

export function initRouter(modules, callback) {
    pageModules = modules;
    onPageChange = callback;

    // Intercept link clicks
    document.addEventListener('click', function (e) {
        const a = e.target.closest('a');
        if (a) {
            const href = a.getAttribute('href');
            if (href && routeMap[href]) {
                e.preventDefault();
                e.stopPropagation();
                window.location.hash = href;
            }
        }
    }, true);

    window.addEventListener('hashchange', handleHash);

    // Handle initial hash
    if (window.location.hash) {
        const hashPath = window.location.hash.slice(1).split('?')[0];
        // Check for known routes or dynamic routes (offer detail, mls-form, submit-property)
        if (routeMap[hashPath] || hashPath.match(/^\/offers\/.+$/) || hashPath.match(/^\/mls-form\/.+$/) || hashPath.match(/^\/submit-property(\/.*)?$/) || hashPath.match(/^\/listing\/.+$/)) {
            handleHash();
        } else {
            window.location.hash = '/offers';
        }
    } else {
        window.location.hash = '/offers';
    }
}

function handleHash() {
    if (routing) { routing = false; return; }
    const hash = window.location.hash.slice(1);

    // Check if it's a submit-property route with ID (e.g., /submit-property/123)
    const submitPropertyMatch = hash.match(/^\/submit-property\/(.+)$/);
    const isSubmitPropertyRoute = hash === '/submit-property' || submitPropertyMatch;

    // Check if it's an offer detail route (e.g., /offers/offer_1)
    const offerDetailMatch = hash.match(/^\/offers\/(.+)$/);

    // Check if it's a listing detail route (e.g., /listing/prop_123)
    const listingDetailMatch = hash.match(/^\/listing\/(.+)$/);

    // Check if it's an MLS form route (e.g., /mls-form/prop_123)
    const mlsFormMatch = hash.match(/^\/mls-form\/(.+)$/);

    // Hide submit property page when navigating away
    const submitContainer = document.getElementById('submit-property-container');
    if (submitContainer) {
        submitContainer.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Hide listing detail page when navigating away
    const listingContainer = document.getElementById('listing-detail-container');
    if (listingContainer) {
        listingContainer.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Clean up listing-detail state (IntersectionObservers etc.)
    if (pageModules.listingDetail && pageModules.listingDetail.cleanup) {
        pageModules.listingDetail.cleanup();
    }

    // Clean up offer-detail state (action bar moved to chat, resize listener)
    if (pageModules.offerDetail && pageModules.offerDetail.cleanup) {
        pageModules.offerDetail.cleanup();
    }

    // Handle listing detail route — full-screen overlay
    if (listingDetailMatch) {
        // Hide MLS form if open
        const mlsContainer = document.getElementById('mls-form-container');
        if (mlsContainer) { mlsContainer.style.display = 'none'; document.body.style.overflow = ''; }

        const propertyId = listingDetailMatch[1];
        const ldContainer = document.getElementById('listing-detail-container');
        if (ldContainer && pageModules.listingDetail) {
            ldContainer.innerHTML = pageModules.listingDetail.render(propertyId);
            pageModules.listingDetail.init(propertyId);
            ldContainer.style.display = 'block';
            document.body.style.overflow = 'hidden';
            ldContainer.scrollTop = 0;
        }
        updateActiveNav('/your-listing');
        updateMobileActiveNav('properties');
        return;
    }

    // Handle offer detail route — render inside main layout like other pages
    if (offerDetailMatch) {
        // Hide MLS form if open
        const mlsContainer = document.getElementById('mls-form-container');
        if (mlsContainer) { mlsContainer.style.display = 'none'; document.body.style.overflow = ''; }

        const offerId = offerDetailMatch[1];
        if (pageModules.offerDetail) {
            const contentArea = document.getElementById('page-content');
            if (contentArea) {
                contentArea.innerHTML = pageModules.offerDetail.render(offerId);
                pageModules.offerDetail.init(offerId);
            }
        }
        updateActiveNav('/offers');
        updateMobileActiveNav('offers');
        return;
    }

    // Handle MLS form route
    if (mlsFormMatch) {
        const mlsContainer = document.getElementById('mls-form-container');
        if (mlsContainer && pageModules.mlsForm) {
            const propertyId = mlsFormMatch[1];
            mlsContainer.innerHTML = pageModules.mlsForm.render(propertyId);
            pageModules.mlsForm.init(propertyId);
            mlsContainer.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        updateActiveNav('/your-listing');
        return;
    }

    // Hide MLS form when navigating away
    const mlsContainer = document.getElementById('mls-form-container');
    if (mlsContainer) {
        mlsContainer.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (isSubmitPropertyRoute) {
        if (submitContainer) {
            // Re-render the submit property page
            if (pageModules.addProperty) {
                // Pass the property ID if editing
                const propertyId = submitPropertyMatch ? submitPropertyMatch[1] : null;
                submitContainer.innerHTML = pageModules.addProperty.render(propertyId);
                pageModules.addProperty.init(propertyId);
            }
            submitContainer.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        updateActiveNav('/submit-property');
        return;
    }

    // Split hash to handle query parameters
    const hashPath = hash.split('?')[0];
    const page = routeMap[hashPath];

    if (page && onPageChange) {
        onPageChange(page, hashPath);
        updateActiveNav(hashPath);
        updateMobileActiveNav(page);
    }
}

export function navigateTo(page, e) {
    if (e) e.preventDefault();
    const route = pageToRoute[page];
    if (route) {
        routing = true;
        window.location.hash = route;
    }
    if (onPageChange) {
        onPageChange(page, route || '');
    }
    updateActiveNav(route || '');
    updateMobileActiveNav(page);
}

function updateActiveNav(route) {
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === route) l.classList.add('active');
    });
}

function updateMobileActiveNav(page) {
    const mobileMap = { 'properties': 0, 'offers': 1, 'visits': 2, 'messages': 3 };
    document.querySelectorAll('.mobile-bottom-nav-items > .mobile-bottom-nav-item, .mobile-bottom-nav-items > .mobile-more-wrapper .mobile-bottom-nav-item').forEach(i => i.classList.remove('active'));
    const idx = mobileMap[page];
    if (idx !== undefined) {
        const items = document.querySelectorAll('.mobile-bottom-nav-items > .mobile-bottom-nav-item');
        if (items[idx]) items[idx].classList.add('active');
    }
}

export { routeMap, pageToRoute };
