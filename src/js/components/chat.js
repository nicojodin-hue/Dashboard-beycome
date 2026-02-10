import store from '../store.js';
import { isDesktopView, formatFileSize } from '../utils.js';

let chatPendingFiles = [];
let isComposingMessage = false;
let composingMessageTo = '';
let isReplyingToMessage = false;
let replyingToMessageId = null;

export function renderChat() {
    return `<div class="chat-widget">
        <div class="chat-header"><h3>💬 Chat with Artur<span class="chat-online-dot"></span></h3><button class="chat-close-mobile" id="chatCloseMobile"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div>
        <div class="chat-messages" id="chatMessages"></div>
        <div class="chat-input-container">
            <div id="chatPendingAttachments" class="pending-attachments" style="display: none;"></div>
            <div class="chat-input-wrapper">
                <input type="text" class="chat-input" id="chatInput" placeholder="Ask Artur anything…">
                <button class="chat-attach-btn" id="chatAttachBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>
                <button class="chat-mic-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg></button>
                <button class="chat-send-btn" id="chatSendBtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></button>
            </div>
            <input type="file" id="chatFileInput" style="display: none;" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png">
            <div class="chat-disclaimer">✨ Artur has helped <strong>18,500+</strong> homeowners close their sale<br>Beycome makes no warranties regarding content produced by Artur.</div>
        </div>
    </div>`;
}

export function initChat() {
    const sendBtn = document.getElementById('chatSendBtn');
    if (sendBtn) sendBtn.addEventListener('click', sendChatMessage);

    const input = document.getElementById('chatInput');
    if (input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatMessage(); });

    const closeBtn = document.getElementById('chatCloseMobile');
    if (closeBtn) closeBtn.addEventListener('click', closeMobileChat);

    const attachBtn = document.getElementById('chatAttachBtn');
    if (attachBtn) attachBtn.addEventListener('click', () => document.getElementById('chatFileInput').click());

    const fileInput = document.getElementById('chatFileInput');
    if (fileInput) fileInput.addEventListener('change', handleChatFileSelect);

    // Initial greeting
    setTimeout(() => {
        addChatMessage('👋 Hi John! I\'m <strong>Artur</strong>, your personal real estate assistant. I\'m here to guide you through every step of selling your property.<br><br>I can help you with:<br>• Reviewing and responding to offers<br>• Managing visit requests<br>• Understanding contracts<br>• Answering any questions<br><br>Just type below or click on anything you need help with!');
    }, 800);
}

export function addChatMessage(msg, isUser = false) {
    const cm = document.getElementById('chatMessages');
    if (!cm) return;
    const d = document.createElement('div');
    d.className = 'chat-message ' + (isUser ? 'user' : 'bot');
    d.innerHTML = '<div><div class="message-bubble">' + msg + '</div></div>';
    cm.appendChild(d);
    cm.scrollTop = cm.scrollHeight;
}

function sendChatMessage() {
    const i = document.getElementById('chatInput');
    const msg = i.value.trim();
    if (!msg && chatPendingFiles.length === 0) return;
    addChatMessage(msg || '📎 Sent ' + chatPendingFiles.length + ' attachment(s)', true);
    i.value = '';
    if (isComposingMessage) handleComposedMessage(msg);
    else if (isReplyingToMessage && replyingToMessageId) handleReplyToMessage(msg);
    else { chatPendingFiles = []; setTimeout(() => addChatMessage("I can help with that! What would you like to do?"), 800); }
}

function handleReplyToMessage(text) {
    const messages = store.get('messages');
    const m = messages.inbox.find(x => x.id === replyingToMessageId);
    if (!m) return;
    m.thread.push({ type: 'outgoing', text: text || 'Sent attachment(s)', sender: 'You', time: 'Just now', documents: [...chatPendingFiles] });
    m.status = 'replied';
    store.set('messages', messages);
    chatPendingFiles = [];
    setTimeout(() => {
        addChatMessage('✅ Your reply has been sent to <strong>' + m.sender + '</strong>!');
        document.getElementById('chatInput').placeholder = 'Ask Artur anything…';
        isReplyingToMessage = false;
        replyingToMessageId = null;
    }, 600);
}

function handleComposedMessage(msg) {
    isComposingMessage = false;
    document.getElementById('chatInput').placeholder = 'Ask Artur anything…';
    setTimeout(() => {
        const cm = document.getElementById('chatMessages');
        const d = document.createElement('div');
        d.className = 'chat-message bot';
        d.innerHTML = '<div><div class="message-bubble">📝 Message to <strong>' + composingMessageTo + '</strong>:<br><br><em>"' + msg + '"</em><br><br>Ready to send?</div><div style="display: flex; gap: 8px; margin-top: 12px;"><button class="btn" id="chatEditMsg">Edit</button><button class="btn btn-success" id="chatSendFinal">Send</button></div></div>';
        cm.appendChild(d);
        cm.scrollTop = cm.scrollHeight;
        document.getElementById('chatEditMsg').addEventListener('click', function () {
            this.parentElement.style.display = 'none';
            addChatMessage('Edit', true);
            isComposingMessage = true;
            setTimeout(() => { addChatMessage('✍️ Type your new message below.'); document.getElementById('chatInput').placeholder = 'Type your message to ' + composingMessageTo + '...'; document.getElementById('chatInput').focus(); }, 600);
        });
        document.getElementById('chatSendFinal').addEventListener('click', function () {
            this.parentElement.style.display = 'none';
            addChatMessage('Send', true);
            addSentMessage(composingMessageTo, msg);
            setTimeout(() => { addChatMessage('✅ Done! Your message has been sent to <strong>' + composingMessageTo + '</strong>!'); composingMessageTo = ''; }, 600);
        });
    }, 600);
}

function addSentMessage(to, msg) {
    const messages = store.get('messages');
    const now = new Date();
    const ts = now.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
    messages.sent.unshift({ id: Date.now(), to, subject: 'Message to ' + to, message: msg, time: ts });
    store.set('messages', messages);
}

export function openMobileChat() {
    document.querySelector('.chat-widget')?.classList.add('mobile-open');
}

function closeMobileChat() {
    document.querySelector('.chat-widget')?.classList.remove('mobile-open');
}

function handleChatFileSelect(e) {
    const f = e.target.files;
    for (let i = 0; i < f.length; i++) chatPendingFiles.push({ name: f[i].name, size: formatFileSize(f[i].size), type: f[i].name.split('.').pop().toLowerCase() });
    renderChatPendingAttachments();
    e.target.value = '';
}

function renderChatPendingAttachments() {
    const c = document.getElementById('chatPendingAttachments');
    if (chatPendingFiles.length === 0) { c.style.display = 'none'; return; }
    c.style.display = 'flex';
    c.innerHTML = chatPendingFiles.map((f, i) => '<div class="pending-attachment">' + f.name + '<button data-idx="' + i + '">×</button></div>').join('');
    c.querySelectorAll('button[data-idx]').forEach(btn => {
        btn.addEventListener('click', () => { chatPendingFiles.splice(parseInt(btn.dataset.idx), 1); renderChatPendingAttachments(); });
    });
}

export function showPageContextMessage(page, visitedPages) {
    if (!isDesktopView()) return;
    const pk = page;
    if (visitedPages[pk]) return;
    visitedPages[pk] = true;
    const messages = store.get('messages');
    let msg = '';
    if (page === 'visits') msg = '👋 You have <strong>2 visit requests waiting</strong>! Would you like me to help you respond to them?';
    else if (page === 'offers') msg = '💰 You have <strong>1 pending offer</strong> that expires soon! Want me to explain your options?';
    else if (page === 'properties') msg = '🏠 Here are your listings. Need help adding a new property or updating an existing one? Just ask!';
    else if (page === 'messages') { const unread = messages ? messages.inbox.filter(m => m.unread).length : 0; msg = unread > 0 ? '💬 You have <strong>' + unread + ' unread message' + (unread > 1 ? 's' : '') + '</strong>! I can help you draft quick responses. Just click on a message.' : '✨ All messages read!'; }
    else if (page === 'calendar') msg = '📅 Your calendar shows all visits, deadlines, and milestones. Want me to add an important date?';
    else if (page === 'contracts') msg = '📋 Here you\'ll find all the legal forms you need for your state. Not sure which one? Just ask me!';
    else if (page === 'account') msg = '⚙️ Manage your profile and preferences here. Need help with anything?';
    if (msg) setTimeout(() => addChatMessage(msg), 500);
}

export function startComposing(name) {
    isComposingMessage = true;
    composingMessageTo = name;
    setTimeout(() => {
        addChatMessage('✍️ What would you like to say to <strong>' + name + '</strong>?');
        document.getElementById('chatInput').placeholder = 'Type your message to ' + name + '...';
        document.getElementById('chatInput').focus();
    }, 600);
}

export function startReply(messageId) {
    const messages = store.get('messages');
    const m = messages.inbox.find(x => x.id === messageId);
    if (!m) return;
    isReplyingToMessage = true;
    replyingToMessageId = messageId;
    document.getElementById('chatInput').placeholder = 'Type your reply to ' + m.sender + '...';
    document.getElementById('chatInput').focus();
    addChatMessage('✍️ Type your reply below and press Enter.');
}

export function resetChatState() {
    isComposingMessage = false;
    isReplyingToMessage = false;
    replyingToMessageId = null;
    composingMessageTo = '';
    const input = document.getElementById('chatInput');
    if (input) input.placeholder = 'Ask Artur anything…';
}
