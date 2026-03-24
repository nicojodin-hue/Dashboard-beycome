// Beycome Title — Conversion-Optimized Landing Page

export function render() {
    return `
    <!-- HEADER -->
    <header class="bt-header-wrap">
    <div class="bt-header">
        <nav class="bt-header-nav bt-header-nav--left">
            <a href="#" class="bt-header-link" id="btHeaderHome">Home</a>
            <a href="#bt-quote" class="bt-header-link bt-scroll-link">Quote</a>
            <a href="#bt-footer-contact" class="bt-header-link bt-scroll-link">Contact</a>
        </nav>
        <a href="#" class="bt-header-logo" id="btBackBtn">
            <svg width="141" height="27" viewBox="0 0 141 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M55.5,9.8c-.4-.89-.98-1.69-1.7-2.33-.72-.64-1.57-1.12-2.49-1.4-.92-.28-1.89-.35-2.84-.21-.95.14-1.86.48-2.67,1.01-1,.64-1.84,1.52-2.45,2.55-.61,1.04-.97,2.2-1.05,3.41-.14,1.09-.05,2.2.25,3.26.3,1.06.82,2.04,1.51,2.88.63.78,1.42,1.41,2.3,1.86.89.45,1.86.7,2.84.74.99.04,1.97-.13,2.89-.51.92-.38,1.75-.95,2.44-1.67.7-.74,1.21-1.65,1.47-2.64h-3.41c-.06,0-.11.02-.16.05-.05.03-.09.08-.12.13-.28.39-.64.7-1.05.93-.41.23-.87.36-1.34.38-.85.13-1.73-.05-2.46-.51-.74-.46-1.29-1.17-1.57-2.01-.13-.41-.13-.41.28-.41h9.76c.23,0,.32-.04.35-.29.24-1.79-.04-3.6-.8-5.23h0ZM45.71,12.15c.16-.93.66-1.76,1.41-2.32.75-.56,1.68-.8,2.59-.67.83-.03,1.64.26,2.28.81.63.55,1.04,1.33,1.13,2.17h-7.41Z" fill="#070707"/><path d="M106.82,7.54c.58-.81,1.44-1.37,2.4-1.59,1.98-.38,3.78.02,4.92,1.93.12.2.17.23.32.02.58-.79,1.37-1.4,2.27-1.75.9-.36,1.88-.45,2.84-.26,2.75.33,3.98,2.2,4.38,4.58.11.72.16,1.45.15,2.18,0,2.77,0,5.53,0,8.29,0,.28-.06.36-.34.35-.86-.02-1.71-.02-2.57,0-.27,0-.35-.06-.35-.34.01-2.6.01-5.22,0-7.83.01-.76-.07-1.53-.26-2.27-.06-.28-.18-.55-.35-.79s-.38-.44-.62-.6c-.24-.15-.51-.26-.79-.31-.28-.05-.57-.04-.85.03-1.31.16-1.95.91-2.21,2.39-.12.82-.18,1.64-.17,2.46-0,2.31,0,4.62,0,6.93,0,.28-.07.34-.33.33-.86-.02-1.72-.02-2.57,0-.3,0-.39-.05-.39-.38.02-2.78,0-5.55,0-8.33,0-.55-.07-1.1-.22-1.63-.06-.3-.18-.58-.35-.83-.17-.25-.38-.47-.63-.63-.25-.17-.53-.28-.82-.33-.29-.05-.59-.05-.89.02-1.33.14-1.97.91-2.17,2.43-.1.77-.15,1.55-.15,2.32,0,2.33,0,4.67,0,7,0,.27-.05.37-.34.36-.89-.02-1.79-.02-2.68,0-.22,0-.27-.06-.27-.28,0-4.86,0-9.72,0-14.58,0-.24.07-.3.31-.3.81.01,1.62.01,2.43,0,.22,0,.29.05.28.28-.02.34,0,.69,0,1.13" fill="#070707"/><path d="M100.48,8.86c-.93-1.4-2.32-2.4-3.92-2.83-1.6-.43-3.3-.25-4.78.5-1.17.58-2.16,1.46-2.89,2.55-.73,1.1-1.16,2.37-1.25,3.69-.15,1.16-.05,2.34.29,3.45.35,1.11.93,2.14,1.7,3,.99,1.16,2.32,1.94,3.79,2.24,1.47.3,3,.09,4.34-.59,1.19-.57,2.21-1.46,2.94-2.57.74-1.11,1.16-2.41,1.24-3.75.16-2.01-.36-4.02-1.48-5.69h0ZM97.39,17.08c-.33.37-.73.67-1.18.87-.45.2-.93.31-1.42.31-.49,0-.98-.1-1.43-.3-.45-.2-.85-.5-1.19-.86-.83-.91-1.29-2.1-1.31-3.34-.01-1.24.43-2.44,1.23-3.37.36-.42.8-.74,1.3-.96.5-.21,1.04-.31,1.58-.28.54.03,1.07.19,1.54.45.47.27.88.64,1.19,1.1.67.94,1.01,2.09.95,3.25-.06,1.16-.51,2.27-1.27,3.13" fill="#070707"/><path d="M85.96,16.25c-.96,2.73-2.58,4.72-5.48,5.21-1.34.27-2.73.12-3.99-.42-1.26-.54-2.33-1.46-3.07-2.64-1.13-1.64-1.62-3.65-1.37-5.64.08-1.08.38-2.13.89-3.09.51-.95,1.2-1.79,2.05-2.45.83-.64,1.78-1.07,2.79-1.28,1.01-.21,2.06-.19,3.06.07,1,.26,1.94.74,2.73,1.41.8.67,1.44,1.52,1.87,2.48.2.42.37.87.5,1.32h-3.51c-.05,0-.1,0-.15-.03-.04-.03-.08-.07-.1-.12-.29-.65-.77-1.19-1.38-1.54-.61-.34-1.32-.48-2.01-.37-.76.04-1.48.32-2.07.82-.58.49-1,1.17-1.17,1.92-.29.83-.37,1.71-.24,2.58.14.87.49,1.68,1.02,2.37.34.46.79.83,1.3,1.07.51.24,1.08.36,1.64.33.56-.03,1.11-.2,1.6-.5.49-.3.89-.71,1.19-1.2.06-.11.14-.19.25-.25.1-.06.22-.08.34-.06,1.08.01,2.16,0,3.3,0" fill="#070707"/><path d="M57.27,6.13c1.19,0,2.35,0,3.5,0,.23,0,.26.12.31.29.92,3.02,1.84,6.04,2.76,9.06.04.12.03.27.17.36.55-1.66,1.1-3.31,1.65-4.95.5-1.5.99-3,1.49-4.49.04-.13.05-.26.26-.26,1.17.01,2.35,0,3.52,0,.06.14-.03.24-.07.35-2.51,6.51-5.02,13.01-7.53,19.52-.03.11-.09.2-.18.26s-.2.08-.3.07c-1.03-.02-2.07,0-3.11,0-.01-.1.01-.21.07-.29.77-1.97,1.53-3.93,2.31-5.9.04-.09.06-.19.06-.29,0-.1-.02-.2-.05-.29-1.59-4.37-3.17-8.74-4.74-13.12-.03-.09-.06-.18-.09-.3" fill="#070707"/><path d="M139.38,9.77c-.44-.97-1.1-1.82-1.92-2.49-.82-.66-1.78-1.12-2.81-1.34-1.03-.22-2.09-.19-3.1.09-1.01.28-1.95.79-2.73,1.5-1.13,1.01-1.95,2.33-2.38,3.8-.43,1.47-.44,3.04-.04,4.51.4,1.81,1.45,3.41,2.96,4.45,1.5,1.05,3.34,1.47,5.14,1.17,1.21-.15,2.35-.64,3.29-1.42.94-.78,1.65-1.82,2.04-3,.1-.27.03-.31-.22-.31-.99.01-1.97,0-2.96,0-.09,0-.17,0-.25.04-.08.04-.15.09-.2.16-.28.38-.63.69-1.04.92-.41.22-.86.35-1.33.37-.86.13-1.74-.05-2.48-.52-.74-.47-1.3-1.18-1.57-2.03-.09-.28-.08-.39.26-.38,1.62.02,3.24,0,4.86,0s3.29,0,4.93,0c.23,0,.32-.04.35-.29.24-1.8-.04-3.63-.81-5.26h0ZM129.63,12.14c.15-.91.63-1.72,1.35-2.28.72-.56,1.61-.82,2.51-.72.85-.06,1.7.22,2.35.78.66.56,1.08,1.35,1.18,2.22h-7.39Z" fill="#070707"/><path d="M32.3,6.06c-.88.25-1.66.76-2.26,1.46,0-2.06-.01-4.03.01-6.01,0-.36-.1-.43-.43-.42-.83.03-1.67.02-2.5,0-.29,0-.37.06-.37.37.01,3.39,0,6.77,0,10.16,0,3.11,0,6.22,0,9.33,0,.26.06.34.33.34.8-.02,1.6-.02,2.4,0,.23,0,.3-.06.29-.29-.02-.52,0-1.04,0-1.62.33.37.69.72,1.07,1.04.36.3.77.55,1.2.73,1.35.56,2.86.62,4.25.17s2.58-1.39,3.37-2.65c.69-1.09,1.14-2.32,1.32-3.6.19-1.28.11-2.59-.24-3.84-.19-.93-.56-1.8-1.1-2.57-.54-.77-1.22-1.42-2.02-1.9s-1.68-.8-2.59-.92c-.92-.12-1.85-.04-2.74.22h0ZM37.75,13.42c.08,1.24-.27,2.46-1,3.45-.39.48-.88.86-1.44,1.1s-1.17.35-1.77.3c-.61-.05-1.19-.24-1.71-.57-.52-.33-.95-.77-1.27-1.31-.46-.78-.72-1.66-.75-2.56-.03-.91.16-1.81.56-2.61.32-.7.85-1.28,1.51-1.66.66-.38,1.41-.55,2.16-.48.81.05,1.58.36,2.2.89.62.52,1.07,1.23,1.28,2.03.14.46.21.93.22,1.41" fill="#070707"/><path d="M20.19,12.72c-.55-.66-1.34-1.07-2.18-1.16-.85-.09-1.69.17-2.36.7-.06.07-.15.1-.24.11-.09,0-.18-.03-.24-.1-.61-.46-1.35-.71-2.1-.7-.75,0-1.47.25-2.05.73-.58.48-.98,1.15-1.13,1.9-.14.68-.12,1.39.04,2.06.16.68.47,1.31.91,1.84,1.1,1.38,2.49,2.49,4.08,3.23.15.09.33.14.5.13.18,0,.35-.05.5-.14.89-.46,1.74-1.01,2.52-1.63,1.13-.83,1.97-2.01,2.41-3.37.2-.61.25-1.26.14-1.9-.11-.63-.39-1.23-.79-1.72h0ZM19.39,15.43c-.24,1.13-.88,2.14-1.79,2.83-.6.52-1.26.97-1.95,1.34-.05.05-.12.07-.19.08-.07,0-.14,0-.2-.04-1.25-.62-2.34-1.53-3.19-2.65-.37-.47-.59-1.04-.65-1.63-.05-.41.02-.83.21-1.2.19-.37.49-.66.86-.84.38-.12.79-.12,1.18,0,.38.12.72.36.97.67.1.18.26.31.44.39.19.08.39.08.58.03.18-.07.33-.19.43-.35.18-.24.42-.44.68-.59.27-.14.56-.23.86-.25.27,0,.53.05.77.16s.46.28.62.5c.17.21.29.46.35.73.06.27.06.54,0,.81" fill="#ff9b77"/><path d="M.16,14.92c0-1.84,0-3.69,0-5.53,0-.17.03-.34.1-.5.07-.16.18-.29.31-.4C3.67,5.86,6.77,3.23,9.88.59c.56-.48.87-.48,1.43-.01,3.11,2.64,6.22,5.28,9.33,7.93.1.06.19.15.25.25.07.1.11.21.13.33.02.12.01.24-.02.36-.03.12-.09.22-.16.32s-.17.17-.28.22c-.11.05-.22.08-.34.08-.12,0-.23-.02-.34-.07-.11-.05-.2-.12-.28-.21-2.84-2.41-5.69-4.82-8.53-7.24-.48-.41-.47-.41-.95,0-2.63,2.24-5.27,4.47-7.9,6.7-.14.1-.26.24-.34.41-.08.16-.11.34-.1.52.02,3.08.02,6.15,0,9.23,0,.38.11.44.45.44,2.63-.01,5.26,0,7.89,0,.18-.02.36.03.51.13.15.1.26.25.32.42.06.17.06.36,0,.54-.06.17-.17.32-.32.42-.14.1-.3.14-.46.14H1c-.12,0-.23-.01-.34-.05-.11-.04-.2-.11-.28-.19-.08-.09-.14-.19-.18-.3-.04-.11-.05-.23-.04-.35v-5.67" fill="#ff9b77"/></svg>
            <span class="bt-header-logo-title">title</span>
        </a>
        <div class="bt-header-nav bt-header-nav--right">
            <a href="tel:+17869527143" class="bt-header-link bt-call-link" data-desktop-href="#bt-footer-contact"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor;vertical-align:middle;margin-right:4px"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>Call us</a>
            <a href="https://beycome.zohobookings.com/#/sam" target="_blank" class="bt-header-schedule-btn">Schedule free call</a>
        </div>
    </div>
    </header>

    <!-- STICKY CTA BAR -->
    <div class="bt-sticky-cta" id="bt-sticky-cta">
        <div class="bt-sticky-cta-text">Know your closing costs upfront<span>— free instant quote</span></div>
        <a href="#bt-quote" class="bt-btn-hero" id="bt-sticky-btn">Get your free quote</a>
    </div>

    <!-- HERO -->
    <section class="bt-hero">
        <div class="bt-hero-bg"><object data="/Dashboard-beycome/icons/hero-bg.svg" type="image/svg+xml" class="bt-hero-bg-img"></object></div>
        <div class="bt-hero-inner">
            <h1><span class="bt-hero-rotate-wrap">Close with <span class="bt-hero-rotate" id="bt-hero-rotate"><span class="bt-hero-rotate-item active"><em>confidence.</em></span><span class="bt-hero-rotate-item"><em>ease.</em></span><span class="bt-hero-rotate-item" style="margin-left:-0.2em">out <em>overpaying.</em></span><span class="bt-hero-rotate-item"><em>control.</em></span><span class="bt-hero-rotate-item" style="margin-left:-0.2em">out <em>surprises.</em></span></span></span><br>Flat pricing. Skip the BS.</h1>
            <div class="bt-hero-eco">
                The official title partner of <a href="https://beycome.com" target="_blank">Beycome.com</a>
            </div>
            <div class="bt-hero-actions" id="bt-hero-actions">
                <a href="#bt-quote" class="bt-btn-hero" id="bt-hero-cta">Get your free estimate</a>
            </div>
            <div class="bt-hero-proof">
                <div class="bt-hero-proof-item"><strong>★ 4.8</strong>&nbsp;Google Rating</div>
                <div class="bt-hero-proof-divider"></div>
                <div class="bt-hero-proof-item"><strong>5,000+</strong>&nbsp;Closings</div>
                <div class="bt-hero-proof-divider"></div>
                <div class="bt-hero-proof-item">Licensed in <strong>FL &amp; TX</strong></div>
                <div class="bt-hero-proof-divider"></div>
                <div class="bt-hero-proof-item"><strong>48hr</strong>&nbsp;Turnaround</div>
            </div>
        </div>
    </section>

    <!-- SOCIAL PROOF STRIP -->
    <div class="bt-proof-strip">
        <div class="bt-proof-strip-inner">
            <div class="bt-proof-card">
                <div class="bt-proof-stars">★★★★★</div>
                <p class="bt-proof-text">"Beycome Title made it completely painless. They walked me through every step and the fees were way lower than my agent quoted."</p>
                <div class="bt-proof-author"><div class="bt-proof-av">M</div><div><div class="bt-proof-name">Maria L.</div><div class="bt-proof-loc">Miami, FL</div></div></div>
            </div>
            <div class="bt-proof-card">
                <div class="bt-proof-stars">★★★★★</div>
                <p class="bt-proof-text">"Fast, professional, and transparent. We got our title commitment in 48 hours and closed on time with no surprises."</p>
                <div class="bt-proof-author"><div class="bt-proof-av">J</div><div><div class="bt-proof-name">James T.</div><div class="bt-proof-loc">Houston, TX</div></div></div>
            </div>
            <div class="bt-proof-card">
                <div class="bt-proof-stars">★★★★★</div>
                <p class="bt-proof-text">"Used Beycome to list, then Beycome Title to close. It was seamless. I saved thousands compared to a traditional title company."</p>
                <div class="bt-proof-author"><div class="bt-proof-av">R</div><div><div class="bt-proof-name">Rachel K.</div><div class="bt-proof-loc">Orlando, FL</div></div></div>
            </div>
        </div>
    </div>


    <!-- PRICING BANNER -->
    <section class="bt-pricing-strip">
        <div class="bt-pricing-inner">
            <div class="bt-pricing-top">
                <div style="flex:1;min-width:0">
                    <div class="bt-pricing-headline">Clear, flat pricing.<br>No surprises.</div>
                    <p class="bt-pricing-desc" style="font-size:15px;line-height:1.6;color:var(--navy,#152330);margin:16px 0 0">With beycome.com, we've already helped homeowners and buyers save over $220M. That same DNA led us to title — from search to insurance to closing, we handle it all. Transparent pricing. Faster closings. No unnecessary middlemen. Backed by Old Republic National Title Insurance Company, and like <strong style="color:var(--navy,#152330)">Beycome</strong>, built with one thing in mind: you.</p>
                </div>
            </div>
            <div class="bt-pricing-note" style="font-style:italic;color:var(--g50,#899097)">Title insurance premiums are set by the state Department and are the same regardless of which title insurer you choose — so why pay more for settlement?</div>
        </div>
    </section>

    <!-- QUOTE TOOL -->
    <section class="bt-quote-section" id="bt-quote">
        <div class="bt-quote-inner">
            <div class="bt-quote-header">
                <h2>Get your closing costs estimate in minutes</h2>
                <p>No guesswork. Enter your details and receive your free estimate, no commitment.</p>
            </div>
            <div class="bt-quote-layout">
                <div class="bt-quote-card">

                    <!-- STEP 1: Property + Transaction -->
                    <div class="bt-form-sec active" id="bt-fs1">
                        <div class="bt-f-row">
                            <div class="bt-f-group" style="flex:1"><div class="bt-f-label">Your property address: <span class="bt-required">*</span></div><input type="text" class="bt-f-input" placeholder="123 Main Street, Miami, FL 33101" id="bt-q-addr" required></div>
                            <div class="bt-f-group" style="flex:none;width:fit-content"><div class="bt-f-label">You're a: <span class="bt-required">*</span></div><div class="message-tabs" style="display:inline-flex; width:fit-content;"><button class="message-tab active" id="bt-roleSellerTab">Seller</button><button class="message-tab" id="bt-roleBuyerTab">Buyer</button></div></div>
                        </div>
                        <div class="bt-f-row full"><div class="bt-f-group"><div class="bt-f-label">Which of these best describes your property? <span class="bt-required">*</span></div><div class="bt-f-toggle-group" data-group="ptype" style="flex-wrap:wrap">
                                <div class="bt-f-toggle on">🏠 House</div>
                                <div class="bt-f-toggle">🏢 Apartment</div>
                                <div class="bt-f-toggle">🏙️ Condo</div>
                                <div class="bt-f-toggle">🏡 Townhouse</div>
                                <div class="bt-f-toggle">🏠 Mobile home</div>
                                <div class="bt-f-toggle">🌳 Lot/Land</div>
                                <div class="bt-f-toggle">🏘️ Multi-family</div>
                            </div></div></div>
                        <div class="bt-f-row">
                            <div class="bt-f-group"><div class="bt-f-label">Purchase / Sale Price <span class="bt-required">*</span></div><input type="text" class="bt-f-input" placeholder="$350,000" id="bt-q-price" required></div>
                            <div class="bt-f-group"><div class="bt-f-label">Loan Amount <span style="font-weight:400;color:var(--c-text-secondary)">(if financed)</span> <span class="bt-required">*</span></div><input type="text" class="bt-f-input" placeholder="Leave blank if cash" id="bt-q-loan" required></div>
                        </div>
                        <div class="bt-f-nav"><div></div><button class="bt-btn-next" id="bt-next1">Next: Your Info <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></button></div>
                    </div>

                    <!-- STEP 2: Your Info -->
                    <div class="bt-form-sec" id="bt-fs2">
                        <div class="bt-f-row">
                            <div class="bt-f-group"><div class="bt-f-label">Full Name <span class="bt-required">*</span></div><input type="text" class="bt-f-input" placeholder="Sam Smith" id="bt-q-fn" required></div>
                            <div class="bt-f-group"><div class="bt-f-label">Email <span class="bt-required">*</span></div><input type="email" class="bt-f-input" placeholder="sam@email.com" id="bt-q-email" required></div>
                        </div>
                        <div class="bt-f-row">
                            <div class="bt-f-group"><div class="bt-f-label">Phone <span class="bt-required">*</span></div><input type="tel" class="bt-f-input" placeholder="(305) 555-0100" id="bt-q-phone" required></div>
                            <div class="bt-f-group"><div class="bt-f-label">Estimated Closing Date</div><input type="date" class="bt-f-input" id="bt-q-date"></div>
                        </div>
                        <div class="bt-f-row full">
                            <div class="bt-f-group"><div class="bt-f-label">HOA?</div><div class="bt-f-toggle-group" data-group="hoa"><div class="bt-f-toggle on">No HOA</div><div class="bt-f-toggle">Yes</div></div></div>
                        </div>
                        <div style="background:hsla(0,0%,97%,1);border-radius:10px;padding:14px 16px;font-size:14px;color:var(--c-text-secondary);margin-top:4px">By submitting, you agree to be contacted by Beycome Title via phone, email, or text.</div>
                        <div class="bt-f-nav">
                            <button class="bt-btn-back" id="bt-back2"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:var(--c-text-secondary)"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>Back</button>
                            <button class="bt-btn-next" id="bt-gen">Generate My Quote <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></button>
                        </div>
                        <p class="bt-form-micro">Free — no commitment, no spam</p>
                    </div>

                    <!-- RESULT -->
                    <div class="bt-q-result" id="bt-qresult">
                        <div class="bt-r-header">
                            <div><div class="bt-r-title">Your Title Fee Estimate</div><div class="bt-r-addr" id="bt-r-addr">—</div></div>
                            <div style="text-align:right"><div style="font-size:14px;color:var(--c-text-secondary);text-transform:uppercase;letter-spacing:.5px">Underwritten by</div><div style="font-size:14px;font-weight:700;color:white;margin-top:2px">Old Republic National Title</div></div>
                        </div>
                        <div class="bt-r-grid">
                            <div class="bt-r-box"><div class="bt-r-box-lbl">Purchase Price</div><div class="bt-r-box-val" id="bt-r-price">—</div></div>
                            <div class="bt-r-box"><div class="bt-r-box-lbl">Loan Amount</div><div class="bt-r-box-val" id="bt-r-loan">Cash</div></div>
                            <div class="bt-r-box"><div class="bt-r-box-lbl">Closing Date</div><div class="bt-r-box-val" id="bt-r-date">—</div></div>
                        </div>
                        <div class="bt-r-lines">
                            <div class="bt-r-line"><span class="bt-ll">Title Search &amp; Exam</span><span class="bt-lv" id="bt-r-s">$250</span></div>
                            <div class="bt-r-line"><span class="bt-ll">Owner's Title Insurance</span><span class="bt-lv" id="bt-r-oi">—</span></div>
                            <div class="bt-r-line" id="bt-r-lrow"><span class="bt-ll">Lender's Title Insurance</span><span class="bt-lv" id="bt-r-li">—</span></div>
                            <div class="bt-r-line"><span class="bt-ll">Settlement / Closing Fee</span><span class="bt-lv" id="bt-r-cf">$595</span></div>
                            <div class="bt-r-line"><span class="bt-ll">Document Preparation</span><span class="bt-lv" id="bt-r-dp">$150</span></div>
                            <div class="bt-r-line"><span class="bt-ll">Recording Fees (est.)</span><span class="bt-lv" id="bt-r-rf">$45</span></div>
                            <div class="bt-r-line bt-tot"><span class="bt-ll">Estimated Total</span><span class="bt-lv" id="bt-r-tot">—</span></div>
                        </div>
                        <p style="font-size:14px;color:var(--c-text-secondary);margin-bottom:16px;line-height:1.6">* Estimate only. Final fees confirmed within 1 business day.</p>
                        <div class="bt-r-cta">
                            <button class="bt-btn-rp" id="bt-sched-btn"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white"><path d="M20 4h-1V2h-2v2H7V2H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 18H4V10h16v12z"/></svg>Schedule a Call to Confirm</button>
                            <button class="bt-btn-rs" id="bt-reset-btn"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:var(--c-primary)"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>Start a New Quote</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- WHY US -->
    <section class="bt-why-section">
        <div class="bt-why-inner">
            <h2 class="bt-title">What sets us apart</h2>
            <div class="bt-why-grid">
                <div class="bt-why-card">
                    <div class="bt-why-icon"><img src="/Dashboard-beycome/icons/serious-savings-gray.svg" alt="Flat pricing" width="48" height="48"></div>
                    <h3>Flat, Transparent Pricing</h3>
                    <p>Full quote upfront. No hidden fees, no percentage-of-sale markups, no referral kickbacks. You pay the best price we can offer.</p>
                    <a href="#bt-quote" class="bt-why-link bt-scroll-link">See your quote <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>
                </div>
                <div class="bt-why-card">
                    <div class="bt-why-icon"><img src="/Dashboard-beycome/icons/old-republic-gray.svg" alt="Old Republic" width="48" height="48"></div>
                    <h3>Old Republic Backed</h3>
                    <p>Title insurance underwritten by Old Republic — a Fortune 500 company with the highest financial strength ratings in the USA. Your transaction, protected by the best.</p>
                    <a href="#bt-quote" class="bt-why-link bt-scroll-link">See your quote <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>
                </div>
                <div class="bt-why-card">
                    <div class="bt-why-icon"><img src="/Dashboard-beycome/icons/fast-closing-gray.svg" alt="48-Hour Turnaround" width="48" height="48"></div>
                    <h3>48-Hour Turnaround</h3>
                    <p>We're not only fast to sell your property, but also to close it. Title searches completed in 48 hours — built for speed without sacrificing accuracy.</p>
                    <a href="#bt-quote" class="bt-why-link bt-scroll-link">See your quote <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>
                </div>
            </div>
        </div>
    </section>

    <!-- SERVICES ACCORDION -->
    <section class="bt-services-section" id="bt-services">
        <div class="bt-svc-inner">
            <h2 class="bt-title">Everything title, under one roof</h2>
            <p class="bt-sub">From title search to final policy delivery — licensed professionals in Florida and Texas.</p>
            <div class="bt-svc-list">
                <div class="bt-svc-item open">
                    <div class="bt-svc-q"><span class="bt-svc-num">01</span><h3>Title Search &amp; Examination</h3><div class="bt-svc-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                    <div class="bt-svc-a">A thorough search of public records to verify ownership history and identify outstanding liens, judgments, or encumbrances that could affect the transfer of title.</div>
                </div>
                <div class="bt-svc-item">
                    <div class="bt-svc-q"><span class="bt-svc-num">02</span><h3>Title Insurance</h3><div class="bt-svc-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                    <div class="bt-svc-a">Issued through Old Republic National Title — one of America's most financially secure underwriters. Protects owners and lenders against defects discovered after closing.</div>
                </div>
                <div class="bt-svc-item">
                    <div class="bt-svc-q"><span class="bt-svc-num">03</span><h3>Closing &amp; Settlement</h3><div class="bt-svc-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                    <div class="bt-svc-a">We prepare all closing documents, manage the escrow account, coordinate with all parties, and disburse funds and record the deed upon completion.</div>
                </div>
                <div class="bt-svc-item">
                    <div class="bt-svc-q"><span class="bt-svc-num">04</span><h3>Escrow &amp; Fund Management</h3><div class="bt-svc-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                    <div class="bt-svc-a">Funds held in FDIC-insured, segregated escrow accounts with daily reconciliations. We disburse only when all closing conditions are fully met.</div>
                </div>
                <div class="bt-svc-item">
                    <div class="bt-svc-q"><span class="bt-svc-num">05</span><h3>Title Clearance &amp; Curative</h3><div class="bt-svc-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                    <div class="bt-svc-a">If our search uncovers an issue — an old lien, recording error, or gap in the chain — our team resolves it before closing so your deal doesn't fall apart.</div>
                </div>
                <div class="bt-svc-item">
                    <div class="bt-svc-q"><span class="bt-svc-num">06</span><h3>Post-Closing &amp; Policy Delivery</h3><div class="bt-svc-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                    <div class="bt-svc-a">After closing we record the deed with the county, issue the final title insurance policy, and maintain a full archive of all transaction documents.</div>
                </div>
            </div>
            <div class="bt-svc-cta"><a href="#bt-quote" class="bt-scroll-link">Have questions? Get a free quote <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a></div>
        </div>
    </section>

    <!-- WHO WE SERVE — TABS -->
    <section class="bt-serve-section">
        <div class="bt-serve-inner">
            <h2 class="bt-title">Built for your transaction type</h2>
            <div class="bt-serve-tabs">
                <button class="bt-serve-tab active" data-tab="fsbo">Homeowners</button>
                <button class="bt-serve-tab" data-tab="investors">Investors</button>
                <button class="bt-serve-tab" data-tab="institutional">Institutional</button>
                <button class="bt-serve-tab" data-tab="wholesalers">Wholesalers</button>
            </div>
            <div class="bt-serve-panel active" data-panel="fsbo">
                <div class="bt-serve-panel-icon"><svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></div>
                <div>
                    <h3>Selling with or without an agent?</h3>
                    <p>We handle everything from title search to closing documents — clear pricing, no surprises, and someone to walk you through every step of the process.</p>
                    <a href="#bt-quote" class="bt-serve-panel-cta bt-scroll-link">Get your free title quote <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>
                </div>
            </div>
            <div class="bt-serve-panel" data-panel="investors">
                <div class="bt-serve-panel-icon"><svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg></div>
                <div>
                    <h3>Fast closings for your deal flow</h3>
                    <p>Fast title searches, flat fees, and closings that don't drag. We understand your deal flow and keep things moving so you can close and move on to the next one.</p>
                    <a href="#bt-quote" class="bt-serve-panel-cta bt-scroll-link">Get your free title quote <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>
                </div>
            </div>
            <div class="bt-serve-panel" data-panel="institutional">
                <div class="bt-serve-panel-icon"><svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg></div>
                <div>
                    <h3>Scale with confidence</h3>
                    <p>Bulk acquisitions, repeat transactions, and portfolio closings handled efficiently. Streamlined ordering and consistent turnaround at scale.</p>
                    <a href="#bt-quote" class="bt-serve-panel-cta bt-scroll-link">Get your free title quote <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>
                </div>
            </div>
            <div class="bt-serve-panel" data-panel="wholesalers">
                <div class="bt-serve-panel-icon"><svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg></div>
                <div>
                    <h3>Double closings done right</h3>
                    <p>Double closings, assignment transactions, and A-to-B/B-to-C structures handled correctly. We know how wholesaling works and close it right.</p>
                    <a href="#bt-quote" class="bt-serve-panel-cta bt-scroll-link">Get your free title quote <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>
                </div>
            </div>
        </div>
    </section>

    <!-- UNDERWRITER -->
    <section class="bt-uw-section">
        <div class="bt-uw-inner">
            <h2 class="bt-title">Nationally backed. Locally operated.</h2>
            <p class="bt-sub" style="margin:0 auto 20px;text-align:center">Title insurance underwritten by Old Republic — a Fortune 500 company with the highest financial strength ratings in the USA.</p>
            <div class="bt-uw-logo-box">
                <div class="bt-uw-shield"><svg width="70" height="70" viewBox="0 0 60 60"><path d="M18.18,10.07l-2.43,1.81.86-2.9-2.47-1.75,3.02-.08.9-2.89,1.01,2.85,3.02-.03-2.4,1.84.96,2.87-2.49-1.72h0ZM9.33,17.6l-2.45,1.79.88-2.89-2.45-1.77,3.03-.06.93-2.88.99,2.86h3.03s-2.41,1.81-2.41,1.81l.95,2.88-2.48-1.73h0ZM6.47,28.26l.98,2.86-2.5-1.7-2.42,1.81.85-2.91-2.47-1.74,3.02-.09.89-2.89,1.02,2.85,3.03-.05-2.39,1.86h0ZM8.47,40.28l.95,2.87-2.48-1.73-2.44,1.79.88-2.9-2.46-1.77,3.03-.06.92-2.88.99,2.86,3.02-.02-2.41,1.83h0ZM14.58,48.21l3.03.07-2.46,1.77.87,2.9-2.44-1.8-2.49,1.72.95-2.87-2.41-1.84,3.02.03,1-2.86.91,2.88h0ZM41.84,10.06l2.43,1.81-.86-2.9,2.47-1.76-3.03-.08-.9-2.89-1.01,2.85-3.03-.04,2.4,1.85-.97,2.87,2.49-1.72h0ZM50.7,17.6l2.44,1.79-.88-2.89,2.45-1.77-3.03-.06-.93-2.88-.99,2.86h-3.03s2.42,1.81,2.42,1.81l-.95,2.88,2.49-1.73h0ZM53.55,28.26l-.98,2.86,2.5-1.7,2.42,1.81-.85-2.91,2.47-1.74-3.03-.09-.89-2.89-1.02,2.85-3.02-.05,2.39,1.86h0ZM51.55,40.28l-.95,2.87,2.48-1.73,2.44,1.79-.87-2.9,2.46-1.77-3.03-.06-.92-2.88-.99,2.86-3.03-.02,2.41,1.83h0ZM45.44,48.21l-3.03.07,2.46,1.77-.87,2.9,2.44-1.8,2.49,1.72-.95-2.87,2.41-1.84-3.02.03-1-2.86-.91,2.88h0ZM25.27,53.79h3.02s-2.41,1.82-2.41,1.82l.95,2.88-2.48-1.73-2.44,1.79.88-2.9-2.45-1.77,3.03-.06.92-2.88.99,2.85h0ZM35.42,53.66l.94-2.87.97,2.86h3.03s-2.43,1.82-2.43,1.82l.93,2.88-2.47-1.75-2.45,1.78.9-2.9-2.45-1.78,3.03-.04h0ZM27.04,15.85c-1.77,0-3.21.74-4.31,2.21-1.1,1.47-1.65,3.87-1.65,7.2,0,3.61.56,6.1,1.69,7.49,1.13,1.38,2.52,2.07,4.19,2.07,1.16,0,2.19-.31,3.07-.94.88-.63,1.58-1.62,2.11-2.99.52-1.36.78-3.15.78-5.37,0-2.42-.25-4.31-.74-5.67-.49-1.36-1.19-2.36-2.1-3.02-.91-.65-1.92-.98-3.04-.98h0ZM26.82,14.8c1.7,0,3.29.45,4.78,1.34,1.49.9,2.65,2.15,3.49,3.75.84,1.6,1.26,3.41,1.26,5.42s-.42,3.82-1.27,5.44c-.85,1.62-2.01,2.88-3.48,3.78-1.48.9-3.04,1.36-4.7,1.36s-3.14-.44-4.55-1.33c-1.42-.89-2.56-2.15-3.42-3.8-.86-1.65-1.29-3.48-1.29-5.49s.42-3.77,1.25-5.37c.83-1.59,1.97-2.84,3.42-3.75,1.45-.9,2.95-1.36,4.51-1.36h0Z" fill="#003087"/><path d="M30.01,34.12h2.39c1.6,0,2.85-.3,3.76-.91.9-.6,1.36-1.68,1.36-3.22,0-1.06-.17-1.9-.51-2.52-.34-.62-.79-1.04-1.34-1.27-.55-.23-1.64-.34-3.27-.34-1.07,0-1.74.08-1.99.23-.25.15-.38.41-.38.77v7.26ZM23.86,24.85h10.42c2.02,0,3.58.46,4.7,1.38,1.11.92,1.67,2.12,1.67,3.61,0,.89-.22,1.68-.66,2.38-.44.7-1.08,1.25-1.91,1.66-.83.41-2.14.71-3.92.89,1.3.36,2.19.7,2.68,1.04.49.34.88.78,1.18,1.32.29.54.64,1.64,1.02,3.31.28,1.19.57,2,.88,2.44.24.34.49.5.76.5s.54-.21.78-.62c.24-.41.39-1.14.44-2.19h.93c-.17,3.09-1.31,4.64-3.42,4.64-.66,0-1.24-.17-1.72-.5-.49-.34-.85-.83-1.1-1.49-.19-.49-.4-1.78-.64-3.86-.14-1.21-.35-2.07-.65-2.58-.29-.51-.76-.92-1.38-1.23-.63-.31-1.38-.46-2.25-.46h-1.65v7.92c0,.34.09.57.26.71.22.17.56.26,1.02.26h1.94v1.02h-9.37v-1.02h1.98c.44,0,.76-.09.96-.26.2-.17.31-.41.31-.71v-16.12c0-.35-.11-.6-.31-.78-.21-.17-.53-.26-.95-.26h-1.98v-1.02h0ZM29.65,6.82l-2.46,1.76.92-2.89-2.44-1.8,3.03-.02.96-2.87.96,2.87,3.02.02-2.43,1.8.91,2.89-2.46-1.76h0Z" fill="#003087"/></svg></div>
                <div><div class="bt-uw-tlabel">Backed by</div><div class="bt-uw-tname">Old Republic National Title</div></div>
            </div>
            <div class="bt-uw-stats">
                <div><div class="bt-uw-stat-num">$29B</div><div class="bt-uw-stat-lbl">in assets (parent co.)</div></div>
                <div><div class="bt-uw-stat-num">#1</div><div class="bt-uw-stat-lbl">fewest complaints (NAIC)</div></div>
                <div><div class="bt-uw-stat-num">100+</div><div class="bt-uw-stat-lbl">years in operation</div></div>
            </div>
        </div>
    </section>

    <!-- BEYCOME ECOSYSTEM — CROSS-SELL -->
    <section class="bt-eco-section">
        <div class="bt-eco-inner">
            <h2 class="bt-pricing-headline">Your full real estate journey on one platform.</h2>
            <p class="bt-pricing-desc">Sell, buy, title &amp; escrow—all in one place. Bundle and save even more. No middlemen. No inflated fees.<br>List &amp; sell for $99 true flat fee (avg saving of $13,970). Close for $99–$299. Buy and get ~2% back.</p>
            <div class="bt-eco-grid">
                <div class="bt-eco-card">
                    <h3>Sell your home. Keep your money.</h3>
                    <p>List on the MLS for a $99 flat fee. No 5–6% commission, no middlemen. You get full exposure, full control, and you keep thousands. Yes, thousands.</p>
                    <div class="bt-eco-sell-pricing">
                        <div class="bt-eco-sell-label">True flat fee starting at</div>
                        <div class="bt-eco-sell-row">
                            <div class="bt-eco-sell-item"><span class="bt-eco-sell-price">$199</span><span class="bt-eco-sell-state">FL</span> Flat fee + title settlement</div>
                            <div class="bt-eco-sell-item"><span class="bt-eco-sell-price">$379</span><span class="bt-eco-sell-state">TX</span> Flat fee + title settlement</div>
                        </div>
                    </div>
                    <div class="bt-eco-steps">
                        <div class="bt-eco-step"><span>1</span> List it. Go live on the MLS.</div>
                        <div class="bt-eco-step"><span>2</span> Get offers. Negotiate directly.</div>
                        <div class="bt-eco-step"><span>3</span> Close with Beycome Title. Save even more.</div>
                    </div>
                    <a href="https://www.beycome.com/flat-fee-mls/" target="_blank" class="bt-eco-cta">
                        Start selling with Beycome
                        <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                    </a>
                </div>
                <div class="bt-eco-card">
                    <h3>Buy your next home. Get up to 2% back.</h3>
                    <p>Find it anywhere—Beycome, Zillow, Redfin, wherever. Use Beycome to close, get full support at every step, and we send money back to you. Yes, real money.</p>
                    <div class="bt-eco-highlight">
                        <div class="bt-eco-highlight-num">Up to 2%</div>
                        <div class="bt-eco-highlight-lbl">Credit back at closing*</div>
                    </div>
                    <p class="bt-eco-disclaimer">* Credit varies by sale price, state regulation and are subject to a minimum commission of $1,599.</p>
                    <div class="bt-eco-steps">
                        <div class="bt-eco-step"><span>1</span> Find your home</div>
                        <div class="bt-eco-step"><span>2</span> Tour &amp; analyze with Beycome</div>
                        <div class="bt-eco-step"><span>3</span> Offer. Close. Get paid. We've got your back.</div>
                    </div>
                    <a href="https://www.beycome.com/i-want-to-buy-a-home" target="_blank" class="bt-eco-cta">
                        Start buying with Beycome
                        <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ + SCHEDULE (Combined) -->
    <section class="bt-final-section" id="bt-final-schedule">
        <div class="bt-final-inner">
            <div class="bt-final-faq">
                <h2 class="bt-title">Common questions</h2>
                <div class="bt-faq-list">
                    <div class="bt-faq-item open">
                        <div class="bt-faq-q">I have an offer and I want to work with you, what do I do next?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Simply add Beycome Title's details to your contract's "Escrow Agent Name" section. For Florida: Beycome Title of Florida LLC, 5701 Sunset Dr, Suite 101, South Miami, FL 33143, (786) 952-7143. For Texas: Beycome Title of Texas LLC, 1800 West Loop South, Suite 1990, Houston, TX 77027, (346) 532-3077.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">What is closing and title insurance?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Closing transfers the deed from seller to buyer after signing a sales contract. Title insurance is a policy that protects you from any financial loss sustained from defects in a title to a property — such as unknown liens, recording errors, or undisclosed heirs.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">How do you get your fees so low?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">We leverage technology for efficiency throughout the closing process and continually seek ways to reduce costs for consumers. No referral kickbacks to agents — those savings go directly to you.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">Do I need a lawyer to close?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">No lawyer is required, though you're welcome to hire one. We can provide referrals if desired.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">How do you do closing day?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Two options: a mobile notary visits your location, or you close entirely online using Remote Online Notarization (RON).</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">Which states are you available in?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">We're currently available in Florida and Texas. We're actively expanding — contact us if your property is in another state.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">Who chooses the title company?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">The choice is negotiable in any real estate transaction. What matters most is cost transparency — settlement fees vary by company, though state-regulated title insurance premiums remain the same regardless of which company you choose.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">The other party already has a title company, can I still use Beycome Title?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Yes. We can represent you while coordinating with the other party's title company, with fees split as negotiated.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">Do I really need owner's title insurance if I'm paying cash?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">It's not technically required for cash purchases, but it's highly recommended. Title insurance coverage protects your investment if ownership issues surface later.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">Does title insurance protect me if a problem shows up after closing?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Yes. Title insurance covers legal costs or financial losses for hidden liens, recording errors, or undisclosed heirs that surface after closing.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">How do I get my money after closing?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Sellers typically receive wire transfers to their bank accounts after closing and deed recording. Check requests are also available.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">Is your website safe to upload my information?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Safety is our top priority. We secure all of your files with bank-level, 256-bit encryption and we'll never sell or rent your data.</div>
                    </div>
                </div>
            </div>
            <div class="bt-final-action">
                <div class="bt-action-card">
                    <h3>Ready to move forward?</h3>
                    <p>Get your free quote or schedule a 15-minute call with a title agent.</p>
                    <a href="#bt-quote" class="bt-action-primary bt-scroll-link"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>Get Your Free Quote</a>
                    <a href="https://beycome.zohobookings.com/#/sam" class="bt-action-secondary" target="_blank"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:var(--c-primary)"><path d="M20 4h-1V2h-2v2H7V2H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 18H4V10h16v12z"/></svg>Book a Call</a>
                    <div class="bt-action-meta">
                        <div class="bt-action-meta-item"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>No commitment required</div>
                        <div class="bt-action-meta-item"><svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>Mon–Fri, 9am–5pm EST</div>
                        <div class="bt-action-meta-item"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>(786) 952-7143</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER (matching beycometitle.com) -->
    <footer class="bt-footer">
        <div class="bt-foot-bottom">
            <div class="bt-foot-legal">
                <div id="bt-footer-contact" style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin:0 0 28px;scroll-margin-top:100px">
                    <div>
                        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:hsla(0,0%,100%,0.6);margin-bottom:16px">Florida</div>
                        <div style="font-size:14px;font-weight:400;color:white;line-height:1.6">
                            Beycome Title of Florida LLC<br>
                            License #G142689<br>
                            5701 Sunset Drive, Suite 101,<br>
                            South Miami, FL 33143<br>
                            Phone: <a href="tel:+17869527143" style="color:var(--c-accent)">(786) 952-7143</a><br>
                            Email: <a href="mailto:florida@beycometitle.com" style="color:var(--c-accent)">florida@beycometitle.com</a><br>
                            Monday to Friday - 9:00am - 5:00pm EST
                        </div>
                    </div>
                    <div>
                        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:hsla(0,0%,100%,0.6);margin-bottom:16px">Texas</div>
                        <div style="font-size:14px;font-weight:400;color:white;line-height:1.6">
                            Beycome Title of Texas LLC<br>
                            License #3461702<br>
                            1800 West Loop South, Suite 1990,<br>
                            Houston, TX 77027<br>
                            Phone: <a href="tel:+13465323077" style="color:var(--c-accent)">(346) 532-3077</a><br>
                            Email: <a href="mailto:texas@beycometitle.com" style="color:var(--c-accent)">texas@beycometitle.com</a><br>
                            Monday to Friday - 9:00am - 5:00pm CST
                        </div>
                    </div>
                </div>

                <div style="border-top:1px solid hsla(0,0%,100%,0.1);padding-top:24px">
                <p><strong>Agreement to Terms and Privacy Policy:</strong> By using beycometitle.com, you agree to our <a href="https://www.beycometitle.com/terms">Terms and Conditions</a> and our <a href="https://www.beycometitle.com/policy">Privacy Policy</a>.</p>

                <p><strong>Legal Disclaimer:</strong> Terms, conditions, and qualifications apply. Information is current as of March 19, 2026. Beycome Title of Florida LLC reserves the right to modify or discontinue products and benefits at any time without notice. Eligibility and underwriting requirements must be met.</p>

                <p><strong>Corporate Structure:</strong> Beycome Title of Florida LLC has a business relationship with Beycome Corp., which has an ownership interest in Beycome Title of Florida LLC. Beycome Title of Texas LLC has a business relationship with Beycome Corp., which has an ownership interest in Beycome Title of Texas LLC.</p>

                <p><strong>Trademark Notice:</strong> Logos and trademarks on our website are used for informational purposes to illustrate industry partnerships and do not imply endorsement unless explicitly stated. All trademarks belong to their respective owners. We respect intellectual property rights and comply with trademark laws.</p>

                <p><strong>Equal Credit Opportunity Act Notice:</strong> The Federal Equal Credit Opportunity Act prohibits creditors from discriminating against credit applicants on the basis of race, color, religion, national origin, sex, marital status, or age (provided the applicant has the capacity to enter into a binding contract); because all or part of the applicant's income derives from any public assistance program; or because the applicant has, in good faith, exercised any right under the Consumer Credit Protection Act.</p>

                <p><strong>Service:</strong> Beycome Title is currently serving only Florida and Texas but offers all types of titles such as conventional, FHA, VA, Jumbo loan, and refinance.</p>

                <p>Beycome Title of Florida LLC, Beycome Title of Texas LLC and/or its affiliates. Beycome is a family of companies. Beycome Title of Florida LLC and Beycome Title of Texas LLC provides title insurance services; Beycome Brokerage Realty LLC and Beycome of Florida LLC provides real estate services; All rights reserved.</p>

                <p>&copy; 2026 Beycome Title of Florida LLC, Beycome Title of Texas LLC and/or its affiliates. All rights reserved.</p>

                <p style="margin-top:20px">All rights reserved, Copyright 2026 beycome&trade; | Made with <span class="footer-heart" style="color:#ef4444">&hearts;</span> in the USA.</p>
                </div>
            </div>
        </div>
    </footer>`;
}

// ── INIT ──
export function init() {
    var container = document.getElementById('title-container');

    // ── Hero text rotation ──
    var rotateEl = document.getElementById('bt-hero-rotate');
    if (rotateEl) {
        var items = rotateEl.querySelectorAll('.bt-hero-rotate-item');
        var currentIdx = 0;
        window._btRotateInterval = setInterval(function () {
            items[currentIdx].classList.remove('active');
            items[currentIdx].classList.add('exit');
            var prevIdx = currentIdx;
            currentIdx = (currentIdx + 1) % items.length;
            items[currentIdx].classList.add('active');
            setTimeout(function () { items[prevIdx].classList.remove('exit'); }, 500);
        }, 5000);
    }

    // Logo & Home link — scroll to top
    var backBtn = document.getElementById('btBackBtn');
    if (backBtn) backBtn.addEventListener('click', function (e) { e.preventDefault(); if (container) container.scrollTop = 0; });
    var homeLink = document.getElementById('btHeaderHome');
    if (homeLink) homeLink.addEventListener('click', function (e) { e.preventDefault(); if (container) container.scrollTop = 0; });

    // On desktop, swap call links to anchor to footer instead of tel:
    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    container.querySelectorAll('.bt-call-link').forEach(function (a) {
        if (!isMobile) {
            var desktopHref = a.getAttribute('data-desktop-href');
            if (desktopHref) a.setAttribute('href', desktopHref);
        }
    });

    // Smooth scroll for all anchor links
    container.querySelectorAll('.bt-scroll-link, .bt-btn-hero, .bt-hero-secondary, #bt-sticky-btn, #bt-hero-cta, #bt-hero-call').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var href = a.getAttribute('href');
            if (href && href.startsWith('#bt-')) {
                e.preventDefault();
                var target = container.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Sticky CTA bar (IntersectionObserver) ──
    var heroActions = document.getElementById('bt-hero-actions');
    var stickyCta = document.getElementById('bt-sticky-cta');
    var quoteSection = document.getElementById('bt-quote');
    if (heroActions && stickyCta) {
        var heroObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) stickyCta.classList.add('visible');
                else stickyCta.classList.remove('visible');
            });
        }, { root: container, threshold: 0 });
        heroObs.observe(heroActions);

        // Hide sticky when quote section is visible
        if (quoteSection) {
            var quoteObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) stickyCta.classList.remove('visible');
                });
            }, { root: container, threshold: 0.3 });
            quoteObs.observe(quoteSection);
        }
    }

    // ── Toggle buttons ──
    container.querySelectorAll('.bt-f-toggle-group').forEach(function (group) {
        group.querySelectorAll('.bt-f-toggle').forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                group.querySelectorAll('.bt-f-toggle').forEach(function (t) { t.classList.remove('on'); });
                toggle.classList.add('on');
            });
        });
    });

    // ── For Sale / For Rent tabs ──
    var saleTab = document.getElementById('bt-saleTab');
    var rentTab = document.getElementById('bt-rentTab');
    if (saleTab && rentTab) {
        saleTab.addEventListener('click', function () {
            saleTab.classList.add('active');
            rentTab.classList.remove('active');
        });
        rentTab.addEventListener('click', function () {
            rentTab.classList.add('active');
            saleTab.classList.remove('active');
        });
    }

    // ── Seller / Buyer role tabs ──
    var sellerTab = document.getElementById('bt-roleSellerTab');
    var buyerTab = document.getElementById('bt-roleBuyerTab');
    if (sellerTab && buyerTab) {
        sellerTab.addEventListener('click', function () {
            sellerTab.classList.add('active');
            buyerTab.classList.remove('active');
        });
        buyerTab.addEventListener('click', function () {
            buyerTab.classList.add('active');
            sellerTab.classList.remove('active');
        });
    }

    // ── Quote form — 2 steps ──
    var next1 = document.getElementById('bt-next1');
    if (next1) next1.addEventListener('click', function () { goStep(2); });
    var back2 = document.getElementById('bt-back2');
    if (back2) back2.addEventListener('click', function () { goStep(1); });
    var genBtn = document.getElementById('bt-gen');
    if (genBtn) genBtn.addEventListener('click', genQuote);
    var resetBtn = document.getElementById('bt-reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetQ);
    var schedBtn = document.getElementById('bt-sched-btn');
    if (schedBtn) schedBtn.addEventListener('click', function () {
        var el = container.querySelector('#bt-final-schedule');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    });

    // ── Live estimate — update on price/loan input ──
    var priceInput = document.getElementById('bt-q-price');
    var loanInput = document.getElementById('bt-q-loan');
    function updateLiveEstimate() {
        var price = parseFloat((priceInput.value || '').replace(/[^0-9.]/g, '')) || 0;
        var loan = parseFloat((loanInput.value || '').replace(/[^0-9.]/g, '')) || 0;
        var search = 250, doc = 150, rec = 45, close = 595;
        var ownerIns = price > 0 ? Math.round((price / 1000) * 5.75) : 0;
        var lenderIns = loan > 0 ? Math.round((loan / 1000) * 2.75) : 0;
        var total = search + doc + rec + close + ownerIns + lenderIns;
        var estTotal = document.getElementById('bt-est-total');
        var estIns = document.getElementById('bt-est-ins');
        if (estTotal) estTotal.textContent = '$' + total.toLocaleString();
        if (estIns) estIns.textContent = ownerIns > 0 ? '$' + (ownerIns + lenderIns).toLocaleString() : '—';
    }
    if (priceInput) priceInput.addEventListener('input', updateLiveEstimate);
    if (loanInput) loanInput.addEventListener('input', updateLiveEstimate);

    // ── Services accordion ──
    container.querySelectorAll('.bt-svc-q').forEach(function (q) {
        q.addEventListener('click', function () {
            var item = q.parentElement;
            var isOpen = item.classList.contains('open');
            container.querySelectorAll('.bt-svc-item').forEach(function (i) { i.classList.remove('open'); });
            if (!isOpen) item.classList.add('open');
        });
    });

    // ── Who We Serve tabs ──
    container.querySelectorAll('.bt-serve-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
            var tabName = tab.dataset.tab;
            container.querySelectorAll('.bt-serve-tab').forEach(function (t) { t.classList.remove('active'); });
            container.querySelectorAll('.bt-serve-panel').forEach(function (p) { p.classList.remove('active'); });
            tab.classList.add('active');
            var panel = container.querySelector('.bt-serve-panel[data-panel="' + tabName + '"]');
            if (panel) panel.classList.add('active');
        });
    });

    // ── FAQ accordion ──
    container.querySelectorAll('.bt-faq-q').forEach(function (q) {
        q.addEventListener('click', function () {
            var item = q.parentElement;
            var isOpen = item.classList.contains('open');
            container.querySelectorAll('.bt-faq-item').forEach(function (i) { i.classList.remove('open'); });
            if (!isOpen) item.classList.add('open');
        });
    });

    // Scroll to top on load
    if (container) container.scrollTop = 0;
}

function goStep(n) {
    for (var i = 1; i <= 2; i++) {
        var si = document.getElementById('bt-si' + i);
        if (si) si.className = 'bt-q-step ' + (i < n ? 'done' : i === n ? 'active' : 'pending');
        var fs = document.getElementById('bt-fs' + i);
        if (fs) fs.classList.toggle('active', i === n);
    }
    var result = document.getElementById('bt-qresult');
    if (result) result.style.display = 'none';
    // Hide live estimate when on result
    var est = document.getElementById('bt-live-estimate');
    if (est) est.style.display = '';
}

function genQuote() {
    var price = parseFloat((document.getElementById('bt-q-price').value || '350000').replace(/[^0-9.]/g, '')) || 350000;
    var loan = parseFloat((document.getElementById('bt-q-loan').value || '').replace(/[^0-9.]/g, '')) || 0;
    var addr = document.getElementById('bt-q-addr').value;
    var city = document.getElementById('bt-q-city').value;
    var state = document.getElementById('bt-q-state').value;
    var date = document.getElementById('bt-q-date').value;

    var search = 250, doc = 150, rec = 45, close = 595;
    var ownerIns = Math.round((price / 1000) * 5.75);
    var lenderIns = loan > 0 ? Math.round((loan / 1000) * 2.75) : 0;
    var total = search + doc + rec + close + ownerIns + lenderIns;
    var f = function (n) { return '$' + n.toLocaleString(); };

    document.getElementById('bt-r-addr').textContent = [addr, city, state].filter(Boolean).join(', ') || 'Property';
    document.getElementById('bt-r-price').textContent = f(price);
    document.getElementById('bt-r-loan').textContent = loan > 0 ? f(loan) : 'Cash';
    document.getElementById('bt-r-date').textContent = date ? new Date(date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD';
    document.getElementById('bt-r-s').textContent = f(search);
    document.getElementById('bt-r-oi').textContent = f(ownerIns);
    document.getElementById('bt-r-li').textContent = loan > 0 ? f(lenderIns) : 'N/A';
    document.getElementById('bt-r-lrow').style.display = loan > 0 ? 'flex' : 'none';
    document.getElementById('bt-r-cf').textContent = f(close);
    document.getElementById('bt-r-dp').textContent = f(doc);
    document.getElementById('bt-r-rf').textContent = f(rec);
    document.getElementById('bt-r-tot').textContent = f(total);

    for (var i = 1; i <= 2; i++) {
        var fs = document.getElementById('bt-fs' + i);
        if (fs) fs.classList.remove('active');
        var si = document.getElementById('bt-si' + i);
        if (si) si.className = 'bt-q-step done';
    }
    var r = document.getElementById('bt-qresult');
    r.style.display = 'block';
    // Hide live estimate
    var est = document.getElementById('bt-live-estimate');
    if (est) est.style.display = 'none';
    r.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetQ() {
    document.getElementById('bt-qresult').style.display = 'none';
    var est = document.getElementById('bt-live-estimate');
    if (est) est.style.display = '';
    goStep(1);
}

export function cleanup() {
    if (window._btRotateInterval) { clearInterval(window._btRotateInterval); window._btRotateInterval = null; }
}
