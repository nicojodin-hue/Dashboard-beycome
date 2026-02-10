import { toggleMenu } from '../utils.js';
import { addChatMessage } from '../components/chat.js';
import { showMobileToast, isDesktopView } from '../utils.js';

const states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

const downloadSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';

function contractCard(title, desc) {
    return `<div class="visit-card"><div class="visit-card-content"><div class="visit-info"><h3>${title}</h3><div class="visit-meta-row"><span>${desc}</span></div></div><div class="visit-actions"><button class="btn invoice-print-btn download-contract-btn">${downloadSvg}</button></div></div></div>`;
}

export function render() {
    return `<div class="visit-tabs">
        <div class="filter-dropdown">
            <button class="filter-btn" id="stateFilterBtn">
                <span id="stateFilterText">Florida</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="menu scroll" id="stateFilterMenu">
                ${states.map(s => `<button class="menu-item${s === 'Florida' ? ' active' : ''}" data-state="${s}">${s}</button>`).join('')}
            </div>
        </div>
        <div class="message-tabs">
            <button class="message-tab active" id="sellTab">Sell</button>
            <button class="message-tab" id="rentTab">Rent</button>
            <button class="message-tab" id="disclosureTab">Disclosure</button>
            <button class="message-tab" id="agreementTab">Agreement</button>
        </div>
        <span class="ask-artur-hint" id="askArturContracts">Need help? Ask Artur</span>
    </div>
    <div id="contractsSell" class="contracts-list">
        ${contractCard('Residential Sales Contract', 'Standard purchase agreement for residential properties')}
        ${contractCard('As-Is Residential Contract', 'Sale contract with no repairs or warranties')}
        ${contractCard('Vacant Land Contract', 'Purchase agreement for undeveloped land')}
        ${contractCard('Addendum to Contract', 'Additional terms and conditions form')}
    </div>
    <div id="contractsRent" class="contracts-list" style="display: none;">
        ${contractCard('Residential Lease Agreement', 'Standard rental agreement for residential properties')}
        ${contractCard('Month-to-Month Lease', 'Short-term rental agreement with monthly renewal')}
        ${contractCard('Lease Renewal Agreement', 'Extension of existing lease terms')}
        ${contractCard('Sublease Agreement', 'Agreement for tenant to rent to another party')}
    </div>
    <div id="contractsDisclosure" class="contracts-list" style="display: none;">
        ${contractCard("Seller's Property Disclosure", 'Required disclosure of property condition')}
        ${contractCard('Lead-Based Paint Disclosure', 'Federal requirement for pre-1978 properties')}
        ${contractCard('HOA Disclosure', 'Homeowners association information and fees')}
        ${contractCard('Flood Zone Disclosure', 'Property flood zone status notification')}
    </div>
    <div id="contractsAgreement" class="contracts-list" style="display: none;">
        ${contractCard('Exclusive Listing Agreement', 'Agreement between seller and listing agent')}
        ${contractCard('Buyer Representation Agreement', "Agreement between buyer and buyer's agent")}
        ${contractCard('Commission Agreement', 'Real estate commission terms and conditions')}
        ${contractCard('Cancellation of Contract', 'Form to terminate existing agreements')}
    </div>`;
}

export function init() {
    // State filter
    document.getElementById('stateFilterBtn')?.addEventListener('click', (e) => toggleMenu('stateFilterMenu', e));
    document.querySelectorAll('#stateFilterMenu .menu-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('#stateFilterMenu .menu-item').forEach(i => i.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('stateFilterText').textContent = btn.dataset.state;
            document.getElementById('stateFilterMenu').classList.remove('show');
        });
    });

    // Tab switching
    const tabs = { sellTab: 'sell', rentTab: 'rent', disclosureTab: 'disclosure', agreementTab: 'agreement' };
    Object.entries(tabs).forEach(([tabId, name]) => {
        document.getElementById(tabId)?.addEventListener('click', () => switchContractTab(name));
    });

    // Download buttons
    document.querySelectorAll('.download-contract-btn').forEach(btn => {
        btn.addEventListener('click', () => showMobileToast('📥 Downloading...'));
    });

    // Ask Artur
    document.getElementById('askArturContracts')?.addEventListener('click', () => {
        addChatMessage('📋 <strong>Contract Center</strong><br><br>Here you\'ll find all the legal forms you need. I can help you:<br>• Choose the right contract for your situation<br>• Understand contract terms<br>• Fill out required disclosures<br><br>Which type of document do you need?');
    });
}

function switchContractTab(tab) {
    document.getElementById('sellTab').classList.toggle('active', tab === 'sell');
    document.getElementById('rentTab').classList.toggle('active', tab === 'rent');
    document.getElementById('disclosureTab').classList.toggle('active', tab === 'disclosure');
    document.getElementById('agreementTab').classList.toggle('active', tab === 'agreement');
    document.getElementById('contractsSell').style.display = tab === 'sell' ? 'flex' : 'none';
    document.getElementById('contractsRent').style.display = tab === 'rent' ? 'flex' : 'none';
    document.getElementById('contractsDisclosure').style.display = tab === 'disclosure' ? 'flex' : 'none';
    document.getElementById('contractsAgreement').style.display = tab === 'agreement' ? 'flex' : 'none';
}
