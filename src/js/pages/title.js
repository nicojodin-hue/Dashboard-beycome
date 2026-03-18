// Beycome Title — Conversion-Optimized Landing Page

export function render() {
    return `
    <a href="#" class="bt-back" id="btBackBtn">
        <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        Back to Dashboard
    </a>

    <!-- STICKY CTA BAR -->
    <div class="bt-sticky-cta" id="bt-sticky-cta">
        <div class="bt-sticky-cta-text">Know your closing costs upfront<span>— free instant quote</span></div>
        <a href="#bt-quote" class="bt-btn-hero" id="bt-sticky-btn">Get your free quote</a>
    </div>

    <!-- HERO -->
    <section class="bt-hero">
        <div class="bt-hero-inner">
            <h1><span class="bt-hero-rotate-wrap">Close <span class="bt-hero-rotate" id="bt-hero-rotate"><span class="bt-hero-rotate-item active">with <em>confidence.</em></span><span class="bt-hero-rotate-item">with <em>ease.</em></span><span class="bt-hero-rotate-item">without <em>overpaying.</em></span><span class="bt-hero-rotate-item">with <em>control.</em></span><span class="bt-hero-rotate-item">without <em>surprises.</em></span></span></span><br>Flat pricing. Skip the BS.</h1>
            <div class="bt-hero-eco">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                The official title &amp; escrow partner of <a href="https://beycome.com" target="_blank">Beycome.com</a>
            </div>
            <div class="bt-hero-actions" id="bt-hero-actions">
                <a href="#bt-quote" class="bt-btn-hero" id="bt-hero-cta">Get your free quote</a>
                <a href="#bt-final-schedule" class="bt-hero-secondary" id="bt-hero-call">
                    <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Or talk to a title agent
                </a>
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

    <!-- MISSION STATEMENT -->
    <div class="bt-mission-strip">
        <div class="bt-mission-inner">
            <p>From title search to insurance to closing, Beycome Title handles it all — fast, transparent, and built to cut out unnecessary costs. Backed by Old Republic National Title Insurance Company, and like Beycome, built with one thing in mind: you.</p>
        </div>
    </div>

    <!-- LATEST DEALS CLOSED -->
    <section class="bt-deals-section">
        <div class="bt-deals-inner">
            <h2 class="bt-title">Latest deals closed.</h2>
        </div>
        <div class="bt-deals-track" id="bt-deals-track">
            <div class="bt-deal-card">
                <div class="bt-deal-img-wrap">
                    <img src="https://dweqrqkrxd29t.cloudfront.net/fit-in/290x155/17066503/beyc695eb93d06e4b.jpg" alt="12365 Asana Ct" loading="lazy">
                    <div class="bt-deal-date">Sold on 03/16/2026</div>
                </div>
                <div class="bt-deal-info">
                    <div class="bt-deal-savings">Just sold with beycome. $11K in savings.</div>
                    <div class="bt-deal-street">12365 Asana Ct</div>
                    <div class="bt-deal-city">Venice, FL 34293</div>
                </div>
            </div>
            <div class="bt-deal-card">
                <div class="bt-deal-img-wrap">
                    <img src="https://dweqrqkrxd29t.cloudfront.net/fit-in/290x155/17072731/beyc69442d7fc0069.jpg" alt="14500 SW 88th Ave" loading="lazy">
                    <div class="bt-deal-date">Sold on 03/16/2026</div>
                </div>
                <div class="bt-deal-info">
                    <div class="bt-deal-savings">Just sold with beycome. $6K in savings.</div>
                    <div class="bt-deal-street">14500 SW 88th Ave #205</div>
                    <div class="bt-deal-city">Palmetto Bay, FL 33176</div>
                </div>
            </div>
            <div class="bt-deal-card">
                <div class="bt-deal-img-wrap">
                    <img src="https://dweqrqkrxd29t.cloudfront.net/fit-in/290x155/17079037/beyc6994abd18314c.jpg" alt="1710 Madison St SW" loading="lazy">
                    <div class="bt-deal-date">Sold on 03/14/2026</div>
                </div>
                <div class="bt-deal-info">
                    <div class="bt-deal-savings">Just sold with beycome. $5K in savings.</div>
                    <div class="bt-deal-street">1710 Madison St SW</div>
                    <div class="bt-deal-city">Hartselle, AL 35640</div>
                </div>
            </div>
            <div class="bt-deal-card">
                <div class="bt-deal-img-wrap">
                    <img src="https://dweqrqkrxd29t.cloudfront.net/fit-in/290x155/17081871/beyc69a1f752590b6.jpg" alt="2411 Lindale Rd" loading="lazy">
                    <div class="bt-deal-date">Sold on 03/13/2026</div>
                </div>
                <div class="bt-deal-info">
                    <div class="bt-deal-savings">Just sold with beycome. $4K in savings.</div>
                    <div class="bt-deal-street">2411 Lindale Rd</div>
                    <div class="bt-deal-city">Columbus, OH 43224</div>
                </div>
            </div>
            <div class="bt-deal-card">
                <div class="bt-deal-img-wrap">
                    <img src="https://dweqrqkrxd29t.cloudfront.net/fit-in/290x155/17060369/beyc698b3b22c4c5a.jpg" alt="900 NW 12th Pl" loading="lazy">
                    <div class="bt-deal-date">Sold on 03/13/2026</div>
                </div>
                <div class="bt-deal-info">
                    <div class="bt-deal-savings">Just sold with beycome. $16K in savings.</div>
                    <div class="bt-deal-street">900 NW 12th Pl</div>
                    <div class="bt-deal-city">Cape Coral, FL 33993</div>
                </div>
            </div>
            <div class="bt-deal-card">
                <div class="bt-deal-img-wrap">
                    <img src="https://dweqrqkrxd29t.cloudfront.net/fit-in/290x155/17067097/beyc6961b89dd2cf4.jpg" alt="2754 Sandusky Ave W" loading="lazy">
                    <div class="bt-deal-date">Sold on 03/13/2026</div>
                </div>
                <div class="bt-deal-info">
                    <div class="bt-deal-savings">Just sold with beycome. $6K in savings.</div>
                    <div class="bt-deal-street">2754 Sandusky Ave W</div>
                    <div class="bt-deal-city">Jacksonville, FL 32216</div>
                </div>
            </div>
        </div>
    </section>

    <!-- PRICING BANNER -->
    <section class="bt-pricing-strip">
        <div class="bt-pricing-inner">
            <div class="bt-pricing-top">
                <div class="bt-pricing-headline">Clear, flat pricing.<br>No surprises.</div>
                <div class="bt-pricing-right">
                    <div class="bt-pricing-cards">
                        <div class="bt-pricing-card">
                            <div class="bt-pricing-state">Florida</div>
                            <div class="bt-pricing-amount">$99</div>
                            <div class="bt-pricing-label">Settlement fee</div>
                        </div>
                        <div class="bt-pricing-divider"></div>
                        <div class="bt-pricing-card">
                            <div class="bt-pricing-state">Texas</div>
                            <div class="bt-pricing-amount">$299</div>
                            <div class="bt-pricing-label">Settlement fee</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bt-pricing-note">Title insurance premiums are set by the state Department of Insurance and are the same regardless of which title insurer you choose — <strong>so why pay more for settlement?</strong> <a href="#bt-quote" class="bt-scroll-link">Get your full quote below</a></div>
        </div>
    </section>

    <!-- QUOTE TOOL -->
    <section class="bt-quote-section" id="bt-quote">
        <div class="bt-quote-inner">
            <div class="bt-quote-header">
                <h2>Know your closing costs upfront</h2>
                <p>Get a personalized title fee estimate in under 60 seconds.</p>
            </div>
            <div class="bt-quote-layout">
                <div class="bt-quote-card">
                    <div class="bt-q-steps">
                        <div class="bt-q-step active" id="bt-si1"><div class="bt-q-step-num">1</div><div class="bt-q-step-lbl">Property &amp; Transaction</div></div>
                        <div class="bt-q-step pending" id="bt-si2"><div class="bt-q-step-num">2</div><div class="bt-q-step-lbl">Your Info</div></div>
                    </div>

                    <!-- STEP 1: Property + Transaction -->
                    <div class="bt-form-sec active" id="bt-fs1">
                        <div class="bt-f-row full"><div class="bt-f-group"><div class="bt-f-label">Property Address</div><input type="text" class="bt-f-input" placeholder="123 Main Street, Miami, FL 33101" id="bt-q-addr"></div></div>
                        <div class="bt-f-row triple">
                            <div class="bt-f-group"><div class="bt-f-label">City</div><input type="text" class="bt-f-input" placeholder="Miami" id="bt-q-city"></div>
                            <div class="bt-f-group"><div class="bt-f-label">State</div><div class="bt-sel-wrap"><select class="bt-f-select" id="bt-q-state"><option value="">Select</option><option value="FL">Florida</option><option value="TX">Texas</option></select></div></div>
                            <div class="bt-f-group"><div class="bt-f-label">ZIP</div><input type="text" class="bt-f-input" placeholder="33101" id="bt-q-zip" maxlength="5"></div>
                        </div>
                        <div class="bt-f-row">
                            <div class="bt-f-group"><div class="bt-f-label">Property Type</div><div class="bt-f-toggle-group" data-group="ptype">
                                <div class="bt-f-toggle on"><svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>Single Family</div>
                                <div class="bt-f-toggle"><svg viewBox="0 0 24 24"><path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4z"/></svg>Condo</div>
                            </div></div>
                            <div class="bt-f-group"><div class="bt-f-label">Your Role</div><div class="bt-f-toggle-group" data-group="role"><div class="bt-f-toggle on">Seller</div><div class="bt-f-toggle">Buyer</div></div></div>
                        </div>
                        <div class="bt-f-row">
                            <div class="bt-f-group"><div class="bt-f-label">Purchase / Sale Price</div><input type="text" class="bt-f-input" placeholder="$350,000" id="bt-q-price"></div>
                            <div class="bt-f-group"><div class="bt-f-label">Loan Amount <span style="font-weight:400;color:var(--c-text-secondary)">(if financed)</span></div><input type="text" class="bt-f-input" placeholder="Leave blank if cash" id="bt-q-loan"></div>
                        </div>
                        <div class="bt-f-nav"><div></div><button class="bt-btn-next" id="bt-next1">Next: Your Info <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></button></div>
                    </div>

                    <!-- STEP 2: Your Info -->
                    <div class="bt-form-sec" id="bt-fs2">
                        <div class="bt-f-row">
                            <div class="bt-f-group"><div class="bt-f-label">First Name</div><input type="text" class="bt-f-input" placeholder="Sam" id="bt-q-fn"></div>
                            <div class="bt-f-group"><div class="bt-f-label">Last Name</div><input type="text" class="bt-f-input" placeholder="Smith" id="bt-q-ln"></div>
                        </div>
                        <div class="bt-f-row">
                            <div class="bt-f-group"><div class="bt-f-label">Email</div><input type="email" class="bt-f-input" placeholder="sam@email.com" id="bt-q-email"></div>
                            <div class="bt-f-group"><div class="bt-f-label">Phone</div><input type="tel" class="bt-f-input" placeholder="(305) 555-0100" id="bt-q-phone"></div>
                        </div>
                        <div class="bt-f-row">
                            <div class="bt-f-group"><div class="bt-f-label">Estimated Closing Date</div><input type="date" class="bt-f-input" id="bt-q-date"></div>
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

                <!-- LIVE ESTIMATE SIDEBAR -->
                <div class="bt-live-estimate" id="bt-live-estimate">
                    <div class="bt-live-estimate-title">Running Estimate</div>
                    <div class="bt-live-estimate-total" id="bt-est-total">$1,040</div>
                    <div class="bt-live-estimate-label">Estimated closing costs</div>
                    <div class="bt-live-estimate-lines">
                        <div class="bt-live-estimate-line"><span>Title Search</span><span>$250</span></div>
                        <div class="bt-live-estimate-line"><span>Closing Fee</span><span>$595</span></div>
                        <div class="bt-live-estimate-line"><span>Doc Prep</span><span>$150</span></div>
                        <div class="bt-live-estimate-line"><span>Recording</span><span>$45</span></div>
                        <div class="bt-live-estimate-line"><span>Title Insurance</span><span id="bt-est-ins">—</span></div>
                    </div>
                    <div class="bt-live-estimate-note">Enter a sale price to see your full estimate including title insurance.</div>
                </div>
            </div>
        </div>
    </section>

    <!-- WHY US -->
    <section class="bt-why-section">
        <div class="bt-why-inner">
            <h2 class="bt-title">What sets us apart</h2>
            <p class="bt-sub">We've already built one of the most affordable and accessible real estate platforms for the people — helping homeowners save over $220M in commissions and middlemen costs. That experience naturally led us to title, built with the same DNA in mind: you. Transparent pricing. Faster closings. No unnecessary middlemen. Just a simpler, smarter way to close.</p>
            <div class="bt-why-grid">
                <div class="bt-why-card">
                    <div class="bt-why-icon"><svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg></div>
                    <h3>Flat, Transparent Pricing</h3>
                    <p>Full quote upfront. No hidden fees, no percentage-of-sale markups, no referral kickbacks. You pay the best price we can offer.</p>
                    <a href="#bt-quote" class="bt-why-link bt-scroll-link">See your quote <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>
                </div>
                <div class="bt-why-card">
                    <div class="bt-why-icon"><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg></div>
                    <h3>Old Republic Backed</h3>
                    <p>Title insurance underwritten by Old Republic — a Fortune 500 company with the highest financial strength ratings in the USA.</p>
                    <a href="#bt-quote" class="bt-why-link bt-scroll-link">See your quote <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>
                </div>
                <div class="bt-why-card">
                    <div class="bt-why-icon"><svg viewBox="0 0 24 24"><path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.72L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.94-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5V2.05z"/></svg></div>
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
                <button class="bt-serve-tab active" data-tab="fsbo">FSBO Sellers</button>
                <button class="bt-serve-tab" data-tab="investors">Investors</button>
                <button class="bt-serve-tab" data-tab="institutional">Institutional</button>
                <button class="bt-serve-tab" data-tab="wholesalers">Wholesalers</button>
            </div>
            <div class="bt-serve-panel active" data-panel="fsbo">
                <div class="bt-serve-panel-icon"><svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></div>
                <div>
                    <h3>Selling without an agent?</h3>
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
                <div class="bt-uw-shield"><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg></div>
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
            <h2 class="bt-title">Save more when you sell, buy &amp; close with Beycome</h2>
            <p class="bt-sub">Title is just one piece. Beycome's full real estate platform helps you keep more money in your pocket — whether you're selling, buying, or both.</p>
            <div class="bt-eco-grid">
                <div class="bt-eco-card">
                    <div class="bt-eco-icon bt-eco-icon--sell">
                        <svg viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-2.18l-8-8-8 8v10.18h2v-6h12v6h2v-10.18z"/></svg>
                    </div>
                    <div class="bt-eco-badge-pill">For Sellers</div>
                    <h3>Flat Fee MLS Listing</h3>
                    <p>List your home on the MLS for a flat fee instead of paying 5–6% in agent commissions. Full exposure, full control — you save thousands.</p>
                    <div class="bt-eco-sell-pricing">
                        <div class="bt-eco-sell-label">True flat fee starting at</div>
                        <div class="bt-eco-sell-row">
                            <div class="bt-eco-sell-item"><span class="bt-eco-sell-price">$199</span><span class="bt-eco-sell-state">FL</span> Flat fee + title settlement</div>
                            <div class="bt-eco-sell-item"><span class="bt-eco-sell-price">$399</span><span class="bt-eco-sell-state">TX</span> Flat fee + title settlement</div>
                        </div>
                    </div>
                    <div class="bt-eco-steps">
                        <div class="bt-eco-step"><span>1</span> List on the MLS for a flat fee</div>
                        <div class="bt-eco-step"><span>2</span> Receive and negotiate offers directly</div>
                        <div class="bt-eco-step"><span>3</span> Close with Beycome Title &amp; save even more</div>
                    </div>
                    <a href="https://beycome.com/sell" target="_blank" class="bt-eco-cta">
                        Start selling on Beycome
                        <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                    </a>
                </div>
                <div class="bt-eco-card">
                    <div class="bt-eco-icon bt-eco-icon--buy">
                        <svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                    </div>
                    <div class="bt-eco-badge-pill">For Buyers</div>
                    <h3>Get Up to 2% Cash Back</h3>
                    <p>Buy your next home through Beycome and get up to 2% of the purchase price back at closing. Real cash savings, no gimmicks.</p>
                    <div class="bt-eco-highlight">
                        <div class="bt-eco-highlight-num">Up to 2%</div>
                        <div class="bt-eco-highlight-lbl">Cash back at closing</div>
                    </div>
                    <div class="bt-eco-steps">
                        <div class="bt-eco-step"><span>1</span> Search and tour homes on Beycome</div>
                        <div class="bt-eco-step"><span>2</span> Submit offers with our support</div>
                        <div class="bt-eco-step"><span>3</span> Close &amp; receive your rebate check</div>
                    </div>
                    <a href="https://beycome.com/buy" target="_blank" class="bt-eco-cta">
                        Start buying on Beycome
                        <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                    </a>
                </div>
                <div class="bt-eco-card bt-eco-card--full">
                    <div class="bt-eco-full-inner">
                        <div class="bt-eco-full-left">
                            <div class="bt-eco-icon bt-eco-icon--platform">
                                <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                            </div>
                            <h3>One Platform. Every Step Covered.</h3>
                            <p>Beycome connects selling, buying, title &amp; escrow, and market data into one seamless experience. No middlemen, no inflated fees — just a smarter way to do real estate.</p>
                        </div>
                        <div class="bt-eco-full-services">
                            <div class="bt-eco-svc-item">
                                <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                                <div><strong>Flat Fee MLS</strong><span>List &amp; sell for less</span></div>
                            </div>
                            <div class="bt-eco-svc-item">
                                <svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                                <div><strong>Buyer Rebate</strong><span>Up to 2% back</span></div>
                            </div>
                            <div class="bt-eco-svc-item">
                                <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                                <div><strong>Title &amp; Escrow</strong><span>Flat fee closing</span></div>
                            </div>
                            <div class="bt-eco-svc-item">
                                <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
                                <div><strong>Market Trends</strong><span>Free data &amp; insights</span></div>
                            </div>
                        </div>
                    </div>
                    <a href="https://beycome.com" target="_blank" class="bt-eco-cta-full">
                        Explore beycome.com
                        <svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
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
                        <div class="bt-faq-q">What is title insurance and do I need it?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Title insurance protects you against financial loss from defects in a property's title — unknown liens, recording errors, undisclosed heirs, or forged documents. It's a one-time premium paid at closing that protects you for as long as you own the property.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">How does Beycome Title work with my listing?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Once you have an accepted offer, you can open a title order directly — no separate intake process. We coordinate with all parties and keep you updated throughout.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">How do you keep your fees so low?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">We operate with a lean, tech-enabled team. No referral kickbacks to agents — those savings go directly to you.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">Which states do you operate in?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Florida and Texas. We're actively expanding. Contact us if your property is in another state.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">How long does the closing process take?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Title searches completed within 48 hours. Most closings scheduled 2–4 weeks after going under contract. We flag issues early.</div>
                    </div>
                    <div class="bt-faq-item">
                        <div class="bt-faq-q">Can I close remotely?<div class="bt-faq-ico"><svg viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></div></div>
                        <div class="bt-faq-a">Yes. We support Remote Online Notarization (RON) in Florida. In Texas, we coordinate with local notaries and mobile signing agents.</div>
                    </div>
                </div>
            </div>
            <div class="bt-final-action">
                <div class="bt-action-card">
                    <h3>Ready to move forward?</h3>
                    <p>Get your free quote or schedule a 15-minute call with a title agent.</p>
                    <a href="#bt-quote" class="bt-action-primary bt-scroll-link"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>Get Your Free Quote</a>
                    <a href="https://calendly.com/beycometitle" class="bt-action-secondary" target="_blank"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:var(--c-primary)"><path d="M20 4h-1V2h-2v2H7V2H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 18H4V10h16v12z"/></svg>Book a 15-Min Call</a>
                    <div class="bt-action-meta">
                        <div class="bt-action-meta-item"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>No commitment required</div>
                        <div class="bt-action-meta-item"><svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>Mon–Fri, 9am–5pm EST</div>
                        <div class="bt-action-meta-item"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>(786) 952-7143</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="bt-footer">
        <div class="bt-foot-eco">
            <div class="bt-foot-eco-left">
                <div>
                    <div class="bt-foot-eco-badge">Part of the Beycome real estate platform</div>
                    <a href="https://beycome.com" target="_blank" class="bt-foot-eco-link">
                        <svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                        beycome.com
                    </a>
                </div>
            </div>
            <div class="bt-foot-eco-stats">
                <div><div class="bt-foot-eco-stat-num">18,000+</div><div class="bt-foot-eco-stat-lbl">Homes sold on Beycome</div></div>
                <div><div class="bt-foot-eco-stat-num">$5.6B+</div><div class="bt-foot-eco-stat-lbl">In transactions closed</div></div>
                <div><div class="bt-foot-eco-stat-num">FL &amp; TX</div><div class="bt-foot-eco-stat-lbl">Title services available</div></div>
            </div>
        </div>
        <div class="bt-foot-top">
            <div>
                <div class="bt-foot-brand">beycome <span>title</span></div>
                <p class="bt-foot-tagline">Licensed title &amp; settlement services in Florida and Texas. Backed by Old Republic National Title Insurance Company.</p>
            </div>
            <div>
                <div class="bt-foot-col-title">Services</div>
                <ul class="bt-foot-links">
                    <li><a href="javascript:void(0)">Title Search</a></li>
                    <li><a href="javascript:void(0)">Title Insurance</a></li>
                    <li><a href="javascript:void(0)">Closing &amp; Settlement</a></li>
                    <li><a href="javascript:void(0)">Escrow Services</a></li>
                </ul>
            </div>
            <div>
                <div class="bt-foot-col-title">Company</div>
                <ul class="bt-foot-links">
                    <li><a href="javascript:void(0)">About Us</a></li>
                    <li><a href="javascript:void(0)">Get a Quote</a></li>
                    <li><a href="javascript:void(0)">Schedule a Call</a></li>
                    <li><a href="javascript:void(0)">FAQ</a></li>
                </ul>
            </div>
            <div>
                <div class="bt-foot-col-title">Contact</div>
                <ul class="bt-foot-links">
                    <li><a href="tel:7869527143">(786) 952-7143</a></li>
                    <li><a href="mailto:title@beycome.com">title@beycome.com</a></li>
                    <li><a href="javascript:void(0)">Privacy Policy</a></li>
                    <li><a href="javascript:void(0)">Terms of Use</a></li>
                </ul>
            </div>
        </div>
        <div class="bt-foot-bottom">
            <div class="bt-foot-legal">
                <strong>Beycome Title of Florida LLC</strong> · Florida Title Insurance License #G142689 · 5701 Sunset Drive, Suite 101, South Miami, FL 33143 · (786) 952-7143 · title@beycome.com · Mon–Fri 9:00am–5:00pm EST<br>
                <strong>Beycome Title of Texas LLC</strong> · Licensed by the Texas Department of Insurance<br><br>
                &copy; 2026 Beycome Title of Florida LLC, Beycome Title of Texas LLC and/or its affiliates. All rights reserved. Title insurance underwritten by Old Republic National Title Insurance Company. Rate quotes are estimates only and subject to change.
                <a href="javascript:void(0)" style="margin-left:12px">Privacy Policy</a> &middot; <a href="javascript:void(0)">Terms of Use</a>
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

    // Back button
    var backBtn = document.getElementById('btBackBtn');
    if (backBtn) backBtn.addEventListener('click', function (e) { e.preventDefault(); window.location.hash = '/offers'; });

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
