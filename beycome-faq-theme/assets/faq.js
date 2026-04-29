(function () {
    // === Table of contents ===
    var article = document.getElementById('bc-article');
    var tocList = document.getElementById('bc-toc-list');
    var tocNav  = document.getElementById('bc-toc');
    if (article && tocList) {
        var headings = article.querySelectorAll('h2, h3');
        if (headings.length < 2) {
            if (tocNav) tocNav.style.display = 'none';
        } else {
            headings.forEach(function (h, i) {
                var id = 'section-' + i;
                h.id = id;
                var li = document.createElement('li');
                li.className = 'bc-toc-item' + (h.tagName === 'H3' ? ' bc-toc-sub' : '');
                var a = document.createElement('a');
                a.href = '#' + id;
                a.textContent = h.textContent;
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    var top = document.getElementById(id).getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                });
                li.appendChild(a);
                tocList.appendChild(li);
            });
            var tocLinks = tocList.querySelectorAll('a');
            var obs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        tocLinks.forEach(function (l) { l.classList.remove('active'); });
                        var a = tocList.querySelector('a[href="#' + entry.target.id + '"]');
                        if (a) a.classList.add('active');
                    }
                });
            }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });
            headings.forEach(function (h) { obs.observe(h); });
        }
    }

    // === Reading progress bar ===
    var bar = document.getElementById('bc-progress-bar');
    if (article && bar) {
        window.addEventListener('scroll', function () {
            var rect    = article.getBoundingClientRect();
            var start   = rect.top  + window.pageYOffset - window.innerHeight;
            var end     = rect.bottom + window.pageYOffset - window.innerHeight;
            var progress = Math.min(1, Math.max(0, (window.pageYOffset - start) / (end - start)));
            bar.style.width = (progress * 100) + '%';
        });
    }

    // === Copy-link buttons ===
    document.querySelectorAll('.bc-share-copy').forEach(function (btn) {
        btn.addEventListener('click', function () {
            navigator.clipboard.writeText(window.location.href).then(function () {
                var orig = btn.innerHTML;
                btn.textContent = 'Copied!';
                setTimeout(function () { btn.innerHTML = orig; }, 2000);
            });
        });
    });

    // === Auto internal links (first mention per keyword, one per paragraph) ===
    if (article) {
        var linkMap = [
            ['flat fee MLS',          'https://www.beycome.com/flat-fee-mls'],
            ['flat-fee MLS',          'https://www.beycome.com/flat-fee-mls'],
            ['closing costs',         'https://www.beycome.com/calculators/closing-cost-calculator'],
            ['closing cost',          'https://www.beycome.com/calculators/closing-cost-calculator'],
            ['mortgage calculator',   'https://www.beycome.com/calculators/mortgage-calculator'],
            ['mortgage pre-approval', 'https://www.beycome.com/faq/knowledge-base/how-long-is-mortgage-preapproval-good-for/'],
            ['pre-approval',          'https://www.beycome.com/faq/knowledge-base/how-long-is-mortgage-preapproval-good-for/'],
            ['title insurance',       'https://www.beycome.com/faq/knowledge-base/what-is-title-insurance/'],
            ['home equity',           'https://www.beycome.com/calculators/home-equity-calculator'],
            ['HELOC',                 'https://www.beycome.com/faq/knowledge-base/what-is-a-heloc/'],
            ['FHA loan',              'https://www.beycome.com/faq/knowledge-base/what-is-an-fha-loan/'],
            ['VA loan',               'https://www.beycome.com/faq/knowledge-base/what-is-a-va-loan/'],
            ['USDA loan',             'https://www.beycome.com/faq/knowledge-base/what-is-a-usda-loan/'],
            ['jumbo loan',            'https://www.beycome.com/faq/knowledge-base/what-is-a-jumbo-loan/'],
            ['conventional loan',     'https://www.beycome.com/faq/knowledge-base/what-is-a-conventional-loan/'],
            ['loan-to-value',         'https://www.beycome.com/faq/knowledge-base/what-is-ltv/'],
            ['LTV',                   'https://www.beycome.com/faq/knowledge-base/what-is-ltv/'],
            ['down payment',          'https://www.beycome.com/calculators/down-payment-calculator'],
            ['commission calculator', 'https://www.beycome.com/calculators/commission-calculator'],
            ['home sale calculator',  'https://www.beycome.com/calculators/home-sale-calculator'],
            ['amortization',          'https://www.beycome.com/calculators/amortization-calculator'],
            ['rent vs buy',           'https://www.beycome.com/calculators/rent-vs-buy-calculator'],
            ['property tax',          'https://www.beycome.com/calculators/property-tax-calculator'],
            ['capital gains',         'https://www.beycome.com/calculators/capital-gains-tax-calculator'],
            ['Beycome Title',         'https://www.beycometitle.com/'],
            ['FSBO',                  'https://www.beycome.com/faq/knowledge-base/how-to-sell-your-home-without-an-agent/'],
            ['for sale by owner',     'https://www.beycome.com/faq/knowledge-base/how-to-sell-your-home-without-an-agent/'],
        ];

        // Remove empty anchor tags left by WP
        article.querySelectorAll('a').forEach(function (a) {
            if (!a.textContent.trim() && !a.querySelector('img')) a.parentNode.removeChild(a);
        });

        var linked = {};
        article.querySelectorAll('p').forEach(function (p) {
            if (p.querySelector('a')) return;
            var html = p.innerHTML;
            for (var i = 0; i < linkMap.length; i++) {
                var kw  = linkMap[i][0];
                var url = linkMap[i][1];
                if (linked[kw]) continue;
                var regex = new RegExp('\\b(' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'i');
                if (regex.test(html) && !html.match(new RegExp('<a[^>]*>' + kw, 'i'))) {
                    html = html.replace(regex, '<a href="' + url + '" class="bc-auto-link">$1</a>');
                    linked[kw] = true;
                    p.innerHTML = html;
                    break;
                }
            }
        });
    }
})();
