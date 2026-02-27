import { formatPhoneNumber, validatePhone, showMobileToast } from '../utils.js';
import { addChatMessage } from '../components/chat.js';
import { showSuccess } from '../components/modals.js';
import store from '../store.js';

function renderInvoices() {
    const invoices = store.get('invoices') || [];

    if (invoices.length === 0) {
        return `<div class="invoices-list">
            <div style="text-align:center; padding:60px 20px; color:var(--c-text-secondary);">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:16px; opacity:0.3;">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <p style="font-size:15px; font-weight:600; margin-bottom:8px;">No invoices yet</p>
                <p style="font-size:13px;">Your invoices will appear here after completing a payment</p>
            </div>
        </div>`;
    }

    // Sort by date (newest first)
    const sortedInvoices = [...invoices].sort((a, b) => new Date(b.date) - new Date(a.date));

    return `<div class="invoices-list">
        ${sortedInvoices.map(invoice => {
            const date = new Date(invoice.date);
            const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/');

            return `<div class="invoice-card" data-invoice-id="${invoice.id}">
                <div class="invoice-info">
                    <span class="invoice-date">${formattedDate}</span>
                    <span class="invoice-address">
                        <span class="address-main">${invoice.propertyAddress}</span>
                        <span class="address-secondary">${invoice.packageName} Package • ${invoice.invoiceNumber}</span>
                    </span>
                </div>
                <span class="invoice-price">$${invoice.total.toFixed(2)}</span>
                <button class="btn invoice-print-btn print-invoice-btn" data-invoice-id="${invoice.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                </button>
            </div>`;
        }).join('')}
    </div>`;
}

export function render() {
    return `<div class="visit-tabs">
        <div class="message-tabs">
            <button class="message-tab active" id="profileTab">Profile</button>
            <button class="message-tab" id="invoicesTab">Invoices</button>
            <button class="message-tab" id="notificationsTab">Notifications</button>
        </div>
    </div>
    <div id="accountProfile">
        <div class="profile-container"><div class="profile-section"><div class="profile-form">
            <div class="profile-row-2">
                <div class="profile-field"><label>Full Name</label><div class="profile-input-wrapper"><input type="text" value="John Doe" disabled class="profile-input disabled"><span class="lock-icon">🔒</span></div></div>
                <div class="profile-field"><label>Email Address</label><div class="profile-input-wrapper"><input type="email" value="john.doe@email.com" disabled class="profile-input disabled"><span class="lock-icon">🔒</span></div></div>
            </div>
            <div class="profile-row-2">
                <div class="profile-field"><label>Primary Phone<span class="required-mark">*</span></label><input type="tel" id="primaryPhone" value="(305) 555-1234" class="profile-input" maxlength="14"><span class="field-error" id="primaryPhoneError"></span></div>
                <div class="profile-field"><label>Secondary Email</label><input type="email" id="secondaryEmail" placeholder="Add secondary email" class="profile-input"></div>
            </div>
            <div class="profile-row-2">
                <div class="profile-field"><label>Secondary Phone</label><input type="tel" id="secondaryPhone" placeholder="(___) ___-____" class="profile-input" maxlength="14"><span class="field-error" id="secondaryPhoneError"></span></div>
                <div></div>
            </div>
            <div class="phone-update-option" id="phoneUpdateOption" style="display: none;"><label class="checkbox-label"><input type="checkbox" id="updateMlsPhone"><span>Check this box to apply this phone number update to all your currently active listings on the MLS (if any).</span></label></div>
            <div class="profile-field"><label>Shipping Address</label><input type="text" id="shippingAddress" placeholder="123 Main St, Miami, FL 33101" class="profile-input"></div>
            <div class="profile-actions"><button class="btn btn-p" id="saveProfileBtn">Save Changes</button></div>
        </div></div></div>
    </div>
    <div id="accountInvoices" style="display: none;">
        ${renderInvoices()}
    </div>
    <div id="accountNotifications" style="display: none;">
        <div class="profile-container"><div class="profile-section"><div class="notifications-form">
            <p class="notifications-intro">Choose how you want to receive communications from us. <span class="ask-artur-hint" id="askArturNotif">Not sure? Ask Artur</span></p>
            <div class="notification-option"><div class="notification-option-info"><span class="notification-option-title">Email</span><span class="notification-option-desc">Receive updates, offers, and alerts via email</span></div><label class="toggle-switch"><input type="checkbox" checked><span class="toggle-slider"></span></label></div>
            <div class="notification-option"><div class="notification-option-info"><span class="notification-option-title">SMS / Text Messages</span><span class="notification-option-desc">Receive alerts and reminders via text message</span></div><label class="toggle-switch"><input type="checkbox" checked><span class="toggle-slider"></span></label></div>
            <div class="notification-option"><div class="notification-option-info"><span class="notification-option-title">Phone Calls</span><span class="notification-option-desc">Allow us to contact you by phone</span></div><label class="toggle-switch"><input type="checkbox"><span class="toggle-slider"></span></label></div>
            <div class="notification-option"><div class="notification-option-info"><span class="notification-option-title">Marketing Communications</span><span class="notification-option-desc">Receive promotional offers and newsletters</span></div><label class="toggle-switch"><input type="checkbox"><span class="toggle-slider"></span></label></div>
            <div class="profile-actions"><button class="btn btn-p" id="saveNotifsBtn">Save Preferences</button></div>
        </div></div></div>
    </div>`;
}

export function init() {
    // Tab switching
    const tabs = { profileTab: 'profile', invoicesTab: 'invoices', notificationsTab: 'notifications' };
    Object.entries(tabs).forEach(([tabId, name]) => {
        document.getElementById(tabId)?.addEventListener('click', () => switchAccountTab(name));
    });

    // Phone formatting
    const primaryPhone = document.getElementById('primaryPhone');
    if (primaryPhone) primaryPhone.addEventListener('input', function () { formatPhoneNumber(this); showPhoneUpdateOption(); });
    const secondaryPhone = document.getElementById('secondaryPhone');
    if (secondaryPhone) secondaryPhone.addEventListener('input', function () { formatPhoneNumber(this); });

    // Save profile
    document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
        const primary = document.getElementById('primaryPhone');
        const secondary = document.getElementById('secondaryPhone');
        const primaryValid = validatePhone(primary);
        const secondaryValid = secondary.value.length === 0 || validatePhone(secondary);
        if (!primaryValid || !secondaryValid) return;
        showSuccess('Profile Saved', 'Your changes have been saved successfully.');
        document.getElementById('phoneUpdateOption').style.display = 'none';
    });

    // Save notifications
    document.getElementById('saveNotifsBtn')?.addEventListener('click', () => {
        showSuccess('Preferences Saved', 'Your notification preferences have been updated.');
    });

    // Print invoice buttons
    document.querySelectorAll('.print-invoice-btn').forEach(btn => {
        btn.addEventListener('click', () => showMobileToast('🖨️ Printing...'));
    });


    // Ask Artur
    document.getElementById('askArturNotif')?.addEventListener('click', () => {
        addChatMessage('📱 <strong>About Notifications:</strong><br><br>• <strong>Email</strong> - Get updates about offers, visits, and messages<br>• <strong>SMS</strong> - Quick alerts for time-sensitive items<br>• <strong>Phone</strong> - Only for urgent matters (rarely used)<br>• <strong>Marketing</strong> - Tips and market updates (optional)<br><br>I recommend keeping Email and SMS on so you never miss an offer!');
    });
}

function switchAccountTab(tab) {
    document.getElementById('profileTab').classList.toggle('active', tab === 'profile');
    document.getElementById('invoicesTab').classList.toggle('active', tab === 'invoices');
    document.getElementById('notificationsTab').classList.toggle('active', tab === 'notifications');
    document.getElementById('accountProfile').style.display = tab === 'profile' ? 'block' : 'none';
    document.getElementById('accountInvoices').style.display = tab === 'invoices' ? 'block' : 'none';
    document.getElementById('accountNotifications').style.display = tab === 'notifications' ? 'block' : 'none';
}

function showPhoneUpdateOption() {
    const original = '(305) 555-1234';
    const current = document.getElementById('primaryPhone').value;
    document.getElementById('phoneUpdateOption').style.display = current !== original ? 'block' : 'none';
}
