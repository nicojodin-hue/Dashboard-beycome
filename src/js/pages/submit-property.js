import store from '../store.js';
import { formatPhoneNumber, formatDecimalInput, showMobileToast, toggleMenu, animateNumber, formatFileSize } from '../utils.js';

let signingDocs = [];
let propertyMap = null;
let propertyMarker = null;
let geocoder = null;

const pkgIncludes = {
    basic: [
        'Listing on your local MLS',
        'Syndication to 100+ top real estate sites',
        'Maximum photos allowed by the MLS',
        'Direct online offers & messaging dashboard',
        'Free, unlimited updates and changes',
        'Free, unlimited open house scheduler',
        'Free ShowingTime℠ (when available)',
        'Free Home Visit Manager tool',
        '24-month MLS listing',
        'Cancel anytime for free',
        '$0 due at closing — no hidden fees, ever',
        'Free access to all legal forms/disclosures',
        'Call, chat, and email support (6 days a week in English & Spanish)'
    ],
    enhanced: [
        '<strong>25 HDR Professional Photos</strong>',
        '<strong>1x Key lock box</strong>',
        '<strong>1x personalized yard sign + open house package</strong>',
        '<strong>Customizable flyers and brochure</strong>',
        '<strong>Virtual tour YouTube© video</strong>',
        '<strong>Printable promotional items</strong>',
        '<strong>Craigslist© easy click & share Ad</strong>',
        '<strong>Digital advertising suitable for social media sharing</strong>',
        '<strong>Featured on beycome.com</strong>',
        '<strong>$0 due at closing — no hidden fees, ever</strong>'
    ],
    concierge: [
        '<strong>Dedicated 7/7 experienced personnel</strong>',
        '<strong>Dedicated 7/7 closing coordinator</strong>',
        '<strong>Syndication to 100+ top real estate sites</strong>',
        '<strong>Negotiation, offer reviews, and paperwork support</strong>',
        '<strong>Open house and visit schedule</strong>',
        '<strong>Home valuation guidance and pricing strategy</strong>',
        '<strong>Dedicated Closing coordinator</strong>',
        '<strong>Complete Comparative Market Analysis (CMA)</strong>',
        '<strong>Professional HDR pictures</strong>',
        '<strong>Immersive 3D home tour (where available)</strong>',
        '<strong>Drone photography (where available)</strong>'
    ]
};

export function render(propertyId = null) {
    // If propertyId is passed, we're editing an existing property
    const isEditing = !!propertyId;
    const step1Display = isEditing ? 'none' : 'flex';
    const step2Display = isEditing ? 'block' : 'none';

    return `
    <header style="background:var(--c-bg); padding:20px 0; border-bottom:1px solid var(--c-border);">
        <div style="max-width:1400px; margin:0 auto; padding:0 20px; display:flex; align-items:center; justify-content:space-between;">
            <a href="javascript:void(0)" id="submitBackBtn" style="display:flex; align-items:center; gap:6px; text-decoration:none; color:var(--c-primary); font-size:14px; font-weight:500;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>Back</a>
            <a href="#" class="logo" style="text-decoration:none;"><svg width="141" height="27" viewBox="0 0 141 27" fill="none" xmlns="http://www.w3.org/2000/svg" title="beycome.com" alt="beycome.com"><path d="M55.5,9.8c-.4-.89-.98-1.69-1.7-2.33-.72-.64-1.57-1.12-2.49-1.4-.92-.28-1.89-.35-2.84-.21-.95.14-1.86.48-2.67,1.01-1,.64-1.84,1.52-2.45,2.55-.61,1.04-.97,2.2-1.05,3.41-.14,1.09-.05,2.2.25,3.26.3,1.06.82,2.04,1.51,2.88.63.78,1.42,1.41,2.3,1.86.89.45,1.86.7,2.84.74.99.04,1.97-.13,2.89-.51.92-.38,1.75-.95,2.44-1.67.7-.74,1.21-1.65,1.47-2.64h-3.41c-.06,0-.11.02-.16.05-.05.03-.09.08-.12.13-.28.39-.64.7-1.05.93-.41.23-.87.36-1.34.38-.85.13-1.73-.05-2.46-.51-.74-.46-1.29-1.17-1.57-2.01-.13-.41-.13-.41.28-.41h9.76c.23,0,.32-.04.35-.29.24-1.79-.04-3.6-.8-5.23h0ZM45.71,12.15c.16-.93.66-1.76,1.41-2.32.75-.56,1.68-.8,2.59-.67.83-.03,1.64.26,2.28.81.63.55,1.04,1.33,1.13,2.17h-7.41Z" fill="#070707"/><path d="M106.82,7.54c.58-.81,1.44-1.37,2.4-1.59,1.98-.38,3.78.02,4.92,1.93.12.2.17.23.32.02.58-.79,1.37-1.4,2.27-1.75.9-.36,1.88-.45,2.84-.26,2.75.33,3.98,2.2,4.38,4.58.11.72.16,1.45.15,2.18,0,2.77,0,5.53,0,8.29,0,.28-.06.36-.34.35-.86-.02-1.71-.02-2.57,0-.27,0-.35-.06-.35-.34.01-2.6.01-5.22,0-7.83.01-.76-.07-1.53-.26-2.27-.06-.28-.18-.55-.35-.79s-.38-.44-.62-.6c-.24-.15-.51-.26-.79-.31-.28-.05-.57-.04-.85.03-1.31.16-1.95.91-2.21,2.39-.12.82-.18,1.64-.17,2.46,0,2.31,0,4.62,0,6.93,0,.28-.07.34-.33.33-.86-.02-1.72-.02-2.57,0-.3,0-.39-.05-.39-.38.02-2.78,0-5.55,0-8.33,0-.55-.07-1.1-.22-1.63-.06-.3-.18-.58-.35-.83-.17-.25-.38-.47-.63-.63-.25-.17-.53-.28-.82-.33-.29-.05-.59-.05-.89.02-1.33.14-1.97.91-2.17,2.43-.1.77-.15,1.55-.15,2.32,0,2.33,0,4.67,0,7,0,.27-.05.37-.34.36-.89-.02-1.79-.02-2.68,0-.22,0-.27-.06-.27-.28,0-4.86,0-9.72,0-14.58,0-.24.07-.3.31-.3.81.01,1.62.01,2.43,0,.22,0,.29.05.28.28-.02.34,0,.69,0,1.13" fill="#070707"/><path d="M100.48,8.86c-.93-1.4-2.32-2.4-3.92-2.83-1.6-.43-3.3-.25-4.78.5-1.17.58-2.16,1.46-2.89,2.55-.73,1.1-1.16,2.37-1.25,3.69-.15,1.16-.05,2.34.29,3.45.35,1.11.93,2.14,1.7,3,.99,1.16,2.32,1.94,3.79,2.24,1.47.3,3,.09,4.34-.59,1.19-.57,2.21-1.46,2.94-2.57.74-1.11,1.16-2.41,1.24-3.75.16-2.01-.36-4.02-1.48-5.69h0ZM97.39,17.08c-.33.37-.73.67-1.18.87-.45.2-.93.31-1.42.31-.49,0-.98-.1-1.43-.3-.45-.2-.85-.5-1.19-.86-.83-.91-1.29-2.1-1.31-3.34-.01-1.24.43-2.44,1.23-3.37.36-.42.8-.74,1.3-.96.5-.21,1.04-.31,1.58-.28.54.03,1.07.19,1.54.45.47.27.88.64,1.19,1.1.67.94,1.01,2.09.95,3.25-.06,1.16-.51,2.27-1.27,3.13" fill="#070707"/><path d="M85.96,16.25c-.96,2.73-2.58,4.72-5.48,5.21-1.34.27-2.73.12-3.99-.42-1.26-.54-2.33-1.46-3.07-2.64-1.13-1.64-1.62-3.65-1.37-5.64.08-1.08.38-2.13.89-3.09.51-.95,1.2-1.79,2.05-2.45.83-.64,1.78-1.07,2.79-1.28,1.01-.21,2.06-.19,3.06.07,1,.26,1.94.74,2.73,1.41.8.67,1.44,1.52,1.87,2.48.2.42.37.87.5,1.32h-3.51c-.05,0-.1,0-.15-.03-.04-.03-.08-.07-.1-.12-.29-.65-.77-1.19-1.38-1.54-.61-.34-1.32-.48-2.01-.37-.76.04-1.48.32-2.07.82-.58.49-1,1.17-1.17,1.92-.29.83-.37,1.71-.24,2.58.14.87.49,1.68,1.02,2.37.34.46.79.83,1.3,1.07.51.24,1.08.36,1.64.33.56-.03,1.11-.2,1.6-.5.49-.3.89-.71,1.19-1.2.06-.11.14-.19.25-.25.1-.06.22-.08.34-.06,1.08.01,2.16,0,3.3,0" fill="#070707"/><path d="M57.27,6.13c1.19,0,2.35,0,3.5,0,.23,0,.26.12.31.29.92,3.02,1.84,6.04,2.76,9.06.04.12.03.27.17.36.55-1.66,1.1-3.31,1.65-4.95.5-1.5.99-3,1.49-4.49.04-.13.05-.26.26-.26,1.17.01,2.35,0,3.52,0,.06.14-.03.24-.07.35-2.51,6.51-5.02,13.01-7.53,19.52-.03.11-.09.2-.18.26s-.2.08-.3.07c-1.03-.02-2.07,0-3.11,0-.01-.1.01-.21.07-.29.77-1.97,1.53-3.93,2.31-5.9.04-.09.06-.19.06-.29,0-.1-.02-.2-.05-.29-1.59-4.37-3.17-8.74-4.74-13.12-.03-.09-.06-.18-.09-.3" fill="#070707"/><path d="M139.38,9.77c-.44-.97-1.1-1.82-1.92-2.49-.82-.66-1.78-1.12-2.81-1.34-1.03-.22-2.09-.19-3.1.09-1.01.28-1.95.79-2.73,1.5-1.13,1.01-1.95,2.33-2.38,3.8-.43,1.47-.44,3.04-.04,4.51.4,1.81,1.45,3.41,2.96,4.45,1.5,1.05,3.34,1.47,5.14,1.17,1.21-.15,2.35-.64,3.29-1.42.94-.78,1.65-1.82,2.04-3,.1-.27.03-.31-.22-.31-.99.01-1.97,0-2.96,0-.09,0-.17,0-.25.04-.08.04-.15.09-.2.16-.28.38-.63.69-1.04.92-.41.22-.86.35-1.33.37-.86.13-1.74-.05-2.48-.52-.74-.47-1.3-1.18-1.57-2.03-.09-.28-.08-.39.26-.38,1.62.02,3.24,0,4.86,0s3.29,0,4.93,0c.23,0,.32-.04.35-.29.24-1.8-.04-3.63-.81-5.26h0ZM129.63,12.14c.15-.91.63-1.72,1.35-2.28.72-.56,1.61-.82,2.51-.72.85-.06,1.7.22,2.35.78.66.56,1.08,1.35,1.18,2.22h-7.39Z" fill="#070707"/><path d="M32.3,6.06c-.88.25-1.66.76-2.26,1.46,0-2.06-.01-4.03.01-6.01,0-.36-.1-.43-.43-.42-.83.03-1.67.02-2.5,0-.29,0-.37.06-.37.37.01,3.39,0,6.77,0,10.16,0,3.11,0,6.22,0,9.33,0,.26.06.34.33.34.8-.02,1.6-.02,2.4,0,.23,0,.3-.06.29-.29-.02-.52,0-1.04,0-1.62.33.37.69.72,1.07,1.04.36.3.77.55,1.2.73,1.35.56,2.86.62,4.25.17s2.58-1.39,3.37-2.65c.69-1.09,1.14-2.32,1.32-3.6.19-1.28.11-2.59-.24-3.84-.19-.93-.56-1.8-1.1-2.57-.54-.77-1.22-1.42-2.02-1.9s-1.68-.8-2.59-.92c-.92-.12-1.85-.04-2.74.22h0ZM37.75,13.42c.08,1.24-.27,2.46-1,3.45-.39.48-.88.86-1.44,1.1s-1.17.35-1.77.3c-.61-.05-1.19-.24-1.71-.57-.52-.33-.95-.77-1.27-1.31-.46-.78-.72-1.66-.75-2.56-.03-.91.16-1.81.56-2.61.32-.7.85-1.28,1.51-1.66.66-.38,1.41-.55,2.16-.48.81.05,1.58.36,2.2.89.62.52,1.07,1.23,1.28,2.03.14.46.21.93.22,1.41" fill="#070707"/><path d="M20.19,12.72c-.55-.66-1.34-1.07-2.18-1.16-.85-.09-1.69.17-2.36.7-.06.07-.15.1-.24.11-.09,0-.18-.03-.24-.1-.61-.46-1.35-.71-2.1-.7-.75,0-1.47.25-2.05.73-.58.48-.98,1.15-1.13,1.9-.14.68-.12,1.39.04,2.06.16.68.47,1.31.91,1.84,1.1,1.38,2.49,2.49,4.08,3.23.15.09.33.14.5.13.18,0,.35-.05.5-.14.89-.46,1.74-1.01,2.52-1.63,1.13-.83,1.97-2.01,2.41-3.37.2-.61.25-1.26.14-1.9-.11-.63-.39-1.23-.79-1.72h0ZM19.39,15.43c-.24,1.13-.88,2.14-1.79,2.83-.6.52-1.26.97-1.95,1.34-.05.05-.12.07-.19.08-.07,0-.14,0-.2-.04-1.25-.62-2.34-1.53-3.19-2.65-.37-.47-.59-1.04-.65-1.63-.05-.41.02-.83.21-1.2.19-.37.49-.66.86-.84.38-.12.79-.12,1.18,0,.38.12.72.36.97.67.1.18.26.31.44.39.19.08.39.08.58.03.18-.07.33-.19.43-.35.18-.24.42-.44.68-.59.27-.14.56-.23.86-.25.27,0,.53.05.77.16s.46.28.62.5c.17.21.29.46.35.73.06.27.06.54,0,.81" fill="#ff9b77"/><path d="M.16,14.92c0-1.84,0-3.69,0-5.53,0-.17.03-.34.1-.5.07-.16.18-.29.31-.4C3.67,5.86,6.77,3.23,9.88.59c.56-.48.87-.48,1.43-.01,3.11,2.64,6.22,5.28,9.33,7.93.1.06.19.15.25.25.07.1.11.21.13.33.02.12.01.24-.02.36-.03.12-.09.22-.16.32s-.17.17-.28.22c-.11.05-.22.08-.34.08-.12,0-.23-.02-.34-.07-.11-.05-.2-.12-.28-.21-2.84-2.41-5.69-4.82-8.53-7.24-.48-.41-.47-.41-.95,0-2.63,2.24-5.27,4.47-7.9,6.7-.14.1-.26.24-.34.41-.08.16-.11.34-.1.52.02,3.08.02,6.15,0,9.23,0,.38.11.44.45.44,2.63-.01,5.26,0,7.89,0,.18-.02.36.03.51.13.15.1.26.25.32.42.06.17.06.36,0,.54-.06.17-.17.32-.32.42-.14.1-.3.14-.46.14H1c-.12,0-.23-.01-.34-.05-.11-.04-.2-.11-.28-.19-.08-.09-.14-.19-.18-.3-.04-.11-.05-.23-.04-.35v-5.67" fill="#ff9b77"/></svg></a>
            <div></div>
        </div>
    </header>
    <div id="submitStep1" style="display:${step1Display}; flex-direction:column; align-items:center; justify-content:center; min-height:calc(100vh - 80px); text-align:center; padding:40px 20px;">
        <h1 class="submit-title">Your Savings Journey<br>Starts Here</h1>
        <p class="submit-subtitle">Full control. Maximum exposure. One flat fee. Zero BS</p>
        <div class="submit-search-bar">
            <input type="text" id="submitPropertyAddress" placeholder="Enter your property address" value="742 Evergreen Terrace, Springfield, IL 62704" style="flex:1; border:none; outline:none; font-size:15px; padding:12px 0; font-family:inherit; background:transparent; min-width:0;">
            <button class="btn btn-p" id="listPropertyBtn" style="border-radius:22px; padding:10px 28px; font-size:15px; font-weight:600; height:44px; white-space:nowrap; flex-shrink:0;">List</button>
        </div>
        <div class="submit-stats">
            <div class="submit-stat">
                <div class="submit-stat-number" data-target="18858" data-prefix="" data-suffix="" data-format="number">0</div>
                <div class="submit-stat-label">Properties closed</div>
            </div>
            <div class="submit-stat submit-stat-middle">
                <div class="submit-stat-number" data-target="216" data-prefix="$" data-suffix=".0 M" data-format="plain">$0.0 M</div>
                <div class="submit-stat-label">In commissions saved</div>
            </div>
            <div class="submit-stat">
                <div class="submit-stat-number" data-target="40" data-start="999" data-prefix="Every " data-suffix=" min" data-format="countdown">Every 999 min</div>
                <div class="submit-stat-label">One of our properties is sold</div>
            </div>
        </div>
    </div>

    <div id="submitStep2" style="display:${step2Display}; max-width:1000px; margin:0 auto; padding:40px 20px 80px;">
        <div style="display:flex; gap:32px; align-items:flex-start;">
            <div style="flex:1; min-width:0;">
                <h2 style="font-size:24px; font-weight:700; color:var(--c-primary); margin-bottom:4px;"><span id="step2PropertyAddress"></span></h2>
                <div style="font-size:14px; color:var(--c-text-secondary); margin-bottom:8px; display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    <span>📍 Covered by <strong style="color:var(--c-primary);" id="mlsInlineText">Miami Association of Realtors (MIAMI MLS)</strong></span>
                    <span>·</span>
                    <span style="position:relative;"><a href="javascript:void(0)" id="changeMlsBtn" style="color:var(--c-accent); text-decoration:none; font-weight:500;">Change MLS</a>
                    <div class="menu" id="mlsInlineMenu" style="min-width:320px;">
                        <button class="menu-item active" data-mls="Miami Association of Realtors (MIAMI MLS)">Miami Association of Realtors (MIAMI MLS)<span class="mls-badge">Local MLS</span></button>
                        <button class="menu-item" data-mls="Stellar MLS">Stellar MLS</button>
                        <button class="menu-item" data-mls="Broward–Palm Beach MLS">Broward–Palm Beach MLS</button>
                    </div></span>
                </div>

        <div class="message-tabs" style="margin:16px 0 32px; display:inline-flex;">
            <button class="message-tab active" id="saleTab">For Sale</button>
            <button class="message-tab" id="rentTab2">For Rent</button>
        </div>

        <div style="margin-bottom:32px;">
            <label style="display:block; font-size:15px; font-weight:600; color:var(--c-primary); margin-bottom:12px;">Which of these best describes your property?<span class="required-mark">*</span><span class="info-bubble" id="propertyTypeInfo">?<span class="info-tooltip">Select the type that matches your property deed. If unsure, check your property tax records.</span></span></label>
            <div style="display:flex; flex-wrap:wrap; gap:10px;" id="propertyTypeGrid">
                <button class="btn submit-prop-type">🏠 House</button>
                <button class="btn submit-prop-type">🏢 Apartment</button>
                <button class="btn submit-prop-type">🏙️ Condo</button>
                <button class="btn submit-prop-type">🏡 Townhouse</button>
                <button class="btn submit-prop-type">🏠 Mobile home</button>
                <button class="btn submit-prop-type">🌳 Lot/Land</button>
                <button class="btn submit-prop-type">🏘️ Multi-family</button>
            </div>
        </div>

        <div style="margin-bottom:32px;">
            <h3 style="font-size:15px; font-weight:600; color:var(--c-primary); margin-bottom:4px;">Share or verify some basics about your <span id="propertyTypeLabel">property</span>:</h3>
            <p style="font-size:13px; color:var(--c-text-secondary);">Don't worry, you'll be able to add more details later.</p>
        </div>

        <div id="fieldUnitNumber" style="display:none; margin-bottom:20px;">
            <div style="display:flex; gap:12px; align-items:end;">
                <div class="form-group" style="margin-bottom:0; max-width:200px;">
                    <label>Unit Number<span class="required-mark" id="unitRequiredMark">*</span></label>
                    <input type="text" id="submitUnitNumber" class="input" placeholder="e.g., 4B, 201" style="width:100%">
                </div>
                <label style="height:44px; display:flex; align-items:center; gap:6px; white-space:nowrap; cursor:pointer; font-size:13px; color:var(--c-text-secondary);">
                    No unit #
                    <input type="checkbox" id="noUnitCheckbox" style="accent-color:var(--c-accent); margin:0;">
                </label>
            </div>
        </div>

        <div style="display:flex; gap:12px; margin-bottom:32px;" id="bedsRow">
            <div class="form-group" id="fieldBeds">
                <label>Beds<span class="required-mark">*</span><span class="info-bubble" id="bedsInfo">?<span class="info-tooltip">Count only rooms that can legally be used as bedrooms (with closet and window).</span></span></label>
                <div class="stepper-pill">
                    <button class="stepper-btn disabled" id="submitBeds_minus">−</button>
                    <span class="stepper-num" id="submitBeds" contenteditable="true">0</span>
                    <button class="stepper-btn" id="submitBeds_plus">+</button>
                </div>
            </div>
            <div class="form-group" id="fieldBaths">
                <label>Baths<span class="required-mark">*</span></label>
                <div class="stepper-pill">
                    <button class="stepper-btn disabled" id="submitBaths_minus">−</button>
                    <span class="stepper-num" id="submitBaths" contenteditable="true">0</span>
                    <button class="stepper-btn" id="submitBaths_plus">+</button>
                </div>
            </div>
            <div class="form-group" id="fieldHalfBaths">
                <label>1/2 Baths</label>
                <div class="stepper-pill">
                    <button class="stepper-btn disabled" id="submitHalfBaths_minus">−</button>
                    <span class="stepper-num" id="submitHalfBaths" contenteditable="true">0</span>
                    <button class="stepper-btn" id="submitHalfBaths_plus">+</button>
                </div>
            </div>
        </div>
        <div style="display:flex; gap:12px; margin-bottom:32px; align-items:flex-end;" id="propertyDetailsGrid">
            <div class="form-group" id="fieldLivingArea" style="margin-bottom:0;">
                <label>Living Area Sqft<span class="required-mark">*</span><span class="info-bubble" id="livingAreaInfo">?<span class="info-tooltip">Include only heated/cooled interior space. Garages, porches, and unfinished areas don't count!</span></span></label>
                <input type="text" id="submitLivingArea" class="input" placeholder="0" maxlength="9" style="width:120px; height:37px; padding:8px 12px;">
            </div>
            <div class="form-group" id="fieldLotSize" style="margin-bottom:0;">
                <label>Lot Size<span class="required-mark">*</span></label>
                <div style="display:flex; gap:10px; align-items:center;">
                    <input type="text" id="submitLotSize" class="input" placeholder="0" style="width:120px; min-width:120px; height:37px; padding:8px 12px;">
                    <div class="message-tabs" style="display:inline-flex;">
                        <button class="message-tab active" id="sqftTab">Sqft</button>
                        <button class="message-tab" id="acresTab">Acres</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group sp-section">
            <label>Set your price<span class="required-mark">*</span><span class="info-bubble" id="priceInfo">?<span class="info-tooltip">Price competitively! Homes priced within 5% of market value sell 3x faster and get more offers.</span></span></label>
            <div class="sp-row">
                <div class="sp-price-input"><span class="sp-price-symbol">$</span><input type="text" id="submitPrice" class="input" placeholder="0" value="0" style="padding-left:28px;width:120px;"></div>
                <span class="sp-savings">💰 Your potential commission savings: $<span id="savingsAmount">0</span></span>
            </div>
        </div>

        <div class="sp-card sp-section">
            <div class="sp-avm-header"><span style="font-size:13px;font-weight:600;color:var(--c-text-secondary);">Property price estimation</span><span style="font-size:11px;color:var(--c-text-secondary);">as of 1/21/2026</span></div>
            <div class="sp-avm-price">$381,000</div>
            <div class="sp-avm-range">Est. Range: <strong style="color:var(--c-primary);">$324K – $438K</strong></div>
            <div class="sp-row-wrap sp-mb-md">
                <div class="sp-stat-box" style="background:var(--c-error-bg);"><div class="sp-stat-label"><span style="color:var(--c-error);font-size:14px;">▼</span><span class="sp-caption">Last 1 Month</span></div><div class="sp-stat-val" style="color:var(--c-error);">-$15,000</div></div>
                <div class="sp-stat-box" style="background:var(--c-error-bg);"><div class="sp-stat-label"><span style="color:var(--c-error);font-size:14px;">▼</span><span class="sp-caption">Last 12 Months</span></div><div class="sp-stat-val" style="color:var(--c-error);">-10.77%</div></div>
            </div>
            <details style="cursor:pointer;"><summary class="sp-caption" style="font-weight:600;color:var(--c-accent);list-style:none;display:flex;align-items:center;gap:4px;">More details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></summary><p style="font-size:11px;color:var(--c-text-secondary);line-height:1.5;margin-top:12px;padding-top:12px;border-top:1px solid var(--c-border);">This AVM is based on Realtors Property Resource's RPR, which is calculated by analyzing nearby, similar, & most recently closed homes. beycome™ and brand children disclaims any liability arising out of the use of this AVM.</p></details>
        </div>

        <div style="margin-bottom:32px;">
            <h3 style="font-size:15px; font-weight:600; color:var(--c-primary); margin-bottom:4px;">Let's describe your property</h3>
            <p style="font-size:13px; color:var(--c-text-secondary); margin-bottom:16px;">Share what makes your place special; you can always change it later.</p>
            <textarea id="submitDescription" class="input" placeholder="e.g., Bright corner unit with updated kitchen, hardwood floors throughout, and a private balcony overlooking the garden..." style="min-height:220px; resize:vertical; font-family:inherit;"></textarea>
        </div>

        <div style="margin-bottom:32px;">
            <h3 style="font-size:15px; font-weight:600; color:var(--c-primary); margin-bottom:4px;">Legal information for <span id="legalHeaderAddress"></span></h3>
            <p style="font-size:13px; color:var(--c-text-secondary); margin-bottom:20px;">Please provide the legal owner's details. If the property has multiple owners, all parties must sign the listing agreement to remain in compliance.</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
                <div class="form-group" style="margin-bottom:0;">
                    <label>Full name<span class="required-mark">*</span></label>
                    <input type="text" id="submitOwnerName" class="input" placeholder="John Doe" value="John Doe" style="width:100%">
                </div>
                <div class="form-group" style="margin-bottom:0;">
                    <label>Email<span class="required-mark">*</span></label>
                    <input type="email" id="submitOwnerEmail" class="input" placeholder="john.doe@email.com" value="john.doe@email.com" style="width:100%">
                </div>
            </div>
            <div style="display:flex; gap:12px; align-items:flex-end; margin-bottom:12px;">
                <div class="form-group" style="margin-bottom:0; width:230px;">
                    <label>Phone<span class="required-mark">*</span></label>
                    <input type="tel" id="submitOwnerPhone" class="input" placeholder="(305) 555-1234" value="(305) 555-1234" maxlength="14" style="width:100%">
                </div>
                <label class="checkbox-label" style="font-size:14px; font-weight:500; color:var(--c-primary); cursor:pointer; height:44px; display:flex; align-items:center; white-space:nowrap;">
                    <input type="checkbox" id="secondaryOwnerCheckbox" style="accent-color:var(--c-accent); margin-top:1px;">
                    <span>There is a secondary owner <span class="info-bubble" id="secondaryOwnerInfo">?<span class="info-tooltip" style="width:300px; left:auto; right:-20px; transform:none; white-space:normal; word-wrap:break-word;">Per MLS rules and in compliance with applicable state and federal laws, we are required to obtain all Signing Authority Documents. All owners must sign the listing agreement.</span></span></span>
                </label>
            </div>
            <div id="secondaryOwnerFields" style="display:none; margin-bottom:12px;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div class="form-group" style="margin-bottom:0;">
                        <label>Full name<span class="required-mark">*</span></label>
                        <input type="text" id="submitSecondaryName" class="input" placeholder="Full name" style="width:100%">
                    </div>
                    <div class="form-group" style="margin-bottom:0;">
                        <label>Email<span class="required-mark">*</span></label>
                        <input type="email" id="submitSecondaryEmail" class="input" placeholder="email@example.com" style="width:100%">
                    </div>
                </div>
            </div>
            <div id="shippingAddressSection" style="display:none;">
                <div style="margin-bottom:16px;">
                    <label class="checkbox-label" style="font-size:14px; font-weight:500; color:var(--c-primary); cursor:pointer;">
                        <input type="checkbox" id="shippingAddressCheckbox" style="accent-color:var(--c-accent); margin-top:1px;">
                        <span>Did you use a different shipping address?</span>
                    </label>
                </div>
                <div id="shippingAddressField" class="form-group" style="margin-bottom:16px; display:none;">
                    <input type="text" id="submitShippingAddress" class="input" placeholder="123 Main St, Miami, FL 33101" style="width:100%">
                </div>
            </div>
            <div style="margin-bottom:16px;">
                <label class="checkbox-label" style="font-size:14px; font-weight:500; color:var(--c-primary); cursor:pointer;">
                    <input type="checkbox" id="signingAuthorityCheckbox" style="accent-color:var(--c-accent); margin-top:1px;">
                    <span>Are you signing on behalf of a Trust, Corporation, LLC, or under Power of Attorney?</span>
                </label>
            </div>
            <div id="signingAuthoritySection" style="display:none; margin-bottom:16px;">
                <div style="background:var(--c-bg-light); border-radius:10px; padding:16px; margin-bottom:16px;">
                    <div style="display:flex; align-items:flex-start; gap:10px;">
                        <span style="font-size:18px; flex-shrink:0;">📋</span>
                        <div>
                            <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                                <label style="font-size:14px; font-weight:600; color:var(--c-primary); margin:0;">Upload Legal Signing Documents</label>
                                <span class="info-bubble" id="signingDocsInfo">?<span class="info-tooltip" style="width:300px; left:auto; right:-20px; transform:none;">Per MLS rules and in compliance with applicable state and federal laws, we are required to obtain all Signing Authority Documents.<br><br>All owners must sign the listing agreement. If someone signs on behalf of an entity or another individual, they must clearly indicate their proper title (for example: Trustee of a Trust, Managing Member of an LLC, Corporate Officer, or Attorney-in-Fact under a Power of Attorney, as applicable).</span></span>
                            </div>
                            <p style="font-size:13px; color:var(--c-text-secondary); line-height:1.5; margin:0 0 12px 0;">Please upload documentation proving your signing authority (e.g., Trust Agreement, Articles of Organization, Corporate Resolution, or Power of Attorney).</p>
                        </div>
                    </div>
                    <div class="form-group" style="margin-bottom:8px;">
                        <label style="font-size:13px; font-weight:500; color:var(--c-primary);">Signing Capacity<span class="required-mark">*</span></label>
                        <select id="signingCapacity" class="form-select" style="width:100%;">
                            <option value="">Select your signing capacity...</option>
                            <option value="trustee">Trustee of a Trust</option>
                            <option value="llc">Managing Member of an LLC</option>
                            <option value="corporate">Corporate Officer</option>
                            <option value="poa">Attorney-in-Fact (Power of Attorney)</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom:8px;">
                        <label style="font-size:13px; font-weight:500; color:var(--c-primary);">Entity / Principal Name<span class="required-mark">*</span></label>
                        <input type="text" id="signingEntityName" class="input" placeholder="e.g., Smith Family Trust, ABC Holdings LLC" style="width:100%;">
                    </div>
                    <div id="signingDocDropzone" style="border:2px dashed var(--c-border); border-radius:10px; padding:24px; text-align:center; cursor:pointer; transition:all 0.2s; background:var(--c-bg-white);">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-secondary)" stroke-width="1.5" style="margin-bottom:8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <p style="font-size:13px; font-weight:500; color:var(--c-primary); margin-bottom:4px;">Click to upload or drag & drop</p>
                        <p style="font-size:12px; color:var(--c-text-secondary); margin:0;">PDF, DOC, DOCX, JPG, PNG — Max 10MB</p>
                    </div>
                    <input type="file" id="signingDocInput" style="display:none;" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png">
                    <div id="signingDocList" style="margin-top:8px;"></div>
                </div>
            </div>
        </div>

        <div style="margin-bottom:32px;">
            <h3 style="font-size:15px; font-weight:600; color:var(--c-primary); margin-bottom:4px;">Choose one of our True Flat Fee packages</h3>
            <p style="font-size:13px; color:var(--c-text-secondary); margin-bottom:16px;">Save thousands. Keep your equity. Close on your terms. <a href="javascript:void(0)" id="comparePackagesLink" style="color:var(--c-accent); font-weight:500; text-decoration:none;">Compare packages</a></p>
            <div style="display:flex; gap:12px; flex-wrap:wrap;" id="packageOptionsForm">
                <label class="pkg-card" id="pkgBasic">
                    <input type="radio" name="packageForm" value="basic">
                    <div class="pkg-name">Basic</div>
                    <div class="pkg-price">$99</div>
                    <div class="pkg-sub">Everything you need<br>Nothing you don't</div>
                    <div class="pkg-upsell">+ Add Title Settlement · $99</div>
                </label>
                <label class="pkg-card selected" id="pkgEnhanced">
                    <input type="radio" name="packageForm" value="enhanced" checked>
                    <span class="pkg-badge">Most popular</span>
                    <div class="pkg-name">Enhanced</div>
                    <div class="pkg-price accent">$399</div>
                    <div class="pkg-sub">Pro Photos · Signage<br>& more</div>
                    <div class="pkg-upsell">+ Add Title Settlement · $99</div>
                </label>
                <label class="pkg-card" id="pkgConcierge">
                    <input type="radio" name="packageForm" value="concierge">
                    <div class="pkg-name">Concierge</div>
                    <div><span class="pkg-price-old">$1,399</span><span class="pkg-price">$999</span></div>
                    <div class="pkg-sub">Full service<br>Sit back · We've got this</div>
                    <div class="pkg-included">🏛️ Title Settlement included</div>
                </label>
            </div>
            <div id="packageIncludes" style="margin-top:16px; background:var(--c-bg-light); border-radius:12px; padding:20px; display:none;">
                <div style="font-size:14px; font-weight:600; color:var(--c-primary); margin-bottom:12px;">Includes<span id="packageIncludesSubtitle" style="font-weight:500; color:var(--c-accent); margin-left:6px;"></span></div>
                <div style="display:flex; flex-direction:column; gap:8px; font-size:13px; color:var(--c-primary); line-height:1.5;" id="packageIncludesList"></div>
            </div>
            <div id="titleSettlementCard" style="display:none; margin-top:16px; border:2px solid var(--c-accent); border-radius:12px; padding:24px; background:linear-gradient(135deg, #f8f9ff 0%, #fff 100%); box-shadow:0 2px 12px rgba(125,143,247,0.12); position:relative; overflow:hidden;">
                <div style="position:absolute; top:0; right:0; background:var(--c-accent); color:white; font-size:10px; font-weight:600; padding:4px 12px; border-radius:0 0 0 8px;">INCLUDED WITH CONCIERGE</div>
                <div style="display:flex; align-items:flex-start; gap:12px; margin-bottom:16px; margin-top:8px;">
                    <span style="font-size:24px;">🏛️</span>
                    <div>
                        <div style="font-size:16px; font-weight:700; color:var(--c-primary); margin-bottom:2px;">Beycome Title</div>
                        <div style="font-size:13px; color:var(--c-text-secondary);">Settlement fee underwritten by Old Republic</div>
                    </div>
                </div>
                <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:8px; font-size:14px; color:var(--c-primary);"><span style="color:var(--c-success);">✓</span> Title search & clearance</div>
                    <div style="display:flex; align-items:center; gap:8px; font-size:14px; color:var(--c-primary);"><span style="color:var(--c-success);">✓</span> Escrow & secure fund transfer</div>
                    <div style="display:flex; align-items:center; gap:8px; font-size:14px; color:var(--c-primary);"><span style="color:var(--c-success);">✓</span> Closing coordination & docs</div>
                </div>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                    <span style="font-size:12px; color:var(--c-text-secondary);">Underwritten by</span>
                    <span style="font-size:13px; font-weight:600; color:var(--c-primary);">Old Republic</span>
                </div>
                <div style="font-size:10px; color:var(--c-text-secondary); line-height:1.5; border-top:1px solid var(--c-border); padding-top:12px;">* Florida only. Covers Beycome Title settlement fees. Title insurance, inspections, appraisal, taxes, and documentary stamp taxes are separate.</div>
            </div>
        </div>

        <div style="margin-top:40px; margin-bottom:32px;">
            <h3 style="font-size:15px; font-weight:600; color:var(--c-primary); margin-bottom:4px;">À la carte options</h3>
            <p style="font-size:13px; color:var(--c-text-secondary); margin-bottom:20px;">Want to stand out even more? Explore our à la carte options below.</p>
            <div style="display:flex; flex-direction:column; gap:10px;" id="aLaCarteOptions"></div>
            <div style="background:var(--c-bg-light); border-radius:12px; padding:20px; margin-top:20px;">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
                    <span style="font-size:14px; font-weight:500; color:var(--c-text-secondary);">Total (true flat fee)</span>
                    <span style="font-size:24px; font-weight:700; color:var(--c-primary);">$<span id="orderTotal">399</span></span>
                </div>
                <div style="height:1px; background:var(--c-border); margin-bottom:12px;"></div>
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">
                    <span style="font-size:13px; color:var(--c-text-secondary);">Traditional 6% commission would cost</span>
                    <span style="font-size:14px; font-weight:600; color:var(--c-error); text-decoration:line-through;" id="commissionCost">$0</span>
                </div>
                <div style="display:flex; align-items:center; justify-content:space-between;">
                    <span style="font-size:14px; font-weight:600; color:var(--c-success-dark);">💰 Your estimated savings</span>
                    <span style="font-size:16px; font-weight:700; color:var(--c-success-dark);" id="totalSavings">$0</span>
                </div>
                <div style="margin-top:16px; padding-top:16px; border-top:1px solid var(--c-border);">
                    <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                        <div style="flex:1; min-width:200px;">
                            <span style="font-size:14px; font-weight:600; color:var(--c-primary);">🏠 Also buying? Get up to an extra 2% cash back!</span>
                            <div style="font-size:12px; color:var(--c-text-secondary); margin-top:2px;">Most sellers also buy — save on both 😉</div>
                        </div>
                        <div style="display:flex; gap:8px;">
                            <button class="btn" id="buyYesBtn" style="min-width:72px;">Yes! 🙋</button>
                            <button class="btn" id="buyNoBtn" style="min-width:72px;">Not now</button>
                        </div>
                    </div>
                    <div id="buyPromo" style="display:none; margin-top:16px; background:linear-gradient(135deg, #f8f9ff 0%, #fff 100%); border:1px solid var(--c-accent); border-radius:12px; padding:20px; animation:alcFadeIn 0.3s ease;">
                        <div style="font-size:15px; font-weight:700; color:var(--c-primary); margin-bottom:10px;">💰 Save Thousands When You Sell and Buy Together!</div>
                        <p style="font-size:13px; color:var(--c-primary); line-height:1.6; margin-bottom:12px;">Why leave money behind? Buy your next home with us and get money back — <strong>up to 2% of the purchase price</strong>. Use it for closing costs, take it as cash, or lower your interest rate.</p>
                        <div style="background:var(--c-bg-light); border-radius:8px; padding:14px; margin-bottom:16px;">
                            <div style="font-size:13px; font-weight:600; color:var(--c-primary); margin-bottom:6px;">How it works:</div>
                            <p style="font-size:13px; color:var(--c-text-secondary); line-height:1.6; margin:0;">Most buyer agents earn about 3% commission and keep it all. We do it differently. We keep a simple 1% flat fee and give the rest (typically 2%) back to you.</p>
                        </div>
                        <p style="font-size:14px; font-weight:600; color:var(--c-primary); margin-bottom:16px; text-align:center;">Yes… it can feel like getting paid to buy your future home. 🏡</p>
                        <button class="btn btn-p" id="bookConsultBtn" style="width:100%; border-radius:10px; height:44px; font-size:14px; font-weight:600;">Book Your Consultation Today</button>
                    </div>
                </div>
            </div>
        </div>

        <p style="font-size:12px; color:var(--c-text-secondary); line-height:1.5; margin-bottom:12px;">By creating this listing on beycome.com, I agree that I am the owner or have authority to act on behalf of the property owner. <a href="https://www.beycome.com/terms-and-conditions" target="_blank" style="color:var(--c-accent); text-decoration:none; font-weight:500;">Rules and Terms of Use</a>.</p>
        <div style="display:flex; gap:12px; margin-top:0; margin-bottom:40px;">
            <button class="btn btn-s btn-lg" id="saveExitBtn" style="flex:1; height:52px; font-size:16px; border-radius:12px;">Save & exit</button>
            <button class="btn btn-p btn-lg" id="continuePaymentBtn" style="flex:2; height:52px; font-size:16px; border-radius:12px;">Continue with payment</button>
        </div>
            </div>
            <div style="width:320px; flex-shrink:0; position:relative;">
                <div style="position:sticky; top:100px;">
                <div style="background:var(--c-bg-white); border:1px solid var(--c-border); border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                    <div id="propertyMapContainer" style="height:250px; background:var(--c-bg-light);">
                        <div id="propertyMap" style="width:100%; height:100%;"></div>
                    </div>
                    <div style="padding:12px 16px;">
                        <p style="font-size:12px; color:var(--c-text-secondary); margin:0;">📌 Not quite right? Drag the pin to adjust</p>
                    </div>
                </div>
                </div>
                <div id="packageIncludesRight" style="position:absolute; left:0; right:0; background:var(--c-bg-white); border:1px solid var(--c-border); border-radius:12px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.08); display:none; overflow-y:auto;">
                    <div style="font-size:14px; font-weight:600; color:var(--c-primary); margin-bottom:12px;">Includes<span id="packageIncludesSubtitleRight" style="font-weight:500; color:var(--c-accent); margin-left:6px;"></span></div>
                    <div style="display:flex; flex-direction:column; gap:8px; font-size:13px; color:var(--c-primary); line-height:1.5;" id="packageIncludesListRight"></div>
                </div>
            </div>
        </div>
    </div>`;
}

// Save property data to localStorage
function savePropertyData(propertyId = null) {
    const properties = store.get('properties') || [];

    // Collect all form data
    const propertyData = {
        id: propertyId || 'prop_' + Date.now(),
        address: document.getElementById('submitPropertyAddress').value.trim(),
        propertyType: document.querySelector('.submit-prop-type.selected')?.textContent.trim() || '',
        listingType: document.getElementById('saleTab').classList.contains('active') ? 'sale' : 'rent',
        unitNumber: document.getElementById('submitUnitNumber')?.value.trim() || '',
        beds: parseInt(document.getElementById('submitBeds').textContent) || 0,
        baths: parseInt(document.getElementById('submitBaths').textContent) || 0,
        halfBaths: parseInt(document.getElementById('submitHalfBaths').textContent) || 0,
        livingArea: document.getElementById('submitLivingArea')?.value.replace(/,/g, '').trim() || '',
        lotSize: document.getElementById('submitLotSize')?.value.replace(/,/g, '').trim() || '',
        price: document.getElementById('submitPrice')?.value.replace(/,/g, '').trim() || '',
        description: document.getElementById('submitDescription')?.value.trim() || '',
        ownerName: document.getElementById('submitOwnerName')?.value.trim() || '',
        ownerEmail: document.getElementById('submitOwnerEmail')?.value.trim() || '',
        ownerPhone: document.getElementById('submitOwnerPhone')?.value.trim() || '',
        status: 'draft',
        updatedAt: new Date().toISOString()
    };

    if (propertyId) {
        // Update existing property
        const index = properties.findIndex(p => p.id === propertyId);
        if (index !== -1) {
            properties[index] = { ...properties[index], ...propertyData };
        }
    } else {
        // Add new property
        propertyData.createdAt = new Date().toISOString();
        properties.push(propertyData);
    }

    store.set('properties', properties);
    return propertyData.id;
}

// Load property data for editing
function loadPropertyForEdit(propertyId) {
    const properties = store.get('properties') || [];
    const property = properties.find(p => p.id === propertyId);

    if (!property) {
        console.log('Property not found:', propertyId);
        return;
    }

    // Pre-fill address
    if (property.address) {
        document.getElementById('step2PropertyAddress').textContent = property.address;
        document.getElementById('legalHeaderAddress').textContent = property.address;
    }

    // Pre-select property type
    if (property.propertyType) {
        document.querySelectorAll('.submit-prop-type').forEach(btn => {
            if (btn.textContent.trim() === property.propertyType) {
                selectPropertyType(btn);
            }
        });
    }

    // Pre-select listing type (sale/rent)
    if (property.listingType === 'rent') {
        document.getElementById('rentTab2').classList.add('active');
        document.getElementById('saleTab').classList.remove('active');
    }

    // Pre-fill unit number
    if (property.unitNumber) {
        document.getElementById('submitUnitNumber').value = property.unitNumber;
    }

    // Pre-fill beds, baths, half baths
    if (property.beds) {
        document.getElementById('submitBeds').textContent = property.beds;
        updateStepperBtns('submitBeds');
    }
    if (property.baths) {
        document.getElementById('submitBaths').textContent = property.baths;
        updateStepperBtns('submitBaths');
    }
    if (property.halfBaths) {
        document.getElementById('submitHalfBaths').textContent = property.halfBaths;
        updateStepperBtns('submitHalfBaths');
    }

    // Pre-fill living area and lot size
    if (property.livingArea && document.getElementById('submitLivingArea')) {
        document.getElementById('submitLivingArea').value = parseFloat(property.livingArea).toLocaleString();
    }
    if (property.lotSize && document.getElementById('submitLotSize')) {
        document.getElementById('submitLotSize').value = parseFloat(property.lotSize).toLocaleString();
    }

    // Pre-fill price
    if (property.price && document.getElementById('submitPrice')) {
        document.getElementById('submitPrice').value = parseFloat(property.price).toLocaleString();
        calculateSavings();
    }

    // Pre-fill description
    if (property.description && document.getElementById('submitDescription')) {
        document.getElementById('submitDescription').value = property.description;
    }

    // Pre-fill owner info
    if (property.ownerName && document.getElementById('submitOwnerName')) {
        document.getElementById('submitOwnerName').value = property.ownerName;
    }
    if (property.ownerEmail && document.getElementById('submitOwnerEmail')) {
        document.getElementById('submitOwnerEmail').value = property.ownerEmail;
    }
    if (property.ownerPhone && document.getElementById('submitOwnerPhone')) {
        document.getElementById('submitOwnerPhone').value = property.ownerPhone;
    }

    console.log('Loaded property data:', property);
}

export function init(propertyId = null) {
    const products = store.get('products');

    // If propertyId is provided, load the property data for editing
    if (propertyId) {
        loadPropertyForEdit(propertyId);
    }

    // Back button
    document.getElementById('submitBackBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '/your-listing';
    });

    // List button
    document.getElementById('listPropertyBtn')?.addEventListener('click', handleListProperty);

    // MLS change
    document.getElementById('changeMlsBtn')?.addEventListener('click', (e) => toggleMenu('mlsInlineMenu', e));
    document.querySelectorAll('#mlsInlineMenu .menu-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('#mlsInlineMenu .menu-item').forEach(i => i.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('mlsInlineText').textContent = btn.dataset.mls;
            document.getElementById('mlsInlineMenu').classList.remove('show');
        });
    });

    // Listing type tabs
    document.getElementById('saleTab')?.addEventListener('click', function () {
        this.classList.add('active');
        document.getElementById('rentTab2').classList.remove('active');
    });
    document.getElementById('rentTab2')?.addEventListener('click', function () {
        this.classList.add('active');
        document.getElementById('saleTab').classList.remove('active');
    });

    // Property type selection
    document.querySelectorAll('.submit-prop-type').forEach(btn => {
        btn.addEventListener('click', () => selectPropertyType(btn));
    });

    // No unit checkbox
    document.getElementById('noUnitCheckbox')?.addEventListener('change', toggleNoUnit);

    // Steppers
    ['submitBeds', 'submitBaths', 'submitHalfBaths'].forEach(id => {
        document.getElementById(id + '_minus')?.addEventListener('click', () => stepValue(id, -1));
        document.getElementById(id + '_plus')?.addEventListener('click', () => stepValue(id, 1));
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('blur', () => clampStepper(id));
            el.addEventListener('keydown', (e) => stepperKeydown(e, id));
        }
    });

    // Decimal inputs
    document.getElementById('submitLivingArea')?.addEventListener('input', function () { formatDecimalInput(this); });
    document.getElementById('submitLotSize')?.addEventListener('input', function () { formatDecimalInput(this); });
    document.getElementById('submitPrice')?.addEventListener('input', function () {
        formatDecimalInput(this);
        calculateSavings();
        updateOrderTotal(products);
    });

    // Lot unit tabs
    document.getElementById('sqftTab')?.addEventListener('click', function () {
        this.classList.add('active');
        document.getElementById('acresTab').classList.remove('active');
    });
    document.getElementById('acresTab')?.addEventListener('click', function () {
        this.classList.add('active');
        document.getElementById('sqftTab').classList.remove('active');
    });

    // Phone formatting
    document.getElementById('submitOwnerPhone')?.addEventListener('input', function () { formatPhoneNumber(this); });

    // Secondary owner
    document.getElementById('secondaryOwnerCheckbox')?.addEventListener('change', function () {
        document.getElementById('secondaryOwnerFields').style.display = this.checked ? 'block' : 'none';
    });

    // Shipping address
    document.getElementById('shippingAddressCheckbox')?.addEventListener('change', function () {
        document.getElementById('shippingAddressField').style.display = this.checked ? 'block' : 'none';
    });

    // Signing authority
    document.getElementById('signingAuthorityCheckbox')?.addEventListener('change', function () {
        document.getElementById('signingAuthoritySection').style.display = this.checked ? 'block' : 'none';
    });

    // Signing doc upload
    document.getElementById('signingDocDropzone')?.addEventListener('click', () => {
        document.getElementById('signingDocInput').click();
    });
    document.getElementById('signingDocInput')?.addEventListener('change', handleSigningDocUpload);

    // Info bubbles
    document.querySelectorAll('#submit-property-container .info-bubble').forEach(b => {
        b.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            document.querySelectorAll('.info-bubble').forEach(x => { if (x !== b) x.classList.remove('active'); });
            b.classList.toggle('active');
        });
    });

    // Render a la carte options
    renderALaCarteOptions(products);

    // Package selection
    document.querySelectorAll('#packageOptionsForm > label').forEach(el => {
        el.addEventListener('click', () => selectPackageForm(el, products));
    });

    // Compare packages link
    document.getElementById('comparePackagesLink')?.addEventListener('click', () => {
        showMobileToast('📊 Package comparison coming soon!');
    });

    // Buy intent
    document.getElementById('buyYesBtn')?.addEventListener('click', () => selectBuyIntent(true));
    document.getElementById('buyNoBtn')?.addEventListener('click', () => selectBuyIntent(false));

    // Book consultation
    document.getElementById('bookConsultBtn')?.addEventListener('click', () => {
        showMobileToast('📅 We\'ll reach out to schedule your consultation!');
    });

    // Save & exit
    document.getElementById('saveExitBtn')?.addEventListener('click', () => {
        const savedId = savePropertyData(propertyId);
        showMobileToast('💾 Progress saved!');
        setTimeout(() => { window.location.hash = '/your-listing'; }, 1200);
    });

    // Continue with payment
    document.getElementById('continuePaymentBtn')?.addEventListener('click', () => {
        savePropertyData(propertyId);
        submitPropertyForm(products);
    });

    // Auto-save when key fields change
    const autoSaveFields = [
        'submitPrice', 'submitDescription',
        'submitOwnerName', 'submitOwnerEmail', 'submitOwnerPhone',
        'submitLivingArea', 'submitLotSize', 'submitUnitNumber'
    ];

    autoSaveFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && propertyId) {
            field.addEventListener('blur', () => {
                savePropertyData(propertyId);
            });
        }
    });

    // Auto-save when property type is selected
    document.querySelectorAll('.submit-prop-type').forEach(btn => {
        btn.addEventListener('click', () => {
            if (propertyId) {
                setTimeout(() => savePropertyData(propertyId), 100);
            }
        });
    });

    // Animate counters on visibility
    const statsEl = document.querySelector('.submit-stats');
    if (statsEl) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { animateCounters(); observer.unobserve(e.target); }
            });
        }, { threshold: 0.5 });
        observer.observe(statsEl);
    }
}

function renderALaCarteOptions(products) {
    const container = document.getElementById('aLaCarteOptions');
    if (!container) return;
    const selectedPkg = document.querySelector('input[name="packageForm"]:checked')?.value || 'enhanced';

    container.innerHTML = products.alacarte.map((item, i) => {
        const hidden = item.hideFor.includes(selectedPkg);
        const badgeHtml = item.badge ? `<span style="position:absolute; top:-9px; right:12px; background:${item.badge === 'Now or never' ? 'var(--c-warning)' : 'var(--c-accent)'}; color:white; font-size:10px; font-weight:600; padding:2px 8px; border-radius:8px;">${item.badge}</span>` : '';
        const borderStyle = i === 0 ? 'border-color:var(--c-accent); background:#f8f9ff;' : 'border-color:var(--c-border); background:var(--c-bg-white);';
        return `<label data-alc-id="${item.id}" ${item.physical ? 'data-physical="true"' : ''} style="display:${hidden ? 'none' : 'flex'}; flex-wrap:wrap; align-items:center; justify-content:space-between; padding:14px 16px; border:1px solid; ${borderStyle} border-radius:10px; cursor:pointer; transition:all 0.2s; position:relative;">
            ${badgeHtml}
            <div style="display:flex; align-items:center; gap:10px; flex:1;"><input type="checkbox" style="accent-color:var(--c-accent); width:16px; height:16px;"><span style="font-size:14px; color:var(--c-primary);">${i === 0 ? '🏛️ ' : ''}${item.name}</span></div>
            <div style="display:flex; align-items:center; gap:10px;"><span style="font-size:14px; font-weight:600; color:var(--c-primary);">$${item.price}</span><button type="button" class="alc-info-btn">+</button></div>
            <div class="alc-info" style="display:none;">${getALaCarteInfo(item)}</div>
        </label>`;
    }).join('');

    // Bind checkbox changes
    container.querySelectorAll('label').forEach(lbl => {
        lbl.querySelector('input[type="checkbox"]')?.addEventListener('change', () => {
            lbl.classList.toggle('checked', lbl.querySelector('input[type="checkbox"]').checked);
            updateShippingVisibility(products);
            updateOrderTotal(products);
        });
    });

    // Bind info buttons
    container.querySelectorAll('.alc-info-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const label = btn.closest('label');
            const info = label.querySelector('.alc-info');
            const isOpen = info.style.display !== 'none';
            info.style.display = isOpen ? 'none' : 'block';
            btn.classList.toggle('open', !isOpen);
        });
    });

    // Bind upsell links
    document.querySelectorAll('.pkg-upsell').forEach(u => {
        u.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTitleFromUpsell(u, products);
        });
    });
}

function getALaCarteInfo(item) {
    const infos = {
        title: 'You\'re not dreaming — others charge hundreds or even thousands 😉<br><br><div style="display:flex; flex-direction:column; gap:6px; margin:8px 0;"><div style="display:flex; align-items:center; gap:8px;"><span style="color:var(--c-success);">✓</span> Title search and clearance</div><div style="display:flex; align-items:center; gap:8px;"><span style="color:var(--c-success);">✓</span> Escrow and secure fund transfer</div><div style="display:flex; align-items:center; gap:8px;"><span style="color:var(--c-success);">✓</span> Closing coordination and document preparation</div></div><br><span style="font-size:12px; color:var(--c-warning); font-weight:500;">⚠️ This price is only available now. If added later, the price will be $399.</span>',
        photos: 'Professional HDR photography session to showcase your property at its best. Includes 25 high-quality edited photos optimized for MLS and online listings.',
        support: 'Going solo doesn\'t mean going alone. Get direct access to our seasoned real estate experts whenever you need guidance.<br><br><span style="font-size:12px; color:var(--c-warning); font-weight:500;">⚠️ Note: This option is only available at this step and cannot be added later.</span>',
        cma: 'Don\'t guess your price — own it. A full CMA with comparable sales, market trends, and expert insights so you list with confidence.',
        'dual-mls': 'Near a county or state line? Don\'t leave buyers on the table. Adding a second MLS means more agents see your listing.',
        warranty: 'A $19 no-brainer. Protect your HVAC, plumbing, electrical, and water heater with up to $1,500 in coverage while listed.',
        sign: 'Stand out from the street. A premium 24x32" yard sign featuring your personalized QR code. Shipping is on us.',
        openhouse: 'Make your Open House impossible to miss. 2 directional arrow signs + 1 personalized yard sign (24x18"). Shipping is on us.',
        lockbox: 'Safe, simple, stress-free. A secure combination lockbox so authorized agents can access your property for showings.',
        spotlight: 'Boost your listing\'s visibility with premium placement on beycome.com, appearing first in search results for your area.'
    };
    return infos[item.id] || '';
}

function toggleTitleFromUpsell(el, products) {
    const titleLabel = document.querySelector('[data-alc-id="title"]');
    if (!titleLabel || titleLabel.style.display === 'none') return;
    const cb = titleLabel.querySelector('input[type="checkbox"]');
    if (!cb) return;
    cb.checked = !cb.checked;
    titleLabel.classList.toggle('checked', cb.checked);
    if (cb.checked) {
        el.textContent = '✓ Title Settlement added';
        el.style.color = 'var(--c-success-dark)';
        el.style.fontWeight = '600';
    } else {
        el.textContent = '+ Add Title Settlement · $99';
        el.style.color = '';
        el.style.fontWeight = '';
    }
    titleLabel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    updateShippingVisibility(products);
    updateOrderTotal(products);
}

function handleListProperty() {
    const addr = document.getElementById('submitPropertyAddress').value.trim();
    if (!addr) { showMobileToast('Please enter a property address'); return; }
    document.getElementById('submitStep1').style.display = 'none';
    document.getElementById('submitStep2').style.display = 'block';
    document.getElementById('step2PropertyAddress').textContent = addr;
    document.getElementById('legalHeaderAddress').textContent = addr;
    initPropertyMap(addr);
}

function selectPropertyType(btn) {
    document.querySelectorAll('.submit-prop-type').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const t = btn.textContent.trim();
    const label = t.replace(/^[^\w]+/, '').toLowerCase();
    document.getElementById('propertyTypeLabel').textContent = label;
    const isLand = t.includes('Lot/Land');
    const isAptCondo = t.includes('Apartment') || t.includes('Condo');
    const hasUnit = t.includes('Apartment') || t.includes('Condo') || t.includes('Townhouse');
    document.getElementById('bedsRow').style.display = isLand ? 'none' : 'flex';
    document.getElementById('fieldLivingArea').style.display = isLand ? 'none' : '';
    document.getElementById('fieldLotSize').style.display = isAptCondo ? 'none' : '';
    document.getElementById('fieldUnitNumber').style.display = hasUnit ? 'block' : 'none';
    if (isLand) {
        document.getElementById('acresTab').classList.add('active');
        document.getElementById('sqftTab').classList.remove('active');
        document.getElementById('sqftTab').style.display = 'none';
        document.getElementById('acresTab').style.pointerEvents = 'none';
    } else {
        document.getElementById('sqftTab').style.display = '';
        document.getElementById('acresTab').style.pointerEvents = '';
    }
}

function stepValue(id, delta) {
    const el = document.getElementById(id);
    let v = parseInt(el.textContent) || 0;
    v = Math.max(0, Math.min(20, v + delta));
    el.textContent = v;
    updateStepperBtns(id);
}

function clampStepper(id) {
    const el = document.getElementById(id);
    let v = parseInt(el.textContent.replace(/\D/g, '')) || 0;
    v = Math.max(0, Math.min(20, v));
    el.textContent = v;
    updateStepperBtns(id);
}

function stepperKeydown(e, id) {
    if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); }
    if (!/[\d]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) e.preventDefault();
}

function updateStepperBtns(id) {
    const el = document.getElementById(id);
    const v = parseInt(el.textContent) || 0;
    const mi = document.getElementById(id + '_minus');
    const pl = document.getElementById(id + '_plus');
    if (mi) mi.classList.toggle('disabled', v <= 0);
    if (pl) pl.classList.toggle('disabled', v >= 20);
}

function toggleNoUnit() {
    const cb = document.getElementById('noUnitCheckbox');
    const inp = document.getElementById('submitUnitNumber');
    const mark = document.getElementById('unitRequiredMark');
    if (cb.checked) {
        inp.value = ''; inp.disabled = true; inp.style.opacity = '0.4'; mark.style.display = 'none';
    } else {
        inp.disabled = false; inp.style.opacity = '1'; mark.style.display = 'inline';
    }
}

function calculateSavings() {
    const price = parseFloat((document.getElementById('submitPrice').value || '0').replace(/,/g, '')) || 0;
    const savings = price * 0.06;
    document.getElementById('savingsAmount').textContent = savings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function getSelectedAlcIds(products) {
    const labels = document.querySelectorAll('#aLaCarteOptions > label');
    const ids = [];
    labels.forEach((l) => {
        const alcId = l.dataset.alcId;
        if (alcId && l.style.display !== 'none' && l.querySelector('input[type="checkbox"]')?.checked) ids.push(alcId);
    });
    return ids;
}

function getTotal(products, packageId, selectedAlacarteIds = []) {
    const pkg = products.packages.find(p => p.id === packageId);
    if (!pkg) return 0;
    const extras = products.alacarte.filter(a => selectedAlacarteIds.includes(a.id)).filter(a => !a.hideFor.includes(packageId));
    return pkg.price + extras.reduce((sum, a) => sum + a.price, 0);
}

function hasPhysicalItems(products, packageId, selectedAlacarteIds = []) {
    const isPhysicalPkg = packageId === 'enhanced' || packageId === 'concierge';
    const hasPhysicalAlc = products.alacarte.some(a => a.physical && selectedAlacarteIds.includes(a.id) && !a.hideFor.includes(packageId));
    return isPhysicalPkg || hasPhysicalAlc;
}

function updateOrderTotal(products) {
    const pkg = document.querySelector('input[name="packageForm"]:checked');
    const pkgVal = pkg ? pkg.value : 'basic';
    const ids = getSelectedAlcIds(products);
    const total = getTotal(products, pkgVal, ids);
    animateNumber('orderTotal', total);
    const price = parseFloat((document.getElementById('submitPrice').value || '0').replace(/,/g, '')) || 0;
    const commission = Math.round(price * 0.06);
    const savings = Math.max(0, commission - total);
    animateNumber('commissionCost', commission);
    animateNumber('totalSavings', savings);
}

function updateShippingVisibility(products) {
    const pkg = document.querySelector('input[name="packageForm"]:checked');
    const pkgVal = pkg ? pkg.value : 'basic';
    const selectedIds = getSelectedAlcIds(products);
    const section = document.getElementById('shippingAddressSection');
    if (hasPhysicalItems(products, pkgVal, selectedIds)) {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
        const cb = document.getElementById('shippingAddressCheckbox');
        if (cb) cb.checked = false;
        const field = document.getElementById('shippingAddressField');
        if (field) field.style.display = 'none';
    }
}

function selectPackageForm(el, products) {
    document.querySelectorAll('#packageOptionsForm > label').forEach(l => l.classList.remove('selected'));
    el.classList.add('selected');
    el.querySelector('input').checked = true;
    const pkg = el.querySelector('input').value;

    // Update a la carte visibility
    document.querySelectorAll('#aLaCarteOptions > label').forEach(lbl => {
        const alcId = lbl.dataset.alcId;
        const item = products.alacarte.find(a => a.id === alcId);
        if (!item) return;
        if (item.hideFor.includes(pkg)) {
            lbl.style.display = 'none';
            const cb = lbl.querySelector('input[type="checkbox"]');
            if (cb) cb.checked = false;
            lbl.style.borderColor = 'var(--c-border)';
            lbl.style.background = 'var(--c-bg-white)';
        } else {
            lbl.style.display = 'flex';
        }
    });

    // Update includes
    const includes = pkgIncludes[pkg] || pkgIncludes.basic;
    const box = document.getElementById('packageIncludes');
    const list = document.getElementById('packageIncludesList');
    const html = includes.map(i => '<div style="display:flex;align-items:flex-start;gap:8px;"><span style="color:var(--c-success);flex-shrink:0;">✓</span><span>' + i + '</span></div>').join('');
    const subtitle = pkg === 'enhanced' ? 'Everything on Basic +' : pkg === 'concierge' ? 'Everything on Enhanced +' : '';
    document.getElementById('packageIncludesSubtitle').textContent = subtitle;
    document.getElementById('packageIncludesSubtitleRight').textContent = subtitle;
    list.innerHTML = html;
    box.style.display = 'block';

    const listR = document.getElementById('packageIncludesListRight');
    const boxR = document.getElementById('packageIncludesRight');
    listR.innerHTML = html;
    boxR.style.display = 'block';

    // Title settlement card
    const tsc = document.getElementById('titleSettlementCard');
    if (tsc) tsc.style.display = pkg === 'concierge' ? 'block' : 'none';

    // Update upsell links
    document.querySelectorAll('.pkg-upsell').forEach(u => {
        const titleLabel = document.querySelector('[data-alc-id="title"]');
        const isChecked = titleLabel && titleLabel.style.display !== 'none' && titleLabel.querySelector('input[type="checkbox"]')?.checked;
        if (isChecked) {
            u.textContent = '✓ Title Settlement added';
            u.style.color = 'var(--c-success-dark)';
            u.style.fontWeight = '600';
        } else {
            u.textContent = '+ Add Title Settlement · $99';
            u.style.color = '';
            u.style.fontWeight = '';
        }
    });

    updateShippingVisibility(products);
    updateOrderTotal(products);
}

function selectBuyIntent(yes) {
    document.getElementById('buyYesBtn').classList.toggle('btn-p', yes);
    document.getElementById('buyNoBtn').classList.toggle('btn-p', !yes);
    document.getElementById('buyPromo').style.display = yes ? 'block' : 'none';
}

function handleSigningDocUpload(e) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        if (files[i].size > 10 * 1024 * 1024) { showMobileToast('⚠️ ' + files[i].name + ' exceeds 10MB limit'); continue; }
        signingDocs.push({ name: files[i].name, size: formatFileSize(files[i].size), type: files[i].name.split('.').pop().toLowerCase() });
    }
    e.target.value = '';
    renderSigningDocs();
}

function renderSigningDocs() {
    const c = document.getElementById('signingDocList');
    if (signingDocs.length === 0) { c.innerHTML = ''; return; }
    c.innerHTML = signingDocs.map((f, i) => {
        const ix = f.type === 'pdf' ? 'PDF' : (f.type === 'doc' || f.type === 'docx' ? 'DOC' : 'IMG');
        const it = f.type === 'pdf' ? 'pdf' : (f.type === 'doc' || f.type === 'docx' ? 'doc' : 'img');
        return `<div style="display:flex; align-items:center; gap:10px; padding:10px 12px; background:var(--c-bg-white); border:1px solid var(--c-border); border-radius:8px; margin-top:6px;">
            <div class="document-icon ${it}" style="width:32px; height:32px; font-size:9px;">${ix}</div>
            <div style="flex:1; min-width:0;">
                <div style="font-size:13px; font-weight:500; color:var(--c-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${f.name}</div>
                <div style="font-size:11px; color:var(--c-text-secondary);">${f.size}</div>
            </div>
            <button class="remove-signing-doc" data-idx="${i}" style="width:28px; height:28px; border:none; background:transparent; cursor:pointer; color:var(--c-text-secondary); display:flex; align-items:center; justify-content:center; border-radius:50%; flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>`;
    }).join('');
    c.querySelectorAll('.remove-signing-doc').forEach(btn => {
        btn.addEventListener('click', () => { signingDocs.splice(parseInt(btn.dataset.idx), 1); renderSigningDocs(); });
    });
}

function submitPropertyForm(products) {
    document.querySelectorAll('#submitStep2 .field-error').forEach(e => e.remove());
    document.querySelectorAll('#submitStep2 .input-error').forEach(e => e.classList.remove('input-error'));
    const errors = [];
    const typeSelected = document.querySelector('.submit-prop-type.selected');
    if (!typeSelected) errors.push({ el: document.getElementById('propertyTypeGrid') });
    const isLand = typeSelected && typeSelected.textContent.includes('Lot/Land');
    const hasUnit = typeSelected && (typeSelected.textContent.includes('Apartment') || typeSelected.textContent.includes('Condo') || typeSelected.textContent.includes('Townhouse'));
    const isAptCondo = typeSelected && (typeSelected.textContent.includes('Apartment') || typeSelected.textContent.includes('Condo'));
    if (hasUnit && !document.getElementById('noUnitCheckbox').checked) {
        const unit = document.getElementById('submitUnitNumber').value.trim();
        if (!unit) errors.push({ el: document.getElementById('submitUnitNumber') });
    }
    if (!isLand) {
        if ((parseInt(document.getElementById('submitBeds').textContent) || 0) === 0) errors.push({ el: document.getElementById('submitBeds').closest('.stepper-pill') });
        if ((parseInt(document.getElementById('submitBaths').textContent) || 0) === 0) errors.push({ el: document.getElementById('submitBaths').closest('.stepper-pill') });
    }
    if (!isLand) {
        const la = document.getElementById('submitLivingArea').value.replace(/,/g, '').trim();
        if (!la || la === '0') errors.push({ el: document.getElementById('submitLivingArea') });
    }
    if (!isAptCondo) {
        const ls = document.getElementById('submitLotSize').value.replace(/,/g, '').trim();
        if (!ls || ls === '0') errors.push({ el: document.getElementById('submitLotSize') });
    }
    const price = document.getElementById('submitPrice').value.replace(/,/g, '').trim();
    if (!price || price === '0') errors.push({ el: document.getElementById('submitPrice') });
    const desc = document.getElementById('submitDescription').value.trim();
    if (!desc) errors.push({ el: document.getElementById('submitDescription') });
    const ownerName = document.getElementById('submitOwnerName').value.trim();
    if (!ownerName) errors.push({ el: document.getElementById('submitOwnerName') });
    const ownerEmail = document.getElementById('submitOwnerEmail').value.trim();
    if (!ownerEmail) errors.push({ el: document.getElementById('submitOwnerEmail') });
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail)) errors.push({ el: document.getElementById('submitOwnerEmail') });
    const ownerPhone = document.getElementById('submitOwnerPhone').value.replace(/\D/g, '');
    if (!ownerPhone || ownerPhone.length < 10) errors.push({ el: document.getElementById('submitOwnerPhone') });
    if (document.getElementById('secondaryOwnerCheckbox').checked) {
        if (!document.getElementById('submitSecondaryName').value.trim()) errors.push({ el: document.getElementById('submitSecondaryName') });
        const se = document.getElementById('submitSecondaryEmail').value.trim();
        if (!se) errors.push({ el: document.getElementById('submitSecondaryEmail') });
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(se)) errors.push({ el: document.getElementById('submitSecondaryEmail') });
    }
    if (document.getElementById('signingAuthorityCheckbox').checked) {
        if (!document.getElementById('signingCapacity').value) errors.push({ el: document.getElementById('signingCapacity') });
        if (!document.getElementById('signingEntityName').value.trim()) errors.push({ el: document.getElementById('signingEntityName') });
        if (signingDocs.length === 0) {
            showMobileToast('⚠️ Please upload at least one signing authority document');
            errors.push({ el: document.getElementById('signingDocInput').parentElement });
        }
    }
    if (errors.length > 0) {
        errors.forEach(err => {
            if (err.el && (err.el.classList.contains('input') || err.el.tagName === 'INPUT' || err.el.tagName === 'TEXTAREA' || err.el.classList.contains('stepper-pill'))) {
                err.el.classList.add('input-error');
            }
        });
        errors[0].el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    showMobileToast('✅ Property submitted!');
    setTimeout(() => { window.location.hash = '/your-listing'; }, 1500);
}

function animateCounters() {
    document.querySelectorAll('.submit-stat-number[data-target]').forEach(el => {
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const fmt = el.dataset.format;
        const duration = 1800;
        const startTime = performance.now();
        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);
            const current = eased * target;
            if (fmt === 'number') el.textContent = Math.round(current).toLocaleString('en-US');
            else if (fmt === 'countdown') {
                const start = parseFloat(el.dataset.start) || 999;
                const val = Math.round(start - (eased * (start - target)));
                el.textContent = prefix + val + suffix;
            } else el.textContent = prefix + Math.round(current) + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

function initPropertyMap(addr) {
    if (typeof google === 'undefined' || !google.maps) {
        // Load Google Maps API
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAB2PT13bM9cLKGhlROjVnU_sJTQeCQk90&callback=initMapCallback';
        script.async = true;
        script.defer = true;
        window.initMapCallback = function () {
            geocoder = new google.maps.Geocoder();
            doGeocode(addr);
        };
        document.head.appendChild(script);
    } else {
        if (!geocoder) geocoder = new google.maps.Geocoder();
        doGeocode(addr);
    }
}

function doGeocode(addr) {
    if (!geocoder) { setTimeout(() => doGeocode(addr), 100); return; }
    geocoder.geocode({ address: addr }, function (results, status) {
        if (status === 'OK') {
            const loc = results[0].geometry.location;
            if (!propertyMap) {
                propertyMap = new google.maps.Map(document.getElementById('propertyMap'), {
                    center: loc, zoom: 17, mapTypeControl: false, streetViewControl: false, fullscreenControl: false
                });
                propertyMarker = new google.maps.Marker({ position: loc, map: propertyMap, draggable: true, title: 'Drag to correct location' });
            } else {
                propertyMap.setCenter(loc);
                propertyMarker.setPosition(loc);
            }
        }
    });
}

export function show() {
    const container = document.getElementById('submit-property-container');
    if (container) {
        container.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

export function hide() {
    const container = document.getElementById('submit-property-container');
    if (container) {
        container.style.display = 'none';
        document.body.style.overflow = '';
    }
}
