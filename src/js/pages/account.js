import { formatPhoneNumber, validatePhone, showMobileToast } from '../utils.js';
import { addChatMessage } from '../components/chat.js';
import { showSuccess } from '../components/modals.js';

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
                <div class="profile-field"><label>Full Name <span class="info-bubble" id="nameInfoBubble">?<span class="info-tooltip">Each login is tied to a unique identifier. Credentials are unique, cannot be shared, and cannot be changed.</span></span></label><div class="profile-input-wrapper"><input type="text" value="John Doe" disabled class="profile-input disabled"><span class="lock-icon">🔒</span></div></div>
                <div class="profile-field"><label>Email Address</label><div class="profile-input-wrapper"><input type="email" value="john.doe@email.com" disabled class="profile-input disabled"><span class="lock-icon">🔒</span></div></div>
            </div>
            <div class="profile-field"><label>Secondary Email <span class="info-bubble" id="emailInfoBubble">?<span class="info-tooltip">A secondary email address can receive the same emails as the primary one, but it can't be used to access the dashboard.</span></span></label><input type="email" id="secondaryEmail" placeholder="Add secondary email" class="profile-input"></div>
            <div class="profile-row-2">
                <div class="profile-field"><label>Primary Phone<span class="required-mark">*</span></label><input type="tel" id="primaryPhone" value="(305) 555-1234" class="profile-input" maxlength="14"><span class="field-error" id="primaryPhoneError"></span></div>
                <div class="profile-field"><label>Secondary Phone <span class="info-bubble" id="phoneInfoBubble">?<span class="info-tooltip">A backup phone number is only used if we can't reach you on your primary phone.</span></span></label><input type="tel" id="secondaryPhone" placeholder="(___) ___-____" class="profile-input" maxlength="14"><span class="field-error" id="secondaryPhoneError"></span></div>
            </div>
            <div class="phone-update-option" id="phoneUpdateOption" style="display: none;"><label class="checkbox-label"><input type="checkbox" id="updateMlsPhone"><span>Check this box to apply this phone number update to all your currently active listings on the MLS (if any).</span></label></div>
            <div class="profile-field"><label>Shipping Address</label><input type="text" id="shippingAddress" placeholder="123 Main St, Miami, FL 33101" class="profile-input"></div>
            <div class="profile-actions"><button class="btn btn-p" id="saveProfileBtn">Save Changes</button></div>
        </div></div></div>
    </div>
    <div id="accountInvoices" style="display: none;">
        <div class="invoices-list">
            <div class="invoice-card"><div class="invoice-info"><span class="invoice-date">2026/01/15</span><span class="invoice-address"><span class="address-main">1505 N Jean Baptiste Pointe du Sable Lake Shore Dr</span><span class="address-secondary">Bonadelle Ranchos-Madera Ranchos, CA 33135</span></span></div><span class="invoice-price">$299.00</span><button class="btn invoice-print-btn print-invoice-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg></button></div>
            <div class="invoice-card"><div class="invoice-info"><span class="invoice-date">2025/12/20</span><span class="invoice-address"><span class="address-main">456 Ocean Drive</span><span class="address-secondary">Miami Beach, FL 33139</span></span></div><span class="invoice-price">$299.00</span><button class="btn invoice-print-btn print-invoice-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg></button></div>
            <div class="invoice-card"><div class="invoice-info"><span class="invoice-date">2025/11/05</span><span class="invoice-address"><span class="address-main">789 Palm Avenue</span><span class="address-secondary">Coral Gables, FL 33134</span></span></div><span class="invoice-price">$299.00</span><button class="btn invoice-print-btn print-invoice-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg></button></div>
        </div>
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

    // Info bubbles
    document.querySelectorAll('.info-bubble').forEach(b => {
        b.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); document.querySelectorAll('.info-bubble').forEach(x => { if (x !== b) x.classList.remove('active'); }); b.classList.toggle('active'); });
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
