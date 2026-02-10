import store from '../store.js';
import { toggleMenu, isDesktopView, renderDocumentsHtml, showMobileToast, formatFileSize } from '../utils.js';
import { addChatMessage, startReply } from '../components/chat.js';
import { showMessageModal, showComposeModal } from '../components/modals.js';

let currentMessageFilter = 'all';
let mobilePendingFiles = [];
let currentMobileMessageId = null;

export function render() {
    return `<div class="visit-tabs">
        <button class="btn btn-accent compose-btn" id="composeBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>Compose</button>
        <div class="message-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="messageSearchInput" placeholder="Search">
        </div>
        <div class="filter-dropdown">
            <button class="filter-btn" id="messageFilterBtn"><span id="messageFilterText">All</span><span class="filter-count" id="messageFilterCount">4</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
            <div class="menu" id="messageFilterMenu">
                <button class="menu-item active" data-filter="all">All <span class="filter-count">4</span></button>
                <button class="menu-item" data-filter="unread">Unread <span class="filter-count">2</span></button>
                <button class="menu-item" data-filter="read">Read <span class="filter-count">2</span></button>
                <button class="menu-item" data-filter="sent">Sent <span class="filter-count" id="sentFilterCount">0</span></button>
            </div>
        </div>
    </div>
    <div id="messagesInbox"><div id="inboxList" style="display: block !important;"></div></div>`;
}

export function init() {
    document.getElementById('composeBtn')?.addEventListener('click', showComposeModal);
    document.getElementById('messageFilterBtn')?.addEventListener('click', (e) => toggleMenu('messageFilterMenu', e));
    document.getElementById('messageSearchInput')?.addEventListener('input', renderInboxMessages);

    document.querySelectorAll('#messageFilterMenu .menu-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('#messageFilterMenu .menu-item').forEach(i => i.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('messageFilterMenu').classList.remove('show');
            currentMessageFilter = btn.dataset.filter;
            document.getElementById('messageFilterText').textContent = btn.textContent.trim().split(' ')[0];
            renderInboxMessages();
        });
    });

    // Mobile reply handlers
    document.getElementById('mobileReplySendBtn')?.addEventListener('click', sendMobileReply);
    document.getElementById('mobileReplyInput')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMobileReply(); });
    document.getElementById('mobileAttachBtn')?.addEventListener('click', () => document.getElementById('mobileFileInput').click());
    document.getElementById('mobileFileInput')?.addEventListener('change', handleMobileFileSelect);

    renderInboxMessages();
}

export function renderInboxMessages() {
    const messages = store.get('messages');
    if (!messages) return;
    const q = (document.getElementById('messageSearchInput')?.value || '').toLowerCase().trim();

    if (currentMessageFilter === 'sent') {
        document.getElementById('inboxList').innerHTML = messages.sent.length > 0 ? messages.sent.filter(m => !q || m.to.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q)).map(m =>
            `<div class="visit-card"><div class="visit-card-content"><div class="visit-info"><h3>${m.subject}</h3><p class="msg-preview">${(m.message || '').substring(0, 80)}${m.message && m.message.length > 80 ? '...' : ''}</p><div class="visit-meta-row"><span><strong>${m.time}</strong></span><span>to <strong>${m.to}</strong></span></div></div></div></div>`
        ).join('') : '<p class="empty-state">No messages have been sent yet.</p>';
        return;
    }

    const filtered = messages.inbox.filter(m => {
        if (currentMessageFilter === 'unread' && !m.unread) return false;
        if (currentMessageFilter === 'read' && m.unread) return false;
        if (!q) return true;
        return m.sender.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q) || m.thread.some(t => t.text.toLowerCase().includes(q));
    }).sort((a, b) => (b.unread ? 1 : 0) - (a.unread ? 1 : 0));

    document.getElementById('inboxList').innerHTML = filtered.map(m => {
        const preview = m.thread.length > 0 ? m.thread[m.thread.length - 1].text.substring(0, 80) + (m.thread[m.thread.length - 1].text.length > 80 ? '...' : '') : '';
        return `<div class="visit-card ${m.unread ? 'unread' : ''}" data-msg-id="${m.id}">
            <div class="visit-card-content"><div class="visit-info">
                <h3>${m.subject}${m.unread ? ' <span class="status-badge new">Unread</span>' : ''}</h3>
                <p class="msg-preview">${preview}</p>
                <div class="visit-meta-row"><span><strong>${m.time}</strong></span><span>from <strong>${m.sender}</strong></span>
                <button class="contact-icon-btn msg-contact-btn" data-contact='${JSON.stringify({ name: m.sender, address: m.subject, email: m.email, phone: m.phone, title: 'Reply to' })}'><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button></div>
            </div><div class="visit-actions"><button class="btn view-msg-btn">View Message</button></div></div></div>`;
    }).join('') || '<p class="empty-state">No messages found.</p>';

    // Attach event listeners
    document.querySelectorAll('#inboxList .visit-card[data-msg-id]').forEach(card => {
        card.addEventListener('click', () => selectInboxMessage(parseInt(card.dataset.msgId)));
    });
    document.querySelectorAll('#inboxList .msg-contact-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const c = JSON.parse(btn.dataset.contact);
            showMessageModal(c.name, c.address, c.email, c.phone, c.title);
        });
    });
    document.querySelectorAll('#inboxList .view-msg-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.visit-card');
            selectInboxMessage(parseInt(card.dataset.msgId));
        });
    });

    updateMessageFilterCount();
}

function selectInboxMessage(id) {
    const messages = store.get('messages');
    const m = messages.inbox.find(x => x.id === id);
    if (!m) return;
    if (m.unread) { m.unread = false; m.status = 'read'; store.set('messages', messages); updateMessagesBadge(); }
    renderInboxMessages();

    if (!isDesktopView()) { openMobileMessageView(m); return; }

    const cm = document.getElementById('chatMessages');
    let ch = `<div class="chat-message bot"><div><div class="message-bubble">📬 <strong>${m.subject}</strong><div style="margin-top: 8px; font-size: 13px; color: var(--c-text-secondary);"><div>${m.sender}</div>${m.phone ? '<div>' + m.phone + '</div>' : ''}${m.email ? '<div>' + m.email + '</div>' : ''}</div></div></div></div>`;
    m.thread.forEach(t => {
        const docs = renderDocumentsHtml(t.documents);
        if (t.type === 'incoming') ch += `<div class="chat-message bot"><div><div class="message-bubble" style="background: var(--c-bg-light); border-radius: 14px;"><strong>${t.sender}</strong><br>${t.text}${docs}</div></div></div>`;
        else ch += `<div class="chat-message user"><div><div class="message-bubble">${t.text}${docs}</div></div></div>`;
    });
    ch += `<div class="chat-message bot"><div><div class="message-bubble">Would you like to respond?</div><div style="display: flex; gap: 8px; margin-top: 12px;"><button class="btn btn-p" id="chatReplyBtn">Reply</button></div></div></div>`;
    cm.innerHTML = ch;
    cm.scrollTop = cm.scrollHeight;
    document.getElementById('chatReplyBtn')?.addEventListener('click', () => startReply(m.id));
}

function openMobileMessageView(m) {
    currentMobileMessageId = m.id;
    document.getElementById('mobileMessageSubject').textContent = m.subject;
    document.getElementById('mobileMessageStatus').innerHTML = '<strong>' + m.sender + '</strong>' + (m.phone ? ' · <a href="tel:' + m.phone + '" style="color: var(--c-text-secondary); text-decoration: none;">' + m.phone + '</a>' : '') + (m.email ? ' · <a href="mailto:' + m.email + '" style="color: var(--c-text-secondary); text-decoration: none;">' + m.email + '</a>' : '');
    let th = '';
    m.thread.forEach(t => {
        const docs = renderDocumentsHtml(t.documents);
        if (t.type === 'incoming') th += '<div class="mobile-thread-message incoming"><div class="mobile-thread-bubble"><div class="mobile-thread-text">' + t.text + '</div>' + docs + '<div class="mobile-thread-time">' + t.time + '</div></div></div>';
        else th += '<div class="mobile-thread-message outgoing"><div class="mobile-thread-bubble"><div class="mobile-thread-text">' + t.text + '</div>' + docs + '<div class="mobile-thread-time">' + t.time + '</div></div></div>';
    });
    document.getElementById('mobileMessageThread').innerHTML = th;
    document.getElementById('mobileMessageView').classList.add('show');
    document.getElementById('mobileReplyInput').placeholder = 'Reply to ' + m.sender + '...';
}

function sendMobileReply() {
    const i = document.getElementById('mobileReplyInput');
    const t = i.value.trim();
    if (!t && mobilePendingFiles.length === 0) return;
    if (!currentMobileMessageId) return;
    const messages = store.get('messages');
    const m = messages.inbox.find(x => x.id === currentMobileMessageId);
    if (!m) return;
    m.thread.push({ type: 'outgoing', text: t || 'Sent attachment(s)', sender: 'You', time: 'Just now', documents: [...mobilePendingFiles] });
    m.status = 'replied';
    store.set('messages', messages);
    i.value = '';
    mobilePendingFiles = [];
    openMobileMessageView(m);
    document.getElementById('mobileMessageThread').scrollTop = document.getElementById('mobileMessageThread').scrollHeight;
    renderInboxMessages();
    showMobileToast('Reply sent!');
}

function handleMobileFileSelect(e) {
    const f = e.target.files;
    for (let i = 0; i < f.length; i++) mobilePendingFiles.push({ name: f[i].name, size: formatFileSize(f[i].size), type: f[i].name.split('.').pop().toLowerCase() });
    e.target.value = '';
}

function updateMessageFilterCount() {
    const messages = store.get('messages');
    if (!messages) return;
    const all = messages.inbox.length;
    const unread = messages.inbox.filter(m => m.unread).length;
    let count = all;
    if (currentMessageFilter === 'unread') count = unread;
    else if (currentMessageFilter === 'read') count = all - unread;
    else if (currentMessageFilter === 'sent') count = messages.sent.length;
    document.getElementById('messageFilterCount').textContent = count;
    const sentEl = document.getElementById('sentFilterCount');
    if (sentEl) sentEl.textContent = messages.sent.length;
}

function updateMessagesBadge() {
    const messages = store.get('messages');
    const unread = messages ? messages.inbox.filter(m => m.unread).length : 0;
    const b = document.getElementById('messagesBadge');
    if (b) { if (unread > 0) { b.textContent = unread; b.style.display = 'flex'; } else b.style.display = 'none'; }
    const mb = document.getElementById('mobileMessagesBadge');
    if (mb) { if (unread > 0) { mb.textContent = unread; mb.style.display = 'flex'; } else mb.style.display = 'none'; }
}
