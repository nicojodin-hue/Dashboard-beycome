// localStorage store with seed data
const PREFIX = 'beycome_';

const store = {
    get(key) {
        try {
            const raw = localStorage.getItem(PREFIX + key);
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    },
    set(key, value) {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
    },
    remove(key) {
        localStorage.removeItem(PREFIX + key);
    },
    /**
     * Attempt to load fresh market data from the static JSON file.
     * If the file is newer than what's in localStorage, merge it in.
     * Returns the data (from file or localStorage fallback).
     */
    async fetchMarketData() {
        try {
            const res = await fetch(import.meta.env.BASE_URL + 'data/market-trends.json');
            if (!res.ok) return this.get('market_trends');

            // Vite dev server returns HTML for missing files — skip those
            const ct = res.headers.get('content-type') || '';
            if (!ct.includes('json')) return this.get('market_trends');

            const fresh = await res.json();
            const existing = this.get('market_trends');

            // Update if the file is newer or if we have no data
            if (!existing || !existing.lastUpdated || fresh.lastUpdated > existing.lastUpdated) {
                this.set('market_trends', fresh);
                return fresh;
            }
            return existing;
        } catch {
            // File not available (dev mode, offline, etc.) — use localStorage
            return this.get('market_trends');
        }
    },
    seed() {
        if (!this.get('messages')) {
            this.set('messages', {
                inbox: [
                    { id: 1, sender: 'John Smith', email: 'john.smith@email.com', phone: '(305) 555-1234', subject: 'Question about 1505 N Jean Baptiste Pointe du Sable Lake Shore Dr', time: '2 hours ago', status: 'new', unread: true, thread: [{ type: 'incoming', text: "Hi, I'm very interested in your property at 1505 N Jean Baptiste Pointe du Sable Lake Shore Dr. Is the price negotiable?", sender: 'John Smith', time: '2 hours ago', documents: [] }] },
                    { id: 2, sender: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '(305) 555-5678', subject: 'Visit confirmation for 456 Ocean Drive', time: 'Yesterday', status: 'read', unread: false, thread: [{ type: 'incoming', text: "Hi! I'd like to schedule a visit.", sender: 'Sarah Johnson', time: '3 days ago', documents: [] }, { type: 'outgoing', text: "Hi Sarah! Yes, Thursday at 2:30 PM works perfectly.", sender: 'You', time: '2 days ago', documents: [] }, { type: 'incoming', text: "Thank you for accepting my visit request!", sender: 'Sarah Johnson', time: 'Yesterday', documents: [] }] },
                    { id: 3, sender: 'Michael Chen', email: 'michael.chen@email.com', phone: '(305) 555-9012', subject: 'Offer inquiry', time: '2 days ago', status: 'new', unread: true, thread: [{ type: 'incoming', text: "Hello, I saw your listing and I'm interested in making an offer.", sender: 'Michael Chen', time: '2 days ago', documents: [] }] },
                    { id: 4, sender: 'Emily Davis', email: 'emily.davis@email.com', phone: '(305) 555-3456', subject: 'Property documents received', time: '3 days ago', status: 'replied', unread: false, thread: [{ type: 'incoming', text: "Could you send me the property disclosure documents?", sender: 'Emily Davis', time: '4 days ago', documents: [] }, { type: 'outgoing', text: "Of course! I've attached the documents.", sender: 'You', time: '3 days ago', documents: [{ name: 'Property_Disclosure.pdf', size: '245 KB', type: 'pdf' }] }, { type: 'incoming', text: "Thanks for sending the documents.", sender: 'Emily Davis', time: '3 days ago', documents: [] }] }
                ],
                sent: []
            });
        }
        if (!this.get('notifications')) {
            this.set('notifications', [
                { id: 1, type: 'offer', icon: '💰', title: '<strong>John Smith</strong> submitted an offer on <strong>123 Main Street</strong>', time: '2 hours ago', unread: true, link: 'offers' },
                { id: 2, type: 'visit', icon: '📅', title: '<strong>Sarah Johnson</strong> requested a visit', time: '5 hours ago', unread: true, link: 'visits' },
                { id: 3, type: 'message', icon: '💬', title: '<strong>Michael Chen</strong> sent you a message', time: '2 days ago', unread: true, link: 'messages' },
                { id: 4, type: 'visit', icon: '✅', title: 'Visit confirmed for <strong>789 Palm Avenue</strong>', time: '3 days ago', unread: true, link: 'visits' }
            ]);
        }
        if (!this.get('events')) {
            this.set('events', [
                { id: 1, type: 'visit', status: 'confirmed', title: '789 Palm Avenue, Coral Gables, FL', shortTitle: '789 Palm Avenue', date: new Date(2026, 1, 2, 11, 0).toISOString(), person: 'David Miller', phone: '(305) 555-9012', email: 'david.miller@email.com', property: '789 Palm Avenue' },
                { id: 2, type: 'visit', status: 'pending', title: '1505 N Jean Baptiste Pointe du Sable Lake Shore Dr, Bonadelle Ranchos-Madera Ranchos, CA 33135', shortTitle: '1505 N Jean Baptiste...', date: new Date(2026, 0, 28, 10, 0).toISOString(), person: 'John Smith', phone: '(305) 555-1234', email: 'john.smith@email.com', property: '1505 N Jean Baptiste Pointe du Sable Lake Shore Dr' }
            ]);
        }
        // Reset invalid seed data (old format had id:'all' with no address)
        const existingProps = this.get('properties');
        if (existingProps && existingProps.length > 0 && !existingProps[0].address) {
            this.remove('properties');
        }

        if (!this.get('properties') || this.get('properties').length === 0) {
            this.set('properties', [
                {
                    id: 'prop_seed_1',
                    address: '1505 N Jean Baptiste Pointe du Sable Lake Shore Dr',
                    city: 'Bonadelle Ranchos-Madera Ranchos',
                    state: 'CA',
                    zipcode: '33135',
                    propertyType: 'Single Family Home',
                    listingType: 'For Sale',
                    price: '850000',
                    beds: 4,
                    baths: 3,
                    halfBaths: 1,
                    livingArea: '2400',
                    lotSize: '8000',
                    status: 'draft',
                    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
                },
                {
                    id: 'prop_seed_2',
                    address: '456 Ocean Drive',
                    city: 'Miami Beach',
                    state: 'FL',
                    zipcode: '33139',
                    propertyType: 'Condo',
                    listingType: 'For Sale',
                    price: '1250000',
                    beds: 3,
                    baths: 2,
                    halfBaths: 0,
                    livingArea: '1800',
                    status: 'live-active',
                    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
                    updatedAt: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    id: 'prop_seed_3',
                    address: '789 Palm Avenue',
                    city: 'Coral Gables',
                    state: 'FL',
                    zipcode: '33134',
                    propertyType: 'Single Family Home',
                    listingType: 'For Sale',
                    price: '2100000',
                    beds: 5,
                    baths: 4,
                    halfBaths: 1,
                    livingArea: '3500',
                    lotSize: '12000',
                    status: 'under-contract',
                    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
                    updatedAt: new Date(Date.now() - 86400000).toISOString()
                }
            ]);
        }
        this.seedMarketTrends();

        if (!this.get('products')) {
            this.set('products', {
                packages: [
                    { id: 'basic', name: 'Basic', price: 99 },
                    { id: 'enhanced', name: 'Enhanced', price: 399 },
                    { id: 'concierge', name: 'Concierge', price: 999 }
                ],
                alacarte: [
                    { id: 'title', name: 'Title Settlement', price: 99, hideFor: ['concierge'], badge: 'Most added', physical: false, nowOrNever: false },
                    { id: 'photos', name: '25 Professional HD Photos', price: 189, hideFor: ['enhanced', 'concierge'], badge: null, physical: false, nowOrNever: false },
                    { id: 'support', name: 'Access to Pro Support', price: 199, hideFor: ['concierge'], badge: 'Now or never', physical: false, nowOrNever: true },
                    { id: 'cma', name: 'Comparative Market Analysis', price: 65, hideFor: ['concierge'], badge: null, physical: false, nowOrNever: false },
                    { id: 'dual-mls', name: 'Double your MLS reach', price: 79, hideFor: ['concierge'], badge: null, physical: false, nowOrNever: false },
                    { id: 'warranty', name: 'Home Warranty', price: 19, hideFor: [], badge: null, physical: false, nowOrNever: false },
                    { id: 'sign', name: '1x Pro Yard Sign', price: 35, hideFor: ['concierge'], badge: null, physical: true, nowOrNever: false },
                    { id: 'openhouse', name: '1x Open House Signage Kit', price: 45, hideFor: ['concierge'], badge: null, physical: true, nowOrNever: false },
                    { id: 'lockbox', name: '1x Keylock Box', price: 30, hideFor: ['concierge'], badge: null, physical: true, nowOrNever: false },
                    { id: 'spotlight', name: 'beycome Spotlight Listing', price: 29, hideFor: ['concierge'], badge: null, physical: false, nowOrNever: false }
                ]
            });
        }
    },
    seedMarketTrends() {
        const existing = this.get('market_trends');
        if (existing && existing._v >= 2) return;

        // Generate monthly history data points
        function generateHistory(baseValues, months) {
            const history = [];
            const now = new Date(2026, 1, 1); // Feb 2026
            for (let i = months - 1; i >= 0; i--) {
                const d = new Date(now);
                d.setMonth(d.getMonth() - i);
                const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                const factor = 1 - (i * 0.008) + (Math.sin(i * 0.5) * 0.03);
                history.push({
                    month,
                    zip: Math.round(baseValues.zip * factor),
                    city: Math.round(baseValues.city * factor),
                    county: Math.round(baseValues.county * factor),
                    state: Math.round(baseValues.state * factor)
                });
            }
            return history;
        }

        this.set('market_trends', {
            _v: 2,
            lastUpdated: '2026-02-01T00:00:00.000Z',
            dataSources: [
                { name: 'Redfin', url: 'https://www.redfin.com/news/data-center/', description: 'Weekly and monthly housing market data from MLS listings' },
                { name: 'Zillow Research', url: 'https://www.zillow.com/research/data/', description: 'Home value indices, inventory, and rental data' },
                { name: 'Realtor.com', url: 'https://www.realtor.com/research/data/', description: 'Listing inventory, median prices, and days on market' },
                { name: 'FRED (Federal Reserve)', url: 'https://fred.stlouisfed.org/', description: 'Economic indicators and housing metrics from public records' }
            ],
            locations: {
                'florida': {
                    name: 'Florida',
                    type: 'state',
                    state: 'FL',
                    parentLocation: null,
                    marketScore: { value: 52, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 4.8, momPct: 1.2, yoyPct: -5.3 },
                        soldToListPct: { value: 96.2, momPct: -0.1, yoyPct: 0.8 },
                        medianDaysOnMarket: { value: 42, momPct: -3.4, yoyPct: -8.2 },
                        medianSoldPrice: { value: 420000, momPct: 0.9, yoyPct: 5.1 },
                        medianPricePerSqft: { value: 255, momPct: 0.6, yoyPct: 4.2 },
                        priceDropPct: { value: 18.5, momPct: 1.2, yoyPct: 2.8 },
                        soldAboveListPct: { value: 21.3, momPct: -0.8, yoyPct: -2.1 }
                    },
                    medianEstimatedValue: {
                        value: 445000,
                        momPct: 0.7,
                        yoyPct: 4.8,
                        history: generateHistory({ zip: 445000, city: 445000, county: 445000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 449900, momPct: 1.8 },
                            numProperties: { value: 42500, momPct: -2.1 },
                            medianPricePerSqft: { value: 265, momPct: 1.2 },
                            totalVolume: { value: 19120500000, momPct: -0.3 },
                            medianLivingArea: { value: 1720, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 465000, momPct: 0.4 },
                            numProperties: { value: 158000, momPct: 3.5 },
                            medianDays: { value: 52, momPct: -5.5 },
                            medianPricePerSqft: { value: 272, momPct: 0.8 },
                            totalVolume: { value: 73470000000, momPct: 3.9 },
                            medianLivingArea: { value: 1680, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 399000, momPct: 2.3 },
                            numProperties: { value: 28400, momPct: 4.8 },
                            medianDays: { value: 38, momPct: -6.2 },
                            medianPricePerSqft: { value: 248, momPct: 1.1 },
                            totalVolume: { value: 11331600000, momPct: 7.1 },
                            medianLivingArea: { value: 1640, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 420000, momPct: 0.9 },
                            numProperties: { value: 24800, momPct: -1.2 },
                            saleToListPct: { value: 96.2, momPct: -0.1 },
                            medianDays: { value: 42, momPct: -3.4 },
                            medianPricePerSqft: { value: 255, momPct: 0.6 },
                            totalVolume: { value: 10416000000, momPct: -0.3 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 410000, momPct: 0.7 },
                            numProperties: { value: 26200, momPct: 0.5 },
                            medianPricePerSqft: { value: 250, momPct: 0.4 },
                            medianLivingArea: { value: 1700, momPct: -0.1 },
                            totalVolume: { value: 10742000000, momPct: 1.2 }
                        }
                    },
                    monthsSupply: { value: 4.8, momPct: 1.2, yoyPct: -5.3 },
                    neighborhoods: [
                        { name: 'Miami-Dade County', slug: 'miami-dade-county-fl', type: 'county', medianPrice: 585000, dom: 34, inventory: 3.2 },
                        { name: 'Broward County', slug: 'broward-county-fl', type: 'county', medianPrice: 460000, dom: 38, inventory: 3.8 },
                        { name: 'Palm Beach County', slug: 'palm-beach-county-fl', type: 'county', medianPrice: 520000, dom: 40, inventory: 4.2 },
                        { name: 'Orange County', slug: 'orange-county-fl', type: 'county', medianPrice: 395000, dom: 35, inventory: 3.5 },
                        { name: 'Hillsborough County', slug: 'hillsborough-county-fl', type: 'county', medianPrice: 380000, dom: 36, inventory: 3.6 },
                        { name: 'Duval County', slug: 'duval-county-fl', type: 'county', medianPrice: 340000, dom: 32, inventory: 3.0 }
                    ]
                },
                'miami-dade-county-fl': {
                    name: 'Miami-Dade County',
                    type: 'county',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'florida',
                    marketScore: { value: 58, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.2, momPct: -2.1, yoyPct: -10.5 },
                        soldToListPct: { value: 97.1, momPct: 0.2, yoyPct: 1.0 },
                        medianDaysOnMarket: { value: 36, momPct: -5.3, yoyPct: -12.2 },
                        medianSoldPrice: { value: 585000, momPct: 1.4, yoyPct: 7.2 },
                        medianPricePerSqft: { value: 365, momPct: 1.0, yoyPct: 6.5 },
                        priceDropPct: { value: 15.2, momPct: 0.8, yoyPct: 1.5 },
                        soldAboveListPct: { value: 25.8, momPct: -1.2, yoyPct: -1.8 }
                    },
                    medianEstimatedValue: {
                        value: 612000,
                        momPct: 1.1,
                        yoyPct: 6.5,
                        history: generateHistory({ zip: 612000, city: 612000, county: 585000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 625000, momPct: 2.1 },
                            numProperties: { value: 5200, momPct: -3.2 },
                            medianPricePerSqft: { value: 385, momPct: 1.8 },
                            totalVolume: { value: 3250000000, momPct: -1.1 },
                            medianLivingArea: { value: 1650, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 599000, momPct: -0.5 },
                            numProperties: { value: 18500, momPct: 2.8 },
                            medianDays: { value: 45, momPct: -4.2 },
                            medianPricePerSqft: { value: 372, momPct: -0.2 },
                            totalVolume: { value: 11081500000, momPct: 2.3 },
                            medianLivingArea: { value: 1580, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 545000, momPct: 1.4 },
                            numProperties: { value: 3800, momPct: 5.1 },
                            medianDays: { value: 32, momPct: -7.1 },
                            medianPricePerSqft: { value: 358, momPct: 0.9 },
                            totalVolume: { value: 2071000000, momPct: 6.5 },
                            medianLivingArea: { value: 1520, momPct: -0.3 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 585000, momPct: 1.4 },
                            numProperties: { value: 3200, momPct: -0.8 },
                            saleToListPct: { value: 97.1, momPct: 0.2 },
                            medianDays: { value: 36, momPct: -5.3 },
                            medianPricePerSqft: { value: 365, momPct: 1.0 },
                            totalVolume: { value: 1872000000, momPct: 0.6 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 570000, momPct: 0.9 },
                            numProperties: { value: 3500, momPct: 1.5 },
                            medianPricePerSqft: { value: 355, momPct: 0.7 },
                            medianLivingArea: { value: 1600, momPct: -0.2 },
                            totalVolume: { value: 1995000000, momPct: 2.4 }
                        }
                    },
                    monthsSupply: { value: 3.2, momPct: -2.1, yoyPct: -10.5 },
                    neighborhoods: [
                        { name: 'Miami', slug: 'miami-fl', type: 'city', medianPrice: 550000, dom: 32, inventory: 2.9 },
                        { name: 'Miami Beach', slug: 'miami-beach-fl', type: 'city', medianPrice: 680000, dom: 48, inventory: 5.2 },
                        { name: 'Coral Gables', slug: 'coral-gables-fl', type: 'city', medianPrice: 1327500, dom: 62, inventory: 6.25 },
                        { name: 'Hialeah', slug: 'hialeah-fl', type: 'city', medianPrice: 480000, dom: 30, inventory: 2.6 },
                        { name: 'Homestead', slug: 'homestead-fl', type: 'city', medianPrice: 420000, dom: 28, inventory: 2.4 },
                        { name: 'Doral', slug: 'doral-fl', type: 'city', medianPrice: 580000, dom: 35, inventory: 3.1 },
                        { name: 'Aventura', slug: 'aventura-fl', type: 'city', medianPrice: 490000, dom: 52, inventory: 5.8 },
                        { name: 'Sunny Isles Beach', slug: 'sunny-isles-beach-fl', type: 'city', medianPrice: 520000, dom: 55, inventory: 6.0 },
                        { name: 'Key Biscayne', slug: 'key-biscayne-fl', type: 'city', medianPrice: 1650000, dom: 65, inventory: 7.2 },
                        { name: 'Pinecrest', slug: 'pinecrest-fl', type: 'city', medianPrice: 1450000, dom: 50, inventory: 5.0 },
                        { name: 'Palmetto Bay', slug: 'palmetto-bay-fl', type: 'city', medianPrice: 780000, dom: 38, inventory: 3.5 },
                        { name: 'Cutler Bay', slug: 'cutler-bay-fl', type: 'city', medianPrice: 520000, dom: 30, inventory: 2.6 },
                        { name: 'Miami Gardens', slug: 'miami-gardens-fl', type: 'city', medianPrice: 420000, dom: 28, inventory: 2.3 },
                        { name: 'North Miami', slug: 'north-miami-fl', type: 'city', medianPrice: 450000, dom: 32, inventory: 2.8 },
                        { name: 'North Miami Beach', slug: 'north-miami-beach-fl', type: 'city', medianPrice: 410000, dom: 34, inventory: 3.0 },
                        { name: 'Miami Lakes', slug: 'miami-lakes-fl', type: 'city', medianPrice: 560000, dom: 32, inventory: 2.8 },
                        { name: 'Miami Springs', slug: 'miami-springs-fl', type: 'city', medianPrice: 620000, dom: 35, inventory: 3.0 },
                        { name: 'Kendall', slug: 'kendall-fl', type: 'city', medianPrice: 540000, dom: 30, inventory: 2.7 }
                    ]
                },
                'miami-fl': {
                    name: 'Miami',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 64, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.9, momPct: -3.4, yoyPct: -14.7 },
                        soldToListPct: { value: 97.8, momPct: 0.3, yoyPct: 1.5 },
                        medianDaysOnMarket: { value: 32, momPct: -6.2, yoyPct: -18.0 },
                        medianSoldPrice: { value: 550000, momPct: 1.8, yoyPct: 8.5 },
                        medianPricePerSqft: { value: 395, momPct: 1.4, yoyPct: 7.8 },
                        priceDropPct: { value: 13.8, momPct: -0.5, yoyPct: -1.2 },
                        soldAboveListPct: { value: 28.5, momPct: 0.6, yoyPct: 1.8 }
                    },
                    medianEstimatedValue: {
                        value: 580000,
                        momPct: 1.5,
                        yoyPct: 7.8,
                        history: generateHistory({ zip: 580000, city: 550000, county: 585000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 575000, momPct: 2.5 },
                            numProperties: { value: 1850, momPct: -1.8 },
                            medianPricePerSqft: { value: 420, momPct: 2.1 },
                            totalVolume: { value: 1063750000, momPct: 0.7 },
                            medianLivingArea: { value: 1380, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 549000, momPct: 0.2 },
                            numProperties: { value: 6800, momPct: 1.9 },
                            medianDays: { value: 40, momPct: -3.8 },
                            medianPricePerSqft: { value: 398, momPct: 0.5 },
                            totalVolume: { value: 3733200000, momPct: 2.1 },
                            medianLivingArea: { value: 1350, momPct: -0.2 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 510000, momPct: 1.9 },
                            numProperties: { value: 1420, momPct: 6.3 },
                            medianDays: { value: 28, momPct: -8.5 },
                            medianPricePerSqft: { value: 385, momPct: 1.3 },
                            totalVolume: { value: 724200000, momPct: 8.2 },
                            medianLivingArea: { value: 1320, momPct: 0.1 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 550000, momPct: 1.8 },
                            numProperties: { value: 1180, momPct: -0.5 },
                            saleToListPct: { value: 97.8, momPct: 0.3 },
                            medianDays: { value: 32, momPct: -6.2 },
                            medianPricePerSqft: { value: 395, momPct: 1.4 },
                            totalVolume: { value: 649000000, momPct: 1.3 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 535000, momPct: 1.2 },
                            numProperties: { value: 1300, momPct: 2.1 },
                            medianPricePerSqft: { value: 388, momPct: 0.9 },
                            medianLivingArea: { value: 1360, momPct: -0.1 },
                            totalVolume: { value: 695500000, momPct: 3.3 }
                        }
                    },
                    monthsSupply: { value: 2.9, momPct: -3.4, yoyPct: -14.7 },
                    neighborhoods: [
                        { name: 'Brickell', slug: 'brickell-miami-fl', type: 'neighborhood', medianPrice: 485000, dom: 28, inventory: 2.8 },
                        { name: 'Wynwood', slug: 'wynwood-miami-fl', type: 'neighborhood', medianPrice: 620000, dom: 30, inventory: 2.5 },
                        { name: 'Little Havana', slug: 'little-havana-miami-fl', type: 'neighborhood', medianPrice: 380000, dom: 25, inventory: 2.1 },
                        { name: 'Coconut Grove', slug: 'coconut-grove-miami-fl', type: 'neighborhood', medianPrice: 1150000, dom: 42, inventory: 4.2 },
                        { name: 'Edgewater', slug: 'edgewater-miami-fl', type: 'neighborhood', medianPrice: 520000, dom: 35, inventory: 3.4 },
                        { name: 'Downtown Miami', slug: 'downtown-miami-fl', type: 'neighborhood', medianPrice: 450000, dom: 38, inventory: 4.0 }
                    ]
                },
                'coral-gables-fl': {
                    name: 'Coral Gables',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 42, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 6.25, momPct: 3.31, yoyPct: -8.9 },
                        soldToListPct: { value: 94.8, momPct: 1.41, yoyPct: -0.5 },
                        medianDaysOnMarket: { value: 62, momPct: -12.68, yoyPct: -5.8 },
                        medianSoldPrice: { value: 1327500, momPct: -10.0, yoyPct: 4.2 },
                        medianPricePerSqft: { value: 656, momPct: -23.0, yoyPct: 3.5 },
                        priceDropPct: { value: 22.1, momPct: 2.5, yoyPct: 4.8 },
                        soldAboveListPct: { value: 15.2, momPct: -1.5, yoyPct: -3.2 }
                    },
                    medianEstimatedValue: {
                        value: 1154600,
                        momPct: 0.5,
                        yoyPct: -3.6,
                        history: generateHistory({ zip: 1154600, city: 1154600, county: 585000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 1187000, momPct: -34.1 },
                            numProperties: { value: 100, momPct: -16.0 },
                            medianPricePerSqft: { value: 726, momPct: -19.2 },
                            totalVolume: { value: 328107399, momPct: -13.0 },
                            medianLivingArea: { value: 1689, momPct: -24.4 }
                        },
                        activeListings: {
                            medianListPrice: { value: 1662500, momPct: -4.9 },
                            numProperties: { value: 344, momPct: 1.5 },
                            medianDays: { value: 71, momPct: -18.4 },
                            medianPricePerSqft: { value: 817, momPct: -3.7 },
                            totalVolume: { value: 1390772673, momPct: 4.4 },
                            medianLivingArea: { value: 2076, momPct: -2.2 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 1432500, momPct: 4.2 },
                            numProperties: { value: 54, momPct: 8.0 },
                            medianDays: { value: 36, momPct: -47.8 },
                            medianPricePerSqft: { value: 767, momPct: -10.7 },
                            totalVolume: { value: 132209995, momPct: 21.1 },
                            medianLivingArea: { value: 2010, momPct: 8.0 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 1327500, momPct: -10.0 },
                            numProperties: { value: 42, momPct: 35.5 },
                            saleToListPct: { value: 94.79, momPct: 1.4 },
                            medianDays: { value: 62, momPct: -12.7 },
                            medianPricePerSqft: { value: 656, momPct: -23.0 },
                            totalVolume: { value: 92869000, momPct: 23.6 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 910000, momPct: -27.2 },
                            numProperties: { value: 11, momPct: -79.2 },
                            medianPricePerSqft: { value: 718, momPct: -6.4 },
                            medianLivingArea: { value: 1512, momPct: -16.6 },
                            totalVolume: { value: 16900100, momPct: -83.8 }
                        }
                    },
                    monthsSupply: { value: 6.25, momPct: 3.3, yoyPct: -8.9 },
                    neighborhoods: []
                },
                'miami-beach-fl': {
                    name: 'Miami Beach',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 35, label: "Buyer's Market", type: 'buyer' },
                    keyMetrics: {
                        monthsOfInventory: { value: 5.2, momPct: 3.8, yoyPct: 2.1 },
                        soldToListPct: { value: 94.5, momPct: -0.5, yoyPct: -1.2 },
                        medianDaysOnMarket: { value: 48, momPct: 1.2, yoyPct: 5.5 },
                        medianSoldPrice: { value: 680000, momPct: -0.3, yoyPct: 2.8 },
                        medianPricePerSqft: { value: 575, momPct: -0.4, yoyPct: 2.2 },
                        priceDropPct: { value: 26.8, momPct: 3.2, yoyPct: 6.5 },
                        soldAboveListPct: { value: 12.5, momPct: -2.1, yoyPct: -4.8 }
                    },
                    medianEstimatedValue: {
                        value: 720000,
                        momPct: -0.2,
                        yoyPct: 2.5,
                        history: generateHistory({ zip: 720000, city: 680000, county: 585000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 750000, momPct: 1.5 },
                            numProperties: { value: 380, momPct: -4.2 },
                            medianPricePerSqft: { value: 620, momPct: 0.8 },
                            totalVolume: { value: 285000000, momPct: -2.7 },
                            medianLivingArea: { value: 1200, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 725000, momPct: 0.7 },
                            numProperties: { value: 2800, momPct: 5.2 },
                            medianDays: { value: 58, momPct: 2.1 },
                            medianPricePerSqft: { value: 605, momPct: -0.3 },
                            totalVolume: { value: 2030000000, momPct: 5.9 },
                            medianLivingArea: { value: 1180, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 640000, momPct: -0.8 },
                            numProperties: { value: 420, momPct: 2.4 },
                            medianDays: { value: 42, momPct: -3.5 },
                            medianPricePerSqft: { value: 580, momPct: -0.2 },
                            totalVolume: { value: 268800000, momPct: 1.6 },
                            medianLivingArea: { value: 1150, momPct: 0.4 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 680000, momPct: -0.3 },
                            numProperties: { value: 350, momPct: -3.1 },
                            saleToListPct: { value: 94.5, momPct: -0.5 },
                            medianDays: { value: 48, momPct: 1.2 },
                            medianPricePerSqft: { value: 575, momPct: -0.4 },
                            totalVolume: { value: 238000000, momPct: -3.4 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 665000, momPct: -0.1 },
                            numProperties: { value: 370, momPct: 0.8 },
                            medianPricePerSqft: { value: 568, momPct: 0.2 },
                            medianLivingArea: { value: 1190, momPct: 0.0 },
                            totalVolume: { value: 246050000, momPct: 0.7 }
                        }
                    },
                    monthsSupply: { value: 5.2, momPct: 3.8, yoyPct: 2.1 },
                    neighborhoods: [
                        { name: 'South Beach', slug: 'south-beach-miami-beach-fl', type: 'neighborhood', medianPrice: 580000, dom: 55, inventory: 6.2 },
                        { name: 'Mid-Beach', slug: 'mid-beach-miami-beach-fl', type: 'neighborhood', medianPrice: 750000, dom: 45, inventory: 4.8 },
                        { name: 'North Beach', slug: 'north-beach-miami-beach-fl', type: 'neighborhood', medianPrice: 520000, dom: 40, inventory: 4.5 }
                    ]
                },

                // ── Additional Miami-Dade cities ──────────────────────────
                'hialeah-fl': {
                    name: 'Hialeah',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 63, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.6, momPct: -2.5, yoyPct: -12.0 },
                        soldToListPct: { value: 98.0, momPct: 0.4, yoyPct: 1.5 },
                        medianDaysOnMarket: { value: 30, momPct: -6.0, yoyPct: -15.0 },
                        medianSoldPrice: { value: 480000, momPct: 1.6, yoyPct: 8.0 },
                        medianPricePerSqft: { value: 325, momPct: 1.2, yoyPct: 6.8 },
                        priceDropPct: { value: 12.5, momPct: -0.8, yoyPct: -1.5 },
                        soldAboveListPct: { value: 30.0, momPct: 0.8, yoyPct: 2.5 }
                    },
                    medianEstimatedValue: { value: 508000, momPct: 1.4, yoyPct: 7.2, history: generateHistory({ zip: 508000, city: 480000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 499000, momPct: 2.2 }, numProperties: { value: 380, momPct: -2.5 }, medianPricePerSqft: { value: 340, momPct: 1.5 }, totalVolume: { value: 189620000, momPct: -0.3 }, medianLivingArea: { value: 1480, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 489000, momPct: 0.6 }, numProperties: { value: 1200, momPct: 2.2 }, medianDays: { value: 36, momPct: -4.2 }, medianPricePerSqft: { value: 332, momPct: 0.5 }, totalVolume: { value: 586800000, momPct: 2.8 }, medianLivingArea: { value: 1460, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 468000, momPct: 1.8 }, numProperties: { value: 320, momPct: 6.0 }, medianDays: { value: 26, momPct: -7.0 }, medianPricePerSqft: { value: 318, momPct: 1.0 }, totalVolume: { value: 149760000, momPct: 7.8 }, medianLivingArea: { value: 1440, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 480000, momPct: 1.6 }, numProperties: { value: 285, momPct: -0.4 }, saleToListPct: { value: 98.0, momPct: 0.4 }, medianDays: { value: 30, momPct: -6.0 }, medianPricePerSqft: { value: 325, momPct: 1.2 }, totalVolume: { value: 136800000, momPct: 1.2 } },
                        soldPublicRecords: { medianSoldPrice: { value: 470000, momPct: 1.1 }, numProperties: { value: 305, momPct: 1.5 }, medianPricePerSqft: { value: 318, momPct: 0.7 }, medianLivingArea: { value: 1470, momPct: 0.0 }, totalVolume: { value: 143350000, momPct: 2.6 } }
                    },
                    monthsSupply: { value: 2.6, momPct: -2.5, yoyPct: -12.0 },
                    neighborhoods: []
                },
                'homestead-fl': {
                    name: 'Homestead',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 66, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.4, momPct: -3.0, yoyPct: -14.0 },
                        soldToListPct: { value: 98.5, momPct: 0.5, yoyPct: 1.8 },
                        medianDaysOnMarket: { value: 28, momPct: -7.0, yoyPct: -18.0 },
                        medianSoldPrice: { value: 420000, momPct: 1.8, yoyPct: 9.0 },
                        medianPricePerSqft: { value: 245, momPct: 1.3, yoyPct: 7.5 },
                        priceDropPct: { value: 11.0, momPct: -1.0, yoyPct: -2.0 },
                        soldAboveListPct: { value: 32.5, momPct: 1.0, yoyPct: 3.0 }
                    },
                    medianEstimatedValue: { value: 445000, momPct: 1.5, yoyPct: 8.0, history: generateHistory({ zip: 445000, city: 420000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 439000, momPct: 2.5 }, numProperties: { value: 420, momPct: -2.0 }, medianPricePerSqft: { value: 258, momPct: 1.5 }, totalVolume: { value: 184380000, momPct: 0.5 }, medianLivingArea: { value: 1720, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 429000, momPct: 0.7 }, numProperties: { value: 1300, momPct: 2.0 }, medianDays: { value: 34, momPct: -4.5 }, medianPricePerSqft: { value: 252, momPct: 0.4 }, totalVolume: { value: 557700000, momPct: 2.7 }, medianLivingArea: { value: 1700, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 410000, momPct: 2.0 }, numProperties: { value: 350, momPct: 6.5 }, medianDays: { value: 24, momPct: -7.5 }, medianPricePerSqft: { value: 240, momPct: 1.1 }, totalVolume: { value: 143500000, momPct: 8.5 }, medianLivingArea: { value: 1680, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 420000, momPct: 1.8 }, numProperties: { value: 310, momPct: -0.3 }, saleToListPct: { value: 98.5, momPct: 0.5 }, medianDays: { value: 28, momPct: -7.0 }, medianPricePerSqft: { value: 245, momPct: 1.3 }, totalVolume: { value: 130200000, momPct: 1.5 } },
                        soldPublicRecords: { medianSoldPrice: { value: 412000, momPct: 1.2 }, numProperties: { value: 330, momPct: 1.5 }, medianPricePerSqft: { value: 238, momPct: 0.8 }, medianLivingArea: { value: 1710, momPct: 0.0 }, totalVolume: { value: 135960000, momPct: 2.7 } }
                    },
                    monthsSupply: { value: 2.4, momPct: -3.0, yoyPct: -14.0 },
                    neighborhoods: []
                },
                'doral-fl': {
                    name: 'Doral',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 56, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.1, momPct: -1.0, yoyPct: -8.0 },
                        soldToListPct: { value: 97.2, momPct: 0.2, yoyPct: 0.8 },
                        medianDaysOnMarket: { value: 35, momPct: -4.5, yoyPct: -10.5 },
                        medianSoldPrice: { value: 580000, momPct: 1.2, yoyPct: 6.0 },
                        medianPricePerSqft: { value: 340, momPct: 0.9, yoyPct: 5.2 },
                        priceDropPct: { value: 15.0, momPct: 0.3, yoyPct: 1.0 },
                        soldAboveListPct: { value: 24.0, momPct: -0.3, yoyPct: -0.5 }
                    },
                    medianEstimatedValue: { value: 612000, momPct: 1.0, yoyPct: 5.5, history: generateHistory({ zip: 612000, city: 580000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 599000, momPct: 1.8 }, numProperties: { value: 280, momPct: -2.5 }, medianPricePerSqft: { value: 355, momPct: 1.2 }, totalVolume: { value: 167720000, momPct: -0.7 }, medianLivingArea: { value: 1700, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 589000, momPct: 0.5 }, numProperties: { value: 900, momPct: 2.5 }, medianDays: { value: 42, momPct: -3.5 }, medianPricePerSqft: { value: 348, momPct: 0.4 }, totalVolume: { value: 530100000, momPct: 3.0 }, medianLivingArea: { value: 1680, momPct: -0.1 } },
                        pendingListings: { medianListPrice: { value: 565000, momPct: 1.5 }, numProperties: { value: 230, momPct: 5.5 }, medianDays: { value: 30, momPct: -6.0 }, medianPricePerSqft: { value: 332, momPct: 0.9 }, totalVolume: { value: 129950000, momPct: 7.0 }, medianLivingArea: { value: 1660, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 580000, momPct: 1.2 }, numProperties: { value: 205, momPct: -0.5 }, saleToListPct: { value: 97.2, momPct: 0.2 }, medianDays: { value: 35, momPct: -4.5 }, medianPricePerSqft: { value: 340, momPct: 0.9 }, totalVolume: { value: 118900000, momPct: 0.7 } },
                        soldPublicRecords: { medianSoldPrice: { value: 568000, momPct: 0.8 }, numProperties: { value: 218, momPct: 1.2 }, medianPricePerSqft: { value: 332, momPct: 0.5 }, medianLivingArea: { value: 1690, momPct: 0.0 }, totalVolume: { value: 123824000, momPct: 2.0 } }
                    },
                    monthsSupply: { value: 3.1, momPct: -1.0, yoyPct: -8.0 },
                    neighborhoods: []
                },
                'aventura-fl': {
                    name: 'Aventura',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 34, label: "Buyer's Market", type: 'buyer' },
                    keyMetrics: {
                        monthsOfInventory: { value: 5.8, momPct: 3.5, yoyPct: 2.5 },
                        soldToListPct: { value: 93.8, momPct: -0.6, yoyPct: -1.5 },
                        medianDaysOnMarket: { value: 52, momPct: 1.8, yoyPct: 6.0 },
                        medianSoldPrice: { value: 490000, momPct: -0.3, yoyPct: 2.2 },
                        medianPricePerSqft: { value: 420, momPct: -0.4, yoyPct: 1.8 },
                        priceDropPct: { value: 28.0, momPct: 3.5, yoyPct: 7.0 },
                        soldAboveListPct: { value: 10.5, momPct: -2.0, yoyPct: -4.5 }
                    },
                    medianEstimatedValue: { value: 518000, momPct: -0.2, yoyPct: 1.8, history: generateHistory({ zip: 518000, city: 490000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 525000, momPct: 0.8 }, numProperties: { value: 180, momPct: -3.5 }, medianPricePerSqft: { value: 438, momPct: 0.3 }, totalVolume: { value: 94500000, momPct: -2.7 }, medianLivingArea: { value: 1180, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 515000, momPct: 0.3 }, numProperties: { value: 950, momPct: 5.0 }, medianDays: { value: 62, momPct: 2.5 }, medianPricePerSqft: { value: 432, momPct: -0.2 }, totalVolume: { value: 489250000, momPct: 5.3 }, medianLivingArea: { value: 1160, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 472000, momPct: -0.5 }, numProperties: { value: 110, momPct: 2.0 }, medianDays: { value: 45, momPct: -2.5 }, medianPricePerSqft: { value: 405, momPct: -0.3 }, totalVolume: { value: 51920000, momPct: 1.5 }, medianLivingArea: { value: 1140, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 490000, momPct: -0.3 }, numProperties: { value: 95, momPct: -1.5 }, saleToListPct: { value: 93.8, momPct: -0.6 }, medianDays: { value: 52, momPct: 1.8 }, medianPricePerSqft: { value: 420, momPct: -0.4 }, totalVolume: { value: 46550000, momPct: -1.8 } },
                        soldPublicRecords: { medianSoldPrice: { value: 480000, momPct: -0.4 }, numProperties: { value: 102, momPct: 0.8 }, medianPricePerSqft: { value: 412, momPct: -0.2 }, medianLivingArea: { value: 1170, momPct: 0.0 }, totalVolume: { value: 48960000, momPct: 0.4 } }
                    },
                    monthsSupply: { value: 5.8, momPct: 3.5, yoyPct: 2.5 },
                    neighborhoods: []
                },
                'sunny-isles-beach-fl': {
                    name: 'Sunny Isles Beach',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 32, label: "Buyer's Market", type: 'buyer' },
                    keyMetrics: {
                        monthsOfInventory: { value: 6.0, momPct: 3.8, yoyPct: 3.0 },
                        soldToListPct: { value: 93.5, momPct: -0.7, yoyPct: -1.8 },
                        medianDaysOnMarket: { value: 55, momPct: 2.0, yoyPct: 7.0 },
                        medianSoldPrice: { value: 520000, momPct: -0.4, yoyPct: 2.0 },
                        medianPricePerSqft: { value: 450, momPct: -0.5, yoyPct: 1.5 },
                        priceDropPct: { value: 30.0, momPct: 4.0, yoyPct: 8.0 },
                        soldAboveListPct: { value: 9.5, momPct: -2.2, yoyPct: -5.0 }
                    },
                    medianEstimatedValue: { value: 548000, momPct: -0.3, yoyPct: 1.5, history: generateHistory({ zip: 548000, city: 520000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 559000, momPct: 0.5 }, numProperties: { value: 160, momPct: -4.0 }, medianPricePerSqft: { value: 468, momPct: 0.2 }, totalVolume: { value: 89440000, momPct: -3.5 }, medianLivingArea: { value: 1150, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 545000, momPct: 0.2 }, numProperties: { value: 880, momPct: 5.5 }, medianDays: { value: 65, momPct: 3.0 }, medianPricePerSqft: { value: 460, momPct: -0.3 }, totalVolume: { value: 479600000, momPct: 5.7 }, medianLivingArea: { value: 1130, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 498000, momPct: -0.8 }, numProperties: { value: 95, momPct: 1.5 }, medianDays: { value: 48, momPct: -2.0 }, medianPricePerSqft: { value: 430, momPct: -0.4 }, totalVolume: { value: 47310000, momPct: 0.7 }, medianLivingArea: { value: 1110, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 520000, momPct: -0.4 }, numProperties: { value: 85, momPct: -2.0 }, saleToListPct: { value: 93.5, momPct: -0.7 }, medianDays: { value: 55, momPct: 2.0 }, medianPricePerSqft: { value: 450, momPct: -0.5 }, totalVolume: { value: 44200000, momPct: -2.4 } },
                        soldPublicRecords: { medianSoldPrice: { value: 510000, momPct: -0.5 }, numProperties: { value: 90, momPct: 0.5 }, medianPricePerSqft: { value: 442, momPct: -0.3 }, medianLivingArea: { value: 1140, momPct: 0.0 }, totalVolume: { value: 45900000, momPct: 0.0 } }
                    },
                    monthsSupply: { value: 6.0, momPct: 3.8, yoyPct: 3.0 },
                    neighborhoods: []
                },
                'key-biscayne-fl': {
                    name: 'Key Biscayne',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 28, label: "Buyer's Market", type: 'buyer' },
                    keyMetrics: {
                        monthsOfInventory: { value: 7.2, momPct: 4.5, yoyPct: 4.0 },
                        soldToListPct: { value: 91.0, momPct: -1.0, yoyPct: -2.5 },
                        medianDaysOnMarket: { value: 65, momPct: 3.0, yoyPct: 8.5 },
                        medianSoldPrice: { value: 1650000, momPct: -0.5, yoyPct: 1.8 },
                        medianPricePerSqft: { value: 750, momPct: -0.3, yoyPct: 1.2 },
                        priceDropPct: { value: 30.0, momPct: 3.8, yoyPct: 7.5 },
                        soldAboveListPct: { value: 8.5, momPct: -2.5, yoyPct: -5.5 }
                    },
                    medianEstimatedValue: { value: 1750000, momPct: -0.3, yoyPct: 1.5, history: generateHistory({ zip: 1750000, city: 1650000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 1850000, momPct: 0.5 }, numProperties: { value: 25, momPct: -5.0 }, medianPricePerSqft: { value: 800, momPct: 0.2 }, totalVolume: { value: 46250000, momPct: -4.5 }, medianLivingArea: { value: 2300, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 1900000, momPct: 0.8 }, numProperties: { value: 165, momPct: 5.5 }, medianDays: { value: 78, momPct: 3.5 }, medianPricePerSqft: { value: 780, momPct: -0.2 }, totalVolume: { value: 313500000, momPct: 6.3 }, medianLivingArea: { value: 2250, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 1550000, momPct: -1.0 }, numProperties: { value: 15, momPct: 1.5 }, medianDays: { value: 55, momPct: -2.0 }, medianPricePerSqft: { value: 710, momPct: -0.5 }, totalVolume: { value: 23250000, momPct: 0.5 }, medianLivingArea: { value: 2200, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 1650000, momPct: -0.5 }, numProperties: { value: 12, momPct: -2.5 }, saleToListPct: { value: 91.0, momPct: -1.0 }, medianDays: { value: 65, momPct: 3.0 }, medianPricePerSqft: { value: 750, momPct: -0.3 }, totalVolume: { value: 19800000, momPct: -3.0 } },
                        soldPublicRecords: { medianSoldPrice: { value: 1600000, momPct: -0.6 }, numProperties: { value: 14, momPct: 0.5 }, medianPricePerSqft: { value: 730, momPct: -0.4 }, medianLivingArea: { value: 2280, momPct: 0.0 }, totalVolume: { value: 22400000, momPct: -0.1 } }
                    },
                    monthsSupply: { value: 7.2, momPct: 4.5, yoyPct: 4.0 },
                    neighborhoods: []
                },
                'pinecrest-fl': {
                    name: 'Pinecrest',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 40, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 5.0, momPct: 2.2, yoyPct: -1.0 },
                        soldToListPct: { value: 94.5, momPct: -0.3, yoyPct: -0.8 },
                        medianDaysOnMarket: { value: 50, momPct: -1.5, yoyPct: -3.0 },
                        medianSoldPrice: { value: 1450000, momPct: 0.5, yoyPct: 3.5 },
                        medianPricePerSqft: { value: 490, momPct: 0.4, yoyPct: 3.0 },
                        priceDropPct: { value: 23.0, momPct: 2.5, yoyPct: 5.0 },
                        soldAboveListPct: { value: 14.0, momPct: -1.2, yoyPct: -3.0 }
                    },
                    medianEstimatedValue: { value: 1520000, momPct: 0.4, yoyPct: 3.2, history: generateHistory({ zip: 1520000, city: 1450000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 1580000, momPct: 1.0 }, numProperties: { value: 45, momPct: -4.0 }, medianPricePerSqft: { value: 520, momPct: 0.5 }, totalVolume: { value: 71100000, momPct: -3.0 }, medianLivingArea: { value: 2950, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 1550000, momPct: 0.6 }, numProperties: { value: 200, momPct: 3.5 }, medianDays: { value: 60, momPct: -1.0 }, medianPricePerSqft: { value: 510, momPct: 0.2 }, totalVolume: { value: 310000000, momPct: 4.1 }, medianLivingArea: { value: 2900, momPct: -0.1 } },
                        pendingListings: { medianListPrice: { value: 1380000, momPct: 0.5 }, numProperties: { value: 32, momPct: 3.5 }, medianDays: { value: 42, momPct: -4.0 }, medianPricePerSqft: { value: 475, momPct: 0.4 }, totalVolume: { value: 44160000, momPct: 4.0 }, medianLivingArea: { value: 2850, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 1450000, momPct: 0.5 }, numProperties: { value: 28, momPct: -1.5 }, saleToListPct: { value: 94.5, momPct: -0.3 }, medianDays: { value: 50, momPct: -1.5 }, medianPricePerSqft: { value: 490, momPct: 0.4 }, totalVolume: { value: 40600000, momPct: -1.0 } },
                        soldPublicRecords: { medianSoldPrice: { value: 1420000, momPct: 0.3 }, numProperties: { value: 30, momPct: 0.8 }, medianPricePerSqft: { value: 480, momPct: 0.3 }, medianLivingArea: { value: 2920, momPct: 0.0 }, totalVolume: { value: 42600000, momPct: 1.1 } }
                    },
                    monthsSupply: { value: 5.0, momPct: 2.2, yoyPct: -1.0 },
                    neighborhoods: []
                },
                'palmetto-bay-fl': {
                    name: 'Palmetto Bay',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 52, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.5, momPct: -0.5, yoyPct: -5.5 },
                        soldToListPct: { value: 96.5, momPct: 0.1, yoyPct: 0.5 },
                        medianDaysOnMarket: { value: 38, momPct: -3.5, yoyPct: -8.0 },
                        medianSoldPrice: { value: 780000, momPct: 1.0, yoyPct: 5.0 },
                        medianPricePerSqft: { value: 380, momPct: 0.7, yoyPct: 4.2 },
                        priceDropPct: { value: 17.5, momPct: 0.8, yoyPct: 2.0 },
                        soldAboveListPct: { value: 20.0, momPct: -0.5, yoyPct: -1.2 }
                    },
                    medianEstimatedValue: { value: 822000, momPct: 0.8, yoyPct: 4.5, history: generateHistory({ zip: 822000, city: 780000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 815000, momPct: 1.5 }, numProperties: { value: 65, momPct: -2.5 }, medianPricePerSqft: { value: 398, momPct: 1.0 }, totalVolume: { value: 52975000, momPct: -1.0 }, medianLivingArea: { value: 2100, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 799000, momPct: 0.5 }, numProperties: { value: 210, momPct: 2.5 }, medianDays: { value: 45, momPct: -3.0 }, medianPricePerSqft: { value: 390, momPct: 0.3 }, totalVolume: { value: 167790000, momPct: 3.0 }, medianLivingArea: { value: 2080, momPct: -0.1 } },
                        pendingListings: { medianListPrice: { value: 760000, momPct: 1.0 }, numProperties: { value: 48, momPct: 4.5 }, medianDays: { value: 33, momPct: -5.0 }, medianPricePerSqft: { value: 370, momPct: 0.6 }, totalVolume: { value: 36480000, momPct: 5.5 }, medianLivingArea: { value: 2060, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 780000, momPct: 1.0 }, numProperties: { value: 42, momPct: -0.5 }, saleToListPct: { value: 96.5, momPct: 0.1 }, medianDays: { value: 38, momPct: -3.5 }, medianPricePerSqft: { value: 380, momPct: 0.7 }, totalVolume: { value: 32760000, momPct: 0.5 } },
                        soldPublicRecords: { medianSoldPrice: { value: 765000, momPct: 0.7 }, numProperties: { value: 45, momPct: 0.8 }, medianPricePerSqft: { value: 372, momPct: 0.4 }, medianLivingArea: { value: 2090, momPct: 0.0 }, totalVolume: { value: 34425000, momPct: 1.5 } }
                    },
                    monthsSupply: { value: 3.5, momPct: -0.5, yoyPct: -5.5 },
                    neighborhoods: []
                },
                'cutler-bay-fl': {
                    name: 'Cutler Bay',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 62, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.6, momPct: -2.2, yoyPct: -11.0 },
                        soldToListPct: { value: 98.0, momPct: 0.4, yoyPct: 1.3 },
                        medianDaysOnMarket: { value: 30, momPct: -5.5, yoyPct: -13.0 },
                        medianSoldPrice: { value: 520000, momPct: 1.5, yoyPct: 7.5 },
                        medianPricePerSqft: { value: 290, momPct: 1.0, yoyPct: 6.0 },
                        priceDropPct: { value: 12.5, momPct: -0.6, yoyPct: -1.2 },
                        soldAboveListPct: { value: 28.5, momPct: 0.6, yoyPct: 2.0 }
                    },
                    medianEstimatedValue: { value: 548000, momPct: 1.3, yoyPct: 6.8, history: generateHistory({ zip: 548000, city: 520000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 539000, momPct: 2.0 }, numProperties: { value: 120, momPct: -2.0 }, medianPricePerSqft: { value: 302, momPct: 1.3 }, totalVolume: { value: 64680000, momPct: 0.0 }, medianLivingArea: { value: 1800, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 529000, momPct: 0.6 }, numProperties: { value: 380, momPct: 2.2 }, medianDays: { value: 36, momPct: -4.0 }, medianPricePerSqft: { value: 296, momPct: 0.4 }, totalVolume: { value: 201020000, momPct: 2.8 }, medianLivingArea: { value: 1780, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 508000, momPct: 1.5 }, numProperties: { value: 100, momPct: 5.5 }, medianDays: { value: 26, momPct: -6.5 }, medianPricePerSqft: { value: 282, momPct: 0.9 }, totalVolume: { value: 50800000, momPct: 7.0 }, medianLivingArea: { value: 1760, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 520000, momPct: 1.5 }, numProperties: { value: 90, momPct: -0.5 }, saleToListPct: { value: 98.0, momPct: 0.4 }, medianDays: { value: 30, momPct: -5.5 }, medianPricePerSqft: { value: 290, momPct: 1.0 }, totalVolume: { value: 46800000, momPct: 1.0 } },
                        soldPublicRecords: { medianSoldPrice: { value: 510000, momPct: 1.0 }, numProperties: { value: 96, momPct: 1.2 }, medianPricePerSqft: { value: 282, momPct: 0.6 }, medianLivingArea: { value: 1790, momPct: 0.0 }, totalVolume: { value: 48960000, momPct: 2.2 } }
                    },
                    monthsSupply: { value: 2.6, momPct: -2.2, yoyPct: -11.0 },
                    neighborhoods: []
                },
                'miami-gardens-fl': {
                    name: 'Miami Gardens',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 65, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.3, momPct: -3.0, yoyPct: -14.0 },
                        soldToListPct: { value: 98.5, momPct: 0.5, yoyPct: 1.8 },
                        medianDaysOnMarket: { value: 28, momPct: -6.5, yoyPct: -16.0 },
                        medianSoldPrice: { value: 420000, momPct: 1.8, yoyPct: 9.0 },
                        medianPricePerSqft: { value: 285, momPct: 1.3, yoyPct: 7.5 },
                        priceDropPct: { value: 10.5, momPct: -1.0, yoyPct: -2.0 },
                        soldAboveListPct: { value: 33.0, momPct: 1.0, yoyPct: 3.5 }
                    },
                    medianEstimatedValue: { value: 445000, momPct: 1.5, yoyPct: 8.0, history: generateHistory({ zip: 445000, city: 420000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 435000, momPct: 2.3 }, numProperties: { value: 200, momPct: -1.5 }, medianPricePerSqft: { value: 298, momPct: 1.5 }, totalVolume: { value: 87000000, momPct: 0.8 }, medianLivingArea: { value: 1500, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 429000, momPct: 0.7 }, numProperties: { value: 600, momPct: 1.8 }, medianDays: { value: 34, momPct: -4.5 }, medianPricePerSqft: { value: 292, momPct: 0.5 }, totalVolume: { value: 257400000, momPct: 2.5 }, medianLivingArea: { value: 1480, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 408000, momPct: 2.0 }, numProperties: { value: 170, momPct: 6.5 }, medianDays: { value: 24, momPct: -7.5 }, medianPricePerSqft: { value: 278, momPct: 1.1 }, totalVolume: { value: 69360000, momPct: 8.5 }, medianLivingArea: { value: 1460, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 420000, momPct: 1.8 }, numProperties: { value: 150, momPct: -0.3 }, saleToListPct: { value: 98.5, momPct: 0.5 }, medianDays: { value: 28, momPct: -6.5 }, medianPricePerSqft: { value: 285, momPct: 1.3 }, totalVolume: { value: 63000000, momPct: 1.5 } },
                        soldPublicRecords: { medianSoldPrice: { value: 410000, momPct: 1.2 }, numProperties: { value: 160, momPct: 1.5 }, medianPricePerSqft: { value: 278, momPct: 0.8 }, medianLivingArea: { value: 1490, momPct: 0.0 }, totalVolume: { value: 65600000, momPct: 2.7 } }
                    },
                    monthsSupply: { value: 2.3, momPct: -3.0, yoyPct: -14.0 },
                    neighborhoods: []
                },
                'north-miami-fl': {
                    name: 'North Miami',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 58, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.8, momPct: -1.5, yoyPct: -9.5 },
                        soldToListPct: { value: 97.5, momPct: 0.3, yoyPct: 1.0 },
                        medianDaysOnMarket: { value: 32, momPct: -5.0, yoyPct: -11.5 },
                        medianSoldPrice: { value: 450000, momPct: 1.5, yoyPct: 7.5 },
                        medianPricePerSqft: { value: 330, momPct: 1.0, yoyPct: 6.2 },
                        priceDropPct: { value: 14.0, momPct: -0.2, yoyPct: 0.2 },
                        soldAboveListPct: { value: 26.5, momPct: 0.4, yoyPct: 1.5 }
                    },
                    medianEstimatedValue: { value: 475000, momPct: 1.3, yoyPct: 6.8, history: generateHistory({ zip: 475000, city: 450000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 469000, momPct: 2.0 }, numProperties: { value: 160, momPct: -2.0 }, medianPricePerSqft: { value: 345, momPct: 1.2 }, totalVolume: { value: 75040000, momPct: 0.0 }, medianLivingArea: { value: 1380, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 459000, momPct: 0.6 }, numProperties: { value: 520, momPct: 2.2 }, medianDays: { value: 38, momPct: -3.8 }, medianPricePerSqft: { value: 338, momPct: 0.4 }, totalVolume: { value: 238680000, momPct: 2.8 }, medianLivingArea: { value: 1360, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 435000, momPct: 1.5 }, numProperties: { value: 130, momPct: 5.5 }, medianDays: { value: 28, momPct: -6.5 }, medianPricePerSqft: { value: 322, momPct: 0.9 }, totalVolume: { value: 56550000, momPct: 7.0 }, medianLivingArea: { value: 1340, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 450000, momPct: 1.5 }, numProperties: { value: 115, momPct: -0.5 }, saleToListPct: { value: 97.5, momPct: 0.3 }, medianDays: { value: 32, momPct: -5.0 }, medianPricePerSqft: { value: 330, momPct: 1.0 }, totalVolume: { value: 51750000, momPct: 1.0 } },
                        soldPublicRecords: { medianSoldPrice: { value: 440000, momPct: 1.0 }, numProperties: { value: 122, momPct: 1.2 }, medianPricePerSqft: { value: 322, momPct: 0.6 }, medianLivingArea: { value: 1370, momPct: 0.0 }, totalVolume: { value: 53680000, momPct: 2.2 } }
                    },
                    monthsSupply: { value: 2.8, momPct: -1.5, yoyPct: -9.5 },
                    neighborhoods: []
                },
                'north-miami-beach-fl': {
                    name: 'North Miami Beach',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 56, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.0, momPct: -1.2, yoyPct: -8.5 },
                        soldToListPct: { value: 97.2, momPct: 0.2, yoyPct: 0.8 },
                        medianDaysOnMarket: { value: 34, momPct: -4.5, yoyPct: -10.5 },
                        medianSoldPrice: { value: 410000, momPct: 1.4, yoyPct: 7.0 },
                        medianPricePerSqft: { value: 318, momPct: 1.0, yoyPct: 5.8 },
                        priceDropPct: { value: 15.0, momPct: 0.2, yoyPct: 0.5 },
                        soldAboveListPct: { value: 25.0, momPct: 0.2, yoyPct: 1.0 }
                    },
                    medianEstimatedValue: { value: 432000, momPct: 1.2, yoyPct: 6.2, history: generateHistory({ zip: 432000, city: 410000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 425000, momPct: 1.8 }, numProperties: { value: 140, momPct: -2.0 }, medianPricePerSqft: { value: 332, momPct: 1.2 }, totalVolume: { value: 59500000, momPct: -0.2 }, medianLivingArea: { value: 1320, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 418000, momPct: 0.5 }, numProperties: { value: 460, momPct: 2.2 }, medianDays: { value: 40, momPct: -3.5 }, medianPricePerSqft: { value: 325, momPct: 0.4 }, totalVolume: { value: 192280000, momPct: 2.7 }, medianLivingArea: { value: 1300, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 398000, momPct: 1.5 }, numProperties: { value: 118, momPct: 5.5 }, medianDays: { value: 30, momPct: -6.0 }, medianPricePerSqft: { value: 310, momPct: 0.9 }, totalVolume: { value: 46964000, momPct: 7.0 }, medianLivingArea: { value: 1280, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 410000, momPct: 1.4 }, numProperties: { value: 105, momPct: -0.5 }, saleToListPct: { value: 97.2, momPct: 0.2 }, medianDays: { value: 34, momPct: -4.5 }, medianPricePerSqft: { value: 318, momPct: 1.0 }, totalVolume: { value: 43050000, momPct: 0.9 } },
                        soldPublicRecords: { medianSoldPrice: { value: 400000, momPct: 0.9 }, numProperties: { value: 112, momPct: 1.2 }, medianPricePerSqft: { value: 310, momPct: 0.6 }, medianLivingArea: { value: 1310, momPct: 0.0 }, totalVolume: { value: 44800000, momPct: 2.1 } }
                    },
                    monthsSupply: { value: 3.0, momPct: -1.2, yoyPct: -8.5 },
                    neighborhoods: []
                },
                'miami-lakes-fl': {
                    name: 'Miami Lakes',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 58, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.8, momPct: -1.5, yoyPct: -9.5 },
                        soldToListPct: { value: 97.5, momPct: 0.3, yoyPct: 1.0 },
                        medianDaysOnMarket: { value: 32, momPct: -5.0, yoyPct: -12.0 },
                        medianSoldPrice: { value: 560000, momPct: 1.3, yoyPct: 6.5 },
                        medianPricePerSqft: { value: 300, momPct: 0.9, yoyPct: 5.2 },
                        priceDropPct: { value: 14.0, momPct: -0.2, yoyPct: 0.2 },
                        soldAboveListPct: { value: 26.0, momPct: 0.4, yoyPct: 1.2 }
                    },
                    medianEstimatedValue: { value: 590000, momPct: 1.1, yoyPct: 5.8, history: generateHistory({ zip: 590000, city: 560000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 579000, momPct: 1.8 }, numProperties: { value: 95, momPct: -2.5 }, medianPricePerSqft: { value: 312, momPct: 1.2 }, totalVolume: { value: 55005000, momPct: -0.7 }, medianLivingArea: { value: 1880, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 569000, momPct: 0.5 }, numProperties: { value: 300, momPct: 2.2 }, medianDays: { value: 38, momPct: -3.8 }, medianPricePerSqft: { value: 305, momPct: 0.4 }, totalVolume: { value: 170700000, momPct: 2.7 }, medianLivingArea: { value: 1860, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 545000, momPct: 1.5 }, numProperties: { value: 78, momPct: 5.5 }, medianDays: { value: 28, momPct: -6.5 }, medianPricePerSqft: { value: 292, momPct: 0.9 }, totalVolume: { value: 42510000, momPct: 7.0 }, medianLivingArea: { value: 1840, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 560000, momPct: 1.3 }, numProperties: { value: 68, momPct: -0.5 }, saleToListPct: { value: 97.5, momPct: 0.3 }, medianDays: { value: 32, momPct: -5.0 }, medianPricePerSqft: { value: 300, momPct: 0.9 }, totalVolume: { value: 38080000, momPct: 0.8 } },
                        soldPublicRecords: { medianSoldPrice: { value: 548000, momPct: 0.9 }, numProperties: { value: 72, momPct: 1.2 }, medianPricePerSqft: { value: 292, momPct: 0.5 }, medianLivingArea: { value: 1870, momPct: 0.0 }, totalVolume: { value: 39456000, momPct: 2.1 } }
                    },
                    monthsSupply: { value: 2.8, momPct: -1.5, yoyPct: -9.5 },
                    neighborhoods: []
                },
                'miami-springs-fl': {
                    name: 'Miami Springs',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 55, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.0, momPct: -1.0, yoyPct: -7.5 },
                        soldToListPct: { value: 97.0, momPct: 0.2, yoyPct: 0.8 },
                        medianDaysOnMarket: { value: 35, momPct: -4.2, yoyPct: -9.5 },
                        medianSoldPrice: { value: 620000, momPct: 1.0, yoyPct: 5.5 },
                        medianPricePerSqft: { value: 385, momPct: 0.7, yoyPct: 4.5 },
                        priceDropPct: { value: 15.5, momPct: 0.5, yoyPct: 1.2 },
                        soldAboveListPct: { value: 23.0, momPct: -0.3, yoyPct: -0.5 }
                    },
                    medianEstimatedValue: { value: 652000, momPct: 0.8, yoyPct: 5.0, history: generateHistory({ zip: 652000, city: 620000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 645000, momPct: 1.5 }, numProperties: { value: 35, momPct: -2.5 }, medianPricePerSqft: { value: 400, momPct: 1.0 }, totalVolume: { value: 22575000, momPct: -1.0 }, medianLivingArea: { value: 1620, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 635000, momPct: 0.5 }, numProperties: { value: 110, momPct: 2.5 }, medianDays: { value: 42, momPct: -3.2 }, medianPricePerSqft: { value: 392, momPct: 0.3 }, totalVolume: { value: 69850000, momPct: 3.0 }, medianLivingArea: { value: 1600, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 605000, momPct: 1.0 }, numProperties: { value: 28, momPct: 4.5 }, medianDays: { value: 30, momPct: -5.5 }, medianPricePerSqft: { value: 378, momPct: 0.6 }, totalVolume: { value: 16940000, momPct: 5.5 }, medianLivingArea: { value: 1580, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 620000, momPct: 1.0 }, numProperties: { value: 25, momPct: -0.5 }, saleToListPct: { value: 97.0, momPct: 0.2 }, medianDays: { value: 35, momPct: -4.2 }, medianPricePerSqft: { value: 385, momPct: 0.7 }, totalVolume: { value: 15500000, momPct: 0.5 } },
                        soldPublicRecords: { medianSoldPrice: { value: 608000, momPct: 0.7 }, numProperties: { value: 27, momPct: 1.0 }, medianPricePerSqft: { value: 378, momPct: 0.4 }, medianLivingArea: { value: 1610, momPct: 0.0 }, totalVolume: { value: 16416000, momPct: 1.7 } }
                    },
                    monthsSupply: { value: 3.0, momPct: -1.0, yoyPct: -7.5 },
                    neighborhoods: []
                },
                'kendall-fl': {
                    name: 'Kendall',
                    type: 'city',
                    county: 'Miami-Dade',
                    state: 'FL',
                    parentLocation: 'miami-dade-county-fl',
                    marketScore: { value: 61, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.7, momPct: -2.0, yoyPct: -10.5 },
                        soldToListPct: { value: 97.8, momPct: 0.3, yoyPct: 1.2 },
                        medianDaysOnMarket: { value: 30, momPct: -5.5, yoyPct: -12.5 },
                        medianSoldPrice: { value: 540000, momPct: 1.5, yoyPct: 7.2 },
                        medianPricePerSqft: { value: 305, momPct: 1.0, yoyPct: 6.0 },
                        priceDropPct: { value: 13.0, momPct: -0.5, yoyPct: -0.8 },
                        soldAboveListPct: { value: 27.5, momPct: 0.5, yoyPct: 1.5 }
                    },
                    medianEstimatedValue: { value: 570000, momPct: 1.3, yoyPct: 6.5, history: generateHistory({ zip: 570000, city: 540000, county: 585000, state: 420000 }, 36) },
                    sections: {
                        newListings: { medianListPrice: { value: 559000, momPct: 2.0 }, numProperties: { value: 250, momPct: -2.0 }, medianPricePerSqft: { value: 318, momPct: 1.3 }, totalVolume: { value: 139750000, momPct: 0.0 }, medianLivingArea: { value: 1780, momPct: 0.0 } },
                        activeListings: { medianListPrice: { value: 549000, momPct: 0.5 }, numProperties: { value: 800, momPct: 2.2 }, medianDays: { value: 36, momPct: -4.0 }, medianPricePerSqft: { value: 312, momPct: 0.4 }, totalVolume: { value: 439200000, momPct: 2.7 }, medianLivingArea: { value: 1760, momPct: 0.0 } },
                        pendingListings: { medianListPrice: { value: 525000, momPct: 1.5 }, numProperties: { value: 210, momPct: 5.5 }, medianDays: { value: 26, momPct: -6.5 }, medianPricePerSqft: { value: 298, momPct: 0.9 }, totalVolume: { value: 110250000, momPct: 7.0 }, medianLivingArea: { value: 1740, momPct: 0.2 } },
                        closedListings: { medianSoldPrice: { value: 540000, momPct: 1.5 }, numProperties: { value: 185, momPct: -0.5 }, saleToListPct: { value: 97.8, momPct: 0.3 }, medianDays: { value: 30, momPct: -5.5 }, medianPricePerSqft: { value: 305, momPct: 1.0 }, totalVolume: { value: 99900000, momPct: 1.0 } },
                        soldPublicRecords: { medianSoldPrice: { value: 528000, momPct: 1.0 }, numProperties: { value: 198, momPct: 1.2 }, medianPricePerSqft: { value: 298, momPct: 0.6 }, medianLivingArea: { value: 1770, momPct: 0.0 }, totalVolume: { value: 104544000, momPct: 2.2 } }
                    },
                    monthsSupply: { value: 2.7, momPct: -2.0, yoyPct: -10.5 },
                    neighborhoods: []
                },

                // ── Broward County ─────────────────────────────────────────
                'broward-county-fl': {
                    name: 'Broward County',
                    type: 'county',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'florida',
                    marketScore: { value: 50, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.8, momPct: 0.5, yoyPct: -6.8 },
                        soldToListPct: { value: 96.8, momPct: 0.1, yoyPct: 0.5 },
                        medianDaysOnMarket: { value: 38, momPct: -4.2, yoyPct: -9.5 },
                        medianSoldPrice: { value: 460000, momPct: 1.1, yoyPct: 5.8 },
                        medianPricePerSqft: { value: 295, momPct: 0.8, yoyPct: 5.0 },
                        priceDropPct: { value: 17.2, momPct: 0.9, yoyPct: 2.2 },
                        soldAboveListPct: { value: 22.5, momPct: -0.6, yoyPct: -1.5 }
                    },
                    medianEstimatedValue: {
                        value: 485000,
                        momPct: 0.9,
                        yoyPct: 5.2,
                        history: generateHistory({ zip: 485000, city: 485000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 479000, momPct: 1.5 },
                            numProperties: { value: 4100, momPct: -2.8 },
                            medianPricePerSqft: { value: 305, momPct: 1.1 },
                            totalVolume: { value: 1963900000, momPct: -1.3 },
                            medianLivingArea: { value: 1580, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 489000, momPct: 0.6 },
                            numProperties: { value: 14200, momPct: 3.2 },
                            medianDays: { value: 48, momPct: -3.8 },
                            medianPricePerSqft: { value: 310, momPct: 0.5 },
                            totalVolume: { value: 6943800000, momPct: 3.8 },
                            medianLivingArea: { value: 1560, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 435000, momPct: 1.8 },
                            numProperties: { value: 3200, momPct: 5.5 },
                            medianDays: { value: 34, momPct: -6.5 },
                            medianPricePerSqft: { value: 285, momPct: 0.9 },
                            totalVolume: { value: 1392000000, momPct: 7.3 },
                            medianLivingArea: { value: 1520, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 460000, momPct: 1.1 },
                            numProperties: { value: 2800, momPct: -0.7 },
                            saleToListPct: { value: 96.8, momPct: 0.1 },
                            medianDays: { value: 38, momPct: -4.2 },
                            medianPricePerSqft: { value: 295, momPct: 0.8 },
                            totalVolume: { value: 1288000000, momPct: 0.4 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 448000, momPct: 0.8 },
                            numProperties: { value: 3050, momPct: 1.2 },
                            medianPricePerSqft: { value: 288, momPct: 0.5 },
                            medianLivingArea: { value: 1570, momPct: -0.1 },
                            totalVolume: { value: 1366400000, momPct: 2.0 }
                        }
                    },
                    monthsSupply: { value: 3.8, momPct: 0.5, yoyPct: -6.8 },
                    neighborhoods: [
                        { name: 'Fort Lauderdale', slug: 'fort-lauderdale-fl', type: 'city', medianPrice: 480000, dom: 36, inventory: 3.5 },
                        { name: 'Hollywood', slug: 'hollywood-fl', type: 'city', medianPrice: 430000, dom: 35, inventory: 3.3 },
                        { name: 'Pompano Beach', slug: 'pompano-beach-fl', type: 'city', medianPrice: 385000, dom: 32, inventory: 3.0 },
                        { name: 'Coral Springs', slug: 'coral-springs-fl', type: 'city', medianPrice: 520000, dom: 28, inventory: 2.5 },
                        { name: 'Pembroke Pines', slug: 'pembroke-pines-fl', type: 'city', medianPrice: 490000, dom: 30, inventory: 2.8 },
                        { name: 'Plantation', slug: 'plantation-fl', type: 'city', medianPrice: 475000, dom: 34, inventory: 3.2 },
                        { name: 'Miramar', slug: 'miramar-fl', type: 'city', medianPrice: 510000, dom: 29, inventory: 2.6 },
                        { name: 'Davie', slug: 'davie-fl', type: 'city', medianPrice: 485000, dom: 33, inventory: 3.1 },
                        { name: 'Weston', slug: 'weston-fl', type: 'city', medianPrice: 620000, dom: 35, inventory: 3.4 },
                        { name: 'Sunrise', slug: 'sunrise-fl', type: 'city', medianPrice: 380000, dom: 30, inventory: 2.7 },
                        { name: 'Deerfield Beach', slug: 'deerfield-beach-fl', type: 'city', medianPrice: 350000, dom: 34, inventory: 3.3 },
                        { name: 'Coconut Creek', slug: 'coconut-creek-fl', type: 'city', medianPrice: 390000, dom: 31, inventory: 2.9 },
                        { name: 'Lauderhill', slug: 'lauderhill-fl', type: 'city', medianPrice: 290000, dom: 32, inventory: 3.0 },
                        { name: 'Tamarac', slug: 'tamarac-fl', type: 'city', medianPrice: 310000, dom: 30, inventory: 2.8 },
                        { name: 'Margate', slug: 'margate-fl', type: 'city', medianPrice: 320000, dom: 29, inventory: 2.7 },
                        { name: 'Hallandale Beach', slug: 'hallandale-beach-fl', type: 'city', medianPrice: 340000, dom: 42, inventory: 4.8 },
                        { name: 'Lauderdale-by-the-Sea', slug: 'lauderdale-by-the-sea-fl', type: 'city', medianPrice: 420000, dom: 45, inventory: 5.0 }
                    ]
                },
                'fort-lauderdale-fl': {
                    name: 'Fort Lauderdale',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 55, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.5, momPct: -1.2, yoyPct: -8.5 },
                        soldToListPct: { value: 97.2, momPct: 0.2, yoyPct: 0.9 },
                        medianDaysOnMarket: { value: 36, momPct: -5.0, yoyPct: -11.0 },
                        medianSoldPrice: { value: 480000, momPct: 1.3, yoyPct: 6.5 },
                        medianPricePerSqft: { value: 345, momPct: 1.0, yoyPct: 5.8 },
                        priceDropPct: { value: 16.5, momPct: 0.7, yoyPct: 1.8 },
                        soldAboveListPct: { value: 24.2, momPct: -0.5, yoyPct: -1.0 }
                    },
                    medianEstimatedValue: {
                        value: 510000,
                        momPct: 1.1,
                        yoyPct: 6.0,
                        history: generateHistory({ zip: 510000, city: 480000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 515000, momPct: 2.0 },
                            numProperties: { value: 680, momPct: -2.5 },
                            medianPricePerSqft: { value: 360, momPct: 1.5 },
                            totalVolume: { value: 350200000, momPct: -0.5 },
                            medianLivingArea: { value: 1450, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 499000, momPct: 0.4 },
                            numProperties: { value: 2400, momPct: 3.0 },
                            medianDays: { value: 44, momPct: -3.5 },
                            medianPricePerSqft: { value: 350, momPct: 0.6 },
                            totalVolume: { value: 1197600000, momPct: 3.4 },
                            medianLivingArea: { value: 1420, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 465000, momPct: 1.5 },
                            numProperties: { value: 520, momPct: 5.8 },
                            medianDays: { value: 32, momPct: -6.8 },
                            medianPricePerSqft: { value: 338, momPct: 1.0 },
                            totalVolume: { value: 241800000, momPct: 7.3 },
                            medianLivingArea: { value: 1400, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 480000, momPct: 1.3 },
                            numProperties: { value: 450, momPct: -0.9 },
                            saleToListPct: { value: 97.2, momPct: 0.2 },
                            medianDays: { value: 36, momPct: -5.0 },
                            medianPricePerSqft: { value: 345, momPct: 1.0 },
                            totalVolume: { value: 216000000, momPct: 0.4 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 468000, momPct: 0.9 },
                            numProperties: { value: 490, momPct: 1.5 },
                            medianPricePerSqft: { value: 338, momPct: 0.6 },
                            medianLivingArea: { value: 1430, momPct: -0.1 },
                            totalVolume: { value: 229320000, momPct: 2.4 }
                        }
                    },
                    monthsSupply: { value: 3.5, momPct: -1.2, yoyPct: -8.5 },
                    neighborhoods: [
                        { name: 'Las Olas', slug: 'las-olas-fort-lauderdale-fl', type: 'neighborhood', medianPrice: 850000, dom: 42, inventory: 4.2 },
                        { name: 'Victoria Park', slug: 'victoria-park-fort-lauderdale-fl', type: 'neighborhood', medianPrice: 620000, dom: 35, inventory: 3.0 },
                        { name: 'Flagler Village', slug: 'flagler-village-fort-lauderdale-fl', type: 'neighborhood', medianPrice: 410000, dom: 30, inventory: 2.8 },
                        { name: 'Wilton Manors', slug: 'wilton-manors-fort-lauderdale-fl', type: 'neighborhood', medianPrice: 520000, dom: 32, inventory: 3.1 }
                    ]
                },
                'hollywood-fl': {
                    name: 'Hollywood',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 54, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.3, momPct: -0.9, yoyPct: -7.2 },
                        soldToListPct: { value: 97.0, momPct: 0.1, yoyPct: 0.6 },
                        medianDaysOnMarket: { value: 35, momPct: -4.5, yoyPct: -10.2 },
                        medianSoldPrice: { value: 430000, momPct: 1.2, yoyPct: 6.0 },
                        medianPricePerSqft: { value: 310, momPct: 0.9, yoyPct: 5.2 },
                        priceDropPct: { value: 16.0, momPct: 0.5, yoyPct: 1.5 },
                        soldAboveListPct: { value: 23.8, momPct: -0.4, yoyPct: -0.8 }
                    },
                    medianEstimatedValue: {
                        value: 455000,
                        momPct: 1.0,
                        yoyPct: 5.5,
                        history: generateHistory({ zip: 455000, city: 430000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 459000, momPct: 1.8 },
                            numProperties: { value: 520, momPct: -2.2 },
                            medianPricePerSqft: { value: 325, momPct: 1.2 },
                            totalVolume: { value: 238680000, momPct: -0.4 },
                            medianLivingArea: { value: 1420, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 445000, momPct: 0.5 },
                            numProperties: { value: 1800, momPct: 2.8 },
                            medianDays: { value: 42, momPct: -3.2 },
                            medianPricePerSqft: { value: 318, momPct: 0.4 },
                            totalVolume: { value: 801000000, momPct: 3.3 },
                            medianLivingArea: { value: 1400, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 415000, momPct: 1.4 },
                            numProperties: { value: 410, momPct: 5.2 },
                            medianDays: { value: 30, momPct: -6.3 },
                            medianPricePerSqft: { value: 305, momPct: 0.8 },
                            totalVolume: { value: 170150000, momPct: 6.6 },
                            medianLivingArea: { value: 1380, momPct: 0.1 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 430000, momPct: 1.2 },
                            numProperties: { value: 360, momPct: -0.6 },
                            saleToListPct: { value: 97.0, momPct: 0.1 },
                            medianDays: { value: 35, momPct: -4.5 },
                            medianPricePerSqft: { value: 310, momPct: 0.9 },
                            totalVolume: { value: 154800000, momPct: 0.6 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 420000, momPct: 0.8 },
                            numProperties: { value: 385, momPct: 1.3 },
                            medianPricePerSqft: { value: 302, momPct: 0.5 },
                            medianLivingArea: { value: 1410, momPct: 0.0 },
                            totalVolume: { value: 161700000, momPct: 2.1 }
                        }
                    },
                    monthsSupply: { value: 3.3, momPct: -0.9, yoyPct: -7.2 },
                    neighborhoods: []
                },
                'pompano-beach-fl': {
                    name: 'Pompano Beach',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 58, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.0, momPct: -1.8, yoyPct: -9.5 },
                        soldToListPct: { value: 97.5, momPct: 0.3, yoyPct: 1.0 },
                        medianDaysOnMarket: { value: 32, momPct: -5.5, yoyPct: -12.5 },
                        medianSoldPrice: { value: 385000, momPct: 1.5, yoyPct: 7.2 },
                        medianPricePerSqft: { value: 280, momPct: 1.1, yoyPct: 6.0 },
                        priceDropPct: { value: 14.8, momPct: -0.2, yoyPct: 0.5 },
                        soldAboveListPct: { value: 26.0, momPct: 0.3, yoyPct: 0.8 }
                    },
                    medianEstimatedValue: {
                        value: 408000,
                        momPct: 1.2,
                        yoyPct: 6.5,
                        history: generateHistory({ zip: 408000, city: 385000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 399000, momPct: 2.2 },
                            numProperties: { value: 420, momPct: -1.8 },
                            medianPricePerSqft: { value: 292, momPct: 1.4 },
                            totalVolume: { value: 167580000, momPct: 0.4 },
                            medianLivingArea: { value: 1380, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 395000, momPct: 0.3 },
                            numProperties: { value: 1450, momPct: 2.5 },
                            medianDays: { value: 38, momPct: -4.0 },
                            medianPricePerSqft: { value: 288, momPct: 0.4 },
                            totalVolume: { value: 572750000, momPct: 2.8 },
                            medianLivingArea: { value: 1360, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 375000, momPct: 1.6 },
                            numProperties: { value: 350, momPct: 6.1 },
                            medianDays: { value: 28, momPct: -7.0 },
                            medianPricePerSqft: { value: 275, momPct: 1.0 },
                            totalVolume: { value: 131250000, momPct: 7.7 },
                            medianLivingArea: { value: 1340, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 385000, momPct: 1.5 },
                            numProperties: { value: 310, momPct: -0.3 },
                            saleToListPct: { value: 97.5, momPct: 0.3 },
                            medianDays: { value: 32, momPct: -5.5 },
                            medianPricePerSqft: { value: 280, momPct: 1.1 },
                            totalVolume: { value: 119350000, momPct: 1.2 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 375000, momPct: 1.0 },
                            numProperties: { value: 335, momPct: 1.5 },
                            medianPricePerSqft: { value: 272, momPct: 0.7 },
                            medianLivingArea: { value: 1370, momPct: 0.0 },
                            totalVolume: { value: 125625000, momPct: 2.5 }
                        }
                    },
                    monthsSupply: { value: 3.0, momPct: -1.8, yoyPct: -9.5 },
                    neighborhoods: []
                },
                'coral-springs-fl': {
                    name: 'Coral Springs',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 65, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.5, momPct: -2.5, yoyPct: -12.0 },
                        soldToListPct: { value: 98.2, momPct: 0.4, yoyPct: 1.5 },
                        medianDaysOnMarket: { value: 28, momPct: -6.5, yoyPct: -15.0 },
                        medianSoldPrice: { value: 520000, momPct: 1.8, yoyPct: 8.0 },
                        medianPricePerSqft: { value: 285, momPct: 1.2, yoyPct: 6.8 },
                        priceDropPct: { value: 12.5, momPct: -0.8, yoyPct: -1.5 },
                        soldAboveListPct: { value: 30.2, momPct: 0.8, yoyPct: 2.5 }
                    },
                    medianEstimatedValue: {
                        value: 548000,
                        momPct: 1.5,
                        yoyPct: 7.2,
                        history: generateHistory({ zip: 548000, city: 520000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 545000, momPct: 2.5 },
                            numProperties: { value: 280, momPct: -3.5 },
                            medianPricePerSqft: { value: 298, momPct: 1.5 },
                            totalVolume: { value: 152600000, momPct: -1.0 },
                            medianLivingArea: { value: 1850, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 535000, momPct: 0.8 },
                            numProperties: { value: 820, momPct: 2.2 },
                            medianDays: { value: 35, momPct: -4.5 },
                            medianPricePerSqft: { value: 292, momPct: 0.6 },
                            totalVolume: { value: 438700000, momPct: 3.0 },
                            medianLivingArea: { value: 1820, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 510000, momPct: 2.0 },
                            numProperties: { value: 240, momPct: 6.5 },
                            medianDays: { value: 25, momPct: -8.0 },
                            medianPricePerSqft: { value: 280, momPct: 1.2 },
                            totalVolume: { value: 122400000, momPct: 8.5 },
                            medianLivingArea: { value: 1800, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 520000, momPct: 1.8 },
                            numProperties: { value: 210, momPct: -0.5 },
                            saleToListPct: { value: 98.2, momPct: 0.4 },
                            medianDays: { value: 28, momPct: -6.5 },
                            medianPricePerSqft: { value: 285, momPct: 1.2 },
                            totalVolume: { value: 109200000, momPct: 1.3 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 510000, momPct: 1.2 },
                            numProperties: { value: 225, momPct: 1.8 },
                            medianPricePerSqft: { value: 278, momPct: 0.8 },
                            medianLivingArea: { value: 1830, momPct: 0.0 },
                            totalVolume: { value: 114750000, momPct: 3.0 }
                        }
                    },
                    monthsSupply: { value: 2.5, momPct: -2.5, yoyPct: -12.0 },
                    neighborhoods: []
                },
                'pembroke-pines-fl': {
                    name: 'Pembroke Pines',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 60, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.8, momPct: -1.8, yoyPct: -10.5 },
                        soldToListPct: { value: 97.8, momPct: 0.3, yoyPct: 1.2 },
                        medianDaysOnMarket: { value: 30, momPct: -5.8, yoyPct: -13.5 },
                        medianSoldPrice: { value: 490000, momPct: 1.5, yoyPct: 7.2 },
                        medianPricePerSqft: { value: 275, momPct: 1.0, yoyPct: 6.0 },
                        priceDropPct: { value: 13.5, momPct: -0.5, yoyPct: -0.8 },
                        soldAboveListPct: { value: 27.8, momPct: 0.5, yoyPct: 1.5 }
                    },
                    medianEstimatedValue: {
                        value: 518000,
                        momPct: 1.3,
                        yoyPct: 6.5,
                        history: generateHistory({ zip: 518000, city: 490000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 510000, momPct: 2.2 },
                            numProperties: { value: 350, momPct: -2.8 },
                            medianPricePerSqft: { value: 288, momPct: 1.3 },
                            totalVolume: { value: 178500000, momPct: -0.6 },
                            medianLivingArea: { value: 1780, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 499000, momPct: 0.6 },
                            numProperties: { value: 1100, momPct: 2.5 },
                            medianDays: { value: 38, momPct: -4.0 },
                            medianPricePerSqft: { value: 280, momPct: 0.5 },
                            totalVolume: { value: 548900000, momPct: 3.1 },
                            medianLivingArea: { value: 1760, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 478000, momPct: 1.8 },
                            numProperties: { value: 290, momPct: 6.0 },
                            medianDays: { value: 26, momPct: -7.2 },
                            medianPricePerSqft: { value: 270, momPct: 1.0 },
                            totalVolume: { value: 138620000, momPct: 7.8 },
                            medianLivingArea: { value: 1740, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 490000, momPct: 1.5 },
                            numProperties: { value: 260, momPct: -0.4 },
                            saleToListPct: { value: 97.8, momPct: 0.3 },
                            medianDays: { value: 30, momPct: -5.8 },
                            medianPricePerSqft: { value: 275, momPct: 1.0 },
                            totalVolume: { value: 127400000, momPct: 1.1 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 480000, momPct: 1.0 },
                            numProperties: { value: 280, momPct: 1.5 },
                            medianPricePerSqft: { value: 268, momPct: 0.6 },
                            medianLivingArea: { value: 1770, momPct: 0.0 },
                            totalVolume: { value: 134400000, momPct: 2.5 }
                        }
                    },
                    monthsSupply: { value: 2.8, momPct: -1.8, yoyPct: -10.5 },
                    neighborhoods: []
                },
                'plantation-fl': {
                    name: 'Plantation',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 53, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.2, momPct: -0.6, yoyPct: -6.5 },
                        soldToListPct: { value: 97.0, momPct: 0.1, yoyPct: 0.5 },
                        medianDaysOnMarket: { value: 34, momPct: -4.2, yoyPct: -9.8 },
                        medianSoldPrice: { value: 475000, momPct: 1.1, yoyPct: 5.5 },
                        medianPricePerSqft: { value: 268, momPct: 0.8, yoyPct: 4.8 },
                        priceDropPct: { value: 15.8, momPct: 0.6, yoyPct: 1.5 },
                        soldAboveListPct: { value: 23.5, momPct: -0.3, yoyPct: -0.5 }
                    },
                    medianEstimatedValue: {
                        value: 502000,
                        momPct: 0.9,
                        yoyPct: 5.0,
                        history: generateHistory({ zip: 502000, city: 475000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 495000, momPct: 1.8 },
                            numProperties: { value: 220, momPct: -2.0 },
                            medianPricePerSqft: { value: 278, momPct: 1.1 },
                            totalVolume: { value: 108900000, momPct: -0.2 },
                            medianLivingArea: { value: 1780, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 485000, momPct: 0.4 },
                            numProperties: { value: 720, momPct: 2.2 },
                            medianDays: { value: 42, momPct: -3.5 },
                            medianPricePerSqft: { value: 272, momPct: 0.3 },
                            totalVolume: { value: 349200000, momPct: 2.6 },
                            medianLivingArea: { value: 1760, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 460000, momPct: 1.4 },
                            numProperties: { value: 180, momPct: 5.0 },
                            medianDays: { value: 30, momPct: -6.0 },
                            medianPricePerSqft: { value: 262, momPct: 0.8 },
                            totalVolume: { value: 82800000, momPct: 6.4 },
                            medianLivingArea: { value: 1740, momPct: 0.1 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 475000, momPct: 1.1 },
                            numProperties: { value: 160, momPct: -0.6 },
                            saleToListPct: { value: 97.0, momPct: 0.1 },
                            medianDays: { value: 34, momPct: -4.2 },
                            medianPricePerSqft: { value: 268, momPct: 0.8 },
                            totalVolume: { value: 76000000, momPct: 0.5 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 465000, momPct: 0.8 },
                            numProperties: { value: 172, momPct: 1.2 },
                            medianPricePerSqft: { value: 260, momPct: 0.5 },
                            medianLivingArea: { value: 1770, momPct: 0.0 },
                            totalVolume: { value: 79980000, momPct: 2.0 }
                        }
                    },
                    monthsSupply: { value: 3.2, momPct: -0.6, yoyPct: -6.5 },
                    neighborhoods: []
                },
                'miramar-fl': {
                    name: 'Miramar',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 63, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.6, momPct: -2.2, yoyPct: -11.5 },
                        soldToListPct: { value: 98.0, momPct: 0.4, yoyPct: 1.3 },
                        medianDaysOnMarket: { value: 29, momPct: -6.2, yoyPct: -14.0 },
                        medianSoldPrice: { value: 510000, momPct: 1.6, yoyPct: 7.5 },
                        medianPricePerSqft: { value: 270, momPct: 1.1, yoyPct: 6.2 },
                        priceDropPct: { value: 12.8, momPct: -0.6, yoyPct: -1.2 },
                        soldAboveListPct: { value: 29.5, momPct: 0.7, yoyPct: 2.0 }
                    },
                    medianEstimatedValue: {
                        value: 538000,
                        momPct: 1.4,
                        yoyPct: 6.8,
                        history: generateHistory({ zip: 538000, city: 510000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 535000, momPct: 2.3 },
                            numProperties: { value: 260, momPct: -3.0 },
                            medianPricePerSqft: { value: 282, momPct: 1.4 },
                            totalVolume: { value: 139100000, momPct: -0.7 },
                            medianLivingArea: { value: 1900, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 520000, momPct: 0.6 },
                            numProperties: { value: 780, momPct: 2.0 },
                            medianDays: { value: 35, momPct: -4.2 },
                            medianPricePerSqft: { value: 275, momPct: 0.4 },
                            totalVolume: { value: 405600000, momPct: 2.6 },
                            medianLivingArea: { value: 1880, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 498000, momPct: 1.8 },
                            numProperties: { value: 220, momPct: 6.2 },
                            medianDays: { value: 25, momPct: -7.5 },
                            medianPricePerSqft: { value: 265, momPct: 1.0 },
                            totalVolume: { value: 109560000, momPct: 8.0 },
                            medianLivingArea: { value: 1860, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 510000, momPct: 1.6 },
                            numProperties: { value: 195, momPct: -0.5 },
                            saleToListPct: { value: 98.0, momPct: 0.4 },
                            medianDays: { value: 29, momPct: -6.2 },
                            medianPricePerSqft: { value: 270, momPct: 1.1 },
                            totalVolume: { value: 99450000, momPct: 1.1 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 500000, momPct: 1.1 },
                            numProperties: { value: 210, momPct: 1.5 },
                            medianPricePerSqft: { value: 262, momPct: 0.7 },
                            medianLivingArea: { value: 1890, momPct: 0.0 },
                            totalVolume: { value: 105000000, momPct: 2.6 }
                        }
                    },
                    monthsSupply: { value: 2.6, momPct: -2.2, yoyPct: -11.5 },
                    neighborhoods: []
                },
                'davie-fl': {
                    name: 'Davie',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 56, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.1, momPct: -1.0, yoyPct: -7.5 },
                        soldToListPct: { value: 97.2, momPct: 0.2, yoyPct: 0.8 },
                        medianDaysOnMarket: { value: 33, momPct: -4.8, yoyPct: -10.5 },
                        medianSoldPrice: { value: 485000, momPct: 1.3, yoyPct: 6.2 },
                        medianPricePerSqft: { value: 272, momPct: 0.9, yoyPct: 5.2 },
                        priceDropPct: { value: 14.5, momPct: 0.2, yoyPct: 0.8 },
                        soldAboveListPct: { value: 25.0, momPct: 0.2, yoyPct: 0.5 }
                    },
                    medianEstimatedValue: {
                        value: 512000,
                        momPct: 1.1,
                        yoyPct: 5.5,
                        history: generateHistory({ zip: 512000, city: 485000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 505000, momPct: 2.0 },
                            numProperties: { value: 200, momPct: -2.5 },
                            medianPricePerSqft: { value: 282, momPct: 1.2 },
                            totalVolume: { value: 101000000, momPct: -0.5 },
                            medianLivingArea: { value: 1800, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 495000, momPct: 0.5 },
                            numProperties: { value: 650, momPct: 2.3 },
                            medianDays: { value: 40, momPct: -3.5 },
                            medianPricePerSqft: { value: 276, momPct: 0.4 },
                            totalVolume: { value: 321750000, momPct: 2.8 },
                            medianLivingArea: { value: 1780, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 472000, momPct: 1.5 },
                            numProperties: { value: 165, momPct: 5.5 },
                            medianDays: { value: 28, momPct: -6.5 },
                            medianPricePerSqft: { value: 265, momPct: 0.9 },
                            totalVolume: { value: 77880000, momPct: 7.0 },
                            medianLivingArea: { value: 1760, momPct: 0.1 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 485000, momPct: 1.3 },
                            numProperties: { value: 148, momPct: -0.7 },
                            saleToListPct: { value: 97.2, momPct: 0.2 },
                            medianDays: { value: 33, momPct: -4.8 },
                            medianPricePerSqft: { value: 272, momPct: 0.9 },
                            totalVolume: { value: 71780000, momPct: 0.6 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 475000, momPct: 0.9 },
                            numProperties: { value: 158, momPct: 1.3 },
                            medianPricePerSqft: { value: 265, momPct: 0.5 },
                            medianLivingArea: { value: 1790, momPct: 0.0 },
                            totalVolume: { value: 75050000, momPct: 2.2 }
                        }
                    },
                    monthsSupply: { value: 3.1, momPct: -1.0, yoyPct: -7.5 },
                    neighborhoods: []
                },
                'weston-fl': {
                    name: 'Weston',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 57, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.4, momPct: -0.3, yoyPct: -5.8 },
                        soldToListPct: { value: 96.5, momPct: 0.0, yoyPct: 0.3 },
                        medianDaysOnMarket: { value: 35, momPct: -3.8, yoyPct: -8.5 },
                        medianSoldPrice: { value: 620000, momPct: 1.0, yoyPct: 5.0 },
                        medianPricePerSqft: { value: 295, momPct: 0.7, yoyPct: 4.2 },
                        priceDropPct: { value: 16.2, momPct: 0.8, yoyPct: 2.0 },
                        soldAboveListPct: { value: 20.5, momPct: -0.5, yoyPct: -1.2 }
                    },
                    medianEstimatedValue: {
                        value: 652000,
                        momPct: 0.8,
                        yoyPct: 4.5,
                        history: generateHistory({ zip: 652000, city: 620000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 649000, momPct: 1.5 },
                            numProperties: { value: 160, momPct: -3.0 },
                            medianPricePerSqft: { value: 308, momPct: 1.0 },
                            totalVolume: { value: 103840000, momPct: -1.5 },
                            medianLivingArea: { value: 2100, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 635000, momPct: 0.5 },
                            numProperties: { value: 520, momPct: 2.5 },
                            medianDays: { value: 42, momPct: -3.0 },
                            medianPricePerSqft: { value: 302, momPct: 0.3 },
                            totalVolume: { value: 330200000, momPct: 3.0 },
                            medianLivingArea: { value: 2080, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 605000, momPct: 1.2 },
                            numProperties: { value: 130, momPct: 4.8 },
                            medianDays: { value: 30, momPct: -5.5 },
                            medianPricePerSqft: { value: 290, momPct: 0.8 },
                            totalVolume: { value: 78650000, momPct: 6.0 },
                            medianLivingArea: { value: 2060, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 620000, momPct: 1.0 },
                            numProperties: { value: 115, momPct: -0.9 },
                            saleToListPct: { value: 96.5, momPct: 0.0 },
                            medianDays: { value: 35, momPct: -3.8 },
                            medianPricePerSqft: { value: 295, momPct: 0.7 },
                            totalVolume: { value: 71300000, momPct: 0.1 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 608000, momPct: 0.7 },
                            numProperties: { value: 122, momPct: 1.0 },
                            medianPricePerSqft: { value: 288, momPct: 0.4 },
                            medianLivingArea: { value: 2090, momPct: 0.0 },
                            totalVolume: { value: 74176000, momPct: 1.7 }
                        }
                    },
                    monthsSupply: { value: 3.4, momPct: -0.3, yoyPct: -5.8 },
                    neighborhoods: []
                },
                'sunrise-fl': {
                    name: 'Sunrise',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 61, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.7, momPct: -2.0, yoyPct: -10.0 },
                        soldToListPct: { value: 97.8, momPct: 0.3, yoyPct: 1.2 },
                        medianDaysOnMarket: { value: 30, momPct: -5.5, yoyPct: -12.5 },
                        medianSoldPrice: { value: 380000, momPct: 1.5, yoyPct: 7.0 },
                        medianPricePerSqft: { value: 245, momPct: 1.0, yoyPct: 5.8 },
                        priceDropPct: { value: 13.2, momPct: -0.5, yoyPct: -0.8 },
                        soldAboveListPct: { value: 28.0, momPct: 0.5, yoyPct: 1.5 }
                    },
                    medianEstimatedValue: {
                        value: 402000,
                        momPct: 1.3,
                        yoyPct: 6.2,
                        history: generateHistory({ zip: 402000, city: 380000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 395000, momPct: 2.0 },
                            numProperties: { value: 210, momPct: -2.0 },
                            medianPricePerSqft: { value: 255, momPct: 1.3 },
                            totalVolume: { value: 82950000, momPct: 0.0 },
                            medianLivingArea: { value: 1550, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 389000, momPct: 0.5 },
                            numProperties: { value: 680, momPct: 2.2 },
                            medianDays: { value: 36, momPct: -4.0 },
                            medianPricePerSqft: { value: 250, momPct: 0.4 },
                            totalVolume: { value: 264520000, momPct: 2.7 },
                            medianLivingArea: { value: 1530, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 370000, momPct: 1.6 },
                            numProperties: { value: 175, momPct: 5.8 },
                            medianDays: { value: 26, momPct: -7.0 },
                            medianPricePerSqft: { value: 240, momPct: 0.9 },
                            totalVolume: { value: 64750000, momPct: 7.4 },
                            medianLivingArea: { value: 1510, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 380000, momPct: 1.5 },
                            numProperties: { value: 155, momPct: -0.3 },
                            saleToListPct: { value: 97.8, momPct: 0.3 },
                            medianDays: { value: 30, momPct: -5.5 },
                            medianPricePerSqft: { value: 245, momPct: 1.0 },
                            totalVolume: { value: 58900000, momPct: 1.2 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 372000, momPct: 1.0 },
                            numProperties: { value: 165, momPct: 1.2 },
                            medianPricePerSqft: { value: 238, momPct: 0.6 },
                            medianLivingArea: { value: 1540, momPct: 0.0 },
                            totalVolume: { value: 61380000, momPct: 2.2 }
                        }
                    },
                    monthsSupply: { value: 2.7, momPct: -2.0, yoyPct: -10.0 },
                    neighborhoods: []
                },
                'deerfield-beach-fl': {
                    name: 'Deerfield Beach',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 52, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.3, momPct: -0.6, yoyPct: -6.0 },
                        soldToListPct: { value: 96.8, momPct: 0.1, yoyPct: 0.5 },
                        medianDaysOnMarket: { value: 34, momPct: -4.0, yoyPct: -9.0 },
                        medianSoldPrice: { value: 350000, momPct: 1.2, yoyPct: 5.8 },
                        medianPricePerSqft: { value: 265, momPct: 0.8, yoyPct: 4.8 },
                        priceDropPct: { value: 16.0, momPct: 0.5, yoyPct: 1.5 },
                        soldAboveListPct: { value: 22.0, momPct: -0.3, yoyPct: -0.5 }
                    },
                    medianEstimatedValue: {
                        value: 370000,
                        momPct: 1.0,
                        yoyPct: 5.2,
                        history: generateHistory({ zip: 370000, city: 350000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 365000, momPct: 1.5 },
                            numProperties: { value: 180, momPct: -2.2 },
                            medianPricePerSqft: { value: 275, momPct: 1.0 },
                            totalVolume: { value: 65700000, momPct: -0.7 },
                            medianLivingArea: { value: 1320, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 359000, momPct: 0.3 },
                            numProperties: { value: 620, momPct: 2.5 },
                            medianDays: { value: 40, momPct: -3.5 },
                            medianPricePerSqft: { value: 270, momPct: 0.4 },
                            totalVolume: { value: 222580000, momPct: 2.8 },
                            medianLivingArea: { value: 1300, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 340000, momPct: 1.3 },
                            numProperties: { value: 150, momPct: 5.0 },
                            medianDays: { value: 30, momPct: -6.0 },
                            medianPricePerSqft: { value: 258, momPct: 0.8 },
                            totalVolume: { value: 51000000, momPct: 6.3 },
                            medianLivingArea: { value: 1280, momPct: 0.1 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 350000, momPct: 1.2 },
                            numProperties: { value: 135, momPct: -0.7 },
                            saleToListPct: { value: 96.8, momPct: 0.1 },
                            medianDays: { value: 34, momPct: -4.0 },
                            medianPricePerSqft: { value: 265, momPct: 0.8 },
                            totalVolume: { value: 47250000, momPct: 0.5 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 342000, momPct: 0.8 },
                            numProperties: { value: 145, momPct: 1.0 },
                            medianPricePerSqft: { value: 258, momPct: 0.5 },
                            medianLivingArea: { value: 1310, momPct: 0.0 },
                            totalVolume: { value: 49590000, momPct: 1.8 }
                        }
                    },
                    monthsSupply: { value: 3.3, momPct: -0.6, yoyPct: -6.0 },
                    neighborhoods: []
                },
                'coconut-creek-fl': {
                    name: 'Coconut Creek',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 59, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.9, momPct: -1.5, yoyPct: -9.0 },
                        soldToListPct: { value: 97.5, momPct: 0.2, yoyPct: 1.0 },
                        medianDaysOnMarket: { value: 31, momPct: -5.0, yoyPct: -11.5 },
                        medianSoldPrice: { value: 390000, momPct: 1.4, yoyPct: 6.5 },
                        medianPricePerSqft: { value: 258, momPct: 1.0, yoyPct: 5.5 },
                        priceDropPct: { value: 14.0, momPct: -0.2, yoyPct: 0.2 },
                        soldAboveListPct: { value: 26.5, momPct: 0.4, yoyPct: 1.0 }
                    },
                    medianEstimatedValue: {
                        value: 412000,
                        momPct: 1.2,
                        yoyPct: 5.8,
                        history: generateHistory({ zip: 412000, city: 390000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 405000, momPct: 1.8 },
                            numProperties: { value: 150, momPct: -2.5 },
                            medianPricePerSqft: { value: 268, momPct: 1.2 },
                            totalVolume: { value: 60750000, momPct: -0.7 },
                            medianLivingArea: { value: 1520, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 399000, momPct: 0.5 },
                            numProperties: { value: 480, momPct: 2.2 },
                            medianDays: { value: 38, momPct: -3.8 },
                            medianPricePerSqft: { value: 262, momPct: 0.4 },
                            totalVolume: { value: 191520000, momPct: 2.7 },
                            medianLivingArea: { value: 1500, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 382000, momPct: 1.5 },
                            numProperties: { value: 125, momPct: 5.5 },
                            medianDays: { value: 27, momPct: -6.5 },
                            medianPricePerSqft: { value: 252, momPct: 0.9 },
                            totalVolume: { value: 47750000, momPct: 7.0 },
                            medianLivingArea: { value: 1480, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 390000, momPct: 1.4 },
                            numProperties: { value: 112, momPct: -0.5 },
                            saleToListPct: { value: 97.5, momPct: 0.2 },
                            medianDays: { value: 31, momPct: -5.0 },
                            medianPricePerSqft: { value: 258, momPct: 1.0 },
                            totalVolume: { value: 43680000, momPct: 0.9 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 382000, momPct: 1.0 },
                            numProperties: { value: 120, momPct: 1.2 },
                            medianPricePerSqft: { value: 252, momPct: 0.6 },
                            medianLivingArea: { value: 1510, momPct: 0.0 },
                            totalVolume: { value: 45840000, momPct: 2.2 }
                        }
                    },
                    monthsSupply: { value: 2.9, momPct: -1.5, yoyPct: -9.0 },
                    neighborhoods: []
                },
                'lauderhill-fl': {
                    name: 'Lauderhill',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 62, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.0, momPct: -1.5, yoyPct: -8.5 },
                        soldToListPct: { value: 97.5, momPct: 0.3, yoyPct: 1.0 },
                        medianDaysOnMarket: { value: 32, momPct: -5.0, yoyPct: -11.0 },
                        medianSoldPrice: { value: 290000, momPct: 1.8, yoyPct: 8.0 },
                        medianPricePerSqft: { value: 215, momPct: 1.2, yoyPct: 6.5 },
                        priceDropPct: { value: 13.5, momPct: -0.3, yoyPct: -0.5 },
                        soldAboveListPct: { value: 27.5, momPct: 0.5, yoyPct: 1.5 }
                    },
                    medianEstimatedValue: {
                        value: 308000,
                        momPct: 1.5,
                        yoyPct: 7.2,
                        history: generateHistory({ zip: 308000, city: 290000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 305000, momPct: 2.2 },
                            numProperties: { value: 130, momPct: -1.5 },
                            medianPricePerSqft: { value: 225, momPct: 1.5 },
                            totalVolume: { value: 39650000, momPct: 0.7 },
                            medianLivingArea: { value: 1350, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 298000, momPct: 0.7 },
                            numProperties: { value: 420, momPct: 2.0 },
                            medianDays: { value: 38, momPct: -3.8 },
                            medianPricePerSqft: { value: 220, momPct: 0.5 },
                            totalVolume: { value: 125160000, momPct: 2.7 },
                            medianLivingArea: { value: 1330, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 280000, momPct: 1.8 },
                            numProperties: { value: 108, momPct: 5.5 },
                            medianDays: { value: 28, momPct: -6.5 },
                            medianPricePerSqft: { value: 210, momPct: 1.0 },
                            totalVolume: { value: 30240000, momPct: 7.3 },
                            medianLivingArea: { value: 1320, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 290000, momPct: 1.8 },
                            numProperties: { value: 98, momPct: -0.5 },
                            saleToListPct: { value: 97.5, momPct: 0.3 },
                            medianDays: { value: 32, momPct: -5.0 },
                            medianPricePerSqft: { value: 215, momPct: 1.2 },
                            totalVolume: { value: 28420000, momPct: 1.3 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 282000, momPct: 1.2 },
                            numProperties: { value: 105, momPct: 1.5 },
                            medianPricePerSqft: { value: 208, momPct: 0.7 },
                            medianLivingArea: { value: 1340, momPct: 0.0 },
                            totalVolume: { value: 29610000, momPct: 2.7 }
                        }
                    },
                    monthsSupply: { value: 3.0, momPct: -1.5, yoyPct: -8.5 },
                    neighborhoods: []
                },
                'tamarac-fl': {
                    name: 'Tamarac',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 60, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.8, momPct: -1.8, yoyPct: -9.5 },
                        soldToListPct: { value: 97.8, momPct: 0.3, yoyPct: 1.2 },
                        medianDaysOnMarket: { value: 30, momPct: -5.5, yoyPct: -12.0 },
                        medianSoldPrice: { value: 310000, momPct: 1.5, yoyPct: 7.5 },
                        medianPricePerSqft: { value: 225, momPct: 1.0, yoyPct: 6.0 },
                        priceDropPct: { value: 13.0, momPct: -0.5, yoyPct: -1.0 },
                        soldAboveListPct: { value: 28.5, momPct: 0.6, yoyPct: 1.8 }
                    },
                    medianEstimatedValue: {
                        value: 328000,
                        momPct: 1.3,
                        yoyPct: 6.8,
                        history: generateHistory({ zip: 328000, city: 310000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 325000, momPct: 2.0 },
                            numProperties: { value: 140, momPct: -2.0 },
                            medianPricePerSqft: { value: 235, momPct: 1.3 },
                            totalVolume: { value: 45500000, momPct: 0.0 },
                            medianLivingArea: { value: 1380, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 318000, momPct: 0.6 },
                            numProperties: { value: 440, momPct: 2.0 },
                            medianDays: { value: 36, momPct: -4.0 },
                            medianPricePerSqft: { value: 230, momPct: 0.4 },
                            totalVolume: { value: 139920000, momPct: 2.6 },
                            medianLivingArea: { value: 1360, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 302000, momPct: 1.6 },
                            numProperties: { value: 115, momPct: 5.5 },
                            medianDays: { value: 26, momPct: -7.0 },
                            medianPricePerSqft: { value: 220, momPct: 0.9 },
                            totalVolume: { value: 34730000, momPct: 7.1 },
                            medianLivingArea: { value: 1350, momPct: 0.1 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 310000, momPct: 1.5 },
                            numProperties: { value: 105, momPct: -0.5 },
                            saleToListPct: { value: 97.8, momPct: 0.3 },
                            medianDays: { value: 30, momPct: -5.5 },
                            medianPricePerSqft: { value: 225, momPct: 1.0 },
                            totalVolume: { value: 32550000, momPct: 1.0 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 302000, momPct: 1.0 },
                            numProperties: { value: 112, momPct: 1.2 },
                            medianPricePerSqft: { value: 218, momPct: 0.6 },
                            medianLivingArea: { value: 1370, momPct: 0.0 },
                            totalVolume: { value: 33824000, momPct: 2.2 }
                        }
                    },
                    monthsSupply: { value: 2.8, momPct: -1.8, yoyPct: -9.5 },
                    neighborhoods: []
                },
                'margate-fl': {
                    name: 'Margate',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 61, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.7, momPct: -2.0, yoyPct: -10.0 },
                        soldToListPct: { value: 98.0, momPct: 0.4, yoyPct: 1.3 },
                        medianDaysOnMarket: { value: 29, momPct: -6.0, yoyPct: -13.0 },
                        medianSoldPrice: { value: 320000, momPct: 1.6, yoyPct: 7.8 },
                        medianPricePerSqft: { value: 230, momPct: 1.1, yoyPct: 6.2 },
                        priceDropPct: { value: 12.8, momPct: -0.6, yoyPct: -1.2 },
                        soldAboveListPct: { value: 29.0, momPct: 0.6, yoyPct: 2.0 }
                    },
                    medianEstimatedValue: {
                        value: 338000,
                        momPct: 1.4,
                        yoyPct: 7.0,
                        history: generateHistory({ zip: 338000, city: 320000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 335000, momPct: 2.2 },
                            numProperties: { value: 120, momPct: -1.8 },
                            medianPricePerSqft: { value: 242, momPct: 1.4 },
                            totalVolume: { value: 40200000, momPct: 0.4 },
                            medianLivingArea: { value: 1400, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 328000, momPct: 0.6 },
                            numProperties: { value: 380, momPct: 2.0 },
                            medianDays: { value: 35, momPct: -4.2 },
                            medianPricePerSqft: { value: 236, momPct: 0.4 },
                            totalVolume: { value: 124640000, momPct: 2.6 },
                            medianLivingArea: { value: 1380, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 312000, momPct: 1.6 },
                            numProperties: { value: 100, momPct: 6.0 },
                            medianDays: { value: 25, momPct: -7.5 },
                            medianPricePerSqft: { value: 225, momPct: 1.0 },
                            totalVolume: { value: 31200000, momPct: 7.6 },
                            medianLivingArea: { value: 1360, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 320000, momPct: 1.6 },
                            numProperties: { value: 92, momPct: -0.5 },
                            saleToListPct: { value: 98.0, momPct: 0.4 },
                            medianDays: { value: 29, momPct: -6.0 },
                            medianPricePerSqft: { value: 230, momPct: 1.1 },
                            totalVolume: { value: 29440000, momPct: 1.1 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 312000, momPct: 1.1 },
                            numProperties: { value: 98, momPct: 1.2 },
                            medianPricePerSqft: { value: 222, momPct: 0.7 },
                            medianLivingArea: { value: 1390, momPct: 0.0 },
                            totalVolume: { value: 30576000, momPct: 2.3 }
                        }
                    },
                    monthsSupply: { value: 2.7, momPct: -2.0, yoyPct: -10.0 },
                    neighborhoods: []
                },
                'hallandale-beach-fl': {
                    name: 'Hallandale Beach',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 38, label: "Buyer's Market", type: 'buyer' },
                    keyMetrics: {
                        monthsOfInventory: { value: 4.8, momPct: 2.5, yoyPct: 1.5 },
                        soldToListPct: { value: 94.8, momPct: -0.4, yoyPct: -1.0 },
                        medianDaysOnMarket: { value: 42, momPct: 0.8, yoyPct: 4.0 },
                        medianSoldPrice: { value: 340000, momPct: -0.2, yoyPct: 3.0 },
                        medianPricePerSqft: { value: 310, momPct: -0.3, yoyPct: 2.5 },
                        priceDropPct: { value: 24.5, momPct: 2.8, yoyPct: 5.5 },
                        soldAboveListPct: { value: 14.0, momPct: -1.5, yoyPct: -3.5 }
                    },
                    medianEstimatedValue: {
                        value: 358000,
                        momPct: -0.1,
                        yoyPct: 2.5,
                        history: generateHistory({ zip: 358000, city: 340000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 365000, momPct: 1.0 },
                            numProperties: { value: 180, momPct: -3.5 },
                            medianPricePerSqft: { value: 322, momPct: 0.5 },
                            totalVolume: { value: 65700000, momPct: -2.5 },
                            medianLivingArea: { value: 1120, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 355000, momPct: 0.3 },
                            numProperties: { value: 850, momPct: 4.5 },
                            medianDays: { value: 52, momPct: 1.5 },
                            medianPricePerSqft: { value: 318, momPct: -0.2 },
                            totalVolume: { value: 301750000, momPct: 4.8 },
                            medianLivingArea: { value: 1100, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 325000, momPct: -0.5 },
                            numProperties: { value: 120, momPct: 2.5 },
                            medianDays: { value: 38, momPct: -3.0 },
                            medianPricePerSqft: { value: 298, momPct: -0.3 },
                            totalVolume: { value: 39000000, momPct: 2.0 },
                            medianLivingArea: { value: 1080, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 340000, momPct: -0.2 },
                            numProperties: { value: 105, momPct: -1.5 },
                            saleToListPct: { value: 94.8, momPct: -0.4 },
                            medianDays: { value: 42, momPct: 0.8 },
                            medianPricePerSqft: { value: 310, momPct: -0.3 },
                            totalVolume: { value: 35700000, momPct: -1.7 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 332000, momPct: -0.3 },
                            numProperties: { value: 112, momPct: 0.9 },
                            medianPricePerSqft: { value: 302, momPct: -0.1 },
                            medianLivingArea: { value: 1110, momPct: 0.0 },
                            totalVolume: { value: 37184000, momPct: 0.6 }
                        }
                    },
                    monthsSupply: { value: 4.8, momPct: 2.5, yoyPct: 1.5 },
                    neighborhoods: []
                },
                'lauderdale-by-the-sea-fl': {
                    name: 'Lauderdale-by-the-Sea',
                    type: 'city',
                    county: 'Broward',
                    state: 'FL',
                    parentLocation: 'broward-county-fl',
                    marketScore: { value: 36, label: "Buyer's Market", type: 'buyer' },
                    keyMetrics: {
                        monthsOfInventory: { value: 5.0, momPct: 3.0, yoyPct: 2.5 },
                        soldToListPct: { value: 94.2, momPct: -0.5, yoyPct: -1.2 },
                        medianDaysOnMarket: { value: 45, momPct: 1.5, yoyPct: 5.0 },
                        medianSoldPrice: { value: 420000, momPct: -0.1, yoyPct: 2.5 },
                        medianPricePerSqft: { value: 388, momPct: -0.2, yoyPct: 2.0 },
                        priceDropPct: { value: 25.5, momPct: 3.0, yoyPct: 6.0 },
                        soldAboveListPct: { value: 12.0, momPct: -1.8, yoyPct: -4.0 }
                    },
                    medianEstimatedValue: {
                        value: 442000,
                        momPct: -0.2,
                        yoyPct: 2.0,
                        history: generateHistory({ zip: 442000, city: 420000, county: 460000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 445000, momPct: 0.8 },
                            numProperties: { value: 65, momPct: -4.0 },
                            medianPricePerSqft: { value: 402, momPct: 0.3 },
                            totalVolume: { value: 28925000, momPct: -3.2 },
                            medianLivingArea: { value: 1080, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 435000, momPct: 0.2 },
                            numProperties: { value: 280, momPct: 5.0 },
                            medianDays: { value: 55, momPct: 2.0 },
                            medianPricePerSqft: { value: 395, momPct: -0.3 },
                            totalVolume: { value: 121800000, momPct: 5.2 },
                            medianLivingArea: { value: 1060, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 405000, momPct: -0.5 },
                            numProperties: { value: 42, momPct: 2.0 },
                            medianDays: { value: 40, momPct: -2.5 },
                            medianPricePerSqft: { value: 378, momPct: -0.2 },
                            totalVolume: { value: 17010000, momPct: 1.5 },
                            medianLivingArea: { value: 1050, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 420000, momPct: -0.1 },
                            numProperties: { value: 38, momPct: -2.0 },
                            saleToListPct: { value: 94.2, momPct: -0.5 },
                            medianDays: { value: 45, momPct: 1.5 },
                            medianPricePerSqft: { value: 388, momPct: -0.2 },
                            totalVolume: { value: 15960000, momPct: -2.1 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 410000, momPct: -0.2 },
                            numProperties: { value: 40, momPct: 0.8 },
                            medianPricePerSqft: { value: 380, momPct: -0.1 },
                            medianLivingArea: { value: 1070, momPct: 0.0 },
                            totalVolume: { value: 16400000, momPct: 0.6 }
                        }
                    },
                    monthsSupply: { value: 5.0, momPct: 3.0, yoyPct: 2.5 },
                    neighborhoods: []
                },

                // ── Palm Beach County ──────────────────────────────────────
                'palm-beach-county-fl': {
                    name: 'Palm Beach County',
                    type: 'county',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'florida',
                    marketScore: { value: 48, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 4.2, momPct: 1.0, yoyPct: -4.5 },
                        soldToListPct: { value: 96.0, momPct: -0.1, yoyPct: 0.3 },
                        medianDaysOnMarket: { value: 40, momPct: -3.5, yoyPct: -7.8 },
                        medianSoldPrice: { value: 520000, momPct: 0.8, yoyPct: 4.8 },
                        medianPricePerSqft: { value: 310, momPct: 0.6, yoyPct: 4.0 },
                        priceDropPct: { value: 19.5, momPct: 1.5, yoyPct: 3.2 },
                        soldAboveListPct: { value: 19.8, momPct: -0.8, yoyPct: -2.0 }
                    },
                    medianEstimatedValue: {
                        value: 548000,
                        momPct: 0.7,
                        yoyPct: 4.2,
                        history: generateHistory({ zip: 548000, city: 548000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 545000, momPct: 1.2 },
                            numProperties: { value: 3800, momPct: -2.5 },
                            medianPricePerSqft: { value: 322, momPct: 0.9 },
                            totalVolume: { value: 2071000000, momPct: -1.3 },
                            medianLivingArea: { value: 1720, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 549000, momPct: 0.5 },
                            numProperties: { value: 13500, momPct: 3.5 },
                            medianDays: { value: 50, momPct: -3.0 },
                            medianPricePerSqft: { value: 318, momPct: 0.4 },
                            totalVolume: { value: 7411500000, momPct: 4.0 },
                            medianLivingArea: { value: 1700, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 498000, momPct: 1.5 },
                            numProperties: { value: 2800, momPct: 4.8 },
                            medianDays: { value: 36, momPct: -5.5 },
                            medianPricePerSqft: { value: 302, momPct: 0.8 },
                            totalVolume: { value: 1394400000, momPct: 6.3 },
                            medianLivingArea: { value: 1680, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 520000, momPct: 0.8 },
                            numProperties: { value: 2500, momPct: -0.8 },
                            saleToListPct: { value: 96.0, momPct: -0.1 },
                            medianDays: { value: 40, momPct: -3.5 },
                            medianPricePerSqft: { value: 310, momPct: 0.6 },
                            totalVolume: { value: 1300000000, momPct: 0.0 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 508000, momPct: 0.6 },
                            numProperties: { value: 2700, momPct: 1.0 },
                            medianPricePerSqft: { value: 302, momPct: 0.4 },
                            medianLivingArea: { value: 1710, momPct: 0.0 },
                            totalVolume: { value: 1371600000, momPct: 1.6 }
                        }
                    },
                    monthsSupply: { value: 4.2, momPct: 1.0, yoyPct: -4.5 },
                    neighborhoods: [
                        { name: 'West Palm Beach', slug: 'west-palm-beach-fl', type: 'city', medianPrice: 435000, dom: 35, inventory: 3.5 },
                        { name: 'Boca Raton', slug: 'boca-raton-fl', type: 'city', medianPrice: 650000, dom: 42, inventory: 4.5 },
                        { name: 'Delray Beach', slug: 'delray-beach-fl', type: 'city', medianPrice: 510000, dom: 38, inventory: 3.8 },
                        { name: 'Boynton Beach', slug: 'boynton-beach-fl', type: 'city', medianPrice: 395000, dom: 32, inventory: 3.0 },
                        { name: 'Jupiter', slug: 'jupiter-fl', type: 'city', medianPrice: 680000, dom: 40, inventory: 4.0 },
                        { name: 'Palm Beach Gardens', slug: 'palm-beach-gardens-fl', type: 'city', medianPrice: 620000, dom: 38, inventory: 3.8 },
                        { name: 'Wellington', slug: 'wellington-fl', type: 'city', medianPrice: 590000, dom: 35, inventory: 3.2 },
                        { name: 'Royal Palm Beach', slug: 'royal-palm-beach-fl', type: 'city', medianPrice: 470000, dom: 30, inventory: 2.8 },
                        { name: 'Lake Worth Beach', slug: 'lake-worth-beach-fl', type: 'city', medianPrice: 380000, dom: 30, inventory: 2.8 },
                        { name: 'Riviera Beach', slug: 'riviera-beach-fl', type: 'city', medianPrice: 340000, dom: 32, inventory: 3.0 },
                        { name: 'Palm Beach', slug: 'palm-beach-fl', type: 'city', medianPrice: 2800000, dom: 85, inventory: 8.5 }
                    ]
                },
                'west-palm-beach-fl': {
                    name: 'West Palm Beach',
                    type: 'city',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'palm-beach-county-fl',
                    marketScore: { value: 56, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.5, momPct: -0.8, yoyPct: -7.0 },
                        soldToListPct: { value: 97.0, momPct: 0.2, yoyPct: 0.8 },
                        medianDaysOnMarket: { value: 35, momPct: -4.5, yoyPct: -10.5 },
                        medianSoldPrice: { value: 435000, momPct: 1.3, yoyPct: 6.5 },
                        medianPricePerSqft: { value: 290, momPct: 0.9, yoyPct: 5.5 },
                        priceDropPct: { value: 16.0, momPct: 0.5, yoyPct: 1.5 },
                        soldAboveListPct: { value: 24.0, momPct: -0.3, yoyPct: -0.5 }
                    },
                    medianEstimatedValue: {
                        value: 460000,
                        momPct: 1.1,
                        yoyPct: 5.8,
                        history: generateHistory({ zip: 460000, city: 435000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 455000, momPct: 1.8 },
                            numProperties: { value: 520, momPct: -2.5 },
                            medianPricePerSqft: { value: 302, momPct: 1.2 },
                            totalVolume: { value: 236600000, momPct: -0.7 },
                            medianLivingArea: { value: 1520, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 449000, momPct: 0.4 },
                            numProperties: { value: 1800, momPct: 2.8 },
                            medianDays: { value: 42, momPct: -3.5 },
                            medianPricePerSqft: { value: 296, momPct: 0.5 },
                            totalVolume: { value: 808200000, momPct: 3.2 },
                            medianLivingArea: { value: 1500, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 420000, momPct: 1.5 },
                            numProperties: { value: 420, momPct: 5.5 },
                            medianDays: { value: 30, momPct: -6.5 },
                            medianPricePerSqft: { value: 282, momPct: 0.9 },
                            totalVolume: { value: 176400000, momPct: 7.0 },
                            medianLivingArea: { value: 1480, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 435000, momPct: 1.3 },
                            numProperties: { value: 380, momPct: -0.5 },
                            saleToListPct: { value: 97.0, momPct: 0.2 },
                            medianDays: { value: 35, momPct: -4.5 },
                            medianPricePerSqft: { value: 290, momPct: 0.9 },
                            totalVolume: { value: 165300000, momPct: 0.8 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 425000, momPct: 0.9 },
                            numProperties: { value: 405, momPct: 1.2 },
                            medianPricePerSqft: { value: 282, momPct: 0.5 },
                            medianLivingArea: { value: 1510, momPct: 0.0 },
                            totalVolume: { value: 172125000, momPct: 2.1 }
                        }
                    },
                    monthsSupply: { value: 3.5, momPct: -0.8, yoyPct: -7.0 },
                    neighborhoods: []
                },
                'boca-raton-fl': {
                    name: 'Boca Raton',
                    type: 'city',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'palm-beach-county-fl',
                    marketScore: { value: 44, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 4.5, momPct: 1.5, yoyPct: -2.5 },
                        soldToListPct: { value: 95.5, momPct: -0.2, yoyPct: -0.5 },
                        medianDaysOnMarket: { value: 42, momPct: -2.5, yoyPct: -5.5 },
                        medianSoldPrice: { value: 650000, momPct: 0.6, yoyPct: 3.8 },
                        medianPricePerSqft: { value: 345, momPct: 0.4, yoyPct: 3.2 },
                        priceDropPct: { value: 21.5, momPct: 2.0, yoyPct: 4.0 },
                        soldAboveListPct: { value: 17.0, momPct: -1.0, yoyPct: -2.5 }
                    },
                    medianEstimatedValue: {
                        value: 685000,
                        momPct: 0.5,
                        yoyPct: 3.5,
                        history: generateHistory({ zip: 685000, city: 650000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 689000, momPct: 1.2 },
                            numProperties: { value: 480, momPct: -3.0 },
                            medianPricePerSqft: { value: 360, momPct: 0.8 },
                            totalVolume: { value: 330720000, momPct: -1.8 },
                            medianLivingArea: { value: 1920, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 675000, momPct: 0.6 },
                            numProperties: { value: 1800, momPct: 3.5 },
                            medianDays: { value: 52, momPct: -2.0 },
                            medianPricePerSqft: { value: 352, momPct: 0.3 },
                            totalVolume: { value: 1215000000, momPct: 4.1 },
                            medianLivingArea: { value: 1900, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 625000, momPct: 0.8 },
                            numProperties: { value: 350, momPct: 4.2 },
                            medianDays: { value: 38, momPct: -4.5 },
                            medianPricePerSqft: { value: 335, momPct: 0.6 },
                            totalVolume: { value: 218750000, momPct: 5.0 },
                            medianLivingArea: { value: 1880, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 650000, momPct: 0.6 },
                            numProperties: { value: 310, momPct: -1.0 },
                            saleToListPct: { value: 95.5, momPct: -0.2 },
                            medianDays: { value: 42, momPct: -2.5 },
                            medianPricePerSqft: { value: 345, momPct: 0.4 },
                            totalVolume: { value: 201500000, momPct: -0.4 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 638000, momPct: 0.4 },
                            numProperties: { value: 330, momPct: 0.9 },
                            medianPricePerSqft: { value: 338, momPct: 0.3 },
                            medianLivingArea: { value: 1910, momPct: 0.0 },
                            totalVolume: { value: 210540000, momPct: 1.3 }
                        }
                    },
                    monthsSupply: { value: 4.5, momPct: 1.5, yoyPct: -2.5 },
                    neighborhoods: []
                },
                'delray-beach-fl': {
                    name: 'Delray Beach',
                    type: 'city',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'palm-beach-county-fl',
                    marketScore: { value: 52, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.8, momPct: 0.2, yoyPct: -5.5 },
                        soldToListPct: { value: 96.5, momPct: 0.1, yoyPct: 0.5 },
                        medianDaysOnMarket: { value: 38, momPct: -3.8, yoyPct: -8.5 },
                        medianSoldPrice: { value: 510000, momPct: 1.0, yoyPct: 5.5 },
                        medianPricePerSqft: { value: 325, momPct: 0.7, yoyPct: 4.5 },
                        priceDropPct: { value: 18.0, momPct: 1.0, yoyPct: 2.5 },
                        soldAboveListPct: { value: 21.0, momPct: -0.5, yoyPct: -1.2 }
                    },
                    medianEstimatedValue: {
                        value: 538000,
                        momPct: 0.8,
                        yoyPct: 5.0,
                        history: generateHistory({ zip: 538000, city: 510000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 535000, momPct: 1.5 },
                            numProperties: { value: 320, momPct: -2.2 },
                            medianPricePerSqft: { value: 338, momPct: 1.0 },
                            totalVolume: { value: 171200000, momPct: -0.7 },
                            medianLivingArea: { value: 1580, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 525000, momPct: 0.4 },
                            numProperties: { value: 1100, momPct: 2.8 },
                            medianDays: { value: 46, momPct: -3.2 },
                            medianPricePerSqft: { value: 332, momPct: 0.4 },
                            totalVolume: { value: 577500000, momPct: 3.2 },
                            medianLivingArea: { value: 1560, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 495000, momPct: 1.2 },
                            numProperties: { value: 260, momPct: 5.0 },
                            medianDays: { value: 34, momPct: -5.5 },
                            medianPricePerSqft: { value: 318, momPct: 0.8 },
                            totalVolume: { value: 128700000, momPct: 6.2 },
                            medianLivingArea: { value: 1540, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 510000, momPct: 1.0 },
                            numProperties: { value: 230, momPct: -0.4 },
                            saleToListPct: { value: 96.5, momPct: 0.1 },
                            medianDays: { value: 38, momPct: -3.8 },
                            medianPricePerSqft: { value: 325, momPct: 0.7 },
                            totalVolume: { value: 117300000, momPct: 0.6 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 498000, momPct: 0.7 },
                            numProperties: { value: 245, momPct: 1.0 },
                            medianPricePerSqft: { value: 318, momPct: 0.4 },
                            medianLivingArea: { value: 1570, momPct: 0.0 },
                            totalVolume: { value: 122010000, momPct: 1.7 }
                        }
                    },
                    monthsSupply: { value: 3.8, momPct: 0.2, yoyPct: -5.5 },
                    neighborhoods: []
                },
                'boynton-beach-fl': {
                    name: 'Boynton Beach',
                    type: 'city',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'palm-beach-county-fl',
                    marketScore: { value: 58, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.0, momPct: -1.5, yoyPct: -9.0 },
                        soldToListPct: { value: 97.5, momPct: 0.3, yoyPct: 1.0 },
                        medianDaysOnMarket: { value: 32, momPct: -5.0, yoyPct: -12.0 },
                        medianSoldPrice: { value: 395000, momPct: 1.5, yoyPct: 7.0 },
                        medianPricePerSqft: { value: 265, momPct: 1.0, yoyPct: 5.8 },
                        priceDropPct: { value: 15.0, momPct: -0.2, yoyPct: 0.5 },
                        soldAboveListPct: { value: 25.5, momPct: 0.3, yoyPct: 1.0 }
                    },
                    medianEstimatedValue: {
                        value: 418000,
                        momPct: 1.3,
                        yoyPct: 6.2,
                        history: generateHistory({ zip: 418000, city: 395000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 412000, momPct: 2.0 },
                            numProperties: { value: 350, momPct: -2.0 },
                            medianPricePerSqft: { value: 278, momPct: 1.3 },
                            totalVolume: { value: 144200000, momPct: 0.0 },
                            medianLivingArea: { value: 1480, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 405000, momPct: 0.5 },
                            numProperties: { value: 1100, momPct: 2.5 },
                            medianDays: { value: 38, momPct: -4.0 },
                            medianPricePerSqft: { value: 272, momPct: 0.4 },
                            totalVolume: { value: 445500000, momPct: 3.0 },
                            medianLivingArea: { value: 1460, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 385000, momPct: 1.5 },
                            numProperties: { value: 290, momPct: 5.8 },
                            medianDays: { value: 28, momPct: -6.5 },
                            medianPricePerSqft: { value: 258, momPct: 0.9 },
                            totalVolume: { value: 111650000, momPct: 7.3 },
                            medianLivingArea: { value: 1440, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 395000, momPct: 1.5 },
                            numProperties: { value: 260, momPct: -0.4 },
                            saleToListPct: { value: 97.5, momPct: 0.3 },
                            medianDays: { value: 32, momPct: -5.0 },
                            medianPricePerSqft: { value: 265, momPct: 1.0 },
                            totalVolume: { value: 102700000, momPct: 1.1 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 386000, momPct: 1.0 },
                            numProperties: { value: 278, momPct: 1.2 },
                            medianPricePerSqft: { value: 258, momPct: 0.6 },
                            medianLivingArea: { value: 1470, momPct: 0.0 },
                            totalVolume: { value: 107308000, momPct: 2.2 }
                        }
                    },
                    monthsSupply: { value: 3.0, momPct: -1.5, yoyPct: -9.0 },
                    neighborhoods: []
                },
                'jupiter-fl': {
                    name: 'Jupiter',
                    type: 'city',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'palm-beach-county-fl',
                    marketScore: { value: 46, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 4.0, momPct: 0.8, yoyPct: -3.5 },
                        soldToListPct: { value: 96.0, momPct: -0.1, yoyPct: 0.2 },
                        medianDaysOnMarket: { value: 40, momPct: -3.0, yoyPct: -7.0 },
                        medianSoldPrice: { value: 680000, momPct: 0.7, yoyPct: 4.2 },
                        medianPricePerSqft: { value: 340, momPct: 0.5, yoyPct: 3.5 },
                        priceDropPct: { value: 20.0, momPct: 1.5, yoyPct: 3.5 },
                        soldAboveListPct: { value: 18.0, momPct: -0.8, yoyPct: -2.0 }
                    },
                    medianEstimatedValue: {
                        value: 715000,
                        momPct: 0.6,
                        yoyPct: 3.8,
                        history: generateHistory({ zip: 715000, city: 680000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 710000, momPct: 1.2 },
                            numProperties: { value: 280, momPct: -3.0 },
                            medianPricePerSqft: { value: 355, momPct: 0.8 },
                            totalVolume: { value: 198800000, momPct: -1.8 },
                            medianLivingArea: { value: 2000, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 699000, momPct: 0.5 },
                            numProperties: { value: 950, momPct: 3.2 },
                            medianDays: { value: 48, momPct: -2.5 },
                            medianPricePerSqft: { value: 348, momPct: 0.3 },
                            totalVolume: { value: 664050000, momPct: 3.7 },
                            medianLivingArea: { value: 1980, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 660000, momPct: 1.0 },
                            numProperties: { value: 200, momPct: 4.5 },
                            medianDays: { value: 35, momPct: -5.0 },
                            medianPricePerSqft: { value: 332, momPct: 0.6 },
                            totalVolume: { value: 132000000, momPct: 5.5 },
                            medianLivingArea: { value: 1960, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 680000, momPct: 0.7 },
                            numProperties: { value: 175, momPct: -0.6 },
                            saleToListPct: { value: 96.0, momPct: -0.1 },
                            medianDays: { value: 40, momPct: -3.0 },
                            medianPricePerSqft: { value: 340, momPct: 0.5 },
                            totalVolume: { value: 119000000, momPct: 0.1 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 668000, momPct: 0.5 },
                            numProperties: { value: 185, momPct: 0.8 },
                            medianPricePerSqft: { value: 332, momPct: 0.3 },
                            medianLivingArea: { value: 1990, momPct: 0.0 },
                            totalVolume: { value: 123580000, momPct: 1.3 }
                        }
                    },
                    monthsSupply: { value: 4.0, momPct: 0.8, yoyPct: -3.5 },
                    neighborhoods: []
                },
                'palm-beach-gardens-fl': {
                    name: 'Palm Beach Gardens',
                    type: 'city',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'palm-beach-county-fl',
                    marketScore: { value: 50, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.8, momPct: 0.3, yoyPct: -4.5 },
                        soldToListPct: { value: 96.2, momPct: 0.0, yoyPct: 0.3 },
                        medianDaysOnMarket: { value: 38, momPct: -3.5, yoyPct: -8.0 },
                        medianSoldPrice: { value: 620000, momPct: 0.8, yoyPct: 4.5 },
                        medianPricePerSqft: { value: 320, momPct: 0.5, yoyPct: 3.8 },
                        priceDropPct: { value: 19.0, momPct: 1.2, yoyPct: 2.8 },
                        soldAboveListPct: { value: 19.5, momPct: -0.6, yoyPct: -1.5 }
                    },
                    medianEstimatedValue: {
                        value: 652000,
                        momPct: 0.7,
                        yoyPct: 4.0,
                        history: generateHistory({ zip: 652000, city: 620000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 645000, momPct: 1.2 },
                            numProperties: { value: 250, momPct: -2.5 },
                            medianPricePerSqft: { value: 335, momPct: 0.8 },
                            totalVolume: { value: 161250000, momPct: -1.3 },
                            medianLivingArea: { value: 1950, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 635000, momPct: 0.5 },
                            numProperties: { value: 820, momPct: 3.0 },
                            medianDays: { value: 46, momPct: -2.8 },
                            medianPricePerSqft: { value: 328, momPct: 0.3 },
                            totalVolume: { value: 520700000, momPct: 3.5 },
                            medianLivingArea: { value: 1930, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 605000, momPct: 1.0 },
                            numProperties: { value: 185, momPct: 4.5 },
                            medianDays: { value: 33, momPct: -5.0 },
                            medianPricePerSqft: { value: 312, momPct: 0.6 },
                            totalVolume: { value: 111925000, momPct: 5.5 },
                            medianLivingArea: { value: 1910, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 620000, momPct: 0.8 },
                            numProperties: { value: 165, momPct: -0.6 },
                            saleToListPct: { value: 96.2, momPct: 0.0 },
                            medianDays: { value: 38, momPct: -3.5 },
                            medianPricePerSqft: { value: 320, momPct: 0.5 },
                            totalVolume: { value: 102300000, momPct: 0.2 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 608000, momPct: 0.5 },
                            numProperties: { value: 175, momPct: 0.9 },
                            medianPricePerSqft: { value: 312, momPct: 0.3 },
                            medianLivingArea: { value: 1940, momPct: 0.0 },
                            totalVolume: { value: 106400000, momPct: 1.4 }
                        }
                    },
                    monthsSupply: { value: 3.8, momPct: 0.3, yoyPct: -4.5 },
                    neighborhoods: []
                },
                'wellington-fl': {
                    name: 'Wellington',
                    type: 'city',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'palm-beach-county-fl',
                    marketScore: { value: 55, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.2, momPct: -0.8, yoyPct: -6.5 },
                        soldToListPct: { value: 97.0, momPct: 0.2, yoyPct: 0.8 },
                        medianDaysOnMarket: { value: 35, momPct: -4.0, yoyPct: -9.5 },
                        medianSoldPrice: { value: 590000, momPct: 1.2, yoyPct: 5.8 },
                        medianPricePerSqft: { value: 280, momPct: 0.8, yoyPct: 4.8 },
                        priceDropPct: { value: 16.5, momPct: 0.6, yoyPct: 1.8 },
                        soldAboveListPct: { value: 22.5, momPct: -0.3, yoyPct: -0.5 }
                    },
                    medianEstimatedValue: {
                        value: 622000,
                        momPct: 1.0,
                        yoyPct: 5.2,
                        history: generateHistory({ zip: 622000, city: 590000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 615000, momPct: 1.5 },
                            numProperties: { value: 180, momPct: -2.5 },
                            medianPricePerSqft: { value: 292, momPct: 1.0 },
                            totalVolume: { value: 110700000, momPct: -1.0 },
                            medianLivingArea: { value: 2100, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 599000, momPct: 0.5 },
                            numProperties: { value: 580, momPct: 2.5 },
                            medianDays: { value: 42, momPct: -3.2 },
                            medianPricePerSqft: { value: 285, momPct: 0.4 },
                            totalVolume: { value: 347420000, momPct: 3.0 },
                            medianLivingArea: { value: 2080, momPct: -0.1 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 575000, momPct: 1.2 },
                            numProperties: { value: 145, momPct: 5.0 },
                            medianDays: { value: 30, momPct: -5.5 },
                            medianPricePerSqft: { value: 272, momPct: 0.8 },
                            totalVolume: { value: 83375000, momPct: 6.2 },
                            medianLivingArea: { value: 2060, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 590000, momPct: 1.2 },
                            numProperties: { value: 130, momPct: -0.5 },
                            saleToListPct: { value: 97.0, momPct: 0.2 },
                            medianDays: { value: 35, momPct: -4.0 },
                            medianPricePerSqft: { value: 280, momPct: 0.8 },
                            totalVolume: { value: 76700000, momPct: 0.7 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 578000, momPct: 0.8 },
                            numProperties: { value: 138, momPct: 1.0 },
                            medianPricePerSqft: { value: 272, momPct: 0.5 },
                            medianLivingArea: { value: 2090, momPct: 0.0 },
                            totalVolume: { value: 79764000, momPct: 1.8 }
                        }
                    },
                    monthsSupply: { value: 3.2, momPct: -0.8, yoyPct: -6.5 },
                    neighborhoods: []
                },
                'royal-palm-beach-fl': {
                    name: 'Royal Palm Beach',
                    type: 'city',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'palm-beach-county-fl',
                    marketScore: { value: 60, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.8, momPct: -1.8, yoyPct: -10.0 },
                        soldToListPct: { value: 97.8, momPct: 0.3, yoyPct: 1.2 },
                        medianDaysOnMarket: { value: 30, momPct: -5.5, yoyPct: -13.0 },
                        medianSoldPrice: { value: 470000, momPct: 1.5, yoyPct: 7.2 },
                        medianPricePerSqft: { value: 255, momPct: 1.0, yoyPct: 6.0 },
                        priceDropPct: { value: 13.5, momPct: -0.5, yoyPct: -0.8 },
                        soldAboveListPct: { value: 27.5, momPct: 0.5, yoyPct: 1.5 }
                    },
                    medianEstimatedValue: {
                        value: 496000,
                        momPct: 1.3,
                        yoyPct: 6.5,
                        history: generateHistory({ zip: 496000, city: 470000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 489000, momPct: 2.0 },
                            numProperties: { value: 120, momPct: -2.0 },
                            medianPricePerSqft: { value: 268, momPct: 1.2 },
                            totalVolume: { value: 58680000, momPct: 0.0 },
                            medianLivingArea: { value: 1850, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 479000, momPct: 0.6 },
                            numProperties: { value: 380, momPct: 2.2 },
                            medianDays: { value: 36, momPct: -4.0 },
                            medianPricePerSqft: { value: 260, momPct: 0.4 },
                            totalVolume: { value: 182020000, momPct: 2.8 },
                            medianLivingArea: { value: 1830, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 458000, momPct: 1.5 },
                            numProperties: { value: 100, momPct: 5.5 },
                            medianDays: { value: 26, momPct: -7.0 },
                            medianPricePerSqft: { value: 248, momPct: 0.9 },
                            totalVolume: { value: 45800000, momPct: 7.0 },
                            medianLivingArea: { value: 1820, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 470000, momPct: 1.5 },
                            numProperties: { value: 92, momPct: -0.5 },
                            saleToListPct: { value: 97.8, momPct: 0.3 },
                            medianDays: { value: 30, momPct: -5.5 },
                            medianPricePerSqft: { value: 255, momPct: 1.0 },
                            totalVolume: { value: 43240000, momPct: 1.0 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 460000, momPct: 1.0 },
                            numProperties: { value: 98, momPct: 1.2 },
                            medianPricePerSqft: { value: 248, momPct: 0.6 },
                            medianLivingArea: { value: 1840, momPct: 0.0 },
                            totalVolume: { value: 45080000, momPct: 2.2 }
                        }
                    },
                    monthsSupply: { value: 2.8, momPct: -1.8, yoyPct: -10.0 },
                    neighborhoods: []
                },
                'lake-worth-beach-fl': {
                    name: 'Lake Worth Beach',
                    type: 'city',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'palm-beach-county-fl',
                    marketScore: { value: 62, label: "Seller's Market", type: 'seller' },
                    keyMetrics: {
                        monthsOfInventory: { value: 2.8, momPct: -1.8, yoyPct: -10.5 },
                        soldToListPct: { value: 97.8, momPct: 0.3, yoyPct: 1.2 },
                        medianDaysOnMarket: { value: 30, momPct: -5.8, yoyPct: -13.5 },
                        medianSoldPrice: { value: 380000, momPct: 1.6, yoyPct: 7.5 },
                        medianPricePerSqft: { value: 285, momPct: 1.1, yoyPct: 6.2 },
                        priceDropPct: { value: 13.0, momPct: -0.5, yoyPct: -1.0 },
                        soldAboveListPct: { value: 28.0, momPct: 0.5, yoyPct: 1.8 }
                    },
                    medianEstimatedValue: {
                        value: 402000,
                        momPct: 1.4,
                        yoyPct: 6.8,
                        history: generateHistory({ zip: 402000, city: 380000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 399000, momPct: 2.0 },
                            numProperties: { value: 140, momPct: -1.8 },
                            medianPricePerSqft: { value: 298, momPct: 1.3 },
                            totalVolume: { value: 55860000, momPct: 0.2 },
                            medianLivingArea: { value: 1320, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 389000, momPct: 0.5 },
                            numProperties: { value: 440, momPct: 2.2 },
                            medianDays: { value: 36, momPct: -4.0 },
                            medianPricePerSqft: { value: 292, momPct: 0.4 },
                            totalVolume: { value: 171160000, momPct: 2.7 },
                            medianLivingArea: { value: 1300, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 368000, momPct: 1.5 },
                            numProperties: { value: 115, momPct: 5.8 },
                            medianDays: { value: 26, momPct: -7.0 },
                            medianPricePerSqft: { value: 278, momPct: 0.9 },
                            totalVolume: { value: 42320000, momPct: 7.3 },
                            medianLivingArea: { value: 1280, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 380000, momPct: 1.6 },
                            numProperties: { value: 102, momPct: -0.5 },
                            saleToListPct: { value: 97.8, momPct: 0.3 },
                            medianDays: { value: 30, momPct: -5.8 },
                            medianPricePerSqft: { value: 285, momPct: 1.1 },
                            totalVolume: { value: 38760000, momPct: 1.1 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 372000, momPct: 1.1 },
                            numProperties: { value: 108, momPct: 1.2 },
                            medianPricePerSqft: { value: 278, momPct: 0.7 },
                            medianLivingArea: { value: 1310, momPct: 0.0 },
                            totalVolume: { value: 40176000, momPct: 2.3 }
                        }
                    },
                    monthsSupply: { value: 2.8, momPct: -1.8, yoyPct: -10.5 },
                    neighborhoods: []
                },
                'riviera-beach-fl': {
                    name: 'Riviera Beach',
                    type: 'city',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'palm-beach-county-fl',
                    marketScore: { value: 59, label: 'Balanced Market', type: 'balanced' },
                    keyMetrics: {
                        monthsOfInventory: { value: 3.0, momPct: -1.2, yoyPct: -8.5 },
                        soldToListPct: { value: 97.2, momPct: 0.2, yoyPct: 0.8 },
                        medianDaysOnMarket: { value: 32, momPct: -5.0, yoyPct: -11.5 },
                        medianSoldPrice: { value: 340000, momPct: 1.5, yoyPct: 7.5 },
                        medianPricePerSqft: { value: 255, momPct: 1.0, yoyPct: 6.0 },
                        priceDropPct: { value: 14.5, momPct: -0.2, yoyPct: 0.2 },
                        soldAboveListPct: { value: 26.0, momPct: 0.4, yoyPct: 1.2 }
                    },
                    medianEstimatedValue: {
                        value: 360000,
                        momPct: 1.3,
                        yoyPct: 6.8,
                        history: generateHistory({ zip: 360000, city: 340000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 355000, momPct: 2.0 },
                            numProperties: { value: 110, momPct: -1.5 },
                            medianPricePerSqft: { value: 268, momPct: 1.3 },
                            totalVolume: { value: 39050000, momPct: 0.5 },
                            medianLivingArea: { value: 1350, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 348000, momPct: 0.6 },
                            numProperties: { value: 360, momPct: 2.2 },
                            medianDays: { value: 38, momPct: -3.8 },
                            medianPricePerSqft: { value: 260, momPct: 0.4 },
                            totalVolume: { value: 125280000, momPct: 2.8 },
                            medianLivingArea: { value: 1330, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 330000, momPct: 1.5 },
                            numProperties: { value: 92, momPct: 5.5 },
                            medianDays: { value: 28, momPct: -6.5 },
                            medianPricePerSqft: { value: 248, momPct: 0.9 },
                            totalVolume: { value: 30360000, momPct: 7.0 },
                            medianLivingArea: { value: 1320, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 340000, momPct: 1.5 },
                            numProperties: { value: 82, momPct: -0.5 },
                            saleToListPct: { value: 97.2, momPct: 0.2 },
                            medianDays: { value: 32, momPct: -5.0 },
                            medianPricePerSqft: { value: 255, momPct: 1.0 },
                            totalVolume: { value: 27880000, momPct: 1.0 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 332000, momPct: 1.0 },
                            numProperties: { value: 88, momPct: 1.2 },
                            medianPricePerSqft: { value: 248, momPct: 0.6 },
                            medianLivingArea: { value: 1340, momPct: 0.0 },
                            totalVolume: { value: 29216000, momPct: 2.2 }
                        }
                    },
                    monthsSupply: { value: 3.0, momPct: -1.2, yoyPct: -8.5 },
                    neighborhoods: []
                },
                'palm-beach-fl': {
                    name: 'Palm Beach',
                    type: 'city',
                    county: 'Palm Beach',
                    state: 'FL',
                    parentLocation: 'palm-beach-county-fl',
                    marketScore: { value: 30, label: "Buyer's Market", type: 'buyer' },
                    keyMetrics: {
                        monthsOfInventory: { value: 8.5, momPct: 4.0, yoyPct: 5.0 },
                        soldToListPct: { value: 90.5, momPct: -1.0, yoyPct: -2.5 },
                        medianDaysOnMarket: { value: 85, momPct: 3.5, yoyPct: 10.0 },
                        medianSoldPrice: { value: 2800000, momPct: -0.5, yoyPct: 1.5 },
                        medianPricePerSqft: { value: 820, momPct: -0.3, yoyPct: 1.0 },
                        priceDropPct: { value: 32.0, momPct: 4.0, yoyPct: 8.0 },
                        soldAboveListPct: { value: 8.0, momPct: -2.5, yoyPct: -5.0 }
                    },
                    medianEstimatedValue: {
                        value: 3050000,
                        momPct: -0.3,
                        yoyPct: 1.2,
                        history: generateHistory({ zip: 3050000, city: 2800000, county: 520000, state: 420000 }, 36)
                    },
                    sections: {
                        newListings: {
                            medianListPrice: { value: 3200000, momPct: 0.5 },
                            numProperties: { value: 35, momPct: -5.0 },
                            medianPricePerSqft: { value: 880, momPct: 0.2 },
                            totalVolume: { value: 112000000, momPct: -4.5 },
                            medianLivingArea: { value: 3500, momPct: 0.0 }
                        },
                        activeListings: {
                            medianListPrice: { value: 3500000, momPct: 0.8 },
                            numProperties: { value: 280, momPct: 5.5 },
                            medianDays: { value: 95, momPct: 4.0 },
                            medianPricePerSqft: { value: 900, momPct: -0.2 },
                            totalVolume: { value: 980000000, momPct: 6.3 },
                            medianLivingArea: { value: 3400, momPct: 0.0 }
                        },
                        pendingListings: {
                            medianListPrice: { value: 2650000, momPct: -1.0 },
                            numProperties: { value: 22, momPct: 2.0 },
                            medianDays: { value: 70, momPct: -2.0 },
                            medianPricePerSqft: { value: 780, momPct: -0.5 },
                            totalVolume: { value: 58300000, momPct: 1.0 },
                            medianLivingArea: { value: 3300, momPct: 0.2 }
                        },
                        closedListings: {
                            medianSoldPrice: { value: 2800000, momPct: -0.5 },
                            numProperties: { value: 18, momPct: -2.5 },
                            saleToListPct: { value: 90.5, momPct: -1.0 },
                            medianDays: { value: 85, momPct: 3.5 },
                            medianPricePerSqft: { value: 820, momPct: -0.3 },
                            totalVolume: { value: 50400000, momPct: -3.0 }
                        },
                        soldPublicRecords: {
                            medianSoldPrice: { value: 2720000, momPct: -0.8 },
                            numProperties: { value: 20, momPct: 0.5 },
                            medianPricePerSqft: { value: 800, momPct: -0.4 },
                            medianLivingArea: { value: 3450, momPct: 0.0 },
                            totalVolume: { value: 54400000, momPct: -0.3 }
                        }
                    },
                    monthsSupply: { value: 8.5, momPct: 4.0, yoyPct: 5.0 },
                    neighborhoods: []
                }
            }
        });
    },
    // Helper: get events with dates parsed
    getEvents() {
        const events = this.get('events') || [];
        return events.map(e => ({ ...e, date: new Date(e.date) }));
    },
    setEvents(events) {
        this.set('events', events.map(e => ({ ...e, date: e.date instanceof Date ? e.date.toISOString() : e.date })));
    }
};

export default store;
