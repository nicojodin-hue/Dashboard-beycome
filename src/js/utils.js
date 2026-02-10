// Shared utility functions

export function formatFileSize(b) {
    if (b === 0) return '0 Bytes';
    const k = 1024;
    const s = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return parseFloat((b / Math.pow(k, i)).toFixed(1)) + ' ' + s[i];
}

export function formatHour(h) {
    if (h === 0) return '12 AM';
    if (h === 12) return '12 PM';
    return h > 12 ? (h - 12) + ' PM' : h + ' AM';
}

export function formatTime(d) {
    let h = d.getHours();
    const m = d.getMinutes();
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
}

export function formatDate(d) {
    const mn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return mn[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

export function formatPhoneNumber(input) {
    let val = input.value.replace(/\D/g, '');
    if (val.length > 10) val = val.substring(0, 10);
    let formatted = '';
    if (val.length > 0) formatted = '(' + val.substring(0, 3);
    if (val.length >= 3) formatted += ') ';
    if (val.length > 3) formatted += val.substring(3, 6);
    if (val.length >= 6) formatted += '-' + val.substring(6, 10);
    input.value = formatted;
    validatePhone(input);
}

export function validatePhone(input) {
    const errId = input.id + 'Error';
    const errEl = document.getElementById(errId);
    if (!errEl) return true;
    const val = input.value.replace(/\D/g, '');
    errEl.textContent = '';
    input.style.borderColor = '';
    if (val.length === 0) return true;
    if (val.length < 10) { errEl.textContent = 'Phone number must be 10 digits'; input.style.borderColor = 'var(--c-error)'; return false; }
    if (/^(\d)\1{9}$/.test(val)) { errEl.textContent = 'Invalid phone number'; input.style.borderColor = 'var(--c-error)'; return false; }
    if (/^(0000000000|1234567890|0123456789)$/.test(val)) { errEl.textContent = 'Invalid phone number'; input.style.borderColor = 'var(--c-error)'; return false; }
    const areaCode = val.substring(0, 3);
    if (areaCode === '000' || areaCode === '111' || areaCode === '555') { errEl.textContent = 'Invalid area code'; input.style.borderColor = 'var(--c-error)'; return false; }
    input.style.borderColor = 'var(--c-success)';
    return true;
}

export function formatDecimalInput(el) {
    let v = el.value.replace(/[^0-9.]/g, '');
    const parts = v.split('.');
    if (parts.length > 2) v = parts[0] + '.' + parts.slice(1).join('');
    const dp = v.indexOf('.');
    let whole = dp >= 0 ? v.substring(0, dp) : v;
    const dec = dp >= 0 ? v.substring(dp) : '';
    whole = whole.replace(/^0+(?=\d)/, '');
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    el.value = whole + dec;
}

export function showMobileToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: var(--c-primary); color: white; padding: 12px 24px; border-radius: 24px; font-size: 14px; font-weight: 500; z-index: 9999;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(() => t.remove(), 300); }, 2000);
}

export function isDesktopView() {
    return window.innerWidth > 1024;
}

export function closeAllDropdowns() {
    document.querySelectorAll('.menu, .dashboard-menu, .notifications-menu').forEach(m => m.classList.remove('show'));
    document.body.style.overflow = '';
}

export function toggleMenu(menuId, e) {
    e.stopPropagation();
    e.preventDefault();
    const m = document.getElementById(menuId);
    const isOpen = m.classList.contains('show');
    closeAllDropdowns();
    if (!isOpen) {
        m.classList.add('show');
        if (window.innerWidth <= 1024) document.body.style.overflow = 'hidden';
    }
}

export function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

export function renderDocumentsHtml(docs) {
    if (!docs || docs.length === 0) return '';
    let h = '<div class="message-documents">';
    docs.forEach(d => {
        const it = d.type === 'pdf' ? 'pdf' : (d.type === 'doc' || d.type === 'docx' ? 'doc' : 'img');
        const ix = d.type === 'pdf' ? 'PDF' : (d.type === 'doc' || d.type === 'docx' ? 'DOC' : 'IMG');
        h += `<div class="document-attachment" onclick="window.app.viewDocument('${encodeURIComponent(d.name)}')"><div class="document-icon ${it}">${ix}</div><div class="document-info"><div class="document-name">${d.name}</div><div class="document-size">${d.size}</div></div></div>`;
    });
    return h + '</div>';
}

// Animate a number display
let animFrames = {};
export function animateNumber(elId, target) {
    if (animFrames[elId]) cancelAnimationFrame(animFrames[elId]);
    const el = document.getElementById(elId);
    if (!el) return;
    const current = parseInt(el.textContent.replace(/,/g, '')) || 0;
    if (current === target) { el.textContent = target.toLocaleString('en-US'); return; }
    const start = performance.now();
    const duration = 400;
    function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = Math.round(current + (target - current) * ease);
        el.textContent = val.toLocaleString('en-US');
        if (p < 1) animFrames[elId] = requestAnimationFrame(tick);
        else delete animFrames[elId];
    }
    animFrames[elId] = requestAnimationFrame(tick);
}
