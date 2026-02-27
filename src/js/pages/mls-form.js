import store from '../store.js';
import { showMobileToast } from '../utils.js';

const totalSteps = 9;

function getCurrentStep(propertyId) {
    const stepKey = `mls-form-step-${propertyId}`;
    const savedStep = sessionStorage.getItem(stepKey);
    return savedStep ? parseInt(savedStep, 10) : 1;
}

function setCurrentStep(propertyId, step) {
    const stepKey = `mls-form-step-${propertyId}`;
    sessionStorage.setItem(stepKey, step.toString());
}

const stepTitles = [
    'General, Legal & Tax',
    'Financial',
    'Media',
    'Interior',
    'Room Details',
    'Exterior',
    'Community & Restriction',
    'Agreement',
    'Review & Submit'
];

export function render(propertyId = null) {
    const properties = store.get('properties') || [];
    const property = properties.find(p => p.id === propertyId);

    if (!property) {
        return `<div style="text-align:center; padding:60px 20px;">
            <p style="color:var(--c-error);">Property not found</p>
        </div>`;
    }

    const currentStep = getCurrentStep(propertyId);
    const address = property.address || 'Your Property';

    return `
    <header style="background:var(--c-bg); padding:20px 0; border-bottom:1px solid var(--c-border);">
        <div style="max-width:1000px; margin:0 auto; padding:0 20px;">
            <a href="javascript:void(0)" id="mlsBackBtn" style="display:flex; align-items:center; gap:6px; text-decoration:none; color:var(--c-primary); font-size:14px; font-weight:500; margin-bottom:16px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Back to Listings
            </a>
            <div style="display:flex; align-items:center; justify-content:space-between;">
                <div>
                    <h1 style="font-size:20px; font-weight:700; margin:0 0 4px 0;">Complete Your MLS Listing</h1>
                    <p style="font-size:14px; color:var(--c-text-secondary); margin:0;">📍 ${address}</p>
                </div>
            </div>
        </div>
    </header>

    <div style="max-width:1000px; margin:40px auto; padding:0 20px;">
        <!-- Progress Steps -->
        <div style="display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:40px;">
            ${[1, 2, 3, 4].map(step => `
                <div style="display:flex; align-items:center; gap:12px;">
                    <div class="mls-step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}" data-step="${step}">
                        ${currentStep > step ? `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        ` : step}
                    </div>
                    ${step < 4 ? `<div style="width:40px; height:2px; background:${currentStep > step ? 'var(--c-success)' : 'var(--c-border)'};"></div>` : ''}
                </div>
            `).join('')}
        </div>

        <!-- Step Labels -->
        <div style="display:flex; justify-content:center; gap:80px; margin-bottom:48px;">
            <span style="font-size:12px; color:${currentStep === 1 ? 'var(--c-accent)' : 'var(--c-text-secondary)'}; font-weight:${currentStep === 1 ? '600' : '500'};">Property Details</span>
            <span style="font-size:12px; color:${currentStep === 2 ? 'var(--c-accent)' : 'var(--c-text-secondary)'}; font-weight:${currentStep === 2 ? '600' : '500'};">Documents</span>
            <span style="font-size:12px; color:${currentStep === 3 ? 'var(--c-accent)' : 'var(--c-text-secondary)'}; font-weight:${currentStep === 3 ? '600' : '500'};">Agreement</span>
            <span style="font-size:12px; color:${currentStep === 4 ? 'var(--c-accent)' : 'var(--c-text-secondary)'}; font-weight:${currentStep === 4 ? '600' : '500'};">Review</span>
        </div>

        <!-- Step Content -->
        <div id="mlsStepContent">
            ${renderStepContent(currentStep, property)}
        </div>

        <!-- Navigation Buttons -->
        <div style="display:flex; gap:12px; margin-top:32px; padding-top:32px; border-top:1px solid var(--c-border);">
            ${currentStep > 1 ? `
                <button class="btn btn-white btn-lg" id="mlsPrevBtn" style="flex:1;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Previous
                </button>
            ` : ''}
            <button class="btn ${currentStep === totalSteps ? 'btn-payment-orange' : 'btn-p'} btn-lg" id="mlsNextBtn" style="flex:2; height:48px;">
                ${currentStep === totalSteps ? `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Submit to MLS
                ` : 'Continue'}
                ${currentStep < totalSteps ? `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                ` : ''}
            </button>
        </div>
    </div>`;
}

function renderStepContent(step, property) {
    switch(step) {
        case 1:
            return renderStep1(property);
        case 2:
            return renderStep2(property);
        case 3:
            return renderStep3(property);
        case 4:
            return renderStep4(property);
        case 5:
            return renderStep5(property);
        case 6:
            return renderStep6(property);
        case 7:
            return renderStep7(property);
        case 8:
            return renderStep8(property);
        case 9:
            return renderStep9(property);
        default:
            return '';
    }
}

function renderStep1(property) {
    return `
    <div class="mls-form-card">
        <h2 style="font-size:18px; font-weight:600; margin:0 0 8px 0;">Additional Property Details</h2>
        <p style="font-size:14px; color:var(--c-text-secondary); margin:0 0 24px 0;">Help buyers find your property with complete information</p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
            <div>
                <label style="display:block; font-size:14px; font-weight:500; margin-bottom:8px;">Year Built</label>
                <input type="number" id="mlsYearBuilt" class="input" placeholder="e.g., 1995" min="1800" max="2026">
            </div>
            <div>
                <label style="display:block; font-size:14px; font-weight:500; margin-bottom:8px;">Parking Spaces</label>
                <input type="number" id="mlsParking" class="input" placeholder="Number of spaces" min="0">
            </div>
        </div>

        <div style="margin-top:20px;">
            <label style="display:block; font-size:14px; font-weight:500; margin-bottom:8px;">Property Features</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsPool">
                    <span>Swimming Pool</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsGarage">
                    <span>Garage</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsAC">
                    <span>Central A/C</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsLaundry">
                    <span>Laundry Room</span>
                </label>
            </div>
        </div>

        <div style="margin-top:20px;">
            <label style="display:block; font-size:14px; font-weight:500; margin-bottom:8px;">HOA Information</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                <div>
                    <label style="display:block; font-size:13px; color:var(--c-text-secondary); margin-bottom:8px;">HOA Fee (Monthly)</label>
                    <input type="number" id="mlsHOAFee" class="input" placeholder="$0" min="0">
                </div>
                <div>
                    <label style="display:block; font-size:13px; color:var(--c-text-secondary); margin-bottom:8px;">HOA Name</label>
                    <input type="text" id="mlsHOAName" class="input" placeholder="Optional">
                </div>
            </div>
        </div>

        <div style="margin-top:20px;">
            <label style="display:block; font-size:14px; font-weight:500; margin-bottom:8px;">Schools</label>
            <p style="font-size:13px; color:var(--c-text-secondary); margin-bottom:12px;">Elementary, Middle, and High School names</p>
            <textarea id="mlsSchools" class="input" rows="3" placeholder="e.g., Lincoln Elementary, Jefferson Middle, Washington High"></textarea>
        </div>
    </div>`;
}

function renderStep2(property) {
    return `
    <div class="mls-form-card">
        <h2 style="font-size:18px; font-weight:600; margin:0 0 8px 0;">Required Documents</h2>
        <p style="font-size:14px; color:var(--c-text-secondary); margin:0 0 24px 0;">Upload necessary documents for MLS listing</p>

        <div class="upload-section">
            <div class="upload-item">
                <div class="upload-info">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    <div>
                        <div style="font-size:14px; font-weight:600; margin-bottom:4px;">Property Deed or Title</div>
                        <div style="font-size:13px; color:var(--c-text-secondary);">Proof of ownership (PDF, max 10MB)</div>
                    </div>
                </div>
                <button class="btn btn-white" id="uploadDeed">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Upload
                </button>
            </div>

            <div class="upload-item">
                <div class="upload-info">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <div>
                        <div style="font-size:14px; font-weight:600; margin-bottom:4px;">Property Photos</div>
                        <div style="font-size:13px; color:var(--c-text-secondary);">High-quality photos (JPG/PNG, up to 25 photos)</div>
                    </div>
                </div>
                <button class="btn btn-white" id="uploadPhotos">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Upload
                </button>
            </div>

            <div class="upload-item">
                <div class="upload-info">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-secondary)" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    <div>
                        <div style="font-size:14px; font-weight:600; margin-bottom:4px;">Disclosures <span style="font-size:12px; color:var(--c-text-secondary); font-weight:400;">(Optional)</span></div>
                        <div style="font-size:13px; color:var(--c-text-secondary);">Property condition, HOA docs, etc.</div>
                    </div>
                </div>
                <button class="btn btn-white" id="uploadDisclosures">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Upload
                </button>
            </div>
        </div>

        <div style="background:var(--c-bg-light); border-radius:12px; padding:16px; margin-top:24px;">
            <div style="display:flex; gap:12px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="2" style="flex-shrink:0; margin-top:2px;">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <div style="font-size:13px; color:var(--c-primary); line-height:1.5;">
                    <strong>Need help?</strong> Our team will review your documents and contact you if anything is missing. You can always add more documents later from your dashboard.
                </div>
            </div>
        </div>
    </div>`;
}

function renderStep3(property) {
    return `
    <div class="mls-form-card">
        <h2 style="font-size:18px; font-weight:600; margin:0 0 8px 0;">Listing Agreement</h2>
        <p style="font-size:14px; color:var(--c-text-secondary); margin:0 0 24px 0;">Review and sign the MLS listing agreement</p>

        <div style="background:var(--c-bg-light); border-radius:12px; padding:24px; margin-bottom:24px; max-height:400px; overflow-y:auto;">
            <h3 style="font-size:16px; font-weight:600; margin:0 0 16px 0; text-align:center;">EXCLUSIVE RIGHT TO SELL LISTING AGREEMENT</h3>

            <div style="font-size:13px; line-height:1.8; color:var(--c-primary);">
                <p><strong>1. PARTIES:</strong> This agreement is between <span style="background:rgba(125,143,247,0.1); padding:2px 6px; border-radius:4px;">${property.ownerName || 'Property Owner'}</span> ("Seller") and Beycome LLC ("Broker").</p>

                <p><strong>2. PROPERTY:</strong> The property located at <span style="background:rgba(125,143,247,0.1); padding:2px 6px; border-radius:4px;">${property.address}</span></p>

                <p><strong>3. LISTING PRICE:</strong> $${property.price ? parseFloat(property.price).toLocaleString() : '___________'}</p>

                <p><strong>4. LISTING PERIOD:</strong> This agreement shall be effective for 24 months from the date of MLS listing activation.</p>

                <p><strong>5. BROKER COMPENSATION:</strong> Seller agrees to pay Broker a flat fee as selected in the package choice. No commission based on sale price will be charged.</p>

                <p><strong>6. MLS LISTING:</strong> Broker is authorized to list the property on the Multiple Listing Service (MLS) and syndicate to major real estate websites.</p>

                <p><strong>7. SELLER REPRESENTATIONS:</strong> Seller warrants that they have legal authority to sell the property and will provide accurate information about the property's condition.</p>

                <p><strong>8. SHOWING INSTRUCTIONS:</strong> Seller authorizes Broker to coordinate property showings through the dashboard and will make reasonable efforts to accommodate showing requests.</p>

                <p><strong>9. CANCELLATION:</strong> Seller may cancel this agreement at any time free of charge through the dashboard. Broker services are provided on a flat-fee basis with no cancellation penalties.</p>

                <p><strong>10. ACCEPTANCE:</strong> By signing below, Seller acknowledges they have read, understand, and agree to all terms of this agreement.</p>
            </div>
        </div>

        <div style="border:2px solid var(--c-border); border-radius:12px; padding:24px; margin-bottom:20px;">
            <label style="display:block; font-size:14px; font-weight:500; margin-bottom:12px;">Your Signature</label>
            <div style="display:flex; gap:12px; align-items:center;">
                <input type="text" id="mlsSignature" class="input" placeholder="Type your full legal name" style="flex:1;">
                <div style="font-size:13px; color:var(--c-text-secondary); white-space:nowrap;">
                    ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
            </div>
            <p style="font-size:12px; color:var(--c-text-secondary); margin:12px 0 0 0;">By typing your name, you agree this constitutes a legal electronic signature.</p>
        </div>

        <label class="checkbox-label" style="padding:16px; background:var(--c-bg-light); border-radius:8px;">
            <input type="checkbox" id="mlsAgreeTerms">
            <span style="font-size:14px;">I have read and agree to the terms of this listing agreement and authorize Beycome to list my property on the MLS</span>
        </label>
    </div>`;
}

function renderStep4(property) {
    return `
    <div class="mls-form-card">
        <div style="text-align:center; margin-bottom:32px;">
            <div style="width:80px; height:80px; border-radius:50%; background:rgba(129,199,151,0.1); display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--c-success)" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <h2 style="font-size:20px; font-weight:600; margin:0 0 8px 0;">Ready to List!</h2>
            <p style="font-size:14px; color:var(--c-text-secondary); margin:0;">Review your information before submitting to MLS</p>
        </div>

        <div class="review-section">
            <h3>Property Information</h3>
            <div class="review-item">
                <span>Address:</span>
                <strong>${property.address}</strong>
            </div>
            <div class="review-item">
                <span>Price:</span>
                <strong>$${property.price ? parseFloat(property.price).toLocaleString() : 'N/A'}</strong>
            </div>
            <div class="review-item">
                <span>Property Type:</span>
                <strong>${property.propertyType || 'N/A'}</strong>
            </div>
            <div class="review-item">
                <span>Beds / Baths:</span>
                <strong>${property.beds || 0} Beds · ${property.baths || 0} Baths</strong>
            </div>
        </div>

        <div class="review-section">
            <h3>Documents</h3>
            <div style="font-size:14px; color:var(--c-success); display:flex; align-items:center; gap:8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                All required documents uploaded
            </div>
        </div>

        <div class="review-section">
            <h3>Agreement</h3>
            <div style="font-size:14px; color:var(--c-success); display:flex; align-items:center; gap:8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Listing agreement signed
            </div>
        </div>

        <div style="background:linear-gradient(135deg, rgba(125,143,247,0.1) 0%, rgba(255,155,119,0.1) 100%); border-radius:12px; padding:20px; margin-top:24px;">
            <h3 style="font-size:15px; font-weight:600; margin:0 0 12px 0;">🎉 What happens next?</h3>
            <ul style="font-size:14px; line-height:1.8; color:var(--c-primary); padding-left:20px; margin:0;">
                <li>Your listing will be submitted to the MLS within 24-48 hours</li>
                <li>We'll syndicate to 100+ real estate websites automatically</li>
                <li>You'll receive notifications for showings and offers</li>
                <li>Track everything from your dashboard</li>
            </ul>
        </div>
    </div>`;
}

function renderStep5(property) {
    return `
    <div class="mls-form-card">
        <h2 style="font-size:18px; font-weight:600; margin:0 0 8px 0;">Financial Information</h2>
        <p style="font-size:14px; color:var(--c-text-secondary); margin:0 0 24px 0;">Provide financial details for potential buyers</p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
            <div>
                <label style="display:block; font-size:14px; font-weight:500; margin-bottom:8px;">Annual Property Tax</label>
                <input type="number" id="mlsTaxAmount" class="input" placeholder="$0">
            </div>
            <div>
                <label style="display:block; font-size:14px; font-weight:500; margin-bottom:8px;">Tax Year</label>
                <input type="number" id="mlsTaxYear" class="input" placeholder="2025" value="2025">
            </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
            <div>
                <label style="display:block; font-size:14px; font-weight:500; margin-bottom:8px;">Monthly HOA Fee</label>
                <input type="number" id="mlsMonthlyHOA" class="input" placeholder="$0">
            </div>
            <div>
                <label style="display:block; font-size:14px; font-weight:500; margin-bottom:8px;">Special Assessment</label>
                <input type="number" id="mlsSpecialAssessment" class="input" placeholder="$0 (if any)">
            </div>
        </div>

        <div style="margin-top:20px;">
            <label style="display:block; font-size:14px; font-weight:500; margin-bottom:12px;">Utilities Included</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsWater">
                    <span>Water</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsSewer">
                    <span>Sewer</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsElectric">
                    <span>Electric</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsGas">
                    <span>Gas</span>
                </label>
            </div>
        </div>
    </div>`;
}

function renderStep6(property) {
    return `
    <div class="mls-form-card">
        <h2 style="font-size:18px; font-weight:600; margin:0 0 8px 0;">Interior Features</h2>
        <p style="font-size:14px; color:var(--c-text-secondary); margin:0 0 24px 0;">Describe interior features and finishes</p>

        <div style="margin-bottom:20px;">
            <label style="display:block; font-size:14px; font-weight:500; margin-bottom:12px;">Flooring Types</label>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsHardwood">
                    <span>Hardwood</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsTile">
                    <span>Tile</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsCarpet">
                    <span>Carpet</span>
                </label>
            </div>
        </div>

        <div>
            <label style="display:block; font-size:14px; font-weight:500; margin-bottom:12px;">Appliances Included</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsRefrigerator">
                    <span>Refrigerator</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsDishwasher">
                    <span>Dishwasher</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsWasher">
                    <span>Washer</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsDryer">
                    <span>Dryer</span>
                </label>
            </div>
        </div>
    </div>`;
}

function renderStep7(property) {
    return `
    <div class="mls-form-card">
        <h2 style="font-size:18px; font-weight:600; margin:0 0 8px 0;">Exterior & Community</h2>
        <p style="font-size:14px; color:var(--c-text-secondary); margin:0 0 24px 0;">Share exterior features and community amenities</p>

        <div style="margin-bottom:20px;">
            <label style="display:block; font-size:14px; font-weight:500; margin-bottom:12px;">Exterior Features</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsPatio">
                    <span>Patio/Deck</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsFence">
                    <span>Fenced Yard</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsSprinkler">
                    <span>Sprinkler System</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsStorage">
                    <span>Storage Shed</span>
                </label>
            </div>
        </div>

        <div>
            <label style="display:block; font-size:14px; font-weight:500; margin-bottom:12px;">Community Amenities</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsCommunityPool">
                    <span>Community Pool</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsGym">
                    <span>Fitness Center</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsPlayground">
                    <span>Playground</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="mlsClubhouse">
                    <span>Clubhouse</span>
                </label>
            </div>
        </div>
    </div>`;
}

function renderStep8(property) {
    return renderStep3(property); // Reuse the agreement step
}

function renderStep9(property) {
    return renderStep4(property); // Reuse the review step
}

export function init(propertyId = null) {
    const currentStep = getCurrentStep(propertyId);

    // Back button
    document.getElementById('mlsBackBtn')?.addEventListener('click', () => {
        // Clear the step when going back to listings
        sessionStorage.removeItem(`mls-form-step-${propertyId}`);
        window.location.hash = '/your-listing';
    });

    // Previous button
    document.getElementById('mlsPrevBtn')?.addEventListener('click', () => {
        if (currentStep > 1) {
            setCurrentStep(propertyId, currentStep - 1);
            // Re-render the page
            const mlsContainer = document.getElementById('mls-form-container');
            if (mlsContainer) {
                mlsContainer.innerHTML = render(propertyId);
                init(propertyId);
            }
        }
    });

    // Next/Submit button
    document.getElementById('mlsNextBtn')?.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            // Validate current step
            if (validateStep(currentStep)) {
                setCurrentStep(propertyId, currentStep + 1);
                // Re-render the page
                const mlsContainer = document.getElementById('mls-form-container');
                if (mlsContainer) {
                    mlsContainer.innerHTML = render(propertyId);
                    init(propertyId);
                }
            }
        } else {
            // Final submission
            submitToMLS(propertyId);
        }
    });

    // Upload button handlers (demo - just show toast)
    ['uploadDeed', 'uploadPhotos', 'uploadDisclosures'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', () => {
            showMobileToast('📎 File upload coming soon in production');
        });
    });
}

function validateStep(step) {
    if (step === 3) {
        // Validate signature and agreement
        const signature = document.getElementById('mlsSignature')?.value.trim();
        const agreeTerms = document.getElementById('mlsAgreeTerms')?.checked;

        if (!signature) {
            showMobileToast('⚠️ Please sign the agreement');
            document.getElementById('mlsSignature')?.focus();
            return false;
        }

        if (!agreeTerms) {
            showMobileToast('⚠️ Please agree to the terms');
            return false;
        }
    }

    return true;
}

function submitToMLS(propertyId) {
    // Update property status to live-active
    const properties = store.get('properties') || [];
    const propertyIndex = properties.findIndex(p => p.id === propertyId);

    if (propertyIndex !== -1) {
        properties[propertyIndex].status = 'live-active';
        properties[propertyIndex].mlsSubmittedAt = new Date().toISOString();
        properties[propertyIndex].updatedAt = new Date().toISOString();
        store.set('properties', properties);
    }

    // Clear the MLS form step
    sessionStorage.removeItem(`mls-form-step-${propertyId}`);

    showMobileToast('✅ Submitted to MLS successfully!');

    setTimeout(() => {
        window.location.hash = '/your-listing';
    }, 1500);
}
