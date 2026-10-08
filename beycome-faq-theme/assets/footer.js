(function(){
    var btn = document.getElementById('bc-footer-ai-beycome-btn');
    if (!btn) return;
    btn.addEventListener('click', function(){
        var widget = window.chatWidget;
        var prompt = btn.getAttribute('data-ai-prompt') || '';
        if (!widget || !widget.messageInput) return;
        if (!widget.isVisible && typeof widget.show === 'function') widget.show();
        widget.messageInput.value = prompt;
        widget.messageInput.dispatchEvent(new Event('input', {bubbles:true}));
        widget.sendMessage();
    });
})();

(function() {
    var form = document.getElementById('bc-hsearch');
    var btn = document.getElementById('bc-hsearch-btn');
    var input = document.getElementById('bc-hsearch-input');
    if (!form || !btn || !input) return;

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!form.classList.contains('open')) {
            form.classList.add('open');
            setTimeout(function() { input.focus(); }, 150);
        } else if (input.value.trim()) {
            form.submit();
        } else {
            form.classList.remove('open');
        }
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { form.classList.remove('open'); input.value = ''; }
    });

    document.addEventListener('click', function(e) {
        if (form.classList.contains('open') && !form.contains(e.target)) {
            form.classList.remove('open');
            input.value = '';
        }
    });

    var menuBtn = document.getElementById('bc-mobile-menu-btn');
    var menu = document.getElementById('bc-mobile-menu');
    if (menuBtn && menu) {
        var iconOpen = menuBtn.querySelector('.bc-menu-icon-open');
        var iconClose = menuBtn.querySelector('.bc-menu-icon-close');
        menuBtn.addEventListener('click', function() {
            var isOpen = menu.classList.toggle('open');
            menu.style.display = isOpen ? 'block' : 'none';
            menuBtn.setAttribute('aria-expanded', isOpen);
            if (iconOpen) iconOpen.style.display = isOpen ? 'none' : 'block';
            if (iconClose) iconClose.style.display = isOpen ? 'block' : 'none';
        });
        document.addEventListener('click', function(e) {
            if (menu.classList.contains('open') && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
                menu.classList.remove('open');
                menu.style.display = 'none';
                menuBtn.setAttribute('aria-expanded', 'false');
                if (iconOpen) iconOpen.style.display = 'block';
                if (iconClose) iconClose.style.display = 'none';
            }
        });
    }
})();
