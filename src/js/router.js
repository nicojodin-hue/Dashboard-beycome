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
    if (window.location.hash && routeMap[window.location.hash.slice(1)]) {
        handleHash();
    } else {
        window.location.hash = '/offers';
    }
}

function handleHash() {
    if (routing) { routing = false; return; }
    const hash = window.location.hash.slice(1);
    const page = routeMap[hash];

    // Hide submit property page when navigating away
    const submitContainer = document.getElementById('submit-property-container');
    if (submitContainer) {
        submitContainer.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (page === 'addProperty') {
        if (submitContainer) {
            submitContainer.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        updateActiveNav(hash);
        return;
    }

    if (page && onPageChange) {
        onPageChange(page, hash);
        updateActiveNav(hash);
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
