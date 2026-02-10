import { closeModal, showMobileToast, isDesktopView } from '../utils.js';
import store from '../store.js';
import { addChatMessage, startComposing } from './chat.js';

export function renderModals() {
    return `
    <div class="modal-overlay" id="successModal"><div class="modal"><div class="success-message"><div class="success-icon" id="successIcon">👍</div><h2 id="successTitle">Success!</h2><p id="successMessage">Your response has been sent.</p><button class="btn btn-s btn-lg modal-btn" id="successCloseBtn" style="max-width: 200px; margin: 0 auto;">Close</button></div></div></div>
    <div class="modal-overlay" id="composeModal"><div class="modal"><h2>New Message</h2><div class="form-group"><label>To</label><input type="text" id="composeTo" placeholder="Enter recipient name or email"></div><div class="form-group"><label>Subject</label><input type="text" id="composeSubject" placeholder="Enter subject"></div><div class="form-group"><label>Message</label><textarea id="composeMessage" placeholder="Type your message here..." style="min-height: 150px;"></textarea></div><div class="modal-actions"><button class="btn btn-s btn-lg modal-btn" id="composeCancelBtn">Cancel</button><button class="btn btn-p btn-lg modal-btn" id="composeSendBtn">Send Message</button></div></div></div>
    <div class="modal-overlay" id="messageModal"><div class="modal"><h2 style="font-size: 16px;"><span id="messageModalTitle" style="color: var(--c-primary);">Message to</span> <span id="messageModalAddress"></span></h2><div id="messageModalContactInfo" style="margin-bottom: 20px;"><div style="flex-direction: column; align-items: flex-start; gap: 8px;"><h3 style="margin: 0 0 1.6em 0; font-size: 13px; font-weight: normal; color: var(--c-text-secondary);">From <span id="messageModalName" style="font-weight: bold;"></span></h3><div class="visit-meta-row"><a href="#" id="messageModalPhoneRow" style="display: flex; align-items: center; gap: 6px; text-decoration: none; color: var(--c-text-secondary);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><span id="messageModalPhone"></span></a><span style="color: var(--c-text-secondary);" id="messageModalDivider">·</span><a href="#" id="messageModalEmailRow" style="display: flex; align-items: center; gap: 6px; text-decoration: none; color: var(--c-text-secondary);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg><span id="messageModalEmail"></span></a></div></div></div><div class="form-group"><textarea id="messageText" placeholder="Type your message here..."></textarea></div><div class="modal-actions"><button class="btn btn-s btn-lg modal-btn" id="messageCancelBtn">Cancel</button><button class="btn btn-p btn-lg modal-btn" id="messageSendBtn">Send Message</button></div></div></div>
    <div class="modal-overlay" id="declineVisitModal"><div class="modal"><h2>Just checking 😄</h2><p id="declineVisitModalText">This will decline the visit and notify the buyer.</p><div class="modal-actions" style="gap: 10px;"><button class="btn btn-s btn-lg modal-btn" id="declineKeepBtn">Keep it</button><button class="btn btn-accent btn-lg modal-btn" id="declineRescheduleBtn">Reschedule</button><button class="btn btn-danger btn-lg modal-btn" id="declineConfirmBtn">Decline it</button></div></div></div>
    <div class="modal-overlay" id="cancelVisitModal"><div class="modal"><h2>Hold on 👀</h2><p id="cancelVisitModalText">This will cancel the visit and we'll notify the buyer.</p><div class="modal-actions" style="gap: 10px;"><button class="btn btn-s btn-lg modal-btn" id="cancelKeepBtn">Keep it</button><button class="btn btn-accent btn-lg modal-btn" id="cancelRescheduleBtn">Reschedule</button><button class="btn btn-danger btn-lg modal-btn" id="cancelConfirmBtn">Cancel it</button></div></div></div>
    <div class="event-popover" id="eventPopover" style="display: none;">
        <div class="event-popover-header">
            <span class="event-popover-badge confirmed" id="eventPopoverBadge">Confirmed</span>
            <button class="event-popover-close" id="eventPopoverClose"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        </div>
        <div class="event-popover-title" id="eventPopoverTitle">Property Address</div>
        <div class="event-popover-details">
            <div class="event-popover-row"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg><span id="eventPopoverDate">Feb 02, 2026</span></div>
            <div class="event-popover-row"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><span id="eventPopoverTime">11:00 AM</span></div>
            <div class="event-popover-row"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span id="eventPopoverPerson"><strong>David Miller</strong></span></div>
        </div>
        <div class="event-popover-actions" id="eventPopoverActions">
            <button class="btn" id="eventMessageBtn" style="flex:1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>Message</button>
            <button class="btn btn-p" id="eventCalendarBtn" style="flex:1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>Add to Calendar</button>
        </div>
    </div>
    <div class="modal-overlay" id="addEventModal">
        <div class="modal" style="max-width: 480px;">
            <h2>📅 Add to Calendar</h2>
            <div class="form-group"><label>Event Type</label><select id="addEventType" class="form-select"><option value="visit">👁️ Visit / Showing</option><option value="milestone">📋 Milestone</option><option value="deadline">⚠️ Deadline</option><option value="closing">🔑 Closing</option><option value="other">📌 Other</option></select></div>
            <div class="form-group"><label>Property</label><select id="addEventProperty" class="form-select"><option value="1505 N Jean Baptiste Pointe du Sable Lake Shore Dr">1505 N Jean Baptiste Pointe du Sable Lake Shore Dr</option><option value="456 Ocean Drive">456 Ocean Drive, Miami Beach, FL</option><option value="789 Palm Avenue">789 Palm Avenue, Coral Gables, FL</option></select></div>
            <div class="form-group"><label>Title / Description</label><input type="text" id="addEventTitle" placeholder="e.g., Home Inspection with ABC Inspections"></div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;"><div class="form-group"><label>Date</label><input type="date" id="addEventDate"></div><div class="form-group"><label>Time</label><input type="time" id="addEventTime" value="10:00"></div></div>
            <div class="form-group"><label>Contact Person (Optional)</label><input type="text" id="addEventContact" placeholder="e.g., John Smith"></div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;"><div class="form-group"><label>Phone</label><input type="tel" id="addEventPhone" placeholder="(305) 555-0000"></div><div class="form-group"><label>Email</label><input type="email" id="addEventEmail" placeholder="email@example.com"></div></div>
            <div class="modal-actions"><button class="btn btn-s btn-lg modal-btn" id="addEventCancelBtn">Cancel</button><button class="btn btn-p btn-lg modal-btn" id="addEventSaveBtn">Add to Calendar</button></div>
        </div>
    </div>
    <div class="modal-overlay" id="documentViewerModal">
        <div class="modal" style="max-width: 800px; padding: 0; overflow: hidden;">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--c-border);"><h3 id="documentViewerTitle" style="margin: 0; font-size: 16px; font-weight: 600;">Document</h3><div style="display: flex; gap: 8px;"><button class="btn" id="docDownloadBtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Download</button><button class="btn btn-s" id="docCloseBtn">Close</button></div></div>
            <div style="padding: 40px; min-height: 400px; background: var(--c-bg-light); display: flex; align-items: center; justify-content: center;"><div style="text-align: center; color: var(--c-text-secondary);"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 16px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg><p style="font-size: 14px;">Document preview</p></div></div>
        </div>
    </div>
    <div class="mobile-message-view" id="mobileMessageView">
        <div class="mobile-message-header">
            <button class="mobile-back-btn" id="mobileMessageBack"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <div class="mobile-message-title"><h3 id="mobileMessageSubject">Subject</h3><p id="mobileMessageStatus">Status</p></div>
            <div class="mobile-message-actions-top"></div>
        </div>
        <div class="mobile-message-thread" id="mobileMessageThread"></div>
        <div class="mobile-message-reply">
            <div id="mobilePendingAttachments" class="pending-attachments" style="display: none;"></div>
            <div class="mobile-reply-wrapper">
                <button class="mobile-attach-btn" id="mobileAttachBtn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>
                <input type="text" class="mobile-reply-input" id="mobileReplyInput" placeholder="Type your reply...">
                <button class="mobile-send-btn" id="mobileReplySendBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></button>
            </div>
            <input type="file" id="mobileFileInput" style="display: none;" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png">
        </div>
    </div>`;
}

export function initModals() {
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o) o.classList.remove('show'); }));

    // Success modal
    document.getElementById('successCloseBtn')?.addEventListener('click', () => closeModal('successModal'));

    // Compose modal
    document.getElementById('composeCancelBtn')?.addEventListener('click', () => closeModal('composeModal'));
    document.getElementById('composeSendBtn')?.addEventListener('click', sendNewMessage);

    // Message modal
    document.getElementById('messageCancelBtn')?.addEventListener('click', () => closeModal('messageModal'));
    document.getElementById('messageSendBtn')?.addEventListener('click', sendContactMessage);

    // Decline visit modal
    document.getElementById('declineKeepBtn')?.addEventListener('click', () => closeModal('declineVisitModal'));
    document.getElementById('declineRescheduleBtn')?.addEventListener('click', () => { closeModal('declineVisitModal'); showSuccess('Reschedule Request Sent', '📧 We\'ll automatically send a reschedule request to the lead.'); });
    document.getElementById('declineConfirmBtn')?.addEventListener('click', () => { closeModal('declineVisitModal'); showSuccess('Done!', 'The visit has been declined.'); });

    // Cancel visit modal
    document.getElementById('cancelKeepBtn')?.addEventListener('click', () => closeModal('cancelVisitModal'));
    document.getElementById('cancelRescheduleBtn')?.addEventListener('click', () => { closeModal('cancelVisitModal'); showSuccess('Reschedule Request Sent', '📧 We\'ll automatically send a reschedule request.'); });
    document.getElementById('cancelConfirmBtn')?.addEventListener('click', () => { closeModal('cancelVisitModal'); showSuccess('Visit Cancelled', 'We\'ll automatically send your cancellation request.'); });

    // Event popover
    document.getElementById('eventPopoverClose')?.addEventListener('click', closeEventPopover);
    document.getElementById('eventCalendarBtn')?.addEventListener('click', () => { showMobileToast('📅 Opening Google Calendar...'); closeEventPopover(); });

    // Add event modal
    document.getElementById('addEventCancelBtn')?.addEventListener('click', () => closeModal('addEventModal'));
    document.getElementById('addEventSaveBtn')?.addEventListener('click', saveNewEvent);

    // Document viewer
    document.getElementById('docDownloadBtn')?.addEventListener('click', () => showMobileToast('📥 Downloading...'));
    document.getElementById('docCloseBtn')?.addEventListener('click', () => closeModal('documentViewerModal'));

    // Mobile message view
    document.getElementById('mobileMessageBack')?.addEventListener('click', () => document.getElementById('mobileMessageView').classList.remove('show'));

    // Close event popover on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.event-popover') && !e.target.closest('.calendar-event') && !e.target.closest('.week-event')) closeEventPopover();
        if (!e.target.closest('.info-bubble')) document.querySelectorAll('.info-bubble').forEach(b => b.classList.remove('active'));
    });
}

export function showSuccess(title, message) {
    document.getElementById('successTitle').textContent = title;
    document.getElementById('successMessage').innerHTML = message;
    document.getElementById('successModal').classList.add('show');
}

function sendNewMessage() {
    const to = document.getElementById('composeTo').value.trim();
    const subj = document.getElementById('composeSubject').value.trim();
    const msg = document.getElementById('composeMessage').value.trim();
    if (!to || !msg) { alert('Please fill in recipient and message.'); return; }
    const messages = store.get('messages');
    const ts = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
    messages.sent.unshift({ id: Date.now(), to, subject: subj || '(No subject)', message: msg, time: ts });
    store.set('messages', messages);
    closeModal('composeModal');
    if (isDesktopView()) addChatMessage('📤 Your message to <strong>' + to + '</strong> has been sent!');
    else showSuccess('Message Sent!', 'Your message has been delivered.');
}

function sendContactMessage() {
    const msg = document.getElementById('messageText').value.trim();
    const name = document.getElementById('messageModalName').textContent;
    closeModal('messageModal');
    if (isDesktopView()) { addChatMessage('Send message to ' + name, true); setTimeout(() => addChatMessage('✉️ Your message has been <strong>sent</strong>!'), 600); }
    else showSuccess('Message Sent!', 'Your message has been delivered.');
    if (msg) {
        const messages = store.get('messages');
        const ts = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
        messages.sent.unshift({ id: Date.now(), to: name, subject: 'Message to ' + name, message: msg, time: ts });
        store.set('messages', messages);
    }
}

export function closeEventPopover() {
    document.getElementById('eventPopover').style.display = 'none';
}

function saveNewEvent() {
    const type = document.getElementById('addEventType').value;
    const prop = document.getElementById('addEventProperty').value;
    const title = document.getElementById('addEventTitle').value.trim();
    const dateVal = document.getElementById('addEventDate').value;
    const timeVal = document.getElementById('addEventTime').value;
    const contact = document.getElementById('addEventContact').value.trim();
    if (!title || !dateVal || !timeVal) { showMobileToast('Please fill in title, date and time'); return; }
    const [y, m, d] = dateVal.split('-').map(Number);
    const [h, mi] = timeVal.split(':').map(Number);
    const ed = new Date(y, m - 1, d, h, mi);
    const events = store.getEvents();
    events.push({ id: Date.now(), type: type === 'other' ? 'milestone' : type, status: 'upcoming', title: title + ' - ' + prop, shortTitle: title, date: ed, person: contact, phone: document.getElementById('addEventPhone').value, email: document.getElementById('addEventEmail').value, property: prop });
    store.setEvents(events);
    closeModal('addEventModal');
    showMobileToast('✅ Event added to calendar');
    if (isDesktopView()) addChatMessage('✅ I\'ve added <strong>' + title + '</strong> to your calendar.');
    // Trigger calendar re-render if on calendar page
    if (window.app && window.app.renderCalendar) window.app.renderCalendar();
}

export function showMessageModal(name, address, email, phone, title) {
    if (isDesktopView()) {
        addChatMessage('Contact ' + name, true);
        setTimeout(() => {
            let ci = '📋 <strong>' + name + '</strong><br>';
            if (phone) ci += '📞 ' + phone + '<br>';
            if (email) ci += '✉️ ' + email;
            const cm = document.getElementById('chatMessages');
            const d = document.createElement('div');
            d.className = 'chat-message bot';
            d.innerHTML = '<div><div class="message-bubble">' + ci + '<br><br>Would you like to send a message?</div><div style="display: flex; gap: 8px; margin-top: 12px;"><button class="btn chat-cancel-contact">Cancel</button><button class="btn btn-success chat-send-contact">Send a Message</button></div></div>';
            cm.appendChild(d);
            cm.scrollTop = cm.scrollHeight;
            d.querySelector('.chat-cancel-contact').addEventListener('click', function () {
                this.parentElement.style.display = 'none';
                addChatMessage('Cancel', true);
                setTimeout(() => addChatMessage('No problem!'), 600);
            });
            d.querySelector('.chat-send-contact').addEventListener('click', function () {
                this.parentElement.style.display = 'none';
                addChatMessage('Send a Message', true);
                startComposing(name);
            });
        }, 600);
    } else {
        document.getElementById('messageModalTitle').textContent = title || 'Message to';
        document.getElementById('messageModalAddress').textContent = address;
        document.getElementById('messageModalName').textContent = name;
        document.getElementById('messageModalPhone').textContent = phone || '';
        document.getElementById('messageModalPhoneRow').href = phone ? 'tel:' + phone : '#';
        document.getElementById('messageModalPhoneRow').style.display = phone ? 'flex' : 'none';
        document.getElementById('messageModalEmail').textContent = email || '';
        document.getElementById('messageModalEmailRow').href = email ? 'mailto:' + email : '#';
        document.getElementById('messageModalEmailRow').style.display = email ? 'flex' : 'none';
        document.getElementById('messageModalDivider').style.display = (phone && email) ? 'inline' : 'none';
        document.getElementById('messageText').value = '';
        document.getElementById('messageModal').classList.add('show');
    }
}

export function showComposeModal() {
    document.getElementById('composeTo').value = '';
    document.getElementById('composeSubject').value = '';
    document.getElementById('composeMessage').value = '';
    document.getElementById('composeModal').classList.add('show');
}
