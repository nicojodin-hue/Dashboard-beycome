import { addChatMessage } from '../components/chat.js';
import { isDesktopView } from '../utils.js';

const offerData = {
    offer_1: {
        id: 'offer_1',
        property: '1505 N Jean Baptiste Pointe du Sable Lake Shore Dr',
        propertyCityState: 'Bonadelle Ranchos-Madera Ranchos, CA 33135',
        buyer: 'John Smith',
        buyerEmail: 'john.smith@email.com',
        buyerPhone: '(555) 123-4567',
        seller: 'Nicolas Jordan',
        sellerEmail: 'nicolas.jordan@email.com',
        seller2: 'Marie Jordan',
        seller2Email: 'marie.jordan@email.com',
        price: 485000,
        earnestMoney: 10000,
        downPayment: 97000,
        loanAmount: 378000,
        financing: 'Conventional',
        contingencies: 'Inspection, Financing',
        closingDate: 'March 15, 2026',
        expiration: '48 hours',
        expirationDate: 'January 27, 2026 at 2:30 PM',
        receivedDate: 'January 25, 2026 at 2:30 PM',
        status: 'pending',
        agentRepresentation: 'No'
    },
    offer_2: {
        id: 'offer_2',
        property: '456 Ocean Drive',
        propertyCityState: 'Miami Beach, FL 33139',
        buyer: 'Sarah Johnson',
        buyerEmail: 'sarah.johnson@email.com',
        buyerPhone: '(555) 555-5678',
        seller: 'Nicolas Jordan',
        sellerEmail: 'nicolas.jordan@email.com',
        seller2: 'Marie Jordan',
        seller2Email: 'marie.jordan@email.com',
        price: 650000,
        earnestMoney: 15000,
        downPayment: 130000,
        loanAmount: 520000,
        financing: 'Conventional',
        contingencies: 'Inspection',
        closingDate: 'February 28, 2026',
        expiration: 'Accepted',
        expirationDate: '',
        receivedDate: 'January 20, 2026 at 10:15 AM',
        status: 'accepted',
        agentRepresentation: 'Yes'
    },
    offer_3: {
        id: 'offer_3',
        property: '789 Palm Avenue',
        propertyCityState: 'Coral Gables, FL 33134',
        buyer: 'David Miller',
        buyerEmail: 'david.miller@email.com',
        buyerPhone: '(555) 555-9012',
        seller: 'Nicolas Jordan',
        sellerEmail: 'nicolas.jordan@email.com',
        seller2: null,
        seller2Email: null,
        price: 520000,
        earnestMoney: 12000,
        downPayment: 104000,
        loanAmount: 416000,
        financing: 'FHA',
        contingencies: 'Inspection, Financing, Appraisal',
        closingDate: 'April 1, 2026',
        expiration: '72 hours',
        expirationDate: 'January 28, 2026 at 9:00 AM',
        receivedDate: 'January 25, 2026 at 9:00 AM',
        status: 'pending',
        agentRepresentation: 'No'
    }
};

const demoResponses = [
    "That's a great question! The offer of $XXX,XXX is competitive for this market. Would you like me to explain the terms in more detail?",
    "The buyer has proposed conventional financing with 20% down payment, which is quite solid. The closing date gives plenty of time for the process.",
    "I can help you submit a counter offer if you'd like to negotiate the price or other terms. Just let me know what changes you'd like to propose!",
    "The earnest money deposit shows the buyer is serious about this purchase. It's about 2% of the offer price, which is standard.",
    "If you have any concerns about the contingencies, I'd be happy to explain what they mean for you as the seller."
];

function addChatBubble(msg, chatContainer) {
    if (!isDesktopView()) return;
    addChatMessage(msg);
}

function fmt(num) {
    return `$${num.toLocaleString()}`;
}

function isCounterWaiting(offerId) {
    return localStorage.getItem('offerCounterWaiting_' + offerId) === 'true';
}

function getStatusBadges(offer) {
    if (offer.status === 'accepted') {
        return '<span class="status-badge accepted">Accepted</span>';
    }
    if (offer.status === 'declined') {
        return '<span class="status-badge declined">Declined</span>';
    }
    if (offer.status === 'countered') {
        let badge = '<span class="status-badge" style="background:var(--c-warning-bg);color:var(--c-warning);">Countered</span>';
        if (isCounterWaiting(offer.id)) {
            badge += ' <span class="status-badge" style="background:var(--c-periwinkle-bg);color:var(--c-periwinkle);">Awaiting Response</span>';
        }
        return badge;
    }
    let badges = '<span class="status-badge pending">Pending</span>';
    if (offer.expiration && offer.expiration !== 'Accepted') {
        badges += ` <span class="status-badge" style="background:var(--c-warning-bg);color:var(--c-warning);">Expires in ${offer.expiration}</span>`;
    }
    return badges;
}

function getOfferStatus(offerId) {
    const saved = localStorage.getItem('offerStatus_' + offerId);
    return saved || null;
}

function updatePageStatus(offer, newStatus) {
    // Update in-memory offer status
    offer.status = newStatus;

    // Persist to localStorage
    localStorage.setItem('offerStatus_' + offer.id, newStatus);

    // Update status badges in page header
    const headerRight = document.querySelector('.od-page-header-right');
    if (headerRight) {
        headerRight.innerHTML = getStatusBadges(offer);
    }

    // Hide action buttons
    const chatActions = document.getElementById('odChatActions');
    if (chatActions) {
        chatActions.classList.remove('show');
        chatActions.style.display = 'none';
    }
}

function buildContractHtml(offer) {
    return `
        <div class="od-pdf-page">
            <h1>Residential Purchase and Sale Agreement</h1>

            <div class="od-section">
                <h2>1. Parties</h2>
                <p>This Residential Purchase and Sale Agreement ("Agreement") is entered into as of ${offer.receivedDate.split(' at')[0]}, by and between:</p>
                <p><strong>Buyer:</strong> ${offer.buyer}, Email: ${offer.buyerEmail}, Phone: ${offer.buyerPhone}</p>
                <p><strong>Seller:</strong> ${offer.seller}${offer.seller2 ? ` and ${offer.seller2}` : ''}, Email: ${offer.sellerEmail}${offer.seller2 ? `, ${offer.seller2Email}` : ''}</p>
            </div>

            <div class="od-section">
                <h2>2. Property Description</h2>
                <p>The Seller agrees to sell, and the Buyer agrees to purchase, the real property located at:</p>
                <p><strong>${offer.property}, ${offer.propertyCityState}</strong></p>
                <p>Together with all improvements, fixtures, and appurtenances thereto, and all rights, privileges, and easements appurtenant thereto, including all mineral rights, water rights, and air rights, if any (collectively, the "Property").</p>
            </div>

            <div class="od-section">
                <h2>3. Purchase Price and Payment Terms</h2>
                <p><strong>Purchase Price:</strong> ${fmt(offer.price)}</p>
                <p><strong>Earnest Money Deposit:</strong> ${fmt(offer.earnestMoney)}, to be deposited within 3 business days of the Effective Date into an escrow account held by the designated closing agent.</p>
                <p><strong>Down Payment:</strong> ${fmt(offer.downPayment)} (due at closing, less earnest money deposit)</p>
                <p><strong>Financing:</strong> ${offer.financing} loan in the amount of ${fmt(offer.loanAmount)}</p>
                <p>The balance of the Purchase Price shall be paid at closing by certified funds, wire transfer, or other means acceptable to the closing agent.</p>
            </div>

            <div class="od-section">
                <h2>4. Financing Contingency</h2>
                <p>This Agreement is contingent upon the Buyer obtaining a ${offer.financing} mortgage loan in the amount of ${fmt(offer.loanAmount)} at prevailing market interest rates. The Buyer shall make a good faith effort to obtain such financing and shall apply for same within 5 business days of the Effective Date.</p>
                <p>If the Buyer is unable to obtain the financing described herein within 30 days of the Effective Date, the Buyer may terminate this Agreement by written notice to the Seller, and the earnest money deposit shall be returned to the Buyer in full.</p>
            </div>

            <div class="od-section">
                <h2>5. Contingencies</h2>
                <p>This Agreement is subject to the following contingencies: <strong>${offer.contingencies}</strong></p>
                <p><strong>Inspection Contingency:</strong> The Buyer shall have 15 days from the Effective Date to conduct, at Buyer's expense, any inspections of the Property that the Buyer deems necessary, including but not limited to general home inspection, pest inspection, radon testing, mold testing, and lead-based paint inspection.</p>
                <p>If the inspections reveal defects or conditions unacceptable to the Buyer, the Buyer may: (a) terminate this Agreement and receive a full refund of the earnest money deposit; or (b) request that the Seller repair or remedy such defects at Seller's expense prior to closing.</p>
            </div>

            <div class="od-section">
                <h2>6. Closing</h2>
                <p><strong>Closing Date:</strong> ${offer.closingDate}</p>
                <p>The closing shall take place at a mutually agreed upon location or through a mail-away closing facilitated by the designated closing agent. At closing, the Seller shall deliver to the Buyer a general warranty deed conveying marketable title to the Property, free and clear of all liens, encumbrances, and defects, except those permitted herein.</p>
                <p>Closing costs shall be allocated as follows: The Seller shall pay for the owner's title insurance policy, documentary stamps on the deed, and Seller's attorney fees. The Buyer shall pay for the lender's title insurance policy, recording fees, survey costs, and Buyer's attorney fees.</p>
            </div>

            <div class="od-section">
                <h2>7. Property Condition and Disclosures</h2>
                <p>The Seller represents that, to the best of Seller's knowledge, the Property is in good condition and repair, and the Seller is not aware of any material defects in the Property that have not been disclosed to the Buyer. The Seller shall provide to the Buyer, within 5 days of the Effective Date, all required property disclosure forms as mandated by applicable state and local laws.</p>
                <p>The Seller agrees to maintain the Property in its present condition, normal wear and tear excepted, through the date of closing.</p>
            </div>

            <div class="od-section">
                <h2>8. Default and Remedies</h2>
                <p>If the Buyer defaults under this Agreement, the Seller may retain the earnest money deposit as liquidated damages, which shall be the Seller's sole and exclusive remedy. If the Seller defaults under this Agreement, the Buyer may seek specific performance or terminate this Agreement and receive a full refund of the earnest money deposit, plus any actual damages incurred.</p>
            </div>

            <div class="od-section">
                <h2>9. Additional Terms</h2>
                <p><strong>Agent Representation:</strong> ${offer.agentRepresentation}</p>
                <p><strong>Offer Expiration:</strong> ${offer.expirationDate ? offer.expirationDate : 'N/A'}</p>
                <p>This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, and agreements between the parties. This Agreement may not be amended or modified except by a written instrument signed by both parties. Time is of the essence in this Agreement.</p>
                <p>This Agreement shall be governed by and construed in accordance with the laws of the state in which the Property is located.</p>
            </div>

            <div class="od-signature-block">
                <div class="od-signature-item">
                    <div class="od-sig-line"></div>
                    <div class="od-sig-label">Buyer Signature / Date</div>
                    <p style="margin-top:8px;font-size:14px;"><strong>${offer.buyer}</strong></p>
                </div>
                <div class="od-signature-item">
                    <div class="od-sig-line"></div>
                    <div class="od-sig-label">Seller Signature / Date</div>
                    <p style="margin-top:8px;font-size:14px;"><strong>${offer.seller}</strong></p>
                </div>
            </div>
            ${offer.seller2 ? `
            <div class="od-signature-block" style="margin-top:30px;">
                <div class="od-signature-item">
                    <div class="od-sig-line"></div>
                    <div class="od-sig-label">Co-Owner Signature / Date</div>
                    <p style="margin-top:8px;font-size:14px;"><strong>${offer.seller2}</strong></p>
                </div>
                <div class="od-signature-item"></div>
            </div>
            ` : ''}
        </div>`;
}


export function render(offerId) {
    const offer = offerData[offerId];
    if (!offer) {
        return `<div style="text-align:center; padding:60px 20px;">
            <p style="color:var(--c-error); font-size:16px;">Offer not found.</p>
            <a href="#/offers" style="color:var(--c-accent); font-size:14px;">Back to Offers</a>
        </div>`;
    }

    // Restore saved status from localStorage
    const savedStatus = getOfferStatus(offerId);
    if (savedStatus) {
        offer.status = savedStatus;
    }

    const isDecided = ['accepted', 'declined', 'countered'].includes(offer.status);
    const statusBadges = getStatusBadges(offer);
    const contractHtml = buildContractHtml(offer);

    return `
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet">

    <div class="od-page">
        <!-- Breadcrumb / back link + status -->
        <div class="od-page-header">
            <div class="od-page-header-left">
                <a href="#/offers" class="od-back-link" id="odBackBtn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    Offers
                </a>
                <span class="od-page-separator">/</span>
                <span class="od-page-title">${offer.property}</span>
            </div>
            <div class="od-page-header-right">
                ${statusBadges}
            </div>
        </div>

        <!-- Offer summary card -->
        <div class="od-card">
            <div class="od-card-header">
                <div class="od-card-info">
                    <p>Offer from</p>
                    <h2>${offer.buyer}</h2>
                    <p>${offer.buyerEmail} &middot; ${offer.buyerPhone}</p>
                </div>
                <div class="od-card-price">
                    <div class="od-label">Offer Price</div>
                    <div class="od-price">${fmt(offer.price)}</div>
                </div>
            </div>

            <div class="od-divider"></div>

            <div class="od-details">
                <div>
                    <div class="od-detail-group-title">Financial Details</div>
                    <div class="od-detail-items">
                        <div class="od-detail-item">
                            <div class="od-label">Earnest Money</div>
                            <div class="od-value">${fmt(offer.earnestMoney)}</div>
                        </div>
                        <div class="od-detail-item">
                            <div class="od-label">Down Payment</div>
                            <div class="od-value">${fmt(offer.downPayment)}</div>
                        </div>
                        <div class="od-detail-item">
                            <div class="od-label">Loan Amount</div>
                            <div class="od-value">${fmt(offer.loanAmount)}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="od-detail-group-title">Timeline & Terms</div>
                    <div class="od-detail-items">
                        <div class="od-detail-item">
                            <div class="od-label">Financing</div>
                            <div class="od-value">${offer.financing}</div>
                        </div>
                        <div class="od-detail-item">
                            <div class="od-label">Closing Date</div>
                            <div class="od-value">${offer.closingDate}</div>
                        </div>
                        <div class="od-detail-item">
                            <div class="od-label">Contingencies</div>
                            <div class="od-value">${offer.contingencies}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Legal notice (pending offers only) -->
        ${!isDecided ? `
        <div class="od-legal-notice">
            <div class="od-legal-notice-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div class="od-legal-notice-content">
                <p class="od-legal-notice-title">Legally binding process</p>
                <p class="od-legal-notice-detail">Actions taken on this offer (accept, counter, or decline) are legally binding once signed and submitted. If you are unsure about any terms, we recommend consulting with a real estate attorney before proceeding.</p>
            </div>
        </div>
        ` : ''}

        <!-- Action buttons (Accept/Counter/Decline) -->
        <div class="od-action-bar" id="odChatActions" ${isDecided ? 'style="display:none;"' : ''}>
            <button class="od-action-btn btn-decline" id="odDeclineBtn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Decline
            </button>
            <button class="od-action-btn btn-counter" id="odCounterBtn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                Counter
            </button>
            <button class="od-action-btn btn-accept" id="odAcceptBtn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Accept
            </button>
        </div>

        <!-- PDF viewer -->
        <div class="od-pdf-viewer">
            <div class="od-pdf-header">
                <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    Purchase Agreement
                </h3>
                <button class="od-pdf-download-btn" id="odPdfDownloadBtn" title="Download PDF">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </button>
            </div>
            <div class="od-pdf-content">
                ${contractHtml}
            </div>
        </div>
    </div>

    <!-- Accept Modal -->
    <div class="od-modal-overlay" id="odAcceptModal">
        <div class="od-modal">
            <h2>Accept Offer</h2>
            <p>You are accepting the offer of <strong>${fmt(offer.price)}</strong> from <strong>${offer.buyer}</strong> for <strong>${offer.property}</strong>. Please sign below to confirm.</p>

            <div class="od-signature-pad">
                <div class="od-signature-label">Your Signature</div>
                <div class="od-signature-display">
                    <input type="text" class="od-signature-input" id="odSignatureInput" placeholder="${offer.seller}" autocomplete="off" />
                </div>
                <div class="od-signature-warning" id="odSignatureWarning">Please enter a valid first and last name.</div>
            </div>

            ${offer.seller2 ? `
            <div class="od-cosigner-notice">
                <div class="od-cosigner-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <div class="od-cosigner-info">
                    <p class="od-cosigner-title">Co-owner signature required</p>
                    <p class="od-cosigner-detail">A signature request will be sent to <strong>${offer.seller2}</strong> at <strong>${offer.seller2Email}</strong> upon your confirmation.</p>
                </div>
            </div>
            ` : ''}

            <div class="od-legal-inline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span>By signing and confirming, you are entering into a legally binding agreement. This acceptance will be executed as a contract between you and the buyer. <a href="#" class="od-legal-link" onclick="return false;">Consult an attorney</a> if you have any questions.</span>
            </div>

            <div class="od-certification">
                <div class="od-certification-checkbox">
                    <input type="checkbox" id="odAcceptCertify" />
                    <label for="odAcceptCertify">${offer.seller2
                        ? 'I certify that I am a legal owner of this property and have the authority to accept this offer on behalf of all owners. I understand that accepting this offer creates a binding agreement, pending co-owner signature.'
                        : 'I certify that I am the legal owner of this property and have the authority to accept this offer. I understand that accepting this offer creates a binding agreement between the parties.'
                    }</label>
                </div>
            </div>

            <div class="od-modal-actions">
                <button class="btn" id="odAcceptCancel">Cancel</button>
                <button class="btn btn-p" id="odAcceptConfirm" disabled>Confirm Acceptance</button>
            </div>
        </div>
    </div>

    <!-- Counter Modal -->
    <div class="od-modal-overlay" id="odCounterModal">
        <div class="od-modal">
            <h2>Counter Offer</h2>
            <p>Propose new terms to <strong>${offer.buyer}</strong>. The buyer will have an opportunity to accept, decline, or counter your proposal.</p>

            <div class="od-form-group">
                <label for="odCounterPrice">Counter Price</label>
                <input type="text" id="odCounterPrice" placeholder="Enter counter price" value="${fmt(offer.price)}" />
            </div>
            <div class="od-form-group">
                <label for="odCounterClosing">Closing Date</label>
                <input type="date" id="odCounterClosing" value="${offer.closingDate ? formatDateForInput(offer.closingDate) : ''}" />
            </div>
            <div class="od-form-group">
                <label for="odCounterComments">Additional Comments</label>
                <textarea id="odCounterComments" placeholder="Any additional terms or conditions..."></textarea>
            </div>

            <div class="od-signature-pad">
                <div class="od-signature-label">Your Signature</div>
                <div class="od-signature-display">
                    <input type="text" class="od-signature-input" id="odCounterSignatureInput" placeholder="${offer.seller}" autocomplete="off" />
                </div>
                <div class="od-signature-warning" id="odCounterSignatureWarning">Please enter a valid first and last name.</div>
            </div>

            ${offer.seller2 ? `
            <div class="od-cosigner-notice">
                <div class="od-cosigner-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <div class="od-cosigner-info">
                    <p class="od-cosigner-title">Co-owner signature required</p>
                    <p class="od-cosigner-detail">A signature request will be sent to <strong>${offer.seller2}</strong> at <strong>${offer.seller2Email}</strong> upon your confirmation.</p>
                </div>
            </div>
            ` : ''}

            <div class="od-legal-inline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span>By signing and submitting this counter offer, you are making a legally binding proposal. If accepted by the buyer, it becomes an executed contract. <a href="#" class="od-legal-link" onclick="return false;">Consult an attorney</a> if you have any questions.</span>
            </div>

            <div class="od-certification">
                <div class="od-certification-checkbox">
                    <input type="checkbox" id="odCounterCertify" />
                    <label for="odCounterCertify">${offer.seller2
                        ? 'I certify that I am a legal owner of this property and have the authority to submit this counter offer on behalf of all owners. I understand that this counter offer will be sent to the buyer for review, pending co-owner signature.'
                        : 'I certify that I am the legal owner of this property and have the authority to submit this counter offer. I understand it will be sent to the buyer for review.'
                    }</label>
                </div>
            </div>

            <div class="od-modal-actions">
                <button class="btn" id="odCounterCancel">Cancel</button>
                <button class="btn btn-p" id="odCounterConfirm" disabled>Sign & Send Counter Offer</button>
            </div>
        </div>
    </div>

    <!-- Decline Modal -->
    <div class="od-modal-overlay" id="odDeclineModal">
        <div class="od-modal">
            <h2>Decline Offer</h2>
            <p>You are about to decline the offer of <strong>${fmt(offer.price)}</strong> from <strong>${offer.buyer}</strong>. This action will notify the buyer that their offer has been rejected. This cannot be undone.</p>

            <div class="od-legal-inline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span>Declining this offer is final and cannot be reversed. The buyer will be notified immediately. <a href="#" class="od-legal-link" onclick="return false;">Consult an attorney</a> if you are unsure.</span>
            </div>

            <div class="od-certification">
                <div class="od-certification-checkbox">
                    <input type="checkbox" id="odDeclineCertify" />
                    <label for="odDeclineCertify">${offer.seller2
                        ? 'I understand that declining this offer is final and the buyer will be notified immediately. I confirm that I wish to reject this offer on behalf of all owners of this property.'
                        : 'I understand that declining this offer is final and the buyer will be notified immediately. I confirm that I wish to reject this offer.'
                    }</label>
                </div>
            </div>

            <div class="od-modal-actions">
                <button class="btn" id="odDeclineCancel">Cancel</button>
                <button class="btn btn-danger" id="odDeclineConfirm" disabled>Decline Offer</button>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <div class="od-modal-overlay" id="odSuccessModal">
        <div class="od-modal">
            <div class="od-success-message">
                <div class="od-success-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--c-accent);"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h2 id="odSuccessTitle">Success!</h2>
                <p id="odSuccessMessage">Your action has been completed successfully.</p>
                <div class="od-modal-actions" style="justify-content:center;">
                    <button class="btn btn-p" id="odSuccessClose" style="max-width:200px;">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Contract Viewer Modal -->
    <div class="od-modal-overlay" id="odContractModal">
        <div class="od-modal od-contract-modal">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
                <h2 style="margin-bottom:0;">Purchase Agreement</h2>
                <div style="display:flex; gap:8px;">
                    <button class="btn" id="odContractDownload" style="flex:none;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Download
                    </button>
                    <button class="btn" id="odContractClose" style="flex:none;">Close</button>
                </div>
            </div>
            <div style="max-height:70vh; overflow-y:auto; border:1px solid var(--c-border); border-radius:8px;">
                ${contractHtml}
            </div>
        </div>
    </div>`;
}

function formatDateForInput(dateStr) {
    // Convert "March 15, 2026" to "2026-03-15"
    const months = {
        'January': '01', 'February': '02', 'March': '03', 'April': '04',
        'May': '05', 'June': '06', 'July': '07', 'August': '08',
        'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };
    const parts = dateStr.replace(',', '').split(' ');
    if (parts.length >= 3 && months[parts[0]]) {
        const m = months[parts[0]];
        const d = parts[1].padStart(2, '0');
        const y = parts[2];
        return `${y}-${m}-${d}`;
    }
    return '';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function validateSignature(value) {
    const trimmed = value.trim();
    if (!trimmed) return false;

    // Must have at least first and last name
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) return false;

    // Each part must be at least 2 characters
    for (const part of parts) {
        if (part.length < 2) return false;
    }

    // No part should be all the same character
    for (const part of parts) {
        if (/^(.)\1+$/.test(part)) return false;
    }

    // Should not be just numbers
    if (/^\d+(\s+\d+)*$/.test(trimmed)) return false;

    // Block obvious fake names
    const fakes = ['test test', 'john doe', 'jane doe', 'xxx xxx', 'aaa aaa', 'asdf asdf', 'first last', 'name name'];
    if (fakes.includes(trimmed.toLowerCase())) return false;

    return true;
}

function openPrintWindow(offer) {
    const contractHtml = buildContractHtml(offer);
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html>
<html><head><title>Purchase Agreement - ${offer.property}</title>
<style>
body { font-family: 'Times New Roman', serif; margin:0; padding:40px; line-height:1.6; color:#000; }
h1 { text-align:center; font-size:20px; font-weight:bold; margin-bottom:30px; text-transform:uppercase; }
h2 { font-size:16px; font-weight:bold; margin-top:24px; margin-bottom:12px; }
p { font-size:14px; margin-bottom:12px; text-align:justify; }
.od-section { margin-bottom:20px; }
.od-signature-block { display:flex; justify-content:space-between; margin-top:60px; }
.od-signature-item { width:45%; }
.od-sig-line { border-bottom:1px solid #000; margin-bottom:8px; height:40px; }
.od-sig-label { font-size:12px; color:#666; }
</style></head><body>${contractHtml}</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

// Track resize handler so we can clean it up on re-init
let _resizeHandler = null;

export function cleanup() {
    // Remove any action bar that was moved into the chat widget
    const staleActionBar = document.querySelector('.chat-widget .chat-input-container #odChatActions');
    if (staleActionBar) staleActionBar.remove();
    // Remove placeholder
    const stalePlaceholder = document.getElementById('odChatActionsPlaceholder');
    if (stalePlaceholder) stalePlaceholder.remove();
    // Remove resize listener
    if (_resizeHandler) {
        window.removeEventListener('resize', _resizeHandler);
        _resizeHandler = null;
    }
}

export function init(offerId) {
    // Clean up any previous offer-detail state
    cleanup();

    const offer = offerData[offerId];
    if (!offer) return;

    // Restore saved status
    const savedStatus = getOfferStatus(offerId);
    if (savedStatus) {
        offer.status = savedStatus;
    }
    const isDecided = ['accepted', 'declined', 'countered'].includes(offer.status);

    // Use the main chat widget
    const chatContainer = document.getElementById('chatMessages');
    const chatActions = document.getElementById('odChatActions');
    let demoResponseIndex = 0;

    // --- Move action buttons into chat on desktop, keep in content on mobile ---
    const actionBar = document.getElementById('odChatActions');
    const actionBarPlaceholder = document.createElement('div');
    actionBarPlaceholder.id = 'odChatActionsPlaceholder';

    function positionActionBar() {
        if (!actionBar) return;
        const chatInputContainer = document.querySelector('.chat-widget .chat-input-container');
        const contentPlaceholder = document.getElementById('odChatActionsPlaceholder');

        if (isDesktopView() && chatInputContainer) {
            // Desktop: move into chat widget, above the input
            if (actionBar.parentElement !== chatInputContainer) {
                // Leave a placeholder in content area for mobile swap-back
                if (actionBar.parentElement && !contentPlaceholder) {
                    actionBar.parentElement.insertBefore(actionBarPlaceholder, actionBar);
                }
                chatInputContainer.insertBefore(actionBar, chatInputContainer.firstChild);
                actionBar.classList.add('in-chat');
            }
        } else {
            // Mobile: move back to content area (before placeholder)
            const placeholder = document.getElementById('odChatActionsPlaceholder');
            if (placeholder && actionBar.classList.contains('in-chat')) {
                placeholder.parentElement.insertBefore(actionBar, placeholder);
                actionBar.classList.remove('in-chat');
            }
        }
    }

    positionActionBar();
    _resizeHandler = positionActionBar;
    window.addEventListener('resize', positionActionBar);

    // --- Start chat messages for offer context ---
    (async () => {
        await sleep(500);

        if (isDecided) {
            let decidedMsg = '';
            if (offer.status === 'accepted') {
                decidedMsg = `This offer of <strong>${fmt(offer.price)}</strong> from <strong>${offer.buyer}</strong> has been <strong>accepted</strong>. The closing process is underway. Feel free to ask me any questions about next steps.`;
            } else if (offer.status === 'declined') {
                decidedMsg = `This offer of <strong>${fmt(offer.price)}</strong> from <strong>${offer.buyer}</strong> has been <strong>declined</strong>. The buyer has been notified. Let me know if you have any questions.`;
            } else if (offer.status === 'countered') {
                decidedMsg = `You've submitted a counter offer for the <strong>${fmt(offer.price)}</strong> offer from <strong>${offer.buyer}</strong>. We're waiting for their response. Feel free to ask me anything in the meantime.`;
            }
            addChatBubble(decidedMsg, chatContainer);
        } else {
            // Pending — full review flow
            const msg1Text = `📋 You're reviewing the offer from <strong>${offer.buyer}</strong> on <strong>${offer.property}</strong>.<br><br><strong>Price:</strong> ${fmt(offer.price)}<br><strong>Earnest Money:</strong> ${fmt(offer.earnestMoney)}<br><strong>Financing:</strong> ${offer.financing}<br><strong>Closing Date:</strong> ${offer.closingDate}<br><strong>Contingencies:</strong> ${offer.contingencies}<br><strong>Expiration:</strong> ${offer.expirationDate ? offer.expirationDate : offer.expiration}`;
            addChatBubble(msg1Text, chatContainer);

            await sleep(600);

            const msg2Text = `Use the <strong>Accept</strong>, <strong>Counter</strong>, or <strong>Decline</strong> buttons below to respond to this offer. Feel free to ask me any questions about the terms!`;
            addChatBubble(msg2Text, chatContainer);

            await sleep(600);

            const legalMsg = `🛡️ Remember, any action you take here (accept, counter, or decline) is <strong>legally binding</strong> once signed. Take your time reviewing the terms, and don't hesitate to consult an attorney if needed.`;
            addChatBubble(legalMsg, chatContainer);
        }
    })();

    // --- Accept flow ---
    const acceptBtn = document.getElementById('odAcceptBtn');
    const acceptModal = document.getElementById('odAcceptModal');
    const acceptCancel = document.getElementById('odAcceptCancel');
    const acceptConfirm = document.getElementById('odAcceptConfirm');
    const acceptCertify = document.getElementById('odAcceptCertify');
    const signatureInput = document.getElementById('odSignatureInput');
    const signatureWarning = document.getElementById('odSignatureWarning');

    function updateAcceptConfirmState() {
        const sigValid = validateSignature(signatureInput.value);
        const certified = acceptCertify.checked;
        acceptConfirm.disabled = !(sigValid && certified);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            acceptModal.classList.add('show');
        });
    }

    if (acceptCancel) {
        acceptCancel.addEventListener('click', () => {
            acceptModal.classList.remove('show');
        });
    }

    if (signatureInput) {
        signatureInput.addEventListener('input', () => {
            const val = signatureInput.value.trim();
            if (val.length > 0 && !validateSignature(val)) {
                signatureWarning.style.display = 'block';
            } else {
                signatureWarning.style.display = 'none';
            }
            updateAcceptConfirmState();
        });
    }

    if (acceptCertify) {
        acceptCertify.addEventListener('change', updateAcceptConfirmState);
    }

    if (acceptConfirm) {
        acceptConfirm.addEventListener('click', () => {
            acceptModal.classList.remove('show');
            updatePageStatus(offer, 'accepted');

            if (offer.seller2) {
                showSuccess('Signature Submitted!', `You've signed the acceptance. A signature request has been sent to ${offer.seller2} at ${offer.seller2Email}. The offer will be fully accepted once both owners sign.`);
                setTimeout(() => addChatBubble(
                    `✅ You've signed the acceptance of <strong>${fmt(offer.price)}</strong> from <strong>${offer.buyer}</strong>. A signature request has been sent to <strong>${offer.seller2}</strong> at <strong>${offer.seller2Email}</strong>.`,
                    chatContainer
                ), 600);
            } else {
                showSuccess('Offer Accepted!', `You have successfully accepted the offer of ${fmt(offer.price)} from ${offer.buyer}. Both parties will be notified and the closing process will begin.`);
                setTimeout(() => addChatBubble(
                    `🎉 Congratulations! You've accepted the offer of <strong>${fmt(offer.price)}</strong> from <strong>${offer.buyer}</strong>. The closing process is now underway.`,
                    chatContainer
                ), 600);
            }
        });
    }

    // --- Counter flow ---
    const counterBtn = document.getElementById('odCounterBtn');
    const counterModal = document.getElementById('odCounterModal');
    const counterCancel = document.getElementById('odCounterCancel');
    const counterConfirm = document.getElementById('odCounterConfirm');
    const counterCertify = document.getElementById('odCounterCertify');
    const counterSignatureInput = document.getElementById('odCounterSignatureInput');
    const counterSignatureWarning = document.getElementById('odCounterSignatureWarning');

    function updateCounterConfirmState() {
        const sigValid = validateSignature(counterSignatureInput.value);
        const certified = counterCertify.checked;
        counterConfirm.disabled = !(sigValid && certified);
    }

    if (counterBtn) {
        counterBtn.addEventListener('click', () => {
            counterModal.classList.add('show');
        });
    }

    if (counterSignatureInput) {
        counterSignatureInput.addEventListener('input', () => {
            const val = counterSignatureInput.value.trim();
            if (val.length > 0 && !validateSignature(val)) {
                counterSignatureWarning.style.display = 'block';
            } else {
                counterSignatureWarning.style.display = 'none';
            }
            updateCounterConfirmState();
        });
    }

    if (counterCertify) {
        counterCertify.addEventListener('change', updateCounterConfirmState);
    }

    if (counterCancel) {
        counterCancel.addEventListener('click', () => {
            counterModal.classList.remove('show');
        });
    }

    if (counterConfirm) {
        counterConfirm.addEventListener('click', () => {
            counterModal.classList.remove('show');
            updatePageStatus(offer, 'countered');

            // Persist that we are waiting for buyer response
            localStorage.setItem('offerCounterWaiting_' + offer.id, 'true');

            if (offer.seller2) {
                showSuccess('Counter Offer Submitted!', `You've signed the counter offer. A signature request has been sent to ${offer.seller2} at ${offer.seller2Email}. The counter offer will be sent to ${offer.buyer} once both owners sign.`);
                setTimeout(() => addChatBubble(
                    `📤 You've signed the counter offer. A signature request has been sent to <strong>${offer.seller2}</strong> at <strong>${offer.seller2Email}</strong>. The counter offer will be sent to <strong>${offer.buyer}</strong> once both owners sign.`,
                    chatContainer
                ), 600);
            } else {
                showSuccess('Counter Offer Sent!', `Your counter offer has been signed and sent to ${offer.buyer}. You will be notified when they respond.`);
                setTimeout(() => addChatBubble(
                    `📤 Your counter offer has been signed and sent to <strong>${offer.buyer}</strong>. I'll notify you as soon as they respond.`,
                    chatContainer
                ), 600);
            }
        });
    }

    // --- Decline flow ---
    const declineBtn = document.getElementById('odDeclineBtn');
    const declineModal = document.getElementById('odDeclineModal');
    const declineCancel = document.getElementById('odDeclineCancel');
    const declineConfirm = document.getElementById('odDeclineConfirm');
    const declineCertify = document.getElementById('odDeclineCertify');

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            declineModal.classList.add('show');
        });
    }

    if (declineCertify) {
        declineCertify.addEventListener('change', () => {
            declineConfirm.disabled = !declineCertify.checked;
        });
    }

    if (declineCancel) {
        declineCancel.addEventListener('click', () => {
            declineModal.classList.remove('show');
        });
    }

    if (declineConfirm) {
        declineConfirm.addEventListener('click', () => {
            declineModal.classList.remove('show');
            updatePageStatus(offer, 'declined');
            showSuccess('Offer Rejected', `The offer from ${offer.buyer} has been declined. The buyer will be notified of your decision.`);
            setTimeout(() => addChatBubble(
                `❌ The offer from <strong>${offer.buyer}</strong> has been declined. The buyer has been notified.`,
                chatContainer
            ), 600);
        });
    }

    // --- Success modal ---
    function showSuccess(title, message) {
        const successModal = document.getElementById('odSuccessModal');
        const successTitle = document.getElementById('odSuccessTitle');
        const successMessage = document.getElementById('odSuccessMessage');
        if (successTitle) successTitle.textContent = title;
        if (successMessage) successMessage.textContent = message;
        if (successModal) successModal.classList.add('show');
    }

    const successClose = document.getElementById('odSuccessClose');
    if (successClose) {
        successClose.addEventListener('click', () => {
            document.getElementById('odSuccessModal').classList.remove('show');
        });
    }

    // --- Contract viewer modal ---
    const contractModal = document.getElementById('odContractModal');
    const contractClose = document.getElementById('odContractClose');
    const contractDownload = document.getElementById('odContractDownload');

    if (contractClose) {
        contractClose.addEventListener('click', () => {
            contractModal.classList.remove('show');
        });
    }

    if (contractDownload) {
        contractDownload.addEventListener('click', () => {
            openPrintWindow(offer);
        });
    }

    // --- PDF download button (in the left content) ---
    const pdfDownloadBtn = document.getElementById('odPdfDownloadBtn');
    if (pdfDownloadBtn) {
        pdfDownloadBtn.addEventListener('click', () => {
            openPrintWindow(offer);
        });
    }

    // --- Close modals on overlay click ---
    document.querySelectorAll('.od-modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
            }
        });
    });

}
