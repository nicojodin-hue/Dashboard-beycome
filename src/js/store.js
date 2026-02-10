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
        if (!this.get('properties')) {
            this.set('properties', [
                { id: 'all', name: 'All Properties' },
                { id: '456 Ocean Drive', name: '456 Ocean Drive, Miami Beach, FL' }
            ]);
        }
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
