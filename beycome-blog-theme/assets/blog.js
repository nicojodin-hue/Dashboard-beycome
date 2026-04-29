(function () {
    'use strict';

    // ===== Reading progress bar =====
    var bar = document.getElementById('bc-progress-bar');
    if (bar) {
        function updateProgress() {
            var article = document.getElementById('bc-article');
            if (!article) return;
            var rect = article.getBoundingClientRect();
            var articleTop = rect.top + window.scrollY;
            var articleHeight = article.offsetHeight;
            var scrolled = window.scrollY - articleTop + window.innerHeight * 0.2;
            var pct = Math.min(100, Math.max(0, (scrolled / articleHeight) * 100));
            bar.style.width = pct + '%';
        }
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // ===== Table of contents builder =====
    var tocNav = document.getElementById('bc-toc-nav');
    var article = document.getElementById('bc-article');
    if (tocNav && article) {
        var headings = article.querySelectorAll('h2, h3');
        if (headings.length < 2) {
            var tocEl = document.getElementById('bc-toc');
            if (tocEl) tocEl.style.display = 'none';
        } else {
            headings.forEach(function (h, i) {
                if (!h.id) h.id = 'section-' + i;
                var item = document.createElement('a');
                item.href = '#' + h.id;
                item.textContent = h.textContent;
                var wrapper = document.createElement('div');
                wrapper.className = h.tagName === 'H3' ? 'bc-toc-item bc-toc-item-sub' : 'bc-toc-item';
                wrapper.appendChild(item);
                tocNav.appendChild(wrapper);
            });

            // Highlight active heading on scroll
            var tocLinks = tocNav.querySelectorAll('a');
            function onScrollTOC() {
                var scrollY = window.scrollY + 160;
                var active = null;
                headings.forEach(function (h) {
                    if (h.offsetTop <= scrollY) active = h.id;
                });
                tocLinks.forEach(function (link) {
                    link.classList.toggle('active', link.hash === '#' + active);
                });
            }
            window.addEventListener('scroll', onScrollTOC, { passive: true });
            onScrollTOC();

            // Smooth scroll
            tocNav.addEventListener('click', function (e) {
                var link = e.target.closest('a');
                if (!link || !link.hash) return;
                var target = document.querySelector(link.hash);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    // ===== Copy link button =====
    var copyBtn = document.getElementById('bc-copy-link');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(window.location.href).then(function () {
                var orig = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(function () { copyBtn.textContent = orig; }, 2000);
            });
        });
    }

    // ===== Header search (expand/collapse) =====
    var searchForm = document.getElementById('bc-hsearch');
    var searchBtn = document.getElementById('bc-hsearch-btn');
    var searchInput = document.getElementById('bc-hsearch-input');
    if (searchForm && searchBtn && searchInput) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!searchForm.classList.contains('open')) {
                searchForm.classList.add('open');
                setTimeout(function () { searchInput.focus(); }, 150);
            } else if (searchInput.value.trim()) {
                searchForm.submit();
            } else {
                searchForm.classList.remove('open');
            }
        });
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { searchForm.classList.remove('open'); searchInput.value = ''; }
        });
        document.addEventListener('click', function (e) {
            if (searchForm.classList.contains('open') && !searchForm.contains(e.target)) {
                searchForm.classList.remove('open');
                searchInput.value = '';
            }
        });
    }

    // ===== Mobile menu =====
    var menuBtn = document.getElementById('bc-mobile-menu-btn');
    var mobileMenu = document.getElementById('bc-mobile-menu');
    if (menuBtn && mobileMenu) {
        var iconOpen = menuBtn.querySelector('.bc-menu-icon-open');
        var iconClose = menuBtn.querySelector('.bc-menu-icon-close');
        menuBtn.addEventListener('click', function () {
            var isOpen = mobileMenu.classList.toggle('open');
            mobileMenu.style.display = isOpen ? 'block' : 'none';
            menuBtn.setAttribute('aria-expanded', isOpen);
            if (iconOpen) iconOpen.style.display = isOpen ? 'none' : 'block';
            if (iconClose) iconClose.style.display = isOpen ? 'block' : 'none';
        });
        document.addEventListener('click', function (e) {
            if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.remove('open');
                mobileMenu.style.display = 'none';
                menuBtn.setAttribute('aria-expanded', 'false');
                if (iconOpen) iconOpen.style.display = 'block';
                if (iconClose) iconClose.style.display = 'none';
            }
        });
    }
})();
